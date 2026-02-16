"use client";

import React from 'react';
import { PersonalDetails } from '../types';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label'; // Assuming a Label component exists or I'll use native label

// Note: If Label component doesn't exist, I'll use a simple <label>
// Let's assume standard usage for now.

interface PersonalDetailsStepProps {
    data: PersonalDetails;
    updateRaw: (data: PersonalDetails) => void;
}

export default function PersonalDetailsStep({ data, updateRaw }: PersonalDetailsStepProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateRaw({ ...data, [name]: value });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={data.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone</label>
                    <Input
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Location</label>
                    <Input
                        id="location"
                        name="location"
                        value={data.location}
                        onChange={handleChange}
                        placeholder="New York, NY"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="linkedin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">LinkedIn URL</label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        value={data.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="github" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">GitHub URL</label>
                    <Input
                        id="github"
                        name="github"
                        value={data.github}
                        onChange={handleChange}
                        placeholder="github.com/johndoe"
                    />
                </div>
                <div className="col-span-2 space-y-2">
                    <label htmlFor="website" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Portfolio / Website</label>
                    <Input
                        id="website"
                        name="website"
                        value={data.website}
                        onChange={handleChange}
                        placeholder="johndoe.com"
                    />
                </div>
            </div>
        </div>
    );
}
