import { GoogleGenerativeAI } from "@google/generative-ai";

export interface InterviewQuestion {
    id: string;
    question: string;
    category: "Technical" | "Behavioral" | "Project";
    expectedPoints: string[];
}

export class InterviewScraper {
    private static apiKey = process.env.GOOGLE_API_KEY;

    static async getQuestionsForRole(role: string): Promise<InterviewQuestion[]> {
        console.log(`[InterviewScraper] Fetching questions for role: ${role}`);

        if (!this.apiKey) {
            console.warn("GOOGLE_API_KEY not found. Returning default questions.");
            return this.getDefaultQuestions(role);
        }

        try {
            const genAI = new GoogleGenerativeAI(this.apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
                Generate 10 interview questions for the role: ${role}.
                Include:
                - 1 "About yourself" question.
                - 2 questions about project experience.
                - 7 technical questions related to the role (Full Stack Development or Software Engineering).
                
                For each question, provide 3-4 expected key points in the answer.
                
                CRITICAL: Return strictly valid JSON in the following format:
                [
                    {
                        "id": "q1",
                        "question": "string",
                        "category": "Technical" | "Behavioral" | "Project",
                        "expectedPoints": ["point 1", "point 2", ...]
                    },
                    ...
                ]
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Robust JSON extraction
            const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            // Fallback for cases without code blocks
            const jsonStart = text.indexOf('[');
            const jsonEnd = text.lastIndexOf(']');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonStr = text.substring(jsonStart, jsonEnd + 1);
                return JSON.parse(jsonStr);
            }

            throw new Error("Failed to parse JSON from AI response");
        } catch (error: any) {
            console.error("[InterviewScraper] Error:", error.message);
            return this.getDefaultQuestions(role);
        }
    }

    private static getDefaultQuestions(role: string): InterviewQuestion[] {
        return [
            {
                id: "intro",
                question: "Tell me about yourself and your background.",
                category: "Behavioral",
                expectedPoints: ["Education", "Key skills", "Recent experience", "Career goals"]
            },
            {
                id: "project1",
                question: "Can you describe a challenging project you worked on recently?",
                category: "Project",
                expectedPoints: ["Context of the project", "Your specific role", "Challenges faced", "Outcome/Results"]
            },
            {
                id: "tech1",
                question: `What are the core responsibilities of a ${role}?`,
                category: "Technical",
                expectedPoints: ["System design", "Coding standards", "Testing", "Collaboration"]
            }
            // ... more default questions could be added here
        ];
    }
}
