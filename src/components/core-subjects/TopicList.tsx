"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Circle,
    Lock,
    PlayCircle,
    Clock,
    ChevronRight,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
    _id: string;
    title: string;
    slug: string;
    description: string;
    estimatedMinutes: number;
    difficulty: string;
}

interface TopicListProps {
    subjectSlug: string;
    topics: Topic[];
    completedTopicIds: string[];
    isLocked?: boolean;
}

const TopicList = ({ subjectSlug, topics, completedTopicIds, isLocked = false }: TopicListProps) => {
    const pathname = usePathname();

    return (
        <div className="space-y-4">
            {topics.map((topic, index) => {
                const isCompleted = completedTopicIds.includes(topic._id);
                // In a real app, logic for locking individual topics based on previous completion would go here
                // For now, we only lock if the whole subject is locked
                const isTopicLocked = isLocked;
                const isActive = pathname?.includes(topic.slug);

                const ContentWrapper = isTopicLocked ? "div" : Link;

                return (
                    <motion.div
                        key={topic._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <ContentWrapper
                            href={`/dashboard/core-subjects/${subjectSlug}/${topic.slug}`}
                            className={cn(
                                "group flex items-center justify-between rounded-xl border p-4 transition-all",
                                isActive
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : "bg-card hover:border-primary/50 hover:shadow-sm",
                                isTopicLocked && "opacity-60 cursor-not-allowed hover:border-border hover:shadow-none bg-muted/30"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                                    isCompleted
                                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                        : isActive
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                )}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : isTopicLocked ? (
                                        <Lock className="h-5 w-5" />
                                    ) : (
                                        <PlayCircle className="h-5 w-5" />
                                    )}
                                </div>

                                <div>
                                    <h4 className={cn(
                                        "font-medium transition-colors",
                                        isActive ? "text-primary" : "text-card-foreground"
                                    )}>
                                        {topic.title}
                                    </h4>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{topic.estimatedMinutes} min</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className={cn(
                                                "rounded-full px-1.5 py-0.5 text-[10px] font-medium border",
                                                topic.difficulty === "Easy" && "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400",
                                                topic.difficulty === "Medium" && "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-400",
                                                topic.difficulty === "Hard" && "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
                                            )}>
                                                {topic.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isTopicLocked && (
                                <ChevronRight className={cn(
                                    "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1",
                                    isActive && "text-primary"
                                )} />
                            )}
                        </ContentWrapper>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default TopicList;
