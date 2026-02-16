
import mongoose from "mongoose";
import dotenv from "dotenv";
import CoreTopic from "../src/models/CoreTopic";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/prepxtra";

async function checkContent() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        const count = await CoreTopic.countDocuments();
        console.log(`Total Topics: ${count}`);

        if (count === 0) {
            console.log("❌ No topics found!");
            process.exit(1);
        }

        // Check a few topics for content
        const topics = await CoreTopic.find({}).limit(5);

        console.log("\nChecking Validation Samples:");
        for (const topic of topics) {
            console.log(`\nTopic: ${topic.title}`);
            console.log(`  - Difficulty: ${topic.difficulty}`);
            console.log(`  - Content Length: ${topic.content ? topic.content.length : 0}`);
            console.log(`  - Content Preview: ${topic.content ? topic.content.substring(0, 50).replace(/\n/g, ' ') + "..." : "N/A"}`);

            if (!topic.content || topic.content === "Coming soon...") {
                if (!topic.content.startsWith("#")) {
                    console.log("  ⚠️  Content might be placeholder or empty");
                }
            }
        }

        // Check specifically for one of the rich topics i added
        const richTopic = await CoreTopic.findOne({ title: "Process Management" });
        if (richTopic) {
            console.log(`\nSpecific Check (Process Management):`);
            console.log(`  - Content Length: ${richTopic.content?.length}`);
            if (richTopic.content && richTopic.content.includes("mermaid")) {
                console.log("  ✅ Contains Mermaid diagram");
            } else {
                console.log("  ❌ Missing Mermaid diagram");
            }
        } else {
            console.log("\n❌ 'Process Management' topic not found!");
        }

        console.log("\n✅ Database Content Check Complete");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

checkContent();
