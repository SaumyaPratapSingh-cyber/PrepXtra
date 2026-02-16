// Theory of Computation Seed Data
export const theoryOfComputationTopics = [
    {
        title: "Automata & Finite State Machines",
        slug: "finite-automata",
        description: "DFA, NFA, and the foundations of formal languages.",
        order: 1, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Finite Automata (FA)

Automata theory is the study of abstract machines and the problems they can solve.

## 1. Deterministic Finite Automata (DFA)
For every state and every input symbol, there is exactly ONE transition to a next state.
- Formally a 5-tuple: $(Q, \Sigma, \delta, q_0, F)$.
- $Q$: States.
- $\Sigma$: Alphabet.
- $\delta: Q \times \Sigma \to Q$: Transition function.
- $q_0$: Start state.
- $F$: Set of Final (Accepting) states.

## 2. NFA (Non-deterministic)
Can have zero, one, or multiple transitions for the same input symbol.
- Can also have **$\epsilon$-transitions** (moving state without consuming input).
- **The Golden Rule**: NFA and DFA have the same power. Any NFA can be converted to an equivalent DFA (though the DFA might have $2^n$ states).

## 3. Regular Languages
A language is **Regular** if it can be recognized by a Finite Automata.

## 4. Mealy and Moore Machines
FA that produce output:
- **Mealy**: Output depends on (State, Input).
- **Moore**: Output depends on (State) only.
`, resources: []
    },
    {
        title: "Regular Expressions",
        slug: "regular-expressions-theory",
        description: "Defining patterns and Kleene's Theorem.",
        order: 2, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Regular Expressions (RE)

A algebraic way to describe regular languages.

## 1. Operators
- **Union (+ or |)**: Either R1 or R2.
- **Concatenation**: R1 followed by R2.
- **Kleene Star (*)**: Zero or more repetitions.

## 2. Kleene's Theorem
A language is regular **if and only if** it can be described by a Regular Expression.
- Path: RE $\leftrightarrow$ NFA $\leftrightarrow$ DFA.

## 3. Arden's Theorem
A method to find a Regular Expression for an Automata by solving equations ($R = Q + RP \implies R = QP^*$).

## 4. Identity Rules
- $R + R = R$
- $R + \emptyset = R$
- $R \cdot \epsilon = R$
- $(R^*)^* = R^*$
`, resources: []
    },
    {
        title: "Finite Automata Minimization",
        slug: "fa-minimization",
        description: "Myhill-Nerode Theorem and the table-filling method.",
        order: 3, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Minimization of DFA

Finding the simplest DFA with the minimum number of states that recognizes a language.

## 1. Distinguishable States
Two states $p$ and $q$ are distinguishable if there exists a string $w$ such that starting from $p$ with $w$ ends in an accepting state, but starting from $q$ ends in a non-accepting state (or vice-versa).

## 2. Table Filling Algorithm
1. Create a table of all pairs $(p, q)$.
2. Mark pairs where one is accepting and the other is not.
3. Iteratively mark pairs $(p, q)$ if their transitions for a symbol $(\delta(p, a), \delta(q, a))$ are already marked.
4. Merge all unmarked (equivalent) states.

## 3. Myhill-Nerode Theorem
States that the number of states in a minimal DFA is equal to the number of equivalence classes of the language. It provides a formal way to prove a language is regular (or not).
`, resources: []
    },
    {
        title: "Pumping Lemma: Regular Languages",
        slug: "pumping-lemma-regular",
        description: "Proving a language is NOT regular.",
        order: 4, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Pumping Lemma for Regular Languages

If a language $L$ is regular, there exists a number $p$ (pumping length) such that any string $s \in L$ with $|s| \ge p$ can be split into three parts, $s = xyz$, satisfying:
1. $xy^iz \in L$ for all $i \ge 0$.
2. $|y| > 0$.
3. $|xy| \leq p$.

## 1. How to use it (Proof by Contradiction)
To prove $L = \{0^n 1^n \mid n \ge 0\}$ is NOT regular:
1. Assume $L$ is regular. Let $p$ be the pumping length.
2. Pick string $s = 0^p 1^p$. Note $|s| = 2p \ge p$.
3. By lemma, $s = xyz$. Since $|xy| \le p$, $y$ must consist only of $0$s.
4. "Pump" $y$: $xy^2z$. This string has more $0$s than $1$s.
5. Contradiction! Therefore, $L$ is not regular.

## 2. Common Non-Regular Languages
- $a^n b^n$ (Counting).
- Palindromes.
- $a^p$ where $p$ is prime.
`, resources: []
    },
    {
        title: "Context-Free Grammars (CFG)",
        slug: "context-free-grammar",
        description: "Variables, terminals, and derivation trees.",
        order: 5, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Context-Free Grammars (CFG)

Used to describe programming languages and natural language structures.

## 1. Formal Definition (V, T, P, S)
- **V**: Variables (Non-terminals).
- **T**: Terminals (Actual symbols).
- **P**: Production rules ($A \to \alpha$).
- **S**: Start symbol.

## 2. Derivations
- **Leftmost**: Always replace the leftmost variable first.
- **Rightmost**: Always replace the rightmost.

## 3. Derivation Trees (Parse Trees)
A graphical representation of a derivation.
- **Ambiguity**: If a grammar produces two different parse trees for the same string, it is **Ambiguous**. (Bad for compilers!).

## 4. Sentential Form
The sequence of terminals and variables found in any step of a derivation.
`, resources: []
    },
    {
        title: "CFG Simplification & Normal Forms",
        slug: "cfg-normalization",
        description: "Chomsky (CNF) and Greibach (GNF) Normal Forms.",
        order: 6, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# CFG Normalization

Simplifying grammars to make them easier for machines to process.

## 1. Simplification Steps
1. **Remove Useless Symbols**: Symbols that never lead to terminals or are unreachable from start.
2. **Remove Unit Productions**: ($A \to B$).
3. **Remove Null Productions**: ($A \to \epsilon$).

## 2. Chomsky Normal Form (CNF)
Every rule is of the form:
- $A \to BC$ (Two variables).
- $A \to a$ (One terminal).
- *Pro*: Parse trees for CNF grammars are always binary trees.

## 3. Greibach Normal Form (GNF)
Every rule consists of one terminal followed by any number of variables:
- $A \to a \alpha$
- *Pro*: Every production step consumes exactly one input symbol.
`, resources: []
    },
    {
        title: "Pushdown Automata (PDA)",
        slug: "pushdown-automata",
        description: "Finite Automata + A Stack.",
        order: 7, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Pushdown Automata (PDA)

A PDA is essentially an NFA with a **Stack** (infinite memory).
- Can recognize $a^n b^n$ because it can "push" $a$s and "pop" them when it sees $b$s.

## 1. Formal Definition (7-tuple)
Adds $\Gamma$ (Stack alphabet) and $Z_0$ (initial stack symbol).

## 2. Acceptance Criteria
- **Final State**: Reach an accepting state at the end of the input.
- **Empty Stack**: Stack becomes empty at the end of input.
- Both are equivalent; a PDA of one type can be converted to the other.

## 3. DPDA (Deterministic PDA)
Unlike Finite Automata, **DPDA is less powerful than NPDA**.
- NPDAs can recognize all Context-Free Languages.
- DPDAs can only recognize a subset (Deterministic CFLs).
`, resources: []
    },
    {
        title: "The Pumping Lemma for CFLs",
        slug: "pumping-lemma-cfl",
        description: "Proving a language is NOT Context-Free.",
        order: 8, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Pumping Lemma for CFLs

If a language $L$ is context-free, any string $s \in L$ with $|s| \ge p$ can be split into $s = uvxyz$ such that:
1. $uv^ixy^iz \in L$ for all $i \ge 0$.
2. $|vy| > 0$.
3. $|vxy| \leq p$.

## 1. Proving $a^n b^n c^n$ is NOT CFL
1. Assume it's CFL. Let length be $p$.
2. Pick $s = a^p b^p c^p$.
3. By lemma, $s = uvxyz$. Since $|vxy| \le p$, it cannot contain both $a$s and $c$s.
4. Pumping $v$ and $y$ will change the count of some symbols but not others.
5. Contradiction!

## 2. Closure Properties of CFLs
- **Closed under**: Union, Concatenation, Kleene Star.
- **NOT closed under**: Intersection, Complementation.
`, resources: []
    },
    {
        title: "Turing Machines (TM)",
        slug: "turing-machines",
        description: "The universal model of computation.",
        order: 9, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Turing Machines

Developed by Alan Turing in 1936. A TM consists of a finite control and an infinite **Tape** with a read/write head.

## 1. Capabilities
- Can read/write symbols.
- Can move the head Left or Right.
- Can accept, reject, or **Halt** (and potentially loop forever).

## 2. Church-Turing Thesis
"Anything that can be computed by an algorithm can be computed by a Turing Machine."
- This is an unprovable hypothesis but accepted as the definition of "Computable".

## 3. TM Variations
- **Multi-tape TM**: More efficient but has the same power.
- **Non-deterministic TM**: Same power as Deterministic TM.
- **Universal Turing Machine (UTM)**: A TM that can simulate ANY other TM given its description and input. (The blueprint for the modern computer).
`, resources: []
    },
    {
        title: "The Chomsky Hierarchy",
        slug: "chomsky-hierarchy",
        description: "Classification of all formal languages.",
        order: 10, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# The Chomsky Hierarchy

| Type | Language | Automaton | Grammar |
|------|----------|-----------|---------|
| 0 | Recursively Enumerable | Turing Machine | Unrestricted |
| 1 | Context-Sensitive | Linear Bounded (LBA) | Context-Sensitive |
| 2 | Context-Free | Pushdown (PDA) | Context-Free |
| 3 | Regular | Finite (FA) | Regular |

## 1. Subset Relationship
Type 3 $\subset$ Type 2 $\subset$ Type 1 $\subset$ Type 0.

## 2. Context-Sensitive (Type 1)
Grammar rules $ \alpha A \beta \to \alpha \gamma \beta $. The symbol $A$ can only be replaced in the context of $\alpha$ and $\beta$.
`, resources: []
    },
    {
        title: "Recursive & RE Languages",
        slug: "recursive-re-languages",
        description: "Halt vs Loop: The boundary of computability.",
        order: 11, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Recursive vs R.E. Languages

## 1. Recursively Enumerable (RE)
A language is RE if there is a Turing Machine that **Accepts** every string in the language. For strings NOT in the language, the TM may **Reject** or **Loop forever**.

## 2. Recursive (Decidable)
A language is Recursive if there is a Turing Machine that always **Halts** — it either accepts if string is in L, or rejects if it's not. (No looping).

## 3. Relationship
Every Recursive language is RE, but not every RE language is Recursive.
- Complement of a Recursive language is Recursive.
- Complement of an RE language is RE **if and only if** the original language is also Recursive.
`, resources: []
    },
    {
        title: "Decidability & The Halting Problem",
        slug: "halting-problem",
        description: "Mathematical proof that some things cannot be known.",
        order: 12, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Decidability

A problem is **Decidable** if there exists an algorithm (TM) to solve it for all inputs.

## 1. The Halting Problem ($H$)
"Given a program and an input, will it eventually stop or run forever?"
- **Alan Turing proved this is UNDECIDABLE.**
- **Proof Sketch (Diagonalization)**: Assume a function \`H(P, i)\` exists. Create a program \`D(P)\` that loops if \`H(P, P)\` says it halts, and halts if it loops. If you run \`D(D)\`, you get a contradiction.

## 2. Implications
Since the Halting problem is undecidable, we cannot write a perfect compiler that tells you if your code has an infinite loop.

## 3. Undecidable Problems for CFGs
- Is a CFG Ambiguous?
- Is the intersection of two CFLs empty?
- Is a CFL equal to $\Sigma^*$?
`, resources: []
    },
    {
        title: "Rice's Theorem",
        slug: "rices-theorem",
        description: "A shortcut to proving undecidability.",
        order: 13, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Rice's Theorem

"Any non-trivial property of the language recognized by a Turing Machine is undecidable."

## 1. What is a Non-trivial Property?
A property that some RE languages have and some don't.
- *Decidable Examples (Trivial)*: "Does the TM have 5 states?" (Property of the TM itself, not the language).
- *Undecidable Examples*: 
    - Is the language empty?
    - Is the language finite?
    - Does it contain the string "hello"?

## 2. The Power of Rice
Instead of doing a long reduction from the Halting Problem for every new question, you just check if it's a property of the **Language**. If yes $\implies$ Undecidable.
`, resources: []
    },
    {
        title: "Complexity Classes: P vs NP",
        slug: "p-np-complexity",
        description: "Easy to solve vs Easy to check.",
        order: 14, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# P vs NP Complexity

## 1. Class P (Polynomial Time)
Problems that can be **Solved** by a Deterministic TM in $O(n^k)$ time. (e.g., Sorting, BFS).

## 2. Class NP (Non-deterministic Polynomial)
Problems where a solution can be **Verified** in Polynomial time.
- Alternatively: Solvable by a Non-deterministic TM in Polynomial time.

## 3. The $P \neq NP$ Question
The most famous unsolved problem in Computer Science. If $P=NP$, then it would be as easy to create a masterpiece as it is to recognize one.

## 4. Class co-NP
Complement of NP. Verification of "No" answers is easy. (e.g., "Is this number prime?").
`, resources: []
    },
    {
        title: "NP-Completeness",
        slug: "np-completeness",
        description: "The hardest problems in NP.",
        order: 15, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# NP-Completeness

A problem $B$ is NP-Complete if:
1. It is in NP.
2. Every other problem $A$ in NP can be **Reduced** to $B$ in polynomial time. ($A \le_p B$).

## 1. Why it matters
If you ever find a polynomial-time solution for ONE NP-Complete problem, you have solved EVERY problem in NP (proving $P=NP$).

## 2. Cook-Levin Theorem
First proved that **SAT** (Boolean Satisfiability) is NP-Complete.

## 3. Famous NP-Complete Problems
- **3-SAT**.
- **Traveling Salesperson (TSP)**.
- **Clique**.
- **Knapsack**.
- **Map Coloring**.
`, resources: []
    },
    {
        title: "Reducibility & Proofs",
        slug: "reduction-theory",
        description: "Converting one problem into another.",
        order: 16, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Reduction Theory

If we can transform problem $A$ into problem $B$ efficiently, then $B$ is at least as hard as $A$.

## 1. Many-One Reduction ($A \le_m B$)
A function $f$ that maps instances of $A$ to instances of $B$ such that $w \in A \iff f(w) \in B$.

## 2. Logic of Reduction
- If $B$ is decidable and $A \le B$, then $A$ is decidable.
- If $A$ is undecidable and $A \le B$, then $B$ is undecidable. (This is how we prove new things are impossible).

## 3. Polynomial Time Reduction ($A \le_p B$)
The mapping function runs in polynomial time. Used for complexity proofs.
`, resources: []
    },
    {
        title: "Post Correspondence Problem (PCP)",
        slug: "pcp-problem",
        description: "An undecidable problem unrelated to Turing Machines.",
        order: 17, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Post Correspondence Problem (PCP)

A puzzle about tiles.
- Given two sets of tiles (Top and Bottom), can we arrange them in a sequence such that the string formed by the tops matches the string formed by the bottoms?

## 1. The Shock
PCP is **Undecidable**. There is no algorithm to solve this for all possible tile sets.

## 2. Why it matters
It serves as a bridge to prove undecidability in other fields like formal grammars and logic, where Turing Machine reductions are too clumsy.
`, resources: []
    },
    {
        title: "Linear Bounded Automata (LBA)",
        slug: "lba-theory",
        description: "Turing Machines with a limit.",
        order: 18, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Linear Bounded Automata (LBA)

A Turing Machine where the tape is limited to the portion occupied by the input string.

## 1. Power
Recognizes **Context-Sensitive Languages** (Type 1).
- Can solve $a^n b^n c^n$.

## 2. Decidability
- Unlike standard TMs, the "Acceptance Problem" for LBAs is **Decidable** (because there are only a finite number of possible configurations).
- However, the "Emptiness Problem" for LBAs is still undecidable.
`, resources: []
    },
    {
        title: "Godel's Incompleteness Theorems",
        slug: "godel-incompleteness",
        description: "The limits of formal logic.",
        order: 19, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Godel's Incompleteness

Turing's work on the Halting problem was the CS version of Godel's math work.

## 1. First Theorem
"In any logical system strong enough to do basic arithmetic, there are true statements that cannot be proven within the system."

## 2. Second Theorem
"The consistency of such a system cannot be proven within the system itself."

## 3. Relationship to TOC
Computability and Provability are two sides of the same coin. A "Proof" is essentially a program that verifies a truth. If some truths are unprovable, some problems are uncomputable.
`, resources: []
    },
    {
        title: "Application: Compilers & Logic",
        slug: "toc-applications",
        description: "Lexing, parsing, and hardware verification.",
        order: 20, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Applications of TOC

TOC isn't just math; it powers your developer tools.

## 1. Lexical Analysis
Uses **Regular Expressions** and **NFAs** to break source code into tokens (Keywords, identifiers).

## 2. Syntax Analysis (Parsing)
Uses **Context-Free Grammars** and **PDAs** to build the structure of code (AST).

## 3. Protocol Verification
Automata are used to model and verify communication protocols (e.g., TCP/SSH) to ensure they never enter a deadlocked state.

## 4. Pattern Matching
The algorithms inside \`grep\`, \`sed\`, and your IDE's search are based on DFA/NFA implementations.
`, resources: []
    }
];
