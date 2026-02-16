
const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(process.cwd(), ".env.local");
dotenv.config({ path: envPath });

const DSAProblemSchema = new Schema({ title: String, slug: String, description: String, difficulty: String, category: String }, { strict: false });
const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const missing = await DSAProblem.find({
        $or: [
            { description: { $regex: "No description available" } },
            { description: "" },
            { description: null }
        ]
    }).select("title slug difficulty category");

    console.log(`Total missing: ${missing.length}`);
    missing.forEach(p => console.log(`${p.slug}|${p.title}|${p.difficulty}|${p.category}`));
    await mongoose.disconnect();
};
run();
