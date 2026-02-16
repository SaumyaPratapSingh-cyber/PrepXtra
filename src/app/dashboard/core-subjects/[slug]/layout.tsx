"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import {
    BookOpen,
    CheckCircle2,
    Circle,
    ChevronLeft,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function SubjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const pathname = usePathname();
    const slug = params?.slug as string;

    // State
    const [subject, setSubject] = useState<any>(null);
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [progress, setProgress] = useState<any>({});

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/core-subjects?slug=${slug}`);
                setSubject(res.data.subject);
                setTopics(res.data.topics);

                // Fetch progress
                const progressRes = await axios.get(`/api/core-progress?userId=user123&subjectId=${res.data.subject._id}`);
                const progressMap: any = {};
                progressRes.data.progress.forEach((p: any) => {
                    progressMap[p.topicId] = p.status === "completed";
                });
                setProgress(progressMap);

            } catch (err) {
                console.error("Error fetching subject data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    // Close sidebar on mobile route change
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!subject) return <div>Subject not found</div>;

    const completedCount = Object.values(progress).filter(Boolean).length;
    const progressPercent = topics.length ? (completedCount / topics.length) * 100 : 0;

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Mobile Sidebar Toggle */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-background border rounded-md shadow-sm"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-72 transform bg-card border-r transition-transform duration-300 md:relative md:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b">
                        <Link
                            href="/dashboard/core-subjects"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
                        >
                            <ChevronLeft size={14} />
                            Back to Subjects
                        </Link>
                        <h2 className="text-xl font-bold line-clamp-2">{subject.name}</h2>

                        {/* Progress Bar */}
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>{Math.round(progressPercent)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Topics List */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <div className="px-3 space-y-1">
                            {topics.map((topic, index) => {
                                const isCompleted = progress[topic._id];
                                const isActive = pathname?.includes(topic.slug);

                                return (
                                    <Link
                                        key={topic._id}
                                        href={`/dashboard/core-subjects/${slug}/${topic.slug}`}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors relative",
                                            isActive
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        )}
                                    >
                                        {/* Status Icon */}
                                        <div className="flex-shrink-0">
                                            {isCompleted ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <div className={cn(
                                                    "h-4 w-4 rounded-full border-2",
                                                    isActive ? "border-primary" : "border-muted-foreground/30"
                                                )} />
                                            )}
                                        </div>

                                        <span className="line-clamp-1">{index + 1}. {topic.title}</span>

                                        {/* Active Indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t text-xs text-center text-muted-foreground">
                        © 2026 PrepXtra
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
