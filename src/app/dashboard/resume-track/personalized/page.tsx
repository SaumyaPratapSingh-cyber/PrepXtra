"use client";

import { useState, useEffect } from "react";
import { Code2, Map, Brain, BookOpen, Target, TrendingUp, Sparkles, Clock, ChevronRight, Activity, CheckCircle2, Play, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default function PersonalizedDashboardPage() {
    const router = useRouter();
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("roadmap");

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = async () => {
        try {
            const res = await axios.get("/api/personalized-plan");
            if (res.data.success) {
                setPlan(res.data.plan);
            }
        } catch (error) {
            console.error("Failed to fetch plan", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardPage>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <Sparkles className="h-10 w-10 text-orange-500 animate-pulse" />
                        <p className="text-slate-400 animate-pulse">Loading your personalized strategy...</p>
                    </div>
                </div>
            </DashboardPage>
        );
    }

    if (!plan) {
        return (
            <DashboardPage>
                <div className="flex items-center justify-center h-[60vh] text-center">
                    <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 max-w-lg">
                        <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Activity className="h-8 w-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Unable to Load Strategy
                        </h2>
                        <p className="text-slate-400 mb-8">
                            We encountered an issue retrieving your personalized plan. This could be a temporary connection glitch.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
                            >
                                <TrendingUp className="h-4 w-4" /> Try Again
                            </button>
                            <button
                                onClick={() => router.push("/dashboard/resume-track/upload")}
                                className="px-6 py-3 rounded-xl bg-white/5 text-slate-400 font-bold hover:text-white hover:bg-white/10 transition-colors"
                            >
                                Re-upload Resume
                            </button>
                        </div>
                    </div>
                </div>
            </DashboardPage>
        );
    }

    return (
        <DashboardPage>
            <div className="space-y-8 pb-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/20 blur-[100px] pointer-events-none" />

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20 mb-4 uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" />
                        Targeting {plan.targetCompany}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                        Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Strategy</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-lg font-light">
                        {plan.analysis?.gapAnalysis || "Your path has been optimized for success based on your unique background."}
                    </p>
                </motion.div>

                {/* Analysis Highlights */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" /> Key Strengths
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {plan.analysis?.strengths?.map((s: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="h-5 w-5 text-red-500" /> Focus Areas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {plan.analysis?.weaknesses?.map((s: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-white/10 pb-1 overflow-x-auto">
                    {['roadmap', 'questions'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-3 text-sm font-bold capitalize transition-all relative whitespace-nowrap",
                                activeTab === tab ? "text-orange-500" : "text-slate-500 hover:text-white"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'roadmap' && (
                        <motion.div
                            key="roadmap"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {plan.roadmap?.map((item: any, i: number) => (
                                <div key={i} className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden group hover:border-orange-500/30 transition-all">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent opacity-50" />
                                    <h4 className="text-lg font-bold text-white mb-2">Week {item.week} - Day {item.day}: {item.topic}</h4>
                                    <p className="text-slate-400 text-sm mb-4">{item.description}</p>
                                    <div className="flex flex-wrap gap-3">
                                        {item.resources?.map((res: any, j: number) => (
                                            <a
                                                key={j}
                                                href={res.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                                            >
                                                <BookOpen className="h-3 w-3" /> {res.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'questions' && (
                        <motion.div
                            key="questions"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {plan.curatedQuestions?.map((q: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm",
                                            q.difficulty === 'Hard' ? "bg-red-500/10 text-red-500" :
                                                q.difficulty === 'Medium' ? "bg-amber-500/10 text-amber-500" :
                                                    "bg-emerald-500/10 text-emerald-500"
                                        )}>
                                            {q.difficulty?.[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{q.title}</h4>
                                            <p className="text-xs text-slate-500">{q.pattern} • {q.companyTag}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/dashboard/resume-track/ide?title=${encodeURIComponent(q.title)}&company=${encodeURIComponent(plan.targetCompany)}&pattern=${encodeURIComponent(q.pattern)}`)}
                                        className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
                                    >
                                        <Play className="h-3 w-3" /> Solve
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardPage>
    );
}
