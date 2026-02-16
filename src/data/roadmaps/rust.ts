
import { RoadmapTrack } from './types';

export const rustRoadmap: RoadmapTrack = {
    id: 'rust',
    title: 'Rust',
    description: 'Master the Rust programming language',
    category: 'skill-based',
    icon: '🦀',
    accentColor: '#dea584',
    rootNodeId: 'rust-root',
    nodes: {
        'rust-root': {
            id: 'rust-root',
            label: 'Rust Mastery',
            description: 'Learn Rust for building fast and memory-safe systems software.',
            children: ['rust-basics', 'rust-ownership', 'rust-structs-enums', 'rust-error-handling', 'rust-asynchronous'],
            resources: [
                { type: 'documentation', title: 'The Rust Programming Language (Book)', url: 'https://doc.rust-lang.org/book/', isFree: true },
                { type: 'article', title: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/', isFree: true },
                { type: 'video', title: 'Rust Programming Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=BpPEoZW5IiY', isFree: true },
                { type: 'article', title: 'Rustlings - Interactive Exercises', url: 'https://github.com/rust-lang/rustlings', isFree: true }
            ],
            content: {
                overview: 'Rust is a systems programming language that guarantees memory safety and thread safety at compile time, without needing a garbage collector. Created by Mozilla and first released in 2015, it has been voted the "most loved programming language" in the Stack Overflow survey every year since. Rust achieves its safety guarantees through its unique ownership system, which tracks how long data lives and who has access to it at any given time. This means entire classes of bugs (null pointer dereferences, data races, use-after-free, buffer overflows) are caught by the compiler before your code ever runs. Rust compiles to native machine code and reaches C/C++ level performance. It is used in web browsers (Firefox, parts of Chrome), operating systems (Linux kernel modules), game engines, WebAssembly, CLI tools (ripgrep, fd, exa), and cloud infrastructure. The learning curve is steep compared to languages like Python or Go, but the result is code that is both fast and correct.',
                keyConcepts: [
                    'Ownership, borrowing, and lifetimes',
                    'Zero-cost abstractions',
                    'No garbage collector, no manual memory management',
                    'Pattern matching with match expressions',
                    'Traits instead of classes/inheritance',
                    'Result and Option enums for error handling (no null, no exceptions)',
                    'Fearless concurrency (compile-time data race prevention)',
                    'Cargo: build system and package manager'
                ],
                practiceQuestions: [
                    { question: 'Why does Rust not have a garbage collector?', hint: 'Ownership and borrowing rules let the compiler determine when to free memory at compile time.', difficulty: 'medium' },
                    { question: 'What makes Rust different from C++ for systems programming?', hint: 'Rust prevents memory safety bugs at compile time that C++ only catches at runtime (or not at all).', difficulty: 'medium' },
                    { question: 'What is Cargo?', hint: 'Rust\'s build system and package manager, similar to npm for JavaScript or pip for Python.', difficulty: 'easy' },
                    { question: 'Why is Rust suitable for WebAssembly?', hint: 'It compiles to native code with no runtime overhead, and WASM is a compilation target.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Read "The Rust Programming Language" book (The Book) from start to finish.',
                    'Use Rustlings exercises to practice concepts as you learn them.',
                    'Let the compiler guide you. Rust error messages are intentionally helpful.',
                    'Start with simple CLI tools before building complex systems.',
                    'Use cargo clippy for linting and cargo fmt for formatting.',
                    'Embrace the borrow checker instead of fighting it — it is teaching you correct patterns.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Setup and Fundamentals', description: 'Install Rust and learn the basics.', tasks: ['Install Rust via rustup', 'Learn variables, types, functions, and control flow', 'Understand the difference between let, let mut, and const'] },
                { day: 2, title: 'Ownership and Structs', description: 'The core concepts that make Rust unique.', tasks: ['Understand ownership, move semantics, and borrowing', 'Learn structs, enums, and impl blocks', 'Practice pattern matching with match'] },
                { day: 3, title: 'Error Handling and Projects', description: 'Build real programs with proper error handling.', tasks: ['Use Result and Option for error handling', 'Learn the ? operator for error propagation', 'Build a CLI tool using clap or std::env'] }
            ]
        },
        'rust-basics': {
            id: 'rust-basics',
            label: 'Basics & Syntax',
            description: 'Variables, types, functions, control flow, and the Cargo ecosystem.',
            parentId: 'rust-root',
            resources: [
                { type: 'documentation', title: 'Rust Book - Getting Started', url: 'https://doc.rust-lang.org/book/ch01-00-getting-started.html', isFree: true },
                { type: 'article', title: 'Rust Playground', url: 'https://play.rust-lang.org/', isFree: true }
            ],
            content: {
                overview: 'Rust basics introduce a language that feels familiar in some ways but surprising in others. Variables are immutable by default (you must explicitly write let mut to make them mutable). Types are statically inferred but can be annotated. Rust has the usual primitives (i32, f64, bool, char) but also has tuples and arrays as first-class types. Functions use the fn keyword and have explicit return types. The last expression in a block is implicitly returned (no semicolon). Control flow includes if/else (which is an expression, not a statement), loop, while, and for. Strings are more nuanced than in most languages because Rust has two main string types: String (owned, heap-allocated, growable) and &str (a borrowed string slice). Understanding the difference is one of your first ownership lessons.',
                keyConcepts: [
                    'Immutability by default: let vs let mut',
                    'Scalar types: i32, i64, f64, bool, char',
                    'Compound types: tuples and arrays',
                    'Functions, expressions vs statements',
                    'String vs &str',
                    'Shadowing (redeclaring variables)',
                    'Cargo: new, build, run, test',
                    'Crates and modules for code organization'
                ],
                practiceQuestions: [
                    { question: 'Why are variables immutable by default in Rust?', hint: 'It encourages safer code and makes concurrency easier since immutable data cannot be corrupted.', difficulty: 'easy' },
                    { question: 'What is the difference between String and &str?', hint: 'String is owned heap data you can modify; &str is a borrowed, immutable view into string data.', difficulty: 'medium' },
                    { question: 'What does shadowing mean in Rust?', hint: 'Declaring a new variable with the same name, which can even change the type.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Keep variables immutable unless you have a clear reason to make them mutable.',
                    'Use cargo check frequently during development — it is faster than full compilation.',
                    'Use &str for function parameters that only need to read strings.',
                    'Organize code with modules from the beginning to avoid monolithic files.'
                ]
            }
        },
        'rust-ownership': {
            id: 'rust-ownership',
            label: 'Ownership & Borrowing',
            description: 'The core memory safety concept that makes Rust unique among programming languages.',
            parentId: 'rust-root',
            resources: [
                { type: 'documentation', title: 'Rust Book - Ownership', url: 'https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html', isFree: true },
                { type: 'video', title: 'Visualizing Ownership', url: 'https://www.youtube.com/watch?v=VFIOSWy93H0', isFree: true }
            ],
            content: {
                overview: 'Ownership is the feature that defines Rust. Every value in Rust has exactly one owner. When the owner goes out of scope, the value is dropped (freed). When you assign a value to another variable, ownership moves (the original variable becomes invalid). This prevents double-free bugs. Borrowing lets you reference data without taking ownership: an immutable borrow (&T) gives read-only access, and a mutable borrow (&mut T) gives exclusive read-write access. The key rule is that you can have either one mutable reference OR any number of immutable references at a time, but never both. This is enforced at compile time. Lifetimes annotate how long references are valid, preventing dangling pointer bugs. The ownership system is what allows Rust to manage memory without garbage collection and prevent data races without runtime checks.',
                keyConcepts: [
                    'Each value has exactly one owner',
                    'Values are dropped when the owner goes out of scope',
                    'Move semantics: assignment transfers ownership',
                    'Clone for explicit deep copies',
                    'Immutable borrows (&T) vs mutable borrows (&mut T)',
                    'The borrow checker: enforced at compile time',
                    'Lifetime annotations (\'a) for reference validity',
                    'Stack vs heap allocation'
                ],
                practiceQuestions: [
                    { question: 'What happens when you assign a String to another variable?', hint: 'Ownership moves. The original variable becomes invalid and cannot be used.', difficulty: 'easy' },
                    { question: 'Why can you not have a mutable and immutable borrow at the same time?', hint: 'It would allow reading data while it is being mutated, leading to data corruption.', difficulty: 'medium' },
                    { question: 'What is a lifetime and when do you need to annotate one?', hint: 'A lifetime tells the compiler how long a reference is valid. You annotate when the compiler cannot infer the relationship.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Think of ownership as "who is responsible for cleaning up this data."',
                    'Use .clone() sparingly — it is a performance cost, but fine while learning.',
                    'Prefer borrowing over taking ownership in function parameters.',
                    'When you see lifetime errors, draw a diagram of which references live where.'
                ]
            }
        },
        'rust-structs-enums': {
            id: 'rust-structs-enums',
            label: 'Structs, Enums & Traits',
            description: 'Custom types, pattern matching, and trait-based polymorphism.',
            parentId: 'rust-root',
            resources: [
                { type: 'documentation', title: 'Rust Book - Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html', isFree: true },
                { type: 'documentation', title: 'Rust Book - Traits', url: 'https://doc.rust-lang.org/book/ch10-02-traits.html', isFree: true }
            ],
            content: {
                overview: 'Rust does not have classes. Instead, it uses structs for data, impl blocks for methods, enums for algebraic data types, and traits for shared behavior (similar to interfaces). Structs hold named fields of data. Enums in Rust are far more powerful than in most languages because each variant can hold different data (like tagged unions). The match expression provides exhaustive pattern matching — the compiler ensures you handle every variant. Traits define shared behavior. When a struct implements a trait, it promises to provide certain methods. There is no inheritance in Rust; instead, trait objects and generics with trait bounds provide polymorphism. Derive macros (#[derive(Debug, Clone)]) automatically implement common traits for your types.',
                keyConcepts: [
                    'Defining structs with named fields',
                    'Implementing methods with impl blocks',
                    'Enums with data (algebraic data types)',
                    'Pattern matching with match (exhaustive, no fallthrough)',
                    'Traits: defining and implementing shared behavior',
                    'Trait bounds on generics',
                    'Derive macros: Debug, Clone, PartialEq, Serialize',
                    'Option<T> and Result<T, E> are enums, not special syntax'
                ],
                practiceQuestions: [
                    { question: 'How are Rust enums different from C or Java enums?', hint: 'Rust enum variants can hold different types and amounts of data (like tagged unions).', difficulty: 'medium' },
                    { question: 'What does #[derive(Debug)] do?', hint: 'It automatically implements the Debug trait so you can print your struct with {:?}.', difficulty: 'easy' },
                    { question: 'How does Rust achieve polymorphism without inheritance?', hint: 'Through traits and trait objects (dyn Trait) or generics with trait bounds.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use enums to model state machines and variant data instead of boolean flags.',
                    'Derive Debug on every struct for easier debugging.',
                    'Prefer generics with trait bounds over trait objects for zero-cost abstraction.',
                    'Use if let for matching when you only care about one variant.'
                ]
            }
        },
        'rust-error-handling': {
            id: 'rust-error-handling',
            label: 'Error Handling',
            description: 'Result, Option, the ? operator, and building robust error hierarchies.',
            parentId: 'rust-root',
            resources: [
                { type: 'documentation', title: 'Rust Book - Error Handling', url: 'https://doc.rust-lang.org/book/ch09-00-error-handling.html', isFree: true },
                { type: 'article', title: 'Error Handling - Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/error.html', isFree: true }
            ],
            content: {
                overview: 'Rust has no exceptions and no null. Instead, it uses two enum types for error handling: Result<T, E> for operations that can fail, and Option<T> for values that might not exist. This forces you to handle every possible failure path at compile time — you cannot accidentally ignore an error. The ? operator is syntactic sugar that propagates errors up the call stack (returning early if the Result is Err). For application code, the anyhow crate provides easy error context. For library code, the thiserror crate helps define custom error types. The panic! macro is for unrecoverable errors (bugs, corrupted state) that should crash the program. Understanding when to use Result versus when to panic is a key design decision.',
                keyConcepts: [
                    'Result<T, E>: Ok(value) or Err(error)',
                    'Option<T>: Some(value) or None',
                    'The ? operator for error propagation',
                    'unwrap() and expect() for prototyping',
                    'Custom error types with thiserror',
                    'Flexible errors with anyhow for applications',
                    'panic! for unrecoverable errors',
                    'Converting between error types with From trait'
                ],
                practiceQuestions: [
                    { question: 'What happens if you call .unwrap() on a None value?', hint: 'The program panics and crashes.', difficulty: 'easy' },
                    { question: 'When should you use panic! vs returning a Result?', hint: 'Panic for bugs and unrecoverable states. Return Result for expected, recoverable failures.', difficulty: 'medium' },
                    { question: 'How does the ? operator work?', hint: 'If the Result is Err, it returns the error from the current function. If Ok, it unwraps the value.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Never use unwrap() in production code — use ? or proper matching.',
                    'Use anyhow::Result for application binaries, thiserror for libraries.',
                    'Add context to errors: .context("failed to open config file").',
                    'Prefer returning Result from functions instead of panicking.'
                ]
            }
        },
        'rust-asynchronous': {
            id: 'rust-asynchronous',
            label: 'Async Rust',
            description: 'Futures, async/await, and the Tokio runtime for concurrent I/O.',
            parentId: 'rust-root',
            resources: [
                { type: 'documentation', title: 'Tokio Tutorial', url: 'https://tokio.rs/tokio/tutorial', isFree: true },
                { type: 'article', title: 'Async Book', url: 'https://rust-lang.github.io/async-book/', isFree: true }
            ],
            content: {
                overview: 'Async Rust enables writing highly concurrent programs that handle thousands of connections efficiently. Unlike Go which has goroutines built into the language, Rust provides the async/await syntax but leaves the runtime implementation to external crates. Tokio is the most widely used async runtime and powers frameworks like Axum and Actix-web. An async function returns a Future, which is a value that represents work that has not yet completed. Futures are lazy — they do nothing until they are polled by the runtime. The .await keyword suspends the current task until the Future is ready, allowing other tasks to run on the same thread. Async Rust is powerful for I/O-bound work (web servers, database clients, file operations) but adds complexity compared to synchronous code, especially around lifetimes and borrowing across await points.',
                keyConcepts: [
                    'async fn and .await syntax',
                    'Futures: lazy, poll-based execution',
                    'Tokio runtime: multi-threaded and current-thread',
                    'tokio::spawn for concurrent tasks',
                    'Channels: mpsc, oneshot, broadcast',
                    'Streams for async iteration',
                    'Pin and Unpin for self-referential futures',
                    'Axum web framework for async APIs'
                ],
                practiceQuestions: [
                    { question: 'Why are Rust futures lazy?', hint: 'They do nothing until polled by a runtime. This avoids unnecessary computation.', difficulty: 'medium' },
                    { question: 'When should you use async Rust vs threads?', hint: 'Async for I/O-bound work (network, files). Threads for CPU-bound work.', difficulty: 'medium' },
                    { question: 'What is the role of the Tokio runtime?', hint: 'It provides the event loop, task scheduler, and I/O driver that polls and executes futures.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use Tokio for network applications; use rayon for CPU-bound parallelism.',
                    'Avoid blocking operations inside async functions (use tokio::task::spawn_blocking).',
                    'Keep async functions small and composable.',
                    'Use tracing crate for structured logging in async applications.'
                ]
            }
        }
    }
};
