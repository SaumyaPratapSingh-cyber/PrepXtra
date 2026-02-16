
"use client";

import { motion } from "framer-motion";
import { roadmaps } from "@/data/roadmaps";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RoadmapTrack } from "@/data/roadmaps/types";

const categoryLabels: Record<string, string> = {
    "role-based": "🎯 Role-Based Roadmaps",
    "skill-based": "⚡ Skill-Based Roadmaps",
    "beginner": "🌱 Absolute Beginners",
    "best-practices": "✨ Best Practices",
};

const categoryOrder = ["role-based", "skill-based", "beginner", "best-practices"];

function groupByCategory(tracks: Record<string, RoadmapTrack>) {
    const groups: Record<string, RoadmapTrack[]> = {};
    Object.values(tracks).forEach(t => {
        const cat = t.category || "role-based";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(t);
    });
    return groups;
}

const accentColors: Record<string, string> = {
    frontend: "#f59e0b",
    backend: "#10b981",
    devops: "#6366f1",
    fullstack: "#ec4899",
    react: "#06b6d4",
    dsa: "#ef4444",
};

export default function RoadmapListingPage() {
    const grouped = groupByCategory(roadmaps);

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50"
                >
                    Developer Roadmaps
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 mt-2 text-lg"
                >
                    Step-by-step guides and paths to learn different tools or technologies
                </motion.p>
            </div>

            {categoryOrder.map(cat => {
                const tracks = grouped[cat];
                if (!tracks || tracks.length === 0) return null;

                return (
                    <motion.section
                        key={cat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">
                            {categoryLabels[cat] || cat}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {tracks.map((roadmap, i) => {
                                const accent = roadmap.accentColor || accentColors[roadmap.id] || "#6366f1";
                                const nodeCount = Object.keys(roadmap.nodes).length;

                                return (
                                    <Link key={roadmap.id} href={`/dashboard/roadmap/${roadmap.id}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            whileHover={{ y: -2, scale: 1.01 }}
                                            className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 rounded-xl p-4 transition-all duration-300 cursor-pointer overflow-hidden"
                                        >
                                            {/* Accent glow on hover */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                                style={{
                                                    background: `radial-gradient(ellipse at top left, ${accent}11 0%, transparent 60%)`,
                                                }}
                                            />

                                            <div className="relative z-10 flex items-center justify-between">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    {/* Icon/Emoji */}
                                                    <span className="text-xl shrink-0">{roadmap.icon || "📘"}</span>

                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-semibold text-white truncate">
                                                            {roadmap.title}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 truncate">
                                                            {nodeCount} topics
                                                        </p>
                                                    </div>
                                                </div>

                                                <ArrowRight
                                                    className="w-4 h-4 text-slate-600 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all shrink-0"
                                                />
                                            </div>

                                            {/* Bottom accent line */}
                                            <div
                                                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
                                            />
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.section>
                );
            })}
        </div>
    );
}
