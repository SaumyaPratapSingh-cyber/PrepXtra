import { roadmaps } from "@/data/roadmaps";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ResumeAnalysis {
    strengths: string[];
    weaknesses: string[];
    extractedSkills: string[];
    gapAnalysis: string;
    strategicRecommendation: string;
    careerOpportunities: string[];
}

interface StudyPlan {
    roadmap: any[];
    curatedQuestions: any[];
    interviewQuestions: { question: string; answer: string; category: string }[];
    selectedRoadmapId: string;
}

export class AIService {
    private static getTrackQuestions(trackId: string): { question: string; answer: string; category: string }[] {
        const fullstack = [
            { question: "What is a full stack developer?", answer: "A full stack developer is proficient in both front-end and back-end development, handling client-side and server-side software, databases, and APIs.", category: "Technical" },
            { question: "Explain the differences between front-end and back-end development.", answer: "Front-end focuses on the user-facing part of a web application (UI/UX). Back-end deals with server logic, databases, and application management.", category: "Technical" },
            { question: "What is containerization?", answer: "Containerization involves packaging an application with all its dependencies into a container to ensure consistent execution across environments. Docker is a lead tool.", category: "Technical" },
            { question: "Explain CSR vs SSR.", answer: "Client-Side Rendering (CSR) builds the DOM in the browser. Server-Side Rendering (SSR) generates HTML on the server, resulting in quicker initial renders and better SEO.", category: "Technical" },
            { question: "What is a RESTful API?", answer: "An API that conforms to REST principles, typically using standard HTTP methods like GET, POST, PUT, DELETE for CRUD operations.", category: "Technical" },
            { question: "How do you manage state in complex React applications?", answer: "Using tools like Redux, Zustand, or the Context API to provide a centralized store for application state.", category: "Technical" },
            { question: "What is a Promise in JavaScript?", answer: "A promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value.", category: "Technical" },
            { question: "Explain MVC Architecture.", answer: "Model-View-Controller separates an application into Model (data), View (UI), and Controller (logic).", category: "Technical" },
            { question: "What is the difference between SQL and NoSQL?", answer: "SQL databases are relational and use structured tables. NoSQL databases are non-relational and offer flexible formats like doc store.", category: "Technical" },
            { question: "What is the Event Loop in Node.js?", answer: "A mechanism that allows Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel.", category: "Technical" }
        ];

        const frontend = [
            { question: "Explain the CSS Box Model.", answer: "The Box Model consists of content, padding, border, and margin around every HTML element.", category: "Technical" },
            { question: "What is semantic HTML?", answer: "Using tags that convey meaning (e.g., <header>, <article>) to improve accessibility and SEO.", category: "Technical" },
            { question: "Explain closures in JavaScript.", answer: "A closure is a function that remembers its outer scope's variables even after the outer function has finished executing.", category: "Technical" },
            { question: "What is the Virtual DOM?", answer: "A lightweight copy of the real DOM that React uses to optimize updates by only re-rendering what changed.", category: "Technical" },
            { question: "What is the difference between em and rem?", answer: "em is relative to the element's font-size, while rem is relative to the root element's font-size.", category: "Technical" },
            { question: "How do you optimize website performance?", answer: "Minifying assets, compressing images, lazy loading, and using a CDN.", category: "Technical" }
        ];

        const backend = [
            { question: "Explain ACID properties in databases.", answer: "Atomicity, Consistency, Isolation, and Durability - properties that guarantee reliable transaction processing.", category: "Technical" },
            { question: "What is middleware in Express.js?", answer: "Functions that execute during the request-response cycle to handle tasks like logging or auth.", category: "Technical" },
            { question: "How do you handle password hashing?", answer: "Using salted hashes with algorithms like bcrypt or Argon2 to prevent plain-text exposure.", category: "Technical" },
            { question: "What is eventual consistency?", answer: "A consistency model where data updates will eventually be reflected across all nodes in a distributed system.", category: "Technical" }
        ];

        // Combine with more questions or return based on track
        let base = trackId.includes('frontend') ? frontend : trackId.includes('backend') ? backend : fullstack;

        // Add some behavioral questions
        const behavioral = [
            { question: "Describe a challenging technical problem you solved.", answer: "Focus on the problem, your specific actions using tech tools, and the quantifiable outcome.", category: "Behavioral" },
            { question: "How do you stay updated with new technologies?", answer: "Mention reading tech blogs (Dev.to, Medium), following industry leaders, and working on side projects.", category: "Behavioral" }
        ];

        return [...base, ...behavioral];
    }

    static async analyzeResume(resumeText: string, targetCompany: string, targetRole: string): Promise<ResumeAnalysis> {
        console.log("AIService: [analyzeResume] Applying to", targetCompany, "for", targetRole);
        try {
            const apiKey = process.env.GOOGLE_API_KEY;
            if (!apiKey) {
                console.warn("AIService: GOOGLE_API_KEY not found. Using mock analysis.");
                return this.getMockAnalysis(targetCompany, targetRole);
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const prompt = `
                Analyze the following resume text for a candidate applying to ${targetCompany} as a ${targetRole}.
                
                CRITICAL INSTRUCTION: Return strictly valid JSON. No markdown code blocks, no intro text, no trailing commas.
                The JSON must match this structure exactly:
                {
                    "strengths": ["string", "string", ...],
                    "weaknesses": ["string", "string", ...],
                    "extractedSkills": ["string", "string", ...],
                    "gapAnalysis": "A short summary (2-3 sentences) of the main gap between the candidate and the role.",
                    "strategicRecommendation": "A detailed, personalized recommendation (3-4 sentences) on what the candidate should prioritize to get hired at ${targetCompany}, considering their resume and the specific role ${targetRole}.",
                    "careerOpportunities": ["Potential role 1", "Potential role 2", ...]
                }

                Resume Text:
                ${resumeText.substring(0, 10000)}
            `;

            console.log("AIService: Calling Gemini API for analysis...");
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}');

            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonStr = text.substring(jsonStart, jsonEnd + 1);
                try {
                    return JSON.parse(jsonStr);
                } catch (parseErr: any) {
                    throw new Error("Invalid JSON from AI: " + parseErr.message);
                }
            }
            throw new Error("Failed to find JSON object in AI response");
        } catch (error: any) {
            console.error("AIService: Analysis failed:", error.message);
            return this.getMockAnalysis(targetCompany, targetRole);
        }
    }

    static async generateStudyPlan(analysis: ResumeAnalysis, targetCompany: string, targetRole: string): Promise<StudyPlan> {
        console.log("AIService: [generateStudyPlan] for", targetRole);
        try {
            const apiKey = process.env.GOOGLE_API_KEY;
            const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
            const model = genAI?.getGenerativeModel({ model: "gemini-flash-latest" });

            const isFrontend = targetRole.toLowerCase().includes("frontend");
            const isBackend = targetRole.toLowerCase().includes("backend");
            const isFullstack = targetRole.toLowerCase().includes("full stack") || targetRole.toLowerCase().includes("fullstack");

            let selectedTrack = isFrontend ? "frontend" : isBackend ? "backend" : isFullstack ? "fullstack" : "fullstack";

            const prompt = `
                Generate a highly accurate personalized strategy.
                Role: ${targetRole}
                Target: ${targetCompany}
                Gap: ${analysis.gapAnalysis}

                INSTRUCTIONS:
                1. Select the BEST roadmap ID from: frontend, backend, fullstack, dsa, system-design, devops, flutter, android, ios.
                2. Provide 5 curated DSA problems or architecture challenges for ${targetRole} at ${targetCompany}.
                3. Return JSON structure:
                {
                    "selectedRoadmapId": "string",
                    "curatedQuestions": [
                        { "title": "string", "difficulty": "Hard", "pattern": "string", "companyTag": "${targetCompany}" }
                    ]
                }
                
                CRITICAL: Use valid JSON.
            `;

            let aiResponse: any = { selectedRoadmapId: selectedTrack, curatedQuestions: [] };
            if (model) {
                const result = await model.generateContent(prompt);
                const text = (await result.response).text();
                const jsonStart = text.indexOf('{');
                const jsonEnd = text.lastIndexOf('}');
                if (jsonStart !== -1 && jsonEnd !== -1) {
                    try {
                        aiResponse = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
                    } catch (e) { }
                }
            }

            const trackId = aiResponse.selectedRoadmapId || selectedTrack;
            const roadmapData = roadmaps[trackId] || roadmaps['fullstack'];

            // Extract the dayWisePlan from the root node or primary nodes
            const rootNode = roadmapData.nodes[roadmapData.rootNodeId];
            let roadmapItems: any[] = [];

            if (rootNode && rootNode.dayWisePlan) {
                roadmapItems = rootNode.dayWisePlan.map(dp => ({
                    week: 1,
                    day: dp.day,
                    topic: dp.title,
                    description: dp.description,
                    resources: rootNode.resources || [],
                    completed: false
                }));
            } else {
                // Fallback to searching children for dayWisePlans if root doesn't have it
                const children = rootNode.children || [];
                let dayCounter = 1;
                children.forEach(childId => {
                    const child = roadmapData.nodes[childId];
                    if (child && child.dayWisePlan) {
                        child.dayWisePlan.forEach(dp => {
                            roadmapItems.push({
                                week: Math.ceil(dayCounter / 7),
                                day: dayCounter++,
                                topic: dp.title,
                                description: dp.description,
                                resources: child.resources || [],
                                completed: false
                            });
                        });
                    }
                });
            }

            // Get curated interview questions from our reliable source
            const interviewQuestions = this.getTrackQuestions(trackId);

            return {
                selectedRoadmapId: trackId,
                roadmap: roadmapItems.length > 0 ? roadmapItems : this.getMockStudyPlan(targetCompany, targetRole).roadmap,
                curatedQuestions: aiResponse.curatedQuestions.length > 0 ? aiResponse.curatedQuestions : this.getMockStudyPlan(targetCompany, targetRole).curatedQuestions,
                interviewQuestions: interviewQuestions.length > 0 ? interviewQuestions : this.getMockStudyPlan(targetCompany, targetRole).interviewQuestions
            };

        } catch (error: any) {
            console.error("AIService: Plan Generation failed:", error.message);
            return this.getMockStudyPlan(targetCompany, targetRole);
        }
    }

    private static getMockAnalysis(company: string, role: string): ResumeAnalysis {
        return {
            strengths: ["Strong problem solving basics", "Experience with core technologies"],
            weaknesses: ["Needs more industry-level project exposure", "Limited system design experience"],
            extractedSkills: ["Standard Tech Stack"],
            gapAnalysis: `Transitioning to ${company} as a ${role} requires mastering specific architectural patterns and production-level best practices used in their ecosystem.`,
            strategicRecommendation: `Focus on the Interview Pack and the Master Roadmap for ${role} to align your skills with ${company}'s bar.`,
            careerOpportunities: ["Software Engineer", `${role}`]
        };
    }

    private static getMockStudyPlan(company: string, role: string): StudyPlan {
        const isFrontend = role.toLowerCase().includes("frontend");
        return {
            selectedRoadmapId: isFrontend ? "frontend" : "fullstack",
            roadmap: [
                {
                    week: 1,
                    day: 1,
                    topic: "Track Fundamentals",
                    description: `Core concepts for ${role} roles at top companies like ${company}.`,
                    resources: [{ title: "Industry Standards", url: "https://roadmap.sh", type: "article" }],
                    completed: false
                }
            ],
            curatedQuestions: [
                { title: `Core ${role} Challenge`, difficulty: "Medium", pattern: "Industry Pattern", companyTag: company }
            ],
            interviewQuestions: [
                { question: `What are the core responsibilities for a ${role}?`, answer: "Handling end to end development and ensuring scalability.", category: "Technical" }
            ]
        };
    }
}
