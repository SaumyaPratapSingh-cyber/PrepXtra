"use client";

import Editor from "@monaco-editor/react";
import { useState, useCallback, useRef } from "react";
import { Play, RotateCcw, Check, X, Loader2, Terminal, CheckCircle2, XCircle, Clock, Send } from "lucide-react";
import { usePyodide } from "@/hooks/usePyodide";
import { buildTestRunner, parseTestResults, type TestCase, type RunResults, type TestResult } from "@/lib/pyodideRunner";
import axios from "axios";

interface CodeEditorProps {
    problemId?: string;
    starterCode?: Record<string, string>;
    testCases?: TestCase[];
    functionName?: string;
    onSubmit?: (code: string, language: string) => void;
}

export default function CodeEditor({ problemId, starterCode, testCases, functionName, onSubmit }: CodeEditorProps) {
    const defaultTemplates: Record<string, string> = {
        python: `# Write your solution here\nclass Solution:\n    def solution(self):\n        pass`,
        javascript: `// Write your solution here\nfunction solution() {\n    \n}`,
        cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`,
        java: `public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`
    };

    const getStarterCode = (lang: string) => {
        return starterCode?.[lang] || defaultTemplates[lang] || "";
    };

    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState(getStarterCode("python"));
    const [activeOutputTab, setActiveOutputTab] = useState<"testcases" | "results" | "console">("testcases");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [runResults, setRunResults] = useState<RunResults | null>(null);
    const [consoleOutput, setConsoleOutput] = useState("");
    const [rawError, setRawError] = useState<string | null>(null);

    const { isLoading: pyodideLoading, isReady: pyodideReady, loadProgress, loadError, runPython } = usePyodide();

    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        setCode(getStarterCode(newLang));
    };

    const handleRun = useCallback(async () => {
        setIsRunning(true);
        setActiveOutputTab("results");
        setRunResults(null);
        setRawError(null);
        setConsoleOutput("");

        if (language === "python") {
            if (!pyodideReady) {
                setRawError("Python engine is still loading. Please wait...");
                setIsRunning(false);
                return;
            }
            try {
                if (testCases && testCases.length > 0 && functionName) {
                    const driverCode = buildTestRunner(code, testCases, functionName);
                    const result = await runPython(driverCode);
                    if (result.error) {
                        setRawError(result.error);
                        setConsoleOutput(result.output);
                    } else {
                        const parsed = parseTestResults(result.output);
                        setRunResults(parsed);
                        setConsoleOutput(parsed.consoleOutput);
                    }
                } else {
                    const result = await runPython(code);
                    setConsoleOutput(result.output);
                    if (result.error) setRawError(result.error);
                    setActiveOutputTab("console");
                }
            } catch (err: any) {
                setRawError(err.message);
            }
        } else if (language === "javascript") {
            try {
                const startTime = performance.now();
                const testResults: TestResult[] = [];
                let logs = "";

                // Simple console.log interceptor
                const customConsole = {
                    log: (...args: any[]) => { logs += args.map(a => String(a)).join(" ") + "\n"; }
                };

                for (let i = 0; i < (testCases?.length || 0); i++) {
                    const tc = testCases![i];
                    const testStartTime = performance.now();
                    try {
                        // Create a sandbox for the user code
                        // We expect the user to define a function with the specified name
                        const userFn = new Function("console", code + `\nreturn ${functionName};`)(customConsole);

                        // Parse input
                        const args = tc.input.split("\n").filter(l => l.trim()).map(l => {
                            try { return JSON.parse(l); } catch { return l; }
                        });

                        const actual = userFn(...args);
                        const actualStr = JSON.stringify(actual);

                        let expectedStr = tc.output;
                        try { expectedStr = JSON.stringify(JSON.parse(tc.output)); } catch { }

                        testResults.push({
                            testCase: i + 1,
                            passed: actualStr === expectedStr,
                            input: tc.input,
                            expectedOutput: tc.output,
                            actualOutput: actualStr,
                            executionTime: Math.round(performance.now() - testStartTime)
                        });
                    } catch (err: any) {
                        testResults.push({
                            testCase: i + 1,
                            passed: false,
                            input: tc.input,
                            expectedOutput: tc.output,
                            actualOutput: "Error",
                            error: err.message,
                            executionTime: Math.round(performance.now() - testStartTime)
                        });
                    }
                }

                setRunResults({
                    passed: testResults.filter(r => r.passed).length,
                    failed: testResults.filter(r => !r.passed).length,
                    total: testResults.length,
                    results: testResults,
                    totalTime: Math.round(performance.now() - startTime),
                    consoleOutput: logs
                });
                setConsoleOutput(logs);
            } catch (err: any) {
                setRawError(err.message);
            }
        } else if (language === "cpp" || language === "java") {
            try {
                const response = await axios.post("/api/execute", {
                    code,
                    language,
                    testCases,
                    functionName
                });

                if (response.data.error) {
                    setRawError(response.data.error);
                } else {
                    setRunResults(response.data);
                }
            } catch (err: any) {
                setRawError(err.response?.data?.error || err.message);
            }
        } else {
            setRawError(`Execution for ${language} is not yet supported. Coming soon!`);
        }
        setIsRunning(false);
    }, [pyodideReady, language, code, testCases, functionName, runPython]);

    const handleSubmit = async () => {
        if (!runResults && !rawError) {
            await handleRun();
        }

        setIsSubmitting(true);
        try {
            const finalStatus = rawError ? "Runtime Error" :
                (runResults?.failed === 0 ? "Accepted" : "Wrong Answer");

            await axios.post("/api/submissions", {
                problemId,
                language,
                code,
                status: finalStatus,
                testCasesPassed: runResults?.passed || 0,
                totalTestCases: runResults?.total || 0,
                runtime: runResults?.totalTime || 0
            });
            // Show some success feedback
            alert(`Submission ${finalStatus}!`);
        } catch (err: any) {
            console.error("Submission failed:", err);
            alert("Failed to submit code. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const languageMap: Record<string, string> = {
        python: "python",
        javascript: "javascript",
        cpp: "cpp",
        java: "java",
    };

    return (
        <div className="h-full flex flex-col bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111]">
                <div className="flex items-center gap-3">
                    <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors"
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                    </select>

                    <button
                        onClick={() => setCode(getStarterCode(language))}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                        title="Reset Code"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>

                    {/* Engine Status Indicator */}
                    {language === "python" && pyodideLoading && (
                        <div className="flex items-center gap-2 text-xs text-yellow-400">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>{loadProgress}</span>
                        </div>
                    )}
                    {language === "python" && loadError && (
                        <div className="flex items-center gap-2 text-xs text-red-400">
                            <XCircle className="h-3 w-3" />
                            <span>Engine Error</span>
                        </div>
                    )}
                    {language === "python" && pyodideReady && !pyodideLoading && (
                        <div className="flex items-center gap-1.5 text-xs text-green-400">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Python Ready</span>
                        </div>
                    )}
                    {(language === "cpp" || language === "java") && (
                        <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Online Compiler</span>
                        </div>
                    )}
                    {language === "javascript" && (
                        <div className="flex items-center gap-1.5 text-xs text-green-400">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>JS Ready</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRun}
                        disabled={isRunning || (language === "python" && !pyodideReady)}
                        className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
                    >
                        {isRunning ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                        {isRunning ? (language === "cpp" || language === "java" ? "Compiling..." : "Running...") : "Run"}
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || isRunning}
                        className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-500/20 text-white font-bold transition-all text-sm flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-hidden" style={{ minHeight: "300px" }}>
                <Editor
                    height="100%"
                    language={languageMap[language] || "python"}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        wordWrap: "on",
                        padding: { top: 12 },
                    }}
                />
            </div>

            {/* Output Panel */}
            <div className="border-t border-white/10 bg-[#111] flex flex-col" style={{ minHeight: "160px", maxHeight: "280px" }}>
                {/* Output Tabs */}
                <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10">
                    {(["testcases", "results", "console"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveOutputTab(tab)}
                            className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${activeOutputTab === tab
                                ? "bg-white/10 text-white"
                                : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            {tab === "testcases" ? "Test Cases" : tab === "results" ? (
                                <span className="flex items-center gap-1.5">
                                    Results
                                    {runResults && (
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${runResults.failed === 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                            }`}>
                                            {runResults.passed}/{runResults.total}
                                        </span>
                                    )}
                                </span>
                            ) : "Console"}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                    {/* Test Cases Tab */}
                    {activeOutputTab === "testcases" && (
                        <div className="space-y-2">
                            {testCases && testCases.length > 0 ? (
                                testCases.filter(tc => !tc.hidden).map((tc, idx) => (
                                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs">
                                        <div className="mb-1">
                                            <span className="text-slate-500 font-medium">Case {idx + 1} · Input:</span>
                                            <code className="ml-2 text-slate-300 font-mono">{tc.input}</code>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 font-medium">Expected:</span>
                                            <code className="ml-2 text-green-400 font-mono">{tc.output}</code>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 text-xs">No test cases available for this problem.</p>
                            )}
                        </div>
                    )}

                    {/* Results Tab */}
                    {activeOutputTab === "results" && (
                        <div className="space-y-2">
                            {isRunning && (
                                <div className="flex items-center gap-2 text-yellow-400 text-xs p-3">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Executing tests...</span>
                                </div>
                            )}

                            {rawError && !isRunning && (
                                <div className={`p-3 rounded-lg border ${rawError.includes("Compilation Error") ? "bg-yellow-500/10 border-yellow-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                                    <h4 className={`font-bold text-xs mb-2 flex items-center gap-1.5 ${rawError.includes("Compilation Error") ? "text-yellow-400" : "text-red-400"}`}>
                                        <XCircle className="h-3.5 w-3.5" />
                                        {rawError.includes("Compilation Error") ? "Compilation Error" : "Runtime Error"}
                                    </h4>
                                    <pre className={`text-xs font-mono whitespace-pre-wrap leading-relaxed ${rawError.includes("Compilation Error") ? "text-yellow-300" : "text-red-300"}`}>{rawError.replace(/^(Compilation Error|Runtime Error):?\n*/i, '')}</pre>
                                </div>
                            )}

                            {runResults && !isRunning && (
                                <>
                                    {/* Summary */}
                                    <div className={`p-3 rounded-lg border flex items-center justify-between ${runResults.failed === 0
                                        ? "bg-green-500/10 border-green-500/20"
                                        : "bg-red-500/10 border-red-500/20"
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            {runResults.failed === 0 ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-400" />
                                            )}
                                            <span className={`font-bold text-sm ${runResults.failed === 0 ? "text-green-400" : "text-red-400"
                                                }`}>
                                                {runResults.failed === 0 ? "All Tests Passed!" : `${runResults.failed} Test(s) Failed`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <span>{runResults.passed}/{runResults.total} passed</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {runResults.totalTime.toFixed(1)}ms
                                            </span>
                                        </div>
                                    </div>

                                    {/* Individual Results */}
                                    {runResults.results.map((result, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-2.5 rounded-lg border text-xs ${result.passed
                                                ? "bg-green-500/5 border-green-500/10"
                                                : "bg-red-500/5 border-red-500/10"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    {result.passed ? (
                                                        <Check className="h-3.5 w-3.5 text-green-400" />
                                                    ) : (
                                                        <X className="h-3.5 w-3.5 text-red-400" />
                                                    )}
                                                    <span className={result.passed ? "text-green-400" : "text-red-400"}>
                                                        Test Case {result.testCase}
                                                    </span>
                                                </span>
                                                <span className="text-slate-500">{result.executionTime}ms</span>
                                            </div>
                                            {!result.passed && (
                                                <div className="space-y-1 mt-2 pl-5">
                                                    <div>
                                                        <span className="text-slate-500">Input: </span>
                                                        <code className="text-slate-300 font-mono">{result.input}</code>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">Expected: </span>
                                                        <code className="text-green-400 font-mono">{result.expectedOutput}</code>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-500">Got: </span>
                                                        <code className="text-red-400 font-mono">{result.actualOutput || "None"}</code>
                                                    </div>
                                                    {result.error && (
                                                        <div>
                                                            <span className="text-slate-500">Error: </span>
                                                            <pre className="text-red-300 font-mono whitespace-pre-wrap">{result.error}</pre>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}

                            {!isRunning && !rawError && !runResults && (
                                <p className="text-slate-500 text-xs p-2">Click "Run" to execute your code against test cases.</p>
                            )}
                        </div>
                    )}

                    {/* Console Tab */}
                    {activeOutputTab === "console" && (
                        <div>
                            {consoleOutput ? (
                                <pre className="text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">{consoleOutput}</pre>
                            ) : (
                                <p className="text-slate-500 text-xs">Console output will appear here after running your code.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
