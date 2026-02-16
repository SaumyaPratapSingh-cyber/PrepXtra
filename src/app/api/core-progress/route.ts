import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CoreProgress from "@/models/CoreProgress";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const subjectId = searchParams.get("subjectId");

        if (!userId) {
            return NextResponse.json(
                { error: "UserId is required" },
                { status: 400 }
            );
        }

        const query: any = { userId };
        if (subjectId) {
            query.subjectId = subjectId;
        }

        const progress = await CoreProgress.find(query);

        return NextResponse.json({
            progress,
            count: progress.length
        });
    } catch (error: any) {
        console.error("Error fetching progress:", error);
        return NextResponse.json(
            { error: "Failed to fetch progress", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { userId, subjectId, topicId, status } = body;

        if (!userId || !subjectId || !topicId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const progress = await CoreProgress.findOneAndUpdate(
            { userId, topicId },
            {
                userId,
                subjectId,
                topicId,
                status: status || "completed",
                completedAt: new Date()
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            progress
        });
    } catch (error: any) {
        console.error("Error updating progress:", error);
        return NextResponse.json(
            { error: "Failed to update progress", details: error.message },
            { status: 500 }
        );
    }
}
