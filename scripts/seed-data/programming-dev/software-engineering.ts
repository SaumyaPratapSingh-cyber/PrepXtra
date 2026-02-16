// Software Engineering Seed Data — Enriched
export const softwareEngineeringTopics = [
    {
        title: "Introduction to Software Engineering",
        slug: "sofwate-engineering-intro",
        description: "Engineering principles applied to software development.",
        order: 1, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Introduction to Software Engineering

Software Engineering is the systematic application of engineering approaches to the development of software.

## 1. Why Engineering?
Programming is just writing code. Software Engineering is managing complexity, ensuring reliability, and delivering value within budget and time constraints.

| Aspect | Programming | Software Engineering |
|--------|------------|----------------------|
| **Goal** | Make it work | Make it maintainable, scalable, and reliable |
| **Scope** | Single developer / Small team | Large teams / Cross-functional collaboration |
| **Lifespan** | short-term scripts | Years or decades of maintenance |
| **Process** | Ad-hoc | Defined SDLC (Waterfall, Agile) |

## 2. The Software Crisis
In the 1960s, hardware power grew rapidly, but software complexity spiraled out of control, leading to:
- Projects over budget & over time
- Low quality & frequent crashes
- Unmaintainable code
**Solution**: Systematic engineering processes (SDLC).

## 3. Key Qualities of Good Software
- **Correctness**: Does it meet the requirements?
- **Reliability**: Does it work consistently without failure?
- **Maintainability**: Is it easy to fix bugs and add features?
- **Usability**: Is it easy for humans to use?
- **Efficiency**: Does it use resources (CPU, RAM) wisely?

## 4. Software Development Layers
\`\`\`mermaid
graph BT
    Tools[Tools: IDE, Git, CI/CD] --> Methods[Methods: Agile, Waterfall]
    Methods --> Process[Process: SDLC Framework]
    Process --> Quality[Quality Focus]
\`\`\`
`, resources: []
    },
    {
        title: "SDLC Models: Waterfall & V-Model",
        slug: "sdlc-waterfall-vmodel",
        description: "Classic sequential development methodologies.",
        order: 2, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# SDLC Models: Waterfall & V-Model

## 1. The Waterfall Model
The classic linear approach. You must complete one phase before moving to the next.

**Phases**:
1. **Requirements**: Document what to build.
2. **Design**: Plan the architecture.
3. **Implementation**: Write the code.
4. **Verification**: Test the software.
5. **Maintenance**: Fix bugs and update.

| Pros | Cons |
|------|------|
| Simple and easy to manage | Inflexible to changes |
| Clear milestones and deliverables | Working software is produced late |
| Good for stable requirements | High risk of failure if requirements are misunderstood |

## 2. The V-Model (Verification & Validation)
An extension of Waterfall where testing is planned in parallel with development.

\`\`\`
Requirements ----------- Acceptance Testing
  \\                          /
   System Design -------- System Testing
    \\                      /
     Arch. Design ------ Integration Testing
      \\                  /
       Module Design -- Unit Testing
        \\              /
         Implementation
\`\`\`

**Key Concept**: For every design phase, there is a corresponding testing phase.

## 3. When to use?
- **Waterfall/V-Model**: Embedded systems, medical devices, space shuttles (where requirements are fixed and safety is critical).
- **Agile**: Web apps, startups, consumer software (where feedback speed matters).
`, resources: []
    },
    {
        title: "Agile Methodology & Scrum",
        slug: "agile-scrum",
        description: "Iterative development and the Scrum framework.",
        order: 3, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Agile Methodology & Scrum

## 1. The Agile Manifesto
Agile is a mindset, not a rigid process. It values:
- **Individuals and interactions** over processes and tools
- **Working software** over comprehensive documentation
- **Customer collaboration** over contract negotiation
- **Responding to change** over following a plan

## 2. Scrum Framework
The most popular implementation of Agile.

### Roles
- **Product Owner (PO)**: Defined *what* to build (backlog).
- **Scrum Master**: Ensures the team follows the process (servant-leader).
- **Development Team**: Cross-functional team that builds the software.

### Artifacts
- **Product Backlog**: List of all desired features (User Stories).
- **Sprint Backlog**: Tasks selected for the current Sprint.
- **Increment**: Using working software delivered at the end of the Sprint.

### Events (Ceremonies)
1. **Sprint Planning**: Select work for the next 2-4 weeks.
2. **Daily Scrum (Standup)**: 15-min sync (What did I do? What will I do? Blockers?).
3. **Sprint Review**: Demo the working software to stakeholders.
4. **Sprint Retrospective**: Team discusses how to improve the process.

## 3. User Stories
Standard format for requirements in Agile:
> "As a **[role]**, I want to **[feature]**, so that **[benefit]**."

**Example**: "As a *shopper*, I want to *filter usage by price*, so that *I can find items in my budget*."

## 4. Kanban vs Scrum
- **Scrum**: Fixed-length iterations (Sprints).
- **Kanban**: Continuous flow (limit work/progress).
`, resources: []
    },
    {
        title: "Requirements Engineering",
        slug: "requirements-engineering",
        description: "Functional vs Non-functional requirements.",
        order: 4, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Requirements Engineering

The process of defining, documenting, and maintaining the requirements. "Building the right product" is harder than "building the product right."

## 1. Types of Requirements

### Functional Requirements (FR)
What the system should **DO**.
- "System should send an email after signup."
- "User can search products by name."
- "Admin can ban abusive users."

### Non-Functional Requirements (NFR)
How the system should **BEHAVE** (Quality Attributes).
- **Performance**: Page loads in < 2s.
- **Security**: Passwords encrypted with bcrypt.
- **Reliability**: 99.9% uptime.
- **Scalability**: Support 10,000 concurrent users.

## 2. The Process

1. **Elicitation**: Gatthering needs (Interviews, observation, surveys).
2. **Analysis**: Resolving conflicts, checking feasibility.
3. **Specification**: Documenting in SRS (Software Requirements Specification).
4. **Validation**: Ensuring requirements meet stakeholder needs.

## 3. Properties of Good Requirements
- **Clear**: No ambiguity ("User-friendly" is bad; "3 clicks max" is good).
- **Testable**: Can you write a pass/fail test for it?
- **Complete**: Covers all scenarios (including errors).
- **Consistent**: No contradictions.

## 4. Requirement Prioritization (MoSCoW)
- **M**ust have: Critical features (MVP).
- **S**hould have: Important but not critical.
- **C**ould have: Nice to have.
- **W**on't have: Out of scope for now.
`, resources: []
    },
    {
        title: "Software Architecture Patterns",
        slug: "architecture-patterns",
        description: "MVC, Microservices, and Layered Architecture.",
        order: 5, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Software Architecture Patterns

High-level structures for organizing software systems.

## 1. Layered (N-Tier) Architecture
Organizes code into horizontal layers.
- **Presentation Layer**: UI/API endpoints.
- **Business Logic Layer**: Core rules and validation.
- **Data Access Layer**: SQL queries, DB connection.
- **Database**: The actual storage.

**Pros**: Separation of concerns, easy to test layers independently.
**Cons**: Changes often ripple through all layers.

## 2. MVC (Model-View-Controller)
Used primarily for UI/Web applications.
- **Model**: Data and logic.
- **View**: UI display.
- **Controller**: Handles user input, updates Model.

**Example**: Django, Ruby on Rails, Spring MVC.

## 3. Microservices
Decomposing app into small, independent services communicating via network.
- **Pros**: Independent scaling, tech stack flexibility.
- **Cons**: Distributed system complexity (latency, consistency).

## 4. Event-Driven Architecture
State changes trigger events that other service react to.
- Producers emit events ("OrderPlaced").
- Consumers listen and react (Inventory service reserves item).
- **Loose coupling** and high scalability.

## 5. Clean Architecture (Onion/Hexagonal)
Dependencies point **inwards**.
- **Core**: Entities and Use Cases (No external dependencies).
- **Adapters**: Controllers, Gateways.
- **Infrastructure**: DB, UI, Web Frameworks.

**Benefit**: You can swap the database or UI without touching the core business logic.
`, resources: []
    },
    {
        title: "UML Diagrams (Class, Use Case)",
        slug: "uml-diagrams",
        description: "Visual modeling language for software.",
        order: 6, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Unified Modeling Language (UML)

Standard visual language for documenting software system design.

## 1. Structural Diagrams (Static)
Show the building blocks of the system.

### Class Diagram
Most common diagram for OO design.
- **Classes**: Rectangles with Name, Attributes, Methods.
- **Relationships**:
  - **Association**: Connection (Solid line).
  - **Inheritance**: Is-a (Triangle arrow).
  - **Composition**: Has-a (Filled diamond, strong ownership).
  - **Aggregation**: Has-a (Empty diamond, weak ownership).

\`\`\`mermaid
classDiagram
    class Animal {
        +String name
        +speak()
    }
    class Dog {
        +breed
        +bark()
    }
    Animal <|-- Dog : Inheritance
\`\`\`

## 2. Behavioral Diagrams (Dynamic)
Show how the system behaves over time.

### Use Case Diagram
Shows interactions between **Actors** (Users) and **System**.
- **Actor**: Stick figure.
- **Use Case**: Oval (e.g., "Login", "Checkout").
- **System Boundary**: Box around use cases.

### Sequence Diagram
Shows object interactions in time sequence.
\`\`\`mermaid
sequenceDiagram
    User->>Browser: Enters URL
    Browser->>Server: HTTP Request
    Server->>DB: Query User
    DB-->>Server: Return Data
    Server-->>Browser: HTTP Response
\`\`\`
`, resources: []
    },
    {
        title: "Design Patterns: Creational",
        slug: "design-patterns-creational",
        description: "Singleton, Factory, and Builder patterns.",
        order: 7, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Creational Design Patterns

Focus on object creation mechanisms, increasing flexibility and reuse.

## 1. Singleton Pattern
Ensures a class has only one instance and provides a global point of access.
**Use Case**: Database connection pool, Logger, Config manager.

\`\`\`typescript
class Database {
    private static instance: Database;
    private constructor() {} // Prevent direct new()

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
\`\`\`

## 2. Factory Method
Defines an interface for creating an object but lets subclasses alter the type of object created.
**Use Case**: A UI framework creating buttons (WindowsButton vs MacButton).

## 3. Builder Patterns
Constructs complex objects step by step.
**Use Case**: Constructing a complex HTTP request or SQL query.

\`\`\`typescript
const user = new UserBuilder()
    .setName("Alice")
    .setAge(30)
    .setEmail("alice@example.com")
    .build();
\`\`\`

## 4. Prototype
Creates new objects by copying an existing object (cloning).
**Use Case**: When object creation is expensive (e.g., deep copy of a large config).
`, resources: []
    },
    {
        title: "Design Patterns: Structural",
        slug: "design-patterns-structural",
        description: "Adapter, Decorator, and Facade patterns.",
        order: 8, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Structural Design Patterns

Focus on how classes and objects are composed to form larger structures.

## 1. Adapter Pattern
Allows incompatible interfaces to work together. "Wrapper".
**Use Case**: Using a legacy XML-based API in a system that expects JSON. The Adapter converts XML to JSON.

## 2. Decorator Pattern
Adds behavior to an individual object dynamically without affecting other objects of the same class.
**Use Case**: Java I/O streams (\`new BufferedReader(new InputStreamReader(...))\`), Adding toppings to a pizza object.

\`\`\`typescript
class Coffee { cost() { return 5; } }
class MilkDecorator {
    constructor(coffee) { this.coffee = coffee; }
    cost() { return this.coffee.cost() + 2; }
}
\`\`\`

## 3. Facade Pattern
Provides a simplified interface to a library, a framework, or any other complex set of classes.
**Use Case**: A \`VideoConverter\` class that hides the complexity of codec, bitrate, and audio syncing libraries behind a single \`convert()\` method.

## 4. Proxy Pattern
A placeholder for another object to control access to it.
**Use Case**: Lazy loading (Virtual Proxy), Access control (Protection Proxy), Caching results.
`, resources: []
    },
    {
        title: "Design Patterns: Behavioral",
        slug: "design-patterns-behavioral",
        description: "Observer, Strategy, and Command patterns.",
        order: 9, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Behavioral Design Patterns

Focus on communication between objects and responsibility assignment.

## 1. Observer Pattern
Defines a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.
**Use Case**: Event listeners in UI (button clicks), Pub/Sub systems (Chat rooms).

\`\`\`typescript
subject.subscribe(observer);
subject.notify("New Data"); // All observers get updated
\`\`\`

## 2. Strategy Pattern
Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
**Use Case**: Sorting strategies (QuickSort vs MergeSort), Payment methods (CreditCard vs PayPal).

\`\`\`typescript
context.setStrategy(new PayPalStrategy());
context.pay(100);
\`\`\`

## 3. Command Pattern
Turns a request into a stand-alone object containing all information about the request.
**Use Case**: Undo/Redo operations, Queuing jobs, Remote control processing.

## 4. State Pattern
Allows an object to alter its behavior when its internal state changes.
**Use Case**: A document publishing workflow (Draft -> Review -> Published).
`, resources: []
    },
    {
        title: "SOLID Principles",
        slug: "solid-principles",
        description: "The 5 commandments of clean OOD.",
        order: 10, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# SOLID Principles

Five principles that make software designs more understandable, flexible, and maintainable.

## 1. S - Single Responsibility Principle (SRP)
**"A class should have only one reason to change."**
- Don't mix logic. A \`User\` class should handle user data, but not sending emails or saving to DB.
- **Bad**: \`User.saveToDatabase()\`
- **Good**: \`UserRepository.save(User)\`

## 2. O - Open/Closed Principle (OCP)
**"Software entities should be open for extension, but closed for modification."**
- You should be able to add new functionality without changing existing code.
- **Example**: Plugin systems. You add a new payment method by creating a new class, not by editing the huge \`PaymentProcessor\` switch statement.

## 3. L - Liskov Substitution Principle (LSP)
**"Subtypes must be substitutable for their base types."**
- If \`Bird\` has a \`fly()\` method, but \`Penguin extends Bird\` throws an error on \`fly()\`, it violates LSP.
- **Fix**: Separate \`Bird\` into \`FlyingBird\` and \`NonFlyingBird\`.

## 4. I - Interface Segregation Principle (ISP)
**"Clients should not be forced to depend upon interfaces that they do not use."**
- Don't create massive interfaces.
- **Bad**: \`IMachine\` has \`print()\`, \`scan()\`, \`fax()\`. A simple printer has to implement empty \`scan()\` methods.
- **Good**: Split into \`IPrinter\`, \`IScanner\`.

## 5. D - Dependency Inversion Principle (DIP)
**"Depend upon abstractions, not concretions."**
- High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).
- **Example**: \`OrderService\` should depend on \`IDatabase\`, not specific \`MySQLDatabase\`. This allows swapping MySQL for PostgreSQL easily.
`, resources: []
    },
{
    title: "Clean Code Principles",
        slug: "clean-code",
            description: "Writing code for humans, not just machines.",
                order: 11, estimatedMinutes: 50, difficulty: "Medium",
                    content: `
# Clean Code Principles

"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler

## 1. Meaningful Names
- **Use intention-revealing names**: \`int d;\` vs \`int daysSinceCreation;\`
- **Avoid disinformation**: \`accountList\` (if it's not a List)
- **Make meaningful distinctions**: \`ProductInfo\` vs \`ProductData\`
- **Use pronounceable names**: \`genymdhms\` vs \`generationTimestamp\`

## 2. Functions
- **Small**: The first rule of functions is that they should be small.
- **Do One Thing**: Functions should do one thing, do it well, and do it only.
- **One Level of Abstraction**: Don't mix high-level logic (orchestration) with low-level details (string parsing).
- **Arguments**: Ideally zero or one. Three is too many.

## 3. Comments
- **Don't comment bad code — rewrite it**.
- **Good Comments**: Legal info, explanation of intent, warning of consequences.
- **Bad Comments**: Jargon, redundant comments, commented-out code.

## 4. Error Handling
- **Use Exceptions rather than Return Codes**.
- **Don't return Null**: Forces every caller to check for null.
- **Don't pass Null**: Passing null into methods is worse.

## 5. Formatting
- **Team Rules**: The team should agree on a single formatting style (Prettier, ESLint).
- **Vertical Density**: Related concepts should be vertically close.
`, resources: []
},
{
    title: "DevOps & CI/CD",
        slug: "devops-cicd",
            description: "Bridging the gap between Dev and Ops.",
                order: 12, estimatedMinutes: 55, difficulty: "Medium",
                    content: `
# DevOps & CI/CD

Cultural philosophy and practices that increase an organization's ability to deliver applications at high velocity.

## 1. What is DevOps?
DevOps is the union of **Development (Dev)** and **Operations (Ops)**.
- **Before**: Devs threw code "over the wall" to Ops, who deployed it. Blame game ensued when things broke.
- **Now**: "You build it, you run it." Shared responsibility.

## 2. The DevOps Loop
\`\`\`
Plan → Code → Build → Test → Release → Deploy → Operate → Monitor → (back to Plan)
\`\`\`

## 3. CI/CD Pipeline
- **Continuous Integration (CI)**: Developers merge their changes back to the main branch as often as possible. Automated builds and tests run.
- **Continuous Delivery (CD)**: Code changes are automatically built, tested, and prepared for persistent release to production.
- **Continuous Deployment (CD)**: Like Delivery, but the release to production is automatic (no manual approval).

## 4. Key Tools
- **Source Control**: Git, GitHub, GitLab.
- **CI Server**: Jenkins, GitHub Actions, CircleCI.
- **Configuration Management**: Ansible, Chef, Puppet.
- **Infrastructure as Code (IaC)**: Terraform, CloudFormation.
- **Containerization**: Docker, Kubernetes.
- **Monitoring**: Prometheus, Grafana, Datadog.

## 5. Benefits
- **Speed**: Faster time to market.
- **Reliability**: Automated tests catch bugs early.
- **Scale**: Infrastructure as Code allows managing thousands of servers.
`, resources: []
},
{
    title: "Version Control (Git)",
        slug: "version-control-git",
            description: "Managing code history and collaboration.",
                order: 13, estimatedMinutes: 60, difficulty: "Easy",
                    content: `
# Version Control Systems (Git)

## 1. Why Version Control?
- **History**: "Who broke this line of code 3 months ago?"
- **Backup**: If your laptop dies, the code is safe on the server.
- **Collaboration**: Multiple people working on the same file without overwriting each other.
- **Branching**: Experiment with features without breaking the main code.

## 2. Git Concepts

| Concept | Explanation |
|---------|-------------|
| **Repository (Repo)** | The project folder containing all files and history. |
| **Commit** | A snapshot of the project at a specific point in time. |
| **Branch** | A parallel version of the repository (e.g., \`feature-login\`). |
| **Merge** | Combining changes from one branch into another. |
| **Remote** | The version of the repo hosted on a server (GitHub). |
| **HEAD** | Pointer to the current commit you are viewing. |

## 3. Standard Git Workflow
1. \`git clone <url>\`: Download repo.
2. \`git checkout -b feature-param\`: Create a new branch.
3. \`git add .\`: Stage changes.
4. \`git commit -m "Added login param"\`: Save snapshot.
5. \`git push origin feature-param\`: Upload to GitHub.
6. Open Pull Request (PR) -> Review -> Merge.

## 4. Git Commands Cheat Sheet

| Command | Action |
|---------|--------|
| \`git status\` | What changed? |
| \`git diff\` | Show detailed changes. |
| \`git log\` | Show commit history. |
| \`git pull\` | Download changes from remote. |
| \`git reset --hard\` | Discard all local changes (DANGER!). |
| \`git stash\` | Temporarily save changes to switch branches. |
`, resources: []
},
{
    title: "Software Maintenance",
        slug: "software-maintenance",
            description: "The longest and most expensive phase.",
                order: 14, estimatedMinutes: 45, difficulty: "Medium",
                    content: `
# Software Maintenance

Maintenance starts **after** the software is deployed. It consumes 60-80% of total lifecycle costs.

## 1. Types of Maintenance

| Type | Purpose | Example |
|------|---------|---------|
| **Corrective** | Fix bugs | Fixing a login crash on iOS. |
| **Adaptive** | Adapt to environment changes | Upgrading to support Android 14. |
| **Perfective** | Improve performance/maintainability | Refactoring code, optimizing SQL. |
| **Preventive** | Avoid future problems | Updating libraries before they are deprecated. |

## 2. Legacy Code
"Legacy code is code without tests." — Michael Feathers.
- **Characteristics**: Poor documentation, obsolete tech, fear of changing it.
- **Strategy**: Don't rewrite from scratch (The Big Rewrite often fails). Refactor gradually. Add tests before changing logic.

## 3. Lehman's Laws of Software Evolution
1. **Continuing Change**: A system must evolve or it becomes progressively less useful.
2. **Increasing Complexity**: As a system evolves, its complexity increases unless work is done to maintain or reduce it.
`, resources: []
},
{
    title: "Technical Debt",
        slug: "technical-debt",
            description: "The cost of quick-and-dirty solutions.",
                order: 15, estimatedMinutes: 45, difficulty: "Medium",
                    content: `
# Technical Debt

A metaphor coined by Ward Cunningham.
- **Concept**: Taking a shortcut now equals "borrowing" time. You get the feature out faster, but you have to pay "interest" (harder maintenance) later.
- **Principal**: The refactoring you should have done.
- **Interest**: The extra time it takes to add new features because of the messy code.

## 1. Types of Tech Debt

| Type | Description | Example |
|------|-------------|---------|
| **Deliberate** | "We need to launch for Xmas, we'll fix it later." | Hardcoding a config value. |
| **Accidental/Inadvertent** | "We didn't know better." | Using a database that doesn't scale. |
| **Bit Rot** | Changes in the ecosystem. | A library hasn't been updated in 3 years. |

## 2. Managing Tech Debt
- **Acknowledge it**: Track debt in the backlog (e.g., "Tech Debt: Refactor UserAuth").
- **Pay it down**: Allocate 20% of every sprint to paying debt.
- **Bankruptcy**: When debt is so high that development stops. Requires a full rewrite (rare and risky).

## 3. The Broken Window Theory
Bad code encourages more bad code. If one window in a building is broken and left unrepaired, people will conclude that no one cares and break more windows.
**Moral**: Fix "bad smells" immediately.
`, resources: []
},
{
    title: "Code Reviews",
        slug: "code-reviews",
            description: "Peer review for quality assurance.",
                order: 16, estimatedMinutes: 40, difficulty: "Easy",
                    content: `
# Code Reviews

The process of systematically examining computer source code.

## 1. Goals of Code Review
- **Finding defects**: Bugs, security vulnerabilities, edge cases.
- **Code Quality**: Readability, maintainability, adherence to style guides.
- **Knowledge Sharing**: Junior devs learn from seniors; seniors learn about new parts of the system.
- **Consistency**: Ensuring the codebase looks like it was written by one person.

## 2. Best Practices for Reviewers
- **Be kind**: Critique the code, not the person. "This loop is inefficient" vs "You wrote a bad loop."
- **Be specific**: "This variable name is unclear, suggest \`daysSinceLogin\`" vs "Fix naming."
- **Focus on the important**: Architecture and logic bugs > Formatting (use a linter for that).
- **Fast turnaround**: Don't block your teammates for days.

## 3. Best Practices for Authors
- **Small PRs**: A 200-line PR is reviewed thoroughly. A 2000-line PR is "Looks good to me."
- **Self-review**: Read your own diff before assigning it.
- **Context**: Explain *why* you made these changes in the PR description.
`, resources: []
},
{
    title: "Software Metrics",
        slug: "software-metrics",
            description: "Measuring quality and productivity.",
                order: 17, estimatedMinutes: 50, difficulty: "Hard",
                    content: `
# Software Metrics

"You can't control what you can't measure."

## 1. Product Metrics (Code Quality)
- **Cyclomatic Complexity**: Number of independent paths through code. High = hard to test.
- **Code Coverage**: % of code executed by tests.
- **Lines of Code (LOC)**: Crude measure of size (generally meaningless for productivity).
- **Defect Density**: Bugs per KLOC (1000 lines of code).

## 2. Process Metrics (Productivity)
- **Lead Time**: Time from idea to production.
- **Cycle Time**: Time from starting work to finishing work.
- **Velocity**: Story points completed per sprint (Scrum).
- **MTTR (Mean Time To Recovery)**: Average time to fix a production failure.
- **MTBF (Mean Time Between Failures)**: Average time between system crashes.

## 3. The GQM Paradigm (Goal-Question-Metric)
Don't just measure everything.
1. **Goal**: "Improve system reliability."
2. **Question**: "How often does it crash?"
3. **Metric**: MTBF.

## 4. Goodhart's Law
"When a measure becomes a target, it ceases to be a good measure."
- If you target LOC, devs will write verbose code.
- If you target "bugs found", QA will report trivial bugs.
`, resources: []
},
{
    title: "Ethics in Software Engineering",
        slug: "ethics-se",
            description: "Professional responsibility and impact.",
                order: 18, estimatedMinutes: 45, difficulty: "Easy",
                    content: `
# Ethics in Software Engineering (ACM/IEEE Code)

Software engineers have significant opportunities to do good or cause harm.

## 1. Key Principles
- **Public**: Software engineers shall act consistently with the public interest. (Don't build malware).
- **Client and Employer**: Act in a manner that is in the best interests of their client and employer, consistent with the public interest.
- **Product**: Ensure that their products and related modifications meet the highest professional standards possible.
- **Judgment**: Maintain integrity and independence in their professional judgment.

## 2. Ethical Dilemmas
- **Algorithmic Bias**: An AI hiring tool that discriminates against women.
- **Privacy**: Collecting more user data than necessary.
- **Safety-Critical Systems**: Releasing self-driving car software with known critical bugs to beat a deadline.
- **Dark Patterns**: UI designed to trick users into subscribing.

## 3. Whistleblowing
The act of reporting unethical/illegal activities within an organization to external authorities. A last resort when internal channels fail.
`, resources: []
},
{
    title: "Real-Time Systems",
        slug: "real-time-systems",
            description: "Hard vs Soft real-time constraints.",
                order: 19, estimatedMinutes: 55, difficulty: "Hard",
                    content: `
# Real-Time Systems

Systems that must respond to events within strict time constraints.

## 1. Hard Real-Time
Missing a deadline is a **total system failure** (and potentially catastrophic).
- **Examples**: Airbag deployment system, Pacemaker, Flight control system.
- **Requirement**: Deterministic behavior. Garbage collection is often forbidden.

## 2. Soft Real-Time
Missing a deadline degrades quality but the system can continue.
- **Examples**: Video streaming (lag), Online gaming, VOIP calls.
- **Requirement**: Average response time matters, occasional spikes are tolerated.

## 3. Scheduling Algorithms
- **Rate Monotonic Scheduling (RMS)**: Static priority. Shorter tasks get higher priority.
- **Earliest Deadline First (EDF)**: Dynamic priority. Tasks with closer deadlines get higher priority.

## 4. Challenges
- **Priority Inversion**: A high-priority task is blocked by a low-priority task holding a resource. (Solved by Priority Inheritance).
- **Jitter**: Variation in response time.
`, resources: []
},
{
    title: "Future of Software Engineering",
        slug: "future-se",
            description: "AI, Low-Code, and Quantum Computing.",
                order: 20, estimatedMinutes: 50, difficulty: "Easy",
                    content: `
# Future of Software Engineering

## 1. AI-Assisted Development
- **Copilot/ChatGPT**: Writing boilerplate, generating unit tests, explaining legacy code.
- **Impact**: Developers move from "writing code" to "reviewing and architecting code". Productivity increases, but junior devs need new ways to learn basics.

## 2. Low-Code / No-Code
- Platforms like Bubble, OutSystems allowing non-developers to build apps.
- **Impact**: Simple CRUD apps will be built by business users. Engineers will focus on complex, high-scale systems.

## 3. Quantum Software Engineering
- Programming quantum computers (Qubits, Superposition).
- Requires entirely new algorithms (Shor's algorithm) and debugging paradigms.

## 4. Green Software Engineering
- Designing software to be energy efficient to reduce carbon footprint.
- **Practices**: Efficient algorithms, turning off unused servers, optimizing data transfer.

## 5. Summary
The tools change, but the core engineering principles (abstraction, modularity, trade-offs) remain the same.
`, resources: []
}
];
