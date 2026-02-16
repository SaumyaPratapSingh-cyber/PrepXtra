import { NextRequest, NextResponse } from "next/server";
import { InterviewScraper } from "@/lib/scrapers/InterviewScraper";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") || "Software Engineer";

    try {
        const questions = await InterviewScraper.getQuestionsForRole(role);
        return NextResponse.json(questions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
