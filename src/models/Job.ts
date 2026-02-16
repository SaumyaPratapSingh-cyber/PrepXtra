import { Schema, model, models } from "mongoose";

export interface IJob {
    title: string;
    company: string;
    location: string;
    link: string;
    source: string; // 'LinkedIn', 'Indeed', 'GitHub', etc.
    postedAt: Date;
    tags: string[];
    isRemote: boolean;
    description?: string;
    salary?: string;
}

const JobSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            index: true,
        },
        company: {
            type: String,
            required: [true, "Company name is required"],
        },
        location: {
            type: String,
            default: "Unknown",
        },
        link: {
            type: String,
            required: [true, "Job link is required"],
            unique: true, // Prevent duplicate jobs
        },
        source: {
            type: String,
            required: true,
            index: true,
        },
        postedAt: {
            type: Date,
            default: Date.now,
        },
        tags: {
            type: [String],
            default: [],
            index: true,
        },
        isRemote: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
        },
        salary: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Expire jobs after 30 days to keep the DB clean
JobSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const Job = models.Job || model("Job", JobSchema);

export default Job;
