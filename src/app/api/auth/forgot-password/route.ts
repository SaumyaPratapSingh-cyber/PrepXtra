import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Return success even if user not found to prevent email enumeration attacks
            return NextResponse.json({ message: "If that email exists, we have sent a password reset OTP." }, { status: 200 });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = expiry;
        await user.save();

        const emailSent = await sendPasswordResetEmail(email, otp);

        if (!emailSent) {
            return NextResponse.json({ error: "Failed to send reset email. Please try again later." }, { status: 500 });
        }

        return NextResponse.json({ message: "If that email exists, we have sent a password reset OTP." }, { status: 200 });

    } catch (error: any) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
