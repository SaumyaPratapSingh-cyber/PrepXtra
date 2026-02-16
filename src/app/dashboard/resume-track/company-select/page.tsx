"use client";

import { useState, useEffect } from "react";
import { Search, Building2, TrendingUp, ArrowRight, Check, Filter, Layers, Briefcase, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default function CompanySelectionPage() {
    const router = useRouter();
    const [companies, setCompanies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTier, setSelectedTier] = useState("all");

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/companies");
            setCompanies(res.data.companies || []);
        } catch (error) {
            console.error("Failed to fetch companies", error);
            setCompanies(dummyCompanies);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectCompany = async (company: any) => {
        try {
            await axios.put("/api/user/profile", { targetCompany: company.name });
            router.push("/dashboard/resume-track/upload");
        } catch (error) {
            console.error("Failed to save company selection", error);
        }
    };

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTier = selectedTier === "all" || company.tier === selectedTier;
        return matchesSearch && matchesTier;
    });

    const tierColors = {
        FAANG: "from-orange-500 to-red-600",
        Unicorn: "from-purple-500 to-pink-600",
        Startup: "from-blue-500 to-cyan-600",
        Product: "from-green-500 to-emerald-600"
    };

    return (
        <DashboardPage>
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            Target <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Company</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl">
                            Select your destination. We'll tailor your path based on your resume and chosen company's interview patterns.
                        </p>
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col lg:flex-row gap-4"
                >
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for companies (e.g. Google, Atlassian...)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0a0a0a] border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all"
                        />
                    </div>

                    <div className="flex gap-2">
                        {["all", "FAANG", "Unicorn", "Startup"].map((tier) => (
                            <button
                                key={tier}
                                onClick={() => setSelectedTier(tier)}
                                className={cn(
                                    "px-6 py-4 rounded-2xl text-sm font-bold border transition-all whitespace-nowrap",
                                    selectedTier === tier
                                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        : "bg-[#0a0a0a] text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
                                )}
                            >
                                {tier.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-[240px] rounded-3xl bg-[#0a0a0a] border border-white/5 animate-pulse" />
                            ))
                        ) : filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company, index) => (
                                <motion.div
                                    key={company.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleSelectCompany(company)}
                                    className="group relative cursor-pointer"
                                >
                                    <div className="absolute inset-x-4 -bottom-2 h-12 bg-gradient-to-t from-black to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
                                        {/* Hover Background Accent */}
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500",
                                            tierColors[company.tier as keyof typeof tierColors] || "from-slate-500 to-slate-800"
                                        )} />

                                        <div className="flex items-start justify-between mb-8">
                                            <div className={cn(
                                                "h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500 bg-gradient-to-br",
                                                tierColors[company.tier as keyof typeof tierColors] || "from-slate-700 to-slate-900"
                                            )}>
                                                <Building2 className="h-8 w-8 text-white" />
                                            </div>

                                            <div className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/5 text-slate-400",
                                                company.tier === 'FAANG' && "text-orange-400 border-orange-500/20 bg-orange-500/10"
                                            )}>
                                                {company.tier}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                                            {company.name}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {company.interviewProcess.focusAreas.slice(0, 3).map((area: string, i: number) => (
                                                <span key={i} className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                                                    <div className="h-1 w-1 rounded-full bg-slate-700" />
                                                    {area}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Layers className="h-3 w-3" />
                                                {company.interviewProcess.rounds.length} Rounds
                                            </div>
                                            <div className="text-orange-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all flex items-center gap-1 font-bold text-sm">
                                                Select <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                    <Search className="h-10 w-10 text-slate-700" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No companies found</h3>
                                <p className="text-slate-500">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardPage>
    );
}

const dummyCompanies = [
    {
        name: "Google",
        tier: "FAANG",
        interviewProcess: {
            rounds: ["Phone Screen", "Technical", "System Design", "Behavioral"],
            focusAreas: ["Algorithms", "System Design", "Problem Solving"],
            commonTopics: ["Arrays", "Trees", "Graphs", "DP"]
        }
    },
    {
        name: "Amazon",
        tier: "FAANG",
        interviewProcess: {
            rounds: ["OA", "Technical", "Bar Raiser", "Behavioral"],
            focusAreas: ["Leadership Principles", "Coding", "System Design"],
            commonTopics: ["Arrays", "Strings", "Trees"]
        }
    },
    {
        name: "Microsoft",
        tier: "FAANG",
        interviewProcess: {
            rounds: ["Phone Screen", "Technical", "System Design"],
            focusAreas: ["Coding", "Design", "Collaboration"],
            commonTopics: ["Arrays", "DP", "Graphs"]
        }
    },
    {
        name: "Meta",
        tier: "FAANG",
        interviewProcess: {
            rounds: ["Phone Screen", "Technical", "System Design", "Behavioral"],
            focusAreas: ["Coding", "System Design", "Culture Fit"],
            commonTopics: ["Arrays", "Trees", "Graphs"]
        }
    },
    {
        name: "Netflix",
        tier: "FAANG",
        interviewProcess: {
            rounds: ["Technical", "System Design", "Culture"],
            focusAreas: ["Senior-level coding", "Architecture", "Culture"],
            commonTopics: ["System Design", "Scalability"]
        }
    },
    {
        name: "Stripe",
        tier: "Unicorn",
        interviewProcess: {
            rounds: ["Technical", "System Design", "Integration"],
            focusAreas: ["API Design", "Payments", "Scalability"],
            commonTopics: ["APIs", "Distributed Systems"]
        }
    }
];
