"use client";

import { useState } from "react";
import { BookOpen, Play, CheckCircle, Smartphone, Database, Globe, Layers, Server } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CoreSubjectsPage() {
    const subjects = [
        {
            id: "os",
            title: "Operating Systems",
            description: "Processes, threads, memory management, scheduling",
            color: "from-blue-500 to-cyan-600",
            icon: Layers,
            progress: 12,
            topics: 12
        },
        {
            id: "dbms",
            title: "Database Management",
            description: "SQL, normalization, transactions, indexing",
            color: "from-green-500 to-emerald-600",
            icon: Database,
            progress: 45,
            topics: 10
        },
        {
            id: "cn",
            title: "Computer Networks",
            description: "OSI model, TCP/IP, HTTP, DNS, routing",
            color: "from-purple-500 to-pink-600",
            icon: Globe,
            progress: 0,
            topics: 11
        },
        {
            id: "oop",
            title: "Object-Oriented Programming",
            description: "Classes, inheritance, polymorphism, design patterns",
            color: "from-orange-500 to-red-600",
            icon: BookOpen,
            progress: 80,
            topics: 8
        },
        {
            id: "sd",
            title: "System Design",
            description: "Scalability, load balancing, caching, microservices",
            color: "from-yellow-500 to-orange-600",
            icon: Server,
            progress: 5,
            topics: 15
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Subjects</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Master fundamental computer science concepts with interactive notes and quizzes.
                    </p>
                </motion.div>
            </div>

            {/* Subjects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="group relative cursor-pointer h-full"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />

                        <div className="relative h-full p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-300">
                            <div className="bg-[#0a0a0a] rounded-[22px] p-6 h-full flex flex-col border border-white/5 group-hover:border-transparent transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${subject.color} shadow-lg shadow-black/50`}>
                                        <subject.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold text-slate-300 border border-white/5">
                                        {subject.topics} Topics
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                    {subject.title}
                                </h3>

                                <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-1">
                                    {subject.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</span>
                                        <span className="text-xs font-bold text-white">{subject.progress}%</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${subject.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                            className={`h-full bg-gradient-to-r ${subject.color}`}
                                        />
                                    </div>

                                    <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 group-hover:bg-white/10">
                                        <Play className="h-4 w-4 fill-current" />
                                        Continue Learning
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
