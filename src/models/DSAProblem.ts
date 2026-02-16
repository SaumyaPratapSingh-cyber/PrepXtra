import { Schema, model, models } from "mongoose";

const DSAProblemSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },
        category: {
            type: String,
            required: true, // 'arrays', 'trees', 'dp', etc.
        },
        tags: [String],
        description: {
            type: String,
            required: true,
        },
        inputFormat: String,
        outputFormat: String,
        examples: [{
            input: String,
            output: String,
            explanation: String,
        }],
        constraints: [String],
        testCases: [{
            input: String,
            output: String,
            hidden: { type: Boolean, default: false },
        }],
        companies: [String],
        starterCode: {
            python: String,
            javascript: String,
            cpp: String,
            java: String,
        },
        functionName: String, // e.g., "twoSum"
        solutions: [{
            language: String, // 'python', 'java', etc.
            approach: String, // 'Brute Force', 'Optimal', etc.
            code: String,
            timeComplexity: String,
            spaceComplexity: String,
        }],
        hints: [String],
        relatedProblems: [{ type: Schema.Types.ObjectId, ref: "DSAProblem" }],
    },
    {
        timestamps: true,
    }
);

const DSAProblem = models.DSAProblem || model("DSAProblem", DSAProblemSchema);

export default DSAProblem;
