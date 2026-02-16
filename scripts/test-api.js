const axios = require("axios");

// Test our /api/execute endpoint for C++ and Java
const BASE = "http://localhost:3000/api/execute";

async function test(language, code, testCases, label) {
    console.log(`\n=== ${label} ===`);
    try {
        const r = await axios.post(BASE, {
            code,
            language,
            testCases,
            functionName: "test"
        }, { timeout: 20000 });
        console.log("Response:", JSON.stringify(r.data, null, 2));
    } catch (e) {
        console.log("Error:", e.response?.data || e.message);
    }
}

async function main() {
    // 1. C++ correct code
    await test("cpp",
        `#include <iostream>
using namespace std;
int main() {
    cout << "[0,1]" << endl;
    return 0;
}`,
        [{ input: "[2,7,11,15]\n9", output: "[0,1]" }],
        "C++ Correct Code"
    );

    // 2. C++ compile error (should show line number)
    await test("cpp",
        `#include <iostream>
using namespace std;
int main() {
    cout << "hello" << endl
    return 0;
}`,
        [{ input: "", output: "hello" }],
        "C++ Compile Error (Line Numbers)"
    );

    // 3. Java correct code
    await test("java",
        `public class Main {
    public static void main(String[] args) {
        System.out.println("[0,1]");
    }
}`,
        [{ input: "[2,7,11,15]\n9", output: "[0,1]" }],
        "Java Correct Code"
    );

    // 4. Java compile error
    await test("java",
        `public class Main {
    public static void main(String[] args) {
        System.out.println("hello")
    }
}`,
        [{ input: "", output: "hello" }],
        "Java Compile Error (Line Numbers)"
    );
}

main();
