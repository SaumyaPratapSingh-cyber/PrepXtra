
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Question from '@/models/Question';
// Ensure DB connection is established
import '@/lib/db';

export async function GET() {
    try {
        // Aggregation to get distinct values
        const companies = await Question.distinct('companies', { type: 'Aptitude' });
        const technicalTopics = await Question.distinct('category', { type: 'Technical' });
        const aptitudeCategories = await Question.distinct('category', { type: 'Aptitude' });

        return NextResponse.json({
            companies,
            technicalTopics,
            aptitudeCategories
        });
    } catch (error) {
        console.error('Error fetching assessment config:', error);
        return NextResponse.json({ error: 'Failed to fetch configuration' }, { status: 500 });
    }
}
