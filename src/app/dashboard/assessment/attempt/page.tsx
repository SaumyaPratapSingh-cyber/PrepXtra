
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Flag,
    Maximize,
    Minimize,
    Save
} from "lucide-react";

interface Question {
    _id: string;
    content: string;
    type: string;
    options: string[];
    category: string;
    difficulty: string;
}

const AssessmentAttemptPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Params
    const type = searchParams.get("type");
    const company = searchParams.get("company");
    const category = searchParams.get("category");

    // State
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
    const [violations, setViolations] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showViolationWarning, setShowViolationWarning] = useState(false);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // --- Initialization ---
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.post("/api/assessment/start", {
                    type,
                    company,
                    category,
                    limit: 10,
                });
                setQuestions(res.data.questions);

                // Enter fullscreen automatically on load if possible, or prompt user
                enterFullscreen();
            } catch (error) {
                console.error("Failed to fetch questions", error);
            } finally {
                setLoading(false);
            }
        };

        if (type) {
            fetchQuestions();
        }
    }, [type, company, category]);

    // --- Timer ---
    useEffect(() => {
        if (loading) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmit(); // Auto submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [loading]);

    // --- Strict Mode Listeners ---
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                recordViolation("Tab Switch / Minimize");
            }
        };

        const handleFullscreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullscreen(isFull);
            if (!isFull) {
                recordViolation("Exited Fullscreen");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const enterFullscreen = () => {
        if (containerRef.current) {
            containerRef.current.requestFullscreen().catch((err) => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        }
    };

    const recordViolation = (reason: string) => {
        setViolations((prev) => prev + 1);
        setShowViolationWarning(true);
        setTimeout(() => setShowViolationWarning(false), 5000);
        // You could sound an alert or auto-submit if violations > limit
    };

    // --- Handlers ---
    const handleAnswerSelect = (option: string) => {
        const qId = questions[currentQuestionIndex]._id;
        setAnswers((prev) => ({ ...prev, [qId]: option }));
    };

    const toggleReview = () => {
        const qId = questions[currentQuestionIndex]._id;
        setMarkedForReview((prev) => ({
            ...prev,
            [qId]: !prev[qId],
        }));
    };

    const handleSubmit = async () => {
        if (timerRef.current) clearInterval(timerRef.current);

        // Mock User ID - In real app, get from auth context
        const userId = "test-user-id";

        try {
            const res = await axios.post("/api/assessment/submit", {
                userId,
                type,
                company,
                category,
                answers,
                timeTaken: (20 * 60) - timeLeft,
                strictModeViolations: violations,
            });

            if (res.data.success) {
                // Redirect to analysis
                router.push(`/dashboard/assessment/analysis/${res.data.resultId}`);
            }
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit assessment. Please try again.");
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIndex];

    return (
        <div ref={containerRef} className="min-h-screen bg-gray-950 text-white flex flex-col font-sans">
            {/* Warning Toast */}
            {showViolationWarning && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-bounce">
                    <AlertTriangle className="w-6 h-6 text-white" />
                    <span className="font-bold">Warning: Violation Recorded! Stay in fullscreen.</span>
                </div>
            )}

            {/* Top Bar */}
            <header className="h-16 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-200">{type} Assessment</h1>
                    {company && <span className="text-sm px-2 py-1 bg-blue-900/50 text-blue-300 rounded">{company}</span>}
                </div>

                <div className="flex items-center gap-6">
                    <div className={`flex items-center gap-2 text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-blue-400'}`}>
                        <Clock className="w-5 h-5" />
                        {formatTime(timeLeft)}
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Submit Test
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Question Area */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-gray-400 font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 bg-gray-800 rounded border border-gray-700">{currentQ.difficulty}</span>
                                <span className="text-xs px-2 py-1 bg-gray-800 rounded border border-gray-700">{currentQ.category}</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold leading-relaxed mb-8">
                            {currentQ.content}
                        </h2>

                        <div className="grid gap-4">
                            {currentQ.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`text-left p-4 rounded-xl border transition-all ${answers[currentQ._id] === option
                                            ? "bg-blue-600/20 border-blue-500 ring-1 ring-blue-500"
                                            : "bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-500"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ${answers[currentQ._id] === option ? "bg-blue-500 border-blue-500 text-white" : "border-gray-500 text-gray-500"
                                            }`}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className={answers[currentQ._id] === option ? "text-white" : "text-gray-300"}>
                                            {option}
                                        </span>
                                    </div>
                                </button>
                            ))}

                            {/* Special case for HR/Text questions if options empty? No, model says options array. */}
                        </div>
                    </div>
                </main>

                {/* Right: Sidebar / Question Palette */}
                <aside className="w-80 bg-gray-900 border-l border-gray-800 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-300">Question Palette</h3>
                        {!isFullscreen && (
                            <button onClick={enterFullscreen} className="p-2 bg-gray-800 rounded hover:bg-gray-700 text-blue-400" title="Go Fullscreen">
                                <Maximize className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-5 gap-3 mb-8">
                        {questions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentQuestionIndex(idx)}
                                className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors relative ${currentQuestionIndex === idx
                                        ? "ring-2 ring-white bg-blue-600 text-white" // current
                                        : answers[q._id]
                                            ? "bg-green-600/20 text-green-400 border border-green-600/50" // answered
                                            : markedForReview[q._id]
                                                ? "bg-purple-600/20 text-purple-400 border border-purple-600/50" // review
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-750" // unvisited
                                    }`}
                            >
                                {idx + 1}
                                {markedForReview[q._id] && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-600/20 border border-green-600 rounded"></span> Answered</div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-600/20 border border-purple-600 rounded"></span> Review</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-800 rounded"></div> Not Visited</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded ring-1 ring-white"></div> Current</div>
                        </div>

                        <div className="h-px bg-gray-800 my-4"></div>

                        <button
                            onClick={toggleReview}
                            className={`w-full py-3 rounded-lg border flex items-center justify-center gap-2 transition-colors ${markedForReview[currentQ._id]
                                    ? "bg-purple-600/20 border-purple-500 text-purple-300"
                                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                                }`}
                        >
                            <Flag className="w-4 h-4" />
                            {markedForReview[currentQ._id] ? "Unmark Review" : "Mark for Review"}
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentQuestionIndex === 0}
                                className="flex-1 py-3 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className="flex-1 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AssessmentAttemptPage;
