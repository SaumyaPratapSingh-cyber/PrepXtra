const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function verify() {
    const key = process.env.GOOGLE_API_KEY;
    console.log("Checking API Key...");
    if (!key) {
        console.error("❌ GOOGLE_API_KEY is missing in .env.local");
        return;
    }
    console.log("Key found (starts with):", key.substring(0, 5) + "...");

    try {
        const genAI = new GoogleGenerativeAI(key);
        // Try gemini-1.5-flash as it's often the new default/stable one
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        console.log("Sending test prompt to Gemini...");
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("✅ API Success! Response:", response.text());
    } catch (error) {
        console.error("❌ Gemini API verify failed:", error.message);
        fs.writeFileSync('verification-error.txt', error.toString() + "\n" + JSON.stringify(error, null, 2));
        if (error.message.includes("API key not valid")) {
            console.error("👉 Please double-check your API key.");
        }
    }
}

verify();
