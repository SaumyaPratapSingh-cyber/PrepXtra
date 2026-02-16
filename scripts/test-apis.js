const axios = require("axios");

// Test multiple free execution APIs

async function testWandbox() {
    console.log("\n=== Testing Wandbox (C++) ===");
    try {
        const r = await axios.post("https://wandbox.org/api/compile.json", {
            code: '#include <iostream>\nint main() { std::cout << "Hello" << std::endl; return 0; }',
            compiler: "gcc-head",
        }, { timeout: 10000 });
        console.log("Status:", r.status);
        console.log("Output:", r.data.program_output);
        console.log("Error:", r.data.compiler_error || r.data.program_error || "none");
    } catch (e) {
        console.error("Wandbox error:", e.response?.status, e.response?.data || e.message);
    }
}

async function testOneCompiler() {
    console.log("\n=== Testing OneCompiler ===");
    try {
        const r = await axios.post("https://onecompiler.com/api/v1/run", {
            language: "python",
            stdin: "",
            files: [{ name: "main.py", content: 'print("Hello from Python")' }]
        }, { timeout: 10000 });
        console.log("Status:", r.status);
        console.log("Data:", JSON.stringify(r.data, null, 2));
    } catch (e) {
        console.error("OneCompiler error:", e.response?.status, e.response?.data || e.message);
    }
}

async function testGlot() {
    console.log("\n=== Testing Glot.io (Python) ===");
    try {
        const r = await axios.post("https://glot.io/api/run/python/latest", {
            files: [{ name: "main.py", content: 'print("Hello from Python")' }]
        }, {
            timeout: 10000,
            headers: { "Content-Type": "application/json" }
        });
        console.log("Status:", r.status);
        console.log("Data:", JSON.stringify(r.data, null, 2));
    } catch (e) {
        console.error("Glot error:", e.response?.status, e.response?.data || e.message);
    }
}

async function testJDoodleFree() {
    console.log("\n=== Testing JDoodle (free execute) ===");
    try {
        const r = await axios.post("https://api.jdoodle.com/v1/execute", {
            script: 'print("Hello")',
            language: "python3",
            versionIndex: "4"
        }, { timeout: 10000 });
        console.log("Status:", r.status);
        console.log("Data:", JSON.stringify(r.data, null, 2));
    } catch (e) {
        console.error("JDoodle error:", e.response?.status, e.response?.data || e.message);
    }
}

async function main() {
    await testWandbox();
    await testOneCompiler();
    await testGlot();
    await testJDoodleFree();
}

main();
