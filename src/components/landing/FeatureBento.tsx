"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Map, Users, Trophy, Sparkles, MessageSquare, MonitorPlay, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

import { StarsBackground } from "@/components/landing/StarsBackground";
import { ShootingStars } from "@/components/landing/ShootingStars";

export function FeatureBento() {
    return (
        <section className="py-24 px-4 relative bg-black overflow-hidden">
            {/* Creative Background: Stars & Shooting Stars */}
            <div className="absolute inset-0 z-0">
                <StarsBackground
                    starDensity={0.0003}
                    allStarsTwinkle={true}
                    twinkleProbability={0.8}
                    minTwinkleSpeed={0.8}
                    maxTwinkleSpeed={1.2}
                    className="opacity-70"
                />
                <ShootingStars
                    starColor="#F97316" // Orange to match theme
                    trailColor="#EC4899" // Pink/Purple trail
                    minSpeed={15}
                    maxSpeed={35}
                    minDelay={2000}
                    maxDelay={5000}
                    starWidth={20}
                    starHeight={2}
                />
                {/* Subtle gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
            </div>

            <div className="max-w-7xl mx-auto relative z-20">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            Your Arsenal for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Success</span>
                        </h2>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                            We've built a comprehensive ecosystem to cover every aspect of your technical growth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">

                    {/* 1. Personalized Roadmaps (Large - 8 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 relative group overflow-hidden rounded-[2.5rem] bg-[#111] border border-white/10 p-8 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 w-full max-w-md">
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider">
                                <Map className="h-3 w-3" /> Adaptive Learning
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Personalized Roadmaps</h3>
                            <p className="text-slate-400">
                                Proprietary algorithms analyze your skills to generate a bespoke curriculum. Stop wasting time on what you already know.
                            </p>
                        </div>

                        {/* Visual: Mini Roadmap Graphic */}
                        <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="relative w-full h-[80%] border-l-2 border-dashed border-white/10 ml-12 space-y-8">
                                {['Data Structures', 'Algorithms', 'System Design'].map((step, i) => (
                                    <div key={i} className="relative pl-8">
                                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-[#111] ${i === 1 ? 'bg-orange-500' : 'bg-slate-700'}`} />
                                        <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-sm text-slate-300 w-48">
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. AI Avatar (Tall - 4 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 p-8"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-50" />

                        <div className="relative z-10 h-full flex flex-col items-center text-center">
                            <div className="mb-6 relative">
                                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse">
                                    <Users className="h-10 w-10 text-indigo-400" />
                                </div>
                                <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full border-4 border-[#0a0a0a]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">AI Interviewer</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                Face realistic 3D avatars in real-time technical & HR rounds.
                            </p>
                            <button className="mt-auto w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-indigo-500/50">
                                Start Mock <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>

                    {/* 3. Code/Solver (4 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] bg-[#111] border border-white/10 p-8"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent" />
                        <div className="relative z-10 text-left">
                            <Code2 className="h-10 w-10 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Real-time Solver</h3>
                            <p className="text-slate-400 text-sm">
                                Instant complexity analysis and optimization suggestions.
                            </p>
                        </div>
                        {/* Abstract Code Visual */}
                        <div className="mt-8 space-y-2 opacity-50 font-mono text-xs">
                            <div className="text-green-400">function solve(graph) &#123;</div>
                            <div className="pl-4 text-slate-500">const nodes = ...</div>
                            <div className="pl-4 text-slate-500">return optimize(nodes);</div>
                            <div className="text-green-400">&#125;</div>
                        </div>
                    </motion.div>

                    {/* 4. Company Archives (4 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] bg-[#111] border border-white/10 p-8 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
                        <div className="relative z-10">
                            <div className="flex -space-x-3 mb-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-[#222] border-2 border-[#111] flex items-center justify-center text-xs text-white  font-bold">
                                        {i === 1 ? 'G' : i === 2 ? 'M' : 'A'}
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Company Archives</h3>
                            <p className="text-slate-400 text-sm">
                                Curated questions from top tech giants.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-yellow-500 text-sm font-bold">
                            <Star className="h-4 w-4 fill-current" /> 500+ Questions
                        </div>
                    </motion.div>

                    {/* 5. Expert Advice (4 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-indigo-800 p-8"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 transform rotate-12">
                            <Sparkles className="h-32 w-32 text-white" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Expert Advice</h3>
                                <p className="text-white/80 text-sm">
                                    AI-driven insights to crack the toughest coding interviews.
                                </p>
                            </div>
                            <button className="self-start mt-4 px-4 py-2 rounded-full bg-white text-purple-900 font-bold text-sm hover:scale-105 transition-transform">
                                Get Insights
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
