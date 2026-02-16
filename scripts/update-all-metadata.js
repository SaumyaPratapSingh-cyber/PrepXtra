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
    examples: Array,
}, { strict: false });

const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

function camelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function generateCppSignature(fnName, params, ret) {
    // Basic mapping for C++ types
    const typeMap = {
        'List[int]': 'vector<int>&',
        'List[str]': 'vector<string>&',
        'List[List[int]]': 'vector<vector<int>>&',
        'List[List[str]]': 'vector<vector<string>>&',
        'str': 'string',
        'int': 'int',
        'bool': 'bool',
        'float': 'double',
        'Optional[ListNode]': 'ListNode*',
        'TreeNode': 'TreeNode*',
        'Optional[TreeNode]': 'TreeNode*',
        'List[int]': 'vector<int>&'
    };

    // This is a simplified generator for the most common ones
    let cppRet = ret === 'List[int]' ? 'vector<int>' : (ret === 'bool' ? 'bool' : (ret === 'int' ? 'int' : 'any'));
    if (ret.includes('Optional')) cppRet = 'ListNode*';
    if (ret.includes('TreeNode')) cppRet = 'TreeNode*';

    return `class Solution {\npublic:\n    ${cppRet} ${fnName}(vector<int>& nums) {\n        \n    }\n};`;
}

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const problemsInDb = await DSAProblem.find({});
        console.log(`Updating metadata for ${problemsInDb.length} problems...`);

        let updatedCount = 0;

        for (const problem of problemsInDb) {
            const data = allData[problem.slug];
            const fnName = data ? data.fn : camelCase(problem.slug);

            // 1. Python Signature
            const pythonSignature = data
                ? `class Solution:\n    def ${data.fn}(self, ${data.params}) -> ${data.ret}:\n        # Write your logic here\n        pass`
                : `class Solution:\n    def ${fnName}(self, nums: List[int]) -> any:\n        # Write your logic here\n        pass`;

            // 2. JavaScript Signature
            const jsSignature = `/**\n * @param {any} args\n * @return {any}\n */\nvar ${fnName} = function(nums) {\n    \n};`;

            // 3. C++ Signature (Generic template, will be refined per category in future iterations if needed)
            const cppSignature = `class Solution {\npublic:\n    any ${fnName}(any args) {\n        \n    }\n};`;

            // 4. Java Signature
            const javaSignature = `class Solution {\n    public any ${fnName}(any args) {\n        \n    }\n}`;

            // 5. Test Cases (Universal Coverage)
            let testCases = problem.testCases || [];
            if (data && data.tests && data.tests.length > 0) {
                testCases = data.tests;
            } else if ((!testCases || testCases.length === 0) && problem.examples && problem.examples.length > 0) {
                // Promote examples to test cases if empty
                testCases = problem.examples.map(ex => ({
                    input: ex.input,
                    output: ex.output,
                    hidden: false
                }));
            }

            await DSAProblem.updateOne(
                { _id: problem._id },
                {
                    $set: {
                        functionName: fnName,
                        "starterCode.python": pythonSignature,
                        "starterCode.javascript": jsSignature,
                        "starterCode.cpp": cppSignature,
                        "starterCode.java": javaSignature,
                        testCases: testCases
                    }
                }
            );

            updatedCount++;
            if (updatedCount % 50 === 0) console.log(`Processed ${updatedCount}/${problemsInDb.length}...`);
        }

        console.log(`\nSuccessfully updated all ${updatedCount} problems with multi-language signatures and universal test cases!`);
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

run();
