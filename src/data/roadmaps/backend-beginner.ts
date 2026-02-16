
import { RoadmapTrack } from './types';

export const backendBeginnerRoadmap: RoadmapTrack = {
    id: 'backend-beginner',
    title: 'Backend Beginner',
    description: 'Start your journey into server-side development',
    category: 'beginner',
    icon: '🔌',
    accentColor: '#6ee7b7',
    rootNodeId: 'bb-root',
    nodes: {
        'bb-root': {
            id: 'bb-root',
            label: 'Backend Basics',
            description: 'Learn how servers, databases, and the internet work together.',
            children: ['bb-internet', 'bb-sql', 'bb-lang', 'bb-api'],
            resources: [
                { type: 'article', title: 'Roadmap.sh Backend', url: 'https://roadmap.sh/backend', isFree: true },
                { type: 'video', title: 'Backend Web Development - A Full Course for Beginners', url: 'https://www.youtube.com/watch?v=cbSmsDzbODs', isFree: true }
            ],
            content: {
                overview: 'Backend development is the "behind the scenes" logic of a web application. It involves writing code that runs on a server, communicating with databases, and serving data to the client (frontend). While frontend is about presentation, backend is about data and logic. You need to understand how the internet works (HTTP, DNS, IP), pick a server-side language (Node.js, Python, or Go), learn to work with databases (SQL), and understand how to build APIs that clients can talk to. Security is also a critical part of backend development.',
                keyConcepts: [
                    'Client-Server architecture',
                    'HTTP protocols: methods, status codes, headers',
                    'Databases: where data is stored',
                    'APIs: how different software talks to each other',
                    'Authentication vs Authorization',
                    'Server-side connection handling'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between frontend and backend?', hint: 'Frontend is what users see (browser). Backend is logic/data handling (server).', difficulty: 'easy' },
                    { question: 'What happens when you type google.com and hit enter?', hint: 'DNS lookup -> IP address -> TCP connection -> HTTP Request -> Server processing -> HTTP Response -> Browser rendering.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Understand the "why" before the "how".',
                    'Focus on one language first (e.g., Python or JavaScript).',
                    'Learn to read validation errors and logs.',
                    'Practice by building small APIs (e.g., a Todo list API).'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Internet 101', description: 'How it all connects.', tasks: ['Learn what an IP address and Domain are', 'Understand request/response cycle', 'Learn HTTP methods (GET, POST)'] },
                { day: 2, title: 'Basic Server', description: 'Your first backend code.', tasks: ['Install Node.js or Python', 'Write a "Hello World" server', 'Run it locally on localhost'] },
                { day: 3, title: 'Database Intro', description: 'Storing data.', tasks: ['Install SQLite or PostgreSQL', 'Create a table with SQL', 'Insert and select data'] }
            ]
        },
        'bb-internet': {
            id: 'bb-internet',
            label: 'How the Internet Works',
            description: 'HTTP, DNS, IP addresses, and Browsers.',
            parentId: 'bb-root',
            resources: [
                { type: 'article', title: 'How DNS works', url: 'https://howdns.works/', isFree: true }
            ],
            content: {
                overview: 'Before writing code, you need to understand the platform you are building for: the Internet. The web works on a Request-Response cycle. A client (browser) sends a Request using the HTTP protocol. A DNS server translates the domain name (google.com) into an IP address. The request finds the server, which processes it and sends back a Response (HTML, JSON, etc.). Understanding HTTP methods (GET to fetch, POST to send data), status codes (200 OK, 404 Not Found, 500 Server Error), and headers is fundamental.',
                keyConcepts: [
                    'HTTP/HTTPS',
                    'DNS (Domain Name System)',
                    'IP Addresses and Ports',
                    'Request / Response Cycle',
                    'HTTP Methods: GET, POST, PUT, DELETE',
                    'Status Codes: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error)'
                ],
                practiceQuestions: [
                    { question: 'What is a 404 error?', hint: 'Not Found. The server could not find the requested resource.', difficulty: 'easy' },
                    { question: 'What is the difference between HTTP and HTTPS?', hint: 'HTTPS is encrypted (secure). HTTP is plain text (insecure).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use the Network tab in browser dev tools to inspect requests.',
                    'Memorize the common status codes (200, 201, 400, 401, 403, 404, 500).'
                ]
            }
        },
        'bb-sql': {
            id: 'bb-sql',
            label: 'SQL Basics',
            description: 'Structured Query Language: the standard for relational databases.',
            parentId: 'bb-root',
            resources: [
                { type: 'course', title: 'Khan Academy SQL', url: 'https://www.khanacademy.org/computing/computer-programming/sql', isFree: true }
            ],
            content: {
                overview: 'Most real-world applications store data in relational databases (PostgreSQL, MySQL). SQL is the language used to talk to them. You organize data into tables with rows and columns. Key commands are SELECT (read), INSERT (create), UPDATE (modify), and DELETE (remove) — often called CRUD. You also use WHERE to filter data and JOIN to combine data from multiple tables. While NoSQL exists, SQL is the bedrock of backend data storage and essential for every developer.',
                keyConcepts: [
                    'Tables, Rows, Columns',
                    'Primary Keys and Foreign Keys',
                    'CRUD Operations',
                    'SELECT ... FROM ... WHERE',
                    'Joins: INNER, LEFT',
                    'Data Types: Integer, String (VARCHAR), Boolean',
                    'Schema design basics'
                ],
                practiceQuestions: [
                    { question: 'What does a Primary Key do?', hint: 'Uniquely identifies each row in a table.', difficulty: 'easy' },
                    { question: 'What is a Foreign Key?', hint: 'A field that links to the Primary Key of another table, creating a relationship.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use primary keys.',
                    'Be careful with DELETE and UPDATE — always use a WHERE clause.',
                    'Learn normalization to avoid duplicate data.'
                ]
            }
        },
        'bb-lang': {
            id: 'bb-lang',
            label: 'Pick a Language',
            description: 'Choose one: Node.js (JavaScript), Python, or Go.',
            parentId: 'bb-root',
            resources: [],
            content: {
                overview: 'Unlike frontend (which is mostly JS), backend gives you many choices. \n\n1. **JavaScript (Node.js)**: Great if you already know frontend. One language for the whole stack. Huge ecosystem (NPM).\n2. **Python**: Easy to learn, readable. Great for AI, data, and fast prototyping (Django/FastAPI).\n3. **Go**: Fast, compiled, great for concurrency. Used by Google, Uber (microservices).\n\nPick one and stick with it until you can build a full API.',
                keyConcepts: [
                    'Node.js: Event-driven, non-blocking I/O',
                    'Python: Synchronous by default, rich standard library',
                    'Go: Statically typed, goroutines for concurrency',
                    'Package managers: npm (Node), pip (Python), go mod (Go)'
                ],
                bestPractices: [
                    'Don\'t paralize yourself with choice. Node.js is the easiest transition for web devs.',
                    'Learn the standard library of your chosen language.',
                    'Understand how your language handles concurrency.'
                ]
            }
        },
        'bb-api': {
            id: 'bb-api',
            label: 'API Basics',
            description: 'Application Programming Interfaces: building endpoints.',
            parentId: 'bb-root',
            resources: [],
            content: {
                overview: 'An API (Application Programming Interface) is how your server exposes functionality to the world. A REST API is a common standard where you use HTTP methods to perform actions on resources (URLs). For example, valid URLs might be `GET /users` (list users) or `POST /users` (create user). Your backend code listens for these requests, executes logic (like querying the DB), and returns data (usually in JSON format).',
                keyConcepts: [
                    'REST architecture constraints',
                    'JSON (JavaScript Object Notation)',
                    'Endpoints and Resources',
                    'Request Params, Query Strings, and Body',
                    'Authentication (API Keys, Tokens)'
                ],
                practiceQuestions: [
                    { question: 'What is JSON?', hint: 'A lightweight data format based on JavaScript objects. It is the standard for API communication.', difficulty: 'easy' }
                ]
            }
        }
    }
};
