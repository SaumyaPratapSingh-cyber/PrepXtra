const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new Schema({ slug: String, description: String, testCases: Array, examples: Array }, { strict: false });
const M = models.DSAProblem || model("DSAProblem", S);

async function fetchWithRetry(slug, retries = 2, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            const url = `https://alfa-leetcode-api.onrender.com/select?titleSlug=${slug}`;
            const response = await axios.get(url, { timeout: 15000 });
            return response.data;
        } catch (err) {
            if (err.response && err.response.status === 429) {
                console.log(`Rate limited for ${slug}. Retrying in ${delay}ms...`);
                await new Promise(r => setTimeout(r, delay));
                delay *= 2;
                continue;
            }
            throw err;
        }
    }
    return null;
}

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const problems = await M.find({
        $or: [
            { "testCases.0.input": "Sample Input" },
            { testCases: { $size: 0 } }
        ]
    }).limit(20); // Small batch to be safe

    console.log(`Processing batch of ${problems.length} problems...`);

    let count = 0;
    for (const p of problems) {
        try {
            const data = await fetchWithRetry(p.slug);
            if (data && data.question) {
                const desc = data.question;
                const testCases = [];

                // Parse HTML description for examples
                const exampleBlocks = desc.split(/Example \d+:/).slice(1);
                exampleBlocks.forEach(block => {
                    const input = block.match(/Input:<\/strong>\s*(.*?)(?=\n|<br|<\/p|Output:)/s);
                    const output = block.match(/Output:<\/strong>\s*(.*?)(?=\n|<br|<\/p|Explanation:|$)/s);

                    if (input && output) {
                        testCases.push({
                            input: input[1].replace(/<[^>]*>?/gm, '').trim(),
                            output: output[1].replace(/<[^>]*>?/gm, '').trim()
                        });
                    }
                });

                if (testCases.length > 0) {
                    await M.updateOne({ _id: p._id }, {
                        $set: {
                            description: desc,
                            examples: testCases,
                            testCases: testCases
                        }
                    });
                    count++;
                    console.log(`[OK] Fixed ${p.slug}`);
                } else {
                    console.log(`[SKIP] No test cases found in HTML for ${p.slug}`);
                }
            }
        } catch (err) {
            console.error(`[ERR] ${p.slug}: ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 1500)); // Be gentle
    }

    console.log(`Batch finished. Fixed ${count} problems.`);
    await mongoose.disconnect();
}

run();
