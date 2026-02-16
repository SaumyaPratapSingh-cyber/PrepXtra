"use client";

import React from 'react';
import { ProjectItem } from '../types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ProjectsStepProps {
    data: ProjectItem[];
    updateRaw: (data: ProjectItem[]) => void;
}

export default function ProjectsStep({ data, updateRaw }: ProjectsStepProps) {
    const addProject = () => {
        updateRaw([
            ...data,
            {
                id: uuidv4(),
                name: '',
                technologies: '',
                link: '',
                description: []
            }
        ]);
    };

    const removeProject = (id: string) => {
        updateRaw(data.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: keyof ProjectItem, value: any) => {
        updateRaw(data.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleDescriptionChange = (id: string, value: string) => {
        const lines = value.split('\n');
        handleChange(id, 'description', lines);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Projects</h3>
                <Button onClick={addProject} variant="outline" size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Project
                </Button>
            </div>

            {data.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                    No projects added yet. Click "Add Project" to start.
                </div>
            )}

            {data.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-4 bg-card/50 relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeProject(item.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project Name</label>
                            <Input
                                value={item.name}
                                onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                                placeholder="E-commerce Platform"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Technologies</label>
                            <Input
                                value={item.technologies}
                                onChange={(e) => handleChange(item.id, 'technologies', e.target.value)}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm font-medium">Link</label>
                            <Input
                                value={item.link}
                                onChange={(e) => handleChange(item.id, 'link', e.target.value)}
                                placeholder="github.com/myproject"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium">Description (One bullet point per line)</label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                value={item.description.join('\n')}
                                onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                                placeholder="- Built a full-stack application...&#10;- Implemented user authentication..."
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
