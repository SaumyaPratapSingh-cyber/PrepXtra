import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        logo: String,
        tier: {
            type: String,
            enum: ["FAANG", "Unicorn", "Startup", "Product"],
            default: "Product",
        },
        interviewProcess: {
            rounds: [String],
            focusAreas: [String],
            commonTopics: [String],
        },
        curatedProblems: [{ type: Schema.Types.ObjectId, ref: "DSAProblem" }],
        interviewQuestions: [{
            type: { type: String, enum: ["behavioral", "technical"] },
            question: String,
            tips: String,
        }],
    },
    {
        timestamps: true,
    }
);

const Company = models.Company || model("Company", CompanySchema);

export default Company;
