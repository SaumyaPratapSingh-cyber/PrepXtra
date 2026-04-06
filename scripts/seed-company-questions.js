
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

// Define Schema inside script for standalone execution
const questionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    explanation: { type: String },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    type: { type: String, default: 'Aptitude' },
    companies: [{ type: String }]
}, { timestamps: true });

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

const companyQuestions = [
    {
        content: "If the difference between CI and SI on a sum for 2 years at 5% per annum is $25, find the sum.",
        options: ["$10,000", "$12,000", "$8,000", "$9,000"],
        correctAnswer: "0",
        explanation: "Difference = PR^2 / 100^2. 25 = P(5^2)/10000 => 25 = 25P/10000 => P = 10000.",
        category: "Quantitative",
        type: "Aptitude",
        companies: ["Google"],
        difficulty: "Hard"
    },
    {
        content: "Find the missing number in the series: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "38", "44"],
        correctAnswer: "1",
        explanation: "Pattern: n^2 + n. 1^2+1=2, 2^2+2=6... 6^2+6=42.",
        category: "Logical Reasoning",
        type: "Aptitude",
        companies: ["Google"],
        difficulty: "Medium"
    },
    {
        content: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "2",
        explanation: "CP of 6 = 1. SP of 6 = 1.20. For 1 rupee, sell 6/1.2 = 5.",
        category: "Quantitative",
        type: "Aptitude",
        companies: ["Amazon"],
        difficulty: "Medium"
    },
    {
        content: "What is the probability of getting a sum 9 from two throws of a dice?",
        options: ["1/6", "1/8", "1/9", "1/12"],
        correctAnswer: "2",
        explanation: "Pairs: (3,6), (4,5), (5,4), (6,3). Total = 36. Prob = 4/36 = 1/9.",
        category: "Quantitative",
        type: "Aptitude",
        companies: ["TCS"],
        difficulty: "Medium"
    },
    {
        content: "If 5 workers can build a wall in 12 days, how many workers can build it in 10 days?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "0",
        explanation: "M1D1 = M2D2 => 5*12 = M2*10 => 60=10M2 => M2=6.",
        category: "Quantitative",
        type: "Aptitude",
        companies: ["Infosys"],
        difficulty: "Easy"
    },
    {
        content: "Which of the following is used to manage state in a React application?",
        options: ["Redux", "HTML", "CSS", "SQL"],
        correctAnswer: "0",
        explanation: "Redux is a popular state management library for React.",
        category: "Technical",
        type: "Technical",
        companies: ["General"],
        difficulty: "Medium"
    },
    {
        content: "Describe a time you had to deal with a difficult team member. How did you handle it?",
        options: ["I ignored them", "I spoke to them privately", "I complained to the manager", "I quit"],
        correctAnswer: "1",
        explanation: "Effective communication is key to conflict resolution.",
        category: "Behavioral",
        type: "HR",
        companies: ["General"],
        difficulty: "Medium"
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB for Company Seeding");

        const companiesList = [
            "Infosys", "TCS", "Accenture", "Amazon", "Microsoft",
            "Google", "Deloitte", "IBM", "Nvidia", "Wipro",
            "L&T", "Goldman Sachs", "Intel", "Meta"
        ];

        const bulkQuestions = [];
        companiesList.forEach(company => {
            // Aptitude Questions
            for (let i = 0; i < 6; i++) {
                bulkQuestions.push({
                    content: `[${company} Aptitude] Calculate the interest on $${1000 + i * 100} at 5% for ${i + 1} years.`,
                    options: [`$${(1000 + i * 100) * 0.05 * (i + 1)}`, "$200", "$300", "$400"],
                    correctAnswer: "0",
                    explanation: "Simple interest formula: PRT/100.",
                    category: i % 3 === 0 ? "Quantitative" : (i % 3 === 1 ? "Logical Reasoning" : "English"),
                    type: "Aptitude",
                    companies: [company],
                    difficulty: i > 3 ? "Hard" : "Medium"
                });
            }

            // Technical Questions
            for (let i = 0; i < 3; i++) {
                bulkQuestions.push({
                    content: `[${company} Tech] What is the complexity of searching in a ${i === 0 ? 'Binary Search Tree' : (i === 1 ? 'Hash Map' : 'Linked List')}?`,
                    options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
                    correctAnswer: i === 0 ? "0" : (i === 1 ? "1" : "2"),
                    explanation: "Standard data structure complexities.",
                    category: "Data Structures",
                    type: "Technical",
                    companies: [company],
                    difficulty: "Medium"
                });
            }

            // HR Questions
            bulkQuestions.push({
                content: `[${company} HR] Why do you want to join ${company}?`,
                options: ["Strong values", "Good pay", "Brand name", "Learning opportunities"],
                correctAnswer: "3",
                explanation: "Focus on growth and learning.",
                category: "Behavioral",
                type: "HR",
                companies: [company],
                difficulty: "Easy"
            });
        });

        // Clear existing company questions to avoid duplicates if re-running
        await Question.deleteMany({ companies: { $exists: true, $not: { $size: 0 } } });

        await Question.insertMany([...companyQuestions, ...bulkQuestions]);
        console.log(`Successfully seeded ${companyQuestions.length + bulkQuestions.length} company-specific questions.`);
    } catch (err) {
        console.error("Seeding error:", err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

seed();
