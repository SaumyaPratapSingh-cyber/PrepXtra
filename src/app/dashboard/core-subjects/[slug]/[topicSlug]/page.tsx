"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import ContentViewer from "@/components/core-subjects/ContentViewer";
import QuizComponent from "@/components/core-subjects/QuizComponent";
import { cn } from "@/lib/utils";

export default function TopicLearningPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    const topicSlug = params?.topicSlug as string;

    const [topicData, setTopicData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<"content" | "quiz">("content");
    const [completedBase, setCompletedBase] = useState(false);

    useEffect(() => {
        if (!topicSlug) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setCurrentView("content"); // Reset view on slug change
                const res = await axios.get(`/api/core-topics/${topicSlug}`);
                setTopicData(res.data);
            } catch (err) {
                console.error("Error fetching topic:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [topicSlug]);

    const handleContentComplete = async () => {
        setCompletedBase(true);
        // Save progress to API
        try {
            await axios.post("/api/core-progress", {
                userId: "user123", // Mock ID
                subjectId: topicData?.topic?.subject?._id, // Need to ensure populated
                action: "complete_content",
                data: {
                    topicId: topic._id,
                    timeSpent: 15 // Mock time
                }
            });

            // If quiz exists, prompt to take it
            if (topicData?.quiz) {
                setCurrentView("quiz");
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                // Navigate to next topic or back
                // For now just show completion state
            }
        } catch (err) {
            console.error("Error saving progress:", err);
        }
    };

    const handleQuizComplete = async (score: number, totalPoints: number, passed: boolean) => {
        try {
            await axios.post("/api/core-progress", {
                userId: "user123",
                subjectId: topicData?.topic?.subject?._id,
                action: "submit_quiz",
                data: {
                    quizId: topicData?.quiz?._id,
                    score,
                    totalPoints,
                    passed
                }
            });

            if (passed) {
                await axios.post("/api/core-progress", {
                    userId: "user123",
                    subjectId: topicData?.topic?.subject?._id,
                    action: "complete_topic",
                    data: {
                        topicId: topicData?.topic?._id
                    }
                });
            }
        } catch (err) {
            console.error("Error saving quiz results:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!topicData || !topicData.topic) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4">
                <p>Topic not found</p>
                <button onClick={() => router.back()}>Go Back</button>
            </div>
        );
    }

    const { topic, content, quiz } = topicData;
    const mainContent = content?.[0]; // Assuming one main content per topic for now

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Bar */}
            <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push(`/dashboard/core-subjects/${slug}`)}
                            className="rounded-full p-2 hover:bg-muted transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Topic</span>
                            <span className="font-semibold leading-tight">{topic.title}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentView("content")}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                currentView === "content"
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            Content
                        </button>
                        {quiz && (
                            <button
                                onClick={() => setCurrentView("quiz")}
                                className={cn(
                                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                    currentView === "quiz"
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                Quiz
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="container mx-auto max-w-4xl px-4 py-8">
                <AnimatePresence mode="wait">
                    {currentView === "content" ? (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {topic.content ? (
                                <ContentViewer
                                    content={topic.content}
                                    resources={topic.resources}
                                    onComplete={handleContentComplete}
                                    isCompleted={completedBase}
                                />
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    No content available for this topic yet.
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {quiz ? (
                                <QuizComponent
                                    quiz={quiz}
                                    onComplete={handleQuizComplete}
                                />
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    No quiz available for this topic.
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
