
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Question from '@/models/Question';
// Ensure DB connection is established
import '@/lib/db';

export async function GET() {
    try {
        const config = {
            companies: [
                "Infosys", "TCS", "Accenture", "Amazon", "Microsoft",
                "Google", "Deloitte", "IBM", "Nvidia", "Wipro",
                "L&T", "Goldman Sachs", "Intel", "Meta"
            ],
            // Assuming technicalTopics and aptitudeCategories are still needed,
            // but the instruction only specified updating the company list.
            // If they should also be hardcoded or removed, further instruction is needed.
            // For now, keeping the original dynamic fetching for them.
            technicalTopics: await Question.distinct('category', { type: 'Technical' }),
            aptitudeCategories: await Question.distinct('category', { type: 'Aptitude' })
        };

        return NextResponse.json(config);
    } catch (error) {
        console.error('Error fetching assessment config:', error);
        return NextResponse.json({ error: 'Failed to fetch configuration' }, { status: 500 });
    }
}
