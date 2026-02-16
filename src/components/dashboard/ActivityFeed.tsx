import { CheckCircle2, Clock, PlayCircle, Trophy, Zap, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityItem {
    id: string;
    type: "completion" | "started" | "achievement" | "social";
    title: string;
    timestamp: string;
    points?: number;
    color: string;
}

const mockActivity: ActivityItem[] = [
    { id: "1", type: "completion", title: "Mastered 'Backtracking' patterns", timestamp: "2h ago", points: 50, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    { id: "2", type: "started", title: "Dived into 'System Design' fundamentals", timestamp: "5h ago", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    { id: "3", type: "achievement", title: "Earned 'Data structures God' rank", timestamp: "1d ago", points: 500, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    { id: "4", type: "social", title: "Reviewed teammate's DP solution", timestamp: "1d ago", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    { id: "5", type: "completion", title: "Solved 'Merge K Sorted Lists'", timestamp: "2d ago", points: 30, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
];

const icons = {
    completion: CheckCircle2,
    started: PlayCircle,
    achievement: Trophy,
    social: MessageSquare
};

export function ActivityFeed() {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Clock className="h-32 w-32 text-orange-500" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500 fill-orange-500" />
                    Feed
                </h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-lg">Live</span>
            </div>

            <div className="space-y-8 relative z-10">
                {mockActivity.map((item, index) => {
                    const Icon = icons[item.type];
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 relative group"
                        >
                            {index !== mockActivity.length - 1 && (
                                <div className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-gradient-to-b from-white/5 to-transparent" />
                            )}

                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center border-2 shrink-0 z-10 transition-all duration-500 group-hover:scale-110",
                                item.color
                            )}>
                                <Icon className="h-4 w-4" />
                            </div>

                            <div className="flex-1">
                                <p className="text-xs text-white font-bold leading-tight group-hover:text-orange-400 transition-colors">{item.title}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                    <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{item.timestamp}</span>
                                    {item.points && (
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] font-black text-orange-500">+{item.points}</span>
                                            <span className="text-[8px] font-black text-slate-700 uppercase">XP</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
            >
                View Analytics Matrix
            </motion.button>
        </div>
    );
}
