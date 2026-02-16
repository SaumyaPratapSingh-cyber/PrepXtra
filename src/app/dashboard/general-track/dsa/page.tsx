"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Code2, TrendingUp, Clock, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default function DSAProblemsPage() {
    const router = useRouter();
    const [problems, setProblems] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProblems();
    }, [selectedDifficulty, selectedCategory]);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (selectedDifficulty !== "all") params.append("difficulty", selectedDifficulty);
            if (selectedCategory !== "all") params.append("category", selectedCategory);

            const res = await axios.get(`/api/problems?${params.toString()}`);
            setProblems(res.data.problems || []);
        } catch (error) {
            console.error("Failed to fetch problems", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProblems = problems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const difficultyColors = {
        easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        hard: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    };

    return (
        <DashboardPage>
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                            DSA <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Problems</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl">
                            Master data structures and algorithms with our curated problem set.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium">
                            {problems.length} Problems Available
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="grid md:grid-cols-12 gap-4">
                    {/* Search */}
                    <div className="md:col-span-6 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>

                    {/* Filters */}
                    <div className="md:col-span-3 relative group">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500/50 transition-all font-medium cursor-pointer hover:bg-white/10"
                        >
                            <option value="all" className="bg-slate-900">All Difficulties</option>
                            <option value="easy" className="bg-slate-900 text-emerald-400">Easy</option>
                            <option value="medium" className="bg-slate-900 text-amber-400">Medium</option>
                            <option value="hard" className="bg-slate-900 text-rose-400">Hard</option>
                        </select>
                    </div>

                    <div className="md:col-span-3 relative">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500/50 transition-all font-medium cursor-pointer hover:bg-white/10"
                        >
                            <option value="all" className="bg-slate-900">All Categories</option>
                            <option value="arrays" className="bg-slate-900">Arrays</option>
                            <option value="strings" className="bg-slate-900">Strings</option>
                            <option value="linked-list" className="bg-slate-900">Linked List</option>
                            <option value="trees" className="bg-slate-900">Trees</option>
                            <option value="graphs" className="bg-slate-900">Graphs</option>
                            <option value="dp" className="bg-slate-900">Dynamic Programming</option>
                        </select>
                    </div>
                </div>

                {/* Problems List */}
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredProblems.map((problem, index) => (
                            <motion.div
                                key={problem.slug || index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => router.push(`/dashboard/general-track/dsa/${problem.slug}`)}
                                className="group p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-orange-500/30 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-900/10 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                                                {problem.title}
                                            </h3>
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                                                difficultyColors[problem.difficulty as keyof typeof difficultyColors]
                                            )}>
                                                {problem.difficulty}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5">
                                                <Code2 className="h-3.5 w-3.5" />
                                                {problem.category}
                                            </div>
                                            {problem.companies && problem.companies.length > 0 && (
                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5">
                                                    <TrendingUp className="h-3.5 w-3.5" />
                                                    {problem.companies.slice(0, 3).join(", ")}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:-rotate-45">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && filteredProblems.length === 0 && (
                    <div className="text-center py-20 rounded-2xl bg-white/5 border border-white/10 border-dashed">
                        <div className="inline-flex h-16 w-16 rounded-full bg-white/5 items-center justify-center mb-4">
                            <Code2 className="h-8 w-8 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No problems found</h3>
                        <p className="text-slate-400">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </DashboardPage>
    );
}
