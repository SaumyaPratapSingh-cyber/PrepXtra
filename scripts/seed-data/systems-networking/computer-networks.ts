// Computer Networks Seed Data
export const computerNetworksTopics = [
    {
        title: "Introduction to Networking",
        slug: "networking-introduction",
        description: "Network types (LAN, WAN), topologies, and the internet structure.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to Networking

A computer network is a set of computers sharing resources located on or provided by network nodes.

## 1. Network Categories by Scale
- **PAN (Personal Area Network)**: Bluetooth devices, smartwatches.
- **LAN (Local Area Network)**: Home, office, or building.
- **MAN (Metropolitan Area Network)**: City-wide networks (e.g., Cable TV).
- **WAN (Wide Area Network)**: Spans countries or the globe (The Internet).

## 2. Network Topologies (Layout)
- **Bus**: All nodes connected to a single cable. (Simple but risky).
- **Star**: All nodes connect to a central Hub/Switch. (Most common today).
- **Ring**: Nodes connect in a loop.
- **Mesh**: Every node connects to every other node. (Highest redundancy).
- **Hybrid**: A combination of the above.

## 3. Transmission Modes
- **Simplex**: One way only (Radio).
- **Half-Duplex**: Both ways, but not at the same time (Walkie-talkie).
- **Full-Duplex**: Both ways simultaneously (Telephone).

## 4. Key Performance Metrics
- **Bandwidth**: Max data rate of a channel (bps).
- **Throughput**: Actual data rate achieved.
- **Latency (Delay)**: Time for a message to travel from A to B.
- **Jitter**: Variation in delay (critical for video/voice).
`, resources: []
    },
    {
        title: "The OSI Model",
        slug: "osi-model",
        description: "The 7-layer theoretical framework for networking.",
        order: 2, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# The OSI Model

The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions of a telecommunication or computing system into 7 layers.

## 1. The Seven Layers (Top to Bottom)
1. **Application**: Network services for applications (HTTP, FTP).
2. **Presentation**: Data encryption, compression, and translation (SSL/TLS).
3. **Session**: Manages sessions between applications.
4. **Transport**: End-to-end communication, error recovery, flow control (TCP, UDP).
5. **Network**: Path determination and logical addressing (IP, ICMP).
6. **Data Link**: MAC addressing and physical error detection (Ethernet, Wi-Fi).
7. **Physical**: Transmits raw bits over a physical medium (Cables, Radio).

## 2. Data Encapsulation
As data moves down the stack, each layer adds its own header (and sometimes a trailer).
- **L7-5**: Data
- **L4**: Segment (TCP) or Datagram (UDP)
- **L3**: Packet
- **L2**: Frame
- **L1**: Bits

## 3. Why Use a Layered Model?
- **Interoperability**: Different vendors can build hardware for different layers that work together.
- **Simplification**: Breaks complex communication into smaller, manageable parts.
- **Ease of Troubleshooting**: You can isolate if a problem is "Physical" (L1) or "Network" (L3).
`, resources: []
    },
    {
        title: "TCP/IP Protocol Suite",
        slug: "tcp-ip-model",
        description: "The real-world 4-layer model that powers the internet.",
        order: 3, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# TCP/IP Model

While OSI is a theoretical model, TCP/IP is the practical implementation used for the Internet.

## 1. The Four Layers
- **Application**: Combines OSI layers 5, 6, and 7. (HTTP, DNS, SSH).
- **Transport**: Same as OSI layer 4. (TCP, UDP).
- **Internet**: Same as OSI layer 3. (IP, ARP).
- **Network Access**: Combines OSI layers 1 and 2. (Ethernet, Wi-Fi).

## 2. Comparison with OSI

| OSI Layer | TCP/IP Layer |
|-----------|--------------|
| Application | Application |
| Presentation | Application |
| Session | Application |
| Transport | Transport |
| Network | Internet |
| Data Link | Network Access |
| Physical | Network Access |

## 3. The TCP/IP Philosophy
- **End-to-End Principle**: Reliability should be handled at the edges (Transport layer) rather than at the core (Network layer).
- **Robustness**: The network should be able to continue functioning even if many nodes are destroyed.

## 4. Key Protocols in the Suite
- **IP**: Addressing and routing.
- **TCP**: Reliable delivery.
- **UDP**: Fast, connectionless delivery.
- **ARP**: Mapping IP to MAC addresses.
`, resources: []
    },
    {
        title: "Physical Layer & Media",
        slug: "physical-layer",
        description: "Optical fiber, copper, wireless, and bit encoding.",
        order: 4, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Physical Layer

The lowest layer responsible for transmitting raw bit streams over a physical medium.

## 1. Transmission Media
- **Guided (Wired)**:
    - **Twisted Pair (CAT6)**: Most common for LANs.
    - **Coaxial**: Used for cable TV and older networks.
    - **Fiber Optic**: Uses light. Immune to interference, supports massive distances and speeds.
- **Unguided (Wireless)**:
    - Radio waves (Wi-Fi, Bluetooth).
    - Microwaves (Satellite, Point-to-point).
    - Infrared (Remote controls).

## 2. Signal Types
- **Analog**: Continuous wave (used in traditional telephony).
- **Digital**: Discrete pulses (0s and 1s).

## 3. Modulation & Encoding
- **Modulation**: Changing a carrier wave to carry info (AM, FM, QAM).
- **Encoding**: Converting bits to voltage levels (Manchester, NRZ).

## 4. Hardware at L1
- **Hubs**: "Dumb" devices that broadcast data to all ports.
- **Repeaters**: Amplify signals to extend distance.
`, resources: []
    },
    {
        title: "Data Link Layer & Framing",
        slug: "data-link-layer",
        description: "MAC addresses, error detection, and frame structure.",
        order: 5, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Data Link Layer

Responsible for node-to-node delivery within the same network.

## 1. The Two Sub-layers
1. **LLC (Logical Link Control)**: Interfaces with the Network layer.
2. **MAC (Media Access Control)**: Manages physical hardware access.

## 2. MAC Addresses
A 48-bit unique hardware identifier burned into every Network Interface Card (NIC).
Example: \`00:1A:2B:3C:4D:5E\`.

## 3. Framing
Dividing the stream of bits from L1 into manageable units called **Frames**. A frame includes:
- **Preamble**: Syncing the clocks.
- **Addresses**: Source and Destination MAC.
- **Payload**: The L3 Packet.
- **FCS (Frame Check Sequence)**: For error detection.

## 4. Error Detection: CRC
The sender calculates a checksum (Cyclic Redundancy Check) and adds it to the frame. The receiver recalculates it. If it doesn't match, the frame is thrown away.

## 5. Hardware at L2
- **Switch**: An "intelligent" device that learns MAC addresses and sends data only to the correct port.
- **Bridge**: Used to connect two network segments.
`, resources: []
    },
    {
        title: "Medium Access Control (MAC)",
        slug: "mac-protocols",
        description: "CSMA/CD, ALOHA, and how shared channels avoid collisions.",
        order: 6, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Medium Access Control (MAC)

How do multiple computers talk on the same wire without talking over each other?

## 1. Random Access Protocols
- **ALOHA**: Just send. If it fails, wait and try again. (Used in satellite).
- **CSMA (Carrier Sense Multiple Access)**: "Listen before you talk".
- **CSMA/CD (Collision Detection)**: Used in Ethernet. If you detect a collision, send a "Jam signal" and wait a random time (Binary Exponential Backoff).
- **CSMA/CA (Collision Avoidance)**: Used in Wi-Fi. You can't hear and talk at the same time on wireless, so you try to avoid collisions by using "Request to Send" (RTS) and "Clear to Send" (CTS).

## 2. Controlled Access Protocols
- **Token Passing**: Only the node with the "Token" can talk. (No collisions, but slow).
- **Polling**: A "Master" node asks each node if it has something to say.

## 3. Channelization (Splitting the pipe)
- **FDMA**: Split by frequency.
- **TDMA**: Split by time.
- **CDMA**: Split by mathematical code (Used in 3G mobile).
`, resources: []
    },
    {
        title: "Ethernet & Switching",
        slug: "ethernet-switching",
        description: "Collision domains, broadcast domains, and VLANs.",
        order: 7, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Ethernet & Switching

## 1. Collision Domain
A network segment where data packets can collide with one another.
- **Hubs**: All ports are in 1 collision domain.
- **Switches**: Every port is its own collision domain (Eliminates collisions).

## 2. Broadcast Domain
A network segment where every node can hear a broadcast (\`FF:FF:FF:FF:FF:FF\`).
- Switches do NOT break broadcast domains (unless using VLANs).
- Routers DO break broadcast domains.

## 3. VLANs (Virtual LANs)
Software-based grouping of nodes. Nodes can be in the same VLAN even if they are plugged into different switches.
- **Trunking (802.1Q)**: Tagging frames with a VLAN ID so multiple VLANs can share one physical cable between switches.

## 4. ARP (Address Resolution Protocol)
"I know the IP, but what's the MAC?"
1. Computer broadcasts: "Who has IP 192.168.1.5?".
2. Target replies: "I do, my MAC is X".
3. Results are saved in the **ARP Cache**.
`, resources: []
    },
    {
        title: "Network Layer: IPv4 & Subnetting",
        slug: "ipv4-subnetting",
        description: "IP addressing, classes, and dividing networks.",
        order: 8, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Network Layer: IPv4

Responsible for host-to-host delivery across different networks.

## 1. IPv4 Address Structure
32 bits, usually shown as 4 decimals: \`192.168.1.1\`.
- Total addresses: $2^{32} \approx 4.3 \text{ Billion}$.

## 2. Classful Addressing (The Old Way)
- **Class A**: \`1-126\`. (/8) Large networks.
- **Class B**: \`128-191\`. (/16) Medium.
- **Class C**: \`192-223\`. (/24) Small.
- **Class D**: Multicast.
- **Class E**: Research.

## 3. CIDR (The Modern Way)
Classless Inter-Domain Routing. Uses a "Slash" notation to define the network bits.
- \`192.168.1.0/24\`: First 24 bits are Network, last 8 are Host.

## 4. Subnetting
Dividing one large network into smaller ones to reduce traffic and increase security.
- **Example**: Dividing a \`/24\` into two \`/25\` networks.
- **Subnet Mask**: Used by devices to tell if an IP is "Local" or "Remote".

## 5. Private IP Addresses
Reserved for internal use (RFC 1918):
- \`10.0.0.0/8\`
- \`172.16.0.0/12\`
- \`192.168.0.0/16\`
`, resources: []
    },
    {
        title: "Network Layer: IPv6",
        slug: "ipv6-basics",
        description: "The successor to IPv4: Address types and headers.",
        order: 9, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Network Layer: IPv6

IPv4 addresses ran out. IPv6 was designed to provide practically infinite addresses.

## 1. Structure
128 bits, shown as 8 groups of 4 hex digits: \`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`.
- Total addresses: $3.4 \times 10^{38}$ (Enough to give every atom on Earth its own IP!).

## 2. Key Features
- **No Broadcast**: Replaced by Anycast and Multicast.
- **Stateless Address Autoconfiguration (SLAAC)**: Devices can generate their own IP without a DHCP server.
- **Built-in Security**: IPsec was designed for IPv6 from the start.
- **Simplified Header**: Fixed size, making it faster for routers to process.

## 3. Transition Mechanisms
Since we can't switch the whole world at once:
- **Dual Stack**: Running both IPv4 and IPv6.
- **Tunneling**: Wrapping IPv6 packets inside IPv4 packets.
- **NAT64**: Translating between the two versions.
`, resources: []
    },
    {
        title: "Routing Algorithms",
        slug: "routing-algorithms",
        description: "Finding the best path: Link State vs Distance Vector.",
        order: 10, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Routing Algorithms

How routers decide which way to send a packet.

## 1. Distance Vector (RIP)
"I know how far it is to the goal through my neighbors."
- Uses the **Bellman-Ford** algorithm.
- Routers share their entire routing table periodically.
- Problem: **Count-to-Infinity** (Solved by Split Horizon and Poison Reverse).

## 2. Link State (OSPF)
"I know the entire map of the network."
- Uses **Dijkstra's Algorithm**.
- Routers flood "Link State Advertisements" to build a consistent map.
- Faster convergence and better for large networks.

## 3. BGP (Border Gateway Protocol)
The "Glue of the Internet". It's a **Path Vector** protocol used to route data between different Autonomous Systems (AS) like ISPs and huge companies.

## 4. Static vs Dynamic Routing
- **Static**: Manually entered by an admin. 
- **Dynamic**: Routers learn automatically and adapt to failures.
`, resources: []
    },
    {
        title: "Transport Layer: TCP",
        slug: "tcp-protocol",
        description: "Three-way handshake, reliability, and error control.",
        order: 11, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Transport Layer: TCP

Transmission Control Protocol (TCP) provides **Reliable, Connection-Oriented** service.

## 1. Three-Way Handshake
Establishes a connection before sending data:
1. Client sends **SYN**.
2. Server sends **SYN-ACK**.
3. Client sends **ACK**.

## 2. Reliable Delivery
- **Sequence Numbers**: Every byte is numbered.
- **Acknowledgements (ACKs)**: Receiver confirms receipt.
- **Retransmission**: If an ACK isn't received within a timer, the sender resends the packet.

## 3. Flow Control (Sliding Window)
The receiver tells the sender "Window Size" (how much they can handle). Prevents the sender from overwhelming the receiver.

## 4. Error Control
Checkums in the TCP header ensure data wasn't corrupted in transit.

## 5. Terminating a Connection
1. Client sends **FIN**.
2. Server sends **ACK**.
3. Server sends **FIN**.
4. Client sends **ACK**.
`, resources: []
    },
    {
        title: "Transport Layer: UDP",
        slug: "udp-protocol",
        description: "Fast, connectionless, and best-effort delivery.",
        order: 12, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Transport Layer: UDP

User Datagram Protocol (UDP) is **Connectionless and Unreliable**.

## 1. Why use UDP?
- **Speed**: No handshake, no overhead.
- **Smaller Headers**: 8 bytes vs TCP's 20-60 bytes.
- **No Congestion Control**: Useful for real-time where a late packet is useless (Gaming/VOIP).

## 2. Comparison

| Feature | TCP | UDP |
|---------|-----|-----|
| Reliability | High (Guaranteed) | Low (Best-effort) |
| Order | Preserved | Not guaranteed |
| Handshake | Yes | No |
| Overhead | High | Low |
| Use Case | Web, Email, SSH | DNS, Streaming, Gaming |

## 3. Checksum
UDP still has an optional checksum. If it fails, the packet is just dropped without any notification to the sender.
`, resources: []
    },
    {
        title: "TCP Congestion Control",
        slug: "tcp-congestion-control",
        description: "Slow Start, Congestion Avoidance, and Fast Recovery.",
        order: 13, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# TCP Congestion Control

Flow control is about the *receiver*; Congestion control is about the *network*.

## 1. Slow Start
Start with a tiny window and double it every RTT (Round Trip Time) until a threshold is hit.

## 2. Congestion Avoidance
Once threshold is hit, increase window linearly (by 1) to cautiously explore capacity.

## 3. Handling Loss
- **Timeout**: Assumes major congestion. Drastically reduces window.
- **3 Duplicate ACKs**: Assumes minor packet loss. Performs **Fast Retransmit** and **Fast Recovery** (less drastic than timeout).

## 4. AIMD (Additive Increase, Multiplicative Decrease)
The general logic: slowly increase when healthy, cut in half when congested.
`, resources: []
    },
    {
        title: "Application Layer: HTTP & HTTPS",
        slug: "http-protocol",
        description: "The language of the web: Methods, status codes, and security.",
        order: 14, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Application Layer: HTTP

Hypertext Transfer Protocol (HTTP) is the foundation of data exchange on the Web.

## 1. Request Methods
- **GET**: Retrieve data.
- **POST**: Submit data.
- **PUT**: Update data.
- **DELETE**: Remove data.

## 2. Status Codes
- **200 OK**: Success.
- **301 Moved Permanently**: Redirection.
- **404 Not Found**: Client error.
- **500 Internal Server Error**: Server error.

## 3. HTTP Versions
- **HTTP/1.1**: Persistent connections.
- **HTTP/2**: Multiplexing (many requests over one connection), Header compression.
- **HTTP/3 (QUIC)**: Uses UDP instead of TCP to eliminate head-of-line blocking.

## 4. HTTPS (HTTP over SSL/TLS)
Uses encryption to protect privacy and integrity.
- Uses **Certificates** to verify the server's identity.
`, resources: []
    },
    {
        title: "Domain Name System (DNS)",
        slug: "dns-protocol",
        description: "Mapping names to IPs and the hierarchy of resolution.",
        order: 15, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Domain Name System (DNS)

The "Phonebook of the Internet".

## 1. The Hierarchy
1. **Root Servers**: (Points to .com, .org, .net).
2. **TLD Servers**: (Points to google.com, apple.com).
3. **Authoritative Servers**: (Stores the actual A, MX, CNAME records).

## 2. How Resolution Works
- **Recursive Query**: Your device asks the ISP resolver to "Do the whole work and find the answer".
- **Iterative Query**: The resolver asks Root → TLD → Authoritative step by step.

## 3. Record Types
- **A**: Maps Name $\to$ IPv4.
- **AAAA**: Maps Name $\to$ IPv6.
- **CNAME**: Alias (one name to another).
- **MX**: Mail server.
- **TXT**: Arbitrary data (often for security verification).

## 4. DNS Caching
Resolvers and Browsers save results locally for a duration called **TTL** (Time To Live).
`, resources: []
    },
    {
        title: "Network Security & Firewalls",
        slug: "network-security",
        description: "Defense in depth: Firewalls, IDS, and IPS.",
        order: 16, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Network Security

## 1. Firewalls
Hardware or software that filters traffic based on rules.
- **Stateless**: Checks individual packets against rules (Faster).
- **Stateful**: Tracks whether a packet belongs to an existing, safe connection (More secure).

## 2. IDS vs IPS
- **IDS (Intrusion Detection)**: Monitors and alerts on suspicious activity (Passive).
- **IPS (Intrusion Prevention)**: Monitors and can actively drop packets to stop an attack (Active).

## 3. VPN (Virtual Private Network)
Creates an encrypted "Tunnel" over the public internet, making your remote computer act as if it's on a local trusted network.

## 4. Common Attacks
- **DDoS**: Overwhelming a server with traffic from thousands of bots.
- **Phishing**: Trickery to get user credentials.
- **Man-in-the-Middle (MITM)**: Intercepting communication between A and B.
`, resources: []
    },
    {
        title: "Network Address Translation (NAT)",
        slug: "nat-protocol",
        description: "How many devices share a single public IP.",
        order: 17, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Network Address Translation (NAT)

As a temporary fix for IPv4 address exhaustion, NAT allows an entire home or office to share one public IP.

## 1. How it works
The router maintains a **NAT Table**:
- (Internal IP, Internal Port) $\leftrightarrow$ (Public IP, External Port).

## 2. PAT (Port Address Translation)
The most common form of NAT. It uses port numbers to distinguish between many local devices using the same public IP.

## 3. Pros and Cons
- **Pros**: Saves IP addresses, provides "Security through obscurity" (internal IPs are hidden).
- **Cons**: Breaks end-to-end transparency, makes some peer-to-peer apps (like VoIP or Gaming) harder to configure (requires STUN/TURN or Port Forwarding).
`, resources: []
    },
    {
        title: "Wireless Networking & Wi-Fi",
        slug: "wireless-networking",
        description: "802.11 standards, frequencies, and wPA3 security.",
        order: 18, estimatedMinutes: 55, difficulty: "Easy",
        content: `
# Wireless Networking

## 1. 802.11 (Wi-Fi) Standards
- **802.11n (Wi-Fi 4)**: 2.4/5GHz, added MIMO.
- **802.11ac (Wi-Fi 5)**: 5GHz only, much faster.
- **802.11ax (Wi-Fi 6)**: Efficiency in crowded areas.

## 2. Frequencies
- **2.4 GHz**: Longer range, better at passing through walls, but very crowded (Microwaves, Bluetooth).
- **5 GHz**: Faster, less interference, but shorter range.

## 3. Wireless Security
- **WEP**: Broken, do not use.
- **WPA2**: Standard for a long time. Vulnerable to "KRACK" attack.
- **WPA3**: Modern standard with better encryption and protection against brute-force.

## 4. AP (Access Point)
The device that bridges wireless clients to a wired network.
`, resources: []
    },
    {
        title: "Quality of Service (QoS)",
        slug: "networking-qos",
        description: "Traffic shaping, queuing, and prioritization.",
        order: 19, estimatedMinutes: 50, difficulty: "Hard",
        content: `
# Quality of Service (QoS)

Ensuring the network treats important traffic (Zoom call) differently than unimportant traffic (Big file download).

## 1. The Challenges
- **Bandwidth**: Throughput limits.
- **Delay**: Total travel time.
- **Jitter**: Jitter > 30ms ruins voice/video.
- **Packet Loss**.

## 2. Queuing Algorithms
- **FIFO**: First-in, first-out (No QoS).
- **Priority Queuing**: VIP traffic goes to a separate "Fast Lane" queue.
- **Weighted Fair Queuing (WFQ)**: Gives each flow a "Fair" percentage of bandwidth.

## 3. Traffic Shaping & Policing
- **Policing**: Dropping traffic that exceeds the limit (Fast).
- **Shaping**: Buffering bursts of traffic to "smooth out" the flow (Slower, but no loss).
`, resources: []
    },
    {
        title: "Future of Networking: SDN",
        slug: "sdn-future",
        description: "Software Defined Networking and decoupling data from control.",
        order: 20, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Future of Networking: SDN

Traditional networking is "Hardware-centric" (manually configuring each router).

## 1. SDN (Software Defined Networking)
Moves the "Brain" of the router (Control Plane) to a centralized software controller.
- **Data Plane**: Hardware only knows how to forward packets at high speed.
- **Control Plane**: Programmer-defined logic that tells hardware how to behave.

## 2. Benefits
- **Automated**: Use scripts to change the whole network at once.
- **Dynamic**: Reroute traffic based on time of day or application.

## 3. NFV (Network Function Virtualization)
Running Firewalls, Load Balancers, and Proxies as software (VMs/Containers) instead of buying expensive specialized hardware boxes.

## 4. Li-Fi
Using light bulbs to transmit data at extremely high speeds. (Theoretical/Niche).
`, resources: []
    }
];
