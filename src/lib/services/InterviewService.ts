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

    static async analyzeResponse(
        role: string,
        question: string,
        userAnswer: string,
        history: { question: string; answer: string }[]
    ): Promise<AnalysisResponse> {
        console.log(`[InterviewService] Analyzing response for question: ${question.substring(0, 50)}...`);

        if (!this.apiKey) {
            return {
                feedback: "Good answer. Let's move on.",
                isFollowUp: false,
            };
        }

        try {
            const genAI = new GoogleGenerativeAI(this.apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
                You are Siddharth V., a Senior Technical Recruiter at a top-tier tech firm.
                You are interviewing a college graduate for a Full Stack Developer position.
                
                INTERVIEW STAGES:
                1. Introduction & Background (Always start here if history is empty)
                2. Project Deep-Dive (Ask about their tech stack, challenges, and architectural choices)
                3. Core Technical Assessment (Focus on React, Next.js, Node.js, Databases, and System Design)
                4. Behavioral & Problem Solving
                5. Conclusion
                
                Current Question: ${question}
                User's Answer: ${userAnswer}
                
                Interview History:
                ${history.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n')}

                CRITICAL INSTRUCTIONS:
                1. BE DYNAMIC: Do not follow a fixed list. Use the history to ask context-aware follow-up questions.
                2. BE PROFESSIONAL: Your tone should be encouraging but rigorous.
                3. VERBAL FOCUS: Your "feedback" and "nextQuestion" combined MUST be a natural, spoken response.
                4. NO MARKDOWN: Do not return any bold (**), bullet points (-), or Markdown in the text fields.
                5. AVOID BUFFERING: Keep your total response (feedback + nextQuestion) under 50 words.
                6. STRATEGY: If the user gives a strong answer, move to a harder technical concept. If they struggle, provide a hint and re-evaluate.
                7. TERMINATION: Do not end the interview until at least 5 distinct questions have been asked (history length >= 5). Once you have covered enough ground (usually 8-10 exchanges), set "isFollowUp" to false and provide a final encouraging remark.
                8. MANDATORY: The "isFollowUp" property MUST be true if the interview history length is less than 5.

                JSON Format:
                {
                    "feedback": "string (Natural transition/comment, no markdown)",
                    "isFollowUp": boolean (true if the interview continues),
                    "nextQuestion": "string (The next question or follow-up, no markdown)",
                    "evaluation": {
                        "score": number (1-10),
                        "strengths": ["string"],
                        "improvements": ["string"]
                    }
                }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Robust JSON extraction
            const jsonMatch = text.match(/\{\s*"feedback"[\s\S]*\}\s*/);
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
                feedback: "I understand. Let's continue with the next question.",
                isFollowUp: false,
            };
        }
    }
}
