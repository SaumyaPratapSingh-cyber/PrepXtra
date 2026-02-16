
import { RoadmapTrack } from './types';

export const javaRoadmap: RoadmapTrack = {
    id: 'java',
    title: 'Java',
    description: 'Master the enterprise-grade language powering billions of devices',
    category: 'skill-based',
    icon: '☕',
    accentColor: '#f89820',
    rootNodeId: 'java-root',
    nodes: {
        'java-root': {
            id: 'java-root',
            label: 'Java Mastery',
            description: 'From JDK setup to Spring Boot microservices, master the language of enterprise software.',
            children: ['java-basics', 'java-oop', 'java-collections', 'java-concurrency', 'java-spring'],
            resources: [
                { type: 'documentation', title: 'Oracle Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/', isFree: true },
                { type: 'video', title: 'Java Full Course - Bro Code', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo', isFree: true },
                { type: 'course', title: 'Java Programming Masterclass (Udemy)', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', isFree: false },
                { type: 'article', title: 'Baeldung - Java Guides', url: 'https://www.baeldung.com/', isFree: true }
            ],
            content: {
                overview: 'Java has been one of the most used programming languages in the world since its release in 1995. Its "Write Once, Run Anywhere" philosophy means that compiled Java code (bytecode) runs on the Java Virtual Machine (JVM), making it platform-independent. Java is statically typed, object-oriented, and has a strong emphasis on backward compatibility. It powers everything from Android apps and enterprise backends to big data tools like Apache Hadoop and Kafka. Modern Java (versions 17+) has evolved significantly with features like records, sealed classes, pattern matching, and virtual threads (Project Loom), making it far more concise than the verbose Java of the past. The JVM ecosystem also supports other languages like Kotlin, Scala, and Groovy.',
                keyConcepts: [
                    'JDK, JRE, and JVM architecture',
                    'Static typing and compilation to bytecode',
                    'Object-Oriented Programming principles',
                    'Memory management and Garbage Collection',
                    'Java Stream API and functional programming',
                    'Modern Java features (records, var, sealed classes)',
                    'Maven and Gradle build tools',
                    'The Spring ecosystem for enterprise development'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between JDK, JRE, and JVM?', hint: 'JDK is the development kit, JRE is the runtime, JVM is the virtual machine that executes bytecode.', difficulty: 'easy' },
                    { question: 'Why is Java called platform-independent?', hint: 'Java code compiles to bytecode that runs on any JVM, regardless of the underlying OS.', difficulty: 'easy' },
                    { question: 'What is the difference between abstract classes and interfaces in Java?', hint: 'Abstract classes can have state and constructors; interfaces define contracts. Since Java 8, interfaces can have default methods.', difficulty: 'medium' },
                    { question: 'Explain the difference between == and .equals() in Java.', hint: '== compares references (memory addresses); .equals() compares values.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use the latest LTS version of Java (21+) for new projects.',
                    'Follow SOLID principles for maintainable OOP code.',
                    'Prefer immutable objects where possible.',
                    'Use Optional instead of returning null to prevent NullPointerException.',
                    'Leverage the Stream API for clean collection processing.',
                    'Use a build tool (Maven or Gradle) from the start, never manual compilation.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Java Fundamentals', description: 'Set up and write your first programs.', tasks: ['Install JDK 21 and set up IntelliJ IDEA', 'Learn variables, types, operators, and control flow', 'Write basic programs with Scanner for input'] },
                { day: 2, title: 'OOP Deep Dive', description: 'Classes, inheritance, and polymorphism.', tasks: ['Create classes with constructors and methods', 'Practice inheritance, interfaces, and abstract classes', 'Understand encapsulation and access modifiers'] },
                { day: 3, title: 'Collections and Modern Java', description: 'Data structures and new features.', tasks: ['Master List, Set, Map, and Queue interfaces', 'Learn the Stream API and lambda expressions', 'Explore records, sealed classes, and pattern matching'] }
            ]
        },
        'java-basics': {
            id: 'java-basics',
            label: 'Java Basics',
            description: 'Variables, types, operators, control flow, arrays, and the basics of the language.',
            parentId: 'java-root',
            resources: [
                { type: 'article', title: 'Java Basics - W3Schools', url: 'https://www.w3schools.com/java/', isFree: true },
                { type: 'documentation', title: 'Java Language Specification', url: 'https://docs.oracle.com/javase/specs/', isFree: true }
            ],
            content: {
                overview: 'Java basics cover the fundamentals of a statically typed language. Unlike Python, you must declare variable types explicitly (though the var keyword in modern Java helps). Java has 8 primitive types (byte, short, int, long, float, double, char, boolean) and their object wrapper classes. Arrays are fixed-size, and strings are immutable objects. Understanding the main method signature (public static void main(String[] args)) is your entry point into every Java program. Error handling uses the try/catch/finally/throws mechanism. Java also distinguishes between checked exceptions (must handle) and unchecked exceptions (runtime errors like NullPointerException).',
                keyConcepts: [
                    'Primitive types vs wrapper classes (int vs Integer)',
                    'String immutability and the String pool',
                    'Arrays and the enhanced for-loop',
                    'Type casting: widening vs narrowing',
                    'The main method and program entry point',
                    'Checked vs unchecked exceptions',
                    'The Scanner class for user input'
                ],
                practiceQuestions: [
                    { question: 'Why is String immutable in Java?', hint: 'For security, thread safety, and performance via the String pool.', difficulty: 'medium' },
                    { question: 'What will happen if you divide an integer by zero in Java?', hint: 'It throws an ArithmeticException (not a compile error).', difficulty: 'easy' },
                    { question: 'What is autoboxing and unboxing?', hint: 'Automatic conversion between primitive types and their wrapper classes.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use var for local variable type inference when the type is obvious.',
                    'Prefer StringBuilder over string concatenation in loops.',
                    'Always close resources in a finally block or use try-with-resources.',
                    'Use constants (static final) for magic numbers and strings.'
                ]
            }
        },
        'java-oop': {
            id: 'java-oop',
            label: 'OOP in Java',
            description: 'Classes, inheritance, polymorphism, interfaces, abstract classes, and design patterns.',
            parentId: 'java-root',
            resources: [
                { type: 'article', title: 'OOP Concepts in Java - Baeldung', url: 'https://www.baeldung.com/java-oop', isFree: true },
                { type: 'video', title: 'Java OOP Concepts', url: 'https://www.youtube.com/watch?v=pTB0EiLXUC8', isFree: true }
            ],
            content: {
                overview: 'Java is fundamentally an object-oriented language. Everything (except primitives) is an object. The four pillars of OOP are encapsulation (hiding internal state behind methods), inheritance (extending classes to reuse code), polymorphism (one interface, multiple implementations), and abstraction (hiding complexity behind simple interfaces). Java supports single class inheritance but multiple interface implementation. Key concepts include access modifiers (public, protected, private, default), method overloading vs overriding, the super keyword, and the Object class from which all classes inherit. Design patterns like Singleton, Factory, Observer, and Strategy are widely used in Java enterprise codebases.',
                keyConcepts: [
                    'The four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction',
                    'Access modifiers: public, protected, private, default',
                    'Interfaces vs abstract classes',
                    'Method overloading vs method overriding',
                    'The Object class: equals(), hashCode(), toString()',
                    'Design patterns: Singleton, Factory, Observer, Strategy',
                    'Records for immutable data classes (Java 16+)',
                    'Sealed classes for controlled inheritance (Java 17+)'
                ],
                practiceQuestions: [
                    { question: 'Why must you override hashCode() when you override equals()?', hint: 'Objects that are equal must have the same hash code for HashMap/HashSet to work correctly.', difficulty: 'hard' },
                    { question: 'Can you instantiate an abstract class?', hint: 'No, you can only instantiate its concrete subclasses.', difficulty: 'easy' },
                    { question: 'What is the diamond problem and how does Java solve it?', hint: 'Multiple inheritance conflict. Java avoids it by allowing only single class inheritance with multiple interface implementation.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Favor composition over inheritance for flexible designs.',
                    'Program to interfaces, not implementations.',
                    'Use records instead of boilerplate POJOs for data transfer objects.',
                    'Keep classes small and focused (Single Responsibility Principle).'
                ]
            }
        },
        'java-collections': {
            id: 'java-collections',
            label: 'Collections Framework',
            description: 'Lists, Sets, Maps, Queues, and the Stream API for data processing.',
            parentId: 'java-root',
            resources: [
                { type: 'documentation', title: 'Java Collections Tutorial', url: 'https://docs.oracle.com/javase/tutorial/collections/', isFree: true },
                { type: 'article', title: 'Java Streams Guide', url: 'https://www.baeldung.com/java-streams', isFree: true }
            ],
            content: {
                overview: 'The Java Collections Framework provides a set of interfaces and classes for storing and manipulating groups of data. The main interfaces are List (ordered, allows duplicates), Set (unordered, no duplicates), Map (key-value pairs), and Queue (FIFO ordering). Common implementations include ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap, and PriorityQueue. The Stream API (introduced in Java 8) allows you to process collections in a functional, declarative style using operations like filter, map, reduce, and collect. Streams support lazy evaluation and parallel processing, making them powerful for data transformation pipelines.',
                keyConcepts: [
                    'List: ArrayList vs LinkedList performance trade-offs',
                    'Set: HashSet vs TreeSet vs LinkedHashSet',
                    'Map: HashMap vs TreeMap vs ConcurrentHashMap',
                    'Comparable vs Comparator for sorting',
                    'Stream API: filter, map, reduce, collect',
                    'Optional for null-safe programming',
                    'Unmodifiable collections with List.of(), Map.of()'
                ],
                practiceQuestions: [
                    { question: 'When would you use a LinkedList over an ArrayList?', hint: 'When you need frequent insertions/deletions at the beginning or middle. ArrayList is better for random access.', difficulty: 'medium' },
                    { question: 'How does HashMap handle collisions?', hint: 'Using chaining (linked lists, upgrading to trees when chains get long in Java 8+).', difficulty: 'hard' },
                    { question: 'What is the difference between map() and flatMap() in streams?', hint: 'map transforms each element; flatMap flattens nested structures into a single stream.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use the interface type for declarations (List, not ArrayList).',
                    'Prefer Stream operations over manual loops for readability.',
                    'Use ConcurrentHashMap instead of synchronizing a regular HashMap.',
                    'Use List.of() and Map.of() for immutable collections.'
                ]
            }
        },
        'java-concurrency': {
            id: 'java-concurrency',
            label: 'Concurrency',
            description: 'Threads, synchronization, ExecutorService, CompletableFuture, and virtual threads.',
            parentId: 'java-root',
            resources: [
                { type: 'article', title: 'Java Concurrency - Baeldung', url: 'https://www.baeldung.com/java-concurrency', isFree: true },
                { type: 'documentation', title: 'Virtual Threads (Project Loom)', url: 'https://openjdk.org/jeps/444', isFree: true }
            ],
            content: {
                overview: 'Java has had built-in concurrency support since its earliest versions. Threads are the fundamental unit of concurrency. While you can create threads directly, modern Java uses higher-level abstractions. The ExecutorService manages thread pools so you do not create threads yourself. CompletableFuture enables non-blocking, composable asynchronous programming. Java 21 introduced Virtual Threads (Project Loom), which are lightweight threads managed by the JVM rather than the OS. This means you can create millions of concurrent tasks without the overhead of OS threads, which is transformative for high-throughput servers. Understanding thread safety, synchronization, volatile, and atomic operations is essential for writing correct concurrent programs.',
                keyConcepts: [
                    'Threads and the Runnable/Callable interfaces',
                    'Thread lifecycle and states',
                    'Synchronized blocks and intrinsic locks',
                    'The volatile keyword and visibility guarantees',
                    'ExecutorService and thread pools',
                    'CompletableFuture for async programming',
                    'Virtual Threads (Project Loom, Java 21+)',
                    'Common pitfalls: deadlocks, race conditions, starvation'
                ],
                practiceQuestions: [
                    { question: 'What is a deadlock and how can you prevent it?', hint: 'Two threads waiting for each other to release locks. Prevent by acquiring locks in a consistent order.', difficulty: 'hard' },
                    { question: 'What is the advantage of virtual threads over platform threads?', hint: 'Virtual threads are extremely lightweight (managed by JVM, not OS), allowing millions of concurrent tasks.', difficulty: 'medium' },
                    { question: 'What is the difference between Runnable and Callable?', hint: 'Callable can return a result and throw checked exceptions; Runnable cannot.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Prefer virtual threads for I/O-bound workloads on Java 21+.',
                    'Use ExecutorService instead of manually creating threads.',
                    'Minimize the scope of synchronized blocks.',
                    'Use java.util.concurrent classes over manual synchronization.'
                ]
            }
        },
        'java-spring': {
            id: 'java-spring',
            label: 'Spring Boot',
            description: 'Build production-ready REST APIs and microservices with the Spring ecosystem.',
            parentId: 'java-root',
            resources: [
                { type: 'documentation', title: 'Spring Boot Reference', url: 'https://spring.io/projects/spring-boot', isFree: true },
                { type: 'video', title: 'Spring Boot Tutorial - Amigoscode', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U', isFree: true },
                { type: 'course', title: 'Spring Framework 6 (Udemy)', url: 'https://www.udemy.com/course/spring-hibernate-tutorial/', isFree: false }
            ],
            content: {
                overview: 'Spring Boot is the de facto standard for building Java backend applications. It simplifies the complex Spring Framework by providing auto-configuration, embedded servers (Tomcat/Netty), and opinionated defaults. With Spring Boot you can create a REST API in minutes, connect to databases with Spring Data JPA, secure endpoints with Spring Security, and build microservices architecture. The framework follows Dependency Injection (DI) and Inversion of Control (IoC) principles, meaning the framework manages object creation and wiring for you. Spring Boot Actuator provides production-ready monitoring and health checks out of the box.',
                keyConcepts: [
                    'Dependency Injection and IoC container',
                    'Auto-configuration and starter dependencies',
                    'REST controllers and request mapping',
                    'Spring Data JPA for database operations',
                    'Spring Security for authentication and authorization',
                    'Application properties and profiles',
                    'Spring Boot Actuator for monitoring',
                    'Testing with @SpringBootTest and MockMvc'
                ],
                practiceQuestions: [
                    { question: 'What is Dependency Injection?', hint: 'A technique where an object receives its dependencies from an external source rather than creating them itself.', difficulty: 'easy' },
                    { question: 'What is the difference between @Component, @Service, @Repository, and @Controller?', hint: 'They are all Spring beans; the difference is semantic, indicating the layer (controller, service, data access).', difficulty: 'medium' },
                    { question: 'How does Spring Boot auto-configuration work?', hint: 'It uses @ConditionalOnClass and @ConditionalOnProperty to automatically configure beans based on what is on your classpath.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use constructor injection over field injection for testability.',
                    'Externalize configuration with application.yml and profiles.',
                    'Write integration tests with @SpringBootTest for critical paths.',
                    'Use DTOs to separate API contracts from database entities.',
                    'Enable Spring Boot Actuator for production health monitoring.'
                ]
            }
        }
    }
};
