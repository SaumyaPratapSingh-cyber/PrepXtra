"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const [beams, setBeams] = React.useState<any[]>([]);

    React.useEffect(() => {
        setBeams(Array.from({ length: 20 }).map(() => ({
            initialX: Math.random() * 400 - 200,
            initialY: Math.random() * 400 - 200,
            animateX: Math.random() * 800 - 400,
            animateY: Math.random() * 800 - 400,
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
        })));
    }, []);

    return (
        <div
            className={cn(
                "absolute inset-0 h-full w-full bg-transparent flex flex-col items-center justify-center overflow-hidden pointer-events-none",
                className
            )}
        >
            <div className="absolute inset-0 z-0 bg-transparent flex flex-row justify-center pointer-events-none select-none">
                {beams.map((beam, i) => (
                    <motion.div
                        key={`beam-${i}`}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            x: beam.initialX,
                            y: beam.initialY,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5],
                            x: beam.animateX,
                            y: beam.animateY,
                        }}
                        transition={{
                            duration: beam.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: beam.delay,
                        }}
                        className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-20"
                        style={{
                            background: `radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(0,0,0,0) 70%)`,
                            width: `${beam.width}px`,
                            height: `${beam.height}px`,
                        }}
                    />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={`beam-white-${i}`}
                        initial={{
                            rotate: 45,
                            opacity: 0,
                            x: -100,
                        }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            x: 100,
                            y: [0, -20, 0]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "linear"
                        }}
                        className="w-[1px] h-[200%] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent absolute top-[-50%] left-[50%] transform -translate-x-1/2"
                        style={{
                            left: `${(i / 15) * 100}%`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
