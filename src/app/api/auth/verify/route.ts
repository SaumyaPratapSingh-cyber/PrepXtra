import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json(
                { error: "Missing email or OTP" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json(
                { message: "User already verified" },
                { status: 200 }
            );
        }

        // Check Token Match & Expiry
        const submittedOtp = String(otp).trim();
        // Use optional chaining and default to empty string if undefined
        const storedOtp = user.verificationToken ? String(user.verificationToken).trim() : "null";

        // DEBUG LOGGING
        console.log(`[DEBUG] Verifying: ${email}`);
        console.log(`[DEBUG] Submitted: '${submittedOtp}'`);
        console.log(`[DEBUG] Stored:    '${storedOtp}'`);

        if (storedOtp !== submittedOtp) {
            // EXPOSING DEBUG INFO TO CLIENT FOR USER
            return NextResponse.json({
                error: `INVALID OTP. Submitted: '${submittedOtp}' vs Stored: '${storedOtp}'`
            }, { status: 400 });
        }

        if (user.verificationTokenExpiry && new Date() > user.verificationTokenExpiry) {
            return NextResponse.json({ error: "OTP Expired" }, { status: 400 });
        }

        // Verify User
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        return NextResponse.json(
            { message: "Email verified successfully" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Verification Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
