
import dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from "mongoose";

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const DSAProblemSchema = new mongoose.Schema({
    title: String,
    category: String,
}, { strict: false });

const DSAProblem = mongoose.models.DSAProblem || mongoose.model('DSAProblem', DSAProblemSchema);

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected to DB");

        const count = await DSAProblem.countDocuments();
        console.log("Total Problems:", count);

        const categories = await DSAProblem.distinct("category");
        console.log("Categories:", categories);

        const arrays = await DSAProblem.countDocuments({ category: "arrays" });
        console.log("Arrays Problems:", arrays);

        if (count > 0) {
            const sample = await DSAProblem.findOne();
            console.log("Sample Problem:", JSON.stringify(sample, null, 2));
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

check();
