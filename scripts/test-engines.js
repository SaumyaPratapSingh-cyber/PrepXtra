const axios = require("axios");

async function testWandboxLanguages() {
    // Test C++
    console.log("=== C++ ===");
    try {
        const r = await axios.post("https://wandbox.org/api/compile.json", {
            code: '#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5;\n    int b = 10;\n    cout << a + b << endl;\n    return 0;\n}',
            compiler: "gcc-head",
        }, { timeout: 15000 });
        console.log("Output:", r.data.program_output);
        console.log("Error:", r.data.compiler_error || "none");
    } catch (e) {
        console.error("C++ Error:", e.message);
    }

    // Test C++ with compile error (line numbers!)
    console.log("\n=== C++ Compile Error ===");
    try {
        const r = await axios.post("https://wandbox.org/api/compile.json", {
            code: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "hello" << endl\n    return 0;\n}',
            compiler: "gcc-head",
        }, { timeout: 15000 });
        console.log("Output:", r.data.program_output || "none");
        console.log("Compiler message:", r.data.compiler_message || r.data.compiler_error);
    } catch (e) {
        console.error("Error:", e.message);
    }

    // Test C++ with runtime error
    console.log("\n=== C++ Runtime Error ===");
    try {
        const r = await axios.post("https://wandbox.org/api/compile.json", {
            code: '#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v;\n    cout << v.at(10) << endl;\n    return 0;\n}',
            compiler: "gcc-head",
        }, { timeout: 15000 });
        console.log("Output:", r.data.program_output || "none");
        console.log("Program Error:", r.data.program_error || "none");
        console.log("Signal:", r.data.signal || "none");
    } catch (e) {
        console.error("Error:", e.message);
    }

    // Test Judge0 CE free instance
    console.log("\n=== Judge0 CE Free (Java) ===");
    try {
        const r = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
            source_code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java");\n    }\n}',
            language_id: 62,
            stdin: ""
        }, {
            timeout: 15000,
            headers: { "Content-Type": "application/json" }
        });
        console.log("Data:", JSON.stringify(r.data, null, 2));
    } catch (e) {
        console.error("Judge0 CE:", e.response?.status, e.response?.data || e.message);
    }

    // Test the free judge0 instance (no RapidAPI)
    console.log("\n=== Judge0 CE Direct (no key) ===");
    try {
        const r = await axios.post("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
            source_code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java");\n    }\n}',
            language_id: 62,
            stdin: ""
        }, {
            timeout: 15000,
            headers: { "Content-Type": "application/json" }
        });
        console.log("Data:", JSON.stringify(r.data, null, 2));
    } catch (e) {
        console.error("Judge0 Direct:", e.response?.status, e.response?.data || e.message);
    }
}

testWandboxLanguages();
