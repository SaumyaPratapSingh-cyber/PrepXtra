
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { RoadmapNode as NodeType } from "@/data/roadmaps/types";
import { cn } from "@/lib/utils";

interface RoadmapNodeProps {
    node: NodeType;
    status: 'locked' | 'pending' | 'in-progress' | 'completed';
    onClick: (nodeId: string) => void;
    isSelected?: boolean;
}

export function RoadmapNode({ node, status, onClick, isSelected }: RoadmapNodeProps) {
    const statusColors = {
        locked: "bg-slate-800 border-slate-700 text-slate-500",
        pending: "bg-slate-800 border-slate-600 text-slate-300 hover:border-orange-500/50",
        "in-progress": "bg-orange-900/20 border-orange-500 text-orange-400",
        completed: "bg-green-900/20 border-green-500 text-green-400",
    };

    const Icon = status === 'completed' ? CheckCircle2 : (status === 'locked' ? Lock : Circle);

    return (
        <motion.div
            layoutId={`node-${node.id}`}
            onClick={() => status !== 'locked' && onClick(node.id)}
            className={cn(
                "relative rounded-xl border-2 p-4 cursor-pointer transition-all w-48 min-w-[12rem] flex flex-col items-center justify-center gap-2 text-center select-none shadow-lg",
                statusColors[status],
                isSelected && "ring-2 ring-white ring-offset-2 ring-offset-black",
                status === 'locked' && "opacity-50 cursor-not-allowed"
            )}
            whileHover={status !== 'locked' ? { scale: 1.05 } : {}}
            whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
        >
            <Icon className={cn("w-6 h-6", status === 'completed' ? "text-green-500" : (status === 'in-progress' ? "text-orange-500" : "text-slate-500"))} />
            <span className="font-bold text-sm tracking-tight">{node.label}</span>

            {/* Decorative pulse for in-progress */}
            {status === 'in-progress' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
            )}
        </motion.div>
    );
}
