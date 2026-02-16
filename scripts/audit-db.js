const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new mongoose.Schema({}, { strict: false });
const M = mongoose.models.DSAProblem || mongoose.model("DSAProblem", S);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const total = await M.countDocuments();
    const sampleInput = await M.countDocuments({ "testCases.0.input": "Sample Input" });
    const emptyTC = await M.countDocuments({ testCases: { $size: 0 } });

    console.log("=== DATABASE AUDIT ===");
    console.log("Total problems:", total);
    console.log("Still 'Sample Input' placeholder:", sampleInput);
    console.log("Empty testCases:", emptyTC);
    console.log("Good test cases:", total - sampleInput - emptyTC);

    // Show some examples of bad ones
    const bad = await M.find({
        $or: [
            { "testCases.0.input": "Sample Input" },
            { testCases: { $size: 0 } }
        ]
    }).select("slug title category").limit(10).lean();

    console.log("\n=== SAMPLE BAD PROBLEMS ===");
    bad.forEach(p => console.log(`  - ${p.slug} (${p.category || "N/A"})`));

    // Check how many have proper starterCode for all 4 languages
    const missingStarter = await M.countDocuments({
        $or: [
            { "starterCode.python": { $exists: false } },
            { "starterCode.cpp": { $exists: false } },
            { "starterCode.java": { $exists: false } },
            { "starterCode.javascript": { $exists: false } }
        ]
    });
    console.log("\nMissing starter code for at least 1 language:", missingStarter);

    await mongoose.disconnect();
}

run();
