"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Book,
    Cpu,
    Database,
    BrainCircuit,
    Code2,
    ChevronRight,
    Clock,
    BarChart,
    Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
    subject: {
        _id: string;
        name: string;
        slug: string;
        category: string;
        description: string;
        icon: string;
        difficulty: string;
        estimatedHours: number;
        prerequisites: string[];
    };
    progress?: {
        completedTopics: string[];
        completedContent: string[];
        quizScores: any[];
        totalTimeSpent: number;
    } | null;
    totalTopics?: number;
    isLocked?: boolean;
}

const iconMap: Record<string, any> = {
    "book": Book,
    "cpu": Cpu,
    "database": Database,
    "brain-circuit": BrainCircuit,
    "code-2": Code2,
    "hard-drive": Database, // Fallback
    "chip": Cpu,
    "network": Database, // Fallback
    "brain": BrainCircuit,
    "code": Code2,
    "server": Database,
    "terminal": Code2,
    "shield": Lock,
    "warehouse": Database,
    "sparkles": BrainCircuit,
    "chart-bar": BarChart,
    "flask": BrainCircuit,
    "bug": Code2,
    "globe": Code2,
    "calculator": BarChart,
    "binary": Code2
};

const SubjectCard = ({ subject, progress, totalTopics = 0, isLocked = false }: SubjectCardProps) => {
    const Icon = iconMap[subject.icon] || Book;

    // Calculate progress percentage
    const completedCount = progress?.completedTopics?.length || 0;
    const progressPercentage = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300",
                "bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5",
                isLocked
                    ? "opacity-60 grayscale border-dashed cursor-not-allowed"
                    : "hover:border-primary/50 border-border/50"
            )}
        >
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-start justify-between">
                <div className={cn(
                    "rounded-xl p-3 transition-colors duration-300",
                    isLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                )}>
                    <Icon className="h-6 w-6" />
                </div>
                {isLocked ? (
                    <div className="rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground border border-border/50">
                        Locked
                    </div>
                ) : (
                    <div className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium border",
                        subject.difficulty === "Beginner" && "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
                        subject.difficulty === "Intermediate" && "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
                        subject.difficulty === "Advanced" && "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
                    )}>
                        {subject.difficulty}
                    </div>
                )}
            </div>

            <div className="relative z-10 mt-5 space-y-2">
                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{subject.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {subject.description}
                </p>
            </div>

            <div className="relative z-10 mt-6 flex items-center gap-4 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{subject.estimatedHours}h</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/30 px-2 py-1 rounded-md">
                    <Book className="h-3.5 w-3.5" />
                    <span>{totalTopics} Topics</span>
                </div>
            </div>

            {/* Progress Bar */}
            {!isLocked && (
                <div className="relative z-10 mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-medium text-muted-foreground">Progress</span>
                        <span className="font-bold text-primary">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-primary bg-gradient-to-r from-primary to-primary/80"
                        />
                    </div>
                </div>
            )}

            <div className="relative z-10 mt-6">
                {isLocked ? (
                    <button disabled className="flex w-full items-center justify-center gap-2 rounded-xl bg-muted/50 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed">
                        <Lock className="h-4 w-4" />
                        <span>Prerequisites Required</span>
                    </button>
                ) : (
                    <Link href={`/dashboard/core-subjects/${subject.slug}`} className="block">
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                            <span>{progressPercentage > 0 ? "Continue Learning" : "Start Learning"}</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default SubjectCard;
