// Programming & Software Development Subjects Seed Data
export const softwareDevelopmentSubjects = [
    {
        name: "Software Engineering",
        slug: "software-engineering",
        category: "Programming & Software Development",
        description: "SDLC, design patterns, software architecture, agile, and project management.",
        icon: "code-2",
        difficulty: "Intermediate",
        estimatedHours: 45,
        prerequisites: [],
        order: 1,
        topics: [
            {
                title: "Software Development Life Cycle",
                slug: "sdlc",
                description: "Waterfall, Agile, Scrum, Kanban, DevOps, and methodology comparison.",
                order: 1, estimatedMinutes: 60, difficulty: "Easy",
                content: `
# Software Development Life Cycle

## SDLC Phases
1. **Requirements Gathering**: What does the user need?
2. **System Design**: Architecture, database, UI design
3. **Implementation**: Write code
4. **Testing**: Verify correctness
5. **Deployment**: Release to production
6. **Maintenance**: Bug fixes, updates

## Methodologies

| Methodology | Type | Best For |
|-------------|------|----------|
| Waterfall | Sequential | Fixed requirements, regulated industries |
| Agile | Iterative | Evolving requirements, fast feedback |
| Scrum | Agile framework | Small teams, 2-4 week sprints |
| Kanban | Flow-based | Continuous delivery, operations |
| DevOps | Culture + tools | Automation, CI/CD, infrastructure |
| Spiral | Risk-driven | Large, high-risk projects |

## Scrum Framework
- **Roles**: Product Owner, Scrum Master, Dev Team
- **Ceremonies**: Sprint Planning, Daily Standup, Review, Retrospective
- **Artifacts**: Product Backlog, Sprint Backlog, Increment
- **Sprint**: 2-4 week iteration producing a shippable increment

## Agile Principles
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan
- Individuals and interactions over processes and tools
`, resources: []
            },
            {
                title: "Design Patterns",
                slug: "design-patterns",
                description: "Creational, structural, and behavioral design patterns with examples.",
                order: 2, estimatedMinutes: 75, difficulty: "Medium",
                content: `
# Design Patterns

Reusable solutions to common software design problems (Gang of Four).

## Creational Patterns

### Singleton
\`\`\`python
class Database:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
\`\`\`

### Factory Method
Create objects without specifying exact class.

### Builder
Construct complex objects step by step.

### Prototype
Clone existing objects.

## Structural Patterns

| Pattern | Purpose | Example |
|---------|---------|---------|
| Adapter | Convert interface | Legacy system integration |
| Decorator | Add behavior dynamically | Middleware, logging |
| Facade | Simplify complex subsystem | API gateway |
| Proxy | Control access | Caching proxy, auth |
| Composite | Tree structures | File system, UI components |

## Behavioral Patterns

| Pattern | Purpose | Example |
|---------|---------|---------|
| Observer | Notify on state change | Event systems, pub/sub |
| Strategy | Swap algorithms | Payment methods, sorting |
| Command | Encapsulate actions | Undo/redo, task queues |
| Iterator | Sequential access | for...of loops |
| State | Behavior based on state | UI state machines |
| Template Method | Define algorithm skeleton | Frameworks, hooks |

## SOLID Principles
- **S**: Single Responsibility — one class, one job
- **O**: Open/Closed — open for extension, closed for modification
- **L**: Liskov Substitution — subclass should replace parent
- **I**: Interface Segregation — many specific interfaces > one general
- **D**: Dependency Inversion — depend on abstractions, not concretions
`, resources: []
            },
            {
                title: "Software Architecture",
                slug: "software-architecture",
                description: "Monolithic, microservices, MVC, event-driven, and serverless architectures.",
                order: 3, estimatedMinutes: 70, difficulty: "Hard",
                content: `
# Software Architecture

## Architecture Patterns

### Monolithic
Single deployable unit. Simple to develop and deploy initially.
- **Pros**: Simple, easy debugging, single deployment
- **Cons**: Hard to scale specific components, tight coupling

### Microservices
Application as collection of small, independent services.
- **Pros**: Independent deployment, technology diversity, scalable
- **Cons**: Distributed system complexity, network latency, data consistency

### MVC (Model-View-Controller)
- **Model**: Data and business logic
- **View**: UI/presentation
- **Controller**: Handles user input, updates model

### Event-Driven
Components communicate via events (pub/sub).
- Used in: Real-time systems, IoT, streaming platforms
- Tools: Kafka, RabbitMQ, AWS SNS

### Serverless
Functions as a service (FaaS). Pay per execution.
- AWS Lambda, Google Cloud Functions, Vercel Edge

## Comparison

| Feature | Monolith | Microservices | Serverless |
|---------|----------|---------------|-----------|
| Deployment | Single unit | Per service | Per function |
| Scaling | All or nothing | Per service | Auto-scale |
| Complexity | Low initially | High | Medium |
| Cost | Server always on | Per service | Pay per use |

## API Design
- **REST**: Resource-based, HTTP methods, stateless
- **GraphQL**: Query exactly what you need, single endpoint
- **gRPC**: Binary protocol, fast, strongly typed (Protocol Buffers)
`, resources: []
            },
            {
                title: "Version Control (Git)",
                slug: "version-control",
                description: "Git fundamentals, branching, merging, rebasing, and collaboration workflows.",
                order: 4, estimatedMinutes: 55, difficulty: "Easy",
                content: `
# Version Control (Git)

## Essential Commands
\`\`\`bash
git init                    # Initialize repository
git clone <url>             # Clone remote repo
git add .                   # Stage all changes
git commit -m "message"     # Commit staged changes
git push origin main        # Push to remote
git pull origin main        # Fetch + merge
git status                  # Check status
git log --oneline -10       # Last 10 commits
git diff                    # Show unstaged changes
\`\`\`

## Branching
\`\`\`bash
git branch feature-x        # Create branch
git checkout feature-x       # Switch to branch
git checkout -b feature-x    # Create + switch
git merge feature-x          # Merge into current branch
git rebase main              # Rebase onto main
git branch -d feature-x      # Delete branch
\`\`\`

## Branching Strategies
- **Git Flow**: main, develop, feature/*, release/*, hotfix/*
- **GitHub Flow**: main + feature branches. Simple, PR-based.
- **Trunk-Based**: Short-lived branches, merge to main frequently.

## Merge vs Rebase
- **Merge**: Creates merge commit. Preserves history.
- **Rebase**: Replays commits on top. Linear history, cleaner but rewrites history.

## Useful Commands
\`\`\`bash
git stash                    # Save uncommitted work
git stash pop                # Restore stashed work
git cherry-pick <hash>       # Apply specific commit
git reset --hard HEAD~1      # Undo last commit (destructive)
git reflog                   # Recovery tool — shows all HEAD movements
\`\`\`
`, resources: []
            },
            {
                title: "CI/CD and DevOps",
                slug: "ci-cd-devops",
                description: "Continuous integration, deployment, containerization, and infrastructure as code.",
                order: 5, estimatedMinutes: 60, difficulty: "Medium",
                content: `
# CI/CD and DevOps

## CI/CD Pipeline
1. **Code** → Push to repository
2. **Build** → Compile, bundle
3. **Test** → Unit, integration, E2E
4. **Deploy** → Staging → Production
5. **Monitor** → Logs, metrics, alerts

## Tools

| Category | Tools |
|----------|-------|
| CI/CD | GitHub Actions, Jenkins, GitLab CI |
| Containers | Docker, Podman |
| Orchestration | Kubernetes, Docker Swarm |
| IaC | Terraform, Pulumi, CloudFormation |
| Monitoring | Prometheus, Grafana, Datadog |

## Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

\`\`\`bash
docker build -t myapp .
docker run -p 3000:3000 myapp
\`\`\`

## Kubernetes Basics
- **Pod**: Smallest deployable unit (1+ containers)
- **Service**: Stable network endpoint for pods
- **Deployment**: Declarative updates for pods
- **Ingress**: External access to services

## GitHub Actions Example
\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
\`\`\`
`, resources: []
            },
            {
                title: "Requirements Engineering",
                slug: "requirements-engineering",
                description: "Functional/non-functional requirements, use cases, and user stories.",
                order: 6, estimatedMinutes: 45, difficulty: "Easy",
                content: `
# Requirements Engineering

## Functional vs Non-Functional

| Type | Description | Example |
|------|-------------|---------|
| Functional | What the system does | User can log in, search products |
| Non-functional | How well it performs | Response time < 200ms, 99.9% uptime |

## User Stories (Agile)
**As a** [role], **I want** [feature], **so that** [benefit].

Example: "As a student, I want to track my study progress, so that I can identify weak areas."

### Acceptance Criteria
- Given I am on the dashboard
- When I click "Progress"
- Then I see a chart of my completion percentages

## Use Case Diagrams
Show interactions between actors and the system.
- **Actor**: External entity (User, Admin, System)
- **Use Case**: Oval representing a function
- **Relationships**: Include, Extend, Generalization

## Requirements Documentation
- **SRS (Software Requirements Specification)**: Formal document
- **Product Backlog**: Agile — prioritized list of user stories
- **Wireframes/Mockups**: Visual representation of UI
`, resources: []
            }
        ]
    },
    {
        name: "Software Testing",
        slug: "software-testing",
        category: "Programming & Software Development",
        description: "Testing methodologies, unit/integration/E2E testing, TDD, and quality assurance.",
        icon: "bug",
        difficulty: "Intermediate",
        estimatedHours: 30,
        prerequisites: ["software-engineering"],
        order: 2,
        topics: [
            {
                title: "Testing Fundamentals",
                slug: "testing-fundamentals",
                description: "Testing types, principles, test pyramid, and testing strategies.",
                order: 1, estimatedMinutes: 50, difficulty: "Easy",
                content: `
# Testing Fundamentals

## Testing Pyramid
Top to bottom (fewer → more tests):
1. **E2E/UI Tests**: Browser-based, slow, brittle
2. **Integration Tests**: Multiple components together
3. **Unit Tests**: Single function/class, fast, isolated

## Types of Testing

| Type | Scope | Who | When |
|------|-------|-----|------|
| Unit | Function/class | Developer | During development |
| Integration | Multiple modules | Developer | After unit tests |
| System | Entire system | QA | Before release |
| Acceptance | User requirements | Client/QA | Before deployment |
| Regression | Existing features | Automated | After every change |
| Performance | Speed, load | QA | Before release |
| Security | Vulnerabilities | Security team | Regularly |

## Testing Principles
1. Testing shows the presence of defects, not their absence
2. Exhaustive testing is impossible
3. Early testing saves costs
4. Defects cluster — 80% of bugs in 20% of code
5. Pesticide paradox — rotate test approaches
6. Testing is context-dependent

## Black Box vs White Box
- **Black Box**: Test without knowing internal code. Focus on inputs/outputs.
- **White Box**: Test with knowledge of code. Cover branches, paths.
`, resources: []
            },
            {
                title: "Unit Testing",
                slug: "unit-testing",
                description: "Writing unit tests, mocking, assertions, and TDD.",
                order: 2, estimatedMinutes: 60, difficulty: "Medium",
                content: `
# Unit Testing

Test individual functions/methods in isolation.

## Test Structure (AAA Pattern)
1. **Arrange**: Set up test data
2. **Act**: Call the function
3. **Assert**: Verify the result

### Python (pytest)
\`\`\`python
def add(a, b):
    return a + b

def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 0) == 0
\`\`\`

### JavaScript (Jest)
\`\`\`javascript
function add(a, b) { return a + b; }

describe('add', () => {
    test('adds positive numbers', () => {
        expect(add(2, 3)).toBe(5);
    });
    test('handles negative numbers', () => {
        expect(add(-1, -1)).toBe(-2);
    });
});
\`\`\`

## Mocking
Replace dependencies with controlled substitutes.
\`\`\`python
from unittest.mock import Mock, patch

@patch('module.external_api_call')
def test_with_mock(mock_api):
    mock_api.return_value = {'status': 'ok'}
    result = process_data()
    assert result == 'ok'
    mock_api.assert_called_once()
\`\`\`

## TDD (Test-Driven Development)
1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code, keep tests passing
`, resources: []
            },
            {
                title: "Integration and E2E Testing",
                slug: "integration-e2e-testing",
                description: "API testing, browser testing, Cypress, Playwright, and test strategies.",
                order: 3, estimatedMinutes: 55, difficulty: "Medium",
                content: `
# Integration and E2E Testing

## Integration Testing
Test how multiple components work together.
- API endpoint tests
- Database interaction tests
- Service-to-service communication

### API Testing Example
\`\`\`python
import requests

def test_create_user():
    response = requests.post('http://localhost:3000/api/users', json={
        'name': 'Alice',
        'email': 'alice@test.com'
    })
    assert response.status_code == 201
    data = response.json()
    assert data['name'] == 'Alice'
\`\`\`

## E2E Testing
Test the entire application from the user's perspective.

### Playwright Example
\`\`\`javascript
test('user can login and see dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@test.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
});
\`\`\`

## Testing Strategies
- **Smoke Testing**: Quick check — does it start?
- **Sanity Testing**: Quick check — does the specific fix work?
- **Regression Testing**: Ensure old features still work
- **Load Testing**: How many concurrent users? (JMeter, k6)
- **Chaos Testing**: Intentionally break things (Netflix Chaos Monkey)
`, resources: []
            },
            {
                title: "Test Automation and Quality",
                slug: "test-automation",
                description: "Automation frameworks, CI integration, code coverage, and quality metrics.",
                order: 4, estimatedMinutes: 55, difficulty: "Hard",
                content: `
# Test Automation and Quality

## Automation Frameworks

| Language | Unit | E2E |
|----------|------|-----|
| Python | pytest, unittest | Selenium, Playwright |
| JavaScript | Jest, Vitest | Cypress, Playwright |
| Java | JUnit | Selenium, TestNG |
| Go | testing package | Chromedp |

## Code Coverage
Percentage of code executed by tests.
- **Line Coverage**: % of lines executed
- **Branch Coverage**: % of if/else branches taken
- **Target**: 80%+ (100% is impractical)

## CI Integration
\`\`\`yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
\`\`\`

## Quality Metrics
- **Defect Density**: Bugs per KLOC (thousand lines of code)
- **MTTR**: Mean Time To Recovery
- **Lead Time**: Code commit → production
- **Deployment Frequency**: How often you deploy
`, resources: []
            }
        ]
    },
    {
        name: "Web Technology",
        slug: "web-technology",
        category: "Programming & Software Development",
        description: "HTML, CSS, JavaScript, REST APIs, web frameworks, and modern web development.",
        icon: "globe",
        difficulty: "Beginner",
        estimatedHours: 40,
        prerequisites: [],
        order: 3,
        topics: [
            {
                title: "HTML & CSS Fundamentals",
                slug: "html-css",
                description: "Semantic HTML, CSS layout, Flexbox, Grid, and responsive design.",
                order: 1, estimatedMinutes: 65, difficulty: "Easy",
                content: `
# HTML & CSS Fundamentals

## Semantic HTML5
\`\`\`html
<header>Site Header</header>
<nav>Navigation</nav>
<main>
    <article>
        <h1>Title</h1>
        <section>Content Section</section>
    </article>
    <aside>Sidebar</aside>
</main>
<footer>Footer</footer>
\`\`\`

## CSS Flexbox
\`\`\`css
.container {
    display: flex;
    justify-content: space-between; /* Main axis */
    align-items: center;            /* Cross axis */
    gap: 1rem;
}
\`\`\`

## CSS Grid
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
\`\`\`

## Responsive Design
\`\`\`css
/* Mobile-first approach */
.card { width: 100%; }

@media (min-width: 768px) {
    .card { width: 50%; }
}
@media (min-width: 1024px) {
    .card { width: 33.33%; }
}
\`\`\`

## Box Model
Content → Padding → Border → Margin
\`\`\`css
* { box-sizing: border-box; } /* Include padding/border in width */
\`\`\`
`, resources: []
            },
            {
                title: "JavaScript Essentials",
                slug: "javascript-essentials",
                description: "ES6+, DOM manipulation, async/await, closures, and prototypes.",
                order: 2, estimatedMinutes: 75, difficulty: "Medium",
                content: `
# JavaScript Essentials

## ES6+ Features
\`\`\`javascript
// Destructuring
const { name, age } = user;
const [first, ...rest] = array;

// Spread operator
const newObj = { ...oldObj, newProp: 'value' };

// Arrow functions
const add = (a, b) => a + b;

// Template literals
const msg = \\\`Hello, \\\${name}! You are \\\${age} years old.\\\`;
\`\`\`

## Async/Await
\`\`\`javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed:', error);
    }
}
\`\`\`

## Closures
\`\`\`javascript
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        getCount: () => count
    };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
\`\`\`

## Event Loop
1. **Call Stack**: Synchronous code executes here
2. **Web APIs**: setTimeout, fetch, DOM events
3. **Callback Queue**: Completed async callbacks
4. **Microtask Queue**: Promise callbacks (higher priority)
5. Event loop moves tasks from queues to call stack when empty
`, resources: []
            },
            {
                title: "REST APIs",
                slug: "rest-apis",
                description: "HTTP methods, RESTful design, authentication, and API best practices.",
                order: 3, estimatedMinutes: 55, difficulty: "Medium",
                content: `
# REST APIs

## HTTP Methods

| Method | Purpose | Idempotent? |
|--------|---------|------------|
| GET | Read resource | Yes |
| POST | Create resource | No |
| PUT | Replace resource | Yes |
| PATCH | Update resource | Yes |
| DELETE | Remove resource | Yes |

## Status Codes
- **200**: OK. **201**: Created. **204**: No Content.
- **301**: Moved. **304**: Not Modified.
- **400**: Bad Request. **401**: Unauthorized. **403**: Forbidden. **404**: Not Found.
- **500**: Server Error. **503**: Unavailable.

## RESTful Design
\`\`\`
GET    /api/users          → List users
GET    /api/users/123      → Get user 123
POST   /api/users          → Create user
PUT    /api/users/123      → Replace user 123
PATCH  /api/users/123      → Update user 123
DELETE /api/users/123      → Delete user 123
\`\`\`

## Authentication
- **API Key**: Simple, in header or query param
- **JWT**: JSON Web Token — stateless, signed
- **OAuth 2.0**: Delegated authorization (Google Login, GitHub Login)
- **Session Cookie**: Server-side session, cookie contains session ID

## Best Practices
- Use nouns for resources (not verbs)
- Use plural names (/users not /user)
- Version your API (/api/v1/users)
- Paginate lists (?page=1&limit=20)
- Use proper status codes
- Return consistent error format
`, resources: []
            },
            {
                title: "Modern Web Frameworks",
                slug: "web-frameworks",
                description: "React, Vue, Angular, Next.js, and component-based architecture.",
                order: 4, estimatedMinutes: 70, difficulty: "Hard",
                content: `
# Modern Web Frameworks

## Component-Based Architecture
Break UI into independent, reusable components. Each manages its own state.

## Framework Comparison

| Feature | React | Vue | Angular |
|---------|-------|-----|---------|
| Type | Library | Framework | Framework |
| Language | JSX | Template/SFC | TypeScript |
| State | useState/Redux | Reactive/Pinia | Services/RxJS |
| Rendering | Virtual DOM | Virtual DOM | Change Detection |
| Learning Curve | Moderate | Easy | Steep |

## React Example
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
\`\`\`

## Meta-Frameworks
- **Next.js** (React): SSR, SSG, API routes, file-based routing
- **Nuxt** (Vue): Similar to Next.js but for Vue
- **SvelteKit** (Svelte): Compiled, no virtual DOM, fastest
`, resources: []
            },
            {
                title: "Web Security Basics",
                slug: "web-security-basics",
                description: "HTTPS, CORS, authentication, CSP, and common vulnerabilities.",
                order: 5, estimatedMinutes: 50, difficulty: "Medium",
                content: `
# Web Security Basics

## OWASP Top 10
1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, XSS)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Data Integrity
9. Logging Failures
10. SSRF

## CORS (Cross-Origin Resource Sharing)
Browser security that restricts cross-origin requests.
\`\`\`javascript
// Server configuration
app.use(cors({
    origin: 'https://myapp.com',
    methods: ['GET', 'POST'],
    credentials: true
}));
\`\`\`

## Security Headers
\`\`\`
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
\`\`\`

## JWT Authentication Flow
1. User sends credentials
2. Server validates, creates signed JWT
3. Client stores JWT (httpOnly cookie recommended)
4. Client sends JWT with each request
5. Server verifies JWT signature
`, resources: []
            }
        ]
    },
    {
        name: "System Design",
        slug: "system-design",
        category: "Programming & Software Development",
        description: "Scalability, availability, consistency, caching, databases, and real-world system design.",
        icon: "layout-template",
        difficulty: "Advanced",
        estimatedHours: 45,
        prerequisites: ["web-technology", "dbms"],
        order: 4,
        topics: [
            {
                title: "Scalability and Load Balancing",
                slug: "scalability-load-balancing",
                description: "Horizontal/vertical scaling, load balancers, and auto-scaling.",
                order: 1, estimatedMinutes: 60, difficulty: "Medium",
                content: `
# Scalability and Load Balancing

## Scaling
- **Vertical (Scale Up)**: Add more CPU/RAM to one machine. Limited.
- **Horizontal (Scale Out)**: Add more machines. Preferred for web apps.

## Load Balancer
Distributes traffic across multiple servers.

### Algorithms
- **Round Robin**: Equal distribution
- **Least Connections**: Send to least busy server
- **IP Hash**: Same client always goes to same server
- **Weighted**: More powerful servers get more traffic

### Types
- **L4** (Transport): Routes based on IP/port. Fast.
- **L7** (Application): Routes based on URL, headers, cookies. Smart.

## Availability
$$Availability = \\frac{Uptime}{Uptime + Downtime}$$

| Level | Downtime/Year |
|-------|--------------|
| 99% (Two 9s) | 3.65 days |
| 99.9% (Three 9s) | 8.76 hours |
| 99.99% (Four 9s) | 52.6 minutes |
| 99.999% (Five 9s) | 5.26 minutes |

## Auto-Scaling
- Based on CPU usage, request rate, queue depth
- **Scale out**: Add instances when load increases
- **Scale in**: Remove instances when load decreases
`, resources: []
            },
            {
                title: "Caching Strategies",
                slug: "caching-strategies",
                description: "Cache-aside, write-through, CDN, Redis, and eviction policies.",
                order: 2, estimatedMinutes: 55, difficulty: "Medium",
                content: `
# Caching

Store frequently accessed data in fast storage (RAM) to reduce latency.

## Patterns
1. **Cache-Aside**: App checks cache → miss → read DB → write to cache
2. **Write-Through**: Write to cache AND DB simultaneously. Consistent but slower writes.
3. **Write-Back**: Write to cache only, async write to DB. Fast but risk of data loss.
4. **Read-Through**: Cache handles DB reads transparently.

## Eviction Policies
- **LRU** (Least Recently Used): Most common
- **LFU** (Least Frequently Used): For hot/cold data
- **TTL** (Time to Live): Expire after duration

## CDN (Content Delivery Network)
Cache static assets (images, CSS, JS) at edge locations worldwide.
- Reduces latency for global users
- Examples: Cloudflare, AWS CloudFront, Akamai

## Redis
In-memory data store. Used for:
- Session storage
- Rate limiting
- Leaderboards
- Real-time analytics
- Message queues (Pub/Sub)

## Cache Invalidation
"There are only two hard things in CS: cache invalidation and naming things."
- **TTL-based**: Set expiry time
- **Event-driven**: Invalidate on data change
- **Version-based**: Include version in cache key
`, resources: []
            },
            {
                title: "Database Design for Scale",
                slug: "database-scale",
                description: "Sharding, replication, partitioning, and SQL vs NoSQL choices.",
                order: 3, estimatedMinutes: 65, difficulty: "Hard",
                content: `
# Database Design for Scale

## Replication
Copy data across multiple servers.
- **Primary-Replica**: Primary handles writes, replicas handle reads.
- **Multi-Primary**: Multiple nodes accept writes (conflict resolution needed).

## Sharding (Horizontal Partitioning)
Split data across multiple databases.

### Strategies
- **Hash-Based**: shard = hash(key) % N. Even distribution.
- **Range-Based**: Date ranges, ID ranges. Easy but hot spots.
- **Directory-Based**: Lookup table maps key to shard.

### Challenges
- Cross-shard queries (JOINs)
- Resharding when adding/removing shards
- Distributed transactions

## SQL vs NoSQL Decision

| Factor | Choose SQL | Choose NoSQL |
|--------|-----------|-------------|
| Data Structure | Well-defined, relational | Flexible, evolving |
| Queries | Complex JOINs needed | Simple lookups, aggregations |
| Consistency | Strong (ACID) | Eventual OK |
| Scale | Moderate | Massive horizontal |
| Example | Banking, ERP | Social media, IoT, Gaming |

## Database per Service (Microservices)
Each service owns its data. No shared databases.
- Communicate via API or events
- Eventual consistency between services
`, resources: []
            },
            {
                title: "System Design Patterns",
                slug: "system-design-patterns",
                description: "Message queues, rate limiting, circuit breaker, and real-world designs.",
                order: 4, estimatedMinutes: 70, difficulty: "Hard",
                content: `
# System Design Patterns

## Message Queues
Decouple producers and consumers. Async processing.
- **Use cases**: Email sending, image processing, order processing
- **Tools**: RabbitMQ, Kafka, AWS SQS
- **Kafka**: Distributed event streaming. Ordered, persistent, high throughput.

## Rate Limiting
Prevent abuse. Limit requests per user/IP.
- **Token Bucket**: Tokens accumulate at fixed rate. Each request uses a token.
- **Sliding Window**: Count requests in rolling time window.

## Circuit Breaker
Prevent cascade failures in microservices.
- **Closed**: Requests flow normally
- **Open**: Requests fail fast (service is down)
- **Half-Open**: Test with limited requests

## Common System Designs

| System | Key Components |
|--------|---------------|
| URL Shortener | Hash function, KV store, redirect |
| Twitter Feed | Fan-out, cache, timeline service |
| Chat System | WebSockets, message queue, presence |
| File Storage | CDN, metadata DB, object storage |
| Search Engine | Inverted index, ranking, crawling |
| Video Streaming | CDN, transcoding, adaptive bitrate |

## Design Interview Framework
1. **Clarify requirements** (functional + non-functional)
2. **Estimate scale** (users, QPS, storage)
3. **High-level design** (components, data flow)
4. **Detailed design** (database schema, API, algorithms)
5. **Identify bottlenecks** (scaling, failure modes)
`, resources: []
            }
        ]
    }
];
