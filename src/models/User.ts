import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please provide a name"],
            minlength: [2, "Name must be at least 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: { type: String, select: true },
        verificationTokenExpiry: { type: Date, select: true },
        resetPasswordOTP: { type: String, select: true },
        resetPasswordOTPExpiry: { type: Date, select: true },
        // Expanded Profile Fields
        headline: { type: String, default: "" },
        bio: { type: String, default: "" },
        website: { type: String, default: "" },
        github: { type: String, default: "" },
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        skills: { type: [String], default: [] },
        // Track Selection & Progress
        selectedTrack: {
            type: String,
            enum: ["resume-based", "general", null],
            default: null
        },
        targetCompany: { type: String, default: "" },
        targetRole: { type: String, default: "" },
        // Core Subjects Progress Tracking
        coreSubjectsProgress: [{
            subject: { type: Schema.Types.ObjectId, ref: "CoreSubject" },
            completedTopics: [{ type: Schema.Types.ObjectId, ref: "CoreTopic" }],
            completedContent: [{ type: Schema.Types.ObjectId, ref: "CoreContent" }],
            quizScores: [{
                quiz: { type: Schema.Types.ObjectId, ref: "CoreQuiz" },
                score: Number,
                totalPoints: Number,
                passed: Boolean,
                completedAt: Date,
            }],
            lastAccessed: { type: Date, default: Date.now },
            totalTimeSpent: { type: Number, default: 0 }, // in minutes
        }],
        learningStreak: {
            current: { type: Number, default: 0 },
            longest: { type: Number, default: 0 },
            lastActivity: { type: Date, default: null },
        },
        // Newsletter & Job Preferences
        newsletter: {
            consent: { type: Boolean, default: false },
            consentedAt: { type: Date },
            lastEmailSentAt: { type: Date },
            preferences: {
                roles: { type: [String], default: [] }, // e.g. "Software Engineer", "Frontend Developer"
                locations: { type: [String], default: [] }, // e.g. "Remote", "Bangalore"
                experienceLevel: { type: String, default: "Entry Level" }, // "Internship", "Entry Level", etc.
            }
        },
        // Future fields for Roadmap/Progress can be added here
    },
    {
        timestamps: true,
    }
);

// Prevent model overwrite in development
const User = models.User || model("User", UserSchema);

export default User;
