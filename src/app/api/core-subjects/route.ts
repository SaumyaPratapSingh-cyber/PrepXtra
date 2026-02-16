import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CoreSubject from "@/models/CoreSubject";
import CoreTopic from "@/models/CoreTopic";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const slug = searchParams.get("slug");

        // If slug is provided, fetch single subject with topics
        if (slug) {
            const subject = await CoreSubject.findOne({ slug, isActive: true });

            if (!subject) {
                return NextResponse.json(
                    { error: "Subject not found" },
                    { status: 404 }
                );
            }

            // Fetch topics for this subject
            const topics = await CoreTopic.find({
                subject: subject._id,
                isActive: true
            }).sort({ order: 1 });

            return NextResponse.json({
                subject,
                topics
            });
        }

        // Build query
        const query: any = { isActive: true };
        if (category) {
            query.category = category;
        }

        // Fetch all subjects
        const subjects = await CoreSubject.find(query).sort({ category: 1, order: 1 });

        // Group by category
        const groupedByCategory = subjects.reduce((acc: any, subject: any) => {
            const cat = subject.category;
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(subject);
            return acc;
        }, {});

        return NextResponse.json({
            subjects,
            groupedByCategory,
            totalCount: subjects.length
        });
    } catch (error: any) {
        console.error("Error fetching core subjects:", error);
        return NextResponse.json(
            { error: "Failed to fetch subjects", details: error.message },
            { status: 500 }
        );
    }
}
