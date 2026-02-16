"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Lightbulb, CheckCircle2, Code2, Clock, History, Layout, MessageSquare, Terminal, ChevronRight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import CodeEditor from "@/components/ui/CodeEditor";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function ProblemDetailPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    const [activeTab, setActiveTab] = useState<"description" | "solution" | "submissions">("description");
    const [problem, setProblem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchProblem();
        }
    }, [slug]);

    const fetchProblem = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/problems/${slug}`);
            setProblem(res.data.problem);
        } catch (error) {
            console.error("Failed to fetch problem", error);
        } finally {
            setLoading(false);
        }
    };

    const difficultyColors = {
        easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
        medium: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
        hard: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-black">
                <div className="relative">
                    <div className="h-16 w-16 rounded-2xl border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                    <Code2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-orange-500" />
                </div>
                <p className="mt-4 text-slate-500 font-medium animate-pulse">Initializing Lab Environment...</p>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-black">
                <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 max-w-md">
                    <Terminal className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Problem Not Located</h3>
                    <p className="text-slate-500 mb-6">The challenge you're looking for doesn't exist or has been moved.</p>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" /> Return to Database
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col">
            {/* Split View Container */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Panel: Content */}
                <div className="w-1/2 flex flex-col border-r border-white/5 bg-[#0a0a0a]">
                    {/* Header Strip */}
                    <div className="px-6 py-4 border-b border-white/5 bg-[#0b0b0b] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/5"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </button>
                            <div>
                                <h1 className="text-lg font-black text-white leading-none mb-1.5 flex items-center gap-2">
                                    {problem.title}
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border",
                                        difficultyColors[problem.difficulty as keyof typeof difficultyColors]
                                    )}>
                                        {problem.difficulty}
                                    </span>
                                </h1>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Layout className="h-3 w-3" /> {problem.category || "General DSA"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tab Bar */}
                    <div className="flex px-4 pt-4 border-b border-white/5 bg-[#0a0a0a] gap-1">
                        {[
                            { id: "description", label: "Description", icon: BookOpen },
                            { id: "solution", label: "Editorial", icon: Lightbulb },
                            { id: "submissions", label: "Submissions", icon: History }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-b-2",
                                    activeTab === tab.id
                                        ? "text-orange-500 border-orange-500 bg-orange-500/5"
                                        : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/5"
                                )}
                            >
                                <tab.icon className="h-3.5 w-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {activeTab === "description" && (
                                    <motion.div
                                        key="description"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-8"
                                    >
                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-slate-400 leading-relaxed text-[15px] whitespace-pre-line">
                                                {problem.description}
                                            </p>
                                        </div>

                                        {/* Examples Grid */}
                                        {problem.examples?.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                    <Terminal className="h-4 w-4 text-orange-500" />
                                                    Test Case Scenarios
                                                </h3>
                                                <div className="space-y-4">
                                                    {problem.examples.map((ex: any, i: number) => (
                                                        <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors">
                                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Example {i + 1}</div>
                                                            <div className="grid gap-3">
                                                                <div className="flex items-start gap-3">
                                                                    <span className="text-[10px] font-black text-orange-500/50 uppercase mt-1 w-12">Input</span>
                                                                    <code className="text-xs text-white font-mono bg-white/5 px-2 py-1 rounded block flex-1 border border-white/5">
                                                                        {ex.input}
                                                                    </code>
                                                                </div>
                                                                <div className="flex items-start gap-3">
                                                                    <span className="text-[10px] font-black text-emerald-500/50 uppercase mt-1 w-12">Output</span>
                                                                    <code className="text-xs text-emerald-400 font-mono bg-emerald-500/5 px-2 py-1 rounded block flex-1 border border-emerald-500/10">
                                                                        {ex.output}
                                                                    </code>
                                                                </div>
                                                                {ex.explanation && (
                                                                    <div className="flex items-start gap-3 mt-1">
                                                                        <span className="text-[10px] font-black text-slate-600 uppercase mt-0.5 w-12 text-right">
                                                                            <ChevronRight className="h-3 w-3 inline" />
                                                                        </span>
                                                                        <p className="text-xs text-slate-400 leading-relaxed italic">
                                                                            {ex.explanation}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Constraints Bar */}
                                        {problem.constraints?.length > 0 && (
                                            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                                    <LockIcon className="h-20 w-20 text-blue-500" />
                                                </div>
                                                <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                                                    Operating Constraints
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {problem.constraints.map((c: string, i: number) => (
                                                        <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 font-mono text-[11px] text-blue-300">
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === "solution" && (
                                    <motion.div
                                        key="solution"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        {problem.solutions?.length > 0 ? (
                                            problem.solutions.map((sol: any, i: number) => (
                                                <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                                                <Lightbulb className="h-4 w-4 text-orange-500" />
                                                            </div>
                                                            <h4 className="text-white font-bold">{sol.approach}</h4>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <span className="text-[10px] font-black text-slate-500 uppercase px-2 py-1 rounded bg-white/5">{sol.language}</span>
                                                        </div>
                                                    </div>
                                                    <div className="relative group">
                                                        <pre className="p-4 rounded-xl bg-black border border-white/5 text-sm text-slate-300 font-mono overflow-x-auto">
                                                            <code>{sol.code}</code>
                                                        </pre>
                                                    </div>
                                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                                        <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                                                            <div className="text-[10px] font-black text-green-500/50 uppercase mb-1">Time Complexity</div>
                                                            <div className="text-xs text-white font-mono">{sol.timeComplexity}</div>
                                                        </div>
                                                        <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                                            <div className="text-[10px] font-black text-blue-500/50 uppercase mb-1">Space Complexity</div>
                                                            <div className="text-xs text-white font-mono">{sol.spaceComplexity}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-20">
                                                <MessageSquare className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                                                <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Awaiting Editorial Content</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === "submissions" && (
                                    <motion.div
                                        key="submissions"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-24"
                                    >
                                        <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <History className="h-8 w-8 text-slate-700" />
                                        </div>
                                        <h3 className="text-white font-bold mb-2">No History Recorded</h3>
                                        <p className="text-slate-500 text-sm">Submit your solution to track your progress.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Editor */}
                <div className="flex-1 bg-black flex flex-col relative">
                    <CodeEditor
                        problemId={slug}
                        starterCode={problem.starterCode}
                        testCases={problem.testCases}
                        functionName={problem.functionName}
                    />
                </div>
            </div>
        </div>
    );
}

function LockIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    )
}
