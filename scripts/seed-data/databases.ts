import { dbmsTopics } from "./databases/dbms";
import { dataWarehousingTopics } from "./databases/data-warehousing";

export const databaseSubjects = [
    {
        name: "Database Management Systems",
        slug: "dbms",
        category: "Data and Database Technologies",
        description: "Relational models, SQL, normalization, transactions, and NoSQL databases.",
        icon: "database",
        difficulty: "Intermediate",
        estimatedHours: 45,
        prerequisites: ["computer-fundamentals"],
        order: 1,
        topics: dbmsTopics
    },
    {
        name: "Data Warehousing",
        slug: "data-warehousing",
        category: "Data and Database Technologies",
        description: "OLAP, ETL processes, star/snowflake schemas, and data mining foundations.",
        icon: "box",
        difficulty: "Advanced",
        estimatedHours: 40,
        prerequisites: ["dbms"],
        order: 2,
        topics: dataWarehousingTopics
    }
];
