import React from 'react';
import ResumeBuilderWizard from '@/components/resume-maker/ResumeBuilderWizard';

export default function ResumeMakerPage() {
    return (
        <div className="h-[calc(100vh-64px)] p-6 space-y-6 flex flex-col">
            <div className="space-y-2 shrink-0">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Resume Builder</h1>
                <p className="text-muted-foreground">
                    Create a professional, ATS-friendly resume in minutes.
                </p>
            </div>

            <div className="flex-1 min-h-0 bg-background/50 backdrop-blur-sm rounded-xl">
                <ResumeBuilderWizard />
            </div>
        </div>
    );
}
