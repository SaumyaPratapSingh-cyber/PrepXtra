// Data Warehousing Seed Data
export const dataWarehousingTopics = [
    {
        title: "Introduction to Data Warehousing",
        slug: "data-warehousing-intro",
        description: "What is a DW and why is it different from a normal DB?",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to Data Warehousing

A Data Warehouse (DW) is a system used for reporting and data analysis. It stores current and historical data in one single place.

## 1. DB vs DW (OLTP vs OLAP)
| Feature | DBMS (OLTP) | Data Warehouse (OLAP) |
|---------|-------------|-----------------------|
| Purpose | Daily Transactions | Decision Support |
| Data | Recent (Snapshot) | Historical (Years) |
| Queries | Simple (Short) | Complex (Aggregates) |
| Speed | Fast Writes | Fast Reads |
| Schema | Balanced/Normalized | De-normalized (Star) |

## 2. Core Characteristics
- **Subject Oriented**: Organized around themes (Sales, Marketing) rather than operations.
- **Integrated**: Combines data from many separate sources.
- **Time-Variant**: Data is identified with a time period (Snapshot).
- **Non-Volatile**: Data is rarely updated or deleted once added.

## 3. Why build one?
To provide a "Single Version of Truth" for an entire company.
`, resources: []
    },
    {
        title: "Data Warehouse Architecture",
        slug: "dw-architecture",
        description: "Single-tier, Two-tier, and Three-tier architectures.",
        order: 2, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Data Warehouse Architecture

How is a warehouse physically and logically organized?

## 1. Three-Tier Architecture
1. **Bottom Tier (Data Source Layer)**: The warehouse server itself. It collects data from DBs and Flat files.
2. **Middle Tier (OLAP Layer)**: An OLAP server (MOLAP, ROLAP) that provides a multi-dimensional view of the data.
3. **Top Tier (Front-End Layer)**: Tools for the end user: Dashboards, Data Mining, and Reports.

## 2. Data Flow
External Source $\to$ ETL (Staging) $\to$ Data Warehouse $\to$ Data Marts $\to$ Users.

## 3. Back-End Tools (ETL)
Processes that help move data:
- **Extraction**: Getting data out of the source.
- **Data Cleaning**: Fixing typos and missing values.
- **Load**: Sending data to the warehouse.
`, resources: []
    },
    {
        title: "ETL Process Deep Dive",
        slug: "etl-process",
        description: "Extract, Transform, and Load: The kitchen of the DW.",
        order: 3, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# ETL: Extract, Transform, Load

ETL is the process where 80% of data warehouse work happens.

## 1. Extraction
Reading data from various source systems (MySQL, Excel, APIs).
- **Full Load**: Get everything (Slow).
- **Incremental Load**: Only get what changed since yesterday (CDC - Change Data Capture).

## 2. Transformation
Cleaning and shaping the data.
- **Standardizing**: "M"/"Male" $\to$ "Male".
- **Filtering**: Removing unwanted rows.
- **Aggregating**: Summarizing daily sales into monthly sales.
- **Deduplication**.

## 3. Loading
Putting the cleaned data into the warehouse.
- **Initial Load**: First time.
- **Incremental Load**: Periodic updates.

## 4. Modern Variation: ELT
In modern cloud warehouses (like BigQuery), we Load first, then use the massive power of the cloud to Transform.
`, resources: []
    },
    {
        title: "Star Schema Modeling",
        slug: "star-schema",
        description: "The simplest and fastest way to model data for analysis.",
        order: 4, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Star Schema

The most simple style of data warehouse schema.

## 1. The Structure
- **Fact Table**: One big table in the center containing the quantitative "Facts" (e.g. Sales\_Amount, Quantity). Usually contains mostly Foreign Keys.
- **Dimension Tables**: Radial tables that contain the descriptive data (e.g. Date, Product, Store, Customer).

## 2. Why Star?
- **Speed**: Requires fewer JOINS (Usually just one join between fact and dimension).
- **Readability**: Easy for business users to understand.

## 3. Key Feature
Dimension tables are **De-normalized**. We repeat data to avoid more joins. (e.g. The 'Store' table might have 'City' and 'State' columns directly).
`, resources: []
    },
    {
        title: "Snowflake Schema",
        slug: "snowflake-schema",
        description: "Normalized dimensions for complex data relationships.",
        order: 5, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Snowflake Schema

A variation of the Star schema where dimension tables are **Normalized**.

## 1. The Structure
Dimension tables are broken into multiple tables. 
- Example: \`Product\` table points to a \`Category\` table, which points to a \`Department\` table.

## 2. Pros and Cons
- **Pros**: Saves space (removes redundancy), easier to maintain.
- **Cons**: Slower queries due to multi-level joins. More complex to understand.

## 3. When to use?
When the hierarchy is very deep and the data in dimensions is massive. Organizations that care more about data integrity than speed often choose Snowflake.
`, resources: []
    },
    {
        title: "Fact vs Dimension Tables",
        slug: "fact-vs-dimension",
        description: "Metrics vs Context: The building blocks of DW.",
        order: 6, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Fact vs Dimension

## 1. Fact Tables
- **What**: The Business Process being measured (e.g. a Sale).
- **Content**: Foreign keys and numeric metrics (Additive, Semi-additive).
- **Growth**: Grows very fast vertically (millions of rows).

## 2. Dimension Tables
- **What**: The "Who, What, Where, When" context.
- **Content**: Textual attributes.
- **Growth**: Grows horizontally (many columns).

## 3. Types of Facts
- **Additive**: Can be added across all dimensions (Quantity).
- **Semi-Additive**: Can be added across some dimensions (e.g. Bank balance can't be added across time).
- **Non-Additive**: Cannot be added (Ratios, Unit price).
`, resources: []
    },
    {
        title: "OLAP Operations",
        slug: "olap-operations",
        description: "Roll-up, Drill-down, Slice, and Dice.",
        order: 7, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# OLAP Operations

How users interact with the Data Cube.

## 1. Roll-up
Moving up the hierarchy (Zooming out).
- Daily Sales $\to$ Monthly Sales $\to$ Yearly Sales.

## 2. Drill-down
The opposite off Roll-up (Zooming in).
- Region $\to$ Country $\to$ City.

## 3. Slice
Picking one single dimension for analysis (e.g. "Just show me the Time dimension for the year 2023").

## 4. Dice
Picking a small sub-cube (e.g. "Show me Sales for Electronics [Product] in Tokyo [City] during Q1 [Time]").

## 5. Pivot (Rotate)
Changing the axes of the view (e.g. moving Dates from Rows to Columns).
`, resources: []
    },
    {
        title: "Multidimensional Data Cubes",
        slug: "data-cubes",
        description: "Visualizing N-dimensional data for analysis.",
        order: 8, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Data Cubes

In DW, we think of data in more than 2 dimensions (Rows/Cols).

## 1. The Concept
If we have 3 dimensions (Time, Item, Location), any single point in the "Cube" represents a aggregate value (e.g. 500 TVs sold in New York in March).

## 2. N-Dimensions
While we call it a "Cube", it can have 10 or 20 dimensions (Hypercube).

## 3. Pre-aggregation
OLAP servers pre-calculate these values and store them in the cube so that when a user clicks "Roll-up", the result is instant.

## 4. Sparse Cubes
Most combinations of dimensions don't actually have data (e.g. a store doesn't sell every single product every single second). Cubes must be optimized to not waste space on empty cells.
`, resources: []
    },
    {
        title: "Data Pre-processing",
        slug: "data-preprocessing-dw",
        description: "Cleaning, Integration, and Transformation.",
        order: 9, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Data Pre-processing

"Garbage In, Garbage Out". You must clean data before it enters the warehouse.

## 1. Data Cleaning
- Filling in missing values (using mean/mode).
- Smoothing noisy data (Removing outliers).
- Fixing inconsistent data (Unit conversion).

## 2. Data Integration
Merging data from different sources where keys might not match (Schema Integration).

## 3. Data Reduction
Using sampling or binning to reduce the size of the data for faster analysis while keeping the statistical signal.

## 4. Data Transformation
- **Normalization**: Scaling numbers to a range (0 to 1).
- **Discretization**: Turning raw numbers into categories (e.g. Age 24 $\to$ "Young Adult").
`, resources: []
    },
    {
        title: "Data Quality Management",
        slug: "data-quality-dw",
        description: "Accurracy, Completeness, and Consistency.",
        order: 10, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Data Quality

High quality data is essential for business trust.

## 1. The 5 Pillars
1. **Accuracy**: Is the number correct?
2. **Completeness**: Are there missing rows or columns?
3. **Consistency**: Do two different reports say the same thing?
4. **Timeliness**: Is the data fresh or 3 years old?
5. **Validity**: Does it follow the rules (e.g. ZIP code is 5 digits)?

## 2. Data Profiling
Analyzing the data to find anomalies before the ETL runs.

## 3. Data Lineage
Tracking the history of a piece of data: "Where did this specific number come from, and which calculations changed it?".
`, resources: []
    },
    {
        title: "Cloud Data Warehouses",
        slug: "cloud-dw",
        description: "Snowflake, BigQuery, and Redshift.",
        order: 11, estimatedMinutes: 55, difficulty: "Easy",
        content: `
# Cloud Data Warehouses

Modern DW has moved from on-premise servers to the Cloud.

## 1. Key Players
- **Amazon Redshift**: The first big cloud DW.
- **Google BigQuery**: Serverless; uses SQL to query petabytes in seconds.
- **Snowflake**: Separation of Storage and Compute. You can turn off the "Brain" while keep the "Memory" to save money.

## 2. Advantages
- **Scalability**: Add petabytes of space in seconds.
- **Cost**: Pay per query or per hour.
- **No maintenance**: No need to worry about hardware failures.

## 3. Data Lakes vs Warehouses
- **Warehouse**: Structured data for business users.
- **Lake**: Raw data (Images, logs, text) for data scientists.
`, resources: []
    },
    {
        title: "Columnar Storage",
        slug: "columnar-storage",
        description: "Why modern warehouses don't store data in rows.",
        order: 12, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Columnar Storage

Traditional DBs store data like this: \`Row 1, Row 2, Row 3...\`.
Warehouses store them like this: \`Column A, Column B, Column C...\`.

## 1. Why?
In analysis, you rarely want a whole row (\`SELECT *\`). You usually want to sum ONE column (\`SUM(Sales)\`).
- **IO Speed**: The disk only reads the column you need.
- **Compression**: Columnar data is highly repetitive (e.g. many states are 'CA'), so it compresses 10x better than row data.

## 2. Parquet and ORC
Popular open-source columnar file formats used in Big Data systems like Hadoop and Spark.
`, resources: []
    },
    {
        title: "Metadata Management",
        slug: "dw-metadata",
        description: "The 'Data about Data' that makes a DW usable.",
        order: 13, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Metadata in DW

Metadata is the map of the warehouse.

## 1. Types of Metadata
- **Technical Metadata**: DB structure, column types, audit logs, ETL jobs.
- **Business Metadata**: Definitions of terms (e.g. "What exactly counts as a 'Sale'?").
- **Operational Metadata**: How long did the last load take? How many rows were errors?

## 2. The Meta Repository
A central system that stores all this info. Without it, the data warehouse becomes a "Data Swamp" where no one knows what's real.
`, resources: []
    },
    {
        title: "Slowly Changing Dimensions (SCD)",
        slug: "scd-types",
        description: "How to handle a customer moving to a new city.",
        order: 14, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Slowly Changing Dimensions (SCD)

What do you do when a descriptive attribute changes?

## 1. Type 0 (Fixed)
Never change it. (e.g. Birth Date).

## 2. Type 1 (Overwrite)
Update the row. The old value is lost forever.
- Pro: Simple.
- Con: Historical reports will show the new value even for old sales.

## 3. Type 2 (Add New Row)
Add a new row with a new ID and a Start/End date.
- This is the **Gold Standard** for DW. You keep the history of every change.

## 4. Type 3 (Add New Column)
Keep the "Current" and "Previous" values in the same row. Only works for the very last change.
`, resources: []
    },
    {
        title: "Data Marts",
        slug: "data-marts",
        description: "Smaller, focused warehouses for specific departments.",
        order: 15, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Data Marts

A subset of a Data Warehouse, focused on a specific business unit.

## 1. Why use them?
- **Speed**: Smaller data is faster to query.
- **Privilege**: Marketing doesn't need to see HR data.
- **Ease of Use**: Only has the columns relevant to that department.

## 2. Types
- **Dependent**: Built from the central Data Warehouse.
- **Independent**: Built directly from source systems (leads to consistency problems).

## 3. Top-Down vs Bottom-Up
- **Inmon Approach**: Build the central Warehouse first, then Marts (Top-Down).
- **Kimball Approach**: Build focused Marts first, then link them (Bottom-Up).
`, resources: []
    },
    {
        title: "OLAP Architectures: MOLAP vs ROLAP",
        slug: "molap-rolap",
        description: "Choosing the right engine for your analytics.",
        order: 16, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# OLAP Engine Architectures

## 1. MOLAP (Multidimensional OLAP)
Data is stored in proprietary, pre-calculated cubes.
- **Pros**: Blazing fast queries.
- **Cons**: Takes a long time to build cubes; Doesn't scale to massive data.

## 2. ROLAP (Relational OLAP)
Queries the data directly from the relational database using clever SQL.
- **Pros**: Scalable to petabytes; No need to "re-build" cubes.
- **Cons**: Slower than MOLAP.

## 3. HOLAP (Hybrid OLAP)
Stores summaries in MOLAP (speed) and raw details in ROLAP (scale).
`, resources: []
    },
    {
        title: "Bitmap Indexing",
        slug: "bitmap-indexing",
        description: "High-speed indexing for low-cardinality columns.",
        order: 17, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Bitmap Indexing

In normal DBs, we use B-Trees. In DW, we often use Bitmaps.

## 1. The Strategy
Create a string of bits (0s and 1s) for every unique value in a column.
- Example: A \`Gender\` column has a "Male" bitmap and a "Female" bitmap.
- If Row 1 is Male, its bit is 1 in the Male map and 0 in the Female map.

## 2. Advantages
- **Merging**: To find "Males in California", the DB just does a bitwise **AND** between the two maps. This is incredibly fast for CPUs.
- **Storage**: Highly compressible.

## 3. Limitation
Only works if the number of unique values is small (Low Cardinality). Bad for something like "Customer Name".
`, resources: []
    },
    {
        title: "Big Data & Hadoop in DW",
        slug: "big-data-hadoop-dw",
        description: "When the warehouse is too big for a single server.",
        order: 18, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Big Data in the Warehouse

Modern DW often relies on Big Data technologies to handle the volume.

## 1. Hadoop (HDFS)
Storing files across 1,000s of cheap servers.

## 2. Hive / Presto
Software that lets you write **Standard SQL** that gets translated into MapReduce or Spark tasks to run across the Hadoop cluster.

## 3. Data Lakehouse
A new architecture (\`Delta Lake\`, \`Iceberg\`) that brings the structure and performance of a Warehouse directly to a Data Lake.

## 4. Real-time Streaming
Using tools like **Apache Flink** or **Spark Streaming** to update the warehouse in milliseconds as events happen.
`, resources: []
    },
    {
        title: "Data Governance & Security",
        slug: "dw-governance",
        description: "Who owns the data and how is it protected?",
        order: 19, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Data Governance

The set of rules and people that ensure data is used correctly.

## 1. Data Stewardship
People responsible for the quality and definition of specific data assets.

## 2. Security
- **Data Masking**: Hiding the middle digits of a Credit Card number from analysts.
- **VPD (Virtual Private Database)**: Ensuring a manager only sees rows for their own branch.

## 3. Regulations
Ensuring the warehouse complies with laws like **GDPR** or **HIPAA**. (e.g. if a user asks to be deleted, you must find every instance of them in the warehouse).
`, resources: []
    },
    {
        title: "BI Tools & Dashboards",
        slug: "bi-tools",
        description: "Visualizing the results for the CEO.",
        order: 20, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Business Intelligence (BI) Tools

The end-goal of a Data Warehouse is to provide insights.

## 1. Popular Tools
- **Tableau**: Powerful visualization and drag-and-drop.
- **Power BI**: Microsoft's tool; integrates deeply with Excel and SQL Server.
- **Looker**: Google's BI tool; uses LookML code to define metrics.

## 2. Key Metrics (KPIs)
- **Churn Rate**: How many customers left.
- **ARPU**: Average Revenue Per User.
- **Year-over-Year (YoY) Growth**.

## 3. Self-Service BI
The goal of modern DW: Business users can build their own reports without asking the IT department for help.
`, resources: []
    }
];
