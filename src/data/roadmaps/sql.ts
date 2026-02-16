
import { RoadmapTrack } from './types';

export const sqlRoadmap: RoadmapTrack = {
    id: 'sql',
    title: 'SQL',
    description: 'Master Structured Query Language for data management',
    category: 'skill-based',
    icon: '🗃️',
    accentColor: '#e38c00',
    rootNodeId: 'sql-root',
    nodes: {
        'sql-root': {
            id: 'sql-root',
            label: 'SQL Mastery',
            description: 'Learn to query, manipulate, and manage relational databases with SQL.',
            children: ['sql-basics', 'sql-joins', 'sql-advanced', 'sql-optimization', 'sql-design'],
            resources: [
                { type: 'article', title: 'SQLBolt - Interactive Tutorial', url: 'https://sqlbolt.com/', isFree: true },
                { type: 'article', title: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/', isFree: true },
                { type: 'video', title: 'SQL Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', isFree: true },
                { type: 'article', title: 'LeetCode SQL Problems', url: 'https://leetcode.com/problemset/database/', isFree: true }
            ],
            content: {
                overview: 'SQL (Structured Query Language) is the standard language for interacting with relational databases. Every modern application stores data, and the vast majority of that data lives in relational databases like PostgreSQL, MySQL, SQLite, or SQL Server. SQL lets you create tables, insert data, query it with powerful filtering and aggregation, update records, and delete them. Unlike programming languages, SQL is declarative — you describe WHAT data you want, not HOW to get it. The database engine figures out the most efficient way to execute your query. SQL has been around since the 1970s and remains one of the most valuable and in-demand skills in software engineering, data science, and analytics.',
                keyConcepts: [
                    'Relational model: tables, rows, columns, and keys',
                    'CRUD operations: INSERT, SELECT, UPDATE, DELETE',
                    'Filtering with WHERE, LIKE, IN, BETWEEN',
                    'Sorting with ORDER BY and limiting with LIMIT/OFFSET',
                    'Aggregation: GROUP BY, HAVING, COUNT, SUM, AVG',
                    'Joins: INNER, LEFT, RIGHT, FULL, CROSS',
                    'Subqueries and Common Table Expressions (CTEs)',
                    'Indexes, transactions, and ACID properties'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between WHERE and HAVING?', hint: 'WHERE filters rows before grouping; HAVING filters groups after aggregation.', difficulty: 'medium' },
                    { question: 'What does ACID stand for?', hint: 'Atomicity, Consistency, Isolation, Durability — guarantees for database transactions.', difficulty: 'easy' },
                    { question: 'What is a primary key vs a foreign key?', hint: 'Primary key uniquely identifies a row. Foreign key references a primary key in another table.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always use parameterized queries to prevent SQL injection.',
                    'Add indexes on columns used frequently in WHERE and JOIN clauses.',
                    'Use transactions for operations that must succeed or fail together.',
                    'Normalize your database schema to reduce redundancy.',
                    'Write readable SQL with proper indentation and aliases.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'SQL Fundamentals', description: 'Basic queries and filtering.', tasks: ['Learn SELECT, FROM, WHERE, ORDER BY', 'Practice INSERT, UPDATE, DELETE', 'Use aggregate functions: COUNT, SUM, AVG, MAX, MIN'] },
                { day: 2, title: 'Joins and Subqueries', description: 'Combining data from multiple tables.', tasks: ['Master INNER JOIN, LEFT JOIN, RIGHT JOIN', 'Write subqueries and CTEs', 'Practice GROUP BY with HAVING'] },
                { day: 3, title: 'Database Design', description: 'Schema design and optimization.', tasks: ['Design a normalized database schema', 'Create indexes and analyze query plans', 'Practice with LeetCode SQL problems'] }
            ]
        },
        'sql-basics': {
            id: 'sql-basics',
            label: 'SQL Fundamentals',
            description: 'SELECT, INSERT, UPDATE, DELETE, filtering, sorting, and basic aggregation.',
            parentId: 'sql-root',
            resources: [
                { type: 'article', title: 'W3Schools SQL Tutorial', url: 'https://www.w3schools.com/sql/', isFree: true },
                { type: 'article', title: 'SQLZoo Interactive', url: 'https://sqlzoo.net/', isFree: true }
            ],
            content: {
                overview: 'SQL fundamentals start with the four core operations known as CRUD: Create (INSERT), Read (SELECT), Update (UPDATE), and Delete (DELETE). The SELECT statement is by far the most used — it retrieves data from one or more tables. You filter results with WHERE clauses, sort with ORDER BY, and limit output with LIMIT. Aggregate functions like COUNT, SUM, AVG, MIN, and MAX let you compute summary statistics. GROUP BY groups rows that share values so you can aggregate per group. The DISTINCT keyword removes duplicates. Understanding NULL values is also important — NULL represents missing data and behaves differently from zero or empty strings in comparisons.',
                keyConcepts: [
                    'SELECT with column selection and aliases',
                    'WHERE clause with operators: =, <>, >, <, LIKE, IN, BETWEEN',
                    'Wildcards: % (any characters) and _ (single character)',
                    'ORDER BY for sorting (ASC and DESC)',
                    'LIMIT and OFFSET for pagination',
                    'Aggregate functions: COUNT, SUM, AVG, MIN, MAX',
                    'GROUP BY and HAVING for grouped aggregation',
                    'NULL handling: IS NULL, IS NOT NULL, COALESCE'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between DELETE and TRUNCATE?', hint: 'DELETE removes rows one by one (can use WHERE); TRUNCATE removes all rows instantly but cannot be filtered.', difficulty: 'medium' },
                    { question: 'How does NULL behave in comparisons?', hint: 'NULL = NULL returns NULL (not true). You must use IS NULL to check for null values.', difficulty: 'medium' },
                    { question: 'Write a query to find the top 5 highest-paid employees.', hint: 'SELECT * FROM employees ORDER BY salary DESC LIMIT 5.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Specify column names explicitly instead of using SELECT *.',
                    'Use table and column aliases for readability.',
                    'Always test DELETE statements with a SELECT first.',
                    'Use COALESCE to provide default values for NULL columns.'
                ]
            }
        },
        'sql-joins': {
            id: 'sql-joins',
            label: 'Joins & Relationships',
            description: 'INNER, LEFT, RIGHT, FULL joins and understanding table relationships.',
            parentId: 'sql-root',
            resources: [
                { type: 'article', title: 'Visual Explanation of SQL Joins', url: 'https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/', isFree: true },
                { type: 'article', title: 'SQL Joins Visualizer', url: 'https://joins.spathon.com/', isFree: true }
            ],
            content: {
                overview: 'Joins are how you combine data from two or more tables based on related columns (usually foreign keys). An INNER JOIN returns only rows where there is a match in both tables. A LEFT JOIN returns all rows from the left table and matching rows from the right (NULLs where there is no match). A RIGHT JOIN is the reverse. A FULL OUTER JOIN returns all rows from both tables. A CROSS JOIN produces the Cartesian product (every combination). Self-joins let you join a table with itself, useful for hierarchical data. Understanding the different types of relationships (one-to-one, one-to-many, many-to-many) helps you design schemas that joins can efficiently query.',
                keyConcepts: [
                    'INNER JOIN: only matching rows',
                    'LEFT JOIN: all left rows + matching right rows',
                    'RIGHT JOIN: all right rows + matching left rows',
                    'FULL OUTER JOIN: all rows from both tables',
                    'CROSS JOIN: Cartesian product',
                    'Self-join for hierarchical data',
                    'One-to-one, one-to-many, many-to-many relationships',
                    'Junction/pivot tables for many-to-many'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between INNER JOIN and LEFT JOIN?', hint: 'INNER returns only matching rows; LEFT returns all left table rows even without a match.', difficulty: 'easy' },
                    { question: 'How do you model a many-to-many relationship?', hint: 'Use a junction (bridge) table with foreign keys to both related tables.', difficulty: 'medium' },
                    { question: 'What is a self-join and when would you use one?', hint: 'Joining a table with itself. Useful for employee-manager hierarchies or comparing rows within the same table.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always use explicit JOIN syntax instead of comma-separated tables.',
                    'Use meaningful table aliases in join queries.',
                    'Index foreign key columns for join performance.',
                    'Start with LEFT JOIN when you need all records from a primary table.'
                ]
            }
        },
        'sql-advanced': {
            id: 'sql-advanced',
            label: 'Advanced SQL',
            description: 'Window functions, CTEs, subqueries, stored procedures, and triggers.',
            parentId: 'sql-root',
            resources: [
                { type: 'article', title: 'Window Functions Tutorial', url: 'https://mode.com/sql-tutorial/sql-window-functions/', isFree: true },
                { type: 'article', title: 'Advanced SQL - StrataScratch', url: 'https://www.stratascratch.com/', isFree: true }
            ],
            content: {
                overview: 'Advanced SQL takes you beyond basic queries into powerful analytical features. Window functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, SUM OVER) perform calculations across a set of rows related to the current row without collapsing the result set like GROUP BY does. Common Table Expressions (CTEs) with the WITH keyword let you define named temporary result sets that make complex queries more readable. Recursive CTEs can handle hierarchical data like org charts. Subqueries can appear in WHERE, FROM, or SELECT clauses. Views create reusable virtual tables. Stored procedures and triggers execute server-side logic.',
                keyConcepts: [
                    'Window functions: ROW_NUMBER, RANK, DENSE_RANK',
                    'PARTITION BY and ORDER BY in window functions',
                    'LAG and LEAD for accessing previous/next rows',
                    'Running totals with SUM() OVER()',
                    'CTEs with WITH clause for readable complex queries',
                    'Recursive CTEs for hierarchical data',
                    'Correlated subqueries',
                    'Views, stored procedures, and triggers'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between RANK and DENSE_RANK?', hint: 'RANK leaves gaps after ties (1,1,3); DENSE_RANK does not (1,1,2).', difficulty: 'medium' },
                    { question: 'When would you use a CTE instead of a subquery?', hint: 'CTEs are more readable, can be referenced multiple times, and support recursion.', difficulty: 'medium' },
                    { question: 'Write a query to find the second highest salary.', hint: 'Use DENSE_RANK() window function or a subquery with LIMIT/OFFSET.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use CTEs to break complex queries into named, readable steps.',
                    'Use window functions instead of self-joins for row comparisons.',
                    'Be careful with correlated subqueries — they execute once per row and can be slow.',
                    'Create views for frequently used complex queries.'
                ]
            }
        },
        'sql-optimization': {
            id: 'sql-optimization',
            label: 'Query Optimization',
            description: 'Indexes, EXPLAIN plans, query tuning, and database performance.',
            parentId: 'sql-root',
            resources: [
                { type: 'article', title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', isFree: true },
                { type: 'article', title: 'PostgreSQL EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html', isFree: true }
            ],
            content: {
                overview: 'Query optimization is about making your SQL queries run fast, especially as data grows to millions or billions of rows. Indexes are the primary tool — they are data structures (usually B-trees) that allow the database to find rows without scanning the entire table. The EXPLAIN command shows the query execution plan, revealing whether indexes are being used and where bottlenecks are. Common performance issues include missing indexes, unnecessary full table scans, N+1 queries, and selecting more columns than needed. Understanding how indexes work (B-tree vs hash, composite indexes, covering indexes) helps you design schemas that perform well at scale.',
                keyConcepts: [
                    'EXPLAIN and EXPLAIN ANALYZE for query plans',
                    'B-tree indexes and how they work',
                    'Composite (multi-column) indexes',
                    'Index selectivity and cardinality',
                    'Full table scans vs index scans',
                    'Query plan reading: Seq Scan, Index Scan, Hash Join',
                    'N+1 query problem and batch loading',
                    'Connection pooling and caching strategies'
                ],
                practiceQuestions: [
                    { question: 'When should you NOT add an index?', hint: 'On columns with very low cardinality (like boolean), on small tables, or on tables with heavy write operations.', difficulty: 'hard' },
                    { question: 'What does EXPLAIN ANALYZE show that EXPLAIN does not?', hint: 'EXPLAIN ANALYZE actually runs the query and shows real execution times, not just estimates.', difficulty: 'medium' },
                    { question: 'What is a covering index?', hint: 'An index that contains all columns needed by a query, so the database does not need to look up the actual table row.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always EXPLAIN slow queries before trying to optimize them.',
                    'Index columns that appear in WHERE, JOIN, and ORDER BY clauses.',
                    'Avoid SELECT * — only fetch the columns you need.',
                    'Use ANALYZE to keep table statistics up to date for the query planner.',
                    'Be cautious with too many indexes — they slow down writes.'
                ]
            }
        },
        'sql-design': {
            id: 'sql-design',
            label: 'Database Design',
            description: 'Normalization, schema design, ER diagrams, and migration strategies.',
            parentId: 'sql-root',
            resources: [
                { type: 'article', title: 'Database Normalization Explained', url: 'https://www.guru99.com/database-normalization.html', isFree: true },
                { type: 'article', title: 'dbdiagram.io', url: 'https://dbdiagram.io/', isFree: true }
            ],
            content: {
                overview: 'Good database design is the foundation of any successful application. Normalization is the process of organizing tables to reduce data redundancy and ensure data integrity. The main normal forms are 1NF (atomic values), 2NF (no partial dependencies), and 3NF (no transitive dependencies). While normalization reduces duplication, sometimes controlled denormalization is necessary for read performance. Entity-Relationship (ER) diagrams visually map out tables, columns, and their relationships before writing any SQL. Schema migrations let you evolve your database structure over time in a version-controlled way. Choosing the right data types, constraints (NOT NULL, UNIQUE, CHECK, DEFAULT), and keys is critical for data quality.',
                keyConcepts: [
                    'Normalization: 1NF, 2NF, 3NF, BCNF',
                    'Denormalization for read performance',
                    'Entity-Relationship (ER) diagrams',
                    'Primary keys: natural vs surrogate (UUID, serial)',
                    'Foreign key constraints and cascading',
                    'Data types: choosing the right type for each column',
                    'Constraints: NOT NULL, UNIQUE, CHECK, DEFAULT',
                    'Schema migrations with version control'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between 2NF and 3NF?', hint: '2NF removes partial dependencies on composite keys; 3NF removes transitive dependencies on non-key columns.', difficulty: 'hard' },
                    { question: 'When would you denormalize a database?', hint: 'When read performance is critical and you want to avoid expensive joins on frequently queried data.', difficulty: 'medium' },
                    { question: 'Should you use auto-increment IDs or UUIDs for primary keys?', hint: 'Auto-increment for internal-only IDs; UUIDs when IDs are exposed externally or in distributed systems.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Design your schema with ER diagrams before writing any code.',
                    'Start normalized, then denormalize only when you have proven performance needs.',
                    'Use foreign key constraints to enforce data integrity.',
                    'Always use schema migrations — never modify production databases manually.',
                    'Document your schema decisions for future team members.'
                ]
            }
        }
    }
};
