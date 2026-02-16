"use client";

import { useState } from "react";
import { Trophy, Clock, Code, Brain, Target, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AssessmentsPage() {
    const router = useRouter();

    const assessments = [
        {
            id: "aptitude",
            round: 1,
            title: "Aptitude Test",
            description: "Logical reasoning, quantitative aptitude, and verbal ability.",
            icon: Brain,
            duration: "60 min",
            questions: 50,
            color: "from-blue-500 to-cyan-600",
            status: "not-started",
            passingScore: "70%"
        },
        {
            id: "coding",
            round: 2,
            title: "Technical Coding",
            description: "Solve 3-4 DSA problems within the time limit.",
            icon: Code,
            duration: "90 min",
            questions: 4,
            color: "from-purple-500 to-pink-600",
            status: "locked",
            passingScore: "All Passed"
        },
        {
            id: "interview",
            round: 3,
            title: "AI Interview",
            description: "AI-powered mock interview with behavioral and technical questions.",
            icon: Target,
            duration: "45 min",
            questions: "Dynamic",
            color: "from-orange-500 to-red-600",
            status: "locked",
            passingScore: "8/10 Rating"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20 mb-4">
                        <Trophy className="h-3 w-3" />
                        Official Certification
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                        Assessment <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Center</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Prove your skills through our rigorous 3-round evaluation process.
                    </p>
                </div>
            </motion.div>

            {/* Assessment Flow */}
            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 hidden md:block rounded-full" />

                <div className="space-y-12 relative z-10">
                    {assessments.map((assessment, index) => (
                        <motion.div
                            key={assessment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Card */}
                            <div className="flex-1 w-full">
                                <div className={cn(
                                    "relative p-1 rounded-3xl transition-all duration-300 group",
                                    assessment.status === "locked" ? "opacity-60 grayscale" : "hover:scale-[1.02]"
                                )}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${assessment.color} rounded-3xl opacity-0 ${assessment.status !== "locked" && "group-hover:opacity-100"} transition-opacity duration-500 blur-xl`} />

                                    <div className="relative p-6 md:p-8 rounded-[22px] bg-[#0a0a0a] border border-white/5 h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${assessment.color} shadow-lg`}>
                                                <assessment.icon className="h-6 w-6 text-white" />
                                            </div>
                                            {assessment.status === "locked" ? (
                                                <div className="bg-white/5 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-500 border border-white/5">
                                                    <Lock className="h-3 w-3" /> LOCKED
                                                </div>
                                            ) : (
                                                <div className="bg-white/5 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-green-400 border border-white/5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> OPEN
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2">{assessment.title}</h3>
                                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">{assessment.description}</p>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-white/5 rounded-lg p-3">
                                                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Duration</div>
                                                <div className="text-sm font-bold text-white">{assessment.duration}</div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-3">
                                                <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Target className="h-3 w-3" /> Passing</div>
                                                <div className="text-sm font-bold text-white">{assessment.passingScore}</div>
                                            </div>
                                        </div>

                                        {assessment.status !== "locked" ? (
                                            <button className={`w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r ${assessment.color} hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:gap-3`}>
                                                Start Assessment
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        ) : (
                                            <button disabled className="w-full py-3.5 rounded-xl font-bold text-slate-500 bg-white/5 cursor-not-allowed border border-white/5">
                                                Unlock Previous Round
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Center Marker (Desktop) */}
                            <div className="hidden md:flex flex-col items-center justify-center z-10 relative">
                                <div className={cn(
                                    "h-12 w-12 rounded-full border-4 flex items-center justify-center bg-[#0a0a0a]",
                                    assessment.status === "completed" ? "border-green-500 text-green-500" :
                                        assessment.status === "not-started" && index === 0 ? "border-orange-500 text-orange-500" :
                                            "border-slate-800 text-slate-600"
                                )}>
                                    <span className="font-bold">{assessment.round}</span>
                                </div>
                            </div>

                            {/* Empty Space for alignment */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
