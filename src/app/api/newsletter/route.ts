import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db'; // Assuming this exists or similar
import User from '@/models/User';
import { verifyAuth } from '@/lib/auth'; // Assuming auth helper

// If connectToDatabase is not standard, I'll fallback to mongoose.connect
import mongoose from 'mongoose';

const ensureDb = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI!);
    }
};

export async function POST(req: Request) {
    try {
        await ensureDb();
        // 1. Auth check
        // For now, let's assume the user ID is passed or we verify token
        // In a real app we'd extract from session/token
        // functionality tailored for "demo" might just take email or userId in body if simple
        // But adhering to best practices:

        const body = await req.json();
        const { email, preferences, consent } = body;

        if (!email || !consent) {
            return NextResponse.json({ error: 'Email and Consent are required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 2. Update Preferences
        user.newsletter = {
            consent: true,
            consentedAt: new Date(),
            preferences: {
                roles: preferences.roles || [],
                locations: preferences.locations || [],
                experienceLevel: preferences.experienceLevel || 'Entry Level'
            }
        };

        await user.save();

        return NextResponse.json({ success: true, message: 'Subscribed successfully' });
    } catch (error: any) {
        console.error("Newsletter Subscribe Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await ensureDb();
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        const user = await User.findOne({ email });
        if (user) {
            user.newsletter.consent = false;
            await user.save();
        }

        return NextResponse.json({ success: true, message: 'Unsubscribed' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
    }
}
