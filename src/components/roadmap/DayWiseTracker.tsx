
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RoadmapNode, DayPlan } from "@/data/roadmaps/types";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayWiseTrackerProps {
    node: RoadmapNode;
}

export function DayWiseTracker({ node }: DayWiseTrackerProps) {
    const storageKey = `roadmap-progress-${node.id}`;

    // Initialize state from local storage securely
    const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem(storageKey);
                return saved ? JSON.parse(saved) : [];
            } catch (e) {
                console.error("Failed to parse roadmap progress", e);
                return [];
            }
        }
        return [];
    });

    const toggleTask = (taskId: string) => {
        setCompletedTasks(prev => {
            const next = prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId];

            localStorage.setItem(storageKey, JSON.stringify(next));
            return next;
        });
    };

    if (!node.dayWisePlan || node.dayWisePlan.length === 0) {
        return <div className="text-slate-400 italic">No day-wise plan available for this topic.</div>;
    }

    return (
        <div className="space-y-6">
            {node.dayWisePlan.map((dayPlan, index) => (
                <div key={index} className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">Day {dayPlan.day}</span>
                        <h4 className="text-white font-medium">{dayPlan.title}</h4>
                    </div>
                    <p className="text-slate-400 text-sm pl-2 border-l-2 border-white/5 ml-3">{dayPlan.description}</p>
                    <ul className="space-y-2 pl-2 border-l-2 border-white/5 ml-3">
                        {dayPlan.tasks.map((task, i) => {
                            const taskId = `${node.id}-day-${dayPlan.day}-task-${i}`;
                            const isCompleted = completedTasks.includes(taskId);

                            return (
                                <li
                                    key={taskId}
                                    onClick={() => toggleTask(taskId)}
                                    className="flex items-start gap-3 text-slate-300 text-sm cursor-pointer group hover:bg-white/5 p-2 rounded-lg transition-colors"
                                >
                                    <div className={cn("mt-0.5 transition-colors", isCompleted ? "text-green-500" : "text-slate-600 group-hover:text-slate-400")}>
                                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                    </div>
                                    <span className={cn(isCompleted && "line-through text-slate-500")}>
                                        {task}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
