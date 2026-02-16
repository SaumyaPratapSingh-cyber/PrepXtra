
import mongoose from 'mongoose';
import Question from '../src/models/Question';
import dbConnect from '../src/lib/db';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const companyQuestions = [
    // GOOGLE
    {
        content: "If the difference between CI and SI on a sum for 2 years at 5% per annum is $25, find the sum.",
        options: ["$10,000", "$12,000", "$8,000", "$9,000"],
        correctAnswer: 0,
        explanation: "Difference = PR^2 / 100^2. 25 = P(5^2)/10000 => 25 = 25P/10000 => P = 10000.",
        category: "Quantitative",
        type: "Aptitude",
        company: "Google",
        difficulty: "Hard"
    },
    {
        content: "Find the missing number in the series: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "38", "44"],
        correctAnswer: 1,
        explanation: "Pattern: n^2 + n. 1^2+1=2, 2^2+2=6... 6^2+6=42.",
        category: "Logical Reasoning",
        type: "Aptitude",
        company: "Google",
        difficulty: "Medium"
    },
    // AMAZON
    {
        content: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
        explanation: "CP of 6 = 1. SP of 6 = 1.20. For 1 rupee, sell 6/1.2 = 5.",
        category: "Quantitative",
        type: "Aptitude",
        company: "Amazon",
        difficulty: "Medium"
    },
    {
        content: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
        options: ["His own", "His son's", "His father's", "His nephew's"],
        correctAnswer: 1,
        explanation: "Father's son = Himself. So, the man's father is himself. Thus, the photograph is of his son.",
        category: "Logical Reasoning",
        type: "Aptitude",
        company: "Amazon",
        difficulty: "Hard"
    },
    // TCS
    {
        content: "What is the probability of getting a sum 9 from two throws of a dice?",
        options: ["1/6", "1/8", "1/9", "1/12"],
        correctAnswer: 2,
        explanation: "Pairs: (3,6), (4,5), (5,4), (6,3). Total = 36. Prob = 4/36 = 1/9.",
        category: "Quantitative",
        type: "Aptitude",
        company: "TCS",
        difficulty: "Medium"
    },
    {
        content: "Fill in the blank: The police _____ investigate the case thoroughly.",
        options: ["was", "are", "has", "is"],
        correctAnswer: 1,
        explanation: "'Police' is a collective noun usually treated as plural.",
        category: "English",
        type: "Aptitude",
        company: "TCS",
        difficulty: "Easy"
    },
    // INFOSYS
    {
        content: "If 5 workers can build a wall in 12 days, how many workers can build it in 10 days?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 0,
        explanation: "M1D1 = M2D2 => 5*12 = M2*10 => 60=10M2 => M2=6.",
        category: "Quantitative",
        type: "Aptitude",
        company: "Infosys",
        difficulty: "Easy"
    },
    // MICROSOFT
    {
        content: "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written?",
        options: ["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "EOJDJFEM"],
        correctAnswer: 0,
        explanation: "Pattern: Reverse + Increment first/last and cross-shifted.",
        category: "Logical Reasoning",
        type: "Aptitude",
        company: "Microsoft",
        difficulty: "Hard"
    },
    // META
    {
        content: "A train moves at 80 km/hr. How much distance does it cover in 15 minutes?",
        options: ["20km", "15km", "25km", "18km"],
        correctAnswer: 0,
        explanation: "Speed = 80. Time = 15/60 = 0.25 hr. Distance = 80 * 0.25 = 20km.",
        category: "Quantitative",
        type: "Aptitude",
        company: "Meta",
        difficulty: "Easy"
    },
    // GOLDMAN SACHS
    {
        content: "If x + 1/x = 3, find x^2 + 1/x^2.",
        options: ["7", "9", "11", "5"],
        correctAnswer: 0,
        explanation: "(x+1/x)^2 = x^2 + 1/x^2 + 2. 3^2 = Sum + 2 => Sum = 7.",
        category: "Quantitative",
        type: "Aptitude",
        company: "Goldman Sachs",
        difficulty: "Medium"
    },
    // NVIDIA
    {
        content: "Which of the following sorting algorithms has worst-case time complexity of O(n^2)?",
        options: ["Merge Sort", "Quick Sort", "Heap Sort", "Counting Sort"],
        correctAnswer: 1,
        explanation: "Quick sort is O(n^2) in worst case (already sorted array with first element as pivot).",
        category: "Technical",
        type: "Aptitude",
        company: "Nvidia",
        difficulty: "Medium"
    }
];

async function seed() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error('MONGODB_URI is not defined in .env.local');
        process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for Company Seeding");

    // Add generic ones to fill up counts for all companies
    const companies = [
        "Infosys", "TCS", "Accenture", "Amazon", "Microsoft",
        "Google", "Deloitte", "IBM", "Nvidia", "Wipro",
        "L&T", "Goldman Sachs", "Intel", "Meta"
    ];

    const bulkQuestions: any[] = [];
    companies.forEach(company => {
        // Ensure each company has at least 5 questions for first test
        for (let i = 0; i < 5; i++) {
            bulkQuestions.push({
                content: `[${company} Sample] A work is done by A in ${10 + i} days. B does it in ${15 + i} days. Together?`,
                options: ["6 days", "8 days", "7 days", "10 days"],
                correctAnswer: 0,
                explanation: "1/A + 1/B = 1/T",
                category: i % 3 === 0 ? "Quantitative" : (i % 3 === 1 ? "Logical Reasoning" : "English"),
                type: "Aptitude",
                company: company,
                difficulty: "Medium"
            });
        }
    });

    await Question.insertMany([...companyQuestions, ...bulkQuestions]);
    console.log("Successfully seeded company-specific questions.");
    process.exit(0);
}

seed();
