import { Schema, model, models } from "mongoose";

const CoreQuizSchema = new Schema(
    {
        topic: {
            type: Schema.Types.ObjectId,
            ref: "CoreTopic",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: String,
        questions: [{
            question: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
                required: true,
            },
            options: [{
                type: String,
            }], // For multiple choice questions
            correctAnswer: {
                type: Schema.Types.Mixed, // Can be string, number, or array
                required: true,
            },
            explanation: {
                type: String,
                required: true,
            },
            difficulty: {
                type: String,
                enum: ["Easy", "Medium", "Hard"],
                default: "Medium",
            },
            points: {
                type: Number,
                default: 1,
            },
        }],
        passingScore: {
            type: Number,
            default: 70, // Percentage
        },
        timeLimit: {
            type: Number, // Minutes, 0 means no limit
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const CoreQuiz = models.CoreQuiz || model("CoreQuiz", CoreQuizSchema);

export default CoreQuiz;
