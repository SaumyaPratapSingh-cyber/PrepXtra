
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import dotenv from "dotenv";
import path from "path";

// Load environment variables
const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

// INLINE MODEL (to avoid import issues)
const DSAProblemSchema = new Schema(
    {
        title: String,
        slug: String,
        description: String,
    }
);

const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

const checkDescriptions = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");

        const total = await DSAProblem.countDocuments();
        const missing = await DSAProblem.countDocuments({
            $or: [
                { description: { $regex: "No description available" } },
                { description: "" },
                { description: null }
            ]
        });

        console.log(`Total Problems: ${total}`);
        console.log(`Missing Descriptions: ${missing}`);

        if (missing > 0) {
            const examples = await DSAProblem.find({
                $or: [
                    { description: { $regex: "No description available" } },
                    { description: "" },
                    { description: null }
                ]
            }).limit(10).select("title slug");

            console.log("Example missing problems:");
            examples.forEach(p => console.log(`- ${p.title} (${p.slug})`));
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

checkDescriptions();
