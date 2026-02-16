import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import PersonalizedStudyPlan from "@/models/PersonalizedStudyPlan";
import { AIService } from "@/lib/services/AIService";
// pdf-parse is required dynamically inside the handler
// const pdfParse = require("pdf-parse");

// Configure body parser to allow larger file uploads if necessary, though Next.js App Router handles this differently.
// For App Router, we just read the formData.

// REMOVED TOP-LEVEL REQUIRE TO PREVENT ROUTE LOAD CRASH
// const pdfParse = require("pdf-parse");

export async function POST(req: NextRequest) {
    console.log(">>> [RESUME API] [START] Processing Request...");

    try {
        // 0. DB Connection Check
        console.log(">>> [RESUME API] [DB] Connecting...");
        try {
            await connectToDatabase();
            console.log(">>> [RESUME API] [DB] Connected.");
        } catch (dbErr: any) {
            console.error(">>> [RESUME API] [DB] ERROR:", dbErr.message);
            return NextResponse.json({ error: "DB connection failed", details: dbErr.message }, { status: 500 });
        }

        // 1. Form Data Parsing
        console.log(">>> [RESUME API] [FORM] Parsing...");
        let formData;
        try {
            formData = await req.formData();
        } catch (formErr: any) {
            console.error(">>> [RESUME API] [FORM] ERROR:", formErr.message);
            return NextResponse.json({ error: "Form parse failed", details: formErr.message }, { status: 400 });
        }

        const file = formData.get("file") as File;
        const company = formData.get("company") as string || "General Tech";
        const role = formData.get("role") as string || "Software Engineer";

        console.log(`>>> [RESUME API] [META] File: ${file?.name}, Company: ${company}, Role: ${role}`);

        if (!file) {
            console.warn(">>> [RESUME API] [WARN] No file found.");
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // 2. User Authentication (Mock)
        const email = "demo@example.com";
        let user;
        try {
            console.log(">>> [RESUME API] [USER] Finding/Creating user...");
            user = await User.findOne({ email });
            if (!user) {
                user = await User.create({
                    email,
                    fullName: "Demo User",
                    password: "password123",
                    targetCompany: company,
                    targetRole: role
                });
            }
            console.log(">>> [RESUME API] [USER] User ID:", user?._id);
        } catch (userErr: any) {
            console.error(">>> [RESUME API] [USER] ERROR:", userErr.message);
            return NextResponse.json({ error: "User process failed", details: userErr.message }, { status: 500 });
        }

        // 3. PDF Parsing (Dynamic Require)
        console.log(">>> [RESUME API] [PDF] Reading buffer...");
        let resumeText = "";
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            console.log(">>> [RESUME API] [PDF] Importing pdf-parse...");
            const pdfParse = require("pdf-parse");

            console.log(">>> [RESUME API] [PDF] Parsing...");
            const pdfData = await pdfParse(buffer);
            resumeText = pdfData.text || "";

            console.log(`>>> [RESUME API] [PDF] Extracted ${resumeText.length} characters.`);
        } catch (pdfErr: any) {
            console.error(">>> [RESUME API] [PDF] ERROR:", pdfErr.message);
            // Fallback to minimal data instead of failing entirely
            resumeText = `Analysis for ${role} at ${company}. Note: PDF content extraction failed. Error: ${pdfErr.message}`;
        }

        if (!resumeText || resumeText.trim().length === 0) {
            resumeText = `Resume analysis for ${role}. Full analysis requested.`;
        }

        // 4. AI Analysis
        console.log(">>> [RESUME API] [AI] calling AIService...");
        let analysis, studyPlan;
        try {
            analysis = await AIService.analyzeResume(resumeText, company, role);
            console.log(">>> [RESUME API] [AI] Analysis complete.");
            studyPlan = await AIService.generateStudyPlan(analysis, company, role);
            console.log(">>> [RESUME API] [AI] Study plan complete.");
        } catch (aiErr: any) {
            console.error(">>> [RESUME API] [AI] ERROR:", aiErr.message);
            return NextResponse.json({ error: "AI reasoning failed", details: aiErr.message }, { status: 500 });
        }

        // 5. Database Save
        console.log(">>> [RESUME API] [SAVE] Upserting plan...");
        try {
            const existingPlan = await PersonalizedStudyPlan.findOne({ userId: user?._id });

            if (existingPlan) {
                existingPlan.targetCompany = company;
                existingPlan.targetRole = role;
                existingPlan.resumeText = resumeText;
                existingPlan.analysis = analysis;
                existingPlan.roadmap = studyPlan.roadmap;
                existingPlan.curatedQuestions = studyPlan.curatedQuestions;
                existingPlan.interviewQuestions = studyPlan.interviewQuestions;
                existingPlan.selectedRoadmapId = studyPlan.selectedRoadmapId;
                await existingPlan.save();
            } else {
                await PersonalizedStudyPlan.create({
                    userId: user?._id,
                    targetCompany: company,
                    targetRole: role,
                    resumeText: resumeText,
                    analysis: analysis,
                    roadmap: studyPlan.roadmap,
                    curatedQuestions: studyPlan.curatedQuestions,
                    interviewQuestions: studyPlan.interviewQuestions,
                    selectedRoadmapId: studyPlan.selectedRoadmapId
                });
            }
            console.log(">>> [RESUME API] [SAVE] SUCCESS.");
        } catch (dbErr: any) {
            console.error(">>> [RESUME API] [SAVE] ERROR:", dbErr.message);
            return NextResponse.json({ error: "Failed to store roadmap", details: dbErr.message }, { status: 500 });
        }

        console.log(">>> [RESUME API] [SUCCESS] Redirecting...");
        return NextResponse.json({
            success: true,
            redirectUrl: "/dashboard/resume-track/personalized"
        });

    } catch (error: any) {
        console.error(">>> [RESUME API] [FATAL CRASH]", error);
        return NextResponse.json({
            error: "Internal Server Error",
            message: error.message,
            stack: error.stack?.substring(0, 500)
        }, { status: 500 });
    }
}
