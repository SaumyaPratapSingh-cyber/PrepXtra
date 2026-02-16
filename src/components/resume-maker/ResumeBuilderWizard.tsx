"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeData } from './types';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import EducationStep from './steps/EducationStep';
import ExperienceStep from './steps/ExperienceStep';
import ProjectsStep from './steps/ProjectsStep';
import SkillsStep from './steps/SkillsStep';
import CertificationsStep from './steps/CertificationsStep';
import PreviewComponent from './PreviewComponent';
import { Button } from '@/components/ui/Button';
import { ChevronRight, ChevronLeft, Download, FileText } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

const initialData: ResumeData = {
    personal: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        website: '',
        location: '',
    },
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        languages: [],
        tools: [],
    },
};

const steps = [
    "Personal Details",
    "Education",
    "Experience",
    "Projects",
    "Skills",
    "Preview"
];

export default function ResumeBuilderWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [resumeData, setResumeData] = useState<ResumeData>(initialData);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const updateData = (section: keyof ResumeData, data: any) => {
        setResumeData(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <PersonalDetailsStep data={resumeData.personal} updateRaw={(d) => updateData('personal', d)} />;
            case 1:
                return <EducationStep data={resumeData.education} updateRaw={(d) => updateData('education', d)} />;
            case 2:
                return <ExperienceStep data={resumeData.experience} updateRaw={(d) => updateData('experience', d)} />;
            case 3:
                return <ProjectsStep data={resumeData.projects} updateRaw={(d) => updateData('projects', d)} />;
            case 4:
                return <SkillsStep data={resumeData.skills} updateRaw={(d) => updateData('skills', d)} />;
            case 5:
                return <PreviewComponent data={resumeData} />;
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Progress Indicator */}
            <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{steps[currentStep]}</h2>
                <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                </div>
            </div>

            <div className="flex-1 bg-card border rounded-xl p-6 shadow-sm overflow-y-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft className="w-4 h-4" /> Back
                </Button>

                {currentStep === steps.length - 1 ? (
                    <PDFDownloadLink
                        document={<ResumePDF data={resumeData} />}
                        fileName={`Resume_${resumeData.personal.fullName.replace(/\s+/g, '_')}.pdf`}
                    >
                        {({ blob, url, loading, error }) => (
                            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2" disabled={loading}>
                                {loading ? 'Generating PDF...' : <><Download className="w-4 h-4" /> Download Resume</>}
                            </Button>
                        )}
                    </PDFDownloadLink>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
