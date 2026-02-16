import { softwareEngineeringTopics } from "./programming-dev/software-engineering";
import { softwareTestingTopics } from "./programming-dev/software-testing";
import { webTechnologyTopics } from "./programming-dev/web-technology";
import { systemDesignTopics } from "./programming-dev/system-design";

export const programmingDevSubjects = [
    {
        name: "Software Engineering & SDLC",
        slug: "software-engineering",
        category: "Programming & Software Development",
        description: "Development models (Agile, Waterfall), requirement engineering, software design, and modularization.",
        icon: "code",
        difficulty: "Intermediate",
        estimatedHours: 40,
        prerequisites: [],
        order: 1,
        topics: softwareEngineeringTopics
    },
    {
        name: "Software Testing",
        slug: "software-testing",
        category: "Programming & Software Development",
        description: "Unit testing, integration testing, system testing, regression, and automated testing frameworks.",
        icon: "check-circle",
        difficulty: "Intermediate",
        estimatedHours: 35,
        prerequisites: ["software-engineering"],
        order: 2,
        topics: softwareTestingTopics
    },
    {
        name: "Web Technology",
        slug: "web-technology",
        category: "Programming & Software Development",
        description: "HTML5, CSS3, Modern JavaScript (ES6+), React fundamentals, and web performance optimization.",
        icon: "globe",
        difficulty: "Beginner",
        estimatedHours: 50,
        prerequisites: [],
        order: 3,
        topics: webTechnologyTopics
    },
    {
        name: "System Design",
        slug: "system-design",
        category: "Programming & Software Development",
        description: "Scalability, load balancing, caching, microservices, and high-level architectural patterns.",
        icon: "layout",
        difficulty: "Advanced",
        estimatedHours: 45,
        prerequisites: ["computer-networks", "operating-systems"],
        order: 4,
        topics: systemDesignTopics
    }
];
