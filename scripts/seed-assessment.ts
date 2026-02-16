
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Question from '../src/models/Question';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const questions = [
    // --- APTITUDE: QUANTITATIVE (10 Questions) ---
    {
        content: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        type: "Aptitude", category: "Quantitative", companies: ["Google", "TCS", "General"], difficulty: "Medium",
        options: ["120 metres", "180 metres", "324 metres", "150 metres"], correctAnswer: "150 metres",
        explanation: "Speed = 60 * (5/18) = 50/3 m/sec. Length = (50/3) * 9 = 150 metres."
    },
    {
        content: "If 20% of a = b, then b% of 20 is the same as:",
        type: "Aptitude", category: "Quantitative", companies: ["Amazon", "General"], difficulty: "Easy",
        options: ["4% of a", "5% of a", "20% of a", "None of these"], correctAnswer: "4% of a",
        explanation: "0.2a = b. b% of 20 = (0.2a/100)*20 = 0.04a = 4% of a."
    },
    {
        content: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Medium",
        options: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"], correctAnswer: "Rs. 698",
        explanation: "S.I. for 1 year = 854 - 815 = 39. S.I. for 3 years = 39 * 3 = 117. Sum = 815 - 117 = 698."
    },
    {
        content: "The ratio between the speeds of two trains is 7:8. If the second train runs 400 km in 4 hours, then the speed of the first train is:",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Medium",
        options: ["70 km/hr", "75 km/hr", "84 km/hr", "87.5 km/hr"], correctAnswer: "87.5 km/hr",
        explanation: "Speed of 2nd = 400/4 = 100 km/hr. 8 units = 100 => 1 unit = 12.5. Speed of 1st = 7 * 12.5 = 87.5 km/hr."
    },
    {
        content: "A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Easy",
        options: ["3.6", "7.2", "8.4", "10"], correctAnswer: "7.2",
        explanation: "Speed = 600 / (5 * 60) = 2 m/sec. In km/hr = 2 * (18/5) = 7.2 km/hr."
    },
    {
        content: "The average of 20 numbers is zero. Of them, at the most, how many may be greater than zero?",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Hard",
        options: ["0", "1", "10", "19"], correctAnswer: "19",
        explanation: "If 19 numbers are positive, the 20th can be a large negative such that the sum is zero."
    },
    {
        content: "If one-third of one-fourth of a number is 15, then three-tenths of that number is:",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Medium",
        options: ["35", "36", "45", "54"], correctAnswer: "54",
        explanation: "(1/3)*(1/4)*x = 15 => x = 15*12 = 180. (3/10)*180 = 54."
    },
    {
        content: "A shopkeeper expects a gain of 22.5% on his cost price. If in a week, his sale was of Rs. 392, what was his profit?",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Hard",
        options: ["Rs. 18.20", "Rs. 70", "Rs. 72", "Rs. 88.25"], correctAnswer: "Rs. 72",
        explanation: "C.P = (100 / 122.5) * 392 = 320. Profit = 392 - 320 = 72."
    },
    {
        content: "The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Medium",
        options: ["200 m", "225 m", "245 m", "250 m"], correctAnswer: "245 m",
        explanation: "Speed = 45 * (5/18) = 12.5 m/s. Total Dist = 12.5 * 30 = 375. Bridge = 375 - 130 = 245 m."
    },
    {
        content: "A and B together can do a piece of work in 8 days. If A alone can do the same work in 12 days, then B alone can do the same work in:",
        type: "Aptitude", category: "Quantitative", companies: ["General"], difficulty: "Easy",
        options: ["18 days", "24 days", "28 days", "30 days"], correctAnswer: "24 days",
        explanation: "1/B = 1/8 - 1/12 = (3-2)/24 = 1/24. B = 24 days."
    },

    // --- APTITUDE: LOGICAL REASONING (10 Questions) ---
    {
        content: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
        type: "Aptitude", category: "Logical Reasoning", companies: ["Google", "Microsoft", "General"], difficulty: "Easy",
        options: ["40", "42", "44", "46"], correctAnswer: "42",
        explanation: "Pattern: 1*2, 2*3, 3*4, 4*5, 5*6. Next: 6*7 = 42."
    },
    {
        content: "Looking at a portrait of a man, Harsh said, 'His mother is the wife of my father's son. Brothers and sisters I have none.' At whose portrait was Harsh looking?",
        type: "Aptitude", category: "Logical Reasoning", companies: ["Amazon", "General"], difficulty: "Hard",
        options: ["His son", "His cousin", "His uncle", "His nephew"], correctAnswer: "His son",
        explanation: "Harsh is the only child. 'Father's son' is Harsh. The man's mother is Harsh's wife. Man is Harsh's son."
    },
    {
        content: "If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that code?",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Easy",
        options: ["CPNCBX", "CPNCBZ", "CPOCBZ", "CQOCBZ"], correctAnswer: "CPNCBZ",
        explanation: "Each letter is replaced by the next letter in the alphabet."
    },
    {
        content: "SCD, TEF, UGH, ____, WKL",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Easy",
        options: ["CMN", "UJI", "VIJ", "IJT"], correctAnswer: "VIJ",
        explanation: "First letters: STUVW. Second/Third letters: CD, EF, GH, IJ, KL."
    },
    {
        content: "Statement: Should all the drugs patents be abolished? Arguments: I. Yes. This will make life-saving drugs available at cheaper rates. II. No. It will discourage R&D in the pharmaceutical industry.",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Hard",
        options: ["Only I is strong", "Only II is strong", "Both are strong", "Neither is strong"], correctAnswer: "Both are strong",
        explanation: "Both arguments touch on valid socio-economic concerns."
    },
    {
        content: "If 'P × Q' means 'P is the brother of Q'; 'P - Q' means 'P is the sister of Q' and 'P + Q' means 'P is the father of Q', which of the following means 'M is the nephew of N'?",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Hard",
        options: ["N - K + M", "N × K + M", "N - K × M", "N × K - M"], correctAnswer: "N - K + M",
        explanation: "N is sister of K, K is father of M. Since M's gender is not explicitly 'nephew' check structure. Usually M must be male. Assuming 'M' in Q is male."
    },
    {
        content: "Find the odd one out: 3, 5, 11, 14, 17, 21",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Medium",
        options: ["14", "17", "11", "21"], correctAnswer: "14",
        explanation: "All others are odd numbers. 14 is even."
    },
    {
        content: "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Medium",
        options: ["Grandmother", "Grandfather", "Daughter", "Granddaughter"], correctAnswer: "Granddaughter",
        explanation: "A and B are siblings. C is their mother. D is C's father. So A is D's granddaughter."
    },
    {
        content: "Point out the missing number: 8, 24, 12, 36, 18, 54, (....)",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Easy",
        options: ["27", "108", "68", "72"], correctAnswer: "27",
        explanation: "Pattern: *3, /2, *3, /2. 54 / 2 = 27."
    },
    {
        content: "What is the day on 1st January 2001?",
        type: "Aptitude", category: "Logical Reasoning", companies: ["General"], difficulty: "Hard",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correctAnswer: "Monday",
        explanation: "2000 years have 0 odd days. 1st Jan 2001 is the 1st day of the new century (Monday)."
    },

    // --- APTITUDE: ENGLISH (10 Questions) ---
    {
        content: "Choose the word which is most nearly the same in meaning to 'VIGILANT'.",
        type: "Aptitude", category: "English", companies: ["Microsoft", "General"], difficulty: "Medium",
        options: ["Smart", "Watchful", "Strong", "Careless"], correctAnswer: "Watchful",
        explanation: "Vigilant means keeping careful watch for possible danger."
    },
    {
        content: "Identify the part of the sentence which contains an error: 'Neither of the plans (A) / suits to (B) / my requirements (C) / No error (D)'.",
        type: "Aptitude", category: "English", companies: ["TCS", "General"], difficulty: "Medium",
        options: ["A", "B", "C", "D"], correctAnswer: "B",
        explanation: "Correct usage is 'suits' instead of 'suits to'."
    },
    {
        content: "Choose the word opposite in meaning to 'ARTIFICIAL'.",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Easy",
        options: ["Natural", "Solid", "Truthful", "Red"], correctAnswer: "Natural",
        explanation: "Natural is the direct antonym of artificial."
    },
    {
        content: "Fill in the blank: He is ______ than his brother.",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Easy",
        options: ["elder", "older", "old", "biggest"], correctAnswer: "older",
        explanation: "'Older' is used for comparison between two people."
    },
    {
        content: "Select the correctly spelled word.",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Medium",
        options: ["Accomodate", "Acomodate", "Accommodate", "Acommodate"], correctAnswer: "Accommodate",
        explanation: "The correct spelling is 'Accommodate' with double 'c' and double 'm'."
    },
    {
        content: "Change the voice: 'The boy laughed at the beggar.'",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Medium",
        options: ["The beggar was laughed by the boy.", "The beggar was being laughed by the boy.", "The beggar was laughed at by the boy.", "None of these"], correctAnswer: "The beggar was laughed at by the boy.",
        explanation: "Passive voice maintains the preposition 'at'."
    },
    {
        content: "Synonym of 'ABANDON'.",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Easy",
        options: ["Keep", "Forsake", "Adopt", "Cherish"], correctAnswer: "Forsake",
        explanation: "Abandon and forsake both mean to leave or desert."
    },
    {
        content: "Antonym of 'OPTIMIST'.",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Easy",
        options: ["Pessimist", "Idealist", "Realist", "Pragmatist"], correctAnswer: "Pessimist",
        explanation: "Pessimist is the person who looks at the dark side of things."
    },
    {
        content: "Idiom: 'To cry wolf' means:",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Medium",
        options: ["To listen eagerly", "To give false alarm", "To turn pale", "To keep off starvation"], correctAnswer: "To give false alarm",
        explanation: "To cry wolf is to call for help when it is not needed."
    },
    {
        content: "One word substitution: 'A person who does not believe in God.'",
        type: "Aptitude", category: "English", companies: ["General"], difficulty: "Easy",
        options: ["Theist", "Atheist", "Ascetic", "Believer"], correctAnswer: "Atheist",
        explanation: "Atheist is a person who disbelieves or lacks belief in the existence of G-d."
    },

    // --- TECHNICAL (Adding a few to ensure DB doesn't feel empty) ---
    {
        content: "Which data structure is best suited for implementing a LIFO behavior?",
        type: "Technical", category: "DSA", companies: ["Google", "Amazon", "General"], difficulty: "Easy",
        options: ["Queue", "Stack", "Linked List", "Tree"], correctAnswer: "Stack",
        explanation: "Stack follows Last-In, First-Out (LIFO)."
    },
    {
        content: "In Java, what is the default value of a local variable?",
        type: "Technical", category: "Java", companies: ["Amazon", "General"], difficulty: "Medium",
        options: ["0", "null", "Undefined", "None of these"], correctAnswer: "None of these",
        explanation: "Local variables must be initialized before use in Java."
    },

    // --- HR ---
    {
        content: "Why do you want to join this company specifically?",
        type: "HR", category: "Behavioral", companies: ["General"], difficulty: "Medium",
        options: [], correctAnswer: "",
        explanation: "Explain your alignment with the company's culture and mission."
    }
];

async function seedDatabase() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) { console.error('MONGODB_URI is not defined'); process.exit(1); }
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
        await Question.deleteMany({});
        console.log('Cleared existing questions');
        await Question.insertMany(questions);
        console.log(`Successfully seeded ${questions.length} questions.`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
