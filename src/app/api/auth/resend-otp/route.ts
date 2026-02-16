import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
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
                { error: "Account is already verified. Please login." },
                { status: 400 }
            );
        }

        // Generate NEW 6-digit OTP
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        // Update User
        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = verificationTokenExpiry;
        await user.save();

        // Send Email
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error("Failed to resend email:", emailError);
            return NextResponse.json(
                { error: "Failed to send email. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "New OTP sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Resend OTP Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
