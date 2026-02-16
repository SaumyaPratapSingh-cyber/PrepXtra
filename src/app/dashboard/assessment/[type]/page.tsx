
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code, Layers, Play } from "lucide-react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import axios from "axios";
import { AssessmentGuidelines } from "@/components/assessment/AssessmentGuidelines";

interface Config {
    companies: string[];
    technicalTopics: string[];
    aptitudeCategories: string[];
}

const AssessmentConfigPage = () => {
    const params = useParams();
    const router = useRouter();
    const type = params.type as string; // 'aptitude' | 'technical' | 'hr'

    const [config, setConfig] = useState<Config | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [showGuidelines, setShowGuidelines] = useState(false);

    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axios.get("/api/assessment/config");
                setConfig(res.data);
            } catch (error) {
                console.error("Failed to fetch config", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleStart = () => {
        // Generate a unique assessment ID or just pass params to the next page
        // For simplicity, we'll pass params via URL query or local storage
        // Using a query string for the attempt page
        const query = new URLSearchParams({
            type: formattedType, // 'Aptitude', 'Technical', 'HR'
        });

        if (selectedCompany) query.append("company", selectedCompany);
        if (selectedCategory) query.append("category", selectedCategory);

        const url = `/dashboard/assessment/attempt?${query.toString()}`;
        router.push(url);
    };

    if (loading) {
        return (
            <DashboardPage>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </DashboardPage>
        );
    }

    return (
        <DashboardPage>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl"
                >
                    <div className="mb-8 border-b border-gray-800 pb-6">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Configure {formattedType} Assessment
                        </h1>
                        <p className="text-gray-400">
                            Customize your assessment to focus on specific areas.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Conditional Rendering based on Type */}

                        {type === "aptitude" && config?.companies && (
                            <div className="space-y-3">
                                <label className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-400" />
                                    Select Target Company (Optional)
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {config.companies.map((company) => (
                                        <button
                                            key={company}
                                            onClick={() => setSelectedCompany(selectedCompany === company ? "" : company)}
                                            className={`p-3 rounded-lg border transition-all ${selectedCompany === company
                                                ? "bg-blue-600/20 border-blue-500 text-white"
                                                : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
                                                }`}
                                        >
                                            {company}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {type === "technical" && config?.technicalTopics && (
                            <div className="space-y-3">
                                <label className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Code className="w-5 h-5 text-purple-400" />
                                    Select Topic
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full md:w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                >
                                    <option value="">All Topics</option>
                                    {config.technicalTopics.map((topic) => (
                                        <option key={topic} value={topic}>{topic}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {type === "aptitude" && config?.aptitudeCategories && (
                            <div className="space-y-3">
                                <label className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-cyan-400" />
                                    Select Category (Optional)
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full md:w-1/2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                                >
                                    <option value="">All Categories</option>
                                    {config.aptitudeCategories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="pt-8 flex justify-end">
                            <button
                                onClick={() => setShowGuidelines(true)}
                                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105"
                            >
                                <Play className="w-5 h-5" />
                                Proceed to Guidelines
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {showGuidelines && (
                    <AssessmentGuidelines
                        title={`${formattedType} Assessment`}
                        duration={20} // Example duration
                        onStart={handleStart}
                        onCancel={() => setShowGuidelines(false)}
                    />
                )}
            </AnimatePresence>
        </DashboardPage>
    );
};

export default AssessmentConfigPage;
