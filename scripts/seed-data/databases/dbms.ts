// DBMS Seed Data
export const dbmsTopics = [
    {
        title: "Introduction to DBMS",
        slug: "dbms-intro",
        description: "File systems vs DBMS, and why we use databases.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to Database Management Systems

A DBMS is software used to store, retrieve, and manage data in a structured way.

## 1. Why DBMS over File Systems?
Before DBMS, we used text files.
- **Data Redundancy**: Same info stored in multiple files (A waste and prone to errors).
- **Data Inconsistency**: If a user's address changes, it might only be updated in one file.
- **Hard to Access**: You need a custom program to search a text file.
- **Security**: Hard to give user A read-access but user B write-access to the same file.
- **Concurrency**: Two people can't edit the same text file at once safely.

## 2. Key Advantages of DBMS
- **Data Independence**: The app doesn't need to know HOW the data is stored on disk.
- **ACID Support**: Guaranteed safe transactions.
- **Recovery**: Automatic fix if the system crashes mid-update.

## 3. Users of a Database
- **DBA (Database Administrator)**: The "God" of the DB. Manages security and performance.
- **End Users**: People using the apps (like you).
- **Application Programmers**: Writing the code that talks to the DB.
`, resources: []
    },
    {
        title: "Database Architecture: 3-Schema",
        slug: "dbms-architecture",
        description: "Physical, Logical, and View levels.",
        order: 2, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Database Architecture (3-Schema)

Also known as the **ANSI-SPARC** architecture. It divides the DB into three layers to achieve data independence.

## 1. Internal (Physical) Level
Describes HOW the data is actually stored on the hard drive (B-Trees, Hashing, etc.).
- Target: The Machine.

## 2. Conceptual (Logical) Level
Describes WHAT data is stored and the relationships between them. This is where you define tables and constraints.
- Target: The DBA.

## 3. External (View) Level
The customized view for the user. A student sees their grades, but not the teacher's salary.
- Target: The User.

## 4. Data Independence
- **Logical Data Independence**: Changing the Conceptual schema (adding a column) without breaking the External views.
- **Physical Data Independence**: Changing the disk storage format without breaking the Conceptual schema.
`, resources: []
    },
    {
        title: "ER Model: Concepts & Symbols",
        slug: "er-model-intro",
        description: "Entities, Attributes, and the blueprint of a database.",
        order: 3, estimatedMinutes: 55, difficulty: "Easy",
        content: `
# Entity-Relationship (ER) Model

The ER model is a graphical blueprint used during the design phase.

## 1. Core Components
- **Entity**: An object or concept (e.g., Student, Course). Shown as a **Rectangle**.
- **Attribute**: Properties of an entity (e.g., Name, Age). Shown as an **Ellipse**.
- **Relationship**: How entities talk to each other (e.g., Student *enrolled in* Course). Shown as a **Diamond**.

## 2. Types of Attributes
- **Key Attribute**: Uniquely identifies an entity (Underlined).
- **Composite**: Can be broken down (Name $\to$ First, Last).
- **Multi-valued**: Multiple values (Phone\_numbers). Shown with a double ellipse.
- **Derived**: Calculated from others (Age from DOB). Shown with a dashed ellipse.

## 3. Weak Entity
An entity that cannot exist without a "Parent" entity (e.g., *Payments* of a *Loan*). Shown with a double rectangle.
`, resources: []
    },
    {
        title: "Relational Model & Algebra",
        slug: "relational-algebra",
        description: "Selection, Projection, Join, and the math of SQL.",
        order: 4, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Relational Algebra

The mathematical language behind SQL queries. It works on "Relations" (Tables).

## 1. Selection ($\sigma$)
Filters **Rows** based on a condition.
- $\sigma_{\text{age} > 20}(\text{Student})$

## 2. Projection ($\pi$)
Selects specific **Columns**.
- $\pi_{\text{name, id}}(\text{Student})$

## 3. Cartesian Product ($\times$)
Combines every row of Table A with every row of Table B.

## 4. Joins ($\bowtie$)
Combines tables based on a common column.
- **Natural Join**: Joins only on matching column names.
- **Outer Join**: Keeps rows that don't have a match (Left, Right, Full).

## 5. Set Operations
- **Union** ($\cup$): Combines rows (must have same columns).
- **Intersection** ($\cap$).
- **Difference** ($-$).
`, resources: []
    },
    {
        title: "SQL Definitions (DDL)",
        slug: "sql-ddl-commands",
        description: "CREATE, ALTER, DROP, and schema management.",
        order: 5, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# SQL: Data Definition Language (DDL)

DDL commands change the **Structure** of the database, not the data itself.

## 1. CREATE
Building a new table.
\`\`\`sql
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE
);
\`\`\`

## 2. ALTER
Changing an existing table.
\`\`\`sql
ALTER TABLE Users ADD age INT;
\`\`\`

## 3. DROP vs TRUNCATE
- **TRUNCATE**: Deletes all data inside the table, but keeps the table structure. (Fast).
- **DROP**: Deletes the data AND the table structure. (Nuclear option).

## 4. Constraints
- **NOT NULL**: Cannot be empty.
- **UNIQUE**: No duplicates.
- **DEFAULT**: Initial value if none provided.
- **CHECK**: Ensure value meets condition (e.g., \`age > 18\`).
`, resources: []
    },
    {
        title: "SQL Manipulation (DML)",
        slug: "sql-dml-commands",
        description: "INSERT, UPDATE, DELETE, and data maintenance.",
        order: 6, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# SQL: Data Manipulation Language (DML)

DML commands allow you to work with the **Data** inside the tables.

## 1. INSERT
Adding new rows.
\`\`\`sql
INSERT INTO Users (id, name) VALUES (1, 'Alice');
\`\`\`

## 2. UPDATE
Changing existing rows.
\`\`\`sql
UPDATE Users SET name = 'Bob' WHERE id = 1;
\`\`\`
**WARNING**: If you forget the \`WHERE\` clause, every single user in the DB will be named Bob!

## 3. DELETE
Removing rows.
\`\`\`sql
DELETE FROM Users WHERE id = 1;
\`\`\`

## 4. SELECT
Retrieving data.
\`\`\`sql
SELECT name FROM Users WHERE age > 21 ORDER BY name DESC;
\`\`\`
`, resources: []
    },
    {
        title: "SQL: Advanced Joins",
        slug: "sql-joins-advanced",
        description: "Inner, Left, Right, Full, and Self joins.",
        order: 7, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# SQL Joins

Joins are how we combine data from multiple tables.

## 1. Inner Join
Returns only the rows where there is a match in BOTH tables.

## 2. Left (Outer) Join
Returns ALL rows from the left table, and the matched rows from the right table. If there is no match, the right side is \`NULL\`.

## 3. Right (Outer) Join
Opposite of Left Join.

## 4. Full (Outer) Join
Returns all rows when there is a match in either left or right table.

## 5. Self Join
Joining a table with itself. Useful for hierarchical data (e.g., finding the Manager of an Employee, where both are in the \`Employees\` table).
\`\`\`sql
SELECT E.name, M.name as Manager
FROM Employees E
JOIN Employees M ON E.manager_id = M.id;
\`\`\`
`, resources: []
    },
    {
        title: "Functional Dependencies (FD)",
        slug: "functional-dependencies",
        description: "The logic before normalization: Trivial, Partial, and Transitive.",
        order: 8, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Functional Dependencies (FD)

A dependency $A \to B$ means that if you know the value of $A$, you can uniquely determine the value of $B$.

## 1. Trivial FD
A $\to$ B is trivial if B is a subset of A. (e.g., \`{Name, Age} \to Name\`).

## 2. Partial Dependency
When a non-key attribute depends only on a PART of a composite primary key. (Bad for normalization).

## 3. Transitive Dependency
When $A \to B$ and $B \to C$. Therefore, $A$ indirectly determines $C$. (Also bad).

## 4. Armstrong's Axioms
Rules to find new dependencies:
- **Reflexivity**: If $Y \subseteq X$, then $X \to Y$.
- **Augmentation**: If $X \to Y$, then $XZ \to YZ$.
- **Transitivity**: If $X \to Y$ and $Y \to Z$, then $X \to Z$.
`, resources: []
    },
    {
        title: "Normalization: 1NF, 2NF, 3NF",
        slug: "dbms-normalization",
        description: "Cleaning your database to prevent anomalies.",
        order: 9, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Normalization

The process of organizing data to reduce redundancy and improve data integrity.

## 1. 1st Normal Form (1NF)
Every cell must contain an **Atomic** value (single value). No arrays or comma-separated lists.

## 2. 2nd Normal Form (2NF)
1. Must be in 1NF.
2. **No Partial Dependencies**. Every non-key column must depend on the WHOLE primary key.

## 3. 3rd Normal Form (3NF)
1. Must be in 2NF.
2. **No Transitive Dependencies**. Non-key columns should not depend on other non-key columns.

## 4. BCNF (Boyce-Codd Normal Form)
A stronger version of 3NF. For every FD $X \to Y$, **X must be a Super Key**.
`, resources: []
    },
    {
        title: "Database Transactions & ACID",
        slug: "acid-properties",
        description: "Atomicity, Consistency, Isolation, and Durability.",
        order: 10, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# ACID Properties

Four rules that ensure a database transaction is reliable.

## 1. Atomicity ("All or Nothing")
Either the whole transaction succeeds, or the whole thing fails. There is no half-way.

## 2. Consistency
The database moves from one valid state to another. Constraints (like foreign keys) are never violated.

## 3. Isolation
Multiple transactions happening at the same time don't interfere with each other. It feels like they are happening one after another.

## 4. Durability
Once a transaction is "Committed", it is permanent. Even if the power goes out, the data is safe.
`, resources: []
    },
    {
        title: "Concurrency Control: Locking",
        slug: "concurrency-locking",
        description: "Shared and Exclusive locks and 2PL protocol.",
        order: 11, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Concurrency Control

Preventing problems when two people edit the same data at the exact same time.

## 1. Lock Types
- **Shared (S) Lock**: Anyone can read, no one can write.
- **Exclusive (X) Lock**: Only I can read/write. No one else can touch it.

## 2. Two-Phase Locking (2PL)
1. **Growing Phase**: Transaction acquires all the locks it needs (no releasing).
2. **Shrinking Phase**: Transaction releases locks (no more acquiring).

## 3. Deadlocks
Scenario where Transaction A waits for B, and B waits for A.
- **Detection**: Use a "Wait-for Graph".
- **Prevention**: Use timestamps (Wait-Die or Wound-Wait).
`, resources: []
    },
    {
        title: "Transaction Isolation Levels",
        slug: "isolation-levels",
        description: "Dirty reads, Non-repeatable reads, and Phantom reads.",
        order: 12, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Isolation Levels

Isolation is a tradeoff between **Safety** and **Performance**.

## 1. The Problems
- **Dirty Read**: Transaction A reads data that B changed but hasn't committed yet (B might rollback later!).
- **Non-Repeatable Read**: A reads twice and gets different values because B updated in between.
- **Phantom Read**: A reads a count, then B inserts a row, then A reads a different count.

## 2. Standard Levels (SQL)
- **Read Uncommitted**: Fast, but data is trash (Allows all problems).
- **Read Committed**: No dirty reads. (Standard for many DBs).
- **Repeatable Read**: No dirty or non-repeatable reads.
- **Serializable**: Maximum safety. Everything happens as if it were single-threaded. (Slowest).
`, resources: []
    },
    {
        title: "Indexing: B-Trees & Hashing",
        slug: "database-indexing",
        description: "Speeding up lookups: Primary, Secondary, and Clustering.",
        order: 13, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Database Indexing

Indexing makes SELECT faster but INSERT/UPDATE slower.

## 1. B-Tree Index (Standard)
A balanced tree structure that keeps data sorted and allows $O(\log n)$ searches.
- Ideal for range queries (e.g. \`age BETWEEN 18 AND 25\`).

## 2. Hash Index
Uses a hash table.
- $O(1)$ search but ONLY for exact matches (\`id = 5\`). Cannot do ranges.

## 3. Index Types
- **Clustered Index**: The actual data is sorted on disk to match the index. (Only one per table).
- **Non-Clustered**: A separate list of pointers to the data.
- **Sparse vs Dense**: Does every record have an entry in the index?
`, resources: []
    },
    {
        title: "Query Optimization",
        slug: "query-optimization",
        description: "Explain planes, Cost-based optimization, and Heuristics.",
        order: 14, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Query Optimization

How the DB decides the fastest way to run your SQL.

## 1. Parsing and Translation
SQL is converted into Relational Algebra.

## 2. The Optimizer
- **Rule-Based**: Follows fixed rules (e.g. "Always use an index if it exists").
- **Cost-Based**: Estimates the cost of different plans based on statistics (e.g. "This table has 1M rows, it will be faster to use the index").

## 3. Common Techniques
- **Selection Pushdown**: Filter rows as early as possible.
- **Projection Pushdown**: Get only needed columns as early as possible.

## 4. EXPLAIN
Command to see the DB's plan.
\`\`\`sql
EXPLAIN SELECT * FROM users WHERE id = 10;
\`\`\`
`, resources: []
    },
    {
        title: "Recovery Management",
        slug: "dbms-recovery",
        description: "Log-based recovery, Checkpoints, and Undo/Redo.",
        order: 15, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Recovery Management

Ensuring the database can recover from crashes (Disk failure, power outage).

## 1. Log-Based Recovery
The DB writes every change to a "Log" file BEFORE it writes to the actual database (Write-Ahead Logging).

## 2. Undo and Redo
- **Undo**: If a transaction was running but didn't commit before the crash, undo its changes.
- **Redo**: If it committed but the data hadn't reached the disk yet, re-run it from the log.

## 3. Checkpoints
To avoid scanning the whole log from the beginning of time, the DB creates periodic "Checkpoints" where all committed data is guaranteed to be on disk.

## 4. Shadow Paging
Instead of an in-place update, the DB writes to a NEW page and flips a pointer. Simplifies recovery but causes disk fragmentation.
`, resources: []
    },
    {
        title: "NoSQL Databases",
        slug: "nosql-introduction",
        description: "Document, Key-Value, Columnar, and Graph stores.",
        order: 16, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# NoSQL Databases

"Not Only SQL". Databases that don't use the traditional table/row model.

## 1. Types
- **Document Store**: Stores data as JSON/BSON. (MongoDB). Flexible schema.
- **Key-Value Store**: Simple map. (Redis, DynamoDB). Extremely fast.
- **Wide-Column Store**: Optimized for massive datasets. (Cassandra, HBase).
- **Graph Store**: Focuses on relationships. (Neo4j).

## 2. Scaling
- **Vertical**: Getting a bigger server (SQL limit).
- **Horizontal**: Adding 100 cheap servers (NoSQL strength).

## 3. BASE Consistency
NoSQL often follows BASE instead of ACID:
- **B**asically **A**vailable.
- **S**oft-state.
- **E**ventual Consistency.
`, resources: []
    },
    {
        title: "Distributed Databases",
        slug: "distributed-dbms",
        description: "Sharding, Replication, and Fragmentation.",
        order: 17, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Distributed Databases

Data is stored across multiple sites in a network.

## 1. Fragmentation
Splitting a table:
- **Horizontal**: Splitting rows.
- **Vertical**: Splitting columns.

## 2. Replication
- **Synchronous**: Write to all copies immediately (Slow, consistent).
- **Asymmetric/Asynchronous**: Write to one, others sync later (Fast, Eventually consistent).

## 3. Sharding
The database equivalent of horizontal fragmentation. Data is partitioned based on a "Shard Key" (e.g. User ID).

## 4. Distributed Join
A very expensive operation. Databases try to avoid this by "Co-locating" related data on the same server.
`, resources: []
    },
    {
        title: "Database Security & Views",
        slug: "database-security-views",
        description: "Views, GRANT, REVOKE, and protecting data.",
        order: 18, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Database Security

## 1. Views
A "Virtual Table" that doesn't store data but runs a query. 
- Use views to hide sensitive columns from certain users.

## 2. Authorization
- **GRANT**: Give permissions. \`GRANT SELECT ON students TO userA;\`
- **REVOKE**: Take them away.

## 3. SQL Injection
The #1 threat. Attackers add SQL code to input fields to bypass security.
- **Prevention**: Never "Glue" strings to build SQL. Use Parameterized queries.

## 4. Encryption
- **At Rest**: Encrypting the file on disk.
- **In Transit**: Using TLS for the connection.
`, resources: []
    },
    {
        title: "Data Integrity & Constraints",
        slug: "data-integrity-db",
        description: "Primary Keys, Foreign Keys, and Referential Integrity.",
        order: 19, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Data Integrity

Ensuring the data in the DB is accurate and reliable.

## 1. Domain Integrity
The value must be the right type (e.g. Age must be an integer).

## 2. Entity Integrity
Every table must have a **Primary Key** and it cannot be NULL.

## 3. Referential Integrity
Every **Foreign Key** must point to a valid Primary Key in another table.
- **ON DELETE CASCADE**: If a parent is deleted, all children are deleted too.
- **ON DELETE SET NULL**: Keep the children but disconnect them.

## 4. User-Defined Integrity
Triggering custom logic (Triggers) to check complex rules before an insert.
`, resources: []
    },
    {
        title: "Modern Databases: Cloud & Vector",
        slug: "modern-database-trends",
        description: "Serverless DBs and Vector databases for AI.",
        order: 20, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Modern Database Trends

## 1. Serverless DBs
You don't manage any servers; you just pay for the queries you run (e.g. Amazon Aurora Serverless, PlanetScale).

## 2. Multi-Model Databases
A single DB that can handle SQL, JSON, and Graphs (e.g. PostgreSQL with Extensions).

## 3. Vector Databases (AI)
The hottest trend today. Used to store and search "Embeddings" (Number representations of text/images).
- Essential for **RAG (Retrieval Augmented Generation)** in AI apps.
- Examples: Pinecone, Milvus, pgvector.

## 4. HTAP (Hybrid Transactional/Analytical)
One database that is fast enough for both daily orders AND big data analysis (e.g. TiDB, Snowflake).
`, resources: []
    }
];
