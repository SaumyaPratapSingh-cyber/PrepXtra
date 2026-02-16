import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAssessmentResult extends Document {
    userId: string; // Linking to User (can be email or clerkId depending on auth)
    type: 'Aptitude' | 'Technical' | 'HR';
    company?: string;
    category?: string;
    score: number;
    totalQuestions: number;
    accuracy: number; // percentage
    timeTaken: number; // in seconds
    strictModeViolations: number;
    answers: {
        questionId: mongoose.Types.ObjectId;
        userAnswer: string;
        isCorrect: boolean;
        timeSpent: number; // seconds spent on this question
    }[];
    createdAt: Date;
}

const AssessmentResultSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, index: true },
        type: { type: String, required: true },
        company: { type: String },
        category: { type: String },
        score: { type: Number, required: true },
        totalQuestions: { type: Number, required: true },
        accuracy: { type: Number, required: true },
        timeTaken: { type: Number, required: true }, // Total duration
        strictModeViolations: { type: Number, default: 0 },
        answers: [
            {
                questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
                userAnswer: { type: String },
                isCorrect: { type: Boolean, required: true },
                timeSpent: { type: Number },
            },
        ],
    },
    { timestamps: true }
);

const AssessmentResult: Model<IAssessmentResult> = mongoose.models.AssessmentResult || mongoose.model<IAssessmentResult>('AssessmentResult', AssessmentResultSchema);

export default AssessmentResult;
