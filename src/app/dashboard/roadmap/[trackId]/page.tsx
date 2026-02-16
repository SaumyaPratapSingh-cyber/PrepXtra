
"use client";

import { notFound } from "next/navigation";
import { roadmaps } from "@/data/roadmaps";
import { RoadmapCanvas } from "@/components/roadmap/RoadmapCanvas";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RoadmapTrackPage({ params }: { params: Promise<{ trackId: string }> }) {
    const { trackId } = use(params);
    const roadmap = roadmaps[trackId];

    if (!roadmap) {
        notFound();
    }

    return (
        <div className="h-[calc(100vh-5rem)] flex flex-col">
            <div className="flex items-center gap-4 mb-4 shrink-0">
                <Link
                    href="/dashboard/roadmap"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">{roadmap.title}</h1>
                    <p className="text-slate-400 text-sm">{roadmap.description}</p>
                </div>
                <div className="ml-auto text-xs text-slate-500 bg-white/5 rounded-lg px-3 py-1.5">
                    {Object.keys(roadmap.nodes).length} topics
                </div>
            </div>

            <div className="flex-1 rounded-2xl border border-white/[0.08] overflow-hidden relative min-h-0">
                <RoadmapCanvas track={roadmap} />
            </div>
        </div>
    );
}
