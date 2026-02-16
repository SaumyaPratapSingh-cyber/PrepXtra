
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import DSAProblem from "../src/models/DSAProblem";

// Load environment variables
const envPath = path.resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

console.log("Connecting to MongoDB...");

const manualProblems = ["two-sum", "longest-substring-without-repeating-characters", "valid-parentheses"];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");

        // Load NeetCode Data
        const neetcodeDataPath = path.join(__dirname, "neetcode-data.json");
        const neetcodeData = JSON.parse(fs.readFileSync(neetcodeDataPath, "utf8"));

        const problemsToInsert = [];
        const baseDir = path.join(__dirname, "neetcode-raw/leetcode-main");

        console.log(`Processing ${neetcodeData.length} problems...`);

        for (const item of neetcodeData) {
            const slug = item.link.replace(/\/$/, "");

            if (manualProblems.includes(slug)) {
                console.log(`Skipping manual problem: ${slug}`);
                continue;
            }

            // Read Description
            let description = "";
            const mdPath = path.join(baseDir, "articles", `${slug}.md`);
            if (fs.existsSync(mdPath)) {
                description = fs.readFileSync(mdPath, "utf8");
                // Cleanup description if needed (remove frontmatter?)
                // Usually markdown is fine.
            } else {
                description = `No description available for ${item.problem}.`;
            }

            // Read Solution (Python)
            // Filename format: code field in json (e.g. 0001-two-sum) + .py
            let solutionCode = "";
            // try python
            const pyPath = path.join(baseDir, "python", `${item.code}.py`);
            if (fs.existsSync(pyPath)) {
                solutionCode = fs.readFileSync(pyPath, "utf8");
            }

            // Construct Problem Object
            problemsToInsert.push({
                title: item.problem,
                slug: slug,
                difficulty: item.difficulty.toLowerCase(),
                category: item.pattern || "General",
                tags: [item.pattern || "General"],
                description: description,
                examples: [],
                constraints: [],
                starterCode: {
                    python: `# Write your solution here for ${item.problem}\nclass Solution:\n    def ${slug.replace(/-/g, '_')}(self, ...):\n        pass`,
                    javascript: `// Write your solution here for ${item.problem}\n/**\n * @param {any} ...\n * @return {any}\n */\nvar solution = function(...) {\n    \n};`,
                    java: `class Solution {\n    public void ${slug.replace(/-/g, '')}(...) {\n        \n    }\n}`,
                    cpp: `class Solution {\npublic:\n    void ${slug.replace(/-/g, '')}(...) {\n        \n    }\n};`
                },
                functionName: "solution",
                solutions: solutionCode ? [{
                    language: "python",
                    approach: "NeetCode Solution",
                    code: solutionCode,
                    timeComplexity: "O(n)",
                    spaceComplexity: "O(n)"
                }] : [],
                hints: []
            });
        }

        // Bulk Upsert
        console.log(`Inserting ${problemsToInsert.length} problems...`);
        for (const prob of problemsToInsert) {
            await DSAProblem.updateOne(
                { slug: prob.slug },
                { $set: prob },
                { upsert: true }
            );
        }

        console.log("Seeding complete.");
        await mongoose.disconnect();

    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
};

seedDB();
