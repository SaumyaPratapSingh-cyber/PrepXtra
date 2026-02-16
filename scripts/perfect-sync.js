const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new Schema({ slug: String, description: String, testCases: Array, examples: Array, starterCode: Object }, { strict: false });
const M = models.DSAProblem || model("DSAProblem", S);

const ARTICLES_DIR = "e:/PrepXtra/web/scripts/neetcode-raw/leetcode-main/articles";

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    const problems = await M.find({});
    console.log(`Auditing ${problems.length} problems...`);

    let count = 0;
    for (const p of problems) {
        const mdPath = path.join(ARTICLES_DIR, `${p.slug}.md`);
        if (fs.existsSync(mdPath)) {
            const content = fs.readFileSync(mdPath, "utf-8");

            // 1. Extract Description (Intuition + Algorithm + Complexity)
            const descriptionMatch = content.match(/## 1\..*?\n(.*?)\n---/s) || content.match(/(.*?)##/s);
            let description = descriptionMatch ? descriptionMatch[1].trim() : content.substring(0, 1000);

            // Clean up description
            description = description.replace(/::tabs-start|::tabs-end|::tabs/g, "");

            // 2. Extract Code Snippets
            const snippets = {};
            const pyMatch = content.match(/```python\n([\s\S]*?)\n```/);
            const javaMatch = content.match(/```java\n([\s\S]*?)\n```/);
            const cppMatch = content.match(/```cpp\n([\s\S]*?)\n```/);
            const jsMatch = content.match(/```javascript\n([\s\S]*?)\n```/);

            if (pyMatch) snippets.python = pyMatch[1].trim();
            if (javaMatch) snippets.java = javaMatch[1].trim();
            if (cppMatch) snippets.cpp = cppMatch[1].trim();
            if (jsMatch) snippets.javascript = jsMatch[1].trim();

            // 3. Extract Test Cases from "Example - Dry Run" or Input markers
            const testCases = [];
            const exampleMatches = content.match(/Input: (.*?)\n.*?Output: (.*?)(?=\n|$)/g);
            if (exampleMatches) {
                exampleMatches.forEach(ex => {
                    const i = ex.match(/Input: (.*?)\n/);
                    const o = ex.match(/Output: (.*?)(?=\n|$)/);
                    if (i && o) {
                        testCases.push({
                            input: i[1].trim().replace(/nums = |target = |arr = /g, "").replace(/, /g, "\n"),
                            output: o[1].trim()
                        });
                    }
                });
            }

            // If we have data, update it
            if (Object.keys(snippets).length > 0 || testCases.length > 0) {
                await M.updateOne({ _id: p._id }, {
                    $set: {
                        description: description || p.description,
                        starterCode: snippets,
                        testCases: testCases.length > 0 ? testCases : p.testCases,
                        examples: testCases.length > 0 ? testCases : p.examples
                    }
                });
                count++;
            }
        }
    }

    console.log(`Successfully synced high-quality data for ${count} problems.`);
    await mongoose.disconnect();
}

run();
