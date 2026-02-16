import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/mail";
import { z } from "zod";

// Validation Schema
const registerSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate Input
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid input", details: result.error.issues },
                { status: 400 }
            );
        }

        const { fullName, email, password } = result.data;

        await connectToDatabase();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email" },
                { status: 409 }
            );
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate 6-digit OTP
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        // Create User (Pending Verification)
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiry,
            isVerified: false
        });

        // Send Email
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
        }

        return NextResponse.json(
            {
                message: "User registered successfully. Please check your email for OTP.",
                email: newUser.email
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
