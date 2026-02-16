// System Design Seed Data — Enriched
export const systemDesignTopics = [
    {
        title: "Introduction to System Design",
        slug: "system-design-intro",
        description: "Scalability, Availability, and Reliability foundations.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to System Design

System design is the process of defining the architecture, components, modules, interfaces, and data flows of a system to satisfy specified requirements. It is one of the most important skills tested in software engineering interviews.

## 1. Core Concepts

| Concept | Definition | Example |
|---------|-----------|---------|
| **Scalability** | Ability to handle increased load | Netflix serving 200M+ users |
| **Availability** | Percentage of time the system is operational | "Five 9s" = 99.999% uptime = ~5 min downtime/year |
| **Reliability** | Probability the system performs correctly | Banking transactions must NEVER lose data |
| **Efficiency** | How well resources (CPU, RAM, bandwidth) are used | Latency < 200ms for API calls |
| **Maintainability** | Ease of updating, debugging, and extending | Clean microservice boundaries |

## 2. Vertical vs Horizontal Scaling

- **Vertical Scaling (Scale Up)**: Adding more power (CPU, RAM, Disk) to a single server.
    - **Pros**: Simple, no code changes needed.
    - **Cons**: Hardware limit exists; single point of failure.
    - **Example**: Moving from 8GB RAM to 64GB RAM on your database server.

- **Horizontal Scaling (Scale Out)**: Adding more machines to a pool.
    - **Pros**: Virtually unlimited scaling; no single point of failure.
    - **Cons**: Requires load balancing, distributed data management, and more complex code.
    - **Example**: Adding 10 more web servers behind a load balancer.

## 3. Latency vs Throughput

- **Latency**: The time taken for a single request to travel from client to server and back. Measured in milliseconds (ms).
- **Throughput**: The number of requests a system can handle per unit of time. Measured in RPS (Requests Per Second) or QPS (Queries Per Second).

> **Key Insight**: You can have high throughput but high latency (batch processing), or low latency but low throughput (single-threaded server). The goal is to optimize both.

## 4. Back-of-the-Envelope Estimation

System design interviews often require quick math:
- 1 day = 86,400 seconds ≈ ~100K seconds
- 1 million requests/day ≈ ~12 requests/second
- 1 GB = 1 billion bytes
- Reading 1 MB from RAM ≈ 0.25 ms
- Reading 1 MB from SSD ≈ 1 ms
- Sending 1 MB over 1 Gbps network ≈ 10 ms

## 5. The Design Process
1. **Clarify Requirements**: Functional vs Non-Functional.
2. **Capacity Estimation**: How much data? How many users?
3. **High-Level Design**: Draw the architecture diagram.
4. **Detailed Design**: Dive deep into specific components.
5. **Bottleneck Analysis**: Identify limits, suggest improvements.
`, resources: []
    },
    {
        title: "Load Balancing",
        slug: "load-balancing-design",
        description: "Software and Hardware balancers and algorithms.",
        order: 2, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Load Balancing

A Load Balancer (LB) distributes incoming network traffic across multiple servers to ensure no single server bears too much load. It is a critical component for high availability and scalability.

## 1. Load Balancing Algorithms

| Algorithm | How It Works | Best For |
|-----------|-------------|----------|
| **Round Robin** | Cycles through servers sequentially (1, 2, 3, 1, 2...) | Equal-capacity servers |
| **Weighted Round Robin** | Servers with more power get more requests | Mixed-capacity servers |
| **Least Connections** | Sends to the server with fewest active connections | Long-lived connections (WebSockets) |
| **Least Response Time** | Sends to the server that is responding fastest | Latency-sensitive apps |
| **IP Hash** | Hashes client IP to always route to same server | Sticky sessions (stateful apps) |
| **Random** | Picks a random server | Simple setups |

## 2. Types of Load Balancers

### Hardware Load Balancers
Dedicated physical devices (e.g., F5 BIG-IP, Citrix). Expensive but very performant. Used in large enterprises.

### Software Load Balancers
Applications running on commodity servers:
- **Nginx**: Lightweight, extremely popular for HTTP/reverse proxy.
- **HAProxy**: High-performance, used by GitHub, Stack Overflow.
- **AWS ALB/NLB**: Managed cloud load balancers (Application Layer vs Network Layer).

## 3. Layer 4 vs Layer 7 Load Balancing

| Feature | Layer 4 (Transport) | Layer 7 (Application) |
|---------|---------------------|----------------------|
| Works on | TCP/UDP packets | HTTP headers, URLs, cookies |
| Speed | Faster (no inspection) | Slower (inspects content) |
| Intelligence | Dumb routing | Smart routing (route /api to API servers, /images to CDN) |
| Use Case | Generic TCP apps | Web apps with path-based routing |

## 4. Health Checks
The LB periodically sends "pings" to each server:

- **Active**: LB sends heartbeat requests (e.g., GET /health) every 5 seconds.
- **Passive**: LB monitors real traffic for errors (5xx responses).

If a server fails health checks, the LB removes it from the pool and redistributes traffic. When it recovers, it is added back.

## 5. Placement in Architecture

\`\`\`
Client → LB → [Web Server 1, 2, 3]
                  ↓
              LB (Internal) → [App Server 1, 2]
                  ↓
              LB (DB) → [DB Primary, DB Replica]
\`\`\`

Multiple layers of LBs can be used at different tiers: between clients and web servers, between web servers and application servers, and between application servers and databases.

## 6. Redundant Load Balancers
A single LB is a **Single Point of Failure (SPOF)**. Solution: Use an **Active-Passive** pair. If the active LB fails, the passive one takes over using a floating IP (via Keepalived/VRRP).
`, resources: []
    },
    {
        title: "Caching Strategies",
        slug: "caching-strategies",
        description: "CDN, Redis, and Cache Eviction policies.",
        order: 3, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Caching Strategies

Caching stores copies of frequently accessed data in a faster storage layer to reduce latency and database load. It is the single most effective technique for improving system performance.

## 1. Cache at Every Layer

| Layer | Technology | What It Caches |
|-------|-----------|----------------|
| **Browser** | HTTP Cache (Cache-Control) | Static assets (JS, CSS, images) |
| **CDN** | Cloudflare, Akamai | Static + dynamic content at edge |
| **Application** | Redis, Memcached | Query results, session data, computed values |
| **Database** | Query Cache, Buffer Pool | Frequently executed queries |
| **CPU** | L1/L2/L3 Cache | Instructions and data |

## 2. Cache Write Strategies

### Write-Around Cache
- Writes go directly to the **database only**.
- Cache is populated only on a read miss.
- **Pro**: Cache isn't polluted with data that may never be read.
- **Con**: First read after a write is always slow (cache miss).

### Write-Through Cache
- Writes go to **both cache AND database** simultaneously.
- **Pro**: Cache always has the latest data. Strong consistency.
- **Con**: Higher write latency (two writes per operation).

### Write-Back (Write-Behind) Cache
- Writes go to the **cache only**. Cache asynchronously flushes to DB.
- **Pro**: Extremely fast writes.
- **Con**: **Risk of data loss** if the cache server crashes before flushing.

## 3. Cache Eviction Policies

When the cache is full, which item do we remove?

| Policy | Strategy | When to Use |
|--------|----------|-------------|
| **LRU** (Least Recently Used) | Remove the item not accessed for the longest time | General purpose (most common) |
| **LFU** (Least Frequently Used) | Remove the item accessed the fewest times | Data with varying popularity |
| **FIFO** (First In, First Out) | Remove the oldest item | Simple, predictable workloads |
| **TTL** (Time To Live) | Expire items after a fixed time | Data that becomes stale (e.g., stock prices) |

## 4. Cache Invalidation
The hardest problem in caching: **"When do I update or delete the cached copy?"**

- **TTL-based**: Set an expiry time (e.g., 5 minutes). Simple but potentially stale.
- **Event-based**: Publish a cache invalidation event when the source data changes. More complex but more consistent.
- **Versioning**: Append a version number to the cache key (e.g., \`user:123:v5\`). New version = new key.

## 5. Cache Stampede (Thundering Herd)
When a popular cache key expires and 1,000 requests simultaneously hit the database to regenerate it.

**Solutions**:
- **Locking**: Only one request regenerates the cache; others wait.
- **Stale-While-Revalidate**: Serve the old value while refreshing in the background.
- **Pre-warming**: Refresh popular keys before they expire.

## 6. Redis vs Memcached

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data Structures | Strings, Lists, Sets, Hashes, Sorted Sets | Strings only |
| Persistence | Yes (RDB/AOF) | No |
| Replication | Yes (Master-Replica) | No |
| Use Case | Complex caching, leaderboards, pub/sub | Simple key-value caching |
`, resources: []
    },
    {
        title: "Microservices vs Monolith",
        slug: "microservices-vs-monolith",
        description: "Choosing the right architecture for your team.",
        order: 4, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Microservices vs Monolithic Architecture

## 1. Monolithic Architecture
A single, unified application where all components (UI, business logic, data access) are built and deployed as one unit.

| Aspect | Detail |
|--------|--------|
| **Deployment** | One binary / one container |
| **Codebase** | Single repository |
| **Scaling** | Scale the entire app (even if only one module needs it) |
| **Tech Stack** | One language/framework for everything |
| **Best For** | Small teams, MVPs, simple apps |

**Pros**: Simple to develop, test, and deploy initially. Fast internal communication (function calls). Easy debugging with a single stack trace.

**Cons**: As the app grows, the codebase becomes a "Big Ball of Mud." One bug in the payment module can crash the entire application. Difficult to adopt new technologies.

## 2. Microservices Architecture
The application is broken into small, independently deployable services, each owning its own data and business logic.

| Aspect | Detail |
|--------|--------|
| **Deployment** | Each service deployed independently |
| **Codebase** | Many repositories (one per service) |
| **Scaling** | Scale only the services that need it |
| **Tech Stack** | Each service can use a different language |
| **Best For** | Large teams, complex domains, high scale |

**Pros**: Independent scaling, deployment, and development. Fault isolation (one service crashing doesn't take down others). Technology diversity.

**Cons**: Network latency between services. Distributed data management is complex. Debugging across services requires distributed tracing (Jaeger, Zipkin).

## 3. Communication Patterns

| Pattern | Type | Example | Use When |
|---------|------|---------|----------|
| **REST** | Synchronous | HTTP GET /users/123 | Simple CRUD operations |
| **gRPC** | Synchronous | Binary protocol, Protobuf | Low-latency, internal service-to-service |
| **Message Queue** | Asynchronous | RabbitMQ, SQS | Fire-and-forget tasks (e.g., send email) |
| **Event Streaming** | Asynchronous | Apache Kafka | Real-time event processing at scale |

## 4. The Strangler Fig Pattern
How to migrate from Monolith to Microservices gradually:
1. Build new features as microservices.
2. Route requests to the new service.
3. Slowly extract modules from the monolith until it's empty.

> **Rule of Thumb**: Start with a monolith. When the team grows beyond 2 pizza teams (~8-10 people) and the monolith slows you down, begin extracting microservices.
`, resources: []
    },
    {
        title: "Database Scaling: Sharding",
        slug: "database-sharding",
        description: "Partitioning data across 100 servers.",
        order: 5, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Database Scaling

When a single database can no longer handle the read/write load or data volume, we scale it.

## 1. Read Replicas (Scaling Reads)
- **Leader (Primary)**: Handles all write operations.
- **Followers (Replicas)**: Handle all read operations.
- **Replication Lag**: There's a small delay before replicas have the latest data. This is "Eventual Consistency."

\`\`\`
Client Writes → Primary DB ──replication──→ Replica 1 ← Client Reads
                                          → Replica 2 ← Client Reads
                                          → Replica 3 ← Client Reads
\`\`\`

## 2. Vertical Partitioning (Federation)
Splitting the database by **feature/table**. Each feature gets its own database.
- Users DB → stores only user data
- Products DB → stores only product data
- Orders DB → stores only order data

**Pro**: Smaller databases, simpler queries. **Con**: Cross-database joins are impossible.

## 3. Horizontal Partitioning (Sharding)
Splitting a **single table** across multiple database servers based on a **Shard Key**.

| Shard Strategy | How It Works | Example |
|---------------|-------------|---------|
| **Range-based** | Split by range of key values | User IDs 1-1M → Shard A, 1M-2M → Shard B |
| **Hash-based** | hash(key) % num_shards | Evenly distributes data |
| **Geographic** | Split by user location | US users → US Shard, EU users → EU Shard |
| **Directory-based** | Lookup table maps key → shard | Most flexible but lookup table is a SPOF |

## 4. Challenges of Sharding

| Challenge | Description |
|-----------|------------|
| **Cross-shard joins** | Cannot JOIN data across different shards easily |
| **Rebalancing** | Adding a new shard may require moving billions of rows |
| **Hot spots** | One shard gets much more traffic (celebrity user problem) |
| **Transactions** | ACID transactions across shards are extremely complex |
| **Operational complexity** | Managing 100 databases instead of 1 |

## 5. Denormalization
To avoid expensive joins in a sharded system, we intentionally **duplicate data** across tables.
- Store the user's name directly in the Orders table instead of joining to Users.
- **Trade-off**: More storage, potential inconsistency, but much faster reads.

> **Interview Tip**: Always discuss sharding as a last resort. Try read replicas, caching, and query optimization first.
`, resources: []
    },
    {
        title: "NoSQL vs SQL: CAP Theorem",
        slug: "cap-theorem-db",
        description: "Consistency, Availability, and Partition Tolerance.",
        order: 6, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# CAP Theorem & Database Selection

## 1. The CAP Theorem (Brewer's Theorem)
In any distributed data store, you can only guarantee **two out of three** properties:

| Property | Meaning |
|----------|---------|
| **Consistency (C)** | Every read receives the most recent write or an error |
| **Availability (A)** | Every request receives a non-error response (though it may be stale) |
| **Partition Tolerance (P)** | The system continues to operate despite network failures between nodes |

> **Key Insight**: Since network partitions are **inevitable** in distributed systems, you're really choosing between **CP** and **AP**.

## 2. CP vs AP Systems

| Type | Behavior During Partition | Examples | Use Case |
|------|--------------------------|----------|----------|
| **CP** | Refuses to respond until data is consistent | MongoDB, HBase, Redis (cluster mode) | Banking, inventory (correctness > availability) |
| **AP** | Returns potentially stale data but always responds | Cassandra, DynamoDB, CouchDB | Social media feeds, analytics (availability > correctness) |

## 3. ACID vs BASE

| ACID (SQL) | BASE (NoSQL) |
|------------|-------------|
| **A**tomicity: All-or-nothing transactions | **B**asically **A**vailable: System always responds |
| **C**onsistency: Data is always valid | **S**oft state: State may change over time without input |
| **I**solation: Concurrent transactions don't interfere | **E**ventual consistency: System will become consistent eventually |
| **D**urability: Committed data survives crashes | |

## 4. SQL vs NoSQL Decision Matrix

| Criteria | Choose SQL | Choose NoSQL |
|----------|-----------|-------------|
| Data structure | Well-defined, relational | Flexible, evolving schema |
| Queries | Complex joins, aggregations | Simple lookups by key |
| Scale | Vertical (single powerful server) | Horizontal (many commodity servers) |
| Consistency | Strong consistency required | Eventual consistency acceptable |
| Examples | PostgreSQL, MySQL | MongoDB, Cassandra, Redis, DynamoDB |

## 5. Eventual Consistency in Practice
When you post a tweet, your friend in another country might not see it for 2 seconds. That's eventual consistency — the data **will** be consistent, just not immediately.

**Tunable Consistency** (Cassandra): You can choose how many replicas must acknowledge a write before it's considered "done":
- \`ONE\`: Fastest, least consistent.
- \`QUORUM\`: Majority must agree. Good balance.
- \`ALL\`: Slowest, strongest consistency.
`, resources: []
    },
    {
        title: "Content Delivery Networks (CDN)",
        slug: "cdn-design",
        description: "Speeding up the web with edge servers.",
        order: 7, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Content Delivery Networks (CDN)

A CDN is a geographically distributed network of proxy servers that cache content closer to end users, reducing latency and origin server load.

## 1. How CDNs Work

\`\`\`
User (Tokyo) → Edge Server (Tokyo) → [Cache HIT] → Serve instantly!
User (Tokyo) → Edge Server (Tokyo) → [Cache MISS] → Fetch from Origin (New York) → Cache it → Serve
\`\`\`

Without a CDN, every user worldwide connects to your origin server (potentially thousands of miles away). With a CDN, the content is served from the nearest edge location.

## 2. Push vs Pull CDNs

| Type | How It Works | Best For |
|------|-------------|----------|
| **Push CDN** | You manually upload content to the CDN | Small sites with infrequent updates, known content |
| **Pull CDN** | CDN fetches from origin on first request, then caches | Large sites with lots of content, dynamic sites |

## 3. What CDNs Cache

- **Static Assets**: Images, CSS, JavaScript, fonts, videos.
- **Dynamic Content**: API responses with short TTLs, personalized content at the edge.
- **Entire Pages**: Full HTML pages for static sites (SSG).

## 4. Cache Invalidation on CDNs

| Method | How |
|--------|-----|
| **TTL Expiry** | Set Cache-Control headers (e.g., \`max-age=86400\` = 1 day) |
| **Purge API** | Manually invalidate specific URLs via CDN dashboard or API |
| **Cache Busting** | Append version to filename (e.g., \`app.v3.js\`) — new name = new cache |
| **Stale-While-Revalidate** | Serve stale content while fetching fresh copy in background |

## 5. Edge Computing
Modern CDNs (Cloudflare Workers, Vercel Edge Functions, AWS Lambda@Edge) can run **serverless functions at the edge**:
- A/B testing without hitting origin
- Auth token validation at the edge
- Geolocation-based redirects
- Personalized content rendering

## 6. Major CDN Providers

| Provider | Strengths |
|----------|----------|
| **Cloudflare** | Free tier, DDoS protection, Workers platform |
| **AWS CloudFront** | Deep AWS integration, Lambda@Edge |
| **Akamai** | Largest network, enterprise-focused |
| **Fastly** | Real-time purging, Compute@Edge |
| **Vercel/Netlify** | Frontend-focused, automatic for Next.js/Gatsby sites |

> **Impact**: Netflix serves 15% of global internet traffic almost entirely through CDNs. Without CDNs, the internet as we know it would be unusably slow.
`, resources: []
    },
    {
        title: "Message Queues & Async processing",
        slug: "message-queues-async",
        description: "Kafka, RabbitMQ, and decoupling services.",
        order: 8, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Message Queues & Asynchronous Processing

Message queues enable services to communicate by sending messages that are stored in a queue until the receiver processes them. This **decouples** producers from consumers.

## 1. Why Use Message Queues?

| Benefit | Explanation |
|---------|------------|
| **Decoupling** | Producer doesn't need to know if consumer is online |
| **Load Leveling** | Absorbs traffic spikes (Black Friday: 100K orders → queue → process at steady rate) |
| **Retry & Reliability** | Failed messages stay in queue for retry |
| **Ordering** | Messages can be processed in order (FIFO) |
| **Fan-out** | One message delivered to multiple consumers (pub/sub) |

## 2. Queue Patterns

### Point-to-Point
One producer → Queue → One consumer. Each message processed exactly once.
- **Example**: Order placed → Payment service processes it.

### Publish-Subscribe (Pub/Sub)
One producer → Topic → Multiple consumers. Each subscriber gets a copy.
- **Example**: User signs up → Email service, Analytics service, and Welcome service all react.

## 3. Technology Comparison

| Feature | RabbitMQ | Apache Kafka | AWS SQS |
|---------|----------|-------------|---------|
| Model | Traditional queue (push) | Distributed log (pull) | Managed queue (pull) |
| Throughput | ~50K msg/sec | ~1M+ msg/sec | Auto-scaled |
| Message Retention | Until consumed | Configurable (days/weeks) | Up to 14 days |
| Ordering | Per-queue FIFO | Per-partition ordering | FIFO available |
| Use Case | Task queues, RPC | Event streaming, analytics | Simple cloud workloads |
| Replay | No | Yes (re-read old messages) | No |

## 4. Dead Letter Queue (DLQ)
Messages that fail processing after N retries are moved to a special **Dead Letter Queue** for manual inspection. This prevents "poison messages" from blocking the queue.

## 5. Idempotency
Since messages may be delivered more than once (at-least-once delivery), consumers must be **idempotent** — processing the same message twice should produce the same result.
- **Example**: Charging a credit card should check "Was this order already charged?" before processing.

## 6. Real-World Architecture
\`\`\`
User places order → API → Kafka Topic: "orders"
                                ↓               ↓               ↓
                        Payment Service   Inventory Service   Email Service
\`\`\`

> **Key Design Question**: Choose between "at-most-once" (may lose messages), "at-least-once" (may duplicate), or "exactly-once" (complex but safest) delivery guarantees.
`, resources: []
    },
    {
        title: "DNS & Global Load Balancing",
        slug: "dns-global-lb",
        description: "How your traffic finds the right data center.",
        order: 9, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# DNS in System Design

DNS (Domain Name System) translates human-readable domain names to IP addresses. In system design, DNS is also a powerful tool for global traffic distribution.

## 1. DNS Resolution Flow

\`\`\`
Browser → Local Cache → OS Cache → Router Cache → ISP Resolver
    → Root DNS (.) → TLD DNS (.com) → Authoritative DNS (google.com)
    → Returns IP: 142.250.190.46
\`\`\`

## 2. DNS Record Types

| Record | Purpose | Example |
|--------|---------|---------|
| **A** | Domain → IPv4 address | \`google.com → 142.250.190.46\` |
| **AAAA** | Domain → IPv6 address | \`google.com → 2607:f8b0:...\` |
| **CNAME** | Domain → another domain (alias) | \`www.example.com → example.com\` |
| **MX** | Domain → mail server | \`example.com → mail.example.com\` |
| **NS** | Domain → nameserver | \`example.com → ns1.cloudflare.com\` |
| **TXT** | Arbitrary text (SPF, DKIM, verification) | \`example.com → "v=spf1 include:..."\` |

## 3. DNS-Based Load Balancing

### Round-Robin DNS
Return multiple IPs for a single domain. Clients use them in rotation.
- **Pro**: Simple, no extra infrastructure.
- **Con**: No health checks; may route traffic to a dead server.

### Geographic DNS (GeoDNS)
DNS server inspects the client's IP address and returns the IP of the **nearest data center**.
- User in India → \`api-mumbai.example.com\`
- User in USA → \`api-virginia.example.com\`

### Anycast
Multiple servers worldwide share the **same IP address**. BGP routing automatically directs packets to the nearest server based on network topology.
- Used by CDNs (Cloudflare) and DNS providers.

## 4. TTL (Time To Live)
How long DNS responses are cached:
- **High TTL (24h)**: Fewer DNS lookups but slow failover.
- **Low TTL (60s)**: Fast failover but more DNS queries (more load on DNS servers).

> **Migration Tip**: Before migrating to a new server, lower TTL to 60 seconds a day in advance. After migration, raise it back.

## 5. DNS Failover
If the primary data center goes down:
1. Health checker detects failure.
2. DNS provider removes the failed IP from responses.
3. New DNS queries get only healthy IPs.
4. Users on cached DNS entries still hit the dead server until TTL expires.
`, resources: []
    },
    {
        title: "Consistent Hashing",
        slug: "consistent-hashing",
        description: "The secret sauce behind distributed caches.",
        order: 10, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Consistent Hashing

Consistent hashing is a technique for distributing data across a cluster of servers in a way that minimizes the amount of data that needs to move when servers are added or removed.

## 1. The Problem with Simple Hashing
Traditional approach: \`server = hash(key) % N\` where N = number of servers.

**Problem**: If N changes (server added/removed), almost **every key** maps to a different server. This causes a **cache avalanche** — all cached data is effectively lost.

| Key | hash(key) % 3 | hash(key) % 4 |
|-----|--------------|--------------|
| "user:1" | Server 0 | Server 1 ← moved! |
| "user:2" | Server 1 | Server 2 ← moved! |
| "user:3" | Server 2 | Server 3 ← moved! |

## 2. The Hash Ring
Consistent hashing places both **servers** and **keys** on a virtual ring (0 to 2³² - 1).

1. Each server is hashed to a position on the ring.
2. Each key is hashed to a position on the ring.
3. A key belongs to the **first server found clockwise** from the key's position.

## 3. Adding/Removing a Server
- **Adding**: Only keys between the new server and its predecessor are remapped. All other keys stay put.
- **Removing**: Only keys owned by the removed server are remapped to the next server clockwise.
- **Impact**: Only ~1/N fraction of keys are affected (compared to ~100% with simple hashing).

## 4. Virtual Nodes (vNodes)
**Problem**: With few physical servers, the distribution is uneven — one server might own 60% of the ring.

**Solution**: Create multiple "virtual" copies of each server at different positions on the ring. If each server has 150 virtual nodes, the distribution becomes nearly uniform.

| Physical Server | Virtual Nodes |
|----------------|--------------|
| Server A | vA-1, vA-2, vA-3, ..., vA-150 |
| Server B | vB-1, vB-2, vB-3, ..., vB-150 |
| Server C | vC-1, vC-2, vC-3, ..., vC-150 |

## 5. Real-World Usage

| System | How It Uses Consistent Hashing |
|--------|-------------------------------|
| **Amazon DynamoDB** | Distributes data across storage nodes |
| **Apache Cassandra** | Assigns data to nodes based on partition key |
| **Memcached clients** | Distributes cached data across servers |
| **Akamai CDN** | Routes web content to edge servers |
| **Discord** | Routes users to appropriate server clusters |

> **Interview Tip**: Always mention virtual nodes when discussing consistent hashing — it shows you understand the practical challenge of even distribution.
`, resources: []
    },
    {
        title: "Proxies: Forward vs Reverse",
        slug: "proxies-design",
        description: "Anonymity vs Scalability.",
        order: 11, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Proxies in System Design

A proxy is an intermediary server between clients and application servers. They serve different purposes depending on their placement.

## 1. Forward Proxy (Client-Side)
Sits between the **client** and the internet. The client knows it's using a proxy.

\`\`\`
Client → Forward Proxy → Internet → Server
\`\`\`

**Use Cases**:
- **Anonymity**: Hides the client's IP address (VPNs are a type of forward proxy).
- **Content Filtering**: Companies block access to social media during work hours.
- **Caching**: Cache frequently accessed websites to save bandwidth.
- **Bypass Restrictions**: Access geo-blocked content.

## 2. Reverse Proxy (Server-Side)
Sits in front of **web servers**. Clients don't know there are multiple servers behind it.

\`\`\`
Client → Reverse Proxy (Nginx) → [Server 1, Server 2, Server 3]
\`\`\`

**Use Cases**:
- **Load Balancing**: Distribute requests across multiple servers.
- **SSL Termination**: Handle HTTPS encryption/decryption so backend servers don't need to.
- **Caching**: Cache static content (images, CSS) and serve without hitting backends.
- **Security**: Backend servers are never directly exposed to the public internet.
- **Compression**: Gzip responses before sending to clients.

## 3. Comparison

| Feature | Forward Proxy | Reverse Proxy |
|---------|--------------|---------------|
| Protects | The **client** | The **server** |
| Knows about | Client identity | Server identity |
| Used by | Employees, privacy users | Website operators |
| Examples | Squid, VPN services | Nginx, HAProxy, Cloudflare |

## 4. Popular Reverse Proxies

| Tool | Strengths |
|------|----------|
| **Nginx** | Lightweight, fast, most popular web server globally |
| **Apache HTTP** | Feature-rich, .htaccess support, long history |
| **HAProxy** | High-performance TCP/HTTP LB, used by GitHub |
| **Envoy** | Modern, built for microservices service mesh (Istio) |
| **Traefik** | Auto-discovery with Docker/K8s, dynamic config |

> **Key Takeaway**: Almost every production system uses a reverse proxy. Even if you only have one backend server, a reverse proxy adds SSL, caching, rate limiting, and security.
`, resources: []
    },
    {
        title: "API Gateways",
        slug: "api-gateway-design",
        description: "Rate limiting, Auth, and Request aggregation.",
        order: 12, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# API Gateways

An API Gateway is a server that acts as the single entry point for all client requests in a microservices architecture. It handles cross-cutting concerns so individual services don't have to.

## 1. Core Responsibilities

| Feature | What It Does |
|---------|-------------|
| **Authentication** | Validates JWT tokens / API keys before requests reach services |
| **Rate Limiting** | Prevents abuse (e.g., max 100 requests/minute per user) |
| **Request Routing** | Routes \`/users/*\` to User Service, \`/orders/*\` to Order Service |
| **Request Aggregation** | Combines responses from multiple services into one response |
| **Protocol Translation** | Accepts REST from clients, communicates via gRPC internally |
| **Logging & Monitoring** | Centralized access logs and metrics |
| **Caching** | Caches common responses at the gateway level |
| **Circuit Breaking** | Stops sending requests to a failing service to prevent cascading failure |

## 2. Without vs With API Gateway

**Without Gateway**: Client makes 5 separate API calls to 5 different services.
\`\`\`
Mobile App → User Service (auth) → Product Service (catalog) → Cart Service → Payment Service → Recommendation Service
\`\`\`

**With Gateway**: Client makes 1 call. Gateway handles the rest.
\`\`\`
Mobile App → API Gateway → [User, Product, Cart, Payment, Recommendation]
                       ↓
              Single JSON response
\`\`\`

## 3. Rate Limiting Algorithms

| Algorithm | How It Works |
|-----------|-------------|
| **Token Bucket** | Tokens added at a fixed rate. Each request consumes a token. Allows bursts. |
| **Leaky Bucket** | Requests processed at a fixed rate. Excess requests are queued or dropped. |
| **Fixed Window** | Count requests in fixed time windows (e.g., 100 req per minute window). |
| **Sliding Window Log** | Track timestamps of each request. More accurate but memory-intensive. |

## 4. Popular API Gateways

| Gateway | Type | Best For |
|---------|------|----------|
| **Kong** | Open-source | Plugin ecosystem, Lua-based customization |
| **AWS API Gateway** | Managed | Serverless (Lambda), AWS ecosystem |
| **Apigee** | Managed | Enterprise, analytics, Google Cloud |
| **Nginx Plus** | Commercial | High-performance, familiar config |
| **Traefik** | Open-source | Kubernetes, Docker auto-discovery |

## 5. BFF (Backend for Frontend) Pattern
Different clients (Web, Mobile, Smart TV) need different data formats. Instead of one gateway, create a **separate gateway per client type**:
- Web BFF → optimized for browsers (full HTML, large payloads)
- Mobile BFF → optimized for phones (smaller payloads, less data)

> **Caution**: The API Gateway can become a **bottleneck** and a **single point of failure**. Always deploy it with redundancy and monitor its performance carefully.
`, resources: []
    },
    {
        title: "Service Discovery",
        slug: "service-discovery",
        description: "How microservices find each other in the cloud.",
        order: 13, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Service Discovery

In a cloud/microservices environment, services are ephemeral — they start, stop, scale, and move constantly. Their IP addresses change with each deployment. Service Discovery solves the problem of "How does Service A find Service B?"

## 1. The Service Registry
A centralized "phonebook" that keeps track of all service instances and their network locations.

| Registry | Used By |
|----------|---------|
| **Consul** (HashiCorp) | Multi-datacenter, health checks, KV store |
| **Eureka** (Netflix) | Java/Spring ecosystem, AP system |
| **Zookeeper** (Apache) | CP system, used by Kafka for metadata |
| **etcd** | Kubernetes, strongly consistent KV store |

## 2. Registration Process
1. **Service starts** → registers itself: "I am OrderService at 10.0.0.5:8080"
2. **Heartbeats** → sends periodic "I'm alive" signals (every 30 seconds)
3. **Service stops** → deregisters itself (or registry detects missed heartbeats)

## 3. Discovery Patterns

### Client-Side Discovery
The client queries the registry directly and picks a server instance using its own load balancing logic.

\`\`\`
Client → [Query Registry] → Gets: [10.0.0.5, 10.0.0.6, 10.0.0.7]
       → Client picks 10.0.0.6 (Round Robin)
       → Direct call to 10.0.0.6
\`\`\`

**Pro**: No extra network hop. **Con**: Client needs discovery logic in every language.

### Server-Side Discovery
The client sends all requests to a load balancer/router, which queries the registry on behalf of the client.

\`\`\`
Client → Load Balancer → [Query Registry] → Route to 10.0.0.6
\`\`\`

**Pro**: Clients are simple. **Con**: Extra network hop and potential bottleneck.

## 4. DNS-Based Discovery
Kubernetes uses internal DNS for service discovery:
- \`order-service.default.svc.cluster.local\` → resolves to the current pod IPs
- No external registry needed; built into the platform.

## 5. Health Checks

| Type | How | When |
|------|-----|------|
| **Liveness** | "Are you alive?" (HTTP 200 from /healthz) | Every 10-30 seconds |
| **Readiness** | "Are you ready to accept traffic?" | After startup, during deployments |
| **Deep health** | Checks DB connections, downstream dependencies | Less frequent, more thorough |

> **Key Principle**: Service discovery removes hard-coded IP addresses. Without it, scaling microservices would require manual configuration changes every time a service moves.
`, resources: []
    },
    {
        title: "Distributed Transactions: Saga Pattern",
        slug: "saga-pattern",
        description: "Managing consistency across microservices.",
        order: 14, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Distributed Transactions

In a monolith, transactions are simple — \`BEGIN; UPDATE; COMMIT;\`. In microservices, the data is split across multiple services with separate databases. Maintaining consistency across them is one of the hardest problems in distributed systems.

## 1. Two-Phase Commit (2PC)

A coordination protocol where a central **Transaction Coordinator** ensures all participants either commit or abort.

**Phase 1 (Prepare)**: Coordinator asks all participants: "Can you commit?"
**Phase 2 (Commit/Abort)**: If ALL say yes → Coordinator says "Commit." If ANY says no → "Abort."

| Advantage | Disadvantage |
|-----------|-------------|
| Strong consistency | **Blocking**: All participants are locked until decision |
| Simple mental model | **Slow**: Two round-trips required |
| | **SPOF**: If coordinator crashes mid-protocol, participants are stuck |

## 2. The Saga Pattern (Modern Alternative)
A saga is a sequence of local transactions, each in its own service. If one step fails, previous steps are undone via **Compensating Transactions**.

### Example: E-Commerce Order
| Step | Service | Action | Compensating Action |
|------|---------|--------|-------------------|
| 1 | Order | Create order (PENDING) | Cancel order |
| 2 | Payment | Charge credit card | Refund credit card |
| 3 | Inventory | Reserve items | Release items |
| 4 | Shipping | Schedule delivery | Cancel shipment |

If Step 3 (Inventory) fails because items are out of stock:
- Compensate Step 2: Refund the credit card.
- Compensate Step 1: Cancel the order.

## 3. Saga Orchestration vs Choreography

| Pattern | How It Works | Pros | Cons |
|---------|-------------|------|------|
| **Orchestration** | Central "Saga Orchestrator" tells each service what to do next | Easy to understand, centralized logic | Orchestrator is a SPOF, coupling |
| **Choreography** | Each service listens for events and reacts independently | Decoupled, no SPOF | Hard to follow the flow, debugging is complex |

## 4. Idempotency is Critical
In distributed systems, messages may be delivered more than once. Every compensating transaction must be **idempotent** — running it twice should have the same effect as running it once.

**Example**: "Refund $50" should check if the refund was already issued before processing again.

## 5. Outbox Pattern
Ensures that database changes and message publishing happen atomically:
1. Service writes to its local database AND inserts a message into an "outbox" table in the same transaction.
2. A background process reads the outbox and publishes to the message queue.
3. This prevents the case where the DB commits but the message fails to send (or vice versa).

> **Key Takeaway**: Distributed transactions sacrifice simplicity for availability. Choose 2PC for strong consistency needs and Saga for high-availability microservices.
`, resources: []
    },
    {
        title: "Database Indexing & Partitioning",
        slug: "indexing-partitioning",
        description: "Optimizing the 'Bottom' of the system.",
        order: 15, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Database Indexing & Partitioning

Optimizing how data is stored and retrieved is fundamental to system performance. Even the best caching strategy won't help if the underlying database queries are inefficient.

## 1. How Indexes Work
An index is a separate data structure (usually a **B+ Tree**) that maps column values to row locations, enabling fast lookups without scanning the entire table.

**Without index**: Full table scan — O(N) for N rows.
**With index**: B+ Tree lookup — O(log N).

| Table: Users (10M rows) | Without Index | With Index |
|--------------------------|--------------|------------|
| \`SELECT * WHERE email = 'a@b.com'\` | Scans 10M rows (~5 sec) | B+ Tree lookup (~5 ms) |

## 2. Types of Indexes

| Index Type | Description | Use Case |
|-----------|-------------|----------|
| **Primary** | Automatically created on primary key | Unique row identification |
| **Secondary** | Created on non-PK columns | Queries that filter by non-PK columns |
| **Composite** | Index on multiple columns | Multi-column WHERE clauses |
| **Unique** | Enforces uniqueness constraint | Email, username fields |
| **Full-text** | Optimized for text search | Search functionality |
| **Partial** | Index only rows matching a condition | Active users only |

## 3. Clustered vs Non-Clustered

| Feature | Clustered | Non-Clustered |
|---------|-----------|---------------|
| Storage | Data rows are physically sorted on disk | Separate structure pointing to rows |
| Count | Only 1 per table | Multiple allowed |
| Speed | Fastest for range queries | Slightly slower (extra pointer lookup) |
| Example | Primary Key index | Index on \`created_at\` column |

## 4. The Cost of Indexes
Indexes speed up **reads** but slow down **writes** because every INSERT, UPDATE, or DELETE must also update the index.

> **Rule of Thumb**: Index columns that appear in WHERE, JOIN, and ORDER BY. Don't index columns that are rarely queried or have low cardinality (e.g., a boolean "is_active" column).

## 5. Database Partitioning

| Strategy | How | Example |
|----------|-----|---------|
| **Horizontal (Sharding)** | Split rows across servers | Users A-M → Server 1, N-Z → Server 2 |
| **Range** | Partition by value range | Sales_2023, Sales_2024, Sales_2025 |
| **List** | Partition by specific values | Region_US, Region_EU, Region_ASIA |
| **Hash** | hash(key) % N partitions | Even distribution |

## 6. Query Optimization Checklist
1. Use \`EXPLAIN ANALYZE\` to see the query plan.
2. Avoid \`SELECT *\` — fetch only needed columns.
3. Add indexes on frequently filtered columns.
4. Use pagination (\`LIMIT/OFFSET\` or cursor-based).
5. Avoid N+1 queries (use JOINs or batch loading).
6. Denormalize for read-heavy workloads.
`, resources: []
    },
    {
        title: "Gossip Protocols",
        slug: "gossip-protocols",
        description: "Nodes 'chatting' to detect failures in a cluster.",
        order: 16, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Gossip Protocols

Gossip protocols (also called epidemic protocols) are decentralized communication methods where nodes periodically share state information with random peers, similar to how rumors spread in a social network.

## 1. How Gossip Works

Every **T seconds** (gossip interval):
1. Node A picks **k random nodes** (fan-out, typically k=3).
2. Sends its membership list with heartbeat counters.
3. Receiving nodes merge the information with their own state.
4. After O(log N) rounds, all N nodes have the information.

## 2. Properties

| Property | Value |
|----------|-------|
| **Convergence** | O(log N) rounds for N nodes — exponentially fast |
| **Fault Tolerance** | No single point of failure; any node can go down |
| **Scalability** | Works with thousands of nodes |
| **Consistency** | Eventually consistent (not immediate) |
| **Bandwidth** | Each node sends O(k) messages per round |

## 3. Failure Detection
Gossip is commonly used to detect failed nodes without a centralized monitor:

1. Each node maintains a **heartbeat counter** that increments over time.
2. Nodes share these counters via gossip.
3. If Node B's heartbeat hasn't increased for T_fail seconds, it's marked as **suspected**.
4. After T_cleanup seconds of no recovery, it's marked as **dead** and removed.

## 4. Anti-Entropy Protocols
Used to repair inconsistencies between replicas:

| Technique | How |
|-----------|-----|
| **Push** | Node sends its data to a random peer |
| **Pull** | Node asks a random peer for its data |
| **Push-Pull** | Both exchange data (fastest convergence) |

## 5. Real-World Usage

| System | How It Uses Gossip |
|--------|-------------------|
| **Apache Cassandra** | Failure detection, schema changes, token metadata |
| **Amazon DynamoDB** | Membership and failure detection |
| **Redis Cluster** | Node failure detection |
| **Consul** | Membership, failure detection via SWIM protocol |
| **Bitcoin** | Transaction propagation across the P2P network |

## 6. SWIM Protocol (Enhanced Gossip)
An optimized failure detection protocol used by Consul:
1. **Ping**: Directly ping a random node.
2. If no response: **Ping-Req**: Ask k other nodes to ping the suspected node.
3. If still no response: Mark as **suspected** and disseminate via gossip.

> **Key Insight**: Gossip protocols trade consistency (slight delay in propagation) for extreme fault tolerance and simplicity. They are perfect for large-scale distributed systems where centralized coordination is impractical.
`, resources: []
    },
    {
        title: "Leader Election Algorithms",
        slug: "leader-election",
        description: "Bully Algorithm and Raft.",
        order: 17, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Leader Election

In distributed systems, many tasks require a single node to act as the decision-maker (leader) while others follow. Leader election algorithms determine how nodes agree on a leader, especially when the current leader fails.

## 1. Why Do We Need a Leader?
- **Write coordination**: In a replicated database, one node must accept writes to avoid conflicts.
- **Task distribution**: One node assigns work to others.
- **Resource management**: One node controls access to shared resources (distributed locks).

## 2. The Bully Algorithm

When a node detects the leader has failed:
1. It sends an **ELECTION** message to all nodes with higher IDs.
2. If any higher-ID node responds with **ALIVE**, it takes over the election.
3. If no higher-ID node responds, the initiator declares itself **COORDINATOR** (leader).

| Step | Action |
|------|--------|
| 1 | Node 3 detects leader dead, sends ELECTION to 4, 5 |
| 2 | Node 5 responds "I'm alive, I'll take over" |
| 3 | Node 5 sends ELECTION to higher IDs (none exist) |
| 4 | Node 5 becomes COORDINATOR, announces to all |

**Pros**: Simple. **Cons**: Highest-ID node always wins; lots of messages.

## 3. Raft Consensus Algorithm

A more modern and understandable consensus algorithm (alternative to Paxos).

### Node States
- **Leader**: Handles all client requests and replicates to followers.
- **Follower**: Passively receives replicated data from the leader.
- **Candidate**: A follower that hasn't heard from the leader and starts an election.

### Election Process
1. Follower's **election timeout** expires (no heartbeat from leader).
2. Follower becomes a **Candidate** and increments the **term** number.
3. Candidate votes for itself and sends **RequestVote** to all nodes.
4. If it receives votes from a **majority** (quorum), it becomes the **Leader**.
5. Leader sends periodic **heartbeats** to prevent new elections.

### Split Brain Prevention
- Each node votes for **at most one candidate per term**.
- A candidate must receive a **majority** of votes to win.
- This guarantees at most one leader per term.

## 4. Comparison

| Feature | Bully | Raft | Paxos |
|---------|-------|------|-------|
| Complexity | Simple | Moderate | Very Complex |
| Fault Tolerance | Limited | Strong | Strong |
| Consistency | Weak | Strong (linearizable) | Strong |
| Used By | Simple systems | etcd, CockroachDB | Google Spanner, Chubby |

## 5. Practical Considerations
- **Lease-based leadership**: Leader holds a time-bound lease. If it doesn't renew, others can take over. Prevents zombie leaders.
- **Fencing tokens**: Each leader gets an incrementing token. Old leaders with lower tokens are rejected.

> **Interview Tip**: Raft is the most commonly asked algorithm. Understand the three states (Leader, Follower, Candidate), the election timeout, and how split-brain is prevented through majority voting.
`, resources: []
    },
    {
        title: "Reliability: Replication & Failover",
        slug: "failover-strategies",
        description: "Active-Passive vs Active-Active.",
        order: 18, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# High Availability & Failover

High Availability (HA) means designing systems that continue operating even when individual components fail. It's measured as a percentage of uptime.

## 1. Availability Numbers

| Availability | Downtime/Year | Downtime/Month |
|-------------|---------------|----------------|
| 99% ("Two 9s") | 3.65 days | 7.31 hours |
| 99.9% ("Three 9s") | 8.76 hours | 43.8 minutes |
| 99.99% ("Four 9s") | 52.6 minutes | 4.38 minutes |
| 99.999% ("Five 9s") | 5.26 minutes | 26.3 seconds |

> AWS targets Four 9s (99.99%) for most services. Google targets Five 9s for core infrastructure.

## 2. Failover Strategies

### Active-Passive (Hot Standby)
- **Active** server handles all traffic.
- **Passive** server is idle but continuously replicating data from the active.
- If active fails, passive takes over (auto or manual failover).

\`\`\`
Traffic → Active Server (Primary)
              ↓ (replication)
          Passive Server (Standby)    ← becomes Active on failure
\`\`\`

**Pros**: Simple, strong consistency during normal operation.
**Cons**: Passive server is wasted resources (paying for idle hardware).

### Active-Active
- **Both** servers handle traffic simultaneously.
- Load is distributed between them.
- If one fails, the other absorbs 100% of the load.

**Pros**: Full utilization of both servers, better throughput.
**Cons**: Complex data synchronization, potential conflicts.

## 3. RPO & RTO

| Metric | Full Name | Question | Example |
|--------|-----------|----------|---------|
| **RPO** | Recovery Point Objective | How much data can we afford to lose? | "At most 5 minutes of transactions" |
| **RTO** | Recovery Time Objective | How quickly must we recover? | "Must be back online within 1 minute" |

The lower the RPO/RTO, the more expensive the infrastructure:
- RPO = 0 (no data loss) → Synchronous replication (expensive, adds latency)
- RPO = 1 hour → Hourly backups (cheap)

## 4. Replication Types

| Type | How | RPO | Latency Impact |
|------|-----|-----|---------------|
| **Synchronous** | Write confirmed only after replica confirms | 0 (zero data loss) | High (waits for replica) |
| **Asynchronous** | Write confirmed immediately, replica updated later | > 0 (some data loss) | Low (no waiting) |
| **Semi-Sync** | Write confirmed after at least 1 replica confirms | Near-zero | Moderate |

## 5. Multi-Region Architecture
For global applications:
- **Primary Region**: Handles writes and serves nearby users.
- **Secondary Region(s)**: Read replicas serve users in other geographies.
- **DNS Failover**: Automatically redirects global traffic to the healthy region.

## 6. Chaos Engineering
Testing reliability by **intentionally breaking things**:
- Netflix's **Chaos Monkey**: Randomly kills production servers.
- **Chaos Kong**: Simulates entire region failures.
- **Purpose**: Ensures failover mechanisms actually work before a real disaster.
`, resources: []
    },
    {
        title: "Monitoring, Alerting, & Logging",
        slug: "monitoring-alerting",
        description: "Prometheus, Grafana, and the ELK stack.",
        order: 19, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Observability: Monitoring, Alerting, & Logging

"You can't fix what you can't see." Observability is the ability to understand the internal state of a system by examining its external outputs.

## 1. The Three Pillars of Observability

| Pillar | What | Tools | Example |
|--------|------|-------|---------|
| **Metrics** | Numerical measurements over time | Prometheus, Datadog, CloudWatch | CPU usage at 85%, Error rate = 2.3% |
| **Logs** | Timestamped text records of events | ELK Stack, Fluentd, Loki | "2024-01-15 14:23 ERROR: Payment failed for user 123" |
| **Traces** | End-to-end path of a single request across services | Jaeger, Zipkin, AWS X-Ray | Request #ABC took 450ms: API→Auth(50ms)→DB(300ms)→Cache(100ms) |

## 2. Key Metrics to Monitor

### The Four Golden Signals (Google SRE)
1. **Latency**: Time to serve a request (p50, p95, p99).
2. **Traffic**: Requests per second (RPS).
3. **Errors**: Error rate as a percentage of total requests.
4. **Saturation**: How "full" your resources are (CPU, memory, disk, connections).

### RED Method (for microservices)
- **R**ate: Requests per second.
- **E**rrors: Failed requests per second.
- **D**uration: Distribution of request latency.

### USE Method (for infrastructure)
- **U**tilization: Percentage of time resource is busy.
- **S**aturation: Queue length / backlog.
- **E**rrors: Count of error events.

## 3. Alerting Best Practices

| Practice | Why |
|----------|-----|
| **Alert on symptoms, not causes** | Alert on "5xx error rate > 5%" not "CPU > 80%" |
| **Set meaningful thresholds** | Too sensitive = alert fatigue; too loose = missed issues |
| **Use severity levels** | P1 (pages on-call), P2 (Slack message), P3 (ticket) |
| **Include runbooks** | Each alert links to a doc explaining how to fix it |
| **Avoid duplicate alerts** | Group related alerts to reduce noise |

## 4. The Monitoring Stack

\`\`\`
Application → Prometheus (scrapes metrics) → Grafana (dashboards)
Application → Fluentd (collects logs) → Elasticsearch → Kibana (search logs)
Application → Jaeger SDK (traces) → Jaeger UI (visualize traces)
                ↓
           AlertManager → PagerDuty/Slack/Email
\`\`\`

## 5. SLIs, SLOs, and SLAs

| Term | Definition | Example |
|------|-----------|---------|
| **SLI** (Service Level Indicator) | A measurable metric | "99.5% of requests complete in < 300ms" |
| **SLO** (Service Level Objective) | Your internal target for the SLI | "We aim for 99.9% availability" |
| **SLA** (Service Level Agreement) | Contractual promise to customers | "If availability drops below 99.95%, customer gets a credit" |

> **SRE Principle**: If you're exceeding your SLO too much, you can actually speed up deployments (more risk), because you have "error budget" to spend.
`, resources: []
    },
    {
        title: "Security in Architecture",
        slug: "security-patterns",
        description: "Defense in depth, Zero Trust, and Encryption.",
        order: 20, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Architectural Security Patterns

Security must be built into every layer of system architecture, not bolted on as an afterthought.

## 1. Defense in Depth
Multiple layers of security controls so that if one fails, others catch the threat:

\`\`\`
Internet → WAF/DDoS Protection → Load Balancer → API Gateway (Auth + Rate Limit)
    → Application (Input Validation) → Database (Encryption at Rest, Row-Level Security)
\`\`\`

## 2. Zero Trust Architecture
**"Never trust, always verify."** Even traffic from inside the corporate network must be authenticated and authorized.

| Traditional (Perimeter) | Zero Trust |
|------------------------|------------|
| Trust everything inside the firewall | Trust nothing, verify everything |
| VPN = full access | Every request authenticated individually |
| Flat internal network | Micro-segmented network |

**Principles**:
- Verify explicitly (every request).
- Use least-privilege access.
- Assume breach (design for when, not if).

## 3. Authentication & Authorization

| Concept | What | Example |
|---------|------|---------|
| **Authentication (AuthN)** | "Who are you?" | Login with username + password |
| **Authorization (AuthZ)** | "What can you do?" | Admin can delete; User can only read |

### Common Protocols
- **OAuth 2.0**: Delegated authorization (e.g., "Login with Google").
- **JWT (JSON Web Token)**: Stateless tokens containing user claims, signed by the server.
- **SAML**: Enterprise SSO (Single Sign-On) for corporate environments.
- **mTLS**: Mutual TLS for service-to-service authentication in microservices.

## 4. Data Security

| State | Protection | Example |
|-------|-----------|---------|
| **At Rest** | AES-256 encryption on disk | Database encryption, S3 server-side encryption |
| **In Transit** | TLS 1.3 for all communication | HTTPS, gRPC with TLS |
| **In Use** | Enclaves, confidential computing | AWS Nitro Enclaves, SGX |

## 5. Secrets Management
Never store passwords, API keys, or tokens in source code.

| Tool | What It Does |
|------|-------------|
| **AWS Secrets Manager / SSM** | Managed, auto-rotating secrets |
| **HashiCorp Vault** | Dynamic secrets, encryption as a service |
| **Environment Variables** | Basic; better than hardcoding but limited |
| **.env files** | Local dev only; NEVER commit to Git |

## 6. Common Attack Protections

| Attack | Defense |
|--------|---------|
| **DDoS** | WAF (Cloudflare), Rate limiting, Auto-scaling |
| **SQL Injection** | Parameterized queries, ORM |
| **XSS** | Input sanitization, CSP headers |
| **CSRF** | CSRF tokens, SameSite cookies |
| **MITM** | HTTPS everywhere, certificate pinning |
| **Privilege Escalation** | Principle of least privilege, RBAC |

> **The Golden Rule**: Security is not a feature — it's a property of the entire system. Every design decision should include a security consideration.
`, resources: []
    }
];
