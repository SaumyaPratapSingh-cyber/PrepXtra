
import { RoadmapTrack } from './types';

export const goRoadmap: RoadmapTrack = {
    id: 'go',
    title: 'Go',
    description: 'Master the Go programming language (Golang)',
    category: 'skill-based',
    icon: '🐹',
    accentColor: '#00add8',
    rootNodeId: 'go-root',
    nodes: {
        'go-root': {
            id: 'go-root',
            label: 'Go Mastery',
            description: 'Learn Go for building simple, reliable, and efficient software.',
            children: ['go-basics', 'go-concurrency', 'go-standard-lib', 'go-frameworks', 'go-testing'],
            resources: [
                { type: 'documentation', title: 'Go Documentation', url: 'https://go.dev/doc/', isFree: true },
                { type: 'article', title: 'Go by Example', url: 'https://gobyexample.com/', isFree: true },
                { type: 'video', title: 'Go Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=un6ZyFkqFKo', isFree: true },
                { type: 'article', title: 'Effective Go', url: 'https://go.dev/doc/effective_go', isFree: true }
            ],
            content: {
                overview: 'Go (also called Golang) was created at Google in 2009 by Robert Griesemer, Rob Pike, and Ken Thompson. It was designed to solve real problems at Google: slow compilation times, uncontrolled dependencies, and difficulty writing concurrent programs. Go has an intentionally simple syntax with only 25 keywords, compiles to a single static binary with no external dependencies, and has built-in concurrency primitives (goroutines and channels) that make it trivial to write highly concurrent applications. Go is used extensively in cloud infrastructure (Docker, Kubernetes, Terraform are all written in Go), network programming, and backend microservices. It deliberately omits features like classes, inheritance, and exceptions in favor of composition, interfaces, and explicit error handling.',
                keyConcepts: [
                    'Statically typed with type inference',
                    'Compiled to native machine code',
                    'Goroutines for lightweight concurrency',
                    'Channels for safe communication between goroutines',
                    'Interfaces are satisfied implicitly (no implements keyword)',
                    'Error handling via multiple return values',
                    'No classes or inheritance; uses structs and composition',
                    'Built-in toolchain: go build, go test, go fmt, go vet'
                ],
                practiceQuestions: [
                    { question: 'Why does Go not have classes or inheritance?', hint: 'Go favors composition over inheritance by using struct embedding and interfaces.', difficulty: 'medium' },
                    { question: 'How does Go handle errors differently from most languages?', hint: 'No exceptions. Functions return an error value that must be checked explicitly.', difficulty: 'easy' },
                    { question: 'What is the difference between a goroutine and a thread?', hint: 'Goroutines are much lighter (a few KB of stack), managed by the Go runtime, and multiplexed onto OS threads.', difficulty: 'medium' },
                    { question: 'Why does Go compile so fast?', hint: 'No circular dependencies, unused imports are errors, and the dependency model is simple.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always run go fmt before committing code — it is the standard formatter.',
                    'Handle every error explicitly; do not ignore returned error values.',
                    'Use interfaces to define behavior, not data.',
                    'Keep packages small and focused on a single responsibility.',
                    'Use go vet and golangci-lint for static analysis.',
                    'Favor the standard library before reaching for third-party packages.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Go Fundamentals', description: 'Installation and basic syntax.', tasks: ['Install Go and set up your workspace', 'Learn variables, types, and control flow', 'Understand functions, multiple return values, and error handling'] },
                { day: 2, title: 'Data Structures and Interfaces', description: 'Structs, slices, maps, and composition.', tasks: ['Master slices, maps, and their built-in operations', 'Define structs and methods (pointer vs value receivers)', 'Understand interfaces and implicit satisfaction'] },
                { day: 3, title: 'Concurrency and Projects', description: 'Goroutines, channels, and building a CLI tool.', tasks: ['Write concurrent programs with goroutines and channels', 'Learn sync.WaitGroup and sync.Mutex', 'Build a simple REST API with net/http'] }
            ]
        },
        'go-basics': {
            id: 'go-basics',
            label: 'Basics & Syntax',
            description: 'Variables, types, functions, control flow, and the Go toolchain.',
            parentId: 'go-root',
            resources: [
                { type: 'article', title: 'A Tour of Go', url: 'https://go.dev/tour/', isFree: true },
                { type: 'documentation', title: 'Go Spec', url: 'https://go.dev/ref/spec', isFree: true }
            ],
            content: {
                overview: 'Go basics focus on the minimalist but powerful syntax of the language. Go has a strong type system with type inference using the := short variable declaration. It has only one looping construct (for), no while or do-while. Functions can return multiple values, which is how error handling works. Slices are the go-to dynamic array type (not arrays, which are fixed-size and rarely used directly). Maps provide key-value storage. Packages organize code, and the main package with a main() function is the entry point of any executable program. Go enforces code quality at the language level — unused imports and unused variables are compile errors, not warnings.',
                keyConcepts: [
                    'Variables, constants, and type inference with :=',
                    'Primitive types: int, float64, string, bool, byte, rune',
                    'Control flow: for loops, if/else, switch (no fallthrough by default)',
                    'Functions: multiple return values, named returns, variadic functions',
                    'Slices vs arrays',
                    'Maps for key-value storage',
                    'Packages and the import system',
                    'Pointers: & (address of) and * (dereference)'
                ],
                practiceQuestions: [
                    { question: 'What is the zero value of a string in Go?', hint: 'An empty string "". Every type in Go has a zero value.', difficulty: 'easy' },
                    { question: 'What is the difference between an array and a slice in Go?', hint: 'Arrays have fixed size and are value types. Slices are dynamic and are reference types backed by arrays.', difficulty: 'medium' },
                    { question: 'Why does Go treat unused variables as compilation errors?', hint: 'To enforce code cleanliness and prevent dead code from accumulating.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use short variable declarations (:=) for local variables.',
                    'Prefer slices over arrays in almost all cases.',
                    'Use the blank identifier (_) to explicitly ignore unwanted values.',
                    'Group related constants with iota for auto-incrementing enums.'
                ]
            }
        },
        'go-concurrency': {
            id: 'go-concurrency',
            label: 'Concurrency',
            description: 'Goroutines, channels, select statements, and patterns for concurrent programming.',
            parentId: 'go-root',
            resources: [
                { type: 'video', title: 'Go Concurrency Patterns', url: 'https://www.youtube.com/watch?v=f6kdp27TYZs', isFree: true },
                { type: 'article', title: 'Concurrency in Go - Go Blog', url: 'https://go.dev/blog/pipelines', isFree: true }
            ],
            content: {
                overview: 'Concurrency is Go\'s superpower. A goroutine is a function that runs concurrently with other goroutines, started by simply adding the "go" keyword before a function call. Unlike OS threads, goroutines start with only a few kilobytes of stack space and are managed by the Go runtime scheduler, meaning you can spawn millions of them. Channels are typed conduits through which goroutines communicate safely. The select statement lets you wait on multiple channel operations simultaneously. Common patterns include worker pools, fan-in/fan-out, and pipeline stages. The sync package provides lower-level primitives like WaitGroup (wait for a group of goroutines to finish), Mutex (mutual exclusion locks), and Once (run initialization code exactly once).',
                keyConcepts: [
                    'Goroutines: lightweight concurrent functions',
                    'Channels: unbuffered vs buffered',
                    'The select statement for multiplexing channels',
                    'sync.WaitGroup for waiting on goroutine completion',
                    'sync.Mutex and sync.RWMutex for shared state',
                    'Context package for cancellation and timeouts',
                    'Worker pool pattern',
                    'The "share memory by communicating" philosophy'
                ],
                practiceQuestions: [
                    { question: 'What happens if you send on an unbuffered channel with no receiver?', hint: 'The sending goroutine blocks until another goroutine reads from the channel.', difficulty: 'medium' },
                    { question: 'What is a data race and how do you detect it in Go?', hint: 'Two goroutines accessing shared data without synchronization. Use go run -race to detect.', difficulty: 'hard' },
                    { question: 'When would you use a buffered channel?', hint: 'When you want to decouple producers and consumers so the sender does not block immediately.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use the -race flag during development to detect data races.',
                    'Prefer channels over shared memory with mutexes when possible.',
                    'Use context.Context for cancellation, deadlines, and request-scoped data.',
                    'Close channels from the sender side, never from the receiver.',
                    'Use sync.WaitGroup to ensure all goroutines complete before program exit.'
                ]
            }
        },
        'go-standard-lib': {
            id: 'go-standard-lib',
            label: 'Standard Library',
            description: 'net/http, encoding/json, io, os, and the powerful built-in packages.',
            parentId: 'go-root',
            resources: [
                { type: 'documentation', title: 'Go Standard Library', url: 'https://pkg.go.dev/std', isFree: true },
                { type: 'article', title: 'Building a REST API with Go stdlib', url: 'https://go.dev/doc/tutorial/web-service-gin', isFree: true }
            ],
            content: {
                overview: 'Go has one of the most comprehensive standard libraries of any modern language. The net/http package alone is production-ready for building web servers and HTTP clients. encoding/json provides JSON marshaling and unmarshaling using struct tags. The io and os packages handle files, streams, and system operations. The testing package has built-in support for unit tests and benchmarks. Unlike most languages where you need frameworks for even basic tasks, Go developers are encouraged to use the standard library directly. Many production services at companies like Google, Uber, and Cloudflare use only the standard library for their HTTP servers.',
                keyConcepts: [
                    'net/http: HTTP server and client',
                    'encoding/json: JSON serialization with struct tags',
                    'io and bufio: Readers, Writers, and streaming',
                    'os and filepath: File system operations',
                    'fmt: Formatted I/O (Printf, Sprintf, Fprintf)',
                    'strings and strconv: String manipulation and conversion',
                    'time: Durations, timers, and tickers',
                    'log and slog: Structured logging'
                ],
                practiceQuestions: [
                    { question: 'How do you define JSON field names for a Go struct?', hint: 'Using struct tags like json:"field_name".', difficulty: 'easy' },
                    { question: 'How do you create a basic HTTP server in Go without any framework?', hint: 'Use http.HandleFunc to register handlers and http.ListenAndServe to start the server.', difficulty: 'easy' },
                    { question: 'What is the io.Reader interface and why is it important?', hint: 'It has a single Read method. Many packages accept io.Reader, enabling composable data processing.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use the standard library before adding third-party dependencies.',
                    'Always defer resp.Body.Close() when making HTTP requests.',
                    'Use struct tags to control JSON serialization (json:"name,omitempty").',
                    'Use http.TimeoutHandler to prevent slow clients from exhausting resources.'
                ]
            }
        },
        'go-frameworks': {
            id: 'go-frameworks',
            label: 'Web Frameworks',
            description: 'Gin, Echo, and Fiber for building REST APIs and web services.',
            parentId: 'go-root',
            resources: [
                { type: 'documentation', title: 'Gin Web Framework', url: 'https://gin-gonic.com/docs/', isFree: true },
                { type: 'documentation', title: 'Echo Framework', url: 'https://echo.labstack.com/', isFree: true },
                { type: 'documentation', title: 'Fiber - Express-inspired', url: 'https://gofiber.io/', isFree: true }
            ],
            content: {
                overview: 'While Go\'s standard net/http package is powerful enough for production, web frameworks add convenience features like routing with path parameters, middleware chains, request binding and validation, and structured error handling. Gin is the most popular Go web framework, known for its performance (thanks to a radix tree router) and Express.js-like syntax. Echo is another high-performance option with built-in support for WebSockets and HTTP/2. Fiber is inspired by Express.js and built on top of Fasthttp for ultra-low latency. For most projects, Gin or the standard library is recommended. The choice between a framework and the stdlib depends on the complexity of your routing and middleware needs.',
                keyConcepts: [
                    'HTTP routing with path parameters and groups',
                    'Middleware: logging, CORS, auth, rate limiting',
                    'Request binding and input validation',
                    'Response serialization (JSON, XML, HTML)',
                    'Error handling and custom error responses',
                    'GORM for database ORM integration'
                ],
                practiceQuestions: [
                    { question: 'When should you use a framework like Gin instead of net/http?', hint: 'When you need complex routing, middleware chains, and request validation that would be tedious with stdlib.', difficulty: 'medium' },
                    { question: 'What is middleware in the context of a Go web framework?', hint: 'A function that executes before or after a handler, commonly used for logging, auth, and CORS.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use middleware for cross-cutting concerns (logging, auth, CORS).',
                    'Validate all input at the controller layer before passing to services.',
                    'Use dependency injection to make handlers testable.',
                    'Keep handlers thin — business logic belongs in a service layer.'
                ]
            }
        },
        'go-testing': {
            id: 'go-testing',
            label: 'Testing in Go',
            description: 'Write tests, benchmarks, and fuzz tests using Go built-in testing tools.',
            parentId: 'go-root',
            resources: [
                { type: 'documentation', title: 'Go Testing Package', url: 'https://pkg.go.dev/testing', isFree: true },
                { type: 'article', title: 'Testing in Go - Blog Post', url: 'https://go.dev/doc/tutorial/add-a-test', isFree: true }
            ],
            content: {
                overview: 'Go has first-class testing support built into the language and toolchain. Test files are named *_test.go and test functions start with Test followed by a capitalized name. The go test command discovers and runs all tests automatically. Beyond basic unit tests, Go supports table-driven tests (a pattern where test cases are defined in a slice of structs), benchmarks (functions starting with Benchmark), and fuzz testing (introduced in Go 1.18) for discovering edge cases with random inputs. There is no need for assertion libraries; the standard pattern uses t.Errorf and t.Fatalf for reporting failures. For mocking, you define interfaces and provide mock implementations.',
                keyConcepts: [
                    'Test files and naming conventions (*_test.go)',
                    'Table-driven tests for comprehensive coverage',
                    'Benchmarks with testing.B',
                    'Fuzz testing with testing.F (Go 1.18+)',
                    'Test helpers and t.Helper()',
                    'Subtests with t.Run for organized output',
                    'Mocking via interfaces',
                    'Code coverage with go test -cover'
                ],
                practiceQuestions: [
                    { question: 'What is a table-driven test?', hint: 'A pattern where you define test cases as a slice of structs and loop over them.', difficulty: 'easy' },
                    { question: 'How does Go approach mocking without a mocking framework?', hint: 'By defining interfaces and providing mock implementations that satisfy them.', difficulty: 'medium' },
                    { question: 'What is fuzz testing and when would you use it?', hint: 'Automated testing with random inputs to find edge cases and parsing bugs.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use table-driven tests for any function with multiple input/output scenarios.',
                    'Run go test -race -cover regularly during development.',
                    'Use testdata/ directory for test fixtures and golden files.',
                    'Write benchmarks for performance-critical code paths.'
                ]
            }
        }
    }
};
