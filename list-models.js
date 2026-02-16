const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function listModelsRest() {
    const key = process.env.GOOGLE_API_KEY;
    console.log("Key:", key ? key.substring(0, 5) + "..." : "Missing");

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        let output = "Available Models:\n";
        if (data.models) {
            data.models.forEach(m => output += `- ${m.name}\n`);
        } else {
            output += "No models returned. Error: " + JSON.stringify(data, null, 2);
        }

        fs.writeFileSync('models.txt', output);
        console.log("Written models to models.txt");

    } catch (e) {
        console.error("REST Error:", e);
        fs.writeFileSync('models.txt', "Error: " + e.toString());
    }
}

listModelsRest();
