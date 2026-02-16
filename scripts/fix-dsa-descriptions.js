
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");

// Load environment variables
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

// INLINE MODEL
const DSAProblemSchema = new Schema(
    {
        title: String,
        slug: String,
        description: String,
        constraints: [String],
    }, { strict: false }
);

const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fixDescriptions = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Find problems missing descriptions
        const missingProblems = await DSAProblem.find({
            $or: [
                { description: { $regex: "No description available" } },
                { description: "" },
                { description: null }
            ]
        });

        console.log(`Found ${missingProblems.length} problems with missing descriptions.`);

        for (const problem of missingProblems) {
            // console.log(`Fetching details for: ${problem.title} (${problem.slug})...`);

            try {
                // Fetch from alfa-leetcode-api
                const url = `https://alfa-leetcode-api.onrender.com/select?titleSlug=${problem.slug}`;
                const response = await axios.get(url, { timeout: 10000 });
                const data = response.data;

                if (data && (data.question || data.assignment)) { // API field varies? Previously saw 'question'
                    const desc = data.question || data.description || "No description found in API";

                    // Update DB
                    await DSAProblem.updateOne(
                        { _id: problem._id },
                        {
                            $set: {
                                description: desc
                            }
                        }
                    );
                    console.log(`Updated description for ${problem.slug}`);
                } else {
                    console.warn(`No description found in API response for ${problem.slug}`);
                }

            } catch (err) {
                console.error(`Error fetching ${problem.slug}: ${err.message}`);
                if (err.response && err.response.status === 429) {
                    console.log("Rate limited! Waiting 60 seconds...");
                    await wait(60000);
                }
            }

            // Wait to be nice to API
            await wait(2000);
        }

        console.log("Finished updating descriptions.");
        await mongoose.disconnect();

    } catch (error) {
        console.error("Global Error:", error);
    }
};

fixDescriptions();
