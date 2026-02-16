"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Global singleton for Pyodide instance
let pyodideInstance: any = null;
let pyodideLoadingPromise: Promise<any> | null = null;

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

export interface PyodideResult {
    output: string;
    error: string | null;
    executionTime: number;
}

export function usePyodide() {
    const [isLoading, setIsLoading] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [loadProgress, setLoadProgress] = useState("Initializing Python engine...");

    useEffect(() => {
        loadPyodide();
    }, []);

    const loadPyodide = async () => {
        // If already loaded, just mark ready
        if (pyodideInstance) {
            setIsReady(true);
            setIsLoading(false);
            return;
        }

        // If currently loading, wait for it
        if (pyodideLoadingPromise) {
            try {
                await pyodideLoadingPromise;
                setIsReady(true);
                setIsLoading(false);
            } catch (err: any) {
                setLoadError(err.message);
                setIsLoading(false);
            }
            return;
        }

        // Start loading
        pyodideLoadingPromise = (async () => {
            try {
                setLoadProgress("Loading Python runtime (~10MB)...");

                // Dynamically load the Pyodide script from CDN
                if (typeof window !== "undefined" && !(window as any).loadPyodide) {
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement("script");
                        script.src = `${PYODIDE_CDN}pyodide.js`;
                        script.onload = () => resolve();
                        script.onerror = () => reject(new Error("Failed to load Pyodide script"));
                        document.head.appendChild(script);
                    });
                }

                setLoadProgress("Initializing Python interpreter...");

                // Initialize Pyodide
                pyodideInstance = await (window as any).loadPyodide({
                    indexURL: PYODIDE_CDN,
                });

                // Set up stdout/stderr capture
                await pyodideInstance.runPythonAsync(`
import sys
import io

class OutputCapture:
    def __init__(self):
        self.output = io.StringIO()
    
    def write(self, text):
        self.output.write(text)
    
    def flush(self):
        pass
    
    def getvalue(self):
        return self.output.getvalue()
    
    def reset(self):
        self.output = io.StringIO()

_stdout_capture = OutputCapture()
_stderr_capture = OutputCapture()
                `);

                setLoadProgress("Python engine ready!");
                setIsReady(true);
                setIsLoading(false);

                return pyodideInstance;
            } catch (err: any) {
                setLoadError(err.message || "Failed to load Python engine");
                setIsLoading(false);
                pyodideLoadingPromise = null;
                throw err;
            }
        })();

        await pyodideLoadingPromise;
    };

    const runPython = useCallback(async (code: string): Promise<PyodideResult> => {
        if (!pyodideInstance) {
            return {
                output: "",
                error: "Python engine not loaded yet. Please wait...",
                executionTime: 0,
            };
        }

        const startTime = performance.now();

        try {
            // Reset output captures and redirect stdout/stderr
            await pyodideInstance.runPythonAsync(`
_stdout_capture.reset()
_stderr_capture.reset()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
            `);

            // Run user code
            await pyodideInstance.runPythonAsync(code);

            // Capture output
            const stdout = pyodideInstance.runPython("_stdout_capture.getvalue()");
            const stderr = pyodideInstance.runPython("_stderr_capture.getvalue()");

            // Restore stdout/stderr
            await pyodideInstance.runPythonAsync(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
            `);

            const executionTime = performance.now() - startTime;

            return {
                output: stdout || "",
                error: stderr || null,
                executionTime,
            };
        } catch (err: any) {
            // Restore stdout/stderr on error
            try {
                await pyodideInstance.runPythonAsync(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
                `);
            } catch (_) { }

            const executionTime = performance.now() - startTime;

            // Extract clean error message from Python traceback
            let errorMessage = err.message || String(err);
            // Remove the Pyodide wrapper if present
            if (errorMessage.includes("PythonError:")) {
                errorMessage = errorMessage.split("PythonError:").pop()?.trim() || errorMessage;
            }

            return {
                output: "",
                error: errorMessage,
                executionTime,
            };
        }
    }, []);

    return {
        isLoading,
        isReady,
        loadError,
        loadProgress,
        runPython,
    };
}
