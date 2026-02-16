const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new mongoose.Schema({}, { strict: false });
const M = mongoose.models.DSAProblem || mongoose.model("DSAProblem", S);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    const total = await M.countDocuments();

    // 1. Test cases
    const sampleInput = await M.countDocuments({ "testCases.0.input": "Sample Input" });
    const emptyTC = await M.countDocuments({ testCases: { $size: 0 } });

    // 2. Descriptions
    const emptyDesc = await M.countDocuments({
        $or: [
            { description: "" },
            { description: { $exists: false } },
            { description: null }
        ]
    });
    const placeholderDesc = await M.countDocuments({
        description: { $regex: /Coming soon|placeholder|No description/i }
    });

    // 3. Starter code coverage
    const missingPython = await M.countDocuments({ "starterCode.python": { $in: [null, "", undefined] } });
    const missingJS = await M.countDocuments({ "starterCode.javascript": { $in: [null, "", undefined] } });
    const missingCpp = await M.countDocuments({ "starterCode.cpp": { $in: [null, "", undefined] } });
    const missingJava = await M.countDocuments({ "starterCode.java": { $in: [null, "", undefined] } });
    const noPython = await M.countDocuments({ "starterCode.python": { $exists: false } });
    const noJS = await M.countDocuments({ "starterCode.javascript": { $exists: false } });
    const noCpp = await M.countDocuments({ "starterCode.cpp": { $exists: false } });
    const noJava = await M.countDocuments({ "starterCode.java": { $exists: false } });

    // 4. Function names
    const noFuncName = await M.countDocuments({
        $or: [
            { functionName: "" },
            { functionName: { $exists: false } },
            { functionName: null }
        ]
    });

    console.log("========== FULL AUDIT ==========");
    console.log(`Total problems: ${total}`);
    console.log("");
    console.log("--- Test Cases ---");
    console.log(`  'Sample Input' placeholder: ${sampleInput}`);
    console.log(`  Empty testCases array: ${emptyTC}`);
    console.log(`  Good test cases: ${total - sampleInput - emptyTC}`);
    console.log("");
    console.log("--- Descriptions ---");
    console.log(`  Empty/null: ${emptyDesc}`);
    console.log(`  Placeholder text: ${placeholderDesc}`);
    console.log(`  Good descriptions: ${total - emptyDesc - placeholderDesc}`);
    console.log("");
    console.log("--- Starter Code ---");
    console.log(`  Missing Python: ${missingPython} (no field: ${noPython})`);
    console.log(`  Missing JavaScript: ${missingJS} (no field: ${noJS})`);
    console.log(`  Missing C++: ${missingCpp} (no field: ${noCpp})`);
    console.log(`  Missing Java: ${missingJava} (no field: ${noJava})`);
    console.log("");
    console.log("--- Function Names ---");
    console.log(`  Missing functionName: ${noFuncName}`);

    // Sample a few problems to check quality
    console.log("\n--- Sample Problem Details ---");
    const samples = await M.find({}).limit(5).lean();
    for (const s of samples) {
        console.log(`\n  [${s.slug}]`);
        console.log(`    Title: ${s.title}`);
        console.log(`    Desc length: ${(s.description || "").length} chars`);
        console.log(`    Test cases: ${(s.testCases || []).length}`);
        console.log(`    Function: ${s.functionName}`);
        console.log(`    Python starter: ${(s.starterCode?.python || "").substring(0, 60)}...`);
        console.log(`    JS starter: ${(s.starterCode?.javascript || "").substring(0, 60)}...`);
        console.log(`    C++ starter: ${(s.starterCode?.cpp || "").substring(0, 60)}...`);
        console.log(`    Java starter: ${(s.starterCode?.java || "").substring(0, 60)}...`);
    }

    await mongoose.disconnect();
}

run();
