import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import PersonalizedStudyPlan from "@/models/PersonalizedStudyPlan";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const email = "demo@example.com";
        // 1. Find or Create User
        let user = await User.findOne({ email });
        if (!user) {
            console.log("GET: Demo user missing, creating...");
            user = await User.create({
                email,
                fullName: "Demo User",
                password: "password123",
                targetCompany: "Tech Corp",
                targetRole: "Software Engineer"
            });
        }

        // 2. Find or Create Plan
        let plan = await PersonalizedStudyPlan.findOne({ userId: user._id }).sort({ createdAt: -1 });

        if (!plan) {
            console.log("GET: Plan missing for user, generating default mock...");
            // Create a robust default plan to ensure the user NEVER sees a 404
            plan = await PersonalizedStudyPlan.create({
                userId: user._id,
                targetCompany: user.targetCompany || "Tech Corp",
                targetRole: user.targetRole || "Software Engineer",
                resumeText: "Auto-generated Mock Resume Text",
                analysis: {
                    strengths: ["Problem Solving", "Data Structures", "Communication"],
                    weaknesses: ["System Design", "Cloud Infrastructure"],
                    extractedSkills: ["React", "Node.js", "MongoDB"],
                    gapAnalysis: "We've generated a starter plan for you. Upload your resume to refine it!"
                },
                roadmap: [
                    {
                        week: 1,
                        day: 1,
                        topic: "Arrays & Hashing (Starter)",
                        description: "Master the basics of array manipulation and hash maps.",
                        resources: [
                            { title: "Two Sum", url: "https://leetcode.com/problems/two-sum", type: "problem" },
                            { title: "Hashing Guide", url: "https://cp-algorithms.com", type: "article" }
                        ],
                        completed: false
                    },
                    {
                        week: 1,
                        day: 2,
                        topic: "Two Pointers",
                        description: "Learn to optimize array problems using two pointers.",
                        resources: [],
                        completed: false
                    }
                ],
                curatedQuestions: [
                    { title: "Design Twitter", difficulty: "Hard", pattern: "System Design", companyTag: user.targetCompany || "Tech Corp" },
                    { title: "LRU Cache", difficulty: "Medium", pattern: "Linked List", companyTag: user.targetCompany || "Tech Corp" }
                ]
            });
        }

        console.log("GET: Returning plan:", plan._id);
        return NextResponse.json({ success: true, plan });
    } catch (error) {
        console.error("Fetch plan error:", error);
        // Even in error, return a success with null to be handled gracefully or retry? 
        // No, let's return 500 but log it.
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
