// Compiler Design Seed Data
export const compilerDesignTopics = [
    {
        title: "Introduction to Compilers",
        slug: "compiler-introduction",
        description: "The phases of compilation: From source to machine code.",
        order: 1, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Introduction to Compilers

A compiler is a program that translates code written in a high-level language (Source) into a low-level language (Machine code).

## 1. The Phases of a Compiler
1. **Lexical Analysis (Scanner)**: Breaks code into tokens.
2. **Syntax Analysis (Parser)**: Checks structure against grammar (Parse Tree).
3. **Semantic Analysis**: Checks meaning (Type checking).
4. **Intermediate Code Generation**: Produces a generic, machine-independent code (e.g., 3-address code).
5. **Code Optimization**: Makes the code faster/smaller.
6. **Code Generation**: Produces targeted machine assembly.

## 2. Front-End vs Back-End
- **Front-End**: Machine-independent (Lexing, Parsing, Semantic).
- **Back-End**: Machine-dependent (Optimization, Code Gen).
- **Middleware**: Intermediate representation $(IR)$ that links them.

## 3. Compiler vs Interpreter
- **Compiler**: Translates the whole program at once. High performance.
- **Interpreter**: Translates and executes line-by-line. Faster development cycle.
- **JIT (Just-In-Time)**: Compiles code "on the fly" as it runs (Used in Java/Javascript).

## 4. Bootstrapping
Developing a compiler for a language using the same language (e.g., writing a C compiler in C).
`, resources: []
    },
    {
        title: "Lexical Analysis",
        slug: "lexical-analysis",
        description: "Tokens, Lexemes, and Finite Automata in scanners.",
        order: 2, estimatedMinutes: 45, difficulty: "Medium",
        content: `
# Lexical Analysis

The first phase of a compiler.

## 1. Lexemes vs Tokens
- **Lexeme**: A sequence of characters in the source code (e.g., \`if\`, \`counter\`, \`100\`).
- **Token**: The abstract name representing a lexeme (e.g., \`KEYWORD\`, \`IDENTIFIER\`, \`NUMBER\`).

## 2. Pattern Matching
Scanners use **Regular Expressions** to define tokens.
- \`[a-zA-Z][a-zA-Z0-9]*\` for identifiers.

## 3. Implementation
The scanner typically uses a **Deterministic Finite Automaton (DFA)** to recognize patterns efficiently.

## 4. Tools
- **LEX / FLEX**: A tool that generates a C scanner based on regular expressions.
`, resources: []
    },
    {
        title: "Syntax Analysis (Parsing)",
        slug: "syntax-analysis-parsing",
        description: "Context-Free Grammars and building the Parse Tree.",
        order: 3, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Syntax Analysis

The phase that checks if the sequence of tokens follows the rules of the language.

## 1. Context-Free Grammars (CFG)
Compilers use CFGs to define syntax.
- $E \to E + E \mid E \times E \mid id$

## 2. Parse Trees
A graphical representation of the hierarchy of the code.

## 3. Ambiguity
A grammar is ambiguous if it can produce two different parse trees for the same string (e.g., $1 + 2 \times 3$ could be $(1+2) \times 3$ or $1 + (2 \times 3)$).
- **Resolution**: Adding precedence and associativity rules to the grammar.

## 4. Error Recovery
When a user writes bad code, the parser shouldn't just crash. It tries to "recover" (e.g., skipping to the next semicolon) to find more errors.
`, resources: []
    },
    {
        title: "Top-Down Parsing",
        slug: "top-down-parsing",
        description: "Recursive Descent and LL(1) parsers.",
        order: 4, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Top-Down Parsing

Starts from the root (Start Symbol) and tries to derive the string.

## 1. Recursive Descent
A parser implemented as a set of recursive functions, one for each non-terminal in the grammar.
- **Backtracking**: If a choice fails, the parser goes back and tries another. (Slow).

## 2. Predictive Parsing (LL(1))
A non-backtracking top-down parser.
- **L**: Scans input Left-to-right.
- **L**: Produces a Leftmost derivation.
- **(1)**: Uses 1 token of lookahead.

## 3. FIRST and FOLLOW sets
Mathematical sets used to construct an LL(1) parsing table.
- **FIRST(A)**: Terminals that can appear at the start of a string derived from A.
- **FOLLOW(A)**: Terminals that can appear immediately after A.

## 4. Left Recursion
Top-down parsers cannot handle rules like $A \to A \alpha$. This results in infinite loops. It must be eliminated before parsing.
`, resources: []
    },
    {
        title: "Bottom-Up Parsing",
        slug: "bottom-up-parsing",
        description: "Shift-Reduce, LR, and LALR parsers.",
        order: 5, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Bottom-Up Parsing

Starts from the leaves (tokens) and works up towards the root.

## 1. Shift-Reduce Parsing
Basic technique:
- **Shift**: Move a token from input to the stack.
- **Reduce**: Replace a sequence on the stack that matches a rule's right-hand side with the rule's left-hand variable.

## 2. LR Parsing
- **L**: Left-to-right.
- **R**: Rightmost derivation in reverse.
- **Types**: SLR (Simple), LR(1) (Powerful), LALR (Balanced).

## 3. Handle Pruning
A "Handle" is a substring that matches a production rule and whose reduction leads back to the start symbol.

## 4. YACC / BISON
Tools that take a CFG and generate a C-based LALR parser.
`, resources: []
    },
    {
        title: "Semantic Analysis",
        slug: "semantic-analysis",
        description: "Type checking, scope analysis, and symbol tables.",
        order: 6, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Semantic Analysis

Ensuring that the program makes "sense", even if the syntax is correct.

## 1. Type Checking
- \`int x = "hello"\` is syntactically correct (Variable = Value) but semantically wrong.
- **Static Checking**: Done at compile time (C, Java).
- **Dynamic Checking**: Done at runtime (Python).

## 2. Scope Analysis
Ensuring a variable is declared before it is used and that shadowing rules are followed.

## 3. Symbol Table
A data structure (usually a Hash Table) that stores info about every identifier:
- Name, Type, Scope, Memory location.

## 4. Syntax-Directed Translation (SDT)
Attaching "Actions" to grammar rules. For example, when parsing an addition, the SDT might actually perform the math or generate the code for it.
`, resources: []
    },
    {
        title: "Intermediate Code Generation",
        slug: "intermediate-code-gen",
        description: "AST, Postfix, and Three-Address Code (3AC).",
        order: 7, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Intermediate Code Generation (ICG)

Produces a simpler version of the program before machine-specific optimization.

## 1. Three-Address Code (3AC)
A sequence of instructions of the form $x = y \text{ op } z$.
\`\`\`
t1 = y * z
t2 = x + t1
\`\`\`
- Pro: Very easy to optimize and translate to assembly.

## 2. Postfix Notation (Reverse Polish)
\`a + b * c\` $\to$ \`a b c * +\`.
- Used by stack-based virtual machines (JVM).

## 3. Abstract Syntax Tree (AST)
A simplified version of the Parse Tree that removes "junk" like parentheses and semicolons, focusing purely on operations.
`, resources: []
    },
    {
        title: "Run-time Environments",
        slug: "runtime-environments",
        description: "Activation records, Stack vs Heap, and calling conventions.",
        order: 8, estimatedMinutes: 55, difficulty: "Hard",
        content: `
# Run-Time Environments

How the compiled program manages memory as it executes.

## 1. Activation Records (Stack Frames)
A block of memory pushed onto the stack for every function call. Contains:
- Parameters.
- Return address.
- Local variables.
- Link to the previous frame.

## 2. Stack vs Heap
- **Stack**: Fast, automatic management (LIFO). For local data.
- **Heap**: Manual management (\`malloc\`/\`new\`). For data whose size or lifetime is unknown at compile time.

## 3. Static vs Dynamic Allocation
- **Static**: Variables with fixed addresses known at compile time.
- **Dynamic**: Addresses determined while the program is running.

## 4. Parameter Passing
- **Call by Value**: Copy of data.
- **Call by Reference**: Address of data.
`, resources: []
    },
    {
        title: "Code Optimization: Local",
        slug: "code-optimization-local",
        description: "Constant folding, dead code elimination, and Peep-hole optimization.",
        order: 9, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Local Code Optimization

Making code faster within a single basic block (linear code with no jumps).

## 1. Constant Folding
Calculating math at compile time.
\`x = 2 + 3\` $\to$ \`x = 5\`.

## 2. Constant Propagation
If we know \`x = 5\`, Replace all usages of \`x\` with \`5\`.

## 3. Dead Code Elimination
Removing code that has no effect on the output.
\`\`\`c
int x = 10; // Delete this line
return 5;
\`\`\`

## 4. Peep-hole Optimization
Moving a "Window" over the generated assembly and replacing bad sequences with good ones.
- Example: Replacing \`ADD R1, #1\` with \`INC R1\`.
`, resources: []
    },
    {
        title: "Code Optimization: Loops",
        slug: "loop-optimization",
        description: "Code motion, Strength reduction, and Induction variables.",
        order: 10, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Loop Optimization

Loops are where programs spend most of their time (90/10 rule).

## 1. Code Motion (Loop Invariant Removal)
Moving calculations that don't change inside the loop to the outside.
\`\`\`c
while(i < 100) {
  x = a + b; // Move this above the while
  sum += i * x;
}
\`\`\`

## 2. Strength Reduction
Replacing expensive operations with cheaper ones.
- Replacing \`x * 8\` with \`x << 3\`.
- Replacing multiplication inside a loop with addition.

## 3. Loop Unrolling
Increasing the loop body to reduce the number of checks and jumps.
`, resources: []
    },
    {
        title: "Code Generation",
        slug: "code-generation-final",
        description: "Instruction selection and Register allocation.",
        order: 11, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Code Generation

The final phase: Mapping Intermediate Code to specific Machine instructions.

## 1. Instruction Selection
Choosing the best machine op for an IR statement.
- One IR statement might map to 3 assembly lines, or 3 IR statements might map to 1 smart assembly line.

## 2. Register Allocation
Deciding WHICH values stay in the 16 available CPU registers and which are "Spilled" to slow RAM.
- This is an **NP-Complete** problem!
- Solved using **Graph Coloring** algorithms.

## 3. Evaluation Order
Changing the order of independent operations to minimize the number of registers needed.
`, resources: []
    },
    {
        title: "Data Flow Analysis",
        slug: "data-flow-analysis",
        description: "Reaching definitions and Live variable analysis.",
        order: 12, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Data Flow Analysis

Collecting information about the way variables change values over time for optimization.

## 1. Reaching Definitions
Finding out which "Definition" of a variable (e.g., \`x=10\`) might actually be the one being used at a certain point in the code.

## 2. Live Variable Analysis
Is a variable "Live"? (Will its current value be used again before it is overwritten?)
- If it's not live, we can immediately reuse its register for someone else.

## 3. Control Flow Graph (CFG)
A graph where nodes are basic blocks and edges represent jumps/loops. Analysis "Flows" through this graph.
`, resources: []
    },
    {
        title: "Symbol Table Management",
        slug: "symbol-table-mgmt",
        description: "Efficient data structures for billions of identifiers.",
        order: 13, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Symbol Tables

## 1. Requirements
- Fast Insertion.
- Fast Lookup.
- Handle nested scopes.

## 2. Data Structures
- **Lists/Arrays**: Slow ($O(n)$).
- **Binary Search Trees**: Good ($O(\log n)$).
- **Hash Tables**: Best ($O(1)$).

## 3. Scope Management
Using a "Stack" of Hash Tables.
1. When entering a \`{\`, push a new table.
2. When looking up, check current table $\to$ parent table $\to$ global.
3. When exiting \`}\`, pop the table.
`, resources: []
    },
    {
        title: "Error Handling & Recovery",
        slug: "compiler-error-handling",
        description: "Panic mode vs Phrase level recovery.",
        order: 14, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Error Handling

## 1. Goals
- Inform the user exactly where the error is.
- Don't stop at the first error.
- Don't report "Cascading" (fake) errors caused by the first one.

## 2. Recovery Strategies
- **Panic Mode**: Discard tokens until a "Synchronizing" token (like \`;\` or \`}\`) is found.
- **Phrase Level**: Insert a missing token or delete an extra one to make the phrase valid.
- **Error Productions**: Explicitly add "Common mistakes" to the grammar rules so the parser knows how to handle them.
`, resources: []
    },
    {
        title: "Just-In-Time (JIT) Compilation",
        slug: "jit-compilation",
        description: "The secret behind the speed of V8 and Java.",
        order: 15, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Just-In-Time (JIT) Compilation

## 1. The Strategy
Start by interpreting code (Fast startup).
Identify "Hot" functions (run many times).
Compile those hot functions to machine code while the program is running (Fast execution).

## 2. De-optimization
If a JIT-ed function makes a guess about a variable type that turns out to be wrong later, it must "De-optimize" back to the interpreter.

## 3. Profile-Guided Optimization (PGO)
Collecting data about how the program runs in the real world and re-compiling it based on those patterns.
`, resources: []
    },
    {
        title: "Linkers & Loaders",
        slug: "linkers-loaders",
        description: "Building the final executable and loading it into RAM.",
        order: 16, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Linkers & Loaders

## 1. The Linker
Combines multiple object files (.o) and libraries (.lib) into one executable.
- **Static**: Code for libraries is copied into your file (Large file, no dependencies).
- **Dynamic (DLL)**: Code stays in a separate file and is loaded at runtime (Small file, shared memory).

## 2. The Loader
The OS part that:
1. Allocates memory for the program.
2. Copies code/data from disk to RAM.
3. Resolves absolute addresses.
4. Jumps to the \`main()\` function.
`, resources: []
    },
    {
        title: "Garbage Collection Basics",
        slug: "garbage-collection-intro",
        description: "Reference Counting vs Mark-and-Sweep.",
        order: 17, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Garbage Collection (GC)

Automated memory management: Finding data in the heap that is no longer reachable and freeing it.

## 1. Reference Counting
Every object has a "Count" of how many people are using it. If count $\to$ 0, delete.
- **Problem**: Can't handle "Circular References" (A points to B, B points to A).

## 2. Mark-and-Sweep
1. **Mark**: Start from the global variables (Roots) and follow all pointers to mark reachable objects.
2. **Sweep**: Delete everything that wasn't marked.
- **Problem**: Causes "Stop the World" pauses.

## 3. Generational GC
Most objects die young. Divide heap into "Young" and "Old". Scan Young often and Old rarely. (Used in JVM).
`, resources: []
    },
    {
        title: "Syntax-Directed Translation (SDT)",
        slug: "sdt-sdts",
        description: "Synthesized vs Inherited attributes.",
        order: 18, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Syntax-Directed Translation

Attaching semantic rules to grammar productions.

## 1. Synthesized Attributes
The value of a node is calculated from its children.
- $E \to E_1 + T \implies E.\text{val} = E_1.\text{val} + T.\text{val}$

## 2. Inherited Attributes
The value of a node is determined by its parent or siblings. Used for type declarations where a keyword at the start applies to all following variables.

## 3. S-Attributed vs L-Attributed
- **S-Attributed**: Only uses synthesized. Can be easily handled by bottom-up parsers.
- **L-Attributed**: Uses synthesized and some restricted inherited. Handled by top-down parsers.
`, resources: []
    },
    {
        title: "Compiler Optimization: SSA Form",
        slug: "ssa-form",
        description: "Static Single Assignment and why compilers love it.",
        order: 19, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Static Single Assignment (SSA)

An intermediate representation where **every variable is assigned exactly once**.

## 1. Transformation
Instead of:
\`\`\`
x = 1
x = 2
y = x + 1
\`\`\`
SSA uses versions:
\`\`\`
x1 = 1
x2 = 2
y1 = x2 + 1
\`\`\`

## 2. Why it matters
SSA makes complex optimizations like **Global Value Numbering** and **Sparse Conditional Constant Propagation** much easier to implement because there is no confusion about which value a variable name holds.

## 3. Phi ($\phi$) Functions
A special mathematical construct used at the junction of two code paths (like an \`if-else\`) to decide which version of a variable to use.
`, resources: []
    },
    {
        title: "Modern Compiler Tools: LLVM",
        slug: "llvm-modern-compilers",
        description: "The architecture behind Clang, Swift, and Rust.",
        order: 20, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Modern Compiler Tools: LLVM

LLVM isn't a single compiler; it's a library for building them.

## 1. Three-Phase Architecture
- **Front-end**: (Clang for C, rustc for Rust). Translates to **LLVM IR**.
- **Optimizer**: A library of 100+ passes that work on LLVM IR.
- **Back-end**: Translates LLVM IR to 50+ architectures (x86, ARM, WebAssembly).

## 2. Why it won
Before LLVM, if you invented a language, you had to write a back-end for every CPU. With LLVM, you only write the front-end to LLVM IR, and you get "Free" support for every CPU in the world.

## 3. Cross-Compilation
Compiling for a different OS/CPU than the one you are currently using. LLVM makes this trivial.
`, resources: []
    }
];
