"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import {
    Loader2,
    ChevronLeft,
    BookOpen,
    Clock,
    BarChart,
    CheckCircle2
} from "lucide-react";
import TopicList from "@/components/core-subjects/TopicList";

export default function SubjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [subject, setSubject] = useState<any>(null);
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Mock user progress
    const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/core-subjects?slug=${slug}`);

                setSubject(res.data.subject);
                setTopics(res.data.topics);

                // Here we would also fetch user progress for this subject
                // const progressRes = await axios.get(...)

            } catch (err: any) {
                console.error("Error fetching subject:", err);
                setError(err.response?.data?.error || "Failed to load subject");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex h-96 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !subject) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <p className="text-destructive font-medium">{error || "Subject not found"}</p>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Go Back
                </button>
            </div>
        );
    }

    // Calculate generic stats
    const totalDuration = topics.reduce((acc, topic) => acc + (topic.estimatedMinutes || 0), 0);
    const completedCount = completedTopicIds.length;
    const progressPercentage = topics.length > 0 ? (completedCount / topics.length) * 100 : 0;

    return (
        <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
            <button
                onClick={() => router.push("/dashboard/core-subjects")}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            {/* Subject Header */}
            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            {subject.category}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">
                            {subject.name}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {subject.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{topics.length} Topics</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{Math.round(totalDuration / 60)}h {totalDuration % 60}m Total</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4" />
                            <span>{subject.difficulty}</span>
                        </div>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="rounded-2xl border bg-card p-6 shadow-sm h-fit">
                    <h3 className="font-semibold mb-4">Your Progress</h3>
                    <div className="space-y-4">
                        <div className="flex items-end justify-between text-sm">
                            <span className="text-muted-foreground">Completed</span>
                            <span className="font-bold">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1 }}
                                className="h-full bg-primary"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-center pt-2">
                            {completedCount} of {topics.length} topics completed
                        </p>

                        <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                            {progressPercentage > 0 ? "Continue Learning" : "Start Learning"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Topics List */}
            <div className="space-y-6 pt-4">
                <h2 className="text-2xl font-bold tracking-tight">Syllabus</h2>
                <TopicList
                    subjectSlug={slug}
                    topics={topics}
                    completedTopicIds={completedTopicIds}
                />
            </div>
        </div>
    );
}
