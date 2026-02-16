
import { NextRequest, NextResponse } from 'next/server';
import Question from '@/models/Question';
import AssessmentResult from '@/models/AssessmentResult';
import '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, type, company, category, answers, timeTaken, strictModeViolations } = body;

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

        const result = await AssessmentResult.create({
            userId,
            type,
            company,
            category,
            score,
            totalQuestions,
            accuracy,
            timeTaken,
            strictModeViolations,
            answers: processedAnswers,
        });

        return NextResponse.json({
            success: true,
            resultId: result._id,
            score,
            totalQuestions,
            accuracy
        });

    } catch (error) {
        console.error('Error submitting assessment:', error);
        return NextResponse.json({ error: 'Failed to submit assessment' }, { status: 500 });
    }
}
