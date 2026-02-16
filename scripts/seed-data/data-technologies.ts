// Data and Database Technologies Subjects Seed Data
export const dataTechnologiesSubjects = [
    {
        name: "Database Management System (DBMS)",
        slug: "dbms",
        category: "Data and Database Technologies",
        description: "Relational databases, SQL, normalization, transactions, indexing, and database design principles.",
        icon: "database",
        difficulty: "Intermediate",
        estimatedHours: 45,
        prerequisites: [],
        order: 1,
        topics: [
            {
                title: "Introduction to DBMS",
                slug: "dbms-introduction",
                description: "Database types, DBMS architecture, data models, and schemas.",
                order: 1, estimatedMinutes: 45, difficulty: "Easy",
                content: `
# Introduction to DBMS

## What is a DBMS?
Software that manages databases — stores, retrieves, and manipulates data efficiently.

## File System vs DBMS

| Feature | File System | DBMS |
|---------|------------|------|
| Data Redundancy | High | Controlled |
| Data Integrity | Manual | Enforced (constraints) |
| Concurrent Access | Problematic | Managed (locks, MVCC) |
| Security | Basic (file permissions) | Fine-grained (row/column level) |
| Crash Recovery | None | Automatic (WAL, checkpoints) |

## Database Types
- **Relational (SQL)**: MySQL, PostgreSQL, Oracle. Tables with rows/columns.
- **Document (NoSQL)**: MongoDB, CouchDB. JSON-like documents.
- **Key-Value**: Redis, DynamoDB. Fast lookups.
- **Graph**: Neo4j. Relationships between entities.
- **Column-Family**: Cassandra, HBase. Write-heavy workloads.

## Three-Schema Architecture
1. **External Schema** (View Level): What users see
2. **Conceptual Schema** (Logical Level): What data exists and relationships
3. **Internal Schema** (Physical Level): How data is stored on disk

## ER Model Diagram
\`\`\`mermaid
erDiagram
    STUDENT ||--o{ ENROLLMENT : enrolls
    COURSE ||--o{ ENROLLMENT : has
    STUDENT { int id PK; string name; string email }
    COURSE { int id PK; string title; int credits }
    ENROLLMENT { int student_id FK; int course_id FK; string grade }
\`\`\`
`, resources: []
            },
            {
                title: "Relational Model",
                slug: "relational-model",
                description: "Tables, keys, relationships, relational algebra, and relational calculus.",
                order: 2, estimatedMinutes: 55, difficulty: "Easy",
                content: `
# Relational Model

Data organized as **relations** (tables) with **tuples** (rows) and **attributes** (columns).

## Keys

| Key Type | Description |
|----------|-------------|
| Super Key | Any set of attributes uniquely identifying a tuple |
| Candidate Key | Minimal super key |
| Primary Key | Chosen candidate key (unique, not null) |
| Foreign Key | References primary key of another table |
| Composite Key | Primary key with 2+ attributes |

## Relational Algebra (Procedural)
| Operation | Symbol | Description |
|-----------|--------|-------------|
| Select | σ | Filter rows by condition |
| Project | π | Choose specific columns |
| Union | ∪ | Combine tuples from two relations |
| Difference | − | Tuples in R but not S |
| Cartesian Product | × | All combinations |
| Join | ⋈ | Combine matching tuples |

## Integrity Constraints
- **Entity Integrity**: Primary key cannot be NULL
- **Referential Integrity**: Foreign key must reference valid primary key (or be NULL)
- **Domain Constraint**: Values must be from valid domain
- **Key Constraint**: Primary key must be unique
`, resources: []
            },
            {
                title: "SQL Fundamentals",
                slug: "sql-fundamentals",
                description: "DDL, DML, DCL, SELECT, INSERT, JOINs, subqueries, and advanced SQL.",
                order: 3, estimatedMinutes: 70, difficulty: "Easy",
                content: `
# SQL Fundamentals

## SQL Categories
- **DDL**: CREATE, ALTER, DROP, TRUNCATE
- **DML**: SELECT, INSERT, UPDATE, DELETE
- **DCL**: GRANT, REVOKE
- **TCL**: COMMIT, ROLLBACK, SAVEPOINT

## JOINs

| Type | Returns |
|------|---------|
| INNER JOIN | Matching rows in both tables |
| LEFT JOIN | All left + matching right (NULL if no match) |
| RIGHT JOIN | All right + matching left |
| FULL JOIN | All from both (NULL where no match) |
| CROSS JOIN | Cartesian product (all combinations) |
| SELF JOIN | Table joined with itself |

## Advanced SQL Examples
\`\`\`sql
-- Window Functions
SELECT name, department, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
    AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;

-- CTE (Common Table Expression)
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 100000
)
SELECT department, COUNT(*) FROM high_earners GROUP BY department;

-- Subqueries
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- EXISTS
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

## Aggregate Functions
GROUP BY + HAVING for filtered aggregations.
\`\`\`sql
SELECT department, COUNT(*), AVG(salary), MAX(salary)
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY AVG(salary) DESC;
\`\`\`
`, resources: [{ title: "SQL Fiddle", type: "tool", url: "https://sqlfiddle.com/" }]
            },
            {
                title: "Normalization",
                slug: "normalization",
                description: "1NF through BCNF, functional dependencies, and denormalization.",
                order: 4, estimatedMinutes: 60, difficulty: "Medium",
                content: `
# Normalization

Organizing data to reduce redundancy and improve data integrity.

## Functional Dependencies
X → Y means X uniquely determines Y.
- **Full FD**: Y depends on ALL of X (not a subset).
- **Partial FD**: Y depends on part of X.
- **Transitive FD**: X → Y → Z, so X → Z transitively.

## Normal Forms

### 1NF (First Normal Form)
- Atomic values (no arrays, no nested tables)
- Unique column names, unique rows

### 2NF
- In 1NF + No Partial Dependencies
- Every non-key attribute depends on the ENTIRE primary key

### 3NF
- In 2NF + No Transitive Dependencies
- Non-key attributes depend ONLY on the primary key

### BCNF (Boyce-Codd)
- For every FD X → Y, X must be a superkey
- Stricter than 3NF

## Example
| StudentID | CourseID | CourseName | Instructor |
|-----------|---------|------------|-----------|
| 1 | CS101 | Algorithms | Dr. A |
| 2 | CS101 | Algorithms | Dr. A |

- **Problem**: CourseName depends on CourseID (partial dependency if PK is StudentID+CourseID)
- **Fix**: Split into Students(StudentID, CourseID) and Courses(CourseID, CourseName, Instructor)

## Denormalization
Intentionally adding redundancy for **read performance** (fewer JOINs).
Common in data warehouses and read-heavy applications.
`, resources: []
            },
            {
                title: "Transactions and Concurrency",
                slug: "transactions-concurrency",
                description: "ACID properties, isolation levels, locking, and MVCC.",
                order: 5, estimatedMinutes: 65, difficulty: "Medium",
                content: `
# Transactions and Concurrency

## ACID Properties
1. **Atomicity**: All or nothing
2. **Consistency**: Valid state before and after
3. **Isolation**: Concurrent transactions don't interfere
4. **Durability**: Committed data survives crashes

## Concurrency Problems

| Problem | Description |
|---------|-------------|
| Dirty Read | Read uncommitted data |
| Non-repeatable Read | Same query, different results |
| Phantom Read | New rows appear during transaction |
| Lost Update | Two writes, one overwritten |

## Isolation Levels

| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|-----------|----------------|---------|
| Read Uncommitted | ✓ | ✓ | ✓ |
| Read Committed | ✗ | ✓ | ✓ |
| Repeatable Read | ✗ | ✗ | ✓ |
| Serializable | ✗ | ✗ | ✗ |

## Locking
- **Shared Lock (S)**: For reads. Multiple readers OK.
- **Exclusive Lock (X)**: For writes. Only one holder.
- **Two-Phase Locking (2PL)**: Growing phase (acquire locks) → Shrinking phase (release locks). Guarantees serializability.

## MVCC (Multi-Version Concurrency Control)
Each transaction sees a snapshot of the database.
- Readers don't block writers, writers don't block readers.
- Used by PostgreSQL, MySQL InnoDB.
`, resources: []
            },
            {
                title: "Indexing and Query Optimization",
                slug: "indexing-optimization",
                description: "B-trees, hash indexes, query execution plans, and performance tuning.",
                order: 6, estimatedMinutes: 65, difficulty: "Hard",
                content: `
# Indexing and Query Optimization

## Index Types

| Type | Best For | Example |
|------|----------|---------|
| B-Tree | Range queries, ORDER BY | Default in most DBs |
| Hash | Equality checks (=) | Key-value lookups |
| GIN | Full-text search, arrays | PostgreSQL text search |
| GiST | Spatial queries | PostGIS geographic data |
| Bitmap | Low-cardinality columns | Gender, Status fields |

## B-Tree Structure
Balanced tree where each node has multiple keys. Keeps data sorted. O(log n) search.

## When to Index
✅ Columns in WHERE, JOIN, ORDER BY
✅ High cardinality columns
✅ Frequently queried columns
❌ Small tables
❌ Frequently updated columns (index maintenance overhead)
❌ Low cardinality (e.g., boolean)

## EXPLAIN (Query Plan)
\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@test.com';
-- Shows: Seq Scan vs Index Scan, cost, rows, actual time
\`\`\`

## Optimization Tips
1. Avoid SELECT * — select only needed columns
2. Use indexes on JOIN conditions and WHERE clauses
3. Avoid functions on indexed columns: WHERE YEAR(date)=2024 ❌
4. Use LIMIT for pagination
5. Denormalize for read-heavy workloads
6. Use connection pooling (PgBouncer, HikariCP)
`, resources: []
            },
            {
                title: "NoSQL Databases",
                slug: "nosql-databases",
                description: "Document, key-value, column-family, and graph databases.",
                order: 7, estimatedMinutes: 55, difficulty: "Medium",
                content: `
# NoSQL Databases

## When to Use NoSQL
- Flexible/evolving schema
- Horizontal scalability needed
- High volume reads/writes
- Complex data structures (nested, hierarchical)

## Types Comparison

| Type | Example | Data Model | Best For |
|------|---------|-----------|----------|
| Document | MongoDB | JSON documents | Content management, user profiles |
| Key-Value | Redis | Key→Value pairs | Caching, sessions, leaderboards |
| Column-Family | Cassandra | Wide columns | Time series, IoT data |
| Graph | Neo4j | Nodes + Edges | Social networks, recommendations |

## MongoDB Example
\`\`\`javascript
// Insert
db.users.insertOne({
    name: "Alice",
    email: "alice@example.com",
    skills: ["Python", "ML"],
    address: { city: "NYC", zip: "10001" }
});

// Find with filter
db.users.find({ "address.city": "NYC", skills: "Python" });

// Aggregation pipeline
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$product", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
    { $limit: 10 }
]);
\`\`\`

## SQL vs NoSQL

| Feature | SQL | NoSQL |
|---------|-----|-------|
| Schema | Fixed (predefined) | Dynamic (schema-less) |
| Scaling | Vertical (scale up) | Horizontal (scale out) |
| ACID | Full support | Varies (eventual consistency) |
| Joins | Native support | Application-level |
| Best For | Complex queries, transactions | Flexibility, scale |
`, resources: []
            },
            {
                title: "Database Design and ER Modeling",
                slug: "database-design",
                description: "Entity-relationship diagrams, cardinality, and database design best practices.",
                order: 8, estimatedMinutes: 50, difficulty: "Medium",
                content: `
# Database Design

## ER Diagram Components
- **Entity**: Rectangle (e.g., Student, Course)
- **Attribute**: Oval (e.g., name, email)
- **Relationship**: Diamond (e.g., enrolls_in)
- **Primary Key**: Underlined attribute

## Cardinality

| Type | Notation | Example |
|------|----------|---------|
| One-to-One (1:1) | || — || | User – Profile |
| One-to-Many (1:N) | || — o{ | Department – Employees |
| Many-to-Many (M:N) | }o — o{ | Students – Courses |

M:N requires a **junction table** (e.g., Enrollment).

## Design Best Practices
1. Identify entities and relationships first
2. Define primary keys for each table
3. Normalize to at least 3NF
4. Use appropriate data types (don't store numbers as strings)
5. Add indexes on frequently queried columns
6. Use foreign keys to enforce referential integrity
7. Consider future scalability
8. Document your schema
`, resources: []
            }
        ]
    },
    {
        name: "Data Warehousing",
        slug: "data-warehousing",
        category: "Data and Database Technologies",
        description: "Data warehouse architecture, ETL, OLAP, dimensional modeling, and business intelligence.",
        icon: "warehouse",
        difficulty: "Advanced",
        estimatedHours: 30,
        prerequisites: ["dbms"],
        order: 2,
        topics: [
            {
                title: "Data Warehouse Architecture",
                slug: "dw-architecture",
                description: "Star schema, snowflake schema, and data warehouse components.",
                order: 1, estimatedMinutes: 55, difficulty: "Medium",
                content: `
# Data Warehouse Architecture

A **data warehouse** is a centralized repository of integrated data from multiple sources, optimized for analysis.

## OLTP vs OLAP

| Feature | OLTP | OLAP |
|---------|------|------|
| Purpose | Day-to-day operations | Analysis and reporting |
| Queries | Simple, frequent | Complex, analytical |
| Data | Current | Historical |
| Normalization | Highly normalized | Denormalized |
| Users | Clerks, customers | Analysts, managers |

## Star Schema
- **Fact Table**: Central table with measures (sales amount, quantity)
- **Dimension Tables**: Surrounding tables with descriptive attributes (product, time, location)
- Simple, fast queries.

## Snowflake Schema
- Dimension tables are normalized (split into sub-dimensions)
- Less redundancy, but more complex queries.

## Data Warehouse Layers
1. **Staging**: Raw data landing zone
2. **Integration**: Clean, transform, combine
3. **Access**: Marts optimized for departments
`, resources: []
            },
            {
                title: "ETL Processes",
                slug: "etl-processes",
                description: "Extract, Transform, Load operations and data pipelines.",
                order: 2, estimatedMinutes: 60, difficulty: "Medium",
                content: `
# ETL Processes

## Extract
Pull data from sources: databases, APIs, files, streams.
- **Full Extract**: All data every time (simple but slow)
- **Incremental Extract**: Only changed data (faster, more complex)

## Transform
Clean, standardize, and enrich data.
- Data cleansing (handle NULLs, duplicates)
- Type conversion
- Aggregation
- Business rule application
- Data validation

## Load
Insert into target data warehouse.
- **Full Load**: Replace all data. Simple but slow.
- **Incremental Load**: Insert/update only changes.
- **Upsert**: Insert if new, update if exists.

## ETL vs ELT

| Feature | ETL | ELT |
|---------|-----|-----|
| Transform | Before loading | After loading |
| Best For | On-premise, structured data | Cloud, big data |
| Tools | Informatica, Talend | dbt, Snowflake |
| Performance | Limited by ETL server | Leverages warehouse compute |

## Modern Tools
- **Apache Airflow**: Workflow orchestration
- **dbt**: SQL-based transformation
- **Fivetran**: Automated data integration
`, resources: []
            },
            {
                title: "OLAP and Data Cubes",
                slug: "olap-data-cubes",
                description: "OLAP operations, data cubes, and multidimensional analysis.",
                order: 3, estimatedMinutes: 50, difficulty: "Hard",
                content: `
# OLAP and Data Cubes

## OLAP Operations
- **Roll-up**: Aggregate (city → country → continent)
- **Drill-down**: Disaggregate (year → quarter → month)
- **Slice**: Fix one dimension (e.g., time = Q1 2024)
- **Dice**: Fix multiple dimensions (time = Q1, region = West)
- **Pivot**: Rotate axes for different viewpoint

## OLAP Types

| Type | Storage | Pros | Cons |
|------|---------|------|------|
| MOLAP | Multidimensional arrays | Fast queries | Limited scalability |
| ROLAP | Relational tables | Scalable | Slower queries |
| HOLAP | Hybrid | Balance | Complex |

## Data Cube
A multidimensional representation of data. Each cell contains a measure (e.g., total sales).
Dimensions might be: Time × Product × Region.
`, resources: []
            },
            {
                title: "Dimensional Modeling",
                slug: "dimensional-modeling",
                description: "Fact tables, dimension tables, SCDs, and Kimball methodology.",
                order: 4, estimatedMinutes: 55, difficulty: "Medium",
                content: `
# Dimensional Modeling

## Fact Tables
Contain **measurable** business events (quantities, amounts).
- **Additive**: Can sum across all dimensions (sales amount)
- **Semi-additive**: Can sum across some (account balance)
- **Non-additive**: Cannot sum (ratios, percentages)

## Dimension Tables
Contain **descriptive** attributes for filtering and grouping.
- Product (name, category, brand)
- Time (date, month, quarter, year)
- Customer (name, segment, location)

## Slowly Changing Dimensions (SCD)

| Type | Handling |
|------|----------|
| SCD 1 | Overwrite old value (no history) |
| SCD 2 | Add new row with effective dates (full history) |
| SCD 3 | Add column for old/new value (limited history) |

## Kimball Methodology
- **Bottom-up**: Build dimensional models per department
- **Bus Architecture**: Shared (conformed) dimensions across marts
- **Four-Step Design**: Business process → Grain → Dimensions → Facts
`, resources: []
            }
        ]
    }
];
