"use client";

import { Code2, Map, Brain, BookOpen, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default function GeneralTrackPage() {
    const router = useRouter();

    const modules = [
        {
            id: "dsa",
            title: "DSA Practice",
            description: "Master Data Structures & Algorithms with 500+ curated problems and an integrated IDE.",
            icon: Code2,
            gradient: "from-orange-500 to-red-600",
            route: "/dashboard/general-track/dsa",
            stats: "500+ Problems"
        },
        {
            id: "roadmaps",
            title: "Tech Roadmaps",
            description: "Step-by-step guides for Frontend, Backend, DevOps, and more using roadmap.sh integration.",
            icon: Map,
            gradient: "from-blue-500 to-purple-600",
            route: "/dashboard/general-track/roadmaps",
            stats: "15+ Paths"
        },
        {
            id: "interviews",
            title: "AI Interviews",
            description: "Practice behavioral and technical mock interviews tailored to specific roles and companies.",
            icon: Brain,
            gradient: "from-green-500 to-emerald-600",
            route: "/dashboard/general-track/interviews",
            stats: "Real-time Feedback"
        },
        {
            id: "subjects",
            title: "Core Subjects",
            description: "Deep dive into OS, DBMS, and Computer Networks with comprehensive notes and quizzes.",
            icon: BookOpen,
            gradient: "from-pink-500 to-rose-600",
            route: "/dashboard/core-subjects",
            stats: "3 Major Subjects"
        },
        {
            id: "assessments",
            title: "Assessments",
            description: "Validate your skills with our rigorous 3-round assessment system mimicking real hiring processes.",
            icon: Trophy,
            gradient: "from-yellow-500 to-orange-600",
            route: "/dashboard/general-track/assessments",
            stats: "3-Round System"
        }
    ];

    return (
        <DashboardPage>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-4">
                            <Sparkles className="h-3 w-3" />
                            Comprehensive Learning
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            General Practice Track
                        </h1>
                        <p className="text-slate-400 max-w-2xl">
                            Your all-in-one ecosystem for mastering computer science fundamentals and interview preparation.
                        </p>
                    </motion.div>
                </div>

                {/* Module Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            onClick={() => router.push(module.route)}
                            className="group relative cursor-pointer h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative h-full p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-300">
                                <div className="bg-[#0a0a0a] rounded-[22px] p-6 h-full flex flex-col items-start border border-white/5 group-hover:border-transparent transition-colors">
                                    <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${module.gradient} mb-6 shadow-lg`}>
                                        <module.icon className="h-6 w-6 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                                        {module.title}
                                    </h3>

                                    <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-1">
                                        {module.description}
                                    </p>

                                    <div className="w-full flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            {module.stats}
                                        </span>
                                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all transform group-hover:-rotate-45">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardPage>
    );
}
