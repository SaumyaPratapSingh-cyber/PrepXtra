import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    userId: {
        type: String, // Or ObjectId if using real auth
        required: true,
        index: true
    },
    problemId: {
        type: String, // Slug or ID
        required: true,
        index: true
    },
    language: {
        type: String,
        enum: ['python', 'javascript', 'cpp', 'java'],
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'],
        required: true
    },
    testCasesPassed: {
        type: Number,
        default: 0
    },
    totalTestCases: {
        type: Number,
        default: 0
    },
    runtime: {
        type: Number, // in ms
        default: 0
    },
    memory: {
        type: Number, // in bytes
        default: 0
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
