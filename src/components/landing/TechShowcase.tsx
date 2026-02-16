"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { BackgroundBeams } from "@/components/landing/BackgroundBeams";

export function TechShowcase() {
    // Generate random bars for sorting visualization
    const [bars, setBars] = useState<number[]>([]);

    useEffect(() => {
        setBars(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)));

        const interval = setInterval(() => {
            setBars(prev => {
                const newBars = [...prev];
                // Simple random sort step visualization
                const i = Math.floor(Math.random() * (newBars.length - 1));
                if (newBars[i] > newBars[i + 1]) {
                    [newBars[i], newBars[i + 1]] = [newBars[i + 1], newBars[i]];
                }
                return newBars;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-32 bg-black relative border-y border-white/5 overflow-hidden">
            <BackgroundBeams />
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Text Content */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Advanced Algorithms</span>
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Our "Solver" engine doesn't just check your code; it analyzes complexity, visualizes execution flow, and benchmarks your solution against millions of data points in real-time.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Time Complexity", value: "O(n log n)" },
                                { label: "Execution Speed", value: "< 50ms" },
                                { label: "Test Cases", value: "1000+" },
                                { label: "Languages", value: "Multi-Support" },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* 3D Visualization Abstract */}
                <div className="relative h-[400px] w-full bg-slate-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-end justify-center px-8 pb-8 perspective-[1000px]">
                    {/* Overlay Scanline */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent z-10" />

                    {/* Sorting Bars */}
                    <div className="flex items-end gap-2 h-3/4 w-full justify-center">
                        {bars.map((height, i) => (
                            <motion.div
                                key={i}
                                layout
                                className="w-4 bg-orange-500 rounded-t-sm shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                style={{ height: `${height}%`, opacity: 0.8 + (height / 500) }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        ))}
                    </div>

                    {/* Floating Code Snippet */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute top-8 left-8 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 font-mono text-xs text-green-400 shadow-xl z-30"
                    >
                        <div className="opacity-50 text-slate-500">// Real-time Optimization</div>
                        <div>Analyzing graph nodes...</div>
                        <div className="text-orange-400">Path found: 52ms</div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
