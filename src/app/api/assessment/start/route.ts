
import { NextRequest, NextResponse } from 'next/server';
import Question from '@/models/Question';
import '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, company, category, limit = 10 } = body;

        const query: any = { type };

        // Smart Company Filtering:
        // If a company is selected, look for questions tagged with that Company OR 'General'
        // This allows us to have specific questions mixed with standard ones.
        if (company) {
            query.companies = { $in: [company, "General"] };
        }

        if (category) {
            query.category = category;
        }

        // Fetch random questions
        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: limit } }
        ]);

        // Sanitize questions to remove correct answers before sending to client
        const sanitizedQuestions = questions.map(q => ({
            _id: q._id,
            content: q.content,
            type: q.type,
            category: q.category,
            options: q.options,
            difficulty: q.difficulty,
            // explicitly excluding correctAnswer and explanation
        }));

        return NextResponse.json({ questions: sanitizedQuestions });

    } catch (error) {
        console.error('Error starting assessment:', error);
        return NextResponse.json({ error: 'Failed to start assessment' }, { status: 500 });
    }
}
