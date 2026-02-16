const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new mongoose.Schema({}, { strict: false });
const M = mongoose.models.DSAProblem || mongoose.model("DSAProblem", S);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const bad = await M.find({
        $or: [
            { "testCases.0.input": "Sample Input" },
            { testCases: { $size: 0 } }
        ]
    }).select("slug title category functionName starterCode").lean();

    console.log(`Remaining ${bad.length} problems:`);
    bad.forEach(p => {
        const py = p.starterCode?.python || "";
        const funcMatch = py.match(/def\s+(\w+)\(self,?\s*(.*?)\)/);
        const params = funcMatch ? funcMatch[2] : "N/A";
        console.log(`  ${p.slug} | ${p.category || "?"} | func: ${p.functionName} | params: ${params}`);
    });

    await mongoose.disconnect();
}

run();
