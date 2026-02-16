import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CoreTopic from "@/models/CoreTopic";

import CoreQuiz from "@/models/CoreQuiz";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await dbConnect();

        const { slug } = await params;

        // Find topic by slug
        const topic = await CoreTopic.findOne({ slug, isActive: true })
            .populate("subject");

        if (!topic) {
            return NextResponse.json(
                { error: "Topic not found" },
                { status: 404 }
            );
        }

        // Fetch quiz for this topic
        const quiz = await CoreQuiz.findOne({
            topic: topic._id,
            isActive: true
        });

        return NextResponse.json({
            topic,
            quiz
        });
    } catch (error: any) {
        console.error("Error fetching topic:", error);
        return NextResponse.json(
            { error: "Failed to fetch topic", details: error.message },
            { status: 500 }
        );
    }
}
