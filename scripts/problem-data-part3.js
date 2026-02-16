// Part 3: JavaScript category problems (LeetCode 30 Days of JS style)
const problems = {
    "create-hello-world-function": {
        fn: "createHelloWorld",
        params: "",
        ret: "Function",
        tests: [
            { input: "[]", output: '"Hello World"' },
            { input: "[{},null,42]", output: '"Hello World"' }
        ]
    },
    "counter": {
        fn: "createCounter",
        params: "n: number",
        ret: "Function",
        tests: [
            { input: '10\n["call","call","call"]', output: "[10,11,12]" }
        ]
    },
    "counter-ii": {
        fn: "createCounter",
        params: "init: number",
        ret: "Object",
        tests: [
            { input: '5\n["increment","reset","decrement"]', output: "[6,5,4]" }
        ]
    },
    "apply-transform-over-each-element-in-array": {
        fn: "map",
        params: "arr: number[], fn: (n: number, i: number) => number",
        ret: "number[]",
        tests: [
            { input: "[1,2,3]\n(n) => n + 1", output: "[2,3,4]" }
        ]
    },
    "filter-elements-from-array": {
        fn: "filter",
        params: "arr: number[], fn: (n: number, i: number) => any",
        ret: "number[]",
        tests: [
            { input: "[0,10,20,30]\n(n) => n > 10", output: "[20,30]" }
        ]
    },
    "array-reduce-transformation": {
        fn: "reduce",
        params: "nums: number[], fn: (accum: number, curr: number) => number, init: number",
        ret: "number",
        tests: [
            { input: "[1,2,3,4]\n(accum, curr) => accum + curr\n0", output: "10" }
        ]
    },
    "function-composition": {
        fn: "compose",
        params: "functions: Function[]",
        ret: "Function",
        tests: [
            { input: "[x => x + 1, x => x * x, x => 2 * x]\n4", output: "65" }
        ]
    },
    "allow-one-function-call": {
        fn: "once",
        params: "fn: Function",
        ret: "Function",
        tests: [
            { input: "(a,b,c) => (a + b + c)\n[[1,2,3],[2,3,6]]", output: "[6,undefined]" }
        ]
    },
    "memoize": {
        fn: "memoize",
        params: "fn: Function",
        ret: "Function",
        tests: [
            { input: '"sum"\n["call","call"]\n[[2,2],[2,2]]', output: "[4,4]" }
        ]
    },
    "sleep": {
        fn: "sleep",
        params: "millis: number",
        ret: "Promise",
        tests: [
            { input: "100", output: "100" }
        ]
    }
};

module.exports = problems;
