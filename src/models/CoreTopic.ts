import { Schema, model, models } from "mongoose";

const CoreTopicSchema = new Schema(
    {
        subject: {
            type: Schema.Types.ObjectId,
            ref: "CoreSubject",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
            default: 0,
        },
        estimatedMinutes: {
            type: Number,
            default: 30,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard", "Beginner", "Advanced", "Intermediate"],
            default: "Easy",
        },
        content: {
            type: String,
            required: true,
            default: "Coming soon..."
        },
        resources: [{
            title: String,
            type: { type: String, enum: ['video', 'article', 'pdf', 'code', 'tool'] },
            url: String
        }],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for subject + slug uniqueness
CoreTopicSchema.index({ subject: 1, slug: 1 }, { unique: true });

const CoreTopic = models.CoreTopic || model("CoreTopic", CoreTopicSchema);

export default CoreTopic;
