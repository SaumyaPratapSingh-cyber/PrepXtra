"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Loader2, Zap } from "lucide-react";

export default function NewsletterPage() {
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [preferences, setPreferences] = useState({
        roles: [] as string[],
        locations: [] as string[],
        experienceLevel: "Entry Level"
    });

    // Instant Search State
    const [instantFilters, setInstantFilters] = useState({
        jobType: "Internship",
        companyType: "Startup",
        domain: "Software Engineer"
    });
    const [targetEmail, setTargetEmail] = useState("");

    useEffect(() => {
    }, []);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const mockEmail = "user@example.com";
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: mockEmail,
                    consent: true,
                    preferences
                })
            });

            if (res.ok) {
                setSubscribed(true);
            } else {
                alert("Subscription failed.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleTriggerScrape = async () => {
        setLoading(true);
        try {
            if (!targetEmail) {
                alert("Please enter an email address to receive the jobs.");
                setLoading(false);
                return;
            }

            const res = await fetch('/api/admin/trigger-scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: targetEmail,
                    filters: {
                        roles: [instantFilters.domain],
                        locations: ["Remote", "India"],
                        ...instantFilters
                    }
                })
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message || "Operation failed.");
            }
        } catch (e) {
            console.error(e);
            alert('Scrape request failed. Please check network.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    Smart Job Alerts
                </h1>
                <p className="text-gray-400 text-lg">
                    Get automated, curated job listings delivered straight to your inbox.
                    We scrape top platforms so you don't have to.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Helper Card */}
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-indigo-400 mb-2">
                        <Bell className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">How it works</h2>
                    </div>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                            <span>We aggregate jobs from LinkedIn, Indeed, and more.</span>
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                            <span>Real-time filtering based on your skills.</span>
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                            <span>Daily/Weekly email digests (No spam).</span>
                        </li>
                    </ul>
                </div>

                {/* Preferences Form */}
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Preferred Roles</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-800 border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="e.g. Software Engineer, React Developer"
                            onChange={(e) => setPreferences({ ...preferences, roles: e.target.value.split(',').map(s => s.trim()) })}
                        />
                        <p className="text-xs text-gray-500">Separate with commas</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Preferred Locations</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-800 border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="e.g. Remote, Bangalore, New York"
                            onChange={(e) => setPreferences({ ...preferences, locations: e.target.value.split(',').map(s => s.trim()) })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleSubscribe}
                            disabled={loading || subscribed}
                            className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                        ${subscribed
                                    ? "bg-green-500/10 text-green-500 cursor-default"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> :
                                subscribed ? <><CheckCircle className="w-5 h-5" /> Subscribed</> : "Activate Alerts"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Demo Admin Controls / Instant Search */}
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 mt-8">
                <h3 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Instant Job Discovery
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-1 col-span-3">
                        <label className="text-xs text-gray-500">Target Email</label>
                        <input
                            type="email"
                            className="w-full bg-zinc-800 border-zinc-700 rounded-md text-sm text-white p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Enter your email to receive jobs (required)"
                            value={targetEmail}
                            onChange={(e) => setTargetEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">Target Profile</label>
                        <select
                            className="w-full bg-zinc-800 border-zinc-700 rounded-md text-sm text-white p-2"
                            value={instantFilters.domain}
                            onChange={(e) => setInstantFilters({ ...instantFilters, domain: e.target.value })}
                        >
                            <option>Software Engineer</option>
                            <option>Data Scientist</option>
                            <option>Frontend Developer</option>
                            <option>Backend Developer</option>
                            <option>Product Manager</option>
                            <option>UI/UX Designer</option>
                            <option>Marketing Intern</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">Type</label>
                        <select
                            className="w-full bg-zinc-800 border-zinc-700 rounded-md text-sm text-white p-2"
                            value={instantFilters.jobType}
                            onChange={(e) => setInstantFilters({ ...instantFilters, jobType: e.target.value })}
                        >
                            <option>Internship</option>
                            <option>Fresher</option>
                            <option>Junior Role</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">Company</label>
                        <select
                            className="w-full bg-zinc-800 border-zinc-700 rounded-md text-sm text-white p-2"
                            value={instantFilters.companyType}
                            onChange={(e) => setInstantFilters({ ...instantFilters, companyType: e.target.value })}
                        >
                            <option>Startup</option>
                            <option>MNC</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleTriggerScrape}
                        disabled={loading}
                        className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg text-sm font-medium shadow-lg transition-all flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Start Fast Scrape"}
                    </button>
                    <div className="text-xs text-gray-500 flex items-center">
                        * Searches top 5-10 Fresher/Intern roles instantly.
                    </div>
                </div>
            </div>
        </div>
    );
}
