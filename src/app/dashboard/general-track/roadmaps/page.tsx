"use client";

import { useState } from "react";
import { Map, CheckCircle2, Clock, ArrowRight, Sparkles, TrendingUp, Layers, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function RoadmapsPage() {
    const roadmaps = [
        {
            id: "frontend",
            title: "Frontend Maestro",
            description: "Master the art of building immersive, high-performance web interfaces with React and Next.js.",
            color: "from-blue-600 to-cyan-500",
            estimatedHours: 120,
            topics: 45,
            icon: Rocket
        },
        {
            id: "backend",
            title: "Backend Architect",
            description: "Design scalable systems, master database optimization, and build robust API ecosystems.",
            color: "from-emerald-600 to-teal-500",
            estimatedHours: 140,
            topics: 52,
            icon: Layers
        },
        {
            id: "fullstack",
            title: "Full-Stack Elite",
            description: "The complete journey from zero to production-ready engineer, covering the entire modern stack.",
            color: "from-purple-600 to-pink-500",
            estimatedHours: 200,
            topics: 68,
            icon: Sparkles
        },
        {
            id: "devops",
            title: "Cloud Ops & SRE",
            description: "Master infrastructure as code, CI/CD pipelines, and cloud orchestration at scale.",
            color: "from-orange-600 to-rose-500",
            estimatedHours: 160,
            topics: 58,
            icon: TrendingUp
        }
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[120px] pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-4">
                    <Map className="h-3 w-3" />
                    Curated Learning Paths
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                    Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Roadmaps</span>
                </h1>
                <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
                    Battle-tested structured paths designed to take you from core concepts to professional mastery.
                </p>
            </motion.div>

            {/* Roadmaps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roadmaps.map((roadmap, index) => (
                    <motion.div
                        key={roadmap.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative"
                    >
                        <div className="relative p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col h-full">
                            {/* Animated Background Gradient */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700",
                                roadmap.color
                            )} />

                            <div className="flex justify-between items-start mb-8">
                                <div className={cn(
                                    "h-16 w-16 rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500 bg-gradient-to-br",
                                    roadmap.color
                                )}>
                                    <roadmap.icon className="h-8 w-8 text-white" />
                                </div>
                                <div className="px-3 py-1 rounded-full bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    Active Now
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {roadmap.title}
                            </h3>

                            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                {roadmap.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                        <Clock className="h-3 w-3" /> Duration
                                    </div>
                                    <div className="text-white font-bold">{roadmap.estimatedHours} Hours</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                        <Layers className="h-3 w-3" /> Depth
                                    </div>
                                    <div className="text-white font-bold">{roadmap.topics} Modules</div>
                                </div>
                            </div>

                            <button className={cn(
                                "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-gradient-to-r hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden",
                                roadmap.color
                            )}>
                                <span className="relative z-10 flex items-center gap-2">
                                    Initialize Track
                                    <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center pt-8 border-t border-white/5"
            >
                <p className="text-xs text-slate-600 font-medium">
                    Content derived from industry standards and verified by senior engineers.
                </p>
            </motion.div>
        </div>
    );
}
