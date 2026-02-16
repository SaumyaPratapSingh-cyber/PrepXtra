"use client";

import { useState, useEffect, useRef } from "react";
import {
    Code2, Map, Brain, BookOpen, Target, TrendingUp, Sparkles,
    Activity, Play, Download, Briefcase, MessageSquare,
    FileText, ChevronRight, CheckCircle2, Star, Globe, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { roadmaps } from "@/data/roadmaps";

export default function PersonalizedDashboardPage() {
    const router = useRouter();
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("analysis");
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = async () => {
        try {
            const res = await axios.get("/api/personalized-plan");
            if (res.data.success) {
                setPlan(res.data.plan);
            }
        } catch (error) {
            console.error("Failed to fetch plan", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <DashboardPage>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="relative">
                            <Sparkles className="h-12 w-12 text-blue-500 animate-pulse" />
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                        </div>
                        <p className="text-xl font-bold text-white tracking-tight">Assembling Your Career Strategy...</p>
                        <p className="text-slate-400 text-sm">Parsing resume assets and aligning with industry-standard benchmarks</p>
                    </div>
                </div>
            </DashboardPage>
        );
    }

    if (!plan) {
        return (
            <DashboardPage>
                <div className="flex items-center justify-center h-[60vh] text-center">
                    <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/10 max-w-lg backdrop-blur-sm">
                        <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Activity className="h-10 w-10 text-red-500" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-3 tracking-tighter">
                            Strategy Offline
                        </h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            We couldn't blueprint your path. This usually happens if the resume analysis was interrupted.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-4 rounded-2xl bg-white text-black font-black hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10"
                            >
                                <TrendingUp className="h-5 w-5" /> Retry Sync
                            </button>
                            <button
                                onClick={() => router.push("/dashboard/resume-track/upload")}
                                className="px-8 py-4 rounded-2xl bg-white/5 text-slate-300 font-bold hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                            >
                                Reset Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </DashboardPage>
        );
    }

    const isFrontendPath = plan?.selectedRoadmapId === 'frontend';
    const roadmapData = roadmaps[plan.selectedRoadmapId || 'fullstack'] || roadmaps['fullstack'];
    const rootNode = roadmapData.nodes[roadmapData.rootNodeId];

    const tabs = [
        { id: "analysis", label: "Analysis", icon: Activity },
        { id: "roadmap", label: "Master Roadmap", icon: Map },
        { id: "questions", label: "Interview Pack", icon: MessageSquare },
        ...(!isFrontendPath ? [{ id: "dsa", label: "DSA Practice", icon: Code2 }] : []),
    ];

    return (
        <DashboardPage>
            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    body { background: white !important; color: black !important; }
                    .dashboard-container { padding: 0 !important; margin: 0 !important; }
                    .print-content { 
                        display: block !important;
                        padding: 40px !important;
                    }
                    .text-slate-400, .text-slate-500 { color: #4b5563 !important; }
                    .bg-[#0a0a0a], .bg-white/5 { border: 1px solid #e5e7eb !important; background: transparent !important; }
                    .text-white { color: black !important; }
                    .border-white/5, .border-white/10 { border-color: #e5e7eb !important; }
                    .rounded-3xl, .rounded-2xl { border-radius: 8px !important; }
                }
                .print-only { display: none; }
            `}</style>

            <div className="space-y-8 pb-20 print-content" ref={printRef}>
                {/* Branding / Header */}
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="hidden print:block mb-4">
                            <h2 className="text-2xl font-black tracking-tighter">PREPXTRA <span className="text-blue-500">ANALYSIS</span></h2>
                            <div className="h-1 w-20 bg-blue-500 mt-1" />
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black border border-blue-500/20 mb-4 uppercase tracking-[0.2em]">
                            <Sparkles className="h-3 w-3" />
                            Personalized For {plan.targetCompany}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3">
                            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Blueprint</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
                            {plan.analysis?.gapAnalysis || "Your path has been optimized based on your unique resume signature and market requirements."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="no-print flex gap-3"
                    >
                        <button
                            onClick={handlePrint}
                            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all group flex items-center gap-2"
                        >
                            <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                            <span className="font-bold text-sm">Download PDF</span>
                        </button>
                        <button
                            onClick={() => router.push(`/dashboard/roadmap/${plan.selectedRoadmapId || 'fullstack'}`)}
                            className="p-4 rounded-2xl bg-blue-500 text-white font-black hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2"
                        >
                            <Map className="h-5 w-5" />
                            <span className="font-bold text-sm">Interactive Visual</span>
                        </button>
                    </motion.div>
                </header>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Navigation & Summary */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Analysis Sidebar Card */}
                        <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px]" />

                            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest text-[10px] opacity-50">Profile Analysis</h3>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-sm font-bold text-green-500 flex items-center gap-2 mb-3">
                                        <Star className="h-4 w-4" /> Top Strengths
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {plan.analysis?.strengths?.map((s: string, i: number) => (
                                            <span key={i} className="px-3 py-1 rounded-xl bg-green-500/10 text-green-400 text-[11px] font-bold border border-green-500/10">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-red-500 flex items-center gap-2 mb-3">
                                        <Target className="h-4 w-4" /> Gap Areas
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {plan.analysis?.weaknesses?.map((s: string, i: number) => (
                                            <span key={i} className="px-3 py-1 rounded-xl bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/10">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-4">
                                        <Briefcase className="h-4 w-4" /> Career Opportunities
                                    </h4>
                                    <div className="space-y-3">
                                        {plan.analysis?.careerOpportunities?.map((op: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-slate-300 group">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                                                {op}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Integrated Track Card */}
                        <div className="no-print p-6 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/20">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
                                    <Globe className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white">Target Track</h4>
                                    <p className="text-xs text-slate-400 capitalize">{roadmapData.title || 'Software Engineering'}</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                                We've deep-linked your analysis with our {roadmapData.title} roadmap for industry-standard alignment.
                            </p>
                            <button
                                onClick={() => router.push(`/dashboard/roadmap/${plan.selectedRoadmapId || 'fullstack'}`)}
                                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-all"
                            >
                                View Interactive Path <ChevronRight className="h-3 w-3" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Tabs */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Tab Switcher */}
                        <div className="no-print flex gap-2 p-1.5 rounded-[1.5rem] bg-[#0a0a0a] border border-white/5 self-start mb-2 overflow-x-auto max-w-full">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                            : "text-slate-500 hover:text-slate-300"
                                    )}
                                >
                                    <tab.icon className="h-3.5 w-3.5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'analysis' && (
                                <motion.div
                                    key="analysis-tab"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5">
                                        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                            <Shield className="h-6 w-6 text-blue-500" />
                                            Skills Breakdown
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {plan.analysis?.extractedSkills?.map((skill: string, i: number) => (
                                                <div key={i} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-sm font-medium hover:border-blue-500/30 transition-all">
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5">
                                        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-widest text-[10px] opacity-40">Strategic Recommendation</h3>
                                        <p className="text-slate-400 leading-relaxed italic text-lg">
                                            "{plan.analysis?.strategicRecommendation || `Based on your current trajectory and the ${plan.targetCompany} engineering standard, we recommend focusing on the specific patterns found in your Interview Pack, as this represents your biggest potential growth area.`}"
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'roadmap' && (
                                <motion.div
                                    key="roadmap-tab"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {/* Roadmap Overview */}
                                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-white/5 relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-black text-white mb-2">{roadmapData.title} Master Plan</h3>
                                            <p className="text-slate-400 mb-6">{roadmapData.description}</p>

                                            {rootNode?.content?.overview && (
                                                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                                                    <p className="text-sm text-slate-300 leading-relaxed">{rootNode.content.overview}</p>
                                                </div>
                                            )}

                                            {rootNode?.content?.keyConcepts && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {rootNode.content.keyConcepts.slice(0, 4).map((concept, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-xs text-slate-400">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                            {concept}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Day-wise list */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Step-by-Step Trajectory</h4>
                                        {plan.roadmap?.map((item: any, i: number) => (
                                            <div key={i} className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all flex gap-6 items-start">
                                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center font-black text-slate-500 border border-white/5">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/10">Day {item.day}</span>
                                                        <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{item.topic}</h4>
                                                    </div>
                                                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{item.description}</p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {item.resources?.map((res: any, j: number) => (
                                                            <a
                                                                key={j}
                                                                href={res.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/5 text-[11px] font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition-all border border-blue-500/10"
                                                            >
                                                                {res.type === 'video' ? <Play className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                                                                {res.title}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'questions' && (
                                <motion.div
                                    key="questions-tab"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid gap-6"
                                >
                                    <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-center">
                                        PrepXtra Curated Pack: Industry-Standard Interview Questions
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {plan.interviewQuestions?.map((q: any, i: number) => (
                                            <div key={i} className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/20 transition-all flex flex-col gap-4 group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">{q.category || 'Technical'}</span>
                                                            <span className="text-[10px] font-black text-slate-600 uppercase">Question {i + 1}</span>
                                                        </div>
                                                        <h4 className="text-xl font-bold text-white leading-tight mb-2">{q.question}</h4>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 mt-2">
                                                    <p className="text-sm text-slate-300 leading-relaxed font-light">{q.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'dsa' && (
                                <motion.div
                                    key="dsa-tab"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    {plan.curatedQuestions?.map((q: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/20 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className={cn(
                                                    "h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner",
                                                    q.difficulty === 'Hard' ? "bg-red-500/10 text-red-500" :
                                                        q.difficulty === 'Medium' ? "bg-amber-500/10 text-amber-500" :
                                                            "bg-emerald-500/10 text-emerald-500"
                                                )}>
                                                    {q.difficulty?.toUpperCase().substring(0, 3)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-lg tracking-tight">{q.title}</h4>
                                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{q.pattern} • {q.companyTag}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => router.push(`/dashboard/resume-track/ide?title=${encodeURIComponent(q.title)}&company=${encodeURIComponent(plan.targetCompany)}&pattern=${encodeURIComponent(q.pattern)}`)}
                                                className="px-6 py-3 rounded-xl bg-white text-black text-xs font-black shadow-xl shadow-white/5 hover:bg-slate-200 transition-all flex items-center gap-2"
                                            >
                                                <Play className="h-3.5 w-3.5 fill-current" /> SOLVE
                                            </button>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Print Footer */}
                <footer className="print-only text-center mt-20 pt-10 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Analysis generated by PrepXtra AI Engine. Confidential career blueprint.</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Success Guaranteed with PrepXtra</p>
                </footer>
            </div>
        </DashboardPage>
    );
}
