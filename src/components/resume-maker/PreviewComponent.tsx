"use client";

import React from 'react';
import { ResumeData } from './types';
import dynamic from 'next/dynamic';

// Dynamic import for PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading Preview...</p>,
    }
);

import ResumePDF from './ResumePDF';

interface PreviewComponentProps {
    data: ResumeData;
}

export default function PreviewComponent({ data }: PreviewComponentProps) {
    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex-1 border rounded-lg overflow-hidden bg-slate-900">
                <PDFViewer width="100%" height="100%" className="w-full h-[600px] border-none">
                    <ResumePDF data={data} />
                </PDFViewer>
            </div>
            <p className="text-sm text-center text-muted-foreground">
                Note: The preview might look slightly different from the final downloaded PDF.
            </p>
        </div>
    );
}
