import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DSAProblem from "@/models/DSAProblem";

connectToDatabase();

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const problem = await DSAProblem.findOne({ slug });

        if (!problem) {
            return NextResponse.json({ error: "Problem not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            problem,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
