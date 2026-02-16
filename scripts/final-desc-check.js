const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new Schema({ slug: String, description: String, title: String }, { strict: false });
const DSAProblem = models.DSAProblem || model("DSAProblem", S);

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const missing = await DSAProblem.find({
        $or: [
            { description: { $exists: false } },
            { description: "" },
            { description: null },
            { description: "Coming soon..." }
        ]
    }).select("title slug description category");

    console.log(`Total problems missing real descriptions: ${missing.length}`);
    if (missing.length > 0) {
        console.log("Samples:");
        missing.slice(0, 10).forEach(p => console.log(`- [${p.category}] ${p.title} (${p.slug})`));
    }

    await mongoose.disconnect();
})();
