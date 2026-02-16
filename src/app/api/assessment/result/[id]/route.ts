
import { NextRequest, NextResponse } from 'next/server';
import AssessmentResult from '@/models/AssessmentResult';
import '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result: any = await AssessmentResult.findById(id).populate('answers.questionId');

        if (!result) {
            return NextResponse.json({ error: 'Result not found' }, { status: 404 });
        }

        // Calculate section-wise breakdown dynamically
        const sectionMetrics: Record<string, { score: number, total: number }> = {};
        result.answers.forEach((ans: any) => {
            const q = ans.questionId as any;
            if (q) {
                const cat = q.category || 'General';
                if (!sectionMetrics[cat]) sectionMetrics[cat] = { score: 0, total: 0 };
                sectionMetrics[cat].total += 1;
                if (ans.isCorrect) sectionMetrics[cat].score += 1;
            }
        });

        const resultObj = result.toObject();
        resultObj.sectionMetrics = sectionMetrics;

        return NextResponse.json(resultObj);
    } catch (error: any) {
        console.error('Error fetching result:', error);
        return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
    }
}
