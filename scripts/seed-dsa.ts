// Seed script with proper env loading
import dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from "mongoose";

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Import after env is loaded
const DSAProblemSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true },
    difficulty: String,
    category: String,
    tags: [String],
    description: String,
    examples: [{ input: String, output: String, explanation: String }],
    constraints: String,
    testCases: [{ input: String, output: String, hidden: Boolean }],
    companies: [String],
    solution: {
        approach: String,
        code: {
            python: String,
            javascript: String,
            cpp: String,
            java: String
        },
        timeComplexity: String,
        spaceComplexity: String
    },
    hints: [String]
}, { timestamps: true });

const DSAProblem = mongoose.models.DSAProblem || mongoose.model('DSAProblem', DSAProblemSchema);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in environment variables");
    process.exit(1);
}

// Sample of Striver's A2Z problems - will add more in batches
const dsaProblems = [
    {
        title: "Two Sum",
        slug: "two-sum",
        difficulty: "easy",
        category: "arrays",
        tags: ["array", "hash-table"],
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            }
        ],
        constraints: "2 <= nums.length <= 10^4",
        companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
        solution: {
            approach: "Use a hash map to store numbers we've seen. For each number, check if (target - number) exists in the map.",
            code: {
                python: "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []"
            },
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)"
        }
    },
    {
        title: "Reverse a Number",
        slug: "reverse-number",
        difficulty: "easy",
        category: "maths",
        tags: ["maths"],
        description: "Reverse the digits of a given number.",
        examples: [{ input: "n = 12345", output: "54321" }],
        companies: ["Amazon", "Microsoft"]
    },
    {
        title: "Palindrome Number",
        slug: "palindrome-number",
        difficulty: "easy",
        category: "maths",
        tags: ["maths"],
        description: "Check if a number is a palindrome.",
        examples: [{ input: "n = 121", output: "true" }],
        companies: ["Google", "Amazon"]
    },
    {
        title: "Maximum Subarray (Kadane's Algorithm)",
        slug: "maximum-subarray-kadanes",
        difficulty: "medium",
        category: "arrays",
        tags: ["array", "dynamic-programming"],
        description: "Find the contiguous subarray with the largest sum.",
        companies: ["Amazon", "Microsoft", "Facebook", "Google"]
    },
    {
        title: "Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating",
        difficulty: "medium",
        category: "strings",
        tags: ["string", "sliding-window"],
        description: "Find the length of the longest substring without repeating characters.",
        companies: ["Amazon", "Google", "Facebook"]
    }
];

async function seedDatabase() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        console.log("URI:", MONGODB_URI?.substring(0, 30) + "...");

        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing
        const deleteResult = await DSAProblem.deleteMany({});
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing problems`);

        // Insert new
        const result = await DSAProblem.insertMany(dsaProblems);
        console.log(`✅ Inserted ${result.length} problems successfully!`);

        console.log("\n🎉 Database seeded successfully!");
        await mongoose.connection.close();
        process.exit(0);
    } catch (error: any) {
        console.error("❌ Error seeding database:", error.message);
        process.exit(1);
    }
}

seedDatabase();
