"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronRight,
    RotateCcw,
    Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
    _id: string;
    question: string;
    type: string;
    options?: string[];
    correctAnswer: string | number | string[];
    explanation: string;
    points: number;
}

interface Quiz {
    _id: string;
    title: string;
    description: string;
    questions: Question[];
    passingScore: number;
    timeLimit: number;
}

interface QuizComponentProps {
    quiz: Quiz;
    onComplete: (score: number, totalPoints: number, passed: boolean) => void;
}

const QuizComponent = ({ quiz, onComplete }: QuizComponentProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState<any[]>([]);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalPoints = quiz.questions.reduce((acc, q) => acc + q.points, 0);

    const handleAnswerSelect = (answer: any) => {
        if (isAnswered) return;
        setSelectedAnswer(answer);
    };

    const handleSubmitAnswer = () => {
        if (!selectedAnswer && selectedAnswer !== 0) return;

        const isCorrect = String(selectedAnswer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase();

        if (isCorrect) {
            setScore(prev => prev + currentQuestion.points);
        }

        setAnswers(prev => [...prev, { questionId: currentQuestion._id, answer: selectedAnswer, isCorrect }]);
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            handleFinishQuiz();
        }
    };

    const handleFinishQuiz = () => {
        setShowResults(true);
        const finalScore = score + (isAnswered && String(selectedAnswer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase() ? currentQuestion.points : 0);
        // Recalculate score carefully because setState is async/batched
        // Actually, the last answer's score addition might not be in 'score' state yet if we just called setScore
        // So we should calculate it from 'answers' plus the current one

        // Let's recalculate total score from all answers including current
        const currentIsCorrect = String(selectedAnswer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase();
        const totalScore = answers.reduce((acc, ans) => acc + (ans.isCorrect ? quiz.questions.find(q => q._id === ans.questionId)?.points || 0 : 0), 0)
            + (currentIsCorrect ? currentQuestion.points : 0);

        const percentage = (totalScore / totalPoints) * 100;
        const passed = percentage >= quiz.passingScore;

        onComplete(totalScore, totalPoints, passed);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
        setAnswers([]);
    };

    if (showResults) {
        const percentage = Math.round((score / totalPoints) * 100); // Note: this score might be slightly off if we didn't use the recalculated one, but for display let's trust the state for now or use specific logic
        // Actually, let's look at the logic above. We call onComplete with correct values. Display might be lagging by one question's points if we don't handle the last update.
        // Better implementation:
        const finalScore = answers.reduce((acc, ans) => acc + (ans.isCorrect ? quiz.questions.find(q => q._id === ans.questionId)?.points || 0 : 0), 0)
            + (isAnswered && String(selectedAnswer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase() ? currentQuestion.points : 0);

        const finalPercentage = Math.round((finalScore / totalPoints) * 100);
        const passed = finalPercentage >= quiz.passingScore;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border bg-card p-8 text-center max-w-2xl mx-auto shadow-sm"
            >
                <div className="mb-6 flex justify-center">
                    <div className={cn(
                        "rounded-full p-4 ring-8 ring-opacity-20",
                        passed ? "bg-green-100 text-green-600 ring-green-500" : "bg-red-100 text-red-600 ring-red-500"
                    )}>
                        <Award className="h-12 w-12" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                <p className="text-muted-foreground mb-8">
                    You scored <span className={cn("font-bold text-foreground", passed ? "text-green-600" : "text-red-600")}>{finalScore}/{totalPoints}</span> ({finalPercentage}%)
                </p>

                {passed ? (
                    <div className="mb-8 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        <p className="font-medium">Congratulations! You passed the quiz.</p>
                        <p className="text-sm mt-1">Review the topic or move on to the next one.</p>
                    </div>
                ) : (
                    <div className="mb-8 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                        <p className="font-medium">Keep practicing!</p>
                        <p className="text-sm mt-1">You need {quiz.passingScore}% to pass. Review the material and try again.</p>
                    </div>
                )}

                <button
                    onClick={resetQuiz}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border bg-background py-2.5 text-sm font-medium hover:bg-muted"
                >
                    <RotateCcw className="h-4 w-4" />
                    Retry Quiz
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                    <span className="font-medium text-primary">Score: {score}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                        animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>

            <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-2xl border bg-card p-6 md:p-8"
            >
                <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>

                <div className="space-y-3">
                    {currentQuestion.type === "Multiple Choice" || currentQuestion.type === "True/False" ? (
                        currentQuestion.options?.map((option, idx) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = option === currentQuestion.correctAnswer;

                            let optionClass = "border bg-card hover:border-primary/50 hover:bg-primary/5";
                            if (isAnswered) {
                                if (isCorrect) optionClass = "border-green-500 bg-green-50 dark:bg-green-900/20";
                                else if (isSelected) optionClass = "border-red-500 bg-red-50 dark:bg-red-900/20";
                                else optionClass = "border opacity-50";
                            } else if (isSelected) {
                                optionClass = "border-primary bg-primary/10 ring-1 ring-primary";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={isAnswered}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-xl p-4 text-left transition-all",
                                        optionClass
                                    )}
                                >
                                    <span>{option}</span>
                                    {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                    {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                                </button>
                            );
                        })
                    ) : (
                        <div className="relative">
                            <input
                                type="text"
                                className={cn(
                                    "w-full rounded-xl border bg-background p-4 outline-none focus:ring-2 disabled:opacity-50",
                                    isAnswered
                                        ? String(selectedAnswer).toLowerCase() === String(currentQuestion.correctAnswer).toLowerCase()
                                            ? "border-green-500 ring-green-500/20"
                                            : "border-red-500 ring-red-500/20"
                                        : "focus:border-primary focus:ring-primary/20"
                                )}
                                placeholder="Type your answer..."
                                value={selectedAnswer || ""}
                                onChange={(e) => handleAnswerSelect(e.target.value)}
                                disabled={isAnswered}
                            />
                        </div>
                    )}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                    {isAnswered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-6 rounded-lg bg-muted/50 p-4 text-sm"
                        >
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-semibold block mb-1">Explanation:</span>
                                    <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 flex justify-end">
                    {!isAnswered ? (
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={!selectedAnswer && selectedAnswer !== 0}
                            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default QuizComponent;
