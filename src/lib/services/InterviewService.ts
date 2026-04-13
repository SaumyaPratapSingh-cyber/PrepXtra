import { GoogleGenerativeAI } from "@google/generative-ai";
import { InterviewQuestion } from "../scrapers/InterviewScraper";

export interface AnalysisResponse {
    feedback: string;
    isFollowUp: boolean;
    nextQuestion?: string;
    evaluation?: {
        score: number;
        strengths: string[];
        improvements: string[];
    };
}

export class InterviewService {
    private static apiKey = process.env.GOOGLE_API_KEY;

    static async generateFinalReport(
        role: string,
        history: { question: string; answer: string }[]
    ): Promise<any> {
        if (!this.apiKey) return { error: "API Key missing" };

        try {
            const genAI = new GoogleGenerativeAI(this.apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const prompt = `
                You are a Senior Technical Recruiter. Generate a detailed Final Interview Report for a candidate applying for: ${role}.
                
                Interview History:
                ${history.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n')}

                Analyze the user's performance and provide a JSON response:
                {
                    "score": number (0-100),
                    "feedback": "string (Overall summary, professional tone)",
                    "strengths": ["string", "string"],
                    "weaknesses": ["string", "string"],
                    "recommendations": ["string", "string"],
                    "fillerWords": number (Estimate count based on text like 'um', 'uh', 'like' in the answers),
                    "communicationScore": number (0-100),
                    "technicalScore": number (0-100)
                }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Robust JSON extraction
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            // Fallback
            if (jsonMatch) return JSON.parse(jsonMatch[0]);

            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
            }

            return { error: "Failed to parse report" };
        } catch (error: any) {
            console.error("Report Generation Error:", error);
            return { error: error.message };
        }
    }

    static async analyzeResponse(
        role: string,
        question: string,
        userAnswer: string,
        history: { question: string; answer: string }[]
    ): Promise<AnalysisResponse> {
        console.log(`[InterviewService] Analyzing response for question: ${question.substring(0, 50)}...`);

        if (!this.apiKey) {
            return {
                feedback: "I understand. Let's move on to the next question.",
                isFollowUp: true,
                nextQuestion: "Could you elaborate on your experience with this topic?",
            };
        }

        try {
            const genAI = new GoogleGenerativeAI(this.apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const prompt = `
                You are Siddharth V., a Senior Technical Recruiter at a top-tier tech firm.
                You are interviewing a candidate for a ${role} position.
                
                MANDATORY FOCUS: PROJECT EXPERIENCE.
                The user wants to discuss their projects.
                1. If this is the start, ask them to describe a challenging project.
                2. If they mention a project, dig deeper into the tech stack and valid/invalid design choices.
                
                Current Question: ${question}
                User's Answer: ${userAnswer}
                
                Interview History:
                ${history.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n')}

                INSTRUCTIONS:
                1. Keep feedback brief and spoken-style (<50 words total).
                2. Ask ONE clear follow-up question about their project.
                3. NO Markdown.
                4. 'isFollowUp' should be true unless history length >= 4 (Strictly 4 questions).

                JSON Format:
                {
                    "feedback": "string",
                    "isFollowUp": boolean,
                    "nextQuestion": "string",
                    "evaluation": {
                        "score": number,
                        "strengths": ["string"],
                        "improvements": ["string"]
                    }
                }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Robust JSON extraction
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            // Fallback for cases without code blocks
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonStr = text.substring(jsonStart, jsonEnd + 1);
                return JSON.parse(jsonStr);
            }

            throw new Error("Failed to parse JSON from AI response");
        } catch (error: any) {
            console.error("[InterviewService] Error:", error.message);
            return {
                feedback: "I understand. let's continue.",
                isFollowUp: false,
                nextQuestion: "",
            };
        }
    }
}
