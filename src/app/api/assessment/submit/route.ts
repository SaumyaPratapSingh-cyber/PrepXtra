
import { NextRequest, NextResponse } from 'next/server';
import Question from '@/models/Question';
import AssessmentResult from '@/models/AssessmentResult';
import '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, type, company, category, answers, timeTaken, strictModeViolations, isBreach } = body;

        // answers is an object/map: { [questionId]: "Selected Option" }

        if (!userId || !answers) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const questionIds = Object.keys(answers);
        const questions = await Question.find({ _id: { $in: questionIds } });

        let score = 0;
        const processedAnswers = [];

        // Create a map for quick lookup
        const questionMap = new Map(questions.map(q => [q._id.toString(), q]));

        for (const qId of questionIds) {
            const question = questionMap.get(qId);
            if (!question) continue;

            const userAnswer = answers[qId];
            const isCorrect = userAnswer === question.correctAnswer;

            if (isCorrect) {
                score += 1; // You can adjust pointing system here
            }

            processedAnswers.push({
                questionId: question._id,
                userAnswer,
                isCorrect,
                timeSpent: 0 // We might need to track per-question time in frontend later
            });
        }

        const totalQuestions = questionIds.length;
        const accuracy = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

        // Calculate section-wise breakdown
        const sectionMetrics: Record<string, { score: number, total: number }> = {};
        processedAnswers.forEach(ans => {
            const q = questionMap.get(ans.questionId.toString());
            if (q) {
                const cat = q.category || 'General';
                if (!sectionMetrics[cat]) sectionMetrics[cat] = { score: 0, total: 0 };
                sectionMetrics[cat].total += 1;
                if (ans.isCorrect) sectionMetrics[cat].score += 1;
            }
        });

        const result = await AssessmentResult.create({
            userId,
            type,
            company,
            category,
            score,
            totalQuestions,
            accuracy,
            timeTaken,
            strictModeViolations: isBreach ? -1 : (strictModeViolations || 0), // -1 indicates proctoring termination
            status: isBreach ? 'failed_breach' : 'completed',
            answers: processedAnswers,
            // We'll store sectionMetrics as a JSON or extend the model if needed. 
            // For now, let's just return it in the response for the immediate UI, 
            // and we can add a 'metadata' field to the model for permanent storage if the schema allows.
        });

        return NextResponse.json({
            success: true,
            resultId: result._id,
            score,
            totalQuestions,
            accuracy,
            sectionMetrics // Added for the analysis page to consume
        });

    } catch (error) {
        console.error('Error submitting assessment:', error);
        return NextResponse.json({ error: 'Failed to submit assessment' }, { status: 500 });
    }
}
