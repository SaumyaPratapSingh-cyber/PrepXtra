
import { RoadmapTrack } from './types';

export const nodejsRoadmap: RoadmapTrack = {
    id: 'nodejs',
    title: 'Node.js',
    description: 'Master server-side JavaScript with Node.js',
    category: 'skill-based',
    icon: '🟢',
    accentColor: '#339933',
    rootNodeId: 'node-root',
    nodes: {
        'node-root': {
            id: 'node-root',
            label: 'Node.js Mastery',
            description: 'Learn to build scalable and efficient server-side applications with JavaScript.',
            children: ['node-basics', 'node-npm', 'node-express', 'node-databases', 'node-testing', 'node-auth'],
            resources: [
                { type: 'documentation', title: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs/', isFree: true },
                { type: 'video', title: 'Node.js Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', isFree: true },
                { type: 'course', title: 'The Complete Node.js Developer Course (Udemy)', url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/', isFree: false },
                { type: 'article', title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices', isFree: true }
            ],
            content: {
                overview: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that lets you run JavaScript outside the browser, primarily on servers. Before Node, JavaScript was confined to the browser. Node changed that by enabling full-stack development in a single language. It uses a single-threaded, non-blocking event loop architecture that makes it exceptionally good at handling many concurrent I/O operations (like API requests and database queries) without creating new threads for each one. This makes Node ideal for real-time applications like chat apps, streaming services, and REST APIs. Node has the largest ecosystem of open-source packages via npm (Node Package Manager) with over 2 million packages. Major companies using Node in production include Netflix, LinkedIn, PayPal, and Uber.',
                keyConcepts: [
                    'V8 engine and how Node executes JavaScript',
                    'Single-threaded event loop architecture',
                    'Non-blocking I/O and callbacks',
                    'CommonJS (require) vs ES Modules (import)',
                    'npm and package.json for dependency management',
                    'Core modules: fs, http, path, os, events',
                    'Streams for efficient data processing',
                    'Worker Threads for CPU-intensive operations'
                ],
                practiceQuestions: [
                    { question: 'What is the event loop and why is it important?', hint: 'It is the mechanism that handles async operations on a single thread, preventing blocking.', difficulty: 'medium' },
                    { question: 'How does Node handle concurrent requests if it is single-threaded?', hint: 'Non-blocking I/O operations are offloaded to the system kernel or thread pool (libuv), and callbacks are queued.', difficulty: 'hard' },
                    { question: 'What is the difference between require and import in Node?', hint: 'require is CommonJS (synchronous, dynamic); import is ES Modules (async, static analysis).', difficulty: 'medium' },
                    { question: 'When should you NOT use Node.js?', hint: 'For CPU-intensive tasks like heavy computation, image processing, or machine learning.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use async/await instead of nested callbacks to avoid "callback hell."',
                    'Always handle errors in async code (try/catch or .catch()).',
                    'Use environment variables for configuration (never hardcode secrets).',
                    'Keep your Node version updated (use nvm for version management).',
                    'Use a process manager like PM2 for production deployments.',
                    'Structure your project with clear separation of routes, controllers, and services.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Node.js Foundations', description: 'How Node works under the hood.', tasks: ['Install Node.js and run your first script', 'Understand the event loop and non-blocking I/O', 'Use core modules: fs, path, and os'] },
                { day: 2, title: 'Building APIs', description: 'Create REST APIs from scratch.', tasks: ['Build a basic HTTP server with the http module', 'Set up Express.js and create CRUD endpoints', 'Connect to a database (MongoDB or PostgreSQL)'] },
                { day: 3, title: 'Production Readiness', description: 'Auth, testing, and deployment.', tasks: ['Implement JWT authentication', 'Write tests with Jest and Supertest', 'Deploy to a cloud platform with PM2'] }
            ]
        },
        'node-basics': {
            id: 'node-basics',
            label: 'Core Concepts',
            description: 'V8 engine, Event Loop, modules system, and core Node APIs.',
            parentId: 'node-root',
            children: ['node-fs', 'node-http'],
            resources: [
                { type: 'video', title: 'Node.js Event Loop Explained', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ', isFree: true },
                { type: 'documentation', title: 'Node.js Guides', url: 'https://nodejs.org/en/guides/', isFree: true }
            ],
            content: {
                overview: 'Understanding Node core concepts means understanding how it executes code differently from other server environments. The V8 engine compiles JavaScript to machine code. The event loop is what allows Node to perform non-blocking I/O operations even though JavaScript is single-threaded. When Node encounters an async operation (reading a file, making a network request), it offloads it to the operating system or the libuv thread pool and continues executing the next lines of code. When the async operation completes, its callback is placed in a queue and the event loop picks it up. Node also has a module system — historically CommonJS (using require/module.exports), and now with increasing support for ES Modules (import/export). Understanding streams and buffers is essential for efficiently handling large data like file uploads or video streaming.',
                keyConcepts: [
                    'V8 JavaScript engine internals',
                    'Event loop phases: timers, poll, check, close',
                    'Callbacks, Promises, and async/await',
                    'CommonJS vs ES Modules',
                    'Buffer for binary data handling',
                    'Streams: Readable, Writable, Duplex, Transform',
                    'EventEmitter pattern',
                    'process object: env, argv, exit'
                ],
                practiceQuestions: [
                    { question: 'What are the phases of the Node event loop?', hint: 'Timers, pending callbacks, idle/prepare, poll, check, close callbacks.', difficulty: 'hard' },
                    { question: 'What is a Buffer in Node.js?', hint: 'A fixed-size chunk of memory for handling raw binary data (useful for file I/O and network streams).', difficulty: 'medium' },
                    { question: 'What is the EventEmitter class?', hint: 'A class that allows objects to emit named events and register listener functions.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use ES Modules (type: "module" in package.json) for new projects.',
                    'Never block the event loop with synchronous operations.',
                    'Use Streams for large data instead of loading everything into memory.',
                    'Understand that process.nextTick() executes before any I/O callbacks.'
                ]
            }
        },
        'node-fs': {
            id: 'node-fs',
            label: 'File System',
            description: 'Reading, writing, and managing files and directories using the fs module.',
            parentId: 'node-basics',
            resources: [
                { type: 'documentation', title: 'Node.js fs Module', url: 'https://nodejs.org/api/fs.html', isFree: true }
            ],
            content: {
                overview: 'The fs (file system) module is one of the most used core modules in Node.js. It provides both synchronous and asynchronous APIs for interacting with the file system. You can read files (fs.readFile), write files (fs.writeFile), create directories (fs.mkdir), delete files (fs.unlink), and watch for changes (fs.watch). The async versions should almost always be preferred because they do not block the event loop. The fs/promises API provides Promise-based versions that work cleanly with async/await. For large files, using streams (fs.createReadStream, fs.createWriteStream) is more memory-efficient than reading the entire file into memory at once.',
                keyConcepts: [
                    'Async vs sync file operations',
                    'fs.readFile and fs.writeFile',
                    'fs/promises for async/await patterns',
                    'File streams for large data',
                    'fs.stat for file metadata',
                    'fs.watch for file change monitoring',
                    'Path module for cross-platform file paths'
                ],
                practiceQuestions: [
                    { question: 'Why should you avoid synchronous fs methods in a server?', hint: 'They block the event loop, preventing the server from handling other requests.', difficulty: 'easy' },
                    { question: 'How do you read a large file without running out of memory?', hint: 'Use fs.createReadStream to read it in chunks instead of fs.readFile which loads it all at once.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use async file operations in server code.',
                    'Use fs/promises with async/await for cleaner code.',
                    'Use path.join() instead of string concatenation for file paths.',
                    'Handle ENOENT (file not found) errors gracefully.'
                ]
            }
        },
        'node-http': {
            id: 'node-http',
            label: 'HTTP Module',
            description: 'Building HTTP servers and making HTTP requests with the built-in http module.',
            parentId: 'node-basics',
            resources: [
                { type: 'documentation', title: 'Node.js HTTP Module', url: 'https://nodejs.org/api/http.html', isFree: true }
            ],
            content: {
                overview: 'The http module is the foundation of every Node.js web server. Even when you use Express or NestJS, they are built on top of this module. Creating a basic server involves calling http.createServer() with a request handler function that receives a request object (with URL, method, headers) and a response object (with methods to send data back). While the raw http module is low-level and requires manual work like parsing request bodies and routing, understanding it helps you appreciate what frameworks do for you. The module also provides http.request() and the newer fetch API (Node 18+) for making outgoing HTTP requests.',
                keyConcepts: [
                    'http.createServer and request/response objects',
                    'Request: method, url, headers, body parsing',
                    'Response: statusCode, setHeader, write, end',
                    'Routing requests manually by URL and method',
                    'Making outgoing requests with http.request/fetch',
                    'HTTPS module for secure connections'
                ],
                practiceQuestions: [
                    { question: 'What does res.end() do and why is it required?', hint: 'It signals to the server that all response headers and body have been sent. Without it, the client hangs.', difficulty: 'easy' },
                    { question: 'How do you parse JSON from a POST request body without Express?', hint: 'Listen for data events on the request stream, concatenate chunks, then JSON.parse.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always set Content-Type headers on responses.',
                    'Use frameworks like Express for anything beyond simple servers.',
                    'Set appropriate status codes (200, 201, 400, 404, 500).',
                    'Handle server errors with a try/catch or error event listener.'
                ]
            }
        },
        'node-npm': {
            id: 'node-npm',
            label: 'NPM & Packages',
            description: 'Managing dependencies, scripts, and the npm ecosystem.',
            parentId: 'node-root',
            resources: [
                { type: 'documentation', title: 'npm Documentation', url: 'https://docs.npmjs.com/', isFree: true },
                { type: 'article', title: 'Understanding package.json', url: 'https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/', isFree: true }
            ],
            content: {
                overview: 'npm (Node Package Manager) is the world\'s largest software registry with over 2 million packages. Every Node.js project has a package.json file that defines its metadata, dependencies, and scripts. Dependencies are installed into the node_modules folder. The package-lock.json file ensures reproducible installs across different machines. You can also use Yarn or pnpm as alternative package managers. Understanding the difference between dependencies (needed at runtime) and devDependencies (needed only during development, like testing tools) is important. npm scripts (defined in the scripts section of package.json) are used to automate tasks like starting the server, running tests, and building the project. Semantic versioning (SemVer) controls how package versions are specified: ^1.2.3 allows minor updates, ~1.2.3 allows only patch updates.',
                keyConcepts: [
                    'package.json structure and fields',
                    'npm install, npm update, npm uninstall',
                    'dependencies vs devDependencies',
                    'Semantic versioning: major.minor.patch',
                    'package-lock.json for reproducible builds',
                    'npm scripts for task automation',
                    'npx for running packages without installing',
                    'Publishing your own npm packages'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between ^ and ~ in version ranges?', hint: '^ allows minor and patch updates; ~ allows only patch updates.', difficulty: 'medium' },
                    { question: 'Why should you commit package-lock.json but NOT node_modules?', hint: 'package-lock.json ensures everyone gets the same versions. node_modules is large and can be regenerated.', difficulty: 'easy' },
                    { question: 'What does npx do differently from npm?', hint: 'npx runs a package directly without installing it globally.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always commit package-lock.json to version control.',
                    'Add node_modules to .gitignore.',
                    'Audit dependencies regularly with npm audit.',
                    'Use exact versions in production to prevent unexpected updates.',
                    'Define common tasks (build, test, start) in npm scripts.'
                ]
            }
        },
        'node-express': {
            id: 'node-express',
            label: 'Web Frameworks',
            description: 'Express.js, NestJS, and Fastify for building production REST APIs.',
            parentId: 'node-root',
            resources: [
                { type: 'documentation', title: 'Express.js Documentation', url: 'https://expressjs.com/', isFree: true },
                { type: 'documentation', title: 'NestJS Documentation', url: 'https://docs.nestjs.com/', isFree: true },
                { type: 'documentation', title: 'Fastify Documentation', url: 'https://fastify.dev/', isFree: true },
                { type: 'video', title: 'Express.js Full Course', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0', isFree: true }
            ],
            content: {
                overview: 'Express.js is the most popular Node.js web framework with a minimalist, unopinionated design. It adds routing, middleware, and request/response helpers on top of the raw http module. Middleware functions run in sequence and can modify requests, send responses, or pass control to the next function — this is the core pattern of Express architecture. NestJS is a full-featured, TypeScript-first framework inspired by Angular, using decorators, modules, and dependency injection for enterprise-grade applications. Fastify is a performance-focused alternative to Express that provides built-in schema validation and logging. For most beginners, starting with Express is recommended because of its simplicity and massive community. For large-scale applications, NestJS provides the structure and patterns (like SOLID and DDD) that keep codebases maintainable.',
                keyConcepts: [
                    'Express: routing, middleware, and error handling',
                    'Request/response lifecycle in Express',
                    'Router for modular route organization',
                    'Middleware: body parsing, CORS, helmet, morgan',
                    'NestJS: modules, controllers, services, decorators',
                    'Fastify: schema validation and performance',
                    'REST API design: HTTP methods and status codes',
                    'API versioning and documentation (Swagger/OpenAPI)'
                ],
                practiceQuestions: [
                    { question: 'What is middleware in Express and how does it work?', hint: 'A function with (req, res, next) that can modify request/response or pass control with next().', difficulty: 'easy' },
                    { question: 'When would you choose NestJS over Express?', hint: 'For large-scale TypeScript applications that benefit from dependency injection and modular architecture.', difficulty: 'medium' },
                    { question: 'How do you handle errors centrally in Express?', hint: 'Use an error-handling middleware with four parameters: (err, req, res, next).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use error-handling middleware to catch all unhandled errors.',
                    'Organize routes into separate files with Express Router.',
                    'Use helmet middleware for security headers.',
                    'Validate all input using a library like Joi or Zod.',
                    'Keep controllers thin — business logic belongs in service modules.'
                ]
            }
        },
        'node-databases': {
            id: 'node-databases',
            label: 'Database Integration',
            description: 'Connect to MySQL, PostgreSQL, and MongoDB using ORMs and drivers.',
            parentId: 'node-root',
            resources: [
                { type: 'documentation', title: 'Prisma ORM', url: 'https://www.prisma.io/docs', isFree: true },
                { type: 'documentation', title: 'Mongoose (MongoDB)', url: 'https://mongoosejs.com/', isFree: true },
                { type: 'article', title: 'Sequelize ORM', url: 'https://sequelize.org/', isFree: true }
            ],
            content: {
                overview: 'Almost every Node.js application needs a database. For SQL databases (PostgreSQL, MySQL), you can use raw drivers (pg, mysql2) or ORMs. Prisma is the modern ORM of choice — it generates a type-safe client from your schema, handles migrations, and provides an intuitive query API. Sequelize is an older but battle-tested ORM with a more traditional Active Record pattern. For MongoDB (NoSQL), Mongoose is the standard ODM (Object Document Mapper) that provides schema validation, middleware hooks, and query helpers. Choosing between SQL and NoSQL depends on your data: SQL is better for structured, relational data with complex queries; MongoDB is better for flexible, document-based data that changes frequently. Connection pooling, query optimization, and proper indexing are essential for performance at scale.',
                keyConcepts: [
                    'SQL drivers: pg, mysql2, better-sqlite3',
                    'Prisma: schema-first, type-safe, migrations',
                    'Sequelize: model-based ORM with associations',
                    'MongoDB with Mongoose: schemas, models, middleware',
                    'Connection pooling for performance',
                    'Database migrations and seeding',
                    'Transactions for data consistency',
                    'Redis for caching and sessions'
                ],
                practiceQuestions: [
                    { question: 'What is an ORM and why would you use one?', hint: 'Object-Relational Mapping lets you interact with the database using objects instead of raw SQL.', difficulty: 'easy' },
                    { question: 'When should you use MongoDB vs PostgreSQL?', hint: 'MongoDB for flexible schemas and document data; PostgreSQL for relational data with complex queries and transactions.', difficulty: 'medium' },
                    { question: 'What is connection pooling?', hint: 'Reusing database connections instead of creating a new one for every query, improving performance.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use Prisma for new TypeScript projects — it provides the best developer experience.',
                    'Always use parameterized queries to prevent SQL injection.',
                    'Add database indexes on frequently queried columns.',
                    'Use environment variables for database connection strings.',
                    'Implement database migrations instead of manually changing schemas.'
                ]
            }
        },
        'node-testing': {
            id: 'node-testing',
            label: 'Testing',
            description: 'Write reliable backend tests with Jest, Vitest, and Supertest.',
            parentId: 'node-root',
            resources: [
                { type: 'documentation', title: 'Jest Documentation', url: 'https://jestjs.io/', isFree: true },
                { type: 'article', title: 'Testing Express APIs with Supertest', url: 'https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/', isFree: true }
            ],
            content: {
                overview: 'Testing your Node.js backend ensures that your APIs work correctly and continue to work as you add features. Jest is the most popular testing framework, providing a test runner, assertion library, and mocking tools in one package. Vitest is a faster alternative designed for Vite-based projects. Supertest lets you make HTTP requests to your Express app without actually starting the server, making API integration tests fast and reliable. A solid testing strategy includes unit tests for individual functions, integration tests for API endpoints with a test database, and contract tests for external service interactions. Mocking is essential for isolating units from databases and external APIs during testing.',
                keyConcepts: [
                    'Jest: describe, it, expect, and matchers',
                    'Supertest for HTTP endpoint testing',
                    'Mocking: jest.mock, jest.fn, jest.spyOn',
                    'Test database setup and teardown',
                    'beforeEach and afterEach hooks',
                    'Code coverage with --coverage flag',
                    'Test-Driven Development (TDD) workflow'
                ],
                practiceQuestions: [
                    { question: 'Why would you use Supertest instead of a tool like Postman for API testing?', hint: 'Supertest runs tests programmatically and can be automated in CI/CD pipelines.', difficulty: 'easy' },
                    { question: 'How do you mock a database call in Jest?', hint: 'Use jest.mock() to replace the database module with a fake implementation that returns controlled data.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use a separate test database that gets reset between test runs.',
                    'Write tests that are independent and can run in any order.',
                    'Mock external services but test your own database queries against a real database.',
                    'Aim for high coverage on critical business logic.'
                ]
            }
        },
        'node-auth': {
            id: 'node-auth',
            label: 'Authentication',
            description: 'Implement JWT, OAuth2, sessions, and role-based access control.',
            parentId: 'node-root',
            resources: [
                { type: 'article', title: 'JWT.io - Introduction', url: 'https://jwt.io/introduction', isFree: true },
                { type: 'documentation', title: 'Passport.js', url: 'http://www.passportjs.org/', isFree: true },
                { type: 'video', title: 'JWT Authentication Tutorial', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', isFree: true }
            ],
            content: {
                overview: 'Authentication (verifying identity) and authorization (checking permissions) are critical for any backend. The two main approaches are session-based auth (server stores session data, client sends a cookie) and token-based auth (server issues a JWT, client sends it in headers). JWTs (JSON Web Tokens) are self-contained tokens that encode user information and are signed with a secret. They are stateless, meaning the server does not need to store session data. OAuth2 is used for "Sign in with Google/GitHub" flows, delegating authentication to a trusted provider. Libraries like Passport.js provide strategies for many auth methods. Passwords should always be hashed with bcrypt (never stored in plain text). Role-Based Access Control (RBAC) lets you define what each user role can do.',
                keyConcepts: [
                    'Session-based vs token-based authentication',
                    'JWT: header, payload, signature, and expiration',
                    'Access tokens vs refresh tokens',
                    'Password hashing with bcrypt',
                    'OAuth2 and social login flows',
                    'Passport.js strategies',
                    'Role-Based Access Control (RBAC)',
                    'Secure cookies and CSRF protection'
                ],
                practiceQuestions: [
                    { question: 'Why should you never store passwords in plain text?', hint: 'If the database is compromised, all user passwords are exposed. Hashing makes them unreadable.', difficulty: 'easy' },
                    { question: 'What is the difference between an access token and a refresh token?', hint: 'Access tokens are short-lived for API access. Refresh tokens are long-lived for obtaining new access tokens.', difficulty: 'medium' },
                    { question: 'How does OAuth2 work at a high level?', hint: 'The user authenticates with a provider (Google), which redirects back with an authorization code that your server exchanges for an access token.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use bcrypt with a cost factor of 10+ for password hashing.',
                    'Set short expiration times (15-30 min) on access tokens.',
                    'Store refresh tokens securely (HTTP-only cookies or database).',
                    'Always validate and verify JWT tokens on the server side.',
                    'Use HTTPS in production to protect tokens in transit.'
                ]
            }
        }
    }
};
