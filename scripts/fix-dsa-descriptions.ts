
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import dotenv from "dotenv";
import path from "path";
import axios from "axios";

// Load environment variables
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

// INLINE MODEL (to avoid import issues)
const DSAProblemSchema = new Schema(
    {
        title: String,
        slug: String,
        description: String,
        constraints: [String],
        // other fields exist, but we update these
    }, { strict: false } // Update loose fields if any
);

const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fixDescriptions = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
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
            console.log(`Fetching details for: ${problem.title} (${problem.slug})...`);

            try {
                // Fetch from alfa-leetcode-api
                const url = `https://alfa-leetcode-api.onrender.com/select?titleSlug=${problem.slug}`;
                const response = await axios.get(url, { timeout: 10000 });
                const data = response.data;

                if (data && data.question) {
                    // Update DB
                    await DSAProblem.updateOne(
                        { _id: problem._id },
                        {
                            $set: {
                                description: data.question,
                                // We might get other details if available in 'data' structure
                                // The API returns 'question' as HTML content usually.
                                // It also returns 'exampleTestcases' which we can parse? 
                                // For now, description is key.
                            }
                        }
                    );
                    console.log(`Updated description for ${problem.slug}`);
                } else {
                    console.warn(`No description found in API response for ${problem.slug}`);
                }

            } catch (err: any) {
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
