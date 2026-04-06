const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

// Define Schema
const questionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String },
    explanation: { type: String },
    category: { type: String, required: true },
    difficulty: { type: String },
    type: { type: String },
    companies: [{ type: String }]
}, { timestamps: true });

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

async function debug() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Simulate the query from the API
        const type = 'Aptitude';
        const company = 'TCS';
        const sections = ['Quantitative', 'Logical Reasoning', 'English'];

        // 1. Check total count first
        const total = await Question.countDocuments({});
        console.log(`Total questions in DB: ${total}`);

        // 2. Check simple find for TCS
        const tcsDocs = await Question.find({ companies: { $in: ['TCS'] } }).limit(2);
        console.log(`Initial check: Found ${tcsDocs.length} docs for TCS directly.`);
        if (tcsDocs.length > 0) console.log('Sample TCS doc:', JSON.stringify(tcsDocs[0], null, 2));

        // 3. Simulate the aggregation pipeline for each section
        const query = { type };
        if (company) {
            query.companies = { $in: [company, "General"] };
        }

        console.log('\n--- Checking Sections ---');
        for (const section of sections) {
            const matchQuery = { ...query, category: section };
            console.log(`Querying for section: ${section} with match:`, JSON.stringify(matchQuery));

            const count = await Question.countDocuments(matchQuery);
            console.log(`Found ${count} questions for section: ${section}`);

            // If 0, let's try to debug why
            if (count === 0) {
                const anyCat = await Question.findOne({ category: section });
                console.log(`DEBUG: Do we have any '${section}' questions at all?`, !!anyCat);
                if (anyCat) console.log('Sample:', anyCat.category, anyCat.companies);
            }
        }

    } catch (err) {
        console.error("Debug error:", err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

debug();
