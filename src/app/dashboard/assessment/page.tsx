
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Brain,
    Code,
    Users,
    ChevronRight,
    Play,
    Lock,
    Search,
    CheckCircle2
} from "lucide-react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import axios from "axios";
import { AssessmentGuidelines } from "@/components/assessment/AssessmentGuidelines";

interface Config {
    companies: string[];
}

const AssessmentLandingPage = () => {
    const router = useRouter();
    const [selectedCompany, setSelectedCompany] = useState<string>("");
    const [config, setConfig] = useState<Config | null>(null);
    const [showCompanyModal, setShowCompanyModal] = useState(true);
    const [activeRound, setActiveRound] = useState<string | null>(null); // 'aptitude', 'technical', 'hr'
    const [showGuidelines, setShowGuidelines] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axios.get("/api/assessment/config");
                setConfig(res.data);
            } catch (error) {
                console.error("Failed to fetch config", error);
            }
        };
        fetchConfig();
    }, []);

    const rounds = [
        {
            id: "aptitude",
            title: "Round 1: Aptitude Test",
            description: "Logical reasoning, quantitative ability, and verbal skills.",
            icon: <Brain className="w-6 h-6" />,
            time: "20 min",
            color: "blue",
            locked: !selectedCompany,
        },
        {
            id: "technical",
            title: "Round 2: Technical Assessment",
            description: "Core CS concepts, DSA, and coding challenges.",
            icon: <Code className="w-6 h-6" />,
            time: "45 min",
            color: "purple",
            locked: !selectedCompany, // In a real app, lock until Round 1 is passed
        },
        {
            id: "hr",
            title: "Round 3: HR Interview",
            description: "Behavioral and situational judgment questions.",
            icon: <Users className="w-6 h-6" />,
            time: "15 min",
            color: "green",
            locked: !selectedCompany, // In real app, lock until Round 2 passed
        },
    ];

    const handleCompanySelect = (company: string) => {
        setSelectedCompany(company);
        setShowCompanyModal(false);
    };

    const handleStartRound = (roundId: string) => {
        if (!selectedCompany) {
            setShowCompanyModal(true);
            return;
        }
        setActiveRound(roundId);
        setShowGuidelines(true);
    };

    const proceedToAssessment = () => {
        if (!activeRound) return;

        const formattedType = activeRound.charAt(0).toUpperCase() + activeRound.slice(1);
        const query = new URLSearchParams({
            type: formattedType,
            company: selectedCompany,
        });

        // For technical, maybe we default to General or based on company stack (mocked for now)
        if (activeRound === 'technical') {
            query.append('category', 'DSA'); // Defaulting to DSA for now
        }

        router.push(`/dashboard/assessment/attempt?${query.toString()}`);
    };

    return (
        <DashboardPage>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-2">
                            Assessment Center
                        </h1>
                        <p className="text-gray-400 max-w-xl">
                            Simulate the complete recruitment process. Select a target company and clear all rounds to get certified.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowCompanyModal(true)}
                        className="flex items-center gap-3 px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Building2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-left">
                            <span className="block text-xs text-gray-400 uppercase tracking-wider">Target Company</span>
                            <span className="block text-white font-semibold">
                                {selectedCompany || "Select Company"}
                            </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 ml-4" />
                    </button>
                </div>

                {/* Rounds Grid */}
                <div className="grid gap-6">
                    {rounds.map((round, index) => (
                        <motion.div
                            key={round.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative overflow-hidden rounded-2xl border transition-all ${round.locked
                                    ? "bg-gray-900/30 border-gray-800 opacity-75"
                                    : "bg-gray-900/60 border-gray-700 hover:border-gray-600 hover:bg-gray-900"
                                }`}
                        >
                            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">

                                {/* Number Badge */}
                                <div className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg border ${round.locked
                                        ? "bg-gray-800 border-gray-700 text-gray-500"
                                        : `bg-${round.color}-500/10 border-${round.color}-500/20 text-${round.color}-400`
                                    }`}>
                                    {index + 1}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`md:hidden p-2 rounded-lg bg-${round.color}-500/10 text-${round.color}-400`}>
                                            {round.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{round.title}</h3>
                                        {round.locked && <Lock className="w-4 h-4 text-gray-500" />}
                                    </div>
                                    <p className="text-gray-400 mb-4 md:mb-0">{round.description}</p>
                                </div>

                                {/* Metadata & Action */}
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-sm text-gray-500 font-medium">
                                        {round.time} • 10 Questions
                                    </div>

                                    <button
                                        onClick={() => !round.locked && handleStartRound(round.id)}
                                        disabled={round.locked}
                                        className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${round.locked
                                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                                : `bg-gradient-to-r from-${round.color}-600 to-${round.color}-500 text-white hover:shadow-lg hover:shadow-${round.color}-500/20`
                                            }`}
                                    >
                                        {round.locked ? 'Locked' : 'Start Round'}
                                        {!round.locked && <Play className="w-4 h-4 fill-current" />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Company Selection Modal */}
            <AnimatePresence>
                {showCompanyModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full p-8 shadow-2xl"
                        >
                            <h2 className="text-3xl font-bold text-white mb-2">Target Company</h2>
                            <p className="text-gray-400 mb-6">Select the company you are preparing for. The questions will be curated based on their latest on-campus patterns.</p>

                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search companies (e.g. Google, Amazon)..."
                                    className="w-full bg-gray-950 border border-gray-800 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                                {config?.companies?.map((company) => (
                                    <button
                                        key={company}
                                        onClick={() => handleCompanySelect(company)}
                                        className={`p-4 rounded-xl border text-left transition-all ${selectedCompany === company
                                                ? "bg-blue-600/20 border-blue-500 ring-1 ring-blue-500"
                                                : "bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-500"
                                            }`}
                                    >
                                        <span className={`block font-semibold ${selectedCompany === company ? 'text-white' : 'text-gray-300'}`}>
                                            {company}
                                        </span>
                                        {selectedCompany === company && (
                                            <span className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Selected
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                {selectedCompany && (
                                    <button
                                        onClick={() => setShowCompanyModal(false)}
                                        className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200"
                                    >
                                        Confirm Selection
                                    </button>
                                )}
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Guidelines Modal */}
            <AnimatePresence>
                {showGuidelines && activeRound && (
                    <AssessmentGuidelines
                        title={rounds.find(r => r.id === activeRound)?.title || "Assessment"}
                        duration={20}
                        onStart={proceedToAssessment}
                        onCancel={() => setShowGuidelines(false)}
                    />
                )}
            </AnimatePresence>
        </DashboardPage>
    );
};

export default AssessmentLandingPage;
