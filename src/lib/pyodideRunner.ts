/**
 * Pyodide Test Case Runner
 * Executes user's Python Solution class against test cases
 * and returns structured pass/fail results.
 */

export interface TestCase {
    input: string;
    output: string;
    hidden?: boolean;
}

export interface TestResult {
    testCase: number;
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    error?: string;
    executionTime: number;
}

export interface RunResults {
    passed: number;
    failed: number;
    total: number;
    results: TestResult[];
    totalTime: number;
    consoleOutput: string;
}

/**
 * Builds the Python driver code that:
 * 1. Includes the user's Solution class
 * 2. Runs each test case by calling the function
 * 3. Prints JSON results for parsing
 */
export function buildTestRunner(
    userCode: string,
    testCases: TestCase[],
    functionName: string,
): string {
    // We build a Python script that:
    // - Defines the user's code (their Solution class)
    // - Creates an instance of Solution
    // - For each test case, parses the input, calls the function, compares output
    // - Prints structured results

    const testCaseJson = JSON.stringify(
        testCases.map((tc) => ({
            input: tc.input,
            output: tc.output,
        }))
    );

    return `
import json
import time
import traceback
from typing import List, Optional, Dict, Set, Tuple
from collections import defaultdict, deque, Counter, OrderedDict
import heapq
import math
import bisect
import itertools
import functools
import re

# Standard LeetCode helper classes
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# ===== USER CODE START =====
${userCode}
# ===== USER CODE END =====

# ===== TEST RUNNER =====
_test_cases = json.loads('${testCaseJson.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}')
_results = []
_sol = Solution()

for _i, _tc in enumerate(_test_cases):
    _start = time.time()
    try:
        # Parse input arguments
        _input_str = _tc["input"].strip()
        _expected = _tc["output"].strip()
        
        # Parse arguments - each line is an argument
        _args = []
        for _line in _input_str.split("\\n"):
            _line = _line.strip()
            if _line:
                try:
                    _args.append(json.loads(_line))
                except:
                    _args.append(_line)
        
        # Call the solution function
        _result = getattr(_sol, "${functionName}")(*_args)
        
        # Convert result to comparable string
        _actual = json.dumps(_result) if _result is not None else "null"
        
        # Normalize expected output for comparison
        try:
            _expected_parsed = json.loads(_expected)
            _expected_normalized = json.dumps(_expected_parsed)
        except:
            _expected_normalized = _expected
        
        _elapsed = (time.time() - _start) * 1000
        
        # Compare (handle list order flexibility for some problems)
        _passed = _actual == _expected_normalized
        
        _results.append({
            "testCase": _i + 1,
            "passed": _passed,
            "input": _tc["input"],
            "expectedOutput": _expected,
            "actualOutput": str(_result),
            "executionTime": round(_elapsed, 2)
        })
    except Exception as _e:
        _elapsed = (time.time() - _start) * 1000
        _results.append({
            "testCase": _i + 1,
            "passed": False,
            "input": _tc["input"],
            "expectedOutput": _tc["output"],
            "actualOutput": "",
            "error": traceback.format_exc(),
            "executionTime": round(_elapsed, 2)
        })

print("__RESULTS__" + json.dumps(_results) + "__END_RESULTS__")
`;
}

/**
 * Parse the structured results from pyodide output
 */
export function parseTestResults(rawOutput: string): RunResults {
    const resultsMatch = rawOutput.match(/__RESULTS__([\s\S]*?)__END_RESULTS__/);

    if (!resultsMatch) {
        return {
            passed: 0,
            failed: 0,
            total: 0,
            results: [],
            totalTime: 0,
            consoleOutput: rawOutput,
        };
    }

    try {
        const results: TestResult[] = JSON.parse(resultsMatch[1]);
        const passed = results.filter((r) => r.passed).length;
        const totalTime = results.reduce((acc, r) => acc + r.executionTime, 0);

        // Extract console output (everything before __RESULTS__)
        const consoleOutput = rawOutput.split("__RESULTS__")[0].trim();

        return {
            passed,
            failed: results.length - passed,
            total: results.length,
            results,
            totalTime,
            consoleOutput,
        };
    } catch {
        return {
            passed: 0,
            failed: 0,
            total: 0,
            results: [],
            totalTime: 0,
            consoleOutput: rawOutput,
        };
    }
}
