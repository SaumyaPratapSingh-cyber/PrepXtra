"use client";

import React from 'react';
import { ResumeData } from '../types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsStepProps {
    data: {
        certifications: string[];
        achievements: string[];
    };
    updateRaw: (key: 'certifications' | 'achievements', value: string[]) => void;
}

export default function CertificationsStep({ data, updateRaw }: CertificationsStepProps) {

    const handleArrayChange = (key: 'certifications' | 'achievements', value: string) => {
        // Split by newline for bullet points style input
        const array = value.split('\n');
        updateRaw(key, array);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Certifications</h3>
                </div>
                <p className="text-xs text-muted-foreground">List your certifications, one per line.</p>
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    value={data.certifications.join('\n')}
                    onChange={(e) => handleArrayChange('certifications', e.target.value)}
                    placeholder="AWS Certified Solutions Architect&#10;Google Data Analytics Certificate"
                />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Achievements</h3>
                </div>
                <p className="text-xs text-muted-foreground">List your key achievements, one per line.</p>
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    value={data.achievements.join('\n')}
                    onChange={(e) => handleArrayChange('achievements', e.target.value)}
                    placeholder="Dean's List 2023&#10;Winner of Global Hackathon 2024"
                />
            </div>

        </div>
    );
}
