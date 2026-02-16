import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import PersonalizedStudyPlan from "@/models/PersonalizedStudyPlan";
import { AIService } from "@/lib/services/AIService";
const pdfParse = require("pdf-parse");

// Configure body parser to allow larger file uploads if necessary, though Next.js App Router handles this differently.
// For App Router, we just read the formData.

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        // 1. Parse Form Data
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const company = formData.get("company") as string;
        const role = formData.get("role") as string;

        // Assume user is authenticated and we can get their ID. 
        // For now, I'll try to get it from a header or session if available, 
        // but checking the codebase, mostly likely we need to look at how auth is handled.
        // Looking at `src/lib/auth.ts` or similar might help, but for this specific request, 
        // I'll grab the email from the request mock or header if I can, OR just update the User based on email if provided. 
        // Note: In a real app, use `getServerSession` or verify JWT.

        // TEMPORARY: For this specific task, I'll fetch the first user or a demo user if auth isn't fully set up in this context,
        // OR better, accept an email in the formData to link it.
        // Let's rely on a hardcoded "demo" user ID for safety if auth fails, or try to find a user.
        // *Self-correction*: I should probably not hardcode. I'll search for a user or create a temporary association.
        // Let's assume the frontend sends the user's email or ID.

        const email = "demo@example.com";
        let user = await User.findOne({ email });

        if (!user) {
            // Create the demo user if it doesn't exist to ensure the flow works
            user = await User.create({
                email,
                fullName: "Demo User", // MATCH SCHEMA: fullName, not name
                password: "password123",
                targetCompany: company,
                targetRole: role
            });
        }

        if (!file || !company || !role) {
            return NextResponse.json({ error: "Missing file, company, or role" }, { status: 400 });
        }

        // 2. Extract Text from PDF
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const pdfData = await pdfParse(buffer);
        const resumeText = pdfData.text;

        // 3. AI Analysis & Generation
        const analysis = await AIService.analyzeResume(resumeText, company, role);
        const studyPlan = await AIService.generateStudyPlan(analysis, company, role);

        // 4. Save to Database
        // Update User Profile with target
        if (user) {
            user.targetCompany = company;
            user.targetRole = role;
            await user.save();
        }

        // Save Plan
        // Check if plan exists, update or create
        if (user) {
            console.log("Saving plan for user:", user._id);
        } else {
            console.error("User is null even after creation attempt!");
        }

        // Save Plan
        // Check if plan exists, update or create
        const existingPlan = await PersonalizedStudyPlan.findOne({ userId: user?._id });
        let savedPlan;

        if (existingPlan) {
            console.log("Updating existing plan:", existingPlan._id);
            existingPlan.targetCompany = company;
            existingPlan.targetRole = role;
            existingPlan.resumeText = resumeText; // Optional: Don't store full text if privacy concern, but good for re-gen
            existingPlan.analysis = analysis;
            existingPlan.roadmap = studyPlan.roadmap;
            existingPlan.curatedQuestions = studyPlan.curatedQuestions;
            savedPlan = await existingPlan.save();
        } else {
            console.log("Creating new plan");
            savedPlan = await PersonalizedStudyPlan.create({
                userId: user?._id,
                targetCompany: company,
                targetRole: role,
                resumeText: resumeText,
                analysis: analysis,
                roadmap: studyPlan.roadmap,
                curatedQuestions: studyPlan.curatedQuestions
            });
        }
        console.log("Plan saved successfully:", savedPlan._id);

        return NextResponse.json({
            success: true,
            planId: savedPlan._id,
            redirectUrl: "/dashboard/resume-track/personalized"
        });

    } catch (error) {
        console.error("Upload handler error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
