
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BookOpen, Youtube, FileText } from "lucide-react";
import { RoadmapNode } from "@/data/roadmaps/types";
import { DayWiseTracker } from "./DayWiseTracker";

interface TopicDetailsProps {
    node: RoadmapNode | null;
    isOpen: boolean;
    onClose: () => void;
}

export function TopicDetails({ node, isOpen, onClose }: TopicDetailsProps) {
    if (!node) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{node.label}</h2>
                                <p className="text-slate-400 text-sm mt-1">{node.description}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Resources Section */}
                            <section>
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <ExternalLink className="w-5 h-5 text-orange-400" />
                                    Recommended Resources
                                </h3>
                                <div className="grid gap-3">
                                    {node.resources.map((res, i) => (
                                        <a
                                            key={i}
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/30 transition-all group"
                                        >
                                            <div className="p-2 rounded-lg bg-black/40 text-slate-400 group-hover:text-orange-400 transition-colors">
                                                {res.type === 'video' ? <Youtube className="w-5 h-5" /> :
                                                    res.type === 'documentation' ? <BookOpen className="w-5 h-5" /> :
                                                        <FileText className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-medium group-hover:text-orange-400 transition-colors">{res.title}</div>
                                                <div className="text-xs text-slate-500 uppercase tracking-wider">{res.type}</div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all" />
                                        </a>
                                    ))}
                                </div>
                            </section>

                            {/* Day Wise Plan */}
                            <section>
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-green-400" />
                                    Day-wise Plan
                                </h3>
                                <DayWiseTracker node={node} />
                            </section>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
