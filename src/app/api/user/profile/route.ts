import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getDataFromToken } from "@/lib/auth";

connectToDatabase();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error: any) {
        // Return 401 for auth failures, or 200 with null safely
        console.warn("Profile fetch failed (likely unauthenticated):", error.message);
        return NextResponse.json({ error: "Unauthorized or invalid token", data: null }, { status: 401 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Ensure database is connected
        await connectToDatabase();
        console.log("[DEBUG] Database connected");

        const userId = await getDataFromToken(request);
        const reqBody = await request.json();

        console.log("[DEBUG] Profile Update Request - UserID:", userId);
        console.log("[DEBUG] Request Body:", JSON.stringify(reqBody, null, 2));

        const { fullName, headline, bio, website, github, twitter, linkedin, skills } = reqBody;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            console.log("[ERROR] User not found:", userId);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("[DEBUG] User found, current data:", {
            fullName: user.fullName,
            headline: user.headline,
            bio: user.bio
        });

        user.fullName = fullName !== undefined ? fullName : user.fullName;
        user.headline = headline !== undefined ? headline : user.headline;
        user.bio = bio !== undefined ? bio : user.bio;
        user.website = website !== undefined ? website : user.website;
        user.github = github !== undefined ? github : user.github;
        user.twitter = twitter !== undefined ? twitter : user.twitter;
        user.linkedin = linkedin !== undefined ? linkedin : user.linkedin;
        user.skills = skills !== undefined ? skills : user.skills;

        console.log("[DEBUG] User before save:", JSON.stringify({
            fullName: user.fullName,
            headline: user.headline,
            bio: user.bio,
            skills: user.skills
        }, null, 2));

        const savedUser = await user.save();

        console.log("[DEBUG] User saved successfully:", savedUser._id);
        console.log("[DEBUG] Saved user data:", {
            fullName: savedUser.fullName,
            headline: savedUser.headline,
            bio: savedUser.bio
        });

        return NextResponse.json({
            message: "Profile updated successfully",
            success: true,
            data: savedUser,
        });
    } catch (error: any) {
        console.error("[ERROR] Profile update failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
