import { operatingSystemsTopics } from "./systems-networking/operating-systems";
import { computerNetworksTopics } from "./systems-networking/computer-networks";
import { computerOrganizationTopics } from "./systems-networking/computer-organization";
import { theoryOfComputationTopics } from "./systems-networking/theory-of-computation";
import { compilerDesignTopics } from "./systems-networking/compiler-design";
import { distributedSystemsTopics } from "./systems-networking/distributed-systems";
import { linuxTopics } from "./systems-networking/linux";
import { cybersecurityTopics } from "./systems-networking/cybersecurity";

export const systemsNetworkingSubjects = [
    {
        name: "Operating Systems",
        slug: "operating-systems",
        category: "Systems & Networking",
        description: "Process management, memory management, file systems, scheduling, synchronization, and deadlocks.",
        icon: "monitor",
        difficulty: "Intermediate",
        estimatedHours: 50,
        prerequisites: [],
        order: 1,
        topics: operatingSystemsTopics
    },
    {
        name: "Computer Networks",
        slug: "computer-networks",
        category: "Systems & Networking",
        description: "OSI model, TCP/IP, routing, switching, DNS, HTTP, and network security.",
        icon: "network",
        difficulty: "Intermediate",
        estimatedHours: 45,
        prerequisites: [],
        order: 2,
        topics: computerNetworksTopics
    },
    {
        name: "Computer Organization and Architecture",
        slug: "computer-organization",
        category: "Systems & Networking",
        description: "CPU design, pipelining, cache, memory hierarchy, I/O, and parallel processing.",
        icon: "circuit-board",
        difficulty: "Intermediate",
        estimatedHours: 40,
        prerequisites: ["computer-fundamentals"],
        order: 3,
        topics: computerOrganizationTopics
    },
    {
        name: "Theory of Computation",
        slug: "theory-of-computation",
        category: "Systems & Networking",
        description: "Finite automata, regular languages, context-free grammars, Turing machines, and computability.",
        icon: "infinity",
        difficulty: "Advanced",
        estimatedHours: 45,
        prerequisites: ["engineering-mathematics"],
        order: 4,
        topics: theoryOfComputationTopics
    },
    {
        name: "Compiler Design",
        slug: "compiler-design",
        category: "Systems & Networking",
        description: "Lexical analysis, parsing, semantic analysis, code generation, and optimization.",
        icon: "file-code",
        difficulty: "Advanced",
        estimatedHours: 40,
        prerequisites: ["theory-of-computation"],
        order: 5,
        topics: compilerDesignTopics
    },
    {
        name: "Distributed Systems",
        slug: "distributed-systems",
        category: "Systems & Networking",
        description: "Consistency, replication, consensus algorithms, fault tolerance, and distributed databases.",
        icon: "server",
        difficulty: "Advanced",
        estimatedHours: 45,
        prerequisites: ["operating-systems", "computer-networks"],
        order: 6,
        topics: distributedSystemsTopics
    },
    {
        name: "Linux Tutorial",
        slug: "linux-tutorial",
        category: "Systems & Networking",
        description: "Linux fundamentals, file system, shell commands, scripting, and system administration.",
        icon: "terminal",
        difficulty: "Beginner",
        estimatedHours: 35,
        prerequisites: [],
        order: 7,
        topics: linuxTopics
    },
    {
        name: "Cybersecurity Tutorial",
        slug: "cybersecurity",
        category: "Systems & Networking",
        description: "Cryptography, web security, network security, ethical hacking, and security best practices.",
        icon: "shield",
        difficulty: "Intermediate",
        estimatedHours: 40,
        prerequisites: ["computer-networks"],
        order: 8,
        topics: cybersecurityTopics
    }
];
