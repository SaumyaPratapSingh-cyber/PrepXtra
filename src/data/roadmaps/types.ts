
export interface Resource {
    type: 'article' | 'video' | 'course' | 'documentation';
    title: string;
    url: string;
    isFree?: boolean;
}

export interface DayPlan {
    day: number;
    title: string;
    description: string;
    tasks: string[];
}

export interface CodeExample {
    title: string;
    language: string;
    code: string;
}

export interface PracticeQuestion {
    question: string;
    hint?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface NodeContent {
    overview: string;
    keyConcepts?: string[];
    codeExamples?: CodeExample[];
    practiceQuestions?: PracticeQuestion[];
    bestPractices?: string[];
    commonMistakes?: string[];
}

export interface RoadmapNode {
    id: string;
    label: string;
    description: string;
    resources: Resource[];
    dayWisePlan?: DayPlan[];
    children?: string[];
    parentId?: string;
    status?: 'locked' | 'pending' | 'in-progress' | 'completed';
    content?: NodeContent;
}

export interface RoadmapTrack {
    id: string;
    title: string;
    description: string;
    nodes: Record<string, RoadmapNode>;
    rootNodeId: string;
    category?: 'role-based' | 'skill-based' | 'beginner' | 'best-practices';
    accentColor?: string;
    icon?: string; // emoji
}
