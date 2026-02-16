
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

const part1 = require("./descriptions-part1");
const part2 = require("./descriptions-part2");

const allDescriptions = { ...part1, ...part2 };

const DSAProblemSchema = new Schema({ title: String, slug: String, description: String }, { strict: false });
const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const slugs = Object.keys(allDescriptions);
        console.log(`Updating ${slugs.length} problem descriptions...`);

        let updated = 0;
        let notFound = 0;

        for (const slug of slugs) {
            const result = await DSAProblem.updateOne(
                { slug },
                { $set: { description: allDescriptions[slug] } }
            );
            if (result.matchedCount > 0) {
                updated++;
            } else {
                notFound++;
                console.log(`  Not found in DB: ${slug}`);
            }
        }

        console.log(`\nDone! Updated: ${updated}, Not found: ${notFound}`);

        // Verify no more missing descriptions
        const stillMissing = await DSAProblem.countDocuments({
            $or: [
                { description: { $regex: "No description available" } },
                { description: "" },
                { description: null }
            ]
        });
        console.log(`Remaining problems with missing descriptions: ${stillMissing}`);

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

run();
