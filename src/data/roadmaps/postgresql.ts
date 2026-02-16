
import { RoadmapTrack } from './types';

export const postgresqlRoadmap: RoadmapTrack = {
    id: 'postgresql',
    title: 'PostgreSQL',
    description: 'Master the world\'s most advanced open-source relational database',
    category: 'skill-based',
    icon: '🐘',
    accentColor: '#336791',
    rootNodeId: 'pg-root',
    nodes: {
        'pg-root': {
            id: 'pg-root',
            label: 'PostgreSQL Mastery',
            description: 'Learn to use PostgreSQL for robust, scalable data management.',
            children: ['pg-basics', 'pg-advanced', 'pg-administration', 'pg-extensions', 'pg-performance'],
            resources: [
                { type: 'documentation', title: 'PostgreSQL Official Docs', url: 'https://www.postgresql.org/docs/', isFree: true },
                { type: 'article', title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', isFree: true },
                { type: 'video', title: 'PostgreSQL Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', isFree: true }
            ],
            content: {
                overview: 'PostgreSQL (often called Postgres) is the most advanced open-source relational database in the world. It has been in active development for over 35 years and is known for its reliability, feature richness, and standards compliance. Unlike MySQL which sacrifices some SQL compliance for simplicity, PostgreSQL implements the SQL standard comprehensively and adds powerful extensions. It supports advanced data types (JSON, arrays, hstore, geometric types), full-text search, materialized views, window functions, recursive CTEs, and even custom types and operators. PostgreSQL is the default choice for serious production applications and is used by companies like Apple, Instagram, Spotify, and the US Federal Aviation Administration. It is also the database behind Supabase, Neon, and other modern database-as-a-service platforms.',
                keyConcepts: [
                    'ACID compliance and transactional integrity',
                    'Advanced data types: JSONB, arrays, UUID, ENUM',
                    'Full-text search with tsvector and tsquery',
                    'MVCC (Multi-Version Concurrency Control)',
                    'Extensions: PostGIS, pg_trgm, pgcrypto',
                    'Materialized views for cached queries',
                    'Table inheritance and partitioning',
                    'Replication: streaming, logical, and pgpool'
                ],
                practiceQuestions: [
                    { question: 'Why would you choose PostgreSQL over MySQL?', hint: 'PostgreSQL has better SQL compliance, supports JSONB, has advanced indexing, and handles complex queries more efficiently.', difficulty: 'medium' },
                    { question: 'What is MVCC and why does PostgreSQL use it?', hint: 'Multi-Version Concurrency Control lets multiple transactions read and write without blocking each other.', difficulty: 'hard' },
                    { question: 'What is the difference between JSON and JSONB in PostgreSQL?', hint: 'JSON stores exact text; JSONB stores parsed binary data, supporting indexing and faster querying.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use JSONB instead of JSON for queryable JSON data.',
                    'Enable and use extensions (pg_trgm for fuzzy search, uuid-ossp for UUIDs).',
                    'Use connection pooling (PgBouncer) for high-traffic applications.',
                    'Regular VACUUM and ANALYZE to maintain performance.',
                    'Use pgdump for backups and pg_restore for recovery.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'PostgreSQL Fundamentals', description: 'Setup and core SQL.', tasks: ['Install PostgreSQL and connect with psql or pgAdmin', 'Create databases, tables, and write CRUD queries', 'Understand data types: serial, varchar, timestamp, JSONB'] },
                { day: 2, title: 'Advanced Features', description: 'What makes Postgres special.', tasks: ['Query JSONB data with operators (->, ->>)', 'Create and use views and materialized views', 'Practice window functions and CTEs'] },
                { day: 3, title: 'Performance and Administration', description: 'Run Postgres in production.', tasks: ['Create indexes and analyze with EXPLAIN', 'Set up basic replication and backups', 'Integrate with a Node.js/Python application'] }
            ]
        },
        'pg-basics': {
            id: 'pg-basics',
            label: 'PostgreSQL Basics',
            description: 'Installation, psql CLI, data types, tables, constraints, and basic CRUD.',
            parentId: 'pg-root',
            resources: [
                { type: 'documentation', title: 'PostgreSQL Getting Started', url: 'https://www.postgresql.org/docs/current/tutorial.html', isFree: true }
            ],
            content: {
                overview: 'Getting started with PostgreSQL involves installing the server (or using a cloud provider like Supabase or Neon), connecting via the psql command-line tool or a GUI like pgAdmin or DBeaver, and understanding core SQL within the PostgreSQL context. PostgreSQL has a rich set of data types beyond standard SQL: serial (auto-incrementing integer), UUID, JSONB (binary JSON), arrays, ENUM, timestamp with time zone, and inet (IP addresses). Table creation involves defining columns with types and constraints (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT). PostgreSQL sequences power auto-incrementing IDs. The SERIAL type is a shorthand for creating a sequence automatically.',
                keyConcepts: [
                    'psql CLI and connection strings',
                    'Data types: integer, text, varchar, boolean, timestamp, UUID, JSONB',
                    'SERIAL and BIGSERIAL for auto-incrementing IDs',
                    'Table constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK',
                    'Schemas for organizing tables within a database',
                    'Sequences for generating unique numbers',
                    'COPY command for bulk data loading'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between TEXT and VARCHAR(n)?', hint: 'In PostgreSQL there is no performance difference. TEXT has no length limit; VARCHAR(n) enforces a max length.', difficulty: 'easy' },
                    { question: 'What is a schema in PostgreSQL?', hint: 'A namespace within a database that organizes tables, views, and functions. The default schema is "public".', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use TEXT instead of VARCHAR(255) — PostgreSQL handles TEXT efficiently.',
                    'Use UUID as primary key for distributed systems or public-facing IDs.',
                    'Set timezone-aware timestamps (TIMESTAMPTZ) for all date/time columns.',
                    'Use schemas to logically separate different parts of your application.'
                ]
            }
        },
        'pg-advanced': {
            id: 'pg-advanced',
            label: 'Advanced Features',
            description: 'JSONB, arrays, full-text search, CTEs, window functions, and stored procedures.',
            parentId: 'pg-root',
            resources: [
                { type: 'documentation', title: 'JSONB in PostgreSQL', url: 'https://www.postgresql.org/docs/current/datatype-json.html', isFree: true },
                { type: 'article', title: 'Full-Text Search in PostgreSQL', url: 'https://www.postgresql.org/docs/current/textsearch.html', isFree: true }
            ],
            content: {
                overview: 'PostgreSQL\'s advanced features are what set it apart from other databases. JSONB lets you store semi-structured data alongside relational data, query it with operators (-> for nested access, ->> for text extraction, @> for containment), and index it with GIN indexes. Array columns let you store lists without needing a separate table. Full-text search with tsvector and tsquery provides built-in search engine capabilities, including ranking and highlighting, without needing an external tool like Elasticsearch for many use cases. Materialized views cache the result of expensive queries and can be refreshed on demand. PL/pgSQL is PostgreSQL\'s procedural language for writing stored procedures and triggers directly in the database.',
                keyConcepts: [
                    'JSONB operators: ->, ->>, @>, #>',
                    'GIN indexes on JSONB columns',
                    'Array columns and array operators',
                    'Full-text search: to_tsvector, to_tsquery, ts_rank',
                    'Materialized views and REFRESH MATERIALIZED VIEW',
                    'PL/pgSQL for stored procedures and functions',
                    'Triggers for automatic actions on data changes',
                    'Generated columns for computed values'
                ],
                practiceQuestions: [
                    { question: 'When would you use JSONB instead of a separate relational table?', hint: 'For semi-structured data with varying fields, like user preferences or metadata.', difficulty: 'medium' },
                    { question: 'What kind of index should you use on a JSONB column?', hint: 'A GIN (Generalized Inverted Index) for containment queries.', difficulty: 'hard' },
                    { question: 'What is a materialized view?', hint: 'A view whose results are stored physically and can be refreshed. It trades freshness for query speed.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use JSONB for flexible metadata but keep core relational data in regular columns.',
                    'Create GIN indexes on JSONB columns you query with @> or ? operators.',
                    'Use materialized views for expensive dashboard queries that do not need real-time data.',
                    'Consider full-text search before adding Elasticsearch — it handles many use cases well.'
                ]
            }
        },
        'pg-administration': {
            id: 'pg-administration',
            label: 'Administration',
            description: 'Users, roles, permissions, backups, replication, and monitoring.',
            parentId: 'pg-root',
            resources: [
                { type: 'documentation', title: 'PostgreSQL Administration', url: 'https://www.postgresql.org/docs/current/admin.html', isFree: true }
            ],
            content: {
                overview: 'PostgreSQL administration covers managing users, roles, permissions, backups, and high availability. The role-based access control system lets you create users and groups, grant specific permissions on databases, schemas, and tables, and revoke them. Backups can be done with pg_dump (logical, plain SQL) or pg_basebackup (physical, binary). Point-in-time recovery (PITR) with WAL (Write-Ahead Logging) archiving lets you restore to any moment. Replication options include streaming replication (for read replicas) and logical replication (for selective data sync). Monitoring tools like pg_stat_statements, pg_stat_user_tables, and external tools (pgMonitor, Datadog) help track performance and identify issues.',
                keyConcepts: [
                    'Roles and privileges: GRANT, REVOKE',
                    'Row-Level Security (RLS) policies',
                    'pg_dump and pg_restore for backups',
                    'WAL archiving and point-in-time recovery',
                    'Streaming replication for read replicas',
                    'Logical replication for selective data sync',
                    'pg_stat_statements for query performance tracking',
                    'Configuration tuning: shared_buffers, work_mem'
                ],
                practiceQuestions: [
                    { question: 'What is Row-Level Security (RLS)?', hint: 'A feature that restricts which rows a user can see or modify based on policies.', difficulty: 'hard' },
                    { question: 'What is the difference between logical and physical backup?', hint: 'Logical (pg_dump) exports SQL statements; physical (pg_basebackup) copies the raw data files.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Follow the principle of least privilege for database roles.',
                    'Set up automated daily backups with pg_dump or managed backups.',
                    'Enable pg_stat_statements to track slow queries.',
                    'Use RLS when building multi-tenant SaaS applications.',
                    'Tune shared_buffers to about 25% of available RAM.'
                ]
            }
        },
        'pg-extensions': {
            id: 'pg-extensions',
            label: 'Extensions',
            description: 'PostGIS, pg_trgm, pgvector, uuid-ossp, and other powerful extensions.',
            parentId: 'pg-root',
            resources: [
                { type: 'documentation', title: 'PostgreSQL Extensions', url: 'https://www.postgresql.org/docs/current/contrib.html', isFree: true }
            ],
            content: {
                overview: 'PostgreSQL\'s extension system is one of its greatest strengths. Extensions add new data types, functions, operators, and index types. PostGIS adds geographic data types and spatial queries, making PostgreSQL a powerful GIS database. pg_trgm enables trigram-based similarity matching for fuzzy search. pgvector adds vector data types for AI/ML embeddings and similarity search. uuid-ossp and gen_random_uuid() generate UUIDs. pgcrypto provides hashing and encryption functions. timescaledb turns PostgreSQL into a time-series database. The extension ecosystem means you can often avoid adding separate services (Elasticsearch, Redis, specialized databases) by using PostgreSQL extensions instead.',
                keyConcepts: [
                    'CREATE EXTENSION syntax',
                    'PostGIS for geospatial data and queries',
                    'pg_trgm for fuzzy matching and similarity search',
                    'pgvector for AI embeddings and vector similarity',
                    'uuid-ossp for UUID generation',
                    'pgcrypto for hashing and encryption',
                    'pg_stat_statements for query analysis',
                    'timescaledb for time-series data'
                ],
                practiceQuestions: [
                    { question: 'What is pgvector and why is it relevant for AI applications?', hint: 'It stores vector embeddings and performs similarity search using cosine distance, L2 distance, or inner product.', difficulty: 'hard' },
                    { question: 'How does pg_trgm help with search?', hint: 'It breaks text into trigrams (3-character sequences) and compares them for similarity matching.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Check if a PostgreSQL extension can solve your problem before adding a new service.',
                    'Enable pg_stat_statements on every PostgreSQL instance.',
                    'Use pgvector instead of a separate vector database for simple AI applications.',
                    'Test extension compatibility with your PostgreSQL version before deploying.'
                ]
            }
        },
        'pg-performance': {
            id: 'pg-performance',
            label: 'Performance Tuning',
            description: 'EXPLAIN ANALYZE, indexing strategies, VACUUM, and configuration tuning.',
            parentId: 'pg-root',
            resources: [
                { type: 'article', title: 'PostgreSQL Performance Tips', url: 'https://www.postgresql.org/docs/current/performance-tips.html', isFree: true },
                { type: 'article', title: 'PgTune - Config Generator', url: 'https://pgtune.leopard.in.ua/', isFree: true }
            ],
            content: {
                overview: 'PostgreSQL performance tuning starts with understanding how the query planner works. EXPLAIN ANALYZE runs a query and shows the actual execution plan with timing information. The key things to look for are sequential scans on large tables (add an index), high row estimates vs actuals (run ANALYZE to update statistics), and nested loop joins on large datasets (might need a different index or query restructure). VACUUM reclaims storage from deleted rows (due to MVCC, deletes do not immediately free space). PostgreSQL has many configuration parameters (shared_buffers, effective_cache_size, work_mem, maintenance_work_mem) that should be tuned based on your hardware and workload. Tools like PgTune generate recommended settings based on your server specs.',
                keyConcepts: [
                    'EXPLAIN ANALYZE: reading query plans',
                    'Index types: B-tree, GIN, GiST, BRIN, Hash',
                    'Partial indexes for conditional queries',
                    'VACUUM and autovacuum for dead tuple cleanup',
                    'ANALYZE for updating table statistics',
                    'Connection pooling with PgBouncer',
                    'Configuration tuning: shared_buffers, work_mem',
                    'Table partitioning for very large tables'
                ],
                practiceQuestions: [
                    { question: 'What is a partial index?', hint: 'An index that only covers rows matching a WHERE condition, reducing index size and improving performance for specific queries.', difficulty: 'hard' },
                    { question: 'Why does PostgreSQL need VACUUM?', hint: 'Because MVCC creates dead tuples when rows are updated or deleted. VACUUM reclaims that space.', difficulty: 'medium' },
                    { question: 'What is connection pooling and why is it needed?', hint: 'Reusing database connections instead of creating new ones for each request, reducing connection overhead.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use PgTune to generate initial configuration settings.',
                    'Monitor autovacuum activity and adjust thresholds if needed.',
                    'Use partial indexes for tables with common filter conditions.',
                    'Consider BRIN indexes for time-series or append-only data.',
                    'Use connection pooling for applications with many concurrent users.'
                ]
            }
        }
    }
};
