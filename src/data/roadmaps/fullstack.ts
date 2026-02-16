
import { RoadmapTrack } from './types';

export const fullstackRoadmap: RoadmapTrack = {
    id: 'fullstack',
    title: 'Full Stack Developer',
    description: 'Complete guide to becoming a Full Stack Developer covering frontend, backend, and deployment',
    category: 'role-based',
    icon: '🌐',
    accentColor: '#ec4899',
    rootNodeId: 'fullstack-root',
    nodes: {
        'fullstack-root': {
            id: 'fullstack-root',
            label: 'Full Stack Development',
            description: 'Mastering the complete web application lifecycle, from high-fidelity user interfaces to robust server-side logic and scalable databases.',
            children: ['fs-frontend', 'fs-backend', 'fs-devops'],
            resources: [
                { type: 'article', title: 'Roadmap.sh - Full Stack Developer', url: 'https://roadmap.sh/full-stack', isFree: true },
                { type: 'video', title: 'The Complete Web Developer in 2025', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', isFree: true },
                { type: 'course', title: 'Full Stack Open - University of Helsinki', url: 'https://fullstackopen.com/en/', isFree: true },
                { type: 'article', title: 'MDN - Web Development Learning Area', url: 'https://developer.mozilla.org/en-US/docs/Learn', isFree: true }
            ],
            content: {
                overview: 'Full Stack Development is the ability to build and maintain both the "front" (client-facing) and "back" (server/database-facing) ends of an application. A Full Stack Developer is a versatile engineer who understands how all parts of a complex system interact—from the DNS record that points to the load balancer, to the React component that displays the user\'s profile. \n\nModern full stack development often utilizes "The Stack" (like MERN, T3, or JAMstack) to standardize the communication between layers. Your role involves not just writing code, but solving problems across the entire architectural spectrum: designing schemas, building APIs, ensuring UI/UX excellence, and managing secure deployment pipelines.',
                keyConcepts: [
                    'The Request-Response Cycle: From Browser to DB and back',
                    'Client-Side vs Server-Side Rendering (CSR vs SSR)',
                    'State Management: Local, Context, and Global state',
                    'API Design: Building RESTful and GraphQL endpoints',
                    'Database Architecture: Choosing between SQL and NoSQL',
                    'Authentication and Authorization: JWT, Sessions, and OAuth',
                    'DevOps and Deployment: CI/CD, Docker, and Cloud hosting',
                    'Web Security: Protecting against XSS, CSRF, and Injection'
                ],
                practiceQuestions: [
                    { question: 'What is a "Full Stack" application?', hint: 'An app where the developer manages the UI, backend logic, and data storage.', difficulty: 'easy' },
                    { question: 'Explain the difference between a "Stateless" and "Stateful" backend.', hint: 'Storing session data on the server vs using client-side tokens (JWT).', difficulty: 'medium' },
                    { question: 'What is "Hydration" in the context of SSR?', hint: 'The process where client-side JS takes over a server-rendered HTML page.', difficulty: 'hard' },
                    { question: 'Why use an ORM (like Prisma) for database access?', hint: 'To provide type-safety, simpler syntax, and abstraction over raw SQL.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always prioritize "Type-Safety" across the entire stack (e.g., using TypeScript).',
                    'Keep your frontend and backend as decoupled as possible (API-first design).',
                    'Use "Environment Variables" to manage configuration across development and production.',
                    'Implement robust error handling that provides helpful messages without leaking secrets.',
                    'Focus on performance: optimize images on the frontend and queries on the backend.',
                    'Prioritize mobile-responsiveness: more than half of web traffic is mobile.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Full Stack Overview', description: 'Understand the full stack landscape.', tasks: ['Learn about the web development stack', 'Understand how frontend and backend communicate', 'Explore popular full stack frameworks and tools'] },
            ]
        },

        // ─── Frontend Track ───
        'fs-frontend': {
            id: 'fs-frontend',
            label: 'Frontend Mastery',
            description: 'Building immersive, performant, and accessible user interfaces that provide an exceptional user experience.',
            parentId: 'fullstack-root',
            children: ['fs-html-css', 'fs-javascript', 'fs-react'],
            resources: [
                { type: 'article', title: 'Smashing Magazine - Frontend Guides', url: 'https://www.smashingmagazine.com/category/frontend/', isFree: true },
                { type: 'video', title: 'Modern Frontend Development Course', url: 'https://www.youtube.com/watch?v=0pThnRneDjw', isFree: true },
                { type: 'article', title: 'A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', isFree: true },
                { type: 'documentation', title: 'React Beta Docs - Modern Hooks', url: 'https://react.dev/reference/react', isFree: true }
            ],
            content: {
                overview: 'Frontend development is the art of building the visual and interactive layers of a web application. It starts with the structure (HTML) and style (CSS) but evolves into complex logical systems using JavaScript and frameworks like React or Vue. \n\nAs a full stack developer, you must ensure that your frontend provides a seamless experience: it must be fast (low TTI), accessible (WCAG compliant), and intuitive. You will work with complex state management, implement client-side routing, and optimize assets for diverse devices. The goal is to build an interface that users love to interact with while ensuring it communicates efficiently with the backend.',
                keyConcepts: [
                    'Semantic HTML and Web Accessibility (A11y)',
                    'Modern CSS: Grid, Flexbox, and Tailwind/SASS',
                    'Responsive Design: Mobile-first and fluid layouts',
                    'JavaScript DOM Manipulation and Web APIs',
                    'Component Architecture and Reusable UI Systems',
                    'State Management: Props, Context, and Redux/Zustand',
                    'Client-side Performance: Code splitting and Lazy loading',
                    'Browser Rendering: The Critical Rendering Path'
                ],
                practiceQuestions: [
                    { question: 'What is the "Virtual DOM" in React?', hint: 'A lightweight copy of the real DOM used to optimize updates.', difficulty: 'medium' },
                    { question: 'Explain the difference between "Relative", "Absolute", and "Fixed" positioning in CSS.', hint: 'Relative to itself vs closest positioned ancestor vs viewport.', difficulty: 'easy' },
                    { question: 'What is a "Closure" in JavaScript?', hint: 'A function that remembers the scope in which it was created.', difficulty: 'hard' },
                    { question: 'Why is "Semantic HTML" important?', hint: 'For SEO, accessibility, and clearer code structure.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Build for accessibility—use the right ARIA roles and semantic tags.',
                    'Optimize images: use WebP format and responsive image tags.',
                    'Keep your components small, single-purpose, and easy to test.',
                    'Avoid large third-party libraries; use native browser APIs when possible.',
                    'Implement regular browser testing on Chrome, Safari, and Firefox.',
                    'Use "Linting" (ESLint) and "Formatting" (Prettier) to keep code consistent.'
                ]
            }
        },

        'fs-html-css': {
            id: 'fs-html-css',
            label: 'HTML & CSS',
            description: 'Build the structure and style of web pages. Learn semantic HTML, CSS Flexbox/Grid, responsive design, and CSS frameworks.',
            parentId: 'fs-frontend',
            resources: [
                { type: 'documentation', title: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', isFree: true },
                { type: 'documentation', title: 'MDN Web Docs - CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', isFree: true },
                { type: 'video', title: 'HTML & CSS Full Course', url: 'https://www.youtube.com/watch?v=mU6anWqZJcc', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'HTML Fundamentals', description: 'Structure web pages with HTML.', tasks: ['Learn document structure and semantic tags', 'Create forms with validation', 'Embed media and create links'] },
                { day: 2, title: 'CSS Mastery', description: 'Style and layout web pages.', tasks: ['Master Flexbox and Grid layouts', 'Create responsive designs with media queries', 'Build a portfolio landing page'] },
            ]
        },

        'fs-javascript': {
            id: 'fs-javascript',
            label: 'JavaScript & TypeScript',
            description: 'Master JavaScript fundamentals, ES6+ features, async programming, and TypeScript for type-safe development.',
            parentId: 'fs-frontend',
            resources: [
                { type: 'documentation', title: 'JavaScript.info', url: 'https://javascript.info/', isFree: true },
                { type: 'documentation', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'JS Core', description: 'JavaScript fundamentals.', tasks: ['Variables, types, functions, and scope', 'Arrays, objects, and destructuring', 'DOM manipulation and events'] },
                { day: 2, title: 'Async JS & TypeScript', description: 'Modern JavaScript and TypeScript.', tasks: ['Promises, async/await, and fetch API', 'ES6 modules and classes', 'TypeScript types, interfaces, and generics'] },
            ]
        },

        'fs-react': {
            id: 'fs-react',
            label: 'React / Next.js',
            description: 'Build modern SPAs with React and full-stack applications with Next.js. Learn components, hooks, state management, and server-side rendering.',
            parentId: 'fs-frontend',
            resources: [
                { type: 'documentation', title: 'React Official Docs', url: 'https://react.dev/', isFree: true },
                { type: 'documentation', title: 'Next.js Documentation', url: 'https://nextjs.org/docs', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'React Basics', description: 'Component-based UI development.', tasks: ['Create components with JSX', 'Use useState and useEffect hooks', 'Build reusable UI components'] },
                { day: 2, title: 'Next.js', description: 'Full-stack React framework.', tasks: ['Set up a Next.js project with App Router', 'Implement file-based routing', 'Use Server Components and data fetching'] },
                { day: 3, title: 'State & Routing', description: 'Advanced React patterns.', tasks: ['Manage global state with Context or Zustand', 'Implement protected routes', 'Build a complete SPA with navigation'] },
            ]
        },

        // ─── Backend Track ───
        'fs-backend': {
            id: 'fs-backend',
            label: 'Backend & System Architecture',
            description: 'Building secure, scalable, and resilient server-side systems that power modern web applications.',
            parentId: 'fullstack-root',
            children: ['fs-nodejs', 'fs-databases', 'fs-auth'],
            resources: [
                { type: 'article', title: 'Backend Design Patterns', url: 'https://microservices.io/patterns/index.html', isFree: true },
                { type: 'video', title: 'Node.js Backend Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', isFree: true },
                { type: 'article', title: 'PostgreSQL vs MongoDB: Which to Choose?', url: 'https://www.mongodb.com/compare/mongodb-postgresql', isFree: true },
                { type: 'documentation', title: 'Express.js Security Best Practices', url: 'https://expressjs.com/en/advanced/best-practice-security.html', isFree: true }
            ],
            content: {
                overview: 'The backend is the "brain" of your application. It handles the data processing, business logic, security, and storage that the user never sees but relies on completely. In modern full stack development, the backend is often a collection of RESTful or GraphQL APIs built with Node.js, Python, or Go. \n\nLearning backend development involves more than just writing server code; it\'s about designing efficient database schemas, implementing robust authentication, and ensuring your system can handle performance spikes. As a full stack developer, you bridge the gap between user intent and data persistence, making sure every request is handled securely and efficiently.',
                keyConcepts: [
                    'Server-Side Logic: Handling requests and generating responses',
                    'Database Management: SQL (Postgres) vs NoSQL (Mongo)',
                    'Authentication: Sessions, Cookies, and JWT tokens',
                    'API Design: REST, JSON, and Status Codes',
                    'Middleware: Logging, Parsing, and Validation',
                    'Error Handling: Graceful failures and debugging',
                    'Caching: Redis and In-memory data storage',
                    'Background Tasks: Job queues and worker processes'
                ],
                practiceQuestions: [
                    { question: 'What is "Middleware" in an Express.js application?', hint: 'Functions that execute during the request-response cycle.', difficulty: 'medium' },
                    { question: 'Explain the concept of "Database Normalization".', hint: 'Organizing data to reduce redundancy and improve integrity.', difficulty: 'medium' },
                    { question: 'What is an "Injection Attack" (like SQLi)?', hint: 'When malicious code is executed through user input fields.', difficulty: 'hard' },
                    { question: 'Contrast "Synchronous" and "Asynchronous" operations in Node.js.', hint: 'Blocking vs non-blocking code execution using the Event Loop.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Never trust user input—validate and sanitize everything.',
                    'Secure your API endpoints using proper authentication and CORS rules.',
                    'Use "Logging" to track errors and unusual activity in production.',
                    'Implement "Rate Limiting" to protect your server from abuse.',
                    'Keep your database queries optimized and use indexing for large tables.',
                    'Store sensitive information like API keys in ".env" files, not in code.'
                ]
            }
        },

        'fs-nodejs': {
            id: 'fs-nodejs',
            label: 'Node.js & Express',
            description: 'Build scalable backend APIs with Node.js and Express.js. Learn middleware, routing, error handling, and REST API design.',
            parentId: 'fs-backend',
            resources: [
                { type: 'documentation', title: 'Node.js Documentation', url: 'https://nodejs.org/docs/', isFree: true },
                { type: 'documentation', title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Node.js & Express Setup', description: 'Build your first API.', tasks: ['Set up a Node.js project with Express', 'Create CRUD routes for a resource', 'Add middleware for logging and error handling'] },
                { day: 2, title: 'Advanced Express', description: 'Production-ready API features.', tasks: ['Input validation with express-validator', 'File uploads with multer', 'Rate limiting and CORS configuration'] },
            ]
        },

        'fs-databases': {
            id: 'fs-databases',
            label: 'Databases & ORM',
            description: 'Store and retrieve data with PostgreSQL, MongoDB, or MySQL. Use an ORM like Prisma or Mongoose for type-safe database access.',
            parentId: 'fs-backend',
            resources: [
                { type: 'documentation', title: 'Prisma Documentation', url: 'https://www.prisma.io/docs', isFree: true },
                { type: 'documentation', title: 'MongoDB University', url: 'https://university.mongodb.com/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'SQL Fundamentals', description: 'Relational database basics.', tasks: ['Design a database schema with tables', 'Write CRUD queries in SQL', 'Set up Prisma with PostgreSQL'] },
                { day: 2, title: 'NoSQL & Advanced', description: 'MongoDB and advanced patterns.', tasks: ['Set up MongoDB with Mongoose', 'Learn aggregation pipelines', 'Implement database migrations'] },
            ]
        },

        'fs-auth': {
            id: 'fs-auth',
            label: 'Security & Identity Management',
            description: 'The critical layer that protects user data and ensures authorized access to sensitive application resources.',
            parentId: 'fs-backend',
            resources: [
                { type: 'article', title: 'OAuth 2.0 and OpenID Connect Explained', url: 'https://auth0.com/intro-to-iam/what-is-oauth-2', isFree: true },
                { type: 'video', title: 'JSON Web Tokens (JWT) Explained', url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM', isFree: true },
                { type: 'documentation', title: 'OWASP - Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', isFree: true },
                { type: 'article', title: 'Password Hashing Best Practices', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', isFree: true }
            ],
            content: {
                overview: 'Authentication and security are non-negotiable in full stack applications. You are responsible for identifying users (Authentication) and ensuring they only have access to what they are allowed to see (Authorization). \n\nModern applications use a variety of strategies: from traditional sessions and cookies to modern Stateless JWTs and third-party OAuth providers (Login with Google/GitHub). Beyond identity, you must also protect your application from common web vulnerabilities like XSS, CSRF, and SQL Injection. Security is a continuous process of "Defense in Depth", layering multiple protections to safeguard your users and your data.',
                keyConcepts: [
                    'Authentication: Verifying identity (Passwords, Biometrics)',
                    'Authorization: Permissions and RBAC (Role-Based Access Control)',
                    'JWT (JSON Web Tokens): Stateless identity transfer',
                    'OAuth 2.0 and OIDC: Third-party identity providers',
                    'Password Hashing: Using bcrypt, scrypt, or Argon2',
                    'Sessions and Cookies: Stateful user tracking',
                    'Multi-Factor Authentication (MFA): Adding an extra security layer',
                    'HTTPS and TLS: Securing the communication channel'
                ],
                practiceQuestions: [
                    { question: 'What is the "JWT Signature" used for?', hint: 'To verify that the token has not been tampered with.', difficulty: 'medium' },
                    { question: 'Explain the difference between "Authentication" and "Authorization".', hint: 'Who are you vs What are you allowed to do.', difficulty: 'easy' },
                    { question: 'Why should you NEVER store passwords in plain text?', hint: 'If the database is leaked, every user\'s password is exposed.', difficulty: 'easy' },
                    { question: 'What is a "Cross-Site Request Forgery" (CSRF) attack?', hint: 'Tricking a user into performing actions they didn\'t intend to.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always use HTTPS—Encrypt all traffic between client and server.',
                    'Use "Salted Hashes" for passwords to prevent rainbow table attacks.',
                    'Implement "Least Privilege" roles for every user and service.',
                    'Set "HttpOnly" and "Secure" flags on your identity cookies.',
                    'Keep your dependencies updated to avoid known security vulnerabilities.',
                    'Implement audit logs for all security-sensitive actions (logins, password changes).'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Auth Implementation', description: 'Build a complete auth system.', tasks: ['Hash passwords with bcrypt', 'Generate and verify JWT tokens', 'Implement login, signup, and protected routes'] },
                { day: 2, title: 'OAuth & Security', description: 'Third-party auth and security.', tasks: ['Add Google/GitHub OAuth login', 'Implement refresh token rotation', 'Secure against XSS, CSRF, and SQL injection'] },
            ]
        },

        // ─── DevOps Track ───
        'fs-devops': {
            id: 'fs-devops',
            label: 'DevOps & Deployment',
            description: 'Deploy and manage your full stack applications. Learn Git, Docker, CI/CD, cloud platforms, and monitoring.',
            parentId: 'fullstack-root',
            children: ['fs-git', 'fs-docker', 'fs-deploy'],
            resources: [
                { type: 'article', title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', isFree: true },
            ],
        },

        'fs-git': {
            id: 'fs-git',
            label: 'Git & GitHub',
            description: 'Version control with Git. Learn branching strategies, pull requests, code reviews, and collaborative workflows.',
            parentId: 'fs-devops',
            resources: [
                { type: 'documentation', title: 'Git Documentation', url: 'https://git-scm.com/doc', isFree: true },
                { type: 'article', title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Git Mastery', description: 'Essential Git skills.', tasks: ['Learn git init, add, commit, push, pull', 'Master branching and merging', 'Resolve merge conflicts and use git stash'] },
            ]
        },

        'fs-docker': {
            id: 'fs-docker',
            label: 'Docker',
            description: 'Containerize your full stack application for consistent deployments across environments.',
            parentId: 'fs-devops',
            resources: [
                { type: 'documentation', title: 'Docker Documentation', url: 'https://docs.docker.com/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Containerization', description: 'Docker for full stack apps.', tasks: ['Write Dockerfiles for frontend and backend', 'Use Docker Compose for multi-service apps', 'Configure environment-specific Docker settings'] },
            ]
        },

        'fs-deploy': {
            id: 'fs-deploy',
            label: 'Cloud Deployment',
            description: 'Deploy to production using Vercel (frontend), Render/Railway (backend), and managed databases. Set up CI/CD pipelines.',
            parentId: 'fs-devops',
            resources: [
                { type: 'documentation', title: 'Vercel Documentation', url: 'https://vercel.com/docs', isFree: true },
                { type: 'documentation', title: 'Render Documentation', url: 'https://render.com/docs', isFree: true },
                { type: 'documentation', title: 'Railway Docs', url: 'https://docs.railway.app/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Deployment', description: 'Deploy your full stack app.', tasks: ['Deploy frontend to Vercel', 'Deploy backend to Render/Railway', 'Set up environment variables and CI/CD'] },
            ]
        },
    }
};
