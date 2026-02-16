
import { RoadmapTrack } from './types';

export const backendRoadmap: RoadmapTrack = {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Step by step guide to becoming a modern Backend Developer in 2025',
    category: 'role-based',
    icon: '⚙️',
    accentColor: '#10b981',
    rootNodeId: 'backend-root',
    nodes: {
        // ─── LEVEL 0: Foundation ───
        'backend-root': {
            id: 'backend-root',
            label: 'Backend Development',
            description: 'Mastering the server-side logic, database management, and API architectures that power modern web applications.',
            children: ['pick-language', 'databases', 'apis'],
            resources: [
                { type: 'article', title: 'MDN - Backend Web Development', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps', isFree: true },
                { type: 'video', title: 'Backend Web Development in 10 Minutes', url: 'https://www.youtube.com/watch?v=XBu54nfzxAQ', isFree: true },
                { type: 'article', title: 'Roadmap.sh - Backend Developer', url: 'https://roadmap.sh/backend', isFree: true },
                { type: 'course', title: 'Backend Specialization - Coursera', url: 'https://www.coursera.org/specializations/backend-development', isFree: false },
                { type: 'article', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', isFree: true }
            ],
            content: {
                overview: 'Backend development, also known as server-side development, focuses on the core functional logic of a web application. While the frontend handles the visual experience, the backend is responsible for data persistence, security, business logic, and communication between various services. \n\nBecoming a backend engineer requires understanding how to build scalable APIs, manage complex databases, handle authentication/authorization, and deploy applications to cloud environments. It is the "brain" behind the interface, ensuring that user requests are processed correctly and securely.',
                keyConcepts: [
                    'Client-Server Model: The request-response lifecycle',
                    'Server-side Languages: Node.js, Python, Go, Java, Rust',
                    'Database Management: SQL vs NoSQL, Indexing, and ACID',
                    'API Design: REST, GraphQL, and WebHooks',
                    'Authentication: JWT, OAuth2, and Session-based auth',
                    'Server Infrastructure: Web servers, Proxy/Reverse Proxy, and CDNs',
                    'Security: SQL Injection prevention, Hashing, and Encryption',
                    'Scalability: Load balancing, Caching, and Microservices'
                ],
                practiceQuestions: [
                    { question: 'What is the primary role of a Load Balancer?', hint: 'Distributes traffic across multiple servers.', difficulty: 'medium' },
                    { question: 'Explain the difference between Authentication and Authorization.', hint: 'Who you are vs What you can do.', difficulty: 'easy' },
                    { question: 'What does the term "Stateless" mean in the context of REST APIs?', hint: 'Server doesn\'t store client state between requests.', difficulty: 'hard' },
                    { question: 'Why is password hashing important?', hint: 'Prevents plain-text leaks if database is compromised.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Prioritize security at every layer—never trust user input.',
                    'Write modular, testable code following the SOLID principles.',
                    'Use environment variables for sensitive configurations.',
                    'Implement comprehensive logging and monitoring from the start.',
                    'Design for failure: use retries, circuit breakers, and timeouts.',
                    'Keep APIs backward-compatible using versioning (e.g., /v1/).'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Understanding Backend', description: 'What is backend development and why it matters.', tasks: ['Learn about client-server architecture', 'Understand request-response lifecycle', 'Explore the role of a backend developer'] },
            ]
        },

        // ─── LEVEL 1: Languages ───
        'pick-language': {
            id: 'pick-language',
            label: 'Pick a Language',
            description: 'Choose a backend programming language to master. Popular choices include JavaScript (Node.js), Python, Java, Go, Rust, and C#.',
            parentId: 'backend-root',
            children: ['nodejs', 'python', 'java', 'go'],
            resources: [
                { type: 'article', title: 'Best Backend Languages in 2025', url: 'https://www.freecodecamp.org/news/best-programming-languages-to-learn/', isFree: true },
            ],
        },

        'nodejs': {
            id: 'nodejs',
            label: 'Node.js',
            description: 'Mastering the JavaScript runtime built on Chrome\'s V8 engine for building fast, scalable network applications.',
            parentId: 'pick-language',
            children: ['expressjs', 'nestjs'],
            resources: [
                { type: 'documentation', title: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs/', isFree: true },
                { type: 'article', title: 'Node.js Event Loop - Deep Dive', url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick', isFree: true },
                { type: 'video', title: 'The Node.js Event Loop: Not so single-threaded', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ', isFree: true },
                { type: 'course', title: 'Node.js, Express, MongoDB & More (Udemy)', url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/', isFree: false }
            ],
            content: {
                overview: 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. \n\nNode.js is built on the high-performance V8 engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. It is particularly well-suited for data-intensive real-time applications, such as chat servers, streaming platforms, and collaborative tools. Understanding the Event Loop is crucial for writing efficient Node.js applications.',
                keyConcepts: [
                    'V8 Engine: Google\'s high-performance JS engine',
                    'The Event Loop: Mechanism for non-blocking I/O',
                    'NPM/Yarn/pnpm: Package managers and dependency trees',
                    'CommonJS vs ES Modules (import/export)',
                    'Buffer and Streams: Handling binary data and large files',
                    'File System (fs) and Path modules',
                    'Error Handling: process.on(\'uncaughtException\') vs try/catch',
                    'Cluster and Worker Threads: Multi-threading in Node.js'
                ],
                codeExamples: [
                    {
                        title: 'Express.js Server Template',
                        language: 'javascript',
                        code: 'const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.json({ message: "Hello from PrepXtra Node.js!" });\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`Server on port ${PORT}`));'
                    },
                    {
                        title: 'Streamed File Read',
                        language: 'javascript',
                        code: 'const fs = require("fs");\nconst stream = fs.createReadStream("./large-data.txt");\n\nstream.on("data", (chunk) => {\n  console.log("Read chunk of size:", chunk.length);\n});'
                    }
                ],
                practiceQuestions: [
                    { question: 'What does "Non-blocking I/O" actually mean?', hint: 'The thread doesn\'t wait for disk/network; it moves to the next task.', difficulty: 'medium' },
                    { question: 'What is the purpose of "package-lock.json"?', hint: 'Ensures exact dependency versions across environments.', difficulty: 'easy' },
                    { question: 'What is the difference between `setImmediate()` and `process.nextTick()`?', hint: 'nextTick runs immediately after the current operation; setImmediate runs in the next loop phase.', difficulty: 'hard' },
                    { question: 'How do you handle high-CPU tasks in Node.js without blocking?', hint: 'Worker Threads or offloading to a separate service.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Never block the Event Loop with heavy synchronous logic.',
                    'Use `async/await` to avoid "callback hell".',
                    'Always handle errors in Promises using `catch()` or `try-catch`.',
                    'Organize your project into layers (Controller, Service, Repository).',
                    'Keep your dependencies updated and audit for vulnerabilities (`npm audit`).',
                    'Use environment variables for data like DB URLs and API keys.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Node.js Basics', description: 'Get started with server-side JavaScript.', tasks: ['Install Node.js and understand the runtime', 'Learn the module system (CommonJS & ES Modules)', 'Work with the file system and path modules'] },
                { day: 2, title: 'HTTP Server', description: 'Build your first server.', tasks: ['Create an HTTP server from scratch', 'Handle routes and methods', 'Parse request bodies and query parameters'] },
                { day: 3, title: 'Async Patterns', description: 'Master asynchronous Node.js.', tasks: ['Work with streams and buffers', 'Handle errors in async code', 'Use the cluster module for scalability'] },
            ]
        },

        'expressjs': {
            id: 'expressjs',
            label: 'Express.js',
            description: 'Minimal, flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
            parentId: 'nodejs',
            resources: [
                { type: 'documentation', title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html', isFree: true },
                { type: 'video', title: 'Express.js Crash Course', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Express Fundamentals', description: 'Build REST APIs with Express.', tasks: ['Set up an Express project', 'Create routes and middleware', 'Handle request/response objects'] },
                { day: 2, title: 'Middleware & Error Handling', description: 'Build robust APIs.', tasks: ['Create custom middleware', 'Implement error handling middleware', 'Add input validation with express-validator'] },
            ]
        },

        'nestjs': {
            id: 'nestjs',
            label: 'NestJS',
            description: 'A progressive Node.js framework for building efficient, scalable server-side applications using TypeScript, inspired by Angular.',
            parentId: 'nodejs',
            resources: [
                { type: 'documentation', title: 'NestJS Documentation', url: 'https://docs.nestjs.com/', isFree: true },
            ],
        },

        'python': {
            id: 'python',
            label: 'Python',
            description: 'Known for its readability and vast ecosystem. Popular frameworks include Django (full-stack), Flask (micro), and FastAPI (modern async).',
            parentId: 'pick-language',
            children: ['django', 'fastapi'],
            resources: [
                { type: 'documentation', title: 'Python Documentation', url: 'https://docs.python.org/3/', isFree: true },
                { type: 'course', title: 'Python for Everybody', url: 'https://www.py4e.com/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Python Basics', description: 'Learn Python fundamentals.', tasks: ['Variables, data types, and operators', 'Control flow (if/else, loops)', 'Functions and modules'] },
                { day: 2, title: 'Python Advanced', description: 'OOP and data structures.', tasks: ['Classes, inheritance, and polymorphism', 'List comprehensions and generators', 'Error handling and file I/O'] },
            ]
        },

        'django': {
            id: 'django',
            label: 'Django',
            description: 'High-level Python web framework that encourages rapid development with its "batteries included" philosophy.',
            parentId: 'python',
            resources: [
                { type: 'documentation', title: 'Django Documentation', url: 'https://docs.djangoproject.com/', isFree: true },
            ],
        },

        'fastapi': {
            id: 'fastapi',
            label: 'FastAPI',
            description: 'Modern, fast Python web framework for building APIs with automatic OpenAPI documentation and type validation.',
            parentId: 'python',
            resources: [
                { type: 'documentation', title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', isFree: true },
            ],
        },

        'java': {
            id: 'java',
            label: 'Java',
            description: 'Enterprise-grade language with Spring Boot framework for building production-ready microservices and web applications.',
            parentId: 'pick-language',
            resources: [
                { type: 'documentation', title: 'Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/', isFree: true },
                { type: 'documentation', title: 'Spring Boot Guide', url: 'https://spring.io/guides', isFree: true },
            ],
        },

        'go': {
            id: 'go',
            label: 'Go (Golang)',
            description: 'A statically typed language designed for simplicity and high performance. Excellent for microservices, CLI tools, and concurrent systems.',
            parentId: 'pick-language',
            resources: [
                { type: 'documentation', title: 'Go Documentation', url: 'https://go.dev/doc/', isFree: true },
                { type: 'article', title: 'Go by Example', url: 'https://gobyexample.com/', isFree: true },
            ],
        },

        // ─── LEVEL 1: Databases ───
        'databases': {
            id: 'databases',
            label: 'Databases',
            description: 'Mastering the art of data persistence, modeling, and optimization across relational and non-relational systems.',
            parentId: 'backend-root',
            children: ['relational-db', 'nosql-db', 'orms'],
            resources: [
                { type: 'article', title: 'Carnegie Mellon - Database Systems Course', url: 'https://15445.courses.cs.cmu.edu/', isFree: true },
                { type: 'video', title: 'Database Design Course - Learn Full Database Design', url: 'https://www.youtube.com/watch?v=ztHopE5Wubs', isFree: true },
                { type: 'article', title: 'SQL vs NoSQL in 2025', url: 'https://blog.logrocket.com/sql-vs-nosql-database-pros-cons/', isFree: true },
                { type: 'article', title: 'ACID properties vs BASE', url: 'https://www.geeksforgeeks.org/acid-vs-base-property-in-dbms/', isFree: true },
                { type: 'course', title: 'MongoDB University - Free Courses', url: 'https://university.mongodb.com/', isFree: true }
            ],
            content: {
                overview: 'Databases are the foundation of any application that needs to store and retrieve information reliably. As a backend developer, your role involves choosing the right database paradigm for the task, designing efficient schemas, and optimizing queries for performance. \n\nRelational databases (SQL) offer strong consistency and structured data, while NoSQL databases provide flexibility and massive scalability for unstructured or rapidly changing data. Mastering database internals—like indexing, transactions, and replication—is what separates a junior developer from a senior engineer.',
                keyConcepts: [
                    'ACID Properties: Atomicity, Consistency, Isolation, Durability',
                    'The CAP Theorem: Consistency, Availability, Partition Tolerance',
                    'Normalization vs Denormalization: Trade-offs in schema design',
                    'Indexing: B-Trees, Hash indexes, and query optimization',
                    'Transactions and Locking: Ensuring data integrity during concurrent access',
                    'Relational (PostgreSQL, MySQL) vs NoSQL (MongoDB, DynamoDB)',
                    'Replication and Sharding: Scaling databases horizontally',
                    'Query Planning and Execution: How the engine finds your data'
                ],
                practiceQuestions: [
                    { question: 'What does the "I" in ACID stand for?', hint: 'Concurrency control.', difficulty: 'easy' },
                    { question: 'Explain the CAP theorem with a real-world example.', hint: 'Distributed systems trade-offs.', difficulty: 'hard' },
                    { question: 'When would you chose a Document DB (NoSQL) over a Relational DB?', hint: 'Flexible schema, high throughput, fast development.', difficulty: 'medium' },
                    { question: 'What is a "Deadlock" and how do you prevent it?', hint: 'Two transactions waiting for each other.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always normalize your data unless you have a specific performance-driven reason to denormalize.',
                    'Use Indexes strategically: too many indexes slow down writes, too few slow down reads.',
                    'Always back up your data and test your restoration process.',
                    'Use ORMs for speed, but always know how to write the underlying raw SQL.',
                    'Secure your database: use different users for application access vs administrative tasks.',
                    'Monitor slow queries and use EXPLAIN ANALYZE to debug them.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Database Fundamentals', description: 'Understand different database types.', tasks: ['Learn about ACID properties', 'Understand normalization and relationships', 'Compare SQL vs NoSQL use cases'] },
            ]
        },

        'relational-db': {
            id: 'relational-db',
            label: 'Relational Databases',
            description: 'SQL databases like PostgreSQL, MySQL, and SQLite. Store data in tables with relationships between them.',
            parentId: 'databases',
            resources: [
                { type: 'documentation', title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', isFree: true },
                { type: 'course', title: 'SQL Tutorial - W3Schools', url: 'https://www.w3schools.com/sql/', isFree: true },
                { type: 'video', title: 'PostgreSQL Full Course', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'SQL Basics', description: 'Write database queries.', tasks: ['Learn SELECT, INSERT, UPDATE, DELETE', 'Master WHERE, JOIN, GROUP BY clauses', 'Understand indexes and query optimization'] },
                { day: 2, title: 'Advanced SQL', description: 'Complex queries and design.', tasks: ['Subqueries and CTEs', 'Database design and normalization', 'Stored procedures and triggers'] },
            ]
        },

        'nosql-db': {
            id: 'nosql-db',
            label: 'NoSQL Databases',
            description: 'Non-relational databases including document stores (MongoDB), key-value stores (Redis), and graph databases (Neo4j).',
            parentId: 'databases',
            resources: [
                { type: 'documentation', title: 'MongoDB Documentation', url: 'https://www.mongodb.com/docs/', isFree: true },
                { type: 'documentation', title: 'Redis Documentation', url: 'https://redis.io/documentation', isFree: true },
            ],
        },

        'orms': {
            id: 'orms',
            label: 'ORMs',
            description: 'Object-Relational Mapping tools like Prisma, Sequelize, SQLAlchemy, and Hibernate that abstract database operations.',
            parentId: 'databases',
            resources: [
                { type: 'documentation', title: 'Prisma Documentation', url: 'https://www.prisma.io/docs', isFree: true },
                { type: 'documentation', title: 'Sequelize Documentation', url: 'https://sequelize.org/', isFree: true },
            ],
        },

        // ─── LEVEL 1: APIs ───
        'apis': {
            id: 'apis',
            label: 'APIs',
            description: 'Mastering the standards and protocols for building robust, secure, and scalable application interfaces.',
            parentId: 'backend-root',
            children: ['rest-api', 'graphql', 'websockets'],
            resources: [
                { type: 'article', title: 'Microsoft - API Design Guide', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design', isFree: true },
                { type: 'article', title: 'REST API Best Practices', url: 'https://restfulapi.net/', isFree: true },
                { type: 'video', title: 'GraphQL vs REST: Which one to choose?', url: 'https://www.youtube.com/watch?v=yWzKJPw_VzM', isFree: true },
                { type: 'article', title: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/', isFree: true },
                { type: 'video', title: 'Mastering WebSockets for Real-time Apps', url: 'https://www.youtube.com/watch?v=2VafUIJRSBs', isFree: true }
            ],
            content: {
                overview: 'APIs (Application Programming Interfaces) are the glue of the modern web. They allow different software systems to talk to each other over the internet. In backend development, your primary job is often centered around creating APIs that the frontend or other services can consume. \n\nLearning APIs involves more than just picking a format like REST or GraphQL; it requires deep knowledge of HTTP semantics, security (AuthN/AuthZ), rate limiting, and versioning. A well-designed API should be intuitive for developers to use, secure against malicious actors, and fast enough to handle high traffic loads.',
                keyConcepts: [
                    'REST Architecture: Hypermedia, Statelessness, and Cacheability',
                    'HTTP Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS',
                    'Status Codes: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error)',
                    'GraphQL: Schemas, Queries, Mutations, and Resolvers',
                    'Authentication in APIs: OAuth2, OpenID Connect, JWT, and API Keys',
                    'Real-time Communication: WebSockets vs Server-Sent Events (SSE)',
                    'API Security: CORS, CSRF tokens, and Rate Limiting',
                    'Documentation: Swagger/OpenAPI and Postman'
                ],
                practiceQuestions: [
                    { question: 'What is the idempotent nature of HTTP methods?', hint: 'Calling the same operation multiple times has the same result.', difficulty: 'hard' },
                    { question: 'Contrast "PUT" and "PATCH" methods.', hint: 'Full replacement vs Partial update.', difficulty: 'medium' },
                    { question: 'Explain "Over-fetching" in the context of REST.', hint: 'Receiving more data than you actually need for the UI.', difficulty: 'easy' },
                    { question: 'How do you handle breaking changes in a public API?', hint: 'Versioning (/v1/, /v2/) or Header-based versioning.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use plural nouns for resource paths (e.g., /users instead of /getUser).',
                    'Return appropriate HTTP status codes—don\'t return 200 OK for errors.',
                    'Implement Rate Limiting to prevent DOS attacks and API abuse.',
                    'Use JSON as the default data format for its simplicity and wide support.',
                    'Provide clear and actionable error messages in the response body.',
                    'Use SSL/TLS for all API communication to protect sensitive data.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'API Design', description: 'Design clean and intuitive APIs.', tasks: ['Understand REST principles and HTTP methods', 'Learn about API versioning and documentation', 'Explore OpenAPI/Swagger for API specification'] },
            ]
        },

        'rest-api': {
            id: 'rest-api',
            label: 'REST APIs',
            description: 'Representational State Transfer - the most common API architectural style using HTTP methods and status codes.',
            parentId: 'apis',
            resources: [
                { type: 'article', title: 'REST API Tutorial', url: 'https://restfulapi.net/', isFree: true },
                { type: 'video', title: 'Build a REST API', url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'REST Fundamentals', description: 'Build RESTful endpoints.', tasks: ['Design CRUD endpoints', 'Implement proper HTTP status codes', 'Add pagination, filtering, and sorting'] },
                { day: 2, title: 'API Documentation', description: 'Document your API.', tasks: ['Set up Swagger/OpenAPI', 'Add request/response schemas', 'Create example requests with Postman'] },
            ]
        },

        'graphql': {
            id: 'graphql',
            label: 'GraphQL',
            description: 'A query language for APIs that allows clients to request exactly the data they need, reducing over-fetching.',
            parentId: 'apis',
            resources: [
                { type: 'documentation', title: 'GraphQL Documentation', url: 'https://graphql.org/learn/', isFree: true },
                { type: 'course', title: 'GraphQL with React', url: 'https://www.howtographql.com/', isFree: true },
            ],
        },

        'websockets': {
            id: 'websockets',
            label: 'WebSockets',
            description: 'Protocol for full-duplex communication channels over a single TCP connection. Essential for real-time features like chat and live updates.',
            parentId: 'apis',
            resources: [
                { type: 'documentation', title: 'Socket.io Documentation', url: 'https://socket.io/docs/', isFree: true },
                { type: 'article', title: 'WebSocket Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', isFree: true },
            ],
        },

        // ─── Authentication & Authorization ───
        'authentication': {
            id: 'authentication',
            label: 'Authentication',
            description: 'Secure your applications with JWT, OAuth 2.0, session-based auth, API keys, and multi-factor authentication.',
            children: ['jwt', 'oauth'],
            resources: [
                { type: 'article', title: 'Authentication vs Authorization', url: 'https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Auth Fundamentals', description: 'Implement secure authentication.', tasks: ['Understand hashing and salting passwords (bcrypt)', 'Implement JWT-based authentication', 'Set up refresh token rotation'] },
                { day: 2, title: 'OAuth & Social Login', description: 'Third-party authentication.', tasks: ['Understand OAuth 2.0 flow', 'Implement Google/GitHub login', 'Handle role-based access control (RBAC)'] },
            ]
        },

        'jwt': {
            id: 'jwt',
            label: 'JWT Tokens',
            description: 'JSON Web Tokens for stateless authentication. Learn token creation, validation, refresh strategies, and security best practices.',
            parentId: 'authentication',
            resources: [
                { type: 'article', title: 'JWT.io Introduction', url: 'https://jwt.io/introduction', isFree: true },
            ],
        },

        'oauth': {
            id: 'oauth',
            label: 'OAuth 2.0',
            description: 'Authorization framework enabling third-party applications to access user resources. Supports Google, GitHub, and other social logins.',
            parentId: 'authentication',
            resources: [
                { type: 'article', title: 'OAuth 2.0 Simplified', url: 'https://aaronparecki.com/oauth-2-simplified/', isFree: true },
            ],
        },

        // ─── Caching & Message Queues ───
        'caching': {
            id: 'caching',
            label: 'Caching',
            description: 'Improve performance with caching strategies using Redis, Memcached, CDNs, and browser caching. Learn cache invalidation patterns.',
            resources: [
                { type: 'article', title: 'Caching Best Practices', url: 'https://aws.amazon.com/caching/best-practices/', isFree: true },
                { type: 'documentation', title: 'Redis Quick Start', url: 'https://redis.io/topics/quickstart', isFree: true },
            ],
        },

        'message-queues': {
            id: 'message-queues',
            label: 'Message Queues',
            description: 'Asynchronous communication between services using RabbitMQ, Apache Kafka, or AWS SQS for event-driven architectures.',
            resources: [
                { type: 'documentation', title: 'RabbitMQ Tutorials', url: 'https://www.rabbitmq.com/getstarted.html', isFree: true },
                { type: 'article', title: 'Intro to Apache Kafka', url: 'https://kafka.apache.org/intro', isFree: true },
            ],
        },

        // ─── Containerization & CI/CD ───
        'containerization': {
            id: 'containerization',
            label: 'Containerization',
            description: 'Package applications with their dependencies using Docker. Learn Docker Compose for multi-container orchestration.',
            resources: [
                { type: 'documentation', title: 'Docker Documentation', url: 'https://docs.docker.com/', isFree: true },
                { type: 'video', title: 'Docker Crash Course', url: 'https://www.youtube.com/watch?v=31ieHmcTUOk', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Docker Basics', description: 'Containerize your applications.', tasks: ['Install Docker and understand images vs containers', 'Write a Dockerfile for your app', 'Use Docker Compose for multi-service setups'] },
            ]
        },

        'backend-testing': {
            id: 'backend-testing',
            label: 'Testing',
            description: 'Test your backend with unit tests (Jest, Mocha), integration tests, and API testing tools (Postman, Supertest).',
            resources: [
                { type: 'documentation', title: 'Jest Documentation', url: 'https://jestjs.io/', isFree: true },
                { type: 'article', title: 'API Testing with Postman', url: 'https://learning.postman.com/docs/', isFree: true },
            ],
        },

        // ─── Architecture ───
        'architecture': {
            id: 'architecture',
            label: 'Software Architecture',
            description: 'Design scalable systems with monolithic, microservices, serverless, and event-driven architectures. Learn design patterns and system design principles.',
            resources: [
                { type: 'article', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', isFree: true },
                { type: 'article', title: 'Microservices Guide', url: 'https://microservices.io/', isFree: true },
                { type: 'course', title: 'Grokking System Design Interview', url: 'https://www.designgurus.io/course/grokking-the-system-design-interview', isFree: false },
            ],
            dayWisePlan: [
                { day: 1, title: 'Architecture Patterns', description: 'Choose the right architecture.', tasks: ['Compare monolithic vs microservices', 'Learn about event-driven architecture', 'Understand serverless computing'] },
                { day: 2, title: 'System Design', description: 'Design scalable systems.', tasks: ['Learn about load balancing and horizontal scaling', 'Understand CAP theorem and database sharding', 'Practice designing URL shortener, chat system'] },
            ]
        },
    }
};
