import { Schema, model, models } from "mongoose";

const CoreProgressSchema = new Schema(
    {
        userId: {
            type: String, // Or ObjectId if using a User model reference
            required: true,
            index: true
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: "CoreSubject",
            required: true
        },
        topicId: {
            type: Schema.Types.ObjectId,
            ref: "CoreTopic",
            required: true
        },
        status: {
            type: String,
            enum: ["in-progress", "completed"],
            default: "in-progress"
        },
        completedAt: {
            type: Date
        }
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure one progress record per user per topic
CoreProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

const CoreProgress = models.CoreProgress || model("CoreProgress", CoreProgressSchema);

export default CoreProgress;
