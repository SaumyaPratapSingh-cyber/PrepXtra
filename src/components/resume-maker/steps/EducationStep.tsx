"use client";

import React from 'react';
import { EducationItem } from '../types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface EducationStepProps {
    data: EducationItem[];
    updateRaw: (data: EducationItem[]) => void;
}

export default function EducationStep({ data, updateRaw }: EducationStepProps) {
    const addEducation = () => {
        updateRaw([
            ...data,
            {
                id: uuidv4(),
                institution: '',
                degree: '',
                startDate: '',
                endDate: '',
                gpa: '',
                location: ''
            }
        ]);
    };

    const removeEducation = (id: string) => {
        updateRaw(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: keyof EducationItem, value: string) => {
        updateRaw(data.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Education</h3>
                <Button onClick={addEducation} variant="outline" size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Education
                </Button>
            </div>

            {data.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                    No education added yet. Click "Add Education" to start.
                </div>
            )}

            {data.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-4 bg-card/50 relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeEducation(item.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Institution</label>
                            <Input
                                value={item.institution}
                                onChange={(e) => handleChange(item.id, 'institution', e.target.value)}
                                placeholder="University of Technology"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Degree</label>
                            <Input
                                value={item.degree}
                                onChange={(e) => handleChange(item.id, 'degree', e.target.value)}
                                placeholder="Bachelor of Science in Computer Science"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input
                                value={item.startDate}
                                onChange={(e) => handleChange(item.id, 'startDate', e.target.value)}
                                placeholder="Aug 2020"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <Input
                                value={item.endDate}
                                onChange={(e) => handleChange(item.id, 'endDate', e.target.value)}
                                placeholder="May 2024"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GPA (Optional)</label>
                            <Input
                                value={item.gpa}
                                onChange={(e) => handleChange(item.id, 'gpa', e.target.value)}
                                placeholder="3.8/4.0"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                value={item.location}
                                onChange={(e) => handleChange(item.id, 'location', e.target.value)}
                                placeholder="City, State"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
