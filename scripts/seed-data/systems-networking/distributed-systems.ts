// Distributed Systems Seed Data
export const distributedSystemsTopics = [
    {
        title: "Introduction to Distributed Systems",
        slug: "distributed-systems-intro",
        description: "Definition, goals, and the challenges of hidden failure.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to Distributed Systems

A distributed system is a collection of independent computers that appears to its users as a single coherent system.

## 1. Why Distribute?
- **Scaling**: Adding more nodes when one is not enough.
- **Reliability**: If one node fails, the system stays up.
- **Performance**: Placing nodes closer to users (Edge).

## 2. Transparency Goals
The system should hide the complexity:
- **Location Transparency**: Users don't know where a resource is.
- **Failure Transparency**: Users don't know a node crashed.
- **Replication Transparency**: Users don't know there are 10 copies of data.

## 3. The 8 Fallacies of Distributed Computing
Common assumptions that are actually WRONG:
1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is only one administrator.
7. Transport cost is zero.
8. The network is homogeneous.
`, resources: []
    },
    {
        title: "Distributed System Models",
        slug: "ds-models",
        description: "Client-Server, P2P, and Architectural patterns.",
        order: 2, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Distributed System Models

## 1. Physical Models
- **Baseline**: Computers connected by a network.
- **Mobile**: Frequent disconnections and location changes.
- **Cloud**: Massive clusters in data centers.

## 2. Architectural Models
- **Client-Server**: Central resource, many consumers. (Web).
- **Peer-to-Peer (P2P)**: Every node is both client and server. (BitTorrent).
- **Multi-tier**: Browser $\to$ App Server $\to$ Database $\to$ Cache.

## 3. Interaction Models
- **Synchronous**: Bounds on message delay and execution speed.
- **Asynchronous**: No bounds on how long a message takes. (Much harder to program!).

## 4. Failure Models
- **Omission**: A message just never arrives.
- **Crash**: A node stops working forever.
- **Byzantine**: A node is malicious or buggy and lies to other nodes.
`, resources: []
    },
    {
        title: "Interprocess Communication (RPC)",
        slug: "ds-rpc",
        description: "Remote Procedure Calls and the Marshalling process.",
        order: 3, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Remote Procedure Calls (RPC)

Making a call to a function on a remote computer look like a local function call.

## 1. How it works
1. **Client Stub**: Packs arguments into a message (**Marshalling**).
2. **Network**: Sends message to server.
3. **Server Stub**: Unpacks arguments (**Unmarshalling**) and calls the real function.
4. **Server Stub**: Packs the result.
5. **Client Stub**: Unpacks result and returns to local code.

## 2. IDL (Interface Definition Language)
A neutral way to describe functions so a C++ client can talk to a Java server.

## 3. Semantics of RPC
- **Maybe**: Call might happen zero or one times.
- **At-least-once**: Keep trying until success. (Risk of duplicate work).
- **At-most-once**: Try once. If it fails, report error. (Standard).

## 4. gRPC (Modern RPC)
Used by Google. Uses **Protocol Buffers** (binary) instead of JSON for massive speed and efficiency.
`, resources: []
    },
    {
        title: "Time & Global States",
        slug: "ds-time-states",
        description: "Physical vs Logical Clocks and Lamport timestamps.",
        order: 4, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Time & Global States

In Distributed Systems, there is no "Global Clock". $2:00\text{ PM}$ on Server A might be $2:01\text{ PM}$ on Server B.

## 1. Clock Skew & Drift
Hardware clocks naturally diverge over time. **NTP (Network Time Protocol)** tries to sync them but can't achieve microsecond precision over the internet.

## 2. Logical Clocks (Lamport)
Instead of "Real Time", we track the **Order of Events**.
- **Happens-Before Relationship** ($a \to b$): If $a$ happened before $b$, $a$ must have a smaller timestamp.
- **Rule**: Every event increments the clock. When sending a message, include the clock. When receiving, set your clock to $\max(\text{local, received}) + 1$.

## 3. Vector Clocks
Lamport clocks can't detect if two events are "Concurrent". Vector clocks use an array to track the state of ALL nodes, allowing us to detect conflicts.

## 4. Global Snapshots
The **Chandy-Lamport Algorithm** captures the state of the whole system without stopping execution by passing markers.
`, resources: []
    },
    {
        title: "Mutual Exclusion & Election",
        slug: "ds-coordination",
        description: "Distributed locks and the Bully algorithm.",
        order: 5, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Coordination & Agreement

## 1. Distributed Mutual Exclusion
Ensuring only one process accesses a global resource.
- **Centralized**: One "Lock Server". (Single point of failure).
- **Ring-Based**: Pass a token in a circle.
- **Ricart-Agrawala**: Multicast a request to everyone; only enter if everyone ACKs.

## 2. Election Algorithms
Choosing a "Leader" or "Master" node.
- **Bully Algorithm**: The node with the highest ID "bullies" others into accepting it as leader.
- **Ring Algorithm**: Pass a list of IDs in a circle; the highest ID wins.

## 3. Why Leaders matter?
Many systems (like GFS or MongoDB) use a leader to coordinate writes and ensure consistency.
`, resources: []
    },
    {
        title: "Consistency Models",
        slug: "ds-consistency",
        description: "Strong, Eventual, and Causal consistency.",
        order: 6, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Consistency Models

How quickly do updates spread across nodes?

## 1. Strong Consistency (Linearizability)
As soon as a write finishes, EVERY subsequent read sees that value.
- Pros: Easy for programmers.
- Cons: Very slow (Latent).

## 2. Eventual Consistency
The system guarantees that if no new updates happen, all nodes will "eventually" have the same data.
- Pros: Massive performance.
- Cons: User might see old data for a few seconds. (Used in Facebook/Twitter).

## 3. Causal Consistency
If process A writes $X$ and then informs process B, who writes $Y$, then $X$ and $Y$ must be seen in that order. Unrelated writes can appear in any order.

## 4. Client-Centric Models
- **Read Your Writes**: I always see my own updates immediately.
- **Monotonic Reads**: I never see data "Go back in time".
`, resources: []
    },
    {
        title: "The CAP Theorem",
        slug: "ds-cap-theorem",
        description: "Consistency, Availability, and Partition Tolerance.",
        order: 7, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Any distributed data store can only provide TWO of these THREE guarantees:

1. **C (Consistency)**: Every read receives the most recent write or an error.
2. **A (Availability)**: Every request receives a (non-error) response.
3. **P (Partition Tolerance)**: The system continues to work despite a network failure (Partition) between nodes.

## 1. The Real Choice: CP vs AP
Since network failures (P) are inevitable in real life, you must choose between C and A during a split.
- **CP**: Drop the request rather than serve inconsistent data. (SQL, Banking).
- **AP**: Serve the request even if the data might be old. (NoSQL, Social Media).

## 2. PACELC Theorem
An extension of CAP:
- If there is a Partition (P), choose between Availability (A) and Consistency (C).
- Else (E), choose between Latency (L) and Consistency (C).
`, resources: []
    },
    {
        title: "Fault Tolerance & Replication",
        slug: "ds-fault-tolerance",
        description: "Availability, Redundancy, and Heartbeats.",
        order: 8, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Fault Tolerance

Making a system that doesn't stop just because one piece is broken.

## 1. Metrics
- **Reliability**: How long it runs without failing ($MTBF$).
- **Availability**: Percentage of time it's up ($99.99\%$ = "Four Nines").

## 2. Redundancy
- **Information**: Error-correcting codes.
- **Process**: Multiple nodes doing the same task (Primary-Backup).
- **Time**: Retrying if a call fails.

## 3. Failure Detection (Heartbeats)
Nodes send periodic "I'm alive" pings. If a node stops pinging, the cluster assumes it's dead and starts a recovery process.

## 4. Reliable Multicast
Ensuring that if a message is sent to a group, either EVERYONE gets it or NO ONE does.
`, resources: []
    },
    {
        title: "Replication Strategies",
        slug: "ds-replication",
        description: "Master-Slave, Multi-Master, and Quorum systems.",
        order: 9, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Replication Strategies

## 1. Single-Master (Active-Passive)
One node handles all writes and syncs to slaves.
- Easy to manage.
- Slaves can handle read traffic.
- If Master dies, one slave is promoted.

## 2. Multi-Master (Active-Active)
Any node can handle writes.
- High availability.
- Complex conflict resolution (What if two people update the same row on different nodes?).

## 3. Quorum-Based (W+R > N)
A mathematical way to ensure consistency.
- **N**: Total nodes.
- **W**: Nodes that must ACK a write.
- **R**: Nodes that must ACK a read.
- If $W+R > N$, you are guaranteed to read a fresh value.
`, resources: []
    },
    {
        title: "Consensus: Paxos & Raft",
        slug: "ds-consensus",
        description: "How a cluster agrees on a single value.",
        order: 10, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Consensus Algorithms

The absolute foundation of modern distributed databases (Spanner, CockroachDB).

## 1. The Goal
Get a cluster of $N$ nodes to agree on a single value, even if $N/2 - 1$ nodes fail.

## 2. Paxos
The original, mathematically proven algorithm. Extremely complex for humans to understand.

## 3. Raft (Understandable Consensus)
Designed to be easier to implement.
- **Leader Election**: Follower $\to$ Candidate $\to$ Leader.
- **Log Replication**: Leader receives commands, sends to followers, waits for majority, then commits.
- **Safety**: Ensuring that a new leader has all the previously committed entries.

## 4. Use Cases
- Managing configuration (Etcd, ZooKeeper).
- Distributed locks.
- Assigning IDs.
`, resources: []
    },
    {
        title: "Distributed Transactions: 2PC",
        slug: "ds-2pc",
        description: "Atomic commit across multiple databases.",
        order: 11, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Distributed Transactions

Performing an action (like a bank transfer) that involves two different databases.

## 1. Two-Phase Commit (2PC)
1. **Prepare Phase**: Coordinator asks all nodes: "Can you do this?". Nodes lock resources and reply "Yes" or "No".
2. **Commit Phase**: If everyone said "Yes", Coordinator sends "Commit". Otherwise, sends "Rollback".

## 2. Problems with 2PC
- **Blocking**: If the Coordinator fails, nodes remain locked and can't do anything else.
- **Performance**: High latency due to multiple round trips.

## 3. Saga Pattern
A modern alternative: Breaking a long transaction into a series of small, independent transactions. If one fails, you run "Compensating Transactions" to undo previous steps.
`, resources: []
    },
    {
        title: "P2P Systems: DHT & Chord",
        slug: "ds-p2p-dht",
        description: "Decentralized lookups and Consistent Hashing.",
        order: 12, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Peer-to-Peer (P2P) & DHTs

How do you find a file among 1,000,000 users without a central server?

## 1. DHT (Distributed Hash Table)
A decentralized storage system that provides a lookup service like a hash table: $(Key, Value)$.

## 2. Chord Algorithm
- Nodes and keys are arranged in a large logical **Circle**.
- Every node knows its successor.
- **Finger Tables**: To speed up search, nodes maintain a list of others $2^i$ steps away.
- Search time: $O(\log n)$.

## 3. Consistent Hashing
Allows adding/removing nodes from the cluster with minimal data movement. (Used in Amazon Dynamo and CDNs).

## 4. BitTorrent
A P2P protocol for sharing files by breaking them into "Pieces" and allowing users to download pieces from each other.
`, resources: []
    },
    {
        title: "MapReduce & Big Data Processing",
        slug: "ds-mapreduce",
        description: "Processing petabytes of data across 1000s of CPUs.",
        order: 13, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# MapReduce

A programming model for processing huge datasets in parallel on a cluster.

## 1. The Two Steps
1. **Map**: Break the data into chunks and produce $(Key, Value)$ pairs.
2. **Shuffle/Sort**: Group all values of the same key together.
3. **Reduce**: Summarize the values for each key.

## 2. Fault Tolerance
If a worker node crashes during a "Map", the master simply assigns that chunk of data to another worker and restarts the task.

## 3. Data Locality
"Move the code to the data." MapReduce runs tasks on the same servers where the data blocks are stored to avoid network traffic.

## 4. Legacy
While Spark and Flink have replaced pure MapReduce, the **Concept** remains the foundation of all modern big data systems.
`, resources: []
    },
    {
        title: "Distributed File Systems (NFS/HDFS)",
        slug: "distributed-file-systems",
        description: "How HDFS stores data across a data center.",
        order: 14, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Distributed File Systems

## 1. NFS (Network File System)
Mounting a remote folder so it looks like a local drive.
- Uses RPC.
- Good for LANs, bad for large-scale data.

## 2. HDFS (Hadoop Distributed File System)
Designed for the Cloud.
- **NameNode**: Stores the metadata (Who has which block).
- **DataNodes**: Store the actual 128MB blocks.
- **Replication**: Every block is stored on 3 different servers for safety.

## 3. High Availability
Modern HDFS uses a "Standby" NameNode to prevent the system from going down if the master fails.
`, resources: []
    },
    {
        title: "Message Queues & Event Streaming",
        slug: "ds-message-queues",
        description: "Decoupling systems with Kafka and RabbitMQ.",
        order: 15, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Message Queues & Event Streaming

Instead of Server A calling Server B directly, it puts a message in a **Queue**.

## 1. Why?
- **Decoupling**: A doesn't need to know B exists.
- **Buffering**: If A is fast and B is slow, the queue holds the extra data.
- **Scale**: You can add 10 workers for B to drain the queue faster.

## 2. Pub/Sub (Publish-Subscribe)
- **Publisher**: Sends message to a "Topic".
- **Subscriber**: Receives messages from topics they care about.

## 3. Apache Kafka
A high-throughput "Log" where data is stored in order and can be read by many consumers at their own pace.
`, resources: []
    },
    {
        title: "Microservices Architecture",
        slug: "ds-microservices",
        description: "API Gateways, Service Discovery, and Circuit Breakers.",
        order: 16, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Microservices

Splitting one giant "Monolith" app into 20 small, independent services (Auth, Payment, Search).

## 1. Service Discovery
How does the "Order" service find the "Payment" service if its IP changes?
**Solution**: A Service Registry (like Consul or Eureka) where services register themselves.

## 2. API Gateway
A single entry point for the user that routes requests to the correct microservice.

## 3. Circuit Breakers
If the "Email" service is slow, the "User Registation" service shouldn't wait and crash. The Circuit Breaker "Trips" and returns a default error, protecting the rest of the system.

## 4. Observability
Tracing a single user request as it travels through 10 different services using tools like **Jaeger** or **Zipkin**.
`, resources: []
    },
    {
        title: "Distributed Caching (Redis)",
        slug: "ds-caching",
        description: "Speeding up reads and managing TTLs.",
        order: 17, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Distributed Caching

RAM is 1000x faster than Disk. Caching stores frequent data in RAM.

## 1. In-Process vs Distributed
- **In-Process**: Faster, but local to one server.
- **Distributed (Redis)**: Shared by all app servers.

## 2. Strategies
- **Cache Aside**: App checks cache $\to$ if miss, get from DB $\to$ write to cache.
- **Write Through**: App writes to cache, cache writes to DB.

## 3. Eviction Policies
When cache is full, who dies?
- **LRU**: Least Recently Used.
- **LFU**: Least Frequently Used.

## 4. TTL (Time to Live)
Setting an expiration date on data so the cache doesn't stay "Stale" forever.
`, resources: []
    },
    {
        title: "Clock Synchronization (NTP)",
        slug: "ds-clock-sync",
        description: "Precision Time Protocol and Christian's Algorithm.",
        order: 18, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Physical Clock Sync

## 1. Christian's Algorithm
One server has a UTC source. Clients ask for time and adjust for the network delay $(RTT / 2)$.

## 2. Berkeley Algorithm
A group of nodes find the average time and tell everyone to "Slow down" or "Speed up" their clocks. No external time source required.

## 3. NTP (Network Time Protocol)
Highly scaleable hierarchy (Strata).
- **Stratum 0**: Atomic clocks.
- **Stratum 1**: Routers connected to Stratum 0.
- **Stratum 2**: Servers syncing from Stratum 1.

## 4. Precision Time Protocol (PTP)
Used in local networks where sub-microsecond accuracy is needed (e.g., Financial trading or Power grids). (IEEE 1588).
`, resources: []
    },
    {
        title: "Edge & Fog Computing",
        slug: "edge-fog-ds",
        description: "Moving logic close to the sensors and users.",
        order: 19, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Edge & Fog Computing

The Cloud is too far away for some things (Self-driving cars can't wait 100ms for a cloud decision).

## 1. Edge Computing
Processing data ON the device itself or the router it's connected to.

## 2. Fog Computing
A layer between Edge and Cloud. Local data centers located at the ISP or cell tower.

## 3. Advantages
- **Bandwidth**: Don't send 4K raw video to the cloud; process it locally.
- **Privacy**: Personal data stays on the device.
- **Latency**.

## 4. Use Cases
- Smart Cities.
- Industrial IoT.
- Multiplayer gaming.
`, resources: []
    },
    {
        title: "Blockchains as Distributed Systems",
        slug: "blockchain-ds",
        description: "Proof of Work vs Stake and Nakamoto Consensus.",
        order: 20, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Blockchain: The Decentralized DS

## 1. The Distributed Ledger
A database where everyone has a copy, and entries are permanent (Immutable).

## 2. Nakamoto Consensus
How Bitcoin solves the Byzantine Generals problem:
- **Proof of Work**: One node wins the right to add a block by burning electricity to solve a math puzzle. 
- **Longest Chain Rule**: If there's a split, everyone follows the chain with the most cumulative "Work".

## 3. Smart Contracts
Code that lives on the blockchain and executes automatically (Ethereum).

## 4. Public vs Private
- **Public**: Anyone can join (Bitcoin).
- **Private/Consortium**: Permissioned nodes only (Hyperledger). Good for supply chains.
`, resources: []
    }
];
