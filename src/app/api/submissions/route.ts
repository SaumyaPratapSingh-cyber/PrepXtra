import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";
import Submission from "@/models/Submission";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(MONGODB_URI as string);
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const data = await req.json();

        const { problemId, language, code, status, testCasesPassed, totalTestCases, runtime } = data;

        // For now using a hardcoded user ID since auth isn't wired up in this snippet's scope
        // but typically you would get this from session/cookies
        const userId = "anonymous_user";

        const submission = new Submission({
            userId,
            problemId,
            language,
            code,
            status,
            testCasesPassed,
            totalTestCases,
            runtime,
        });

        await submission.save();

        return NextResponse.json({
            success: true,
            message: "Submission saved successfully",
            submissionId: submission._id
        });

    } catch (error: any) {
        console.error("Submission API Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to save submission"
        }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const problemId = searchParams.get("problemId");

        const query = problemId ? { problemId } : {};
        const submissions = await Submission.find(query).sort({ submittedAt: -1 }).limit(10);

        return NextResponse.json({ success: true, submissions });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
