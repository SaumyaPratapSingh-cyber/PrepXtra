import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";

const execPromise = promisify(exec);

export async function POST(req: Request) {
    const { code, language, testCases, functionName } = await req.json();

    if (!code || !language) {
        return NextResponse.json({ error: "Code and language are required" }, { status: 400 });
    }

    const tempDir = path.join(os.tmpdir(), "prepxtra-exec-" + uuidv4());
    await fs.mkdir(tempDir, { recursive: true });

    try {
        let executionResults = [];

        if (language === "cpp") {
            const sourceFile = path.join(tempDir, "solution.cpp");
            const exeFile = path.join(tempDir, "solution.exe");

            await fs.writeFile(sourceFile, code);

            // Compile
            try {
                await execPromise(`g++ "${sourceFile}" -o "${exeFile}"`);
            } catch (compileErr: any) {
                return NextResponse.json({ error: "Compilation Error:\n" + (compileErr.stderr || "").toString() });
            }

            // Run test cases
            for (let i = 0; i < (testCases?.length || 0); i++) {
                const tc = testCases[i];
                const startTime = performance.now();
                try {
                    const { stdout, stderr } = await execPromise(`"${exeFile}"`, {
                        input: tc.input,
                        timeout: 5000
                    } as any);

                    const stdoutStr = stdout.toString();
                    const time = performance.now() - startTime;
                    executionResults.push({
                        testCase: i + 1,
                        passed: stdoutStr.trim() === tc.output.trim(),
                        input: tc.input,
                        expectedOutput: tc.output,
                        actualOutput: stdoutStr.trim(),
                        executionTime: Math.round(time)
                    });
                } catch (runErr: any) {
                    executionResults.push({
                        testCase: i + 1,
                        passed: false,
                        input: tc.input,
                        expectedOutput: tc.output,
                        actualOutput: "Runtime Error",
                        error: (runErr.stderr || runErr.message || "").toString(),
                        executionTime: 0
                    });
                }
            }
        }
        else if (language === "java") {
            const sourceFile = path.join(tempDir, "Solution.java");
            await fs.writeFile(sourceFile, code);

            // Compile
            try {
                await execPromise(`javac "${sourceFile}"`);
            } catch (compileErr: any) {
                return NextResponse.json({ error: "Compilation Error:\n" + (compileErr.stderr || "").toString() });
            }

            // Run
            for (let i = 0; i < (testCases?.length || 0); i++) {
                const tc = testCases[i];
                const startTime = performance.now();
                try {
                    const { stdout, stderr } = await execPromise(`java -cp "${tempDir}" Solution`, {
                        input: tc.input,
                        timeout: 5000
                    } as any);

                    const stdoutStr = stdout.toString();
                    const time = performance.now() - startTime;
                    executionResults.push({
                        testCase: i + 1,
                        passed: stdoutStr.trim() === tc.output.trim(),
                        input: tc.input,
                        expectedOutput: tc.output,
                        actualOutput: stdoutStr.trim(),
                        executionTime: Math.round(time)
                    });
                } catch (runErr: any) {
                    executionResults.push({
                        testCase: i + 1,
                        passed: false,
                        input: tc.input,
                        expectedOutput: tc.output,
                        actualOutput: "Runtime Error",
                        error: (runErr.stderr || runErr.message || "").toString(),
                        executionTime: 0
                    });
                }
            }
        }

        return NextResponse.json({
            results: executionResults,
            total: executionResults.length,
            passed: executionResults.filter(r => r.passed).length,
            totalTime: Math.round(executionResults.reduce((acc, r) => acc + r.executionTime, 0))
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    } finally {
        // Cleanup temp files
        try {
            await fs.rm(tempDir, { recursive: true, force: true });
        } catch (cleanupErr) {
            console.error("Failed to cleanup temp dir:", cleanupErr);
        }
    }
}
