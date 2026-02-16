"use client";

import React from 'react';
import { ResumeData } from '../types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus, X } from 'lucide-react';

interface SkillsStepProps {
    data: ResumeData['skills'];
    updateRaw: (data: ResumeData['skills']) => void;
}

export default function SkillsStep({ data, updateRaw }: SkillsStepProps) {

    const handleArrayChange = (category: keyof ResumeData['skills'], value: string) => {
        // Assuming value is comma separated string for input
        const array = value.split(',').map(s => s.trim());
        updateRaw({ ...data, [category]: array });
    };

    // Actually, a better UI for skills is tags or just simple comma separated input.
    // Let's go with comma separated input for simplicity and speed, as it's very effective for "Jake's Resume".

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Technical Skills / Languages</label>
                    <p className="text-xs text-muted-foreground">Separate by comma (e.g. JavaScript, Python, C++)</p>
                    <Input
                        value={data.technical.join(', ')}
                        onChange={(e) => handleArrayChange('technical', e.target.value)}
                        placeholder="Java, Python, C++, SQL, JavaScript"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Frameworks & Libraries</label>
                    <p className="text-xs text-muted-foreground">Separate by comma (e.g. React, Node.js, Spring Boot)</p>
                    <Input
                        value={data.tools.join(', ')}
                        onChange={(e) => handleArrayChange('tools', e.target.value)}
                        placeholder="React, Spring Boot, TensorFlow, Pandas"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Tools / Developer Tools</label>
                    <p className="text-xs text-muted-foreground">Separate by comma (e.g. Git, Docker, AWS)</p>
                    <Input
                        value={data.languages.join(', ')} // Using 'languages' field for Tools mostly in this mapping or just map appropriately. 
                        // Wait, let's fix the mapping. 
                        // In Jake's resume: Languages, Frameworks, Developer Tools, Libraries.
                        // My types: technical, soft, languages, tools.
                        // Let's map: 
                        // Technical -> Languages
                        // Tools -> Frameworks
                        // Languages -> Developer Tools
                        // Soft -> Libraries (or unused)

                        // Let's stick to the labels I put in Types or just be flexible.
                        // Let's use:
                        // technical -> Languages
                        // tools -> Frameworks & Libraries
                        // languages -> Developer Tools
                        onChange={(e) => handleArrayChange('languages', e.target.value)}
                        placeholder="Git, Docker, TravisCI, AWS, Linux"
                    />
                </div>

                {/* Optional Soft Skills */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Soft Skills (Optional)</label>
                    <p className="text-xs text-muted-foreground">Separate by comma</p>
                    <Input
                        value={data.soft.join(', ')}
                        onChange={(e) => handleArrayChange('soft', e.target.value)}
                        placeholder="Leadership, Event Management, Writing"
                    />
                </div>
            </div>
        </div>
    );
}
