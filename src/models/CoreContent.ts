import { Schema, model, models } from "mongoose";

const CoreContentSchema = new Schema(
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
        slug: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true, // Markdown formatted content
        },
        contentType: {
            type: String,
            enum: ["Article", "Video", "Interactive"],
            default: "Article",
        },
        order: {
            type: Number,
            required: true,
            default: 0,
        },
        codeExamples: [{
            language: {
                type: String,
                required: true,
            },
            code: {
                type: String,
                required: true,
            },
            title: String,
            explanation: String,
        }],
        diagrams: [{
            url: String,
            caption: String,
            alt: String,
        }],
        keyPoints: [{
            type: String,
        }],
        references: [{
            title: String,
            url: String,
            type: {
                type: String,
                enum: ["Documentation", "Article", "Video", "Book", "Research Paper"],
            },
        }],
        estimatedMinutes: {
            type: Number,
            default: 15,
        },
        videoUrl: String, // For video content type
        interactiveUrl: String, // For interactive content type
    },
    {
        timestamps: true,
    }
);

// Compound index for topic + slug uniqueness
CoreContentSchema.index({ topic: 1, slug: 1 }, { unique: true });

const CoreContent = models.CoreContent || model("CoreContent", CoreContentSchema);

export default CoreContent;
