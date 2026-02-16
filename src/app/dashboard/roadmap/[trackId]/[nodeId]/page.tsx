
"use client";

import { notFound, useRouter } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { use, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Code2, ExternalLink, CheckCircle2, Circle, ChevronRight, Play, FileText, GraduationCap, Lightbulb, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NodeDetailPage({ params }: { params: Promise<{ trackId: string; nodeId: string }> }) {
    const { trackId, nodeId } = use(params);
    const roadmap = roadmaps[trackId];
    if (!roadmap) notFound();

    const node = roadmap.nodes[nodeId];
    if (!node) notFound();

    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"overview" | "study" | "practice" | "resources" | "plan">("overview");
    const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(`roadmap-${trackId}-${nodeId}`);
                return saved ? JSON.parse(saved) : [];
            } catch { return []; }
        }
        return [];
    });

    const toggleTask = (task: string) => {
        setCompletedTasks(prev => {
            const next = prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task];
            if (typeof window !== "undefined") {
                localStorage.setItem(`roadmap-${trackId}-${nodeId}`, JSON.stringify(next));
            }
            return next;
        });
    };

    const childNodes = (node.children || []).map(id => roadmap.nodes[id]).filter(Boolean);
    const parentNode = node.parentId ? roadmap.nodes[node.parentId] : null;
    const content = node.content;
    const allTasks = (node.dayWisePlan || []).flatMap(d => d.tasks);
    const progress = allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0;

    const tabs = [
        { id: "overview" as const, label: "Overview", icon: BookOpen },
        { id: "study" as const, label: "Study Material", icon: GraduationCap },
        { id: "practice" as const, label: "Practice", icon: Code2 },
        { id: "resources" as const, label: "Resources", icon: ExternalLink },
        { id: "plan" as const, label: "Day Plan", icon: FileText },
    ];

    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => router.push(`/dashboard/roadmap/${trackId}`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 min-w-0">
                    {parentNode && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                            <Link href={`/dashboard/roadmap/${trackId}`} className="hover:text-slate-300 transition-colors">
                                {roadmap.title}
                            </Link>
                            {parentNode && (
                                <>
                                    <ChevronRight className="w-3 h-3" />
                                    <Link href={`/dashboard/roadmap/${trackId}/${parentNode.id}`} className="hover:text-slate-300 transition-colors">
                                        {parentNode.label}
                                    </Link>
                                </>
                            )}
                            <ChevronRight className="w-3 h-3" />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-white truncate">{node.label}</h1>
                </div>

                {/* Progress */}
                {allTasks.length > 0 && (
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{progress}%</span>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${activeTab === tab.id
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 overflow-auto"
            >
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-3">About {node.label}</h2>
                            <p className="text-slate-300 leading-relaxed">{node.description}</p>
                        </div>

                        {content?.overview && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Deep Dive</h3>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{content.overview}</p>
                            </div>
                        )}

                        {content?.keyConcepts && content.keyConcepts.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-amber-400" /> Key Concepts
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {content.keyConcepts.map((concept, i) => (
                                        <li key={i} className="flex items-start gap-2 text-slate-300 text-sm bg-white/[0.03] rounded-lg p-3 border border-white/[0.05]">
                                            <span className="text-indigo-400 font-bold text-xs mt-0.5">{i + 1}.</span>
                                            {concept}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Child topics */}
                        {childNodes.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Sub-topics</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {childNodes.map(child => (
                                        <Link
                                            key={child.id}
                                            href={`/dashboard/roadmap/${trackId}/${child.id}`}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/20 transition-all group"
                                        >
                                            <span className="text-sm text-white font-medium truncate flex-1">{child.label}</span>
                                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white/60 shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* STUDY MATERIAL TAB */}
                {activeTab === "study" && (
                    <div className="space-y-6">
                        {content?.overview ? (
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-3">{node.label} — Study Guide</h2>
                                <div className="text-slate-300 leading-relaxed whitespace-pre-line">{content.overview}</div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-3">{node.label} — Study Guide</h2>
                                <p className="text-slate-300 leading-relaxed">{node.description}</p>
                            </div>
                        )}

                        {content?.codeExamples && content.codeExamples.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Code2 className="w-4 h-4 text-cyan-400" /> Code Examples
                                </h3>
                                {content.codeExamples.map((example, i) => (
                                    <div key={i} className="mb-4 rounded-xl overflow-hidden border border-white/[0.08]">
                                        <div className="bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-400 border-b border-white/[0.06]">
                                            {example.title} — {example.language}
                                        </div>
                                        <pre className="p-4 text-sm text-slate-300 overflow-x-auto bg-black/30">
                                            <code>{example.code}</code>
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content?.bestPractices && content.bestPractices.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">✅ Best Practices</h3>
                                <ul className="space-y-2">
                                    {content.bestPractices.map((bp, i) => (
                                        <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                            {bp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {content?.commonMistakes && content.commonMistakes.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">⚠️ Common Mistakes</h3>
                                <ul className="space-y-2">
                                    {content.commonMistakes.map((cm, i) => (
                                        <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                            {cm}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {!content && (
                            <div className="text-center py-12 text-slate-500">
                                <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>Detailed study material is being curated for this topic.</p>
                                <p className="text-sm mt-1">Check out the Resources tab for external learning materials.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* PRACTICE TAB */}
                {activeTab === "practice" && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white mb-3">Practice Questions</h2>

                        {content?.practiceQuestions && content.practiceQuestions.length > 0 ? (
                            content.practiceQuestions.map((q, i) => (
                                <PracticeCard key={i} index={i + 1} question={q.question} hint={q.hint} difficulty={q.difficulty} />
                            ))
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <Code2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>Practice problems for this topic are coming soon.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* RESOURCES TAB */}
                {activeTab === "resources" && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white mb-3">Learning Resources</h2>

                        {node.resources && node.resources.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {node.resources.map((res, i) => {
                                    if (!res || !res.url) return null;
                                    const typeIcon = res.type === "video" ? Play : res.type === "course" ? GraduationCap : res.type === "documentation" ? BookOpen : FileText;
                                    const TypeIcon = typeIcon;
                                    const typeColor = res.type === "video" ? "text-red-400" : res.type === "course" ? "text-purple-400" : res.type === "documentation" ? "text-blue-400" : "text-green-400";

                                    return (
                                        <a
                                            key={i}
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/20 transition-all group"
                                        >
                                            <TypeIcon className={`w-5 h-5 ${typeColor} shrink-0`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{res.title || 'Resource Link'}</p>
                                                <p className="text-xs text-slate-500 capitalize">{res.type || 'Article'} {res.isFree === false ? "• Paid" : "• Free"}</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white/60 shrink-0" />
                                        </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <ExternalLink className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>Resources for this topic are being curated.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* DAY PLAN TAB */}
                {activeTab === "plan" && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white">Day-wise Learning Plan</h2>

                        {node.dayWisePlan && node.dayWisePlan.length > 0 ? (
                            node.dayWisePlan.map(day => (
                                <div key={day.day} className="rounded-xl border border-white/[0.08] overflow-hidden">
                                    <div className="bg-white/[0.04] px-4 py-3 border-b border-white/[0.06]">
                                        <h3 className="text-sm font-bold text-white">Day {day.day}: {day.title}</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">{day.description}</p>
                                    </div>
                                    <div className="p-3 space-y-1">
                                        {day.tasks.map((task, ti) => {
                                            const taskKey = `day${day.day}-${ti}`;
                                            const done = completedTasks.includes(taskKey);

                                            return (
                                                <button
                                                    key={ti}
                                                    onClick={() => toggleTask(taskKey)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm text-left transition-all ${done
                                                        ? "bg-green-500/10 text-green-300"
                                                        : "bg-white/[0.02] hover:bg-white/[0.05] text-slate-300"
                                                        }`}
                                                >
                                                    {done ? (
                                                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                                                    )}
                                                    <span className={done ? "line-through opacity-70" : ""}>{task}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>Day plan for this topic is being structured.</p>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function PracticeCard({ index, question, hint, difficulty }: { index: number; question: string; hint?: string; difficulty?: string }) {
    const [showHint, setShowHint] = useState(false);
    const diffColor = difficulty === "hard" ? "text-red-400 bg-red-400/10" : difficulty === "medium" ? "text-amber-400 bg-amber-400/10" : "text-green-400 bg-green-400/10";

    return (
        <div className="rounded-xl border border-white/[0.08] p-4 bg-white/[0.02]">
            <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 rounded-md px-2 py-1">Q{index}</span>
                <div className="flex-1">
                    <p className="text-sm text-white font-medium">{question}</p>
                    {difficulty && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${diffColor}`}>
                            {difficulty}
                        </span>
                    )}
                    {hint && (
                        <div className="mt-3">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                {showHint ? "Hide Hint" : "Show Hint"}
                            </button>
                            {showHint && (
                                <p className="text-xs text-slate-400 mt-1 p-2 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                                    💡 {hint}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
