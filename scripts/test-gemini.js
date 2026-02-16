
require("dotenv").config({ path: ".env.local" });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        console.error("GOOGLE_API_KEY not found in .env.local");
        return;
    }

    console.log("Testing Gemini API...");
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = "Hello, are you working? Respond with 'Yes, I am working'.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Gemini Response:", text);
    } catch (error) {
        console.error("Gemini API Failed:", error);
    }
}

testGemini();
