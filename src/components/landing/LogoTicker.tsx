"use client";

import { motion } from "framer-motion";

const technologies = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "System Design", "AWS", "Docker", "Kubernetes", "GraphQL", "Redis", "PostgreSQL",
    "React", "Next.js", "TypeScript", "Node.js", "Python", "System Design", "AWS", "Docker", "Kubernetes", "GraphQL", "Redis", "PostgreSQL"
];

export function LogoTicker() {
    return (
        <div className="w-full py-10 bg-black border-y border-white/5 overflow-hidden flex relative z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
            <motion.div
                className="flex gap-16 items-center whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear",
                }}
            >
                {technologies.map((tech, i) => (
                    <span key={i} className="text-2xl font-bold text-slate-500/80 uppercase tracking-widest hover:text-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-300 cursor-default px-4">
                        {tech}
                    </span>
                ))}
                {technologies.map((tech, i) => (
                    <span key={`dup-${i}`} className="text-2xl font-bold text-slate-500/80 uppercase tracking-widest hover:text-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-300 cursor-default px-4">
                        {tech}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
