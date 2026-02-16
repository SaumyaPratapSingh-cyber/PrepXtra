
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, ShieldAlert, Monitor, Clock } from "lucide-react";

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
                        <ShieldAlert className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Strict Mode Assessment
                    </h2>
                    <p className="text-gray-400">
                        You are about to start: <span className="text-blue-400 font-semibold">{title}</span>
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <Monitor className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-semibold mb-1">Fullscreen Mode</h4>
                            <p className="text-sm text-gray-400">
                                The assessment will launch in fullscreen. Exiting fullscreen may be recorded as a violation.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-semibold mb-1">Tab Switching Prohibited</h4>
                            <p className="text-sm text-gray-400">
                                Switching tabs or minimizing the browser window is strictly prohibited and will be flagged.
                            </p>
                        </div>
                    </div>

                    {duration > 0 && (
                        <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                            <Clock className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-semibold mb-1">Timed Assessment</h4>
                                <p className="text-sm text-gray-400">
                                    You have <strong>{duration} minutes</strong> to complete this assessment.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
                    <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-600 bg-gray-800'}`}>
                        {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-300 select-none">
                        I understand the rules and agree to take this assessment honestly.
                    </span>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onStart}
                        disabled={!isChecked}
                        className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${isChecked
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-blue-500/25"
                                : "bg-gray-800 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Start Assessment
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
