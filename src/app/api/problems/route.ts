import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DSAProblem from "@/models/DSAProblem";

connectToDatabase();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const difficulty = searchParams.get("difficulty");
        const category = searchParams.get("category");

        let query: any = {};
        if (difficulty && difficulty !== "all") query.difficulty = difficulty;
        if (category && category !== "all") query.category = category;

        const problems = await DSAProblem.find(query)
            .select("-solution -testCases")
            .sort({ createdAt: -1 })
            .limit(100);

        return NextResponse.json({
            success: true,
            problems,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
