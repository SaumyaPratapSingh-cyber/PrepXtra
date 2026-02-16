
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Question from '../src/models/Question';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const questions = [
    // --- GOOGLE APTITUDE ---
    {
        content: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
        type: "Aptitude",
        category: "Logical Reasoning",
        companies: ["Google", "Microsoft"],
        difficulty: "Easy",
        options: ["40", "42", "44", "46"],
        correctAnswer: "42",
        explanation: "The series follows the pattern: 1*2, 2*3, 3*4, 4*5, 5*6. So the next term is 6*7 = 42."
    },
    {
        content: "If distinct numbers are replaced by distinct letters, find the value of (M*E*A*T) / (A*S).",
        type: "Aptitude",
        category: "Logical Reasoning",
        companies: ["Google"],
        difficulty: "Hard",
        options: ["T", "E", "M", "Can't be determined"],
        correctAnswer: "Can't be determined",
        explanation: "Without more information about the mapping of letters to numbers, the value cannot be uniquely determined."
    },
    {
        content: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        type: "Aptitude",
        category: "Quantitative",
        companies: ["Google", "TCS"],
        difficulty: "Medium",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"],
        correctAnswer: "150 metres",
        explanation: "Speed = 60 km/hr = 60 * (5/18) m/sec = 50/3 m/sec. Length of Train = Speed * Time = (50/3) * 9 = 150 metres."
    },

    // --- AMAZON APTITUDE ---
    {
        content: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
        type: "Aptitude",
        category: "Quantitative",
        companies: ["Amazon", "TCS"],
        difficulty: "Medium",
        options: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
        correctAnswer: "Rs. 698",
        explanation: "S.I. for 1 year = Rs. (854 - 815) = Rs. 39. S.I. for 3 years = Rs.(39 x 3) = Rs. 117. Principal = Rs. (815 - 117) = Rs. 698."
    },
    {
        content: "In a certain code language, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?",
        type: "Aptitude",
        category: "Logical Reasoning",
        companies: ["Amazon", "Microsoft"],
        difficulty: "Medium",
        options: ["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "MFEDJJOE"],
        correctAnswer: "EOJDJEFM",
        explanation: "The letters of the word are written in reverse order and each letter is moved one step forward."
    },

    // --- MICROSOFT APTITUDE ---
    {
        content: "The probability that a card drawn from a pack of 52 cards will be a diamond or a king is:",
        type: "Aptitude",
        category: "Probability",
        companies: ["Microsoft", "Google"],
        difficulty: "Medium",
        options: ["2/13", "4/13", "1/13", "1/52"],
        correctAnswer: "4/13",
        explanation: "13 Diamonds + 3 Kings (excluding Diamond King) = 16 cards. Probability = 16/52 = 4/13."
    },

    // --- TCS APTITUDE ---
    {
        content: "If A and B together can complete a piece of work in 15 days and B alone in 20 days, in how many days can A alone complete the work?",
        type: "Aptitude",
        category: "Quantitative",
        companies: ["TCS", "Infosys"],
        difficulty: "Medium",
        options: ["60 days", "45 days", "40 days", "30 days"],
        correctAnswer: "60 days",
        explanation: "A's 1 day work = (1/15) - (1/20) = (4-3)/60 = 1/60. So A alone takes 60 days."
    },

    // --- TECHNICAL (JAVA/OOP) ---
    {
        content: "Which of the following follows the 'Write Once, Run Anywhere' principle?",
        type: "Technical",
        category: "Java",
        companies: ["Google", "Amazon", "Microsoft", "TCS"],
        difficulty: "Easy",
        options: ["C++", "Java", "Python", "JavaScript"],
        correctAnswer: "Java",
        explanation: "Java's bytecode and JVM architecture allow it to run on any device with a compatible JVM."
    },
    {
        content: "What does the 'static' keyword mean in Java?",
        type: "Technical",
        category: "Java",
        companies: ["Amazon", "Microsoft"],
        difficulty: "Medium",
        options: ["Variable is constant", "Belongs to class not instance", "Visible only in package", "None of these"],
        correctAnswer: "Belongs to class not instance",
        explanation: "Static members belong to the class rather than any specific instance."
    },

    // --- TECHNICAL (DSA) ---
    {
        content: "Lowest Common Ancestor of a Binary Tree can be found in what time complexity?",
        type: "Technical",
        category: "DSA",
        companies: ["Amazon", "Google", "Microsoft"],
        difficulty: "Medium",
        options: ["O(n)", "O(h)", "O(n^2)", "O(log n)"],
        correctAnswer: "O(n)",
        explanation: "In the worst case, we might need to visit all nodes, so O(n)."
    },
    {
        content: "Which sorting algorithm is deemed the fastest in practice for general purposes?",
        type: "Technical",
        category: "DSA",
        companies: ["Google", "Microsoft"],
        difficulty: "Medium",
        options: ["Quick Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"],
        correctAnswer: "Quick Sort",
        explanation: "Quick Sort is generally the fastest in practice due to efficient memory usage and cache locality, despite O(n^2) worst case."
    },

    // --- HR ---
    {
        content: "Describe a situation where you had to handle a conflict within your team.",
        type: "HR",
        category: "Behavioral",
        companies: ["General"],
        difficulty: "Medium",
        options: [],
        correctAnswer: "",
        explanation: "Focus on communication, empathy, and how you reached a resolution."
    },
    {
        content: "Why do you think you are a good fit for this role?",
        type: "HR",
        category: "Behavioral",
        companies: ["General"],
        difficulty: "Easy",
        options: [],
        correctAnswer: "",
        explanation: "Link your skills and experience directly to the job description."
    }
];

async function seedDatabase() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error('MONGODB_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Clear existing questions
        await Question.deleteMany({});
        console.log('Cleared existing questions');

        // Insert new questions
        await Question.insertMany(questions);
        console.log(`Successfully seeded ${questions.length} questions.`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
