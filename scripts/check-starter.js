const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new Schema({ testCases: Array, starterCode: Object, functionName: String, slug: String, title: String, category: String }, { strict: false });
const M = models.DSAProblem || model("DSAProblem", S);

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const total = await M.countDocuments();
    const withTC = await M.countDocuments({ "testCases.0": { $exists: true } });
    const withFN = await M.countDocuments({ functionName: { $exists: true, $ne: null } });
    const withSC = await M.countDocuments({ "starterCode.python": { $exists: true, $ne: null } });
    console.log("Total:", total, "With TestCases:", withTC, "With FunctionName:", withFN, "With StarterCode:", withSC);

    const sample = await M.findOne({ slug: "two-sum" }).select("starterCode functionName testCases").lean();
    console.log("two-sum sample:", JSON.stringify(sample, null, 2));

    const sample2 = await M.findOne({ slug: "contains-duplicate" }).select("starterCode functionName testCases").lean();
    console.log("contains-duplicate sample:", JSON.stringify(sample2, null, 2));

    await mongoose.disconnect();
})();
