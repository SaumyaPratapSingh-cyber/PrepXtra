"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Save, User, Globe, Github, Twitter, Linkedin, Briefcase, FileCode } from "lucide-react";

const profileSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    headline: z.string().optional(),
    bio: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    skills: z.string().optional(), // We'll handle comma-separated string for simplicity in UI
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: "",
            email: "",
            headline: "",
            bio: "",
            website: "",
            github: "",
            twitter: "",
            linkedin: "",
            skills: "",
        },
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("/api/user/profile");
                const data = res.data.data;
                form.reset({
                    fullName: data.fullName,
                    email: data.email,
                    headline: data.headline || "",
                    bio: data.bio || "",
                    website: data.website || "",
                    github: data.github || "",
                    twitter: data.twitter || "",
                    linkedin: data.linkedin || "",
                    skills: data.skills ? data.skills.join(", ") : "",
                });
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [form]);

    const onSubmit = async (data: ProfileFormValues) => {
        setIsSaving(true);
        setMessage(null);
        try {
            const formattedData = {
                ...data,
                skills: data.skills ? data.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
            };
            await axios.put("/api/user/profile", formattedData);
            setMessage({ type: 'success', text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to update profile. Please try again." });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
        >
            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {message.text}
                </div>
            )}

            {/* Basic Info Section */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-400">
                    <User className="w-5 h-5" /> Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Full Name</label>
                        <input
                            {...form.register("fullName")}
                            className="glass-input w-full"
                            placeholder="John Doe"
                        />
                        {form.formState.errors.fullName && (
                            <p className="text-red-400 text-xs">{form.formState.errors.fullName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Email</label>
                        <input
                            {...form.register("email")}
                            disabled
                            className="glass-input w-full opacity-50 cursor-not-allowed"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-400">Headline</label>
                        <input
                            {...form.register("headline")}
                            className="glass-input w-full"
                            placeholder="Software Engineer | Tech Enthusiast"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-400">Bio</label>
                        <textarea
                            {...form.register("bio")}
                            className="glass-input w-full h-32 resize-none"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>
                </div>
            </div>

            {/* Professional Links */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-400">
                    <Globe className="w-5 h-5" /> Professional Links
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Website</label>
                        <input
                            {...form.register("website")}
                            className="glass-input w-full"
                            placeholder="https://yourwebsite.com"
                        />
                        {form.formState.errors.website && (
                            <p className="text-red-400 text-xs">{form.formState.errors.website.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</label>
                        <input
                            {...form.register("github")}
                            className="glass-input w-full"
                            placeholder="https://github.com/username"
                        />
                        {form.formState.errors.github && (
                            <p className="text-red-400 text-xs">{form.formState.errors.github.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter</label>
                        <input
                            {...form.register("twitter")}
                            className="glass-input w-full"
                            placeholder="https://twitter.com/username"
                        />
                        {form.formState.errors.twitter && (
                            <p className="text-red-400 text-xs">{form.formState.errors.twitter.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</label>
                        <input
                            {...form.register("linkedin")}
                            className="glass-input w-full"
                            placeholder="https://linkedin.com/in/username"
                        />
                        {form.formState.errors.linkedin && (
                            <p className="text-red-400 text-xs">{form.formState.errors.linkedin.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-400">
                    <FileCode className="w-5 h-5" /> Skills
                </h2>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Skills (Comma separated)</label>
                    <input
                        {...form.register("skills")}
                        className="glass-input w-full"
                        placeholder="React, Next.js, TypeScript, Node.js"
                    />
                    <p className="text-xs text-slate-500">Separate each skill with a comma.</p>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>
        </motion.form>
    );
}
