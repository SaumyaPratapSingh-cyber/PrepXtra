import { Schema, model, models } from "mongoose";

const PersonalizedStudyPlanSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        targetCompany: {
            type: String,
            required: true,
        },
        targetRole: {
            type: String,
            required: true,
        },
        resumeUrl: {
            type: String, // Store URL if we upload to cloud storage, or just keep text for now if ephemeral
        },
        resumeText: {
            type: String, // Extracted text for re-analysis if needed
        },
        analysis: {
            strengths: [String],
            weaknesses: [String],
            extractedSkills: [String],
            gapAnalysis: String,
        },
        roadmap: [
            {
                week: Number,
                day: Number,
                topic: String,
                description: String,
                resources: [
                    {
                        title: String,
                        url: String,
                        type: { type: String, enum: ["video", "article", "problem"] },
                    },
                ],
                completed: { type: Boolean, default: false },
            },
        ],
        curatedQuestions: [
            {
                problemId: { type: Schema.Types.ObjectId, ref: "DSAProblem" }, // Ideally link to existing DB problems
                title: String,
                difficulty: String,
                pattern: String, // e.g., "Two Pointers", "Sliding Window"
                companyTag: String, // "Google", "Amazon"
                solved: { type: Boolean, default: false },
                externalLink: String, // If not in our DB
            },
        ],
        generatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model overwrite in development
const PersonalizedStudyPlan = models.PersonalizedStudyPlan || model("PersonalizedStudyPlan", PersonalizedStudyPlanSchema);

export default PersonalizedStudyPlan;
