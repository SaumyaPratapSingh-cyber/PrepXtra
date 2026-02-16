
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
    Lock,
    Trophy,
    ArrowRight,
    Target
} from "lucide-react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import axios from "axios";
import { AssessmentGuidelines } from "@/components/assessment/AssessmentGuidelines";

interface Config {
    companies: string[];
}

interface NexusNodeProps {
    id: string;
    title: string;
    icon: React.ReactNode;
    status: 'open' | 'locked';
    onClick: () => void;
    delay?: number;
    color?: 'blue' | 'purple' | 'green';
}

const NexusNode = ({
    id,
    title,
    icon,
    status,
    onClick,
    delay = 0,
    color = "blue"
}: NexusNodeProps) => {
    const isLocked = status === 'locked';

    const colorMap: Record<string, string> = {
        blue: "from-blue-600 to-indigo-600 shadow-blue-500/20",
        purple: "from-purple-600 to-fuchsia-600 shadow-purple-500/20",
        green: "from-emerald-600 to-teal-600 shadow-emerald-500/20"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.8, type: "spring" }}
            className="relative group mt-8"
        >
            <div
                onClick={!isLocked ? onClick : undefined}
                className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative z-20 overflow-hidden ${isLocked
                    ? "bg-gray-900/50 border-gray-800 grayscale cursor-not-allowed"
                    : `bg-black/40 border-${color}-500/30 hover:border-${color}-400 hover:scale-110 shadow-xl`
                    }`}
            >
                {/* Background Glow */}
                {!isLocked && (
                    <div className={`absolute -inset-2 bg-gradient-to-br ${colorMap[color]} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />
                )}

                {/* Progress Ring (Animated for Active) */}
                {!isLocked && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-0 border-t-2 border-${color}-500/20 rounded-full`}
                    />
                )}

                <div className={`${isLocked ? "text-gray-600" : `text-${color}-400`} mb-2`}>
                    {icon}
                </div>
                <span className={`text-center font-bold text-xs md:text-sm px-4 ${isLocked ? "text-gray-600" : "text-gray-200"}`}>
                    {title}
                </span>

                {isLocked && <Lock className="w-4 h-4 text-gray-700 mt-2" />}
            </div>

            {/* Title Badge Floating Below */}
            {!isLocked && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className={`px-3 py-1 bg-${color}-500/10 border border-${color}-500/20 rounded-full text-[10px] font-bold text-${color}-400 uppercase tracking-widest`}>
                        Ready to Launch
                    </span>
                </div>
            )}
        </motion.div>
    );
};

const AssessmentLandingPage = () => {
    const router = useRouter();
    const [selectedCompany, setSelectedCompany] = useState<string>("");
    const [config, setConfig] = useState<Config | null>(null);
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [activeRound, setActiveRound] = useState<string | null>(null);
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

        // Auto-open modal if no company is selected
        const t = setTimeout(() => {
            if (!selectedCompany) setShowCompanyModal(true);
        }, 800);
        return () => clearTimeout(t);
    }, [selectedCompany]);

    const handleCompanySelect = (company: string) => {
        setSelectedCompany(company);
        setShowCompanyModal(false);
    };

    const handleStartRound = (roundId: string) => {
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
        router.push(`/dashboard/assessment/attempt?${query.toString()}`);
    };

    return (
        <DashboardPage>
            <div className="min-h-[85vh] bg-[#02040a] text-white p-6 md:p-12 font-sans relative overflow-hidden flex flex-col">

                {/* Futuristic Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                </div>

                {/* Header Section */}
                <div className="relative z-10 max-w-7xl mx-auto w-full mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <Trophy className="w-3.5 h-3.5" /> Placement Launchpad
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black mb-4 tracking-tighter"
                        >
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Nexus</span>
                        </motion.h1>
                        <p className="text-gray-400 text-lg max-w-xl font-medium">
                            Navigate your career path. Choose a company to begin your personalized hiring simulation.
                        </p>
                    </div>

                    {/* Interactive Selector Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-1.5 pr-6 rounded-3xl flex items-center gap-4 hover:border-blue-500/50 transition-all cursor-pointer group"
                        onClick={() => setShowCompanyModal(true)}
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col min-w-[140px]">
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Active Company</span>
                            <span className="text-lg font-bold truncate">
                                {selectedCompany || "Select Target"}
                            </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                </div>

                {/* The Hub Visualization */}
                <div className="flex-1 flex items-center justify-center relative z-10 py-12">

                    {/* Energy Path SVG Decoration */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
                        <motion.path
                            d="M 200,300 Q 500,100 800,300"
                            fill="none"
                            stroke="rgba(59, 130, 246, 0.1)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                        />
                        <motion.path
                            d="M 400,450 Q 800,600 1200,450"
                            fill="none"
                            stroke="rgba(168, 85, 247, 0.1)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                    </svg>

                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32 relative">

                        {/* Round 1: Aptitude */}
                        <NexusNode
                            id="aptitude"
                            title="Aptitude Mastery"
                            icon={<Brain className="w-8 h-8 md:w-12 md:h-12" />}
                            status={selectedCompany ? 'open' : 'locked'}
                            color="blue"
                            delay={0.2}
                            onClick={() => handleStartRound('aptitude')}
                        />

                        {/* Vertical Separator for mobile */}
                        <div className="md:hidden w-1 h-12 bg-gray-800 rounded-full" />

                        {/* Round 2: Technical */}
                        <NexusNode
                            id="technical"
                            title="Technical Surge"
                            icon={<Code className="w-8 h-8 md:w-12 md:h-12" />}
                            status={selectedCompany ? 'open' : 'locked'}
                            color="purple"
                            delay={0.4}
                            onClick={() => handleStartRound('technical')}
                        />

                        <div className="md:hidden w-1 h-12 bg-gray-800 rounded-full" />

                        {/* Round 3: HR */}
                        <NexusNode
                            id="hr"
                            title="Cultural Fit"
                            icon={<Users className="w-8 h-8 md:w-12 md:h-12" />}
                            status={selectedCompany ? 'open' : 'locked'}
                            color="green"
                            delay={0.6}
                            onClick={() => handleStartRound('hr')}
                        />
                    </div>
                </div>

                {/* Company Modal Portal */}
                <AnimatePresence>
                    {showCompanyModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#02040a]/95 backdrop-blur-xl"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="w-full max-w-4xl bg-gray-900/50 border border-gray-800 rounded-[40px] p-8 md:p-12 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10" />

                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h2 className="text-4xl font-black text-white mb-2">Initialize Portal</h2>
                                        <p className="text-gray-400">Scan for target company data to unlock simulation rounds.</p>
                                    </div>
                                    {selectedCompany && (
                                        <button
                                            onClick={() => setShowCompanyModal(false)}
                                            className="p-3 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                                    {config?.companies?.map((company) => (
                                        <button
                                            key={company}
                                            onClick={() => handleCompanySelect(company)}
                                            className={`group p-6 rounded-[28px] border text-left transition-all relative overflow-hidden ${selectedCompany === company
                                                ? "bg-blue-600 border-blue-500 shadow-2xl shadow-blue-500/20"
                                                : "bg-black/40 border-gray-800 hover:border-gray-500 hover:bg-gray-800/40"
                                                }`}
                                        >
                                            <div className="relative z-10">
                                                <div className={`w-10 h-10 mb-4 rounded-xl flex items-center justify-center ${selectedCompany === company ? "bg-white/20" : "bg-gray-800"
                                                    }`}>
                                                    <Target className={`w-5 h-5 ${selectedCompany === company ? "text-white" : "text-gray-400"}`} />
                                                </div>
                                                <h4 className="font-bold text-lg mb-1">{company}</h4>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Linked</span>
                                                </div>
                                            </div>
                                            {selectedCompany === company && (
                                                <motion.div
                                                    layoutId="active-bg"
                                                    className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 -z-0"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {selectedCompany && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={() => setShowCompanyModal(false)}
                                        className="w-full py-5 bg-white text-black font-black text-xl rounded-[24px] hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        Enter Simulation <ArrowRight className="w-6 h-6" />
                                    </motion.button>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Guidelines */}
                <AnimatePresence>
                    {showGuidelines && activeRound && (
                        <AssessmentGuidelines
                            title={activeRound.charAt(0).toUpperCase() + activeRound.slice(1)}
                            duration={20}
                            onStart={proceedToAssessment}
                            onCancel={() => setShowGuidelines(false)}
                        />
                    )}
                </AnimatePresence>

            </div>
        </DashboardPage>
    );
};

const X = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

export default AssessmentLandingPage;
