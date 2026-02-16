"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Loader2, BookOpen } from "lucide-react";
import SubjectCard from "@/components/core-subjects/SubjectCard";
import ProgressTracker from "@/components/core-subjects/ProgressTracker";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
// import useAuth from "@/hooks/useAuth"; // Assuming an auth hook exists
// Using a mock user ID for now if auth hook is not found, or standard next-auth session

interface CategoryGroup {
    [key: string]: any[];
}

export default function CoreSubjectsDashboard() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [categories, setCategories] = useState<CategoryGroup>({});
    const [progress, setProgress] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSubjects: 0,
        completedSubjects: 0,
        totalTopics: 0,
        completedTopics: 0,
        streak: 0,
        totalTimeMinutes: 0
    });

    // Mock user ID for demo - in production replace with actual auth
    // const { user } = useAuth();
    const userId = "user123"; // Replace with actual user ID fetching logic

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch subjects
                const subjectsRes = await axios.get("/api/core-subjects");
                setSubjects(subjectsRes.data.subjects);
                setCategories(subjectsRes.data.groupedByCategory);

                // Fetch progress
                // In a real app, use the actual logged-in user's ID
                // const progressRes = await axios.get(`/api/core-progress?userId=${userId}`);
                // setProgress(progressRes.data.progress);

                // Mock progress data for visualization until auth is connected
                const mockProgress = {
                    streak: { current: 3 },
                    totalTimeSpent: 120,
                    coreSubjectsProgress: []
                };

                // Calculate stats
                // For now using mock stats
                setStats({
                    totalSubjects: subjectsRes.data.subjects.length,
                    completedSubjects: 0,
                    totalTopics: subjectsRes.data.subjects.reduce((acc: number, sub: any) => acc + (sub.topics?.length || 5), 0), // Estimate if topics count not in summary
                    completedTopics: 0,
                    streak: 0,
                    totalTimeMinutes: 0
                });

            } catch (error) {
                console.error("Failed to fetch core subjects data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-96 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const categoryOrder = [
        "Computer Science Core Foundations",
        "Systems & Networking",
        "Data and Database Technologies",
        "Data Science",
        "Programming & Software Development"
    ];

    return (
        <DashboardPage>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Core CS Subjects</h1>
                <p className="text-muted-foreground">
                    Master the fundamentals of Computer Science with structured learning paths.
                </p>
            </div>

            {/* Progress Overview */}
            <div className="mt-8">
                <ProgressTracker
                    totalSubjects={stats.totalSubjects}
                    completedSubjects={stats.completedSubjects}
                    totalTopics={stats.totalTopics}
                    completedTopics={stats.completedTopics}
                    streak={stats.streak}
                    totalTimeMinutes={stats.totalTimeMinutes}
                />
            </div>

            {/* Categories */}
            <div className="space-y-12 mt-8">
                {categoryOrder.map((category, catIndex) => {
                    const categorySubjects = categories[category];
                    if (!categorySubjects?.length) return null;

                    return (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.1 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                                <BookOpen className="h-5 w-5 text-orange-500" />
                                <h2 className="text-xl font-semibold">{category}</h2>
                                <span className="ml-auto text-sm text-slate-500">
                                    {categorySubjects.length} Modules
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {categorySubjects.map((subject) => (
                                    <SubjectCard
                                        key={subject._id}
                                        subject={subject}
                                        progress={null} // Pass actual progress here
                                        totalTopics={8} // This should come from API
                                    />
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </DashboardPage>
    );
}
