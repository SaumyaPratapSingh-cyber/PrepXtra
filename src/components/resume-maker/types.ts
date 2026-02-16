export interface ResumeData {
    personal: PersonalDetails;
    education: EducationItem[];
    experience: ExperienceItem[];
    projects: ProjectItem[];
    skills: {
        technical: string[];
        soft: string[];
        languages: string[];
        tools: string[];
    };
}

export interface PersonalDetails {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    website: string;
    location: string;
}

export interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string; // or "Present"
    gpa: string;
    location: string;
}

export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string[]; // Bullet points
}

export interface ProjectItem {
    id: string;
    name: string;
    technologies: string; // Comma separated or array
    link: string;
    description: string[]; // Bullet points
}
