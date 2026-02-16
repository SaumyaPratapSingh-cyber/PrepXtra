
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import {
    CheckCircle,
    XCircle,
    Clock,
    Target,
    AlertTriangle,
    ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";

interface Result {
    _id: string;
    type: string;
    score: number;
    totalQuestions: number;
    accuracy: number;
    timeTaken: number;
    strictModeViolations: number;
    answers: {
        questionId: {
            content: string;
            options: string[];
            correctAnswer: string;
            explanation: string;
        };
        userAnswer: string;
        isCorrect: boolean;
    }[];
    createdAt: string;
}

const AssessmentAnalysisPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(`/api/assessment/result/${id}`);
                setResult(res.data);
            } catch (error) {
                console.error("Failed to fetch result", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchResult();
        }
    }, [id]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    if (loading) {
        return (
            <DashboardPage>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </DashboardPage>
        );
    }

    if (!result) {
        return (
            <DashboardPage>
                <div className="text-center text-white p-8">Result not found.</div>
            </DashboardPage>
        );
    }

    return (
        <DashboardPage>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <button
                    onClick={() => router.push('/dashboard/assessment')}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Assessments
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Assessment Analysis</h1>
                    <p className="text-gray-400">Detailed breakdown of your performance in {result.type}.</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Target className="w-6 h-6" /></div>
                            <span className="text-gray-400">Score</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {result.score} <span className="text-lg text-gray-500">/ {result.totalQuestions}</span>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><CheckCircle className="w-6 h-6" /></div>
                            <span className="text-gray-400">Accuracy</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {result.accuracy.toFixed(1)}%
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Clock className="w-6 h-6" /></div>
                            <span className="text-gray-400">Time Taken</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {formatTime(result.timeTaken)}
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><AlertTriangle className="w-6 h-6" /></div>
                            <span className="text-gray-400">Violations</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {result.strictModeViolations}
                        </div>
                    </div>
                </div>

                {/* Detailed Review */}
                <h2 className="text-2xl font-bold text-white mb-6">Detailed Solutions</h2>
                <div className="space-y-6">
                    {result.answers.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl"
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {index + 1}. {item.questionId.content}
                                </h3>
                                {item.isCorrect ? (
                                    <span className="flex-shrink-0 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4" /> Correct
                                    </span>
                                ) : (
                                    <span className="flex-shrink-0 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium flex items-center gap-1">
                                        <XCircle className="w-4 h-4" /> Incorrect
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                                    <span className="text-sm text-gray-400 block mb-1">Your Answer</span>
                                    <span className={`font-medium ${item.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.userAnswer || "Skipped"}
                                    </span>
                                </div>
                                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                                    <span className="text-sm text-gray-400 block mb-1">Correct Answer</span>
                                    <span className="font-medium text-green-400">
                                        {item.questionId.correctAnswer}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-900/30">
                                <span className="text-sm text-blue-400 block mb-2 font-semibold">Explanation</span>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {item.questionId.explanation}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardPage>
    );
};

export default AssessmentAnalysisPage;
