
import { RoadmapTrack } from './types';

export const mongodbRoadmap: RoadmapTrack = {
    id: 'mongodb',
    title: 'MongoDB',
    description: 'Master the leading NoSQL document database',
    category: 'skill-based',
    icon: '🍃',
    accentColor: '#47a248',
    rootNodeId: 'mongo-root',
    nodes: {
        'mongo-root': {
            id: 'mongo-root',
            label: 'MongoDB Mastery',
            description: 'Learn to build scalable applications with MongoDB\'s flexible document model.',
            children: ['mongo-basics', 'mongo-crud', 'mongo-aggregation', 'mongo-indexing', 'mongo-mongoose'],
            resources: [
                { type: 'documentation', title: 'MongoDB Documentation', url: 'https://www.mongodb.com/docs/', isFree: true },
                { type: 'course', title: 'MongoDB University (Free)', url: 'https://university.mongodb.com/', isFree: true },
                { type: 'video', title: 'MongoDB Crash Course - Traversy Media', url: 'https://www.youtube.com/watch?v=-56x56UppqQ', isFree: true }
            ],
            content: {
                overview: 'MongoDB is the most popular NoSQL database, using a document model instead of the traditional rows-and-columns structure of relational databases. Data is stored as flexible JSON-like documents (BSON) in collections rather than tables. This means different documents in the same collection can have different fields, making it ideal for applications where the data structure evolves frequently. MongoDB excels at horizontal scaling (sharding) and is commonly used for real-time analytics, content management, IoT data, and applications that need to store hierarchical or nested data naturally. It was created in 2007 and is now used by companies like Google, Facebook, eBay, and Adobe.',
                keyConcepts: [
                    'Documents, collections, and databases',
                    'BSON format (Binary JSON)',
                    'Flexible schema: schema-less design',
                    'CRUD operations with MongoDB query language',
                    'Aggregation pipeline for data processing',
                    'Indexes for query performance',
                    'Replication for high availability (replica sets)',
                    'Sharding for horizontal scaling'
                ],
                practiceQuestions: [
                    { question: 'When would you choose MongoDB over a relational database?', hint: 'When your data is hierarchical/nested, schema changes frequently, or you need horizontal scaling.', difficulty: 'medium' },
                    { question: 'What is the difference between embedding and referencing in MongoDB?', hint: 'Embedding stores related data inside the same document; referencing stores an ID link to another document (like a foreign key).', difficulty: 'medium' },
                    { question: 'What is BSON?', hint: 'Binary JSON — MongoDB\'s binary representation of JSON that supports additional types like Date and ObjectId.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Design your schema around your query patterns, not your data relationships.',
                    'Embed data that is always accessed together; reference data that is accessed independently.',
                    'Always create indexes for fields you query frequently.',
                    'Use MongoDB Atlas for managed cloud hosting in production.',
                    'Set up replica sets for high availability from the start.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Getting Started', description: 'Installation and basic operations.', tasks: ['Install MongoDB locally or set up a free Atlas cluster', 'Learn to create databases, collections, and documents', 'Practice basic CRUD operations in mongosh'] },
                { day: 2, title: 'Queries and Aggregation', description: 'Advanced querying and data processing.', tasks: ['Master query operators: $gt, $in, $regex, $exists', 'Learn the aggregation pipeline: $match, $group, $project, $sort', 'Practice with nested documents and arrays'] },
                { day: 3, title: 'Schema Design and Optimization', description: 'Production-ready patterns.', tasks: ['Design schemas with embedding vs referencing', 'Create indexes and analyze query performance', 'Integrate MongoDB with a Node.js app using Mongoose'] }
            ]
        },
        'mongo-basics': {
            id: 'mongo-basics',
            label: 'Basics & Setup',
            description: 'Installation, databases, collections, documents, and the MongoDB shell.',
            parentId: 'mongo-root',
            resources: [
                { type: 'documentation', title: 'MongoDB Getting Started', url: 'https://www.mongodb.com/docs/manual/tutorial/getting-started/', isFree: true }
            ],
            content: {
                overview: 'MongoDB basics cover how data is organized and how to interact with it. A MongoDB instance contains databases, each database contains collections (analogous to tables), and each collection contains documents (analogous to rows). Documents are JSON-like objects with field-value pairs. Unlike SQL tables, documents in the same collection can have different structures. The MongoDB Shell (mongosh) is the interactive CLI for working with your database. MongoDB Atlas is the official cloud-hosted service that provides free-tier clusters, making it easy to get started without local installation. Every document has a unique _id field that MongoDB auto-generates as an ObjectId if you do not provide one.',
                keyConcepts: [
                    'Database, collection, and document hierarchy',
                    'MongoDB Shell (mongosh) commands',
                    'ObjectId: automatically generated unique identifiers',
                    'Data types: String, Number, Boolean, Array, Object, Date, ObjectId',
                    'MongoDB Atlas for cloud hosting',
                    'MongoDB Compass GUI for visual database management',
                    'BSON vs JSON representation'
                ],
                practiceQuestions: [
                    { question: 'What is an ObjectId in MongoDB?', hint: 'A 12-byte unique identifier auto-generated for every document, containing a timestamp, machine ID, and counter.', difficulty: 'easy' },
                    { question: 'How is a MongoDB collection different from a SQL table?', hint: 'Collections do not enforce a schema — documents can have different fields.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use MongoDB Atlas free tier for learning and development.',
                    'Name databases and collections in lowercase with hyphens or underscores.',
                    'Use MongoDB Compass for visual exploration during development.',
                    'Always connect using connection strings with authentication enabled.'
                ]
            }
        },
        'mongo-crud': {
            id: 'mongo-crud',
            label: 'CRUD Operations',
            description: 'Insert, find, update, and delete documents with query operators.',
            parentId: 'mongo-root',
            resources: [
                { type: 'documentation', title: 'MongoDB CRUD Operations', url: 'https://www.mongodb.com/docs/manual/crud/', isFree: true }
            ],
            content: {
                overview: 'CRUD operations in MongoDB use a rich query language with JSON-based syntax. Insert operations use insertOne() and insertMany(). Find operations use find() with query filters and projection to select which fields to return. Update operations use updateOne(), updateMany(), and replaceOne() with update operators like $set, $inc, $push, $pull, and $unset. Delete operations use deleteOne() and deleteMany(). MongoDB query filters support comparison operators ($eq, $gt, $lt, $in, $nin), logical operators ($and, $or, $not), element operators ($exists, $type), and array operators ($all, $elemMatch, $size). The dot notation lets you query nested fields within embedded documents.',
                keyConcepts: [
                    'insertOne() and insertMany()',
                    'find() with filters and projection',
                    'Query operators: $eq, $gt, $lt, $in, $regex',
                    'Logical operators: $and, $or, $not, $nor',
                    'Update operators: $set, $inc, $push, $pull, $unset',
                    'Array query operators: $all, $elemMatch, $size',
                    'Dot notation for nested field queries',
                    'Upsert: insert if not exists, update if exists'
                ],
                practiceQuestions: [
                    { question: 'What does the $set operator do in an update?', hint: 'It sets the value of a field. If the field does not exist, it creates it.', difficulty: 'easy' },
                    { question: 'How do you add an item to an array field?', hint: 'Use the $push operator in an update operation.', difficulty: 'easy' },
                    { question: 'What is the difference between find() and findOne()?', hint: 'find() returns a cursor to multiple documents; findOne() returns the first matching document.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use projection to return only the fields you need.',
                    'Use bulkWrite() for multiple operations instead of individual calls.',
                    'Always use update operators ($set) instead of replacing entire documents.',
                    'Use upsert for insert-or-update patterns to avoid race conditions.'
                ]
            }
        },
        'mongo-aggregation': {
            id: 'mongo-aggregation',
            label: 'Aggregation Pipeline',
            description: 'Transform and analyze data with stages like $match, $group, $project, $lookup.',
            parentId: 'mongo-root',
            resources: [
                { type: 'documentation', title: 'Aggregation Pipeline', url: 'https://www.mongodb.com/docs/manual/core/aggregation-pipeline/', isFree: true },
                { type: 'article', title: 'MongoDB Aggregation Guide', url: 'https://www.practical-mongodb-aggregations.com/', isFree: true }
            ],
            content: {
                overview: 'The aggregation pipeline is MongoDB\'s most powerful feature for data processing. It works like a series of stages where each stage transforms the data and passes it to the next. Common stages include $match (filter documents, like WHERE), $group (group by a field and compute aggregates, like GROUP BY), $project (shape the output, like SELECT), $sort (order results), $limit and $skip (pagination), $unwind (flatten arrays), and $lookup (join with another collection, like a LEFT JOIN). You can chain as many stages as you need. The aggregation pipeline can also handle complex computations like running totals, moving averages, and data reshaping that would require multiple queries in SQL.',
                keyConcepts: [
                    '$match: filter documents (place early for performance)',
                    '$group: group and aggregate (_id, $sum, $avg, $count)',
                    '$project: reshape documents and compute new fields',
                    '$sort, $limit, $skip: ordering and pagination',
                    '$unwind: deconstruct arrays into individual documents',
                    '$lookup: join collections (left outer join)',
                    '$addFields: add computed fields',
                    'Accumulator expressions: $sum, $avg, $min, $max, $first, $last'
                ],
                practiceQuestions: [
                    { question: 'Why should you place $match early in the pipeline?', hint: 'To filter out documents before processing them, reducing the amount of data flowing through later stages.', difficulty: 'easy' },
                    { question: 'How is $lookup similar to a SQL JOIN?', hint: 'It lets you combine documents from two collections based on matching fields, similar to a LEFT OUTER JOIN.', difficulty: 'medium' },
                    { question: 'What does $unwind do and when would you use it?', hint: 'It deconstructs an array field into separate documents (one per array element). Useful for aggregating array data.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Place $match and $limit as early as possible to reduce data volume.',
                    'Use $project to remove unnecessary fields before expensive stages.',
                    'Use indexes on fields used in $match and $sort stages.',
                    'Test pipelines in MongoDB Compass before adding them to code.'
                ]
            }
        },
        'mongo-indexing': {
            id: 'mongo-indexing',
            label: 'Indexes & Performance',
            description: 'Create and manage indexes for fast queries and understand query planning.',
            parentId: 'mongo-root',
            resources: [
                { type: 'documentation', title: 'MongoDB Indexes', url: 'https://www.mongodb.com/docs/manual/indexes/', isFree: true }
            ],
            content: {
                overview: 'Without indexes, MongoDB must scan every document in a collection to find matching results (a collection scan). Indexes are data structures that store a subset of the collection\'s data in an easily traversable form. MongoDB supports many index types: single field, compound (multiple fields), multikey (for arrays), text (for full-text search), geospatial (for location queries), and hashed (for sharding). The explain() method shows how MongoDB executes a query and whether it uses an index. Every collection automatically has an index on the _id field. While indexes dramatically speed up reads, they slow down writes because every insert/update must also update the index. The right indexing strategy depends on your query patterns.',
                keyConcepts: [
                    'Single field and compound indexes',
                    'Multikey indexes for array fields',
                    'Text indexes for full-text search',
                    'explain() for query analysis',
                    'Index selectivity and covered queries',
                    'TTL indexes for auto-expiring documents',
                    'Unique indexes for enforcing constraints',
                    'The ESR rule: Equality, Sort, Range for compound index order'
                ],
                practiceQuestions: [
                    { question: 'What is a covered query?', hint: 'A query that can be fully satisfied by an index without accessing the actual documents.', difficulty: 'hard' },
                    { question: 'What is the ESR rule for compound indexes?', hint: 'Equality fields first, then Sort fields, then Range fields in the index definition.', difficulty: 'hard' },
                    { question: 'What is a TTL index?', hint: 'An index that automatically deletes documents after a specified amount of time (useful for session data or logs).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Create indexes based on your most common query patterns.',
                    'Use explain() to verify your queries are using indexes.',
                    'Follow the ESR rule when designing compound indexes.',
                    'Do not over-index — each index has storage and write overhead.',
                    'Use TTL indexes for data that should automatically expire.'
                ]
            }
        },
        'mongo-mongoose': {
            id: 'mongo-mongoose',
            label: 'Mongoose ODM',
            description: 'Use Mongoose with Node.js for schema validation, middleware, and query building.',
            parentId: 'mongo-root',
            resources: [
                { type: 'documentation', title: 'Mongoose Documentation', url: 'https://mongoosejs.com/docs/', isFree: true },
                { type: 'video', title: 'Mongoose Crash Course', url: 'https://www.youtube.com/watch?v=DZBGEVgL2eE', isFree: true }
            ],
            content: {
                overview: 'Mongoose is the most popular Object Document Mapper (ODM) for MongoDB in Node.js. While MongoDB itself is schema-less, Mongoose lets you define schemas that validate your data before it is saved. A schema defines the structure, types, defaults, validators, and virtuals for your documents. Models are compiled from schemas and provide an interface for CRUD operations. Mongoose middleware (also called hooks) lets you run code before or after operations like save, validate, or remove — useful for hashing passwords before saving or logging after deletion. Population is Mongoose\'s version of joins, replacing ObjectId references with actual document data. Mongoose adds structure to MongoDB\'s flexibility, making it easier to maintain larger applications.',
                keyConcepts: [
                    'Schema definition with types and validators',
                    'Models and document instances',
                    'Schema types: String, Number, Date, ObjectId, Array, Mixed',
                    'Validation: required, min, max, enum, custom validators',
                    'Middleware/hooks: pre and post save, validate, remove',
                    'Population: resolving ObjectId references',
                    'Virtual properties: computed fields not stored in the database',
                    'Query helpers and static methods'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a Mongoose schema and a model?', hint: 'A schema defines structure and validation; a model is a compiled version of the schema that provides CRUD methods.', difficulty: 'easy' },
                    { question: 'How does Mongoose population work?', hint: 'It replaces an ObjectId field with the actual referenced document from another collection (like a JOIN).', difficulty: 'medium' },
                    { question: 'What are Mongoose virtuals?', hint: 'Properties that are computed from other fields but not stored in the database (like a fullName composed of firstName + lastName).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always define schemas — do not use Schema.Types.Mixed for everything.',
                    'Use pre-save middleware for operations like password hashing.',
                    'Create indexes in your schema definition, not separately.',
                    'Use lean() for read-only queries to get plain objects (faster than Mongoose documents).',
                    'Limit population depth to avoid performance issues.'
                ]
            }
        }
    }
};
