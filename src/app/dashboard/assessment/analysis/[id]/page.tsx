
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import {
    CheckCircle,
    XCircle,
    ArrowLeft,
    Shield,
    Trophy,
    Download,
    AlertOctagon,
    Clock,
    Target,
    Building2
} from "lucide-react";
import { motion } from "framer-motion";

interface SectionMetric {
    score: number;
    total: number;
}

interface Result {
    _id: string;
    type: string;
    company?: string;
    category?: string;
    score: number;
    totalQuestions: number;
    accuracy: number;
    timeTaken: number;
    strictModeViolations: number;
    status?: string;
    sectionMetrics?: Record<string, SectionMetric>;
    answers: {
        questionId: {
            content: string;
            options: string[];
            correctAnswer: string;
            explanation: string;
            category: string;
        };
        userAnswer: string;
        isCorrect: boolean;
    }[];
    createdAt: string;
}

const AssessmentAnalysisPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get(`/api/assessment/result/${id}`);
                setResult(res.data);
            } catch (error) {
                console.error("Failed to fetch result", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchResult();
    }, [id]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    if (loading) return (
        <DashboardPage>
            <div className="h-screen bg-[#02040a] flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-12 h-12 rounded-full border-t-2 border-blue-500 animate-spin"
                />
            </div>
        </DashboardPage>
    );

    if (!result) return <DashboardPage><div className="text-white p-8">Missing Data Payload</div></DashboardPage>;

    const passed = result.accuracy >= 70 && result.status !== 'failed_breach';
    const isBreach = result.status === 'failed_breach';

    const handleDownload = () => {
        window.print();
    };

    return (
        <DashboardPage>
            <div className="min-h-screen bg-[#02040a] text-white p-6 md:p-12 font-sans relative overflow-hidden print:p-0 print:bg-white print:text-black">

                {/* Print Styles */}
                <style jsx global>{`
                    @media print {
                        .no-print { display: none !important; }
                        .print-only { display: block !important; }
                        @page { margin: 0; size: auto; }
                        body { background: white !important; -webkit-print-color-adjust: exact; }
                        .print-card { border: 2px solid #eee !important; box-shadow: none !important; break-inside: avoid; }
                    }
                    .print-only { display: none; }
                `}</style>

                {/* Header Actions */}
                <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 no-print">
                    <button
                        onClick={() => router.push('/dashboard/general-track/assessments')}
                        className="group flex items-center gap-2 text-gray-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Exit to Nexus
                    </button>
                    <div className="flex gap-4">
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
                        >
                            <Download className="w-3.5 h-3.5" /> Download Report
                        </button>
                    </div>
                </div>

                {/* Professional Report Header (Visible in UI and Print) */}
                <div className="max-w-7xl mx-auto mb-16 relative">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-10 print:border-black/10">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <Trophy className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                                        Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Hub</span>
                                    </h1>
                                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Industrial Benchmark Report</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-right print:text-left">
                            <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest block mb-2">Simulation For</span>
                            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 print:border-black/10 print:bg-gray-50">
                                <Building2 className="w-5 h-5 text-blue-500" />
                                <span className="text-xl font-black text-white print:text-black">{result.company || "General Simulation"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breach Alert */}
                {isBreach && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto mb-12 bg-red-600/10 border border-red-500/30 p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-red-500/10"
                    >
                        <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shrink-0">
                            <AlertOctagon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-red-500">Security Breach Detected</h3>
                            <p className="text-gray-400 font-medium">This session was terminated due to a proctoring violation (Unauthorized Tab Switch). Accuracy metrics are nullified.</p>
                        </div>
                        <div className="md:ml-auto">
                            <span className="px-4 py-2 bg-red-500/20 rounded-full text-red-500 font-black text-xs uppercase tracking-widest">Fail (Breach)</span>
                        </div>
                    </motion.div>
                )}

                {/* Infographic Dashboard */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Stats Card */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 print-card">
                        <div className={`p-10 rounded-[40px] border relative overflow-hidden flex flex-col justify-between h-[300px] ${passed ? "bg-emerald-600/5 border-emerald-500/20" : "bg-red-600/5 border-red-500/20"}`}>
                            <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 opacity-60">Global Accuracy</span>
                                <h2 className="text-7xl font-black mt-2 print:text-5xl">{result.accuracy.toFixed(1)}%</h2>
                            </div>
                            <div className="relative z-10 flex items-center gap-3">
                                {passed ? <CheckCircle className="text-emerald-500 w-5 h-5" /> : <XCircle className="text-red-500 w-5 h-5" />}
                                <span className="font-bold uppercase tracking-widest text-xs">{passed ? "Benchmark Met" : "Requires Re-calibration"}</span>
                            </div>
                            {/* Visual Chart Wave */}
                            <div className="absolute bottom-0 left-0 w-full h-24 opacity-20 flex items-end gap-1 px-4">
                                {[30, 45, 60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className={`flex-1 rounded-t-lg ${passed ? "bg-emerald-500" : "bg-red-500"}`} />
                                ))}
                            </div>
                        </div>

                        <div className="p-10 rounded-[40px] border border-white/5 bg-white/5 flex flex-col justify-between h-[300px] print-card">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 block">Efficiency</span>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        <span className="text-2xl font-black uppercase">{formatTime(result.timeTaken)}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 block">Questions</span>
                                    <div className="flex items-center gap-2">
                                        <Target className="w-5 h-5 text-purple-500" />
                                        <span className="text-2xl font-black uppercase">{result.totalQuestions} Hits</span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 block">Proctoring Audit</span>
                                    <div className="flex items-center gap-2">
                                        <Shield className={`w-5 h-5 ${result.strictModeViolations > 0 ? "text-yellow-500" : "text-emerald-500"}`} />
                                        <span className="text-2xl font-black uppercase">{result.strictModeViolations < 0 ? "Critical Breach" : `${result.strictModeViolations} Warnings`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Breakdown Sidebar */}
                    <div className="space-y-8 print-card">
                        <div className="bg-white/5 border border-white/5 p-10 rounded-[40px] h-full flex flex-col print:bg-gray-50 print:border-black/5">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-10 border-b border-white/5 pb-4 print:text-black print:border-black/10">Competency Matrix</h3>
                            <div className="space-y-10 flex-1">
                                {Object.entries(result.sectionMetrics || {}).map(([key, metric]: [string, SectionMetric]) => (
                                    <div key={key}>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">{key}</span>
                                            <span className="text-[10px] font-black">{Math.round((metric.score / metric.total) * 100)}%</span>
                                        </div>
                                        <div className="h-4 bg-black/40 rounded-full border border-white/5 overflow-hidden p-1 print:bg-white print:border-black/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(metric.score / metric.total) * 100}%` }}
                                                className={`h-full rounded-full ${passed ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20" : "bg-red-500"}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audit Trail - Grid of Answers */}
                <div className="max-w-7xl mx-auto mt-24">
                    <div className="flex items-center gap-6 mb-16 no-print">
                        <h2 className="text-3xl font-black uppercase tracking-tighter">Diagnostic Registry</h2>
                        <div className="h-px flex-1 bg-white/5"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {result.answers.map((item, idx) => (
                            <div key={idx} className={`p-6 rounded-[24px] border print-card break-inside-avoid ${item.isCorrect ? "bg-emerald-500/5 border-emerald-500/10" : "bg-red-500/5 border-red-500/10"}`}>
                                <div className="flex justify-between mb-4">
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-600">Entry #{idx + 1}</span>
                                    {item.isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                </div>
                                <p className="text-sm font-bold text-gray-300 mb-6 line-clamp-2 print:text-black">{item.questionId.content}</p>
                                <div className="grid grid-cols-2 gap-2 text-[10px] no-print">
                                    <div className="bg-black/40 p-2 rounded-lg">
                                        <span className="block text-gray-700 font-bold tracking-widest mb-1 uppercase">Input</span>
                                        <span className={item.isCorrect ? "text-emerald-400" : "text-red-400"}>{item.userAnswer || "NULL"}</span>
                                    </div>
                                    <div className="bg-black/40 p-2 rounded-lg">
                                        <span className="block text-gray-700 font-bold tracking-widest mb-1 uppercase">Truth</span>
                                        <span className="text-emerald-400">{item.questionId.correctAnswer}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Print Only Footer */}
                <div className="print-only mt-20 text-center border-t border-black/10 pt-10">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Digital Authentication Signature</p>
                    <p className="text-[10px] text-gray-300 mt-2 font-mono">{new Date().toISOString()} | NODE_ID: {result._id}</p>
                </div>
            </div>
        </DashboardPage>
    );
};

export default AssessmentAnalysisPage;
