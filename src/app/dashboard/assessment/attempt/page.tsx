
"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
    ChevronLeft,
    ChevronRight,
    Flag,
    Maximize,
    Target,
    Activity,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

    // State
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [markedReview, setMarkedReview] = useState<Record<string, boolean>>({});
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins
    const [violations, setViolations] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Grouping by section (for Aptitude)
    const sections = useMemo(() => {
        const groups: Record<string, number[]> = {};
        questions.forEach((q, i) => {
            if (!groups[q.category]) groups[q.category] = [];
            groups[q.category].push(i);
        });
        return groups;
    }, [questions]);

    const activeSection = questions[currentIdx]?.category || "General";

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios.post("/api/assessment/start", { type, company, limit: 25 });
                setQuestions(res.data.questions);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (type) init();
    }, [type, company]);

    const [isTerminated, setIsTerminated] = useState(false);

    // Handlers
    const handleSubmit = React.useCallback(async (isBreach = false) => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (isTerminated && !isBreach) return; // Prevent double submit

        try {
            const res = await axios.post("/api/assessment/submit", {
                userId: "user_test",
                type,
                company,
                answers,
                timeTaken: (30 * 60) - timeLeft,
                strictModeViolations: violations,
                isBreach // Flag for backend
            });
            if (res.data.success) {
                if (isBreach) {
                    setIsTerminated(true);
                } else {
                    router.push(`/dashboard/assessment/analysis/${res.data.resultId}`);
                }
            }
        } catch (err) {
            console.error(err);
            alert("Submission error.");
        }
    }, [answers, company, router, timeLeft, type, violations, isTerminated]);

    // Violation Logic (Strict Mode)
    useEffect(() => {
        const onHidden = () => {
            if (document.hidden && !isTerminated) {
                handleSubmit(true); // Immediate termination on tab switch
            }
        };
        const onFS = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement && !isTerminated) {
                setViolations(v => v + 1);
                // We could terminate here too, but usually tab switching is the hard limit
            }
        };
        document.addEventListener("visibilitychange", onHidden);
        document.addEventListener("fullscreenchange", onFS);
        return () => {
            document.removeEventListener("visibilitychange", onHidden);
            document.removeEventListener("fullscreenchange", onFS);
        };
    }, [handleSubmit, isTerminated]);

    const enterFS = () => containerRef.current?.requestFullscreen();

    useEffect(() => {
        if (loading || isTerminated) return;
        timerRef.current = setInterval(() => {
            setTimeLeft(p => {
                if (p <= 1) {
                    handleSubmit();
                    return 0;
                }
                return p - 1;
            });
        }, 1000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [loading, handleSubmit, isTerminated]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    if (loading) return (
        <div className="h-screen bg-[#02040a] flex items-center justify-center font-sans tracking-tight">
            <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-16 h-16 rounded-full border-t-2 border-blue-500 animate-spin" />
                <span className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs">Initializing Session</span>
            </motion.div>
        </div>
    );

    const question = questions[currentIdx];

    if (!loading && questions.length === 0) {
        return (
            <div className="h-screen bg-[#02040a] flex items-center justify-center font-sans">
                <div className="text-center p-12 bg-white/5 border border-white/10 rounded-[48px] max-w-lg">
                    <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Module Initializing</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        The {type} data stream for {company || "General"} is currently being calibrated. Please check back shortly for full simulation availability.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard/general-track/assessments')}
                        className="px-8 py-3 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs"
                    >
                        Back to Nexus
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="h-screen bg-[#02040a] text-white flex flex-col font-sans overflow-hidden select-none">

            {/* HUD / Top Bar */}
            <header className="h-24 border-b border-white/5 bg-black/60 backdrop-blur-3xl px-8 flex items-center justify-between z-50">
                <div className="flex items-center gap-8">
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-widest text-blue-500 mb-0.5">{type} Simulation</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                            <Target className="w-3 h-3 text-red-500" /> Target: {company || "General"}
                        </p>
                    </div>

                    {/* Section Switcher (Tabs) */}
                    <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 ml-8">
                        {Object.keys(sections).map((s) => (
                            <button
                                key={s}
                                onClick={() => setCurrentIdx(sections[s][0])}
                                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSection === s
                                    ? "bg-blue-600 shadow-lg shadow-blue-500/20 text-white"
                                    : "text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    {/* Violations */}
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Stability Status</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`w-3 h-1 rounded-full ${violations >= i ? "bg-red-500 shadow-[0_0_5px_red]" : "bg-gray-800"}`} />
                            ))}
                        </div>
                    </div>

                    {/* Timer */}
                    <div className={`text-4xl font-black font-mono tracking-tighter ${timeLeft < 300 ? "text-red-500" : "text-gray-100"}`}>
                        {formatTime(timeLeft)}
                    </div>

                    <button
                        onClick={() => handleSubmit()}
                        className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-900/20 transition-all active:scale-95"
                    >
                        End Session
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">

                {/* Main Control Canvas */}
                <main className="flex-1 overflow-y-auto p-12 scroll-smooth">
                    <div className="max-w-4xl mx-auto">

                        <div className="mb-12 flex items-center justify-between">
                            <div>
                                <span className="text-gray-600 font-black uppercase tracking-widest text-xs block mb-2">Problem Sequence</span>
                                <h3 className="text-5xl font-black text-white/10">{currentIdx + 1} / {questions.length}</h3>
                            </div>
                            <div className="flex gap-3">
                                <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
                                <span className="text-xs font-black uppercase text-blue-500 tracking-widest">Live Engine</span>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIdx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-12"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-100 pr-12">
                                    {question.content}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {question.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setAnswers({ ...answers, [question._id]: opt })}
                                            className={`flex items-center gap-6 p-6 rounded-[32px] border transition-all relative group overflow-hidden ${answers[question._id] === opt
                                                ? "bg-blue-600/10 border-blue-500 shadow-2xl"
                                                : "bg-[#0a0d16] border-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-colors ${answers[question._id] === opt ? "bg-blue-500 text-white" : "bg-white/5 text-gray-500 group-hover:text-gray-300"
                                                }`}>
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className={`text-lg transition-colors ${answers[question._id] === opt ? "text-white font-bold" : "text-gray-400"}`}>
                                                {opt}
                                            </span>
                                            {answers[question._id] === opt && (
                                                <div className="absolute right-6 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Actions */}
                        <div className="mt-20 flex items-center gap-4">
                            <button
                                onClick={() => setCurrentIdx(p => Math.max(0, p - 1))}
                                disabled={currentIdx === 0}
                                className="p-5 rounded-[24px] bg-white/5 border border-white/5 hover:bg-white/10 disabled:opacity-20 transition-all"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>

                            <button
                                onClick={() => setMarkedReview({ ...markedReview, [question._id]: !markedReview[question._id] })}
                                className={`flex-1 py-5 rounded-[24px] border font-black uppercase tracking-widest text-xs transition-all ${markedReview[question._id]
                                    ? "bg-orange-500/10 border-orange-500/30 text-orange-500"
                                    : "bg-white/5 border-white/5 text-gray-500"
                                    }`}
                            >
                                <Flag className="w-4 h-4 inline-block mr-2" />
                                {markedReview[question._id] ? "Marked for Review" : "Flag for Audit"}
                            </button>

                            <button
                                onClick={() => setCurrentIdx(p => Math.min(questions.length - 1, p + 1))}
                                disabled={currentIdx === questions.length - 1}
                                className="flex-1 py-5 rounded-[24px] bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all disabled:opacity-20"
                            >
                                Advance Logic <ChevronRight className="w-4 h-4 inline-block ml-2" />
                            </button>
                        </div>
                    </div>
                </main>

                {/* Right Analytics Sidebar */}
                <aside className={`w-80 bg-black/60 backdrop-blur-3xl border-l border-white/5 p-8 flex flex-col hidden xl:flex`}>
                    <div className="flex items-center justify-between mb-10">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-600">Grid Overview</span>
                        {!isFullscreen && (
                            <button onClick={enterFS} className="text-blue-500 hover:text-blue-400">
                                <Maximize className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-3 content-start">
                        {questions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIdx(i)}
                                className={`h-12 rounded-xl text-xs font-black transition-all relative ${currentIdx === i
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110 z-10"
                                    : answers[q._id]
                                        ? "bg-green-500/20 text-green-400 border border-green-500/20"
                                        : markedReview[q._id]
                                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/20"
                                            : "bg-white/5 text-gray-600 border border-white/5"
                                    }`}
                            >
                                {i + 1}
                                {markedReview[q._id] && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto space-y-6">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-600">Progress</span>
                                <span className="text-blue-500">{Math.round((Object.keys(answers).length / questions.length) * 100)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                                    className="h-full bg-blue-500"
                                />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                            <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest block mb-4">Strict Mode Warning</span>
                            <div className="flex items-center gap-3">
                                <ShieldAlert className={`w-6 h-6 ${violations > 0 ? "text-red-500 animate-pulse" : "text-gray-700"}`} />
                                <p className="text-[10px] text-gray-500 font-medium leading-tight">
                                    Stay within the perimeter. Window switches are logged as terminal errors.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

        </div>
    );
};

const ShieldAlert = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="M12 8v4" /><path d="M12 16h.01" />
    </svg>
);

export default AssessmentAttemptPage;
