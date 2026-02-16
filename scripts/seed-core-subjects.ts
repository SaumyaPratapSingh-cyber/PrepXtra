import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

import CoreSubject from "../src/models/CoreSubject";
import CoreTopic from "../src/models/CoreTopic";
import CoreQuiz from "../src/models/CoreQuiz";

import { coreFoundationsSubjects } from "./seed-data/core-foundations";
import { systemsNetworkingSubjects } from "./seed-data/systems-networking";
import { databaseSubjects } from "./seed-data/databases";
import { dataScienceSubjects } from "./seed-data/data-science";
import { programmingDevSubjects } from "./seed-data/programming-dev";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/prepxtra";

// Combine all subjects
const allSubjects = [
    ...coreFoundationsSubjects,
    ...systemsNetworkingSubjects,
    ...databaseSubjects,
    ...dataScienceSubjects,
    ...programmingDevSubjects
];

async function seedCoreSubjects() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing data
        console.log("\n🗑️  Clearing existing Core Subjects data...");
        await CoreQuiz.deleteMany({});

        await CoreTopic.deleteMany({});
        await CoreSubject.deleteMany({});
        console.log("✅ Cleared existing data");

        let totalSubjects = 0;
        let totalTopics = 0;
        let totalContent = 0;
        let totalQuizzes = 0;

        console.log("\n📚 Seeding Core Subjects...\n");

        // Process each subject
        for (const subjectData of allSubjects) {
            const { topics, ...subjectFields } = subjectData;

            // Create subject
            const subject = await CoreSubject.create(subjectFields);
            totalSubjects++;
            console.log(`  ✓ Created subject: ${subject.name}`);

            // Process topics for this subject
            if (topics && topics.length > 0) {
                for (const topicData of topics as any[]) {
                    // Extract quiz if it exists
                    const { quiz, content, ...otherFields } = topicData;

                    // Ensure content is a string
                    let contentString = "Coming soon...";
                    if (typeof content === "string") {
                        contentString = content;
                    } else if (content && typeof content === "object") {
                        // Handle legacy object structure
                        contentString = "# " + topicData.title + "\n\nContent is being updated to the new format.";
                    }

                    // Create topic with content embedded
                    const topic = await CoreTopic.create({
                        ...otherFields,
                        content: contentString,
                        subject: subject._id
                    });
                    totalTopics++;
                    console.log(`    ✓ Created topic: ${topic.title}`);

                    // Create quiz if provided
                    if (quiz) {
                        const quizDoc = await CoreQuiz.create({
                            ...quiz,
                            topic: topic._id
                        });
                        totalQuizzes++;
                        console.log(`      ✓ Created quiz: ${quizDoc.title}`);
                    }
                }
            }
        }

        console.log("\n" + "=".repeat(60));
        console.log("🎉 Database seeded successfully!");
        console.log("=".repeat(60));
        console.log(`\n📊 Summary:`);
        console.log(`   • Subjects:  ${totalSubjects}`);
        console.log(`   • Topics:    ${totalTopics}`);
        console.log(`   • Content:   ${totalContent}`);
        console.log(`   • Quizzes:   ${totalQuizzes}`);
        console.log("\n" + "=".repeat(60));

        // Display subjects by category
        console.log("\n📋 Subjects by Category:\n");

        const categories = [
            "Computer Science Core Foundations",
            "Systems & Networking",
            "Data and Database Technologies",
            "Data Science",
            "Programming & Software Development"
        ];

        for (const category of categories) {
            const categorySubjects = await CoreSubject.find({ category }).sort({ order: 1 });
            console.log(`\n${category} (${categorySubjects.length} subjects):`);
            categorySubjects.forEach((subject, index) => {
                console.log(`  ${index + 1}. ${subject.name} (${subject.difficulty})`);
            });
        }

        console.log("\n" + "=".repeat(60));
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedCoreSubjects();
