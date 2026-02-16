"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InterviewInterface } from "@/components/interview/InterviewInterface";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShieldCheck, Award, TrendingUp, Target, RefreshCcw, Home, BrainCircuit, UserCheck, MessageCircle, Gauge, Activity } from "lucide-react";

export default function ThreeDInterviewPage() {
    const [status, setStatus] = useState<"idle" | "listening" | "speaking">("idle");
    const [volume, setVolume] = useState(0);
    const [confidence, setConfidence] = useState(100);
    const [currentQuestion, setCurrentQuestion] = useState("Awaiting neural connection...");
    const [sessionResults, setSessionResults] = useState<{ question: string; answer: string }[] | null>(null);
    const [role] = useState("Full Stack Developer");
    const router = useRouter();

    const handleEndSession = (results: any) => {
        setSessionResults(results);
    };

    if (sessionResults) {
        return (
            <div className="h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-4xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
                >
                    <header className="mb-8 pt-4">
                        <h2 className="text-4xl font-black tracking-tighter mb-2 text-indigo-400">Session Complete.</h2>
                        <p className="text-slate-500 font-medium text-sm">Review your performance with Siddharth V.</p>
                    </header>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { icon: Target, label: "Rounds", value: sessionResults.length, color: "text-indigo-400" },
                            { icon: TrendingUp, label: "Depth", value: "Advanced", color: "text-emerald-400" },
                            { icon: BrainCircuit, label: "Core", value: "Technical", color: "text-purple-400" }
                        ].map((stat, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
                                <stat.icon className={stat.color} size={18} />
                                <div>
                                    <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</h4>
                                    <p className="text-xl font-black">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 mb-8">
                        {sessionResults.map((r, i) => (
                            <div key={i} className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Q{i + 1}: {r.question}</p>
                                <p className="text-slate-300 text-xs italic opacity-80">"{r.answer}"</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 pb-4">
                        <button onClick={() => window.location.reload()} className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Restart</button>
                        <button onClick={() => router.push("/dashboard")} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all text-slate-400">Exit</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <nav className="z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5 py-3 px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                    <button onClick={() => router.push("/dashboard")} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-500 hover:text-white">
                        <ChevronLeft size={16} />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-[10px] font-black tracking-[0.4em] text-indigo-400 leading-none mb-1 text-shadow-glow">AI INTERROGATOR</h1>
                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Candidate: Full Stack Aspire</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <UserCheck size={14} className="text-indigo-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Lead Interviewer: Siddharth V.</span>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center p-4 lg:p-8 relative z-10 overflow-hidden min-h-0">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center h-full max-h-[88vh]">

                    {/* LEFT COLUMN: VISUALS & METRICS */}
                    <div className="lg:col-span-5 flex flex-col items-center gap-6 h-full justify-center">

                        {/* PRESSURE METER */}
                        <div className="w-full max-w-[280px] p-5 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] flex flex-col items-center gap-3 shadow-2xl shrink-0">
                            <div className="flex items-center justify-between w-full mb-1">
                                <div className="flex items-center gap-2">
                                    <Gauge size={14} className="text-indigo-400" />
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Pressure Gauge</span>
                                </div>
                                <span className={`text-[10px] font-black ${confidence > 75 ? 'text-emerald-400' : confidence > 40 ? 'text-amber-400' : 'text-red-400'}`}>
                                    {confidence}% CONFIDENT
                                </span>
                            </div>

                            <div className="relative w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    className={`absolute inset-y-0 left-0 rounded-full ${confidence > 75 ? 'bg-emerald-500' : confidence > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    initial={{ width: "100%" }}
                                    animate={{ width: `${confidence}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                            </div>

                            <div className="flex justify-between w-full mt-1">
                                <span className="text-[7px] font-black text-slate-600 uppercase tracking-tighter">Under Pressure</span>
                                <span className="text-[7px] font-black text-slate-600 uppercase tracking-tighter">Absolute Control</span>
                            </div>
                        </div>

                        {/* INTERVIEWER PORTRAIT - SHRUNK */}
                        <div className="relative group shrink-0">
                            <div className={`absolute -inset-6 bg-indigo-500/20 rounded-[3rem] blur-3xl transition-opacity duration-1000 ${status === 'speaking' ? 'opacity-100' : 'opacity-0'}`} />
                            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[3.5rem] overflow-hidden border border-white/10 bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                                    alt="Siddharth V."
                                    className={`w-full h-full object-cover transition-all duration-1000 ${status === 'speaking' ? 'scale-110 brightness-110' : 'scale-100 brightness-75 grayscale-[0.2]'}`}
                                />
                                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/20 to-transparent">
                                    <div className={`px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl inline-flex items-center gap-2 ${status === 'speaking' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-black/40 text-slate-400'}`}>
                                        <Activity size={10} className={status === 'speaking' ? 'animate-pulse' : ''} />
                                        <span className="text-[8px] font-black uppercase tracking-widest shrink-0">
                                            {status === 'speaking' ? 'Synthesizing Audio' : status === 'listening' ? 'Awaiting Data' : 'Neural Idle'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CURRENT QUESTION - COMPACT */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[320px] bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl p-4 relative shrink-0">
                            <MessageCircle size={14} className="absolute -top-2 -left-2 text-indigo-500 fill-indigo-500/20" />
                            <p className="text-xs font-medium text-slate-300 leading-relaxed italic line-clamp-4 text-center">
                                "{currentQuestion}"
                            </p>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: CONTROLS */}
                    <div className="lg:col-span-12 items-center flex flex-col gap-8 shrink-0 lg:hidden">
                        {/* Mobile view spacer or small header here if needed */}
                    </div>

                    <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6 h-full justify-center">
                        <div className="space-y-1 text-center lg:text-left shrink-0">
                            <h2 className="text-2xl lg:text-4xl font-black tracking-tighter leading-none">
                                Assessment Hub <br />
                                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent underline decoration-indigo-500/20 underline-offset-8">v02.8 Live Sync.</span>
                            </h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Active Target: Senior Tech Recruiter Protocol</p>
                        </div>

                        <InterviewInterface
                            role={role}
                            onStatusChange={setStatus}
                            onVolumeChange={setVolume}
                            onConfidenceUpdate={setConfidence}
                            onNextQuestion={setCurrentQuestion}
                            onEndSession={handleEndSession}
                        />

                        <div className="hidden lg:grid grid-cols-2 gap-10 pt-6 w-full border-t border-white/5 shrink-0 max-w-2xl">
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={12} className="text-indigo-400" />
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Neural Bridge</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Gemini 2.0 Flash Verified</p>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <RefreshCcw size={12} className="text-indigo-400" />
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Response Integrity</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Zero-Latency Interruption</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
