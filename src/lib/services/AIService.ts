// import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// Make sure to add GOOGLE_API_KEY to your .env file
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

interface ResumeAnalysis {
    strengths: string[];
    weaknesses: string[];
    extractedSkills: string[];
    gapAnalysis: string;
}

interface StudyPlan {
    roadmap: any[];
    curatedQuestions: any[];
}

export class AIService {
    static async analyzeResume(resumeText: string, targetCompany: string, targetRole: string): Promise<ResumeAnalysis> {
        try {
            // if (!process.env.GOOGLE_API_KEY) {
            //     console.warn("GOOGLE_API_KEY not found. Using mock analysis.");
            //     return this.getMockAnalysis(targetCompany, targetRole);
            // }

            // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            // const prompt = `
            //     Analyze the following resume text for a candidate applying to ${targetCompany} as a ${targetRole}.
            //     Provide a JSON output with the following fields:
            //     - strengths: List of 3-5 strong points relevant to the role.
            //     - weaknesses: List of 3-5 areas for improvement.
            //     - extractedSkills: List of technical skills found.
            //     - gapAnalysis: A brief paragraph explaining what is missing for this specific role at this specific company.
            //
            //     Resume Text:
            //     ${resumeText.substring(0, 5000)} // Limit length
            // `;

            // const result = await model.generateContent(prompt);
            // const response = await result.response;
            // const text = response.text();

            // // Basic cleaning to extract JSON
            // const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
            // return JSON.parse(jsonStr);
            console.log("Using mock analysis (Gemini disabled temporarily)");
            return this.getMockAnalysis(targetCompany, targetRole);

        } catch (error) {
            console.error("AI Analysis failed:", error);
            // Fallback to mock if AI fails or key is missing
            return this.getMockAnalysis(targetCompany, targetRole);
        }
    }

    static async generateStudyPlan(analysis: ResumeAnalysis, targetCompany: string, targetRole: string): Promise<StudyPlan> {
        try {
            // if (!process.env.GOOGLE_API_KEY) {
            //     return this.getMockStudyPlan(targetCompany);
            // }

            // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            // const prompt = `
            //     Create a 4-week study plan and a list of 5 curated DSA questions for a candidate with the following gaps: ${analysis.gapAnalysis}.
            //     Target: ${targetCompany} ${targetRole}.
            //     
            //     Output JSON:
            //     {
            //         "roadmap": [
            //             { "week": 1, "day": 1, "topic": "...", "description": "...", "resources": [{"title": "...", "url": "...", "type": "article"}] }
            //         ],
            //         "curatedQuestions": [
            //             { "title": "...", "difficulty": "Medium", "pattern": "...", "companyTag": "${targetCompany}" }
            //         ]
            //     }
            // `;

            // const result = await model.generateContent(prompt);
            // const response = await result.response;
            // const text = response.text();
            // const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
            // return JSON.parse(jsonStr);
            console.log("Using mock study plan (Gemini disabled temporarily)");
            return this.getMockStudyPlan(targetCompany);

        } catch (error) {
            console.error("AI Plan Generation failed:", error);
            return this.getMockStudyPlan(targetCompany);
        }
    }

    private static getMockAnalysis(company: string, role: string): ResumeAnalysis {
        return {
            strengths: ["Strong problem solving basics", "Experience with React", "Good project portfolio"],
            weaknesses: ["Lack of System Design experience", "Limited exposure to distributed systems", "Need more graph algorithms practice"],
            extractedSkills: ["JavaScript", "React", "Node.js", "Python"],
            gapAnalysis: `To crack ${company} for a ${role} role, you need to deepen your understanding of Scalability and Advanced Data Structures tailored to their interview style.`
        };
    }

    private static getMockStudyPlan(company: string): StudyPlan {
        return {
            roadmap: [
                {
                    week: 1,
                    day: 1,
                    topic: "Advanced Arrays & Hashing",
                    description: `Master array manipulation techniques frequently asked at ${company}.`,
                    resources: [
                        { title: "Two Sum Pattern", url: "https://leetcode.com/problems/two-sum", type: "problem" },
                        { title: "Hashing Deep Dive", url: "https://cp-algorithms.com", type: "article" }
                    ],
                    completed: false
                },
                {
                    week: 1,
                    day: 2,
                    topic: "Two Pointers & Sliding Window",
                    description: "Efficiently solve subarray problems.",
                    resources: [],
                    completed: false
                }
            ],
            curatedQuestions: [
                { title: `Design Twitter (${company} Style)`, difficulty: "Hard", pattern: "System Design", companyTag: company },
                { title: "LRU Cache", difficulty: "Medium", pattern: "Hash Map + LinkedList", companyTag: company },
                { title: "Merge Intervals", difficulty: "Medium", pattern: "Sorting", companyTag: company },
                { title: "Word Ladder", difficulty: "Hard", pattern: "BFS", companyTag: company },
                { title: "Trapping Rain Water", difficulty: "Hard", pattern: "Two Pointers", companyTag: company }
            ]
        };
    }
}
