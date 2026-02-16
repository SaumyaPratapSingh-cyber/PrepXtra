
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { RoadmapTrack, RoadmapNode } from "@/data/roadmaps/types";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize, MousePointer2, Move, RefreshCw } from "lucide-react";

const BRANCH_COLORS = [
    "#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6",
    "#06b6d4", "#ec4899", "#14b8a6", "#f97316", "#84cc16",
    "#e879f9", "#fb923c", "#22d3ee", "#a3e635",
];

const ROOT_COLOR = "#6366f1";

interface LayoutNode {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    depth: number;
    branch: number;
    label: string;
}

interface Edge {
    from: string;
    to: string;
}

function computeSubtreeWidths(
    nodeId: string,
    nodes: Record<string, RoadmapNode>,
    visited: Set<string>,
    nodeW: number,
    gapX: number
): number {
    if (visited.has(nodeId) || !nodes[nodeId]) return nodeW;
    visited.add(nodeId);
    const children = nodes[nodeId]?.children || [];
    if (children.length === 0) return nodeW;
    let total = 0;
    children.forEach((cid, i) => {
        if (i > 0) total += gapX;
        total += computeSubtreeWidths(cid, nodes, new Set([...visited]), nodeW, gapX);
    });
    return Math.max(total, nodeW);
}

function layoutTreeNodes(
    track: RoadmapTrack,
    nodeW: number,
    nodeH: number,
    gapX: number,
    gapY: number
): { layoutNodes: LayoutNode[]; edges: Edge[]; totalW: number; totalH: number } {
    const layoutNodes: LayoutNode[] = [];
    const edges: Edge[] = [];
    const visited = new Set<string>();

    function place(nodeId: string, x: number, y: number, branch: number, depth: number) {
        if (visited.has(nodeId) || !track.nodes[nodeId]) return;
        visited.add(nodeId);
        const node = track.nodes[nodeId];
        const children = node.children || [];

        const subtreeW = computeSubtreeWidths(nodeId, track.nodes, new Set([...visited, nodeId].filter((_, i) => i < 1)), nodeW, gapX);
        const nodeX = x + (subtreeW - nodeW) / 2;

        layoutNodes.push({ id: nodeId, x: nodeX, y, w: nodeW, h: nodeH, depth, branch, label: node.label });

        let childX = x;
        children.forEach((cid, i) => {
            if (!track.nodes[cid]) return;
            const childBranch = depth === 0 ? i : branch;
            edges.push({ from: nodeId, to: cid });
            const childSubW = computeSubtreeWidths(cid, track.nodes, new Set(), nodeW, gapX);
            place(cid, childX, y + nodeH + gapY, childBranch, depth + 1);
            childX += childSubW + gapX;
        });
    }

    const reachable = new Set<string>();
    function findReachable(id: string) {
        if (reachable.has(id) || !track.nodes[id]) return;
        reachable.add(id);
        (track.nodes[id].children || []).forEach(findReachable);
    }
    findReachable(track.rootNodeId);

    const disconnected = Object.keys(track.nodes).filter(id => !reachable.has(id) && !track.nodes[id].parentId);

    place(track.rootNodeId, 0, 0, 0, 0);

    let maxY = Math.max(...layoutNodes.map(n => n.y + n.h), 0);
    disconnected.forEach((id, i) => {
        const startY = maxY + gapY * 2;
        place(id, 0, startY, layoutNodes.length + i, 0);
        maxY = Math.max(...layoutNodes.map(n => n.y + n.h), maxY);
    });

    const totalW = Math.max(...layoutNodes.map(n => n.x + n.w), nodeW);
    const totalH = Math.max(...layoutNodes.map(n => n.y + n.h), nodeH);

    return { layoutNodes, edges, totalW, totalH };
}

function getNodeShape(depth: number, childCount: number): string {
    if (depth === 0) return "rounded-2xl";
    if (depth === 1) return "rounded-xl";
    if (childCount > 0) return "rounded-lg";
    return "rounded-full";
}

export function RoadmapCanvas({ track }: { track: RoadmapTrack }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewState, setViewState] = useState({ scale: 1, x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const router = useRouter();

    const NODE_W = 150;
    const NODE_H = 42;
    const GAP_X = 20;
    const GAP_Y = 55;

    const layout = useMemo(
        () => layoutTreeNodes(track, NODE_W, NODE_H, GAP_X, GAP_Y),
        [track]
    );

    const nodeMap = useMemo(() => {
        const m = new Map<string, LayoutNode>();
        layout.layoutNodes.forEach(n => m.set(n.id, n));
        return m;
    }, [layout]);

    const fitToScreen = useCallback(() => {
        if (!containerRef.current) return;
        const { clientWidth: cw, clientHeight: ch } = containerRef.current;
        const pad = 80;
        const sx = (cw - pad) / layout.totalW;
        const sy = (ch - pad) / layout.totalH;
        const s = Math.min(sx, sy, 1.2);

        const scaledW = layout.totalW * s;
        const scaledH = layout.totalH * s;

        setViewState({
            scale: s,
            x: (cw - scaledW) / 2,
            y: (ch - scaledH) / 2,
        });
    }, [layout]);

    useEffect(() => {
        fitToScreen();
    }, [fitToScreen]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const nextScale = Math.max(0.2, Math.min(3, viewState.scale * zoomFactor));

        const actualFactor = nextScale / viewState.scale;

        setViewState(prev => ({
            scale: nextScale,
            x: mouseX - (mouseX - prev.x) * actualFactor,
            y: mouseY - (mouseY - prev.y) * actualFactor,
        }));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        setDragStart({ x: e.clientX - viewState.x, y: e.clientY - viewState.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setViewState(prev => ({
            ...prev,
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/dashboard/roadmap/${track.id}/${nodeId}`);
    };

    const zoom = (factor: number) => {
        if (!containerRef.current) return;
        const { clientWidth: cw, clientHeight: ch } = containerRef.current;
        const centerX = cw / 2;
        const centerY = ch / 2;

        const nextScale = Math.max(0.2, Math.min(3, viewState.scale * factor));
        const actualFactor = nextScale / viewState.scale;

        setViewState(prev => ({
            scale: nextScale,
            x: centerX - (centerX - prev.x) * actualFactor,
            y: centerY - (centerY - prev.y) * actualFactor,
        }));
    };

    return (
        <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`w-full h-full overflow-hidden relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
                background: "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%), linear-gradient(to bottom, #0a0a1a, #0f172a)",
            }}
        >
            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: `${40 * viewState.scale}px ${40 * viewState.scale}px`,
                    backgroundPosition: `${viewState.x}px ${viewState.y}px`,
                }}
            />

            {/* Transform Layer */}
            <div
                style={{
                    transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
                    transformOrigin: "0 0",
                    position: "absolute",
                    width: layout.totalW,
                    height: layout.totalH,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
            >
                {/* SVG Connections */}
                <svg
                    className="absolute inset-0 pointer-events-none"
                    width={layout.totalW}
                    height={layout.totalH}
                    style={{ overflow: "visible" }}
                >
                    {layout.edges.map(({ from, to }) => {
                        const f = nodeMap.get(from);
                        const t = nodeMap.get(to);
                        if (!f || !t) return null;

                        const x1 = f.x + f.w / 2;
                        const y1 = f.y + f.h;
                        const x2 = t.x + t.w / 2;
                        const y2 = t.y;
                        const midY = (y1 + y2) / 2;
                        const colorIdx = f.branch % BRANCH_COLORS.length;

                        return (
                            <g key={`${from}-${to}`}>
                                <path
                                    d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                                    fill="none"
                                    stroke={BRANCH_COLORS[colorIdx]}
                                    strokeWidth={2}
                                    strokeOpacity={0.5}
                                />
                                <path
                                    d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                                    fill="none"
                                    stroke={BRANCH_COLORS[colorIdx]}
                                    strokeWidth={6}
                                    strokeOpacity={0.08}
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* Nodes */}
                {layout.layoutNodes.map((n, idx) => {
                    const color = n.depth === 0 ? ROOT_COLOR : BRANCH_COLORS[n.branch % BRANCH_COLORS.length];
                    const childCount = track.nodes[n.id]?.children?.length || 0;
                    const shape = getNodeShape(n.depth, childCount);
                    const isLeaf = childCount === 0 && n.depth > 0;

                    // Level of detail: adjust font size and hide text if too small
                    const showText = viewState.scale > 0.4;
                    const fontSize = n.depth === 0 ? "text-sm font-bold" : n.depth <= 2 ? "text-xs font-semibold" : "text-[10px] font-medium";

                    return (
                        <motion.button
                            key={n.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={(e) => handleNodeClick(n.id, e)}
                            className={`absolute flex items-center justify-center text-white ${fontSize} cursor-pointer transition-all duration-200 hover:z-20 group ${shape}`}
                            style={{
                                left: n.x,
                                top: n.y,
                                width: n.w,
                                height: n.h,
                                background: isLeaf
                                    ? `linear-gradient(135deg, ${color}33, ${color}55)`
                                    : `linear-gradient(135deg, ${color}, ${color}cc)`,
                                border: `2px solid ${color}${isLeaf ? '77' : ''}`,
                                boxShadow: `0 0 ${15 / viewState.scale}px ${color}33`,
                            }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle, ${color}44 0%, transparent 70%)`,
                                    borderRadius: "inherit",
                                }}
                            />
                            {showText && (
                                <span className="truncate px-2 relative z-10 drop-shadow-sm">
                                    {n.label}
                                </span>
                            )}

                            {n.depth === 0 && (
                                <div
                                    className="absolute inset-0 animate-pulse opacity-20 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
                                        borderRadius: "inherit",
                                    }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Controls Overlay */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
                <div className="flex flex-col bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    <button
                        onClick={() => zoom(1.2)}
                        className="p-3 hover:bg-white/10 transition-colors border-b border-white/5 active:scale-95"
                        title="Zoom In"
                    >
                        <ZoomIn size={18} className="text-white/70" />
                    </button>
                    <button
                        onClick={() => zoom(0.8)}
                        className="p-3 hover:bg-white/10 transition-colors border-b border-white/5 active:scale-95"
                        title="Zoom Out"
                    >
                        <ZoomOut size={18} className="text-white/70" />
                    </button>
                    <button
                        onClick={fitToScreen}
                        className="p-3 hover:bg-white/10 transition-colors active:scale-95"
                        title="Fit to Screen"
                    >
                        <Maximize size={18} className="text-white/70" />
                    </button>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl p-2 px-3 shadow-2xl">
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Navigation</div>
                    <div className="flex items-center gap-3 text-white/50">
                        <div className="flex items-center gap-1">
                            <MousePointer2 size={12} />
                            <span className="text-[10px]">Scroll to Zoom</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Move size={12} />
                            <span className="text-[10px]">Drag to Pan</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 flex items-center gap-6 text-xs text-white/40 bg-slate-900/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                    Root
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    Topics
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full border-2 border-emerald-500/60" />
                    Steps
                </span>
                <div className="w-[1px] h-3 bg-white/10 mx-1" />
                <span className="text-white/20">Zoom <b>{(viewState.scale * 100).toFixed(0)}%</b></span>
            </div>
        </div>
    );
}
