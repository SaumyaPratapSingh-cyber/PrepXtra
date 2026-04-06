import { NextRequest, NextResponse } from "next/server";
import { InterviewService } from "@/lib/services/InterviewService";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { role, question, userAnswer, history, type } = body;

        // NEW: Handle Final Report Generation
        if (type === "report") {
            const report = await InterviewService.generateFinalReport(role || "Software Engineer", history || []);
            return NextResponse.json(report);
        }

        if (!question || !userAnswer) {
            return NextResponse.json({ error: "Question and Answer are required" }, { status: 400 });
        }

        const analysis = await InterviewService.analyzeResponse(
            role || "Software Engineer",
            question,
            userAnswer,
            history || []
        );

        return NextResponse.json(analysis);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
