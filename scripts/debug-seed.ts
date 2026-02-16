import mongoose from "mongoose";
import dotenv from "dotenv";

console.log("Starting debug seed script...");

dotenv.config({ path: ".env.local" });
console.log("Config loaded. URI present:", !!process.env.MONGODB_URI);

import CoreSubject from "../src/models/CoreSubject";
import CoreTopic from "../src/models/CoreTopic";
import CoreQuiz from "../src/models/CoreQuiz";

console.log("Models imported.");

import { coreFoundationsSubjects } from "./seed-data/core-foundations";
import { systemsNetworkingSubjects } from "./seed-data/systems-networking";
import { dataTechnologiesSubjects } from "./seed-data/data-technologies";
import { dataScienceSubjects } from "./seed-data/data-science";
import { softwareDevelopmentSubjects } from "./seed-data/software-development";

console.log("Seed data files imported.");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/prepxtra";

const allSubjects = [
    ...coreFoundationsSubjects,
    ...systemsNetworkingSubjects,
    ...dataTechnologiesSubjects,
    ...dataScienceSubjects,
    ...softwareDevelopmentSubjects
];

async function seedCoreSubjects() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        console.log("Clearing existing data...");
        await CoreQuiz.deleteMany({});
        await CoreTopic.deleteMany({});
        await CoreSubject.deleteMany({});
        console.log("✅ Cleared existing data");

        for (const subjectData of allSubjects) {
            console.log(`Processing subject: ${subjectData.name}`);
            const { topics, ...subjectFields } = subjectData;
            const subject = await CoreSubject.create(subjectFields);
            console.log(`  ✓ Created subject: ${subject.name}`);

            if (topics && topics.length > 0) {
                for (const topicData of topics as any[]) {
                    const { quiz, content, ...otherFields } = topicData;
                    const topic = await CoreTopic.create({
                        ...otherFields,
                        content: content || "Coming soon...",
                        subject: subject._id
                    });
                    console.log(`    ✓ Created topic: ${topic.title}`);
                }
            }
        }
        console.log("Seeding complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
}

seedCoreSubjects();
