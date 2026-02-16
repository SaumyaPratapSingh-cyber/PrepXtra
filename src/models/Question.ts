import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestion extends Document {
    content: string;
    type: 'Aptitude' | 'Technical' | 'HR';
    category: string; // e.g., 'Logical Reasoning', 'Java', 'Behavioral'
    companies: string[]; // e.g., ['Google', 'Amazon']
    difficulty: 'Easy' | 'Medium' | 'Hard';
    options: string[]; // For MCQs
    correctAnswer: string; // The correct option or answer text
    explanation: string;
    createdAt: Date;
    updatedAt: Date;
}

const QuestionSchema: Schema = new Schema(
    {
        content: { type: String, required: true },
        type: {
            type: String,
            enum: ['Aptitude', 'Technical', 'HR'],
            required: true
        },
        category: { type: String, required: true, index: true },
        companies: [{ type: String, index: true }],
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Medium'
        },
        options: [{ type: String }], // Optional for HR questions if they are open-ended
        correctAnswer: { type: String, required: false }, // HR might not have a single correct answer
        explanation: { type: String },
    },
    { timestamps: true }
);

// Prevent model recompilation error in Next.js
const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
