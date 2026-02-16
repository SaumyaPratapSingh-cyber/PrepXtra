// Data Science Subjects Seed Data
import { machineLearningTopics } from "./data-science/machine-learning";
import { artificialIntelligenceTopics } from "./data-science/artificial-intelligence";
import { dataAnalysisTopics } from "./data-science/data-analysis";
import { dataScienceLifecycleTopics } from "./data-science/data-science-lifecycle";

export const dataScienceSubjects = [
    {
        name: "Machine Learning Tutorial",
        slug: "machine-learning",
        category: "Data Science",
        description: "Supervised, unsupervised, and reinforcement learning algorithms with practical implementations.",
        icon: "brain",
        difficulty: "Advanced",
        estimatedHours: 60,
        prerequisites: ["engineering-mathematics"],
        order: 1,
        topics: machineLearningTopics
    },
    {
        name: "Artificial Intelligence Tutorial",
        slug: "artificial-intelligence",
        category: "Data Science",
        description: "Search algorithms, knowledge representation, NLP, computer vision, and reinforcement learning.",
        icon: "bot",
        difficulty: "Advanced",
        estimatedHours: 50,
        prerequisites: ["machine-learning"],
        order: 2,
        topics: artificialIntelligenceTopics
    },
    {
        name: "Data Analysis Tutorial",
        slug: "data-analysis",
        category: "Data Science",
        description: "Statistics, visualization, EDA, pandas, and data wrangling.",
        icon: "bar-chart-3",
        difficulty: "Intermediate",
        estimatedHours: 35,
        prerequisites: [],
        order: 3,
        topics: dataAnalysisTopics
    },
    {
        name: "Data Science Tutorial",
        slug: "data-science-tutorial",
        category: "Data Science",
        description: "End-to-end data science workflow, big data, MLOps, and deployment.",
        icon: "flask-conical",
        difficulty: "Advanced",
        estimatedHours: 40,
        prerequisites: ["machine-learning", "data-analysis"],
        order: 4,
        topics: dataScienceLifecycleTopics
    }
];
