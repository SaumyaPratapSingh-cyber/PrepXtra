const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

const part1 = require("./problem-data-part1");
const part2 = require("./problem-data-part2");
const part3 = require("./problem-data-part3");

const allData = { ...part1, ...part2, ...part3 };

const DSAProblemSchema = new Schema({
    title: String,
    slug: String,
    starterCode: Object,
    functionName: String,
    testCases: Array,
}, { strict: false });

const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

// Helper to camelCase slugs (e.g. "two-sum" -> "twoSum")
function camelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const problemsInDb = await DSAProblem.find({});
        console.log(`Checking ${problemsInDb.length} problems...`);

        let updatedCount = 0;

        for (const problem of problemsInDb) {
            const data = allData[problem.slug];

            let functionName = "";
            let pythonSignature = "";
            let testCases = [];

            if (data) {
                functionName = data.fn;
                pythonSignature = `class Solution:\n    def ${data.fn}(self, ${data.params}) -> ${data.ret}:\n        # Write your logic here\n        pass`;
                testCases = data.tests || [];
            } else {
                // Fallback for problems not explicitly in our metadata
                functionName = camelCase(problem.slug);
                pythonSignature = `class Solution:\n    def ${functionName}(self, nums: List[int]) -> any:\n        # Write your logic here\n        pass`;
                testCases = [];
            }

            // Update the problem
            await DSAProblem.updateOne(
                { _id: problem._id },
                {
                    $set: {
                        functionName: functionName,
                        "starterCode.python": pythonSignature,
                        testCases: testCases
                    }
                }
            );
            updatedCount++;

            if (updatedCount % 50 === 0) {
                console.log(`Updated ${updatedCount}/${problemsInDb.length} problems...`);
            }
        }

        console.log(`\nSuccessfully updated ${updatedCount} problems!`);
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error during update:", error);
        process.exit(1);
    }
}

run();
