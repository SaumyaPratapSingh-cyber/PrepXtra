// Computer Science Core Foundations Subjects Seed Data
import { computerFundamentalsTopics } from "./foundations/computer-fundamentals";
import { engineeringMathematicsTopics } from "./foundations/engineering-math";
import { mathForCSTopics } from "./foundations/math-for-cs";

export const coreFoundationsSubjects = [
    {
        name: "Computer Fundamentals",
        slug: "computer-fundamentals",
        category: "Computer Science Core Foundations",
        description: "Number systems, data representation, Boolean algebra, digital logic, computer architecture basics, and fundamental computing concepts.",
        icon: "cpu",
        difficulty: "Beginner",
        estimatedHours: 40,
        prerequisites: [],
        order: 1,
        topics: computerFundamentalsTopics
    },
    {
        name: "Engineering Mathematics",
        slug: "engineering-mathematics",
        category: "Computer Science Core Foundations",
        description: "Calculus, linear algebra, probability, statistics, and numerical methods essential for computer science.",
        icon: "calculator",
        difficulty: "Intermediate",
        estimatedHours: 50,
        prerequisites: [],
        order: 2,
        topics: engineeringMathematicsTopics
    },
    {
        name: "Mathematics for Computer Science",
        slug: "mathematics-for-computer-science",
        category: "Computer Science Core Foundations",
        description: "Sets, relations, functions, mathematical logic, graph theory, and other discrete structures.",
        icon: "functions",
        difficulty: "Intermediate",
        estimatedHours: 45,
        prerequisites: [],
        order: 3,
        topics: mathForCSTopics
    }
];
