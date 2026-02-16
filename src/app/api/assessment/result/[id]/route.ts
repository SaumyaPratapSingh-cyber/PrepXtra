
import { NextRequest, NextResponse } from 'next/server';
import AssessmentResult from '@/models/AssessmentResult';
import Question from '@/models/Question'; // Ensure Question is registered
import '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result = await AssessmentResult.findById(id).populate('answers.questionId');

        if (!result) {
            return NextResponse.json({ error: 'Result not found' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching result:', error);
        return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
    }
}
