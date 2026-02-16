"use client";

import { motion } from "framer-motion";

export function AnimatedGrid() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Horizontal moving lines */}
            <motion.div
                className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"
            />

            <div className="absolute inset-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent h-full w-full"
                    animate={{ y: [-1000, 1000] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                />
            </div>
        </div>
    );
}
