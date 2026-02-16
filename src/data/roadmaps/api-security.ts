
import { RoadmapTrack } from './types';

export const apiSecurityRoadmap: RoadmapTrack = {
    id: 'api-security',
    title: 'API Security',
    description: 'Best practices for securing your web APIs and preventing attacks',
    category: 'best-practices',
    icon: '🛂',
    accentColor: '#fca5a5',
    rootNodeId: 'as-root',
    nodes: {
        'as-root': {
            id: 'as-root',
            label: 'API Security',
            description: 'Web APIs are the gateway to your data. Learn how to protect them from unauthorized access and attacks.',
            children: ['as-auth', 'as-validation', 'as-rate-limiting', 'as-encryption'],
            resources: [
                { type: 'article', title: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/', isFree: true },
                { type: 'video', title: 'API Security Fundamentals', url: 'https://www.youtube.com/watch?v=3Wd6XkGXqT0', isFree: true }
            ],
            content: {
                overview: 'API Security is the practice of preventing attacks on your application programming interfaces (APIs). APIs are a favorite target for hackers because they provide direct access to sensitive data and logic. The OWASP API Security Top 10 is the industry standard list of the most critical vulnerabilities, including Broken Object Level Authorization (BOLA), Broken Authentication, and Excessive Data Exposure. Security must be layered: validate input, authenticate users, authorize actions, encrypt data, and limit rates.',
                keyConcepts: [
                    'OWASP API Top 10 Vulnerabilities',
                    'Authentication vs Authorization',
                    'Encryption in transit and at rest',
                    'Input Validation and Sanitization',
                    'Rate Limiting and Throttling',
                    'Logging and Monitoring'
                ],
                practiceQuestions: [
                    { question: 'What is BOLA (Broken Object Level Authorization)?', hint: 'The #1 vulnerability. User A can access User B\'s data by just changing an ID in the URL (e.g., /users/123 -> /users/456).', difficulty: 'high' }
                ],
                bestPractices: [
                    'Never trust client input.',
                    'Use HTTPS everywhere.',
                    'Implement rate limiting to prevent DoS.',
                    'Audit your dependencies constantly.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'The Basics', description: 'Understanding threats.', tasks: ['Read the OWASP API Top 10', 'Understand BOLA/IDOR', 'Analyze a simple API for weak spots'] },
                { day: 2, title: 'Defensive Coding', description: 'Implementing fixes.', tasks: ['Implement Rate Limiting', 'Add rigorous Input Validation (Zod/Joi)', 'Review Authentication flows'] }
            ]
        },
        'as-auth': {
            id: 'as-auth',
            label: 'Auth & Auth',
            description: 'Authentication (Who are you?) and Authorization (What can you do?).',
            parentId: 'as-root',
            content: {
                overview: 'Authentication verifies identity (Login). Authorization verifies permissions (Access Control). Common mechanisms include JWT (JSON Web Tokens), OAuth2 (Social Login), and API Keys. A common flaw is "Broken Authentication" — allowing attackers to hijack sessions or brute-force credentials. Authorization flaws (like BOLA) happen when the server knows who you are, but fails to check if you own the resource you represent.',
                keyConcepts: [
                    'JWT vs Session Cookies',
                    'OAuth 2.0 and OpenID Connect',
                    'RBAC (Role-Based Access Control)',
                    'ABAC (Attribute-Based Access Control)',
                    'MFA (Multi-Factor Authentication)'
                ],
                bestPractices: [
                    'Short-lived access tokens, long-lived refresh tokens.',
                    'Never store sensitive data in JWT payload (it is just base64 encoded, not encrypted).',
                    'Validate signatures rigorously.'
                ]
            }
        },
        'as-validation': {
            id: 'as-validation',
            label: 'Input Validation',
            description: 'Sanitizing and validating all incoming data to prevent injection.',
            parentId: 'as-root',
            content: {
                overview: 'Input validation ensures that data sent to the API matches expectations (type, length, format) and is safe. This prevents SQL Injection (where code is executed in the DB) and XSS (Cross-Site Scripting). Sanitization cleans data by removing unsafe characters. Use libraries like Zod, Joi, or class-validator instead of writing manual regex checks.',
                keyConcepts: [
                    'SQL Injection (SQLi)',
                    'NoSQL Injection',
                    'Cross-Site Scripting (XSS)',
                    'Schema Validation (Zod, Joi)',
                    'Allowling vs Blocklisting characters'
                ]
            }
        },
        'as-rate-limiting': {
            id: 'as-rate-limiting',
            label: 'Rate Limiting',
            description: 'Preventing DoS attacks and brute force attempts.',
            parentId: 'as-root',
            content: {
                overview: 'Rate limiting restricts the number of requests a user (or IP) can make in a given timeframe. This prevents Denial of Service (DoS) attacks that try to crash the server, and Brute Force attacks that guess passwords. Throttling slows down requests instead of blocking them completely. Common algorithms include Token Bucket and Fixed Window.',
                keyConcepts: [
                    'DoS / DDoS',
                    'Brute Force protection',
                    '429 Too Many Requests',
                    'Token Bucket Algorithm'
                ]
            }
        },
        'as-encryption': {
            id: 'as-encryption',
            label: 'Encryption',
            description: 'TLS and encryption at rest.',
            parentId: 'as-root',
            content: {
                overview: 'Encryption scrambles data so it is unreadable without a key. TLS (Transport Layer Security) encrypts data "in transit" between the client and server (HTTPS). Encryption "at rest" protects data stored in the database. Never store passwords in plain text — always hash them with a strong algorithm (Argon2, bcrypt) and salt.',
                keyConcepts: [
                    'TLS / SSL / HTTPS',
                    'Symmetric vs Asymmetric Encryption',
                    'Hashing vs Encryption',
                    'Salting passwords',
                    'Data at Rest vs Data in Transit'
                ]
            }
        }
    }
};
