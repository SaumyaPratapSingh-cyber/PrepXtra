
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ShieldAlert, Monitor, Clock, X, Terminal } from "lucide-react";

interface AssessmentGuidelinesProps {
    onStart: () => void;
    onCancel: () => void;
    title: string;
    duration?: number; // in minutes
}

export const AssessmentGuidelines: React.FC<AssessmentGuidelinesProps> = ({
    onStart,
    onCancel,
    title,
    duration = 0,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-gray-950 border border-gray-800 rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gray-900/50 p-8 border-b border-gray-800 flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
                        <Terminal className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-black text-white mb-2">Assessment Guidelines</h2>
                        <p className="text-gray-400 text-lg">
                            You are about to begin <span className="text-white font-bold">{title}</span>. Please review the strict mode rules.
                        </p>
                    </div>
                    <button onClick={onCancel} className="text-gray-500 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Rules */}
                <div className="p-8 space-y-6 bg-black/20">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                            <Monitor className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Strict Fullscreen Enforcement</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                The assessment will automatically enter fullscreen. Exiting fullscreen at any point will be recorded as a violation and may lead to disqualification.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Anti-Cheating Mechanisms</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Tab switching, window resizing, and background applications are monitored. Multiple violations will auto-submit the test.
                            </p>
                        </div>
                    </div>

                    {duration > 0 && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                                <Clock className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Timed Environment</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    This round is timed for <strong>{duration} minutes</strong>. The test will auto-submit when the timer reaches zero.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-8 border-t border-gray-800 bg-gray-900/30 flex flex-col md:flex-row items-center gap-6">
                    <button
                        onClick={() => setIsChecked(!isChecked)}
                        className="flex items-center gap-3 group cursor-pointer mr-auto"
                    >
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isChecked ? "bg-blue-600 border-blue-600" : "bg-gray-800 border-gray-600 group-hover:border-gray-500"
                            }`}>
                            {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                            I accept the rules and regulations.
                        </span>
                    </button>

                    <div className="flex w-full md:w-auto gap-4">
                        <button
                            onClick={onCancel}
                            className="flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onStart}
                            disabled={!isChecked}
                            className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${isChecked
                                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20 hover:scale-105"
                                    : "bg-gray-800 text-gray-600 cursor-not-allowed"
                                }`}
                        >
                            Start Round
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
