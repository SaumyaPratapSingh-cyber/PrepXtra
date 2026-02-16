import { NextResponse } from "next/server";
import axios from "axios";

/*
 * PRODUCTION ONLINE EXECUTION ENGINE
 * ==================================
 * C++  → Wandbox API (primary) + Judge0 CE (fallback)
 * Java → Judge0 CE  (free, no key at ce.judge0.com)
 * Python/JS → also supported via Judge0 CE for full server-side execution
 *
 * No API keys needed. No local compilers needed.
 * Works exactly like GFG / LeetCode.
 */

const WANDBOX_URL = "https://wandbox.org/api/compile.json";
const JUDGE0_URL = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

// Judge0 CE language IDs
const JUDGE0_LANG: Record<string, number> = {
    python: 71,     // Python (3.8.1)
    javascript: 63, // Node.js (12.14.0)
    java: 62,       // Java (OpenJDK 13.0.1)
    cpp: 54,        // C++ (GCC 9.2.0)
};

// ───────── Generic retry wrapper ─────────
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> {
    let lastErr: any;
    for (let i = 0; i <= retries; i++) {
        try {
            return await fn();
        } catch (err: any) {
            lastErr = err;
            if (i < retries) {
                console.log(`[execute] Retry ${i + 1}/${retries} after error: ${err.message}`);
                await new Promise(r => setTimeout(r, delay));
                delay *= 1.5; // gentle backoff
            }
        }
    }
    throw lastErr;
}

// ───────── Wandbox: C++ execution ─────────
async function runCppViaWandbox(code: string, stdin: string) {
    const response = await axios.post(WANDBOX_URL, {
        code,
        compiler: "gcc-head",
        stdin: stdin || "",
        "compiler-option-raw": "-std=c++17\n-O2",
        "runtime-option-raw": "",
    }, { timeout: 30000 });  // 30 second timeout for complex code

    const d = response.data;

    // Compile error
    if (d.compiler_error) {
        return {
            stdout: "",
            stderr: formatCppError(d.compiler_error || d.compiler_message),
            status: "Compilation Error",
            time: "0"
        };
    }

    // Runtime error
    if (d.program_error) {
        return {
            stdout: d.program_output || "",
            stderr: d.program_error,
            status: "Runtime Error",
            time: "0"
        };
    }

    // Timeout / signal
    if (d.signal) {
        return {
            stdout: d.program_output || "",
            stderr: `Program terminated with signal: ${d.signal}`,
            status: "Runtime Error",
            time: "0"
        };
    }

    return {
        stdout: d.program_output || "",
        stderr: "",
        status: "Accepted",
        time: "0"
    };
}

function formatCppError(raw: string): string {
    return raw.replace(/prog\.cc/g, "solution.cpp");
}

// ───────── Judge0 CE: Any language execution ─────────
async function runViaJudge0(code: string, languageId: number, stdin: string) {
    const response = await axios.post(JUDGE0_URL, {
        source_code: code,
        language_id: languageId,
        stdin: stdin || "",
    }, { timeout: 30000, headers: { "Content-Type": "application/json" } });

    const d = response.data;

    // Compile error (Java / C++)
    if (d.compile_output && d.status.id !== 3) {
        return {
            stdout: "",
            stderr: d.compile_output,
            status: "Compilation Error",
            time: d.time || "0"
        };
    }

    // Runtime error
    if (d.stderr) {
        return {
            stdout: d.stdout || "",
            stderr: d.stderr,
            status: "Runtime Error",
            time: d.time || "0"
        };
    }

    // Time Limit / Memory Limit
    if (d.status.id !== 3) {
        return {
            stdout: d.stdout || "",
            stderr: d.status.description + (d.message ? ": " + d.message : ""),
            status: d.status.description,
            time: d.time || "0"
        };
    }

    return {
        stdout: d.stdout || "",
        stderr: "",
        status: "Accepted",
        time: d.time || "0"
    };
}

// ───────── Execute with engine selection + fallback ─────────
async function executeCode(code: string, language: string, stdin: string) {
    if (language === "cpp") {
        // Try Wandbox first, fallback to Judge0 CE if it times out
        try {
            return await withRetry(() => runCppViaWandbox(code, stdin), 1, 1000);
        } catch (wandboxErr: any) {
            console.log(`[execute] Wandbox failed (${wandboxErr.message}), falling back to Judge0 CE...`);
            try {
                return await withRetry(() => runViaJudge0(code, JUDGE0_LANG.cpp, stdin), 1, 1000);
            } catch (judge0Err: any) {
                throw new Error(`Both execution engines failed. Wandbox: ${wandboxErr.message}. Judge0: ${judge0Err.message}`);
            }
        }
    }

    // Java, Python, JS → Judge0 CE with retry
    const langId = JUDGE0_LANG[language];
    if (!langId) throw new Error(`Unsupported language: ${language}`);
    return await withRetry(() => runViaJudge0(code, langId, stdin), 2, 1000);
}

// ───────── Main handler ─────────
export async function POST(req: Request) {
    try {
        const { code, language, testCases, functionName } = await req.json();

        if (!code || !language) {
            return NextResponse.json({ error: "Missing code or language" }, { status: 400 });
        }

        // Run code once first to check for compilation errors (don't re-compile per test case)
        let firstResult;
        try {
            firstResult = await executeCode(code, language, testCases?.[0]?.input || "");
        } catch (apiErr: any) {
            return NextResponse.json({
                error: `Execution service temporarily unavailable. Please try again.\n\n${apiErr.message}`
            }, { status: 503 });
        }

        // If there's a compile error, return it immediately
        if (firstResult.status === "Compilation Error") {
            return NextResponse.json({
                error: `Compilation Error:\n\n${firstResult.stderr}`
            });
        }

        // First test case result
        const results: any[] = [];
        const tc0 = testCases?.[0];
        if (tc0) {
            if (firstResult.stderr && firstResult.status !== "Accepted") {
                results.push({
                    testCase: 1,
                    passed: false,
                    input: tc0.input,
                    expectedOutput: tc0.output,
                    actualOutput: firstResult.stdout.trim(),
                    error: `${firstResult.status}:\n${firstResult.stderr}`,
                    executionTime: parseFloat(firstResult.time) * 1000 || 0
                });
            } else {
                const actualOutput = firstResult.stdout.trim();
                results.push({
                    testCase: 1,
                    passed: actualOutput === tc0.output.trim(),
                    input: tc0.input,
                    expectedOutput: tc0.output,
                    actualOutput,
                    executionTime: parseFloat(firstResult.time) * 1000 || 0
                });
            }
        }

        // Remaining test cases (run in parallel for speed)
        if (testCases && testCases.length > 1) {
            const remaining = testCases.slice(1).map(async (tc: any, idx: number) => {
                const startTime = Date.now();
                try {
                    const execResult = await executeCode(code, language, tc.input);

                    if (execResult.stderr && execResult.status !== "Accepted") {
                        return {
                            testCase: idx + 2,
                            passed: false,
                            input: tc.input,
                            expectedOutput: tc.output,
                            actualOutput: execResult.stdout.trim(),
                            error: `${execResult.status}:\n${execResult.stderr}`,
                            executionTime: parseFloat(execResult.time) * 1000 || (Date.now() - startTime)
                        };
                    }

                    const actualOutput = execResult.stdout.trim();
                    return {
                        testCase: idx + 2,
                        passed: actualOutput === tc.output.trim(),
                        input: tc.input,
                        expectedOutput: tc.output,
                        actualOutput,
                        executionTime: parseFloat(execResult.time) * 1000 || (Date.now() - startTime)
                    };
                } catch (err: any) {
                    return {
                        testCase: idx + 2,
                        passed: false,
                        input: tc.input,
                        expectedOutput: tc.output,
                        actualOutput: "",
                        error: err.message,
                        executionTime: Date.now() - startTime
                    };
                }
            });

            const remainingResults = await Promise.all(remaining);
            results.push(...remainingResults);
        }

        // Sort by test case number
        results.sort((a: any, b: any) => a.testCase - b.testCase);

        return NextResponse.json({
            results,
            total: results.length,
            passed: results.filter((r: any) => r.passed).length,
            failed: results.filter((r: any) => !r.passed).length,
            totalTime: Math.round(results.reduce((acc: number, r: any) => acc + r.executionTime, 0))
        });

    } catch (error: any) {
        console.error("[execute] Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
