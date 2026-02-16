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
            strategicRecommendation: String,
            careerOpportunities: [String], // New: Career paths based on resume
        },
        selectedRoadmapId: {
            type: String, // New: Link to general tracker roadmap (e.g., 'fullstack')
            default: 'fullstack'
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
                        type: { type: String },
                    },
                ],
                completed: { type: Boolean, default: false },
            },
        ],
        curatedQuestions: [
            {
                problemId: { type: Schema.Types.ObjectId, ref: "DSAProblem" },
                title: String,
                difficulty: String,
                pattern: String,
                companyTag: String,
                solved: { type: Boolean, default: false },
                externalLink: String,
            },
        ],
        interviewQuestions: [
            {
                question: String,
                answer: String,
                category: String, // e.g., 'Behavioral', 'Technical', 'System Design'
            }
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
const PersonalizedStudyPlan = models.PersonalizedStudyPlanTrack || model("PersonalizedStudyPlanTrack", PersonalizedStudyPlanSchema);

export default PersonalizedStudyPlan;
