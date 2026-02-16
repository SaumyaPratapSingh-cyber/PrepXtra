"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Flame, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
    totalSubjects: number;
    completedSubjects: number;
    totalTopics: number;
    completedTopics: number;
    streak: number;
    totalTimeMinutes: number;
}

const ProgressTracker = ({
    totalSubjects,
    completedSubjects,
    totalTopics,
    completedTopics,
    streak,
    totalTimeMinutes
}: ProgressTrackerProps) => {
    const topicProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

    // Format time
    const hours = Math.floor(totalTimeMinutes / 60);
    const minutes = totalTimeMinutes % 60;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border bg-card p-4 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                        <Flame className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                        <h3 className="text-2xl font-bold">{streak} Days</h3>
                    </div>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border bg-card p-4 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <Target className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-1">
                            <p className="text-sm font-medium text-muted-foreground">Topics Completed</p>
                            <span className="text-xs font-medium text-primary">{Math.round(topicProgress)}%</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{completedTopics} <span className="text-sm text-muted-foreground font-normal">/ {totalTopics}</span></h3>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${topicProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border bg-card p-4 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                        <Award className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Learning Time</p>
                        <h3 className="text-2xl font-bold">{hours}h {minutes}m</h3>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProgressTracker;
