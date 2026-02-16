
import { NextRequest, NextResponse } from 'next/server';
import Question from '@/models/Question';
import '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, company, limit = 25 } = body;

        const query: any = { type };

        if (company) {
            query.companies = { $in: [company, "General"] };
        }

        let finalQuestions: any[] = [];

        if (type === 'Aptitude') {
            // Fetch for sections
            const sections = ['Quantitative', 'Logical Reasoning', 'English'];
            const perSection = Math.ceil(limit / sections.length);

            for (const section of sections) {
                const sectionQuestions = await Question.aggregate([
                    { $match: { ...query, category: section } },
                    { $sample: { size: perSection } }
                ]);
                finalQuestions = [...finalQuestions, ...sectionQuestions];
            }

            // Trim to limit if needed
            finalQuestions = finalQuestions.slice(0, limit);
        } else {
            // Standard random fetch
            finalQuestions = await Question.aggregate([
                { $match: query },
                { $sample: { size: limit } }
            ]);
        }

        // Sanitize questions to remove correct answers before sending to client
        const sanitizedQuestions = finalQuestions.map(q => ({
            _id: q._id,
            content: q.content,
            type: q.type,
            category: q.category,
            options: q.options,
            difficulty: q.difficulty,
        }));

        return NextResponse.json({ questions: sanitizedQuestions });

    } catch (error) {
        console.error('Error starting assessment:', error);
        return NextResponse.json({ error: 'Failed to start assessment' }, { status: 500 });
    }
}
