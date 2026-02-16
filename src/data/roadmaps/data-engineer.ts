
import { RoadmapTrack } from './types';

export const dataEngineerRoadmap: RoadmapTrack = {
    id: 'data-engineer',
    title: 'Data Engineer',
    description: 'Learn to build and manage data pipelines at scale',
    category: 'role-based',
    icon: '🔧',
    accentColor: '#0ea5e9',
    rootNodeId: 'de-root',
    nodes: {
        'de-root': {
            id: 'de-root',
            label: 'Data Engineering',
            description: 'Design and build systems for collecting, storing, and analyzing data at scale.',
            children: ['de-languages', 'de-databases', 'de-pipeline', 'de-big-data'],
            resources: [
                { type: 'article', title: 'Data Engineer Roadmap', url: 'https://roadmap.sh/data-engineer', isFree: true },
                { type: 'course', title: 'Data Engineering Zoomcamp', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', isFree: true }
            ],
            content: {
                overview: 'Data Engineers build and maintain the infrastructure that enables data analysts and scientists to do their work. While analysts query data, data engineers build the systems that make that data available, reliable, and fast. The core responsibility is building data pipelines — automated workflows that extract data from sources (databases, APIs, logs, streaming events), transform it into a usable format, and load it into a data warehouse or data lake. Data engineers work with cloud platforms (AWS, GCP, Azure), orchestration tools (Airflow, Dagster), big data processing frameworks (Spark, Kafka), and data warehouses (Snowflake, BigQuery, Redshift). The role demands strong SQL, Python, and infrastructure skills.',
                keyConcepts: [
                    'ETL and ELT: Extract, Transform, Load pipelines',
                    'Data warehouses vs data lakes vs lakehouses',
                    'Batch processing vs stream processing',
                    'Data modeling: star schema, snowflake schema',
                    'Data quality and validation',
                    'Orchestration: scheduling and dependencies',
                    'Infrastructure as Code for reproducibility',
                    'Cloud data platforms: Snowflake, BigQuery, Redshift'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between ETL and ELT?', hint: 'ETL transforms data before loading into the warehouse. ELT loads raw data first, then transforms inside the warehouse (modern approach).', difficulty: 'easy' },
                    { question: 'What is the difference between a data warehouse and a data lake?', hint: 'Warehouse stores structured, processed data (ready for analysis). Lake stores raw data in any format (structured, semi-structured, unstructured).', difficulty: 'medium' },
                    { question: 'What is data modeling and why is it important?', hint: 'Organizing data into tables with clear relationships. Good models make queries fast and data easy to understand.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Build idempotent pipelines: running them twice produces the same result.',
                    'Implement data quality checks at every stage of the pipeline.',
                    'Monitor pipelines with alerting for failures.',
                    'Use version control for all pipeline code and configurations.',
                    'Document your data models and pipeline architecture.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Foundations', description: 'Core concepts and tools.', tasks: ['Understand ETL/ELT and data warehouse concepts', 'Set up a local development environment with Docker', 'Practice advanced SQL: window functions, CTEs, performance tuning'] },
                { day: 2, title: 'Building Pipelines', description: 'Orchestration and transformation.', tasks: ['Build an ETL pipeline with Python', 'Learn Airflow for workflow orchestration', 'Transform data with dbt in a warehouse'] },
                { day: 3, title: 'Big Data and Cloud', description: 'Distributed processing and cloud services.', tasks: ['Process data with Apache Spark', 'Set up a streaming pipeline with Kafka', 'Deploy pipelines on a cloud platform (AWS/GCP)'] }
            ]
        },
        'de-languages': {
            id: 'de-languages',
            label: 'Languages',
            description: 'Python and SQL are the essential languages for data engineering.',
            parentId: 'de-root',
            resources: [
                { type: 'documentation', title: 'Python.org', url: 'https://www.python.org/', isFree: true }
            ],
            content: {
                overview: 'Python and SQL are the two must-have languages for data engineering. SQL is used extensively for data modeling, writing transformations (especially with dbt), querying data warehouses, and data quality checks. Advanced SQL skills (window functions, CTEs, recursive queries, performance optimization) are essential. Python is used for building pipeline scripts, data transformation with pandas, API integrations, and writing Airflow DAGs. Understanding data serialization formats (JSON, Parquet, Avro) and working with APIs (REST, GraphQL) is also important. Some teams also use Scala for Spark jobs and Java for Kafka development.',
                keyConcepts: [
                    'Advanced SQL: window functions, CTEs, recursive queries',
                    'SQL for data modeling and dbt',
                    'Python for pipeline scripting and automation',
                    'pandas for data transformation',
                    'Working with APIs: REST, pagination, rate limiting',
                    'Data formats: JSON, CSV, Parquet, Avro',
                    'Scala for Spark (optional)',
                    'Bash scripting for automation'
                ],
                practiceQuestions: [
                    { question: 'Why is Parquet preferred over CSV for data engineering?', hint: 'Parquet is columnar (fast for analytics), compressed (smaller files), and stores schema. CSV is row-based and has no type information.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Master SQL deeply before learning big data tools.',
                    'Write clean, modular Python with proper error handling.',
                    'Use Parquet or Avro for data at rest, not CSV.',
                    'Automate everything that runs more than once.'
                ]
            }
        },
        'de-databases': {
            id: 'de-databases',
            label: 'Databases',
            description: 'Relational databases (PostgreSQL), NoSQL (MongoDB, Cassandra), and data warehouses.',
            parentId: 'de-root',
            resources: [
                { type: 'documentation', title: 'PostgreSQL Docs', url: 'https://www.postgresql.org/docs/', isFree: true }
            ],
            content: {
                overview: 'Data engineers work with multiple types of databases. Relational databases (PostgreSQL, MySQL) store transactional data with ACID guarantees — these are usually the source systems. NoSQL databases (MongoDB for documents, Cassandra for wide-column, Redis for caching) handle specific use cases where relational databases fall short. Data warehouses (Snowflake, BigQuery, Redshift) are optimized for analytical queries on large datasets — they use columnar storage, massively parallel processing, and separation of storage and compute. Data lakehouses (Databricks, Delta Lake) combine the flexibility of data lakes with the performance of data warehouses.',
                keyConcepts: [
                    'OLTP vs OLAP: transactional vs analytical databases',
                    'PostgreSQL for relational source data',
                    'Columnar storage for analytics (Snowflake, BigQuery)',
                    'MongoDB for document storage',
                    'Cassandra for high-write, distributed workloads',
                    'Redis for caching and real-time data',
                    'Data lakehouses: Delta Lake, Apache Iceberg',
                    'Database indexing and query performance'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between OLTP and OLAP?', hint: 'OLTP handles high-volume transactions (inserts, updates). OLAP handles complex analytical queries on historical data.', difficulty: 'easy' },
                    { question: 'Why do data warehouses use columnar storage?', hint: 'Analytical queries typically read a few columns across many rows. Columnar storage reads only the needed columns, much faster than row-based.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Choose the right database for the right use case.',
                    'Use a data warehouse for analytical workloads, not the production database.',
                    'Implement proper partitioning and clustering in data warehouses.',
                    'Monitor query performance and optimize with indexing.'
                ]
            }
        },
        'de-pipeline': {
            id: 'de-pipeline',
            label: 'ETL Pipelines',
            description: 'Extract, Transform, Load processes with orchestration and scheduling.',
            parentId: 'de-root',
            children: ['de-airflow', 'de-dbt'],
            resources: [
                { type: 'documentation', title: 'Apache Airflow Docs', url: 'https://airflow.apache.org/docs/', isFree: true }
            ],
            content: {
                overview: 'Data pipelines are the core deliverable of data engineering. A pipeline automates the flow of data from source to destination. ETL (Extract, Transform, Load) transforms data before loading into the warehouse. ELT (Extract, Load, Transform) loads raw data first, then transforms it inside the warehouse using SQL (this is the modern approach with tools like dbt). Pipeline orchestration tools (Airflow, Dagster, Prefect) schedule jobs, manage dependencies, retry failures, and provide visibility. A good pipeline is idempotent (safe to re-run), observable (you can see what happened), and tested (data quality checks at every stage).',
                keyConcepts: [
                    'ETL vs ELT paradigms',
                    'Pipeline orchestration with Airflow or Dagster',
                    'DAGs: Directed Acyclic Graphs for task dependencies',
                    'Idempotency: safe to run multiple times',
                    'Data quality checks and assertions',
                    'Incremental loading vs full refresh',
                    'Error handling, retries, and alerting',
                    'CI/CD for data pipelines'
                ],
                practiceQuestions: [
                    { question: 'What makes a pipeline idempotent?', hint: 'Running it multiple times produces the same result. Use UPSERT instead of INSERT, or truncate-and-reload.', difficulty: 'medium' },
                    { question: 'What is incremental loading?', hint: 'Loading only new or changed data since the last run, instead of reprocessing everything. Much faster for large datasets.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Make every pipeline idempotent.',
                    'Use incremental loads wherever possible for performance.',
                    'Add data quality checks after every transformation step.',
                    'Set up monitoring and alerting for pipeline failures.',
                    'Version control all pipeline code.'
                ]
            }
        },
        'de-airflow': {
            id: 'de-airflow',
            label: 'Airflow',
            description: 'Apache Airflow for workflow orchestration, scheduling, and monitoring.',
            parentId: 'de-pipeline',
            resources: [
                { type: 'documentation', title: 'Airflow Docs', url: 'https://airflow.apache.org/docs/', isFree: true }
            ],
            content: {
                overview: 'Apache Airflow is the most widely used workflow orchestration tool in data engineering. You define pipelines as DAGs (Directed Acyclic Graphs) in Python. Each node in the DAG is a task (PythonOperator, BashOperator, SQLOperator, etc.) with defined dependencies. Airflow handles scheduling (cron-like), retries on failure, alerting, backfilling historical data, and provides a web UI for monitoring. The key concepts are DAGs (pipeline definitions), Operators (task types), Sensors (wait for conditions), XComs (pass data between tasks), and Connections (store database/API credentials). Managed services like Cloud Composer (GCP) and MWAA (AWS) simplify deployment.',
                keyConcepts: [
                    'DAGs: defining pipeline structure in Python',
                    'Operators: PythonOperator, BashOperator, SQL operators',
                    'Task dependencies and execution order',
                    'Scheduling with cron expressions',
                    'XComs for passing data between tasks',
                    'Sensors for waiting on external conditions',
                    'Connections and Variables for configuration',
                    'Backfilling for reprocessing historical data'
                ]
            }
        },
        'de-dbt': {
            id: 'de-dbt',
            label: 'dbt',
            description: 'Data Build Tool for SQL-based transformations inside the data warehouse.',
            parentId: 'de-pipeline',
            resources: [
                { type: 'documentation', title: 'dbt Docs', url: 'https://docs.getdbt.com/', isFree: true }
            ],
            content: {
                overview: 'dbt (data build tool) has transformed modern data engineering by bringing software engineering practices to SQL transformations. Instead of writing ETL scripts, you write SQL SELECT statements and dbt handles the DDL (CREATE TABLE, INSERT). dbt models are SQL files that define transformations — they can reference other models, creating a dependency graph. dbt provides testing (assert uniqueness, not-null, accepted values), documentation (auto-generated from YAML), lineage tracking (see data flow), and version control. dbt runs inside the data warehouse (Snowflake, BigQuery, Redshift), leveraging the warehouse\'s computing power. dbt Cloud is the managed service; dbt Core is the open-source CLI.',
                keyConcepts: [
                    'dbt models: SQL SELECT statements as transformations',
                    'Model materialization: table, view, incremental, ephemeral',
                    'ref() function for model dependencies',
                    'Tests: unique, not_null, accepted_values, relationships',
                    'Sources: defining raw data tables',
                    'Macros: reusable SQL logic with Jinja',
                    'dbt documentation and lineage graphs',
                    'Staging, intermediate, and mart layer patterns'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a dbt model materialized as a table vs a view?', hint: 'Table is physically created (fast queries, storage cost). View is a SQL definition executed at query time (no storage, slower queries).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Follow the staging -> intermediate -> marts layered pattern.',
                    'Write tests for every model.',
                    'Use incremental models for large datasets.',
                    'Document all models with descriptions in YAML files.'
                ]
            }
        },
        'de-big-data': {
            id: 'de-big-data',
            label: 'Big Data Tools',
            description: 'Processing massive datasets with distributed computing frameworks.',
            parentId: 'de-root',
            children: ['de-spark', 'de-kafka', 'de-hadoop'],
            resources: [
                { type: 'documentation', title: 'Apache Spark Docs', url: 'https://spark.apache.org/docs/latest/', isFree: true }
            ],
            content: {
                overview: 'Big data tools process datasets too large for a single machine. Apache Spark is the dominant framework for batch processing — it distributes computation across a cluster, processing terabytes of data. Apache Kafka handles real-time data streaming — it ingests millions of events per second and enables stream processing, event-driven architectures, and real-time analytics. Hadoop (HDFS + MapReduce) was the original big data framework but has been largely replaced by Spark and cloud-native solutions. Cloud services like AWS EMR, Google Dataproc, and Databricks provide managed Spark clusters. Understanding when you need big data tools (and when you do not) is as important as knowing how to use them.',
                keyConcepts: [
                    'Distributed computing: splitting work across machines',
                    'Apache Spark: DataFrames, transformations, actions',
                    'Spark SQL for SQL on distributed data',
                    'Apache Kafka: topics, producers, consumers, partitions',
                    'Batch processing vs real-time streaming',
                    'HDFS: Hadoop Distributed File System',
                    'Cloud-managed big data services',
                    'When to use big data tools vs simpler solutions'
                ],
                practiceQuestions: [
                    { question: 'When do you actually need big data tools?', hint: 'When data exceeds single-machine capacity (usually > 100GB+) or when you need real-time processing of high-volume streams.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Do not use big data tools for small data — a laptop with pandas may be faster.',
                    'Understand partitioning for optimal Spark and Kafka performance.',
                    'Use cloud-managed services instead of self-hosting clusters.',
                    'Start with Spark SQL if you already know SQL.'
                ]
            }
        },
        'de-spark': {
            id: 'de-spark',
            label: 'Apache Spark',
            description: 'Distributed data processing for batch and streaming workloads.',
            parentId: 'de-big-data',
            content: {
                overview: 'Apache Spark is an open-source distributed computing engine that can process massive datasets across a cluster of machines. Spark uses lazy evaluation — transformations (filter, map, join) build an execution plan, and actions (count, collect, write) trigger execution. Spark DataFrames provide a pandas-like API for distributed data. PySpark is the Python interface. Spark SQL lets you run SQL queries on distributed data. Spark Structured Streaming extends batch processing to real-time streaming. Spark runs on Databricks, AWS EMR, Google Dataproc, or standalone clusters.',
                keyConcepts: [
                    'RDDs, DataFrames, and Datasets',
                    'Transformations (lazy) vs Actions (trigger execution)',
                    'PySpark for Python-based Spark development',
                    'Spark SQL for SQL on distributed data',
                    'Partitioning and shuffling',
                    'Caching and persistence for performance',
                    'Structured Streaming for real-time',
                    'Spark UI for debugging and optimization'
                ]
            }
        },
        'de-kafka': {
            id: 'de-kafka',
            label: 'Apache Kafka',
            description: 'Real-time data streaming and event-driven architectures.',
            parentId: 'de-big-data',
            content: {
                overview: 'Apache Kafka is a distributed event streaming platform used by thousands of companies for real-time data pipelines. Producers publish messages (events) to topics. Consumers subscribe to topics and process messages. Topics are partitioned for parallelism and replicated for fault tolerance. Kafka Streams and Kafka Connect provide stream processing and integration with external systems. Use cases include real-time analytics, event sourcing, log aggregation, and decoupling microservices. Kafka handles millions of messages per second with low latency.',
                keyConcepts: [
                    'Topics, partitions, and offsets',
                    'Producers and consumers',
                    'Consumer groups for parallel processing',
                    'Kafka Connect for integrating with databases and services',
                    'Kafka Streams for stream processing',
                    'At-least-once, at-most-once, exactly-once delivery',
                    'Schema Registry for data contracts',
                    'Replication for fault tolerance'
                ]
            }
        },
        'de-hadoop': {
            id: 'de-hadoop',
            label: 'Hadoop',
            description: 'Distributed storage (HDFS) and the MapReduce processing model.',
            parentId: 'de-big-data',
            content: {
                overview: 'Hadoop was the original big data framework that made it possible to store and process petabytes of data across commodity hardware. HDFS (Hadoop Distributed File System) stores data by splitting files into blocks distributed across a cluster. MapReduce is the processing model — Map functions process data in parallel across nodes, and Reduce functions aggregate the results. While MapReduce has been largely replaced by Spark (which is 10-100x faster due to in-memory processing), HDFS and the Hadoop ecosystem (Hive for SQL, HBase for NoSQL) are still used in many organizations. Understanding Hadoop provides context for modern big data tools.',
                keyConcepts: [
                    'HDFS: block storage across a cluster',
                    'MapReduce: map phase + shuffle + reduce phase',
                    'Hive: SQL interface on top of Hadoop',
                    'HBase: NoSQL database on Hadoop',
                    'YARN: resource management',
                    'Why Spark replaced MapReduce',
                    'Data formats: ORC, Parquet on HDFS',
                    'Cloud alternatives: S3 + Spark replacing HDFS + MapReduce'
                ]
            }
        }
    }
};
