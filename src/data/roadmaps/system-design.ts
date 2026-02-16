
import { RoadmapTrack } from './types';

export const systemDesignRoadmap: RoadmapTrack = {
    id: 'system-design',
    title: 'System Design',
    description: 'Learn how to design large-scale distributed systems',
    category: 'skill-based',
    icon: '🏗️',
    accentColor: '#fb923c',
    rootNodeId: 'sd-root',
    nodes: {
        'sd-root': {
            id: 'sd-root',
            label: 'System Design',
            description: 'Mastering the principles and patterns of building scalable, reliable, and maintainable large-scale distributed systems.',
            children: ['sd-fundamentals', 'sd-scalability', 'sd-storage', 'sd-communication'],
            resources: [
                { type: 'article', title: 'GitHub - The System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', isFree: true },
                { type: 'video', title: 'System Design Interview Guide (Success)', url: 'https://www.youtube.com/watch?v=i7twT3x5yv8', isFree: true },
                { type: 'article', title: 'High Scalability - Real World Architectures', url: 'http://highscalability.com/', isFree: true },
                { type: 'documentation', title: 'Designing Data-Intensive Applications (DDIA)', url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903094/', isFree: false }
            ],
            content: {
                overview: 'System Design is the process of defining the architecture, components, and data flow of a large-scale system to satisfy specific business and technical requirements. It is a critical skill for senior engineers and architects, as it involves making high-level trade-offs between performance, cost, and reliability. \n\nA well-designed system must be able to scale as the user base grows, remain available even when individual components fail, and be maintainable by a team of developers over several years. Mastering system design requires understanding concepts like replication, partitioning, consistency models, and the intricate dance between horizontal and vertical scaling.',
                keyConcepts: [
                    'The Three Pillars: Reliability, Scalability, and Maintainability',
                    'Vertical vs Horizontal Scaling: When to use which',
                    'Load Balancing: Distributing traffic at L4 and L7',
                    'Caching Strategies: CDN, Redis, and browser-side caching',
                    'Data Partitioning and Sharding: Managing massive datasets',
                    'Consistency Models: Strong vs Eventual consistency',
                    'Microservices vs Monolith: Architectural trade-offs',
                    'Message Queues and Event-Driven Architecture'
                ],
                practiceQuestions: [
                    { question: 'What is the "Thundering Herd" problem in caching?', hint: 'Multiple processes querying the database simultaneously after a cache miss.', difficulty: 'hard' },
                    { question: 'Contrast "SLA", "SLO", and "SLI".', hint: 'Agreement vs Objective vs Indicator.', difficulty: 'medium' },
                    { question: 'Explain the difference between through-put and latency.', hint: 'Volume over time vs Time for a single request.', difficulty: 'easy' },
                    { question: 'What is a "Single Point of Failure" (SPOF)?', hint: 'A component that, if it fails, brings down the whole system.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always design for failure—assume every component will eventually break.',
                    'Keep your design as simple as possible; complexity is the enemy of maintenance.',
                    'Measure and monitor everything (Observability is key).',
                    'Decouple components to allow for independent scaling and failures.',
                    'Avoid premature optimization—focus on the core bottleneck first.',
                    'Document your architectural decisions (ADRs) and the reasons behind them.'
                ]
            },
            dayWisePlan: [{ day: 1, title: 'Introduction', description: 'What is System Design?', tasks: ['Learn about reliability, scalability, and maintainability', 'Understand the role of a system designer'] }]
        },
        'sd-fundamentals': {
            id: 'sd-fundamentals',
            label: 'Architectural Fundamentals',
            description: 'Mastering the core building blocks, constraints, and mathematical theorems that govern all distributed systems.',
            parentId: 'sd-root',
            children: ['sd-cap', 'sd-consistency'],
            resources: [
                { type: 'article', title: 'Distributed Systems: An Overview', url: 'https://en.wikipedia.org/wiki/Distributed_computing', isFree: true },
                { type: 'video', title: 'Reliability, Scalability, and Maintainability', url: 'https://www.youtube.com/watch?v=FjI9S-R0kXY', isFree: true },
                { type: 'article', title: 'The Fallacies of Distributed Computing', url: 'https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing', isFree: true },
                { type: 'documentation', title: 'Microsoft Azure - Cloud Design Patterns', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/', isFree: true }
            ],
            content: {
                overview: 'The foundation of any robust system lies in its fundamental constraints and theorems. System design is not about picking the coolest technology; it\'s about understanding the fundamental trade-offs between speed, consistency, and reliability. \n\nAt this stage, you must master the building blocks that every architecture relies on: the CAP theorem (which dictates what guarantees a system can provide), the various consistency models (from Strong to Eventual), and the "Fallacies of Distributed Computing" that every engineer must avoid. Understanding these principles allows you to build systems that don\'t just work on Day 1, but remain stable as they grow into complex, global entities.',
                keyConcepts: [
                    'The CAP Theorem: Consistency, Availability, and Partition Tolerance',
                    'Reliability: Ensuring systems perform correctly under adversity',
                    'Maintainability: Designing for simplicity and evolvability',
                    'Service Level Agreements (SLAs) and Error Budgets',
                    'The Fallacies of Distributed Computing (e.g., "The network is reliable")',
                    'Consistency Models: Linearizability, Causal, and Session consistency',
                    'Redundancy: Eliminating single points of failure',
                    'Statelessness vs Statefulness in architectural design'
                ],
                practiceQuestions: [
                    { question: 'Why is "Partition Tolerance" non-negotiable in distributed systems?', hint: 'Because network failures are inevitable in a multi-node environment.', difficulty: 'hard' },
                    { question: 'What is the difference between "Availability" and "Fault Tolerance"?', hint: 'Uptime percentage vs the ability to continue operating after a failure.', difficulty: 'medium' },
                    { question: 'Explain the "SLA" vs "SLO" relationship.', hint: 'Agreement with users vs the internal objective that satisfies that agreement.', difficulty: 'medium' },
                    { question: 'Name one fallacy of distributed computing.', hint: 'Latency is zero, Bandwidth is infinite, or The network is secure.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always define your SLOs early to drive architectural decisions.',
                    'Build for isolation: ensure a failure in one component doesn\'t cascade.',
                    'Prefer simple, battle-tested patterns over custom, complex solutions.',
                    'Keep your services stateless to simplify scaling and recovery.',
                    'Use "Graceful Degradation" to maintain core features during partial outages.',
                    'Document your "Shared Responsibility" model for security and uptime.'
                ]
            }
        },
        'sd-cap': {
            id: 'sd-cap',
            label: 'CAP Theorem',
            description: 'Consistency, Availability, and Partition Tolerance — choosing two out of three.',
            parentId: 'sd-fundamentals',
            resources: [{ type: 'article', title: 'Understanding CAP', url: 'https://www.ibm.com/topics/cap-theorem', isFree: true }],
            content: {
                overview: 'The CAP theorem states that a distributed data store cannot simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition Tolerance.',
                keyConcepts: [
                    'Consistency: Every read receives the most recent write.',
                    'Availability: Every request receives a (non-error) response.',
                    'Partition Tolerance: The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network.',
                    'CP (mongoDB, hbase), AP (cassandra, dynamoDB), CA (RDBMS - theoretically)'
                ],
                practiceQuestions: [
                    { question: 'Why can’t we have CA in a distributed system?', hint: 'Partitions are inevitable.', difficulty: 'hard' },
                    { question: 'Difference between Strong and Eventual Consistency?', hint: 'Immediate vs Delayed sync.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Pick the right tradeoffs based on your business requirements.',
                    'Understand that CAP is a spectrum, not just binary choices.'
                ]
            }
        },
        'sd-consistency': { id: 'sd-consistency', label: 'Consistency Models', description: 'Strong consistency vs Eventual consistency.', parentId: 'sd-fundamentals', resources: [] },
        'sd-scalability': {
            id: 'sd-scalability',
            label: 'Scaling & Performance',
            description: 'Mastering the techniques to handle growing user bases and massive traffic while maintaining peak performance.',
            parentId: 'sd-root',
            children: ['sd-load-balancing', 'sd-caching'],
            resources: [
                { type: 'video', title: 'Horizontal vs Vertical Scaling Explained', url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0', isFree: true },
                { type: 'article', title: 'AWS - What is Load Balancing?', url: 'https://aws.amazon.com/what-is/load-balancing/', isFree: true },
                { type: 'article', title: 'Google Cloud - Guide to CDN and Caching', url: 'https://cloud.google.com/learn/what-is-a-cdn', isFree: true },
                { type: 'video', title: 'Database Scaling: Sharding and Replication', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', isFree: true }
            ],
            content: {
                overview: 'Scalability refers to the capability of a system to handle a growing amount of work or its potential to be enlarged to accommodate that growth. In modern computing, this primarily means moving from a single powerful machine (Vertical Scaling) to a cluster of many smaller machines (Horizontal Scaling). \n\nPerformance is often measured in terms of Latency (how long a request takes) and Throughput (how many requests we can handle per second). To maintain performance at scale, you must implement strategies like Load Balancing to distribute traffic, Caching to reduce repeated expensive operations, and Database Sharding to prevent bottlenecking at the storage layer.',
                keyConcepts: [
                    'Vertical Scaling (Up): Adding CPU/RAM to a single node',
                    'Horizontal Scaling (Out): Adding more nodes to a system',
                    'Latency vs Throughput: The two key metrics of performance',
                    'Load Balancers: Using Nginx, HAProxy, or AWS ALB/NLB',
                    'Caching Hierarchies: Client-side, CDN, Web Server, and DB Caching',
                    'Auto-Scaling: Dynamically adjusting capacity based on load',
                    'Database Scaling: Read-replicas and horizontal partitioning (Sharding)',
                    'Rate Limiting and Throttling: Protecting systems from abuse'
                ],
                practiceQuestions: [
                    { question: 'What is the main disadvantage of Vertical Scaling?', hint: 'Limited by hardware capacity and often involves downtime.', difficulty: 'easy' },
                    { question: 'Explain "Cache Invalidation" and why it\'s hard.', hint: 'Ensuring the cache reflects the latest source data.', difficulty: 'hard' },
                    { question: 'When would you use a Layer 4 Load Balancer vs Layer 7?', hint: 'TCP/UDP vs Content-aware (HTTP) routing.', difficulty: 'hard' },
                    { question: 'What is the purpose of a Content Delivery Network (CDN)?', hint: 'Caching content closer to the user to reduce latency.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Prefer horizontal scaling wherever possible to achieve high availability.',
                    'Use "Mobile First" and "Content-aware" caching policies.',
                    'Implement "Dead Letter Queues" and retries to handle transient failures during spikes.',
                    'Monitor "Tail Latency" (p99) rather than just the average (mean).',
                    'Use Gzip or Brotli compression to reduce data transfer size.',
                    'Optimize database queries and use connection pooling for high throughput.'
                ]
            }
        },
        'sd-load-balancing': { id: 'sd-load-balancing', label: 'Load Balancers', description: 'Software and hardware load balancers, algorithms (Round Robin, Least Connections).', parentId: 'sd-scalability', resources: [] },
        'sd-caching': { id: 'sd-caching', label: 'Caching Strategies', description: 'Write-through, write-back, evictions (LRU, LFU).', parentId: 'sd-scalability', resources: [] },
        'sd-storage': {
            id: 'sd-storage',
            label: 'Data Storage & Management',
            description: 'Mastering the art of storing, retrieving, and scaling data across distributed systems with reliability and performance.',
            parentId: 'sd-root',
            children: ['sd-replication', 'sd-sharding'],
            resources: [
                { type: 'article', title: 'MongoDB - Database Scaling Guide', url: 'https://www.mongodb.com/basics/v/database-scaling', isFree: true },
                { type: 'video', title: 'ACID vs BASE Explained', url: 'https://www.youtube.com/watch?v=W2Z58Id8Xtk', isFree: true },
                { type: 'article', title: 'Choosing the Right Database', url: 'https://pydantic-docs.helpmanual.io/blog/choosing-a-database/', isFree: true },
                { type: 'documentation', title: 'PostgreSQL - High Availability & Replication', url: 'https://www.postgresql.org/docs/current/high-availability.html', isFree: true }
            ],
            content: {
                overview: 'At the heart of every large-scale system is the data storage layer. Managing data at scale involves more than just choosing between SQL and NoSQL; it requires understanding how data is replicated for availability, partitioned (sharded) for performance, and how consistency is maintained across multiple nodes. \n\nA system designer must decide whether to prioritize strong consistency (ACID) or eventual consistency (BASE), how to handle leader-follower failovers, and when to use specialized storage like Time-Series databases or Graph databases. Properly architected storage ensures that your application remains fast and your data remains safe, even under extreme load.',
                keyConcepts: [
                    'Relational (SQL) vs Non-Relational (NoSQL)',
                    'Replication: Single-leader, Multi-leader, and Leaderless',
                    'Sharding: Range-based, Hash-based, and Directory-based',
                    'Indexing Strategies: B-Trees, LSM-Trees, and Query Optimization',
                    'Transactions: Atomicity, Isolation levels, and 2-Phase Commit',
                    'CAP Theorem and its practical implications for storage',
                    'Object Storage vs Block Storage vs File Storage',
                    'Data Warehousing and Data Lakes for Analytics'
                ],
                practiceQuestions: [
                    { question: 'What is the "Hot Partition" problem in sharding?', hint: 'When one shard receives significantly more traffic than others.', difficulty: 'hard' },
                    { question: 'Explain the difference between a "Read Replica" and "Multi-leader" replication.', hint: 'One is for scaling reads; the other allows writes on multiple nodes.', difficulty: 'medium' },
                    { question: 'When would you use an LSM-Tree based storage engine (like Cassandra) over a B-Tree?', hint: 'When write throughput is the primary concern.', difficulty: 'hard' },
                    { question: 'What is "Write-Ahead Logging" (WAL) used for?', hint: 'Ensuring durability and crash recovery.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always normalize your schema unless you have a proven performance reason to denormalize.',
                    'Use "Consistent Hashing" for sharding to minimize data movement during scaling.',
                    'Implement regular backups and, more importantly, test your restoration process.',
                    'Monitor disk I/O and latency—these are usually the first storage bottlenecks.',
                    'Secure your data at rest using industry-standard encryption.',
                    'Choose your "Partition Key" carefully; it governs your entire scaling strategy.'
                ]
            }
        },
        'sd-replication': { id: 'sd-replication', label: 'Replication', description: 'Leader-follower, multi-leader, and leaderless replication.', parentId: 'sd-storage', resources: [] },
        'sd-sharding': { id: 'sd-sharding', label: 'Sharding', description: 'Horizontal partitioning of data across multiple nodes.', parentId: 'sd-storage', resources: [] },
        'sd-communication': {
            id: 'sd-communication',
            label: 'Network Communication',
            description: 'Mastering the protocols and patterns that allow services to communicate reliably and efficiently in a distributed environment.',
            parentId: 'sd-root',
            children: ['sd-rest-grpc', 'sd-message-queues'],
            resources: [
                { type: 'video', title: 'REST vs gRPC vs GraphQL', url: 'https://www.youtube.com/watch?v=uYRE66LqWz0', isFree: true },
                { type: 'article', title: 'Microservices Communication Patterns', url: 'https://microservices.io/patterns/index.html', isFree: true },
                { type: 'video', title: 'Introduction to Kafka and Message Queues', url: 'https://www.youtube.com/watch?v=H30sXisF3yA', isFree: true },
                { type: 'documentation', title: 'gRPC Documentation', url: 'https://grpc.io/docs/', isFree: true }
            ],
            content: {
                overview: 'In a distributed system, services are only as good as their ability to talk to each other. Network communication involves choosing between synchronous calls (APIs) and asynchronous events (Message Queues). \n\nModern systems often use a mix: gRPC for fast, typed internal service communication, REST or GraphQL for external consumers, and Kafka or RabbitMQ for decoupled, event-driven processing. A system designer must account for network latency, potential message loss, and service discovery to ensure the entire "distributed engine" runs smoothly.',
                keyConcepts: [
                    'Synchronous vs Asynchronous Communication',
                    'OSI Model: Understanding the networking stack',
                    'Protocols: HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)',
                    'Serialization: JSON, Protocol Buffers (non-human-readable), and Avro',
                    'Service Discovery: How services find each other (Consul, Etcd)',
                    'API Gateways vs Service Mesh (Istio, Linkerd)',
                    'Pub/Sub and Message Queues for decoupling',
                    'Polling vs WebHooks vs WebSockets'
                ],
                practiceQuestions: [
                    { question: 'Why is gRPC often preferred over REST for internal microservice communication?', hint: 'Lower latency, binary serialization (Protobuf), and strong typing.', difficulty: 'medium' },
                    { question: 'What is "Circuit Breaking" in service communication?', hint: 'Preventing a failing service from causing a cascade of errors.', difficulty: 'hard' },
                    { question: 'Contrast "At-least-once" and "Exactly-once" delivery in message queues.', hint: 'Trade-off between message loss and duplicate processing.', difficulty: 'hard' },
                    { question: 'What are "WebHooks" and how do they differ from regular APIs?', hint: 'Push-based notification vs Pull-based request.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Design your communication to be "Idempotent"—handling the same message twice safely.',
                    'Use a Service Mesh for complex traffic management and cross-cutting concerns.',
                    'Implement robust timeouts and retries with "Exponential Backoff".',
                    'Keep your API versions documented and backward-compatible.',
                    'Monitor network metrics: bandwidth, latency, and packet loss.',
                    'Use asynchronous communication for non-blocking, long-running tasks.'
                ]
            }
        },
        'sd-rest-grpc': { id: 'sd-rest-grpc', label: 'REST vs gRPC', description: 'Synchronous communication protocols.', parentId: 'sd-communication', resources: [] },
        'sd-message-queues': { id: 'sd-message-queues', label: 'Message Queues', description: 'Asynchronous event-driven communication (Kafka, RabbitMQ).', parentId: 'sd-communication', resources: [] }
    }
};
