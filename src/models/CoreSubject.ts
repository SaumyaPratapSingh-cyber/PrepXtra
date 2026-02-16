import { Schema, model, models } from "mongoose";

const CoreSubjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Computer Science Core Foundations",
                "Systems & Networking",
                "Data and Database Technologies",
                "Data Science",
                "Programming & Software Development"
            ],
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: "book",
        },
        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },
        estimatedHours: {
            type: Number,
            default: 0,
        },
        prerequisites: [{
            type: String, // Array of subject slugs
        }],
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const CoreSubject = models.CoreSubject || model("CoreSubject", CoreSubjectSchema);

export default CoreSubject;
