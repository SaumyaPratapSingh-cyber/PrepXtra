"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Dark mode style
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CheckCircle2, BookOpen, ExternalLink, Code2 } from "lucide-react";
import { motion } from "framer-motion";

interface CodeExample {
    language: string;
    code: string;
    title?: string;
    explanation?: string;
}

interface ContentViewerProps {
    content: string;
    resources?: { title: string; url: string; type: string }[];
    onComplete?: () => void;
    isCompleted?: boolean;
}

const ContentViewer = ({ content, resources, onComplete, isCompleted = false }: ContentViewerProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-4xl mx-auto"
        >
            {/* Markdown Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <div className="rounded-lg overflow-hidden my-4 border bg-zinc-950">
                                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400">
                                        <span className="flex items-center gap-1.5">
                                            <Code2 className="h-3.5 w-3.5" />
                                            {match[1].toUpperCase()}
                                        </span>
                                    </div>
                                    <SyntaxHighlighter
                                        style={dracula}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{ margin: 0, borderRadius: 0, background: 'transparent' }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary", className)} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2"><div className="h-6 w-1 bg-primary rounded-full"></div>{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-semibold mt-5 mb-2">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc list-outside ml-5 space-y-1 mb-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-outside ml-5 space-y-1 mb-4">{children}</ol>,
                        li: ({ children }) => <li className="pl-1 marker:text-primary">{children}</li>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary/50 pl-4 py-1 my-4 italic bg-muted/20 rounded-r-lg">{children}</blockquote>,
                        img: ({ src, alt, ...props }) => (
                            <div className="my-6 rounded-xl overflow-hidden border bg-muted/10">
                                <img src={src} alt={alt} className="w-full h-auto object-cover" {...props} />
                                {alt && <div className="p-2 text-center text-xs text-muted-foreground bg-muted/30">{alt}</div>}
                            </div>
                        ),
                        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">{children}</a>,
                        table: ({ children }) => <div className="overflow-x-auto my-6 rounded-lg border"><table className="w-full text-sm">{children}</table></div>,
                        thead: ({ children }) => <thead className="bg-muted/50 border-b">{children}</thead>,
                        th: ({ children }) => <th className="px-4 py-3 text-left font-medium">{children}</th>,
                        td: ({ children }) => <td className="px-4 py-3 border-b border-muted/50 last:border-0">{children}</td>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>



            {/* Completion Action */}
            <div className="mt-12 flex justify-center pb-8">
                <button
                    onClick={onComplete}
                    disabled={isCompleted}
                    className={cn(
                        "group relative px-8 py-3 rounded-full font-medium transition-all transform active:scale-95",
                        isCompleted
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default"
                            : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                    )}
                >
                    <span className="flex items-center gap-2">
                        {isCompleted ? (
                            <>
                                <CheckCircle2 className="h-5 w-5" />
                                Completed
                            </>
                        ) : (
                            <>
                                Mark as Complete
                                <CheckCircle2 className="h-5 w-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            </>
                        )}
                    </span>
                </button>
            </div>
        </motion.div>
    );
};

export default ContentViewer;
