"use client";

import React from 'react';
import { ExperienceItem } from '../types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ExperienceStepProps {
    data: ExperienceItem[];
    updateRaw: (data: ExperienceItem[]) => void;
}

export default function ExperienceStep({ data, updateRaw }: ExperienceStepProps) {
    const addExperience = () => {
        updateRaw([
            ...data,
            {
                id: uuidv4(),
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                location: '',
                description: []
            }
        ]);
    };

    const removeExperience = (id: string) => {
        updateRaw(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: keyof ExperienceItem, value: any) => {
        updateRaw(data.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleDescriptionChange = (id: string, value: string) => {
        // Split by newline to get bullet points
        const lines = value.split('\n');
        handleChange(id, 'description', lines);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Experience</h3>
                <Button onClick={addExperience} variant="outline" size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Experience
                </Button>
            </div>

            {data.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                    No experience added yet. Click "Add Experience" to start.
                </div>
            )}

            {data.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-4 bg-card/50 relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeExperience(item.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input
                                value={item.company}
                                onChange={(e) => handleChange(item.id, 'company', e.target.value)}
                                placeholder="Google"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <Input
                                value={item.role}
                                onChange={(e) => handleChange(item.id, 'role', e.target.value)}
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input
                                value={item.startDate}
                                onChange={(e) => handleChange(item.id, 'startDate', e.target.value)}
                                placeholder="Jan 2022"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                                value={item.endDate}
                                onChange={(e) => handleChange(item.id, 'endDate', e.target.value)}
                                placeholder="Present"
                            />
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-1">
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                value={item.location}
                                onChange={(e) => handleChange(item.id, 'location', e.target.value)}
                                placeholder="Mountain View, CA"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium">Description (One bullet point per line)</label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                value={item.description.join('\n')}
                                onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                                placeholder="- Developed new features...&#10;- Improved performance by 50%..."
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
