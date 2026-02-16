// Theory of Computation Seed Data — Enriched
export const theoryOfComputationTopics = [
    {
        title: "Introduction to Theory of Computation",
        slug: "toc-intro",
        description: "Alphabets, Strings, and Languages.",
        order: 1, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Introduction to Theory of Computation

Computer Science isn't just about writing code; it's about what *can* be computed and how efficiently.

## 1. Basic Definitions

| Term | Symbol | Definition | Example |
|------|--------|------------|---------|
| **Alphabet** | Σ (Sigma) | A finite, non-empty set of symbols. | Σ = {0, 1} (Binary), Σ = {a, b, ..., z} (English) |
| **String** | w | A finite sequence of symbols from Σ. | w = "0101", w = "cat" |
| **Length** | |w| | Number of symbols in the string. | |"010"| = 3 |
| **Empty String** | ε (epsilon) | A string with zero symbols. | |ε| = 0 |
| **Language** | L | A set of strings chosen from Σ*. | L = {all strings starting with 'a'} |

## 2. Operations on Languages

| Operation | Notation | Meaning |
|-----------|----------|---------|
| **Union** | L1 ∪ L2 | Strings in either L1 OR L2. |
| **Concatenation** | L1 • L2 | String from L1 followed by string from L2. |
| **Kleene Star** | L* | Zero or more concatenations of L. includes ε. |
| **Positive Closure** | L+ | One or more concatenations of L. (L* without ε). |

## 3. The Chomsky Hierarchy
A hierarchy of classes of formal grammars.

| Type | Grammar | Automaton | Example |
|------|---------|-----------|---------|
| **Type 3** | Regular | Finite Automaton (DFA/NFA) | Email validation patterns |
| **Type 2** | Context-Free | Pushdown Automaton (PDA) | Programming syntax (nested brackets) |
| **Type 1** | Context-Sensitive | Linear Bounded Automaton | Natural language (mostly) |
| **Type 0** | Unrestricted | Turing Machine | Any computable function |
`, resources: []
    },
    {
        title: "Deterministic Finite Automata (DFA)",
        slug: "dfa-basics",
        description: "State machines with deterministic transitions.",
        order: 2, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Deterministic Finite Automata (DFA)

A DFA is the simplest computational model. It has limited memory (states) and can only say "Yes" (Accept) or "No" (Reject) to a string.

## 1. Formal Definition (5-Tuple)
A DFA is defined as **M = (Q, Σ, δ, q0, F)**:

- **Q**: Finite set of states.
- **Σ**: Input alphabet.
- **δ**: Transition function (Q × Σ → Q). Given a state and input, go to EXACTLY ONE next state.
- **q0**: Start state (q0 ∈ Q).
- **F**: Set of accept states (F ⊆ Q).

## 2. Example: Strings ending in "01"
**Alphabet**: Σ = {0, 1}

\`\`\`mermaid
stateDiagram-v2
    [*] --> A
    A --> B : 0
    A --> A : 1
    B --> A : 0
    B --> C : 1
    C --> A : 1
    C --> B : 0
    C --> [*]
\`\`\`

- **State A**: Haven't seen "01" yet.
- **State B**: Saw "0". (Need "1" to win).
- **State C**: Saw "01". (Accept state).

## 3. Designing DFAs
**Tip**: States represent "what have I seen so far that is relevant?"
- To accept odd length strings: You need 2 states (Even, Odd).
- To accept strings divisible by 3: You need 3 states (Rem 0, Rem 1, Rem 2).
`, resources: []
    },
    {
        title: "Non-Deterministic Finite Automata (NFA)",
        slug: "nfa-basics",
        description: "Guessing the future with non-determinism.",
        order: 3, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Non-Deterministic Finite Automata (NFA)

An NFA is like a DFA, but with superpowers:
1. **Multiple transitions**: From one state on one input, you can go to MULTIPLE states simultaneously.
2. **Epsilon moves (ε)**: You can jump to a state without reading any input.

## 1. Formal Difference
The transition function **δ** changes:
- **DFA**: Q × Σ → Q (One next state)
- **NFA**: Q × (Σ ∪ {ε}) → P(Q) (Set of next states)

## 2. How NFA Computation Works
- Imagine parallel processing. If there are two paths for input '0', the NFA splits and follows **BOTH**.
- Calculating "Acceptance": If **ANY ONE** of the parallel paths ends in an accept state, the string is accepted.

## 3. Equivalence of DFA and NFA
**Theorem**: Every NFA has an equivalent DFA.
- If a language is recognized by an NFA, it is Regular.
- **Subset Construction Algorithm** converts an NFA to a DFA (though the DFA might have 2^n states).

**Why use NFAs?** They are much easier to design and often smaller than the equivalent DFA.
`, resources: []
    },
    {
        title: "Regular Expressions",
        slug: "regular-expressions",
        description: "Algebraic notation for regular languages.",
        order: 4, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# Regular Expressions (Regex)

A compact, algebraic way to describe Regular Languages. Used everywhere in programming for pattern matching.

## 1. Operators

| Operator | Name | Meaning | Example | Results |
|----------|------|---------|---------|---------|
| **|** | Union | a OR b | \`a+b\` | {a, b} |
| **.** | Concatenation | a THEN b | \`ab\` | {ab} |
| ***** | Kleene Star | 0 or more times | \`a*\` | {ε, a, aa, aaa...} |

## 2. Examples

| Regex | English Description | Matching Strings |
|-------|---------------------|------------------|
| \`01*\` | A '0' followed by any number of '1's | 0, 01, 011, 0111 |
| \`(0+1)*\` | Any binary string | ε, 0, 1, 00, 01, 10, 11 |
| \`0(0+1)*1\` | Starts with 0, ends with 1 | 01, 001, 011, 0101 |
| \`Σ*001Σ*\` | Contains substring "001" | 001, 10010, 00010 |

## 3. Equivalence
**DFA ≡ NFA ≡ Regular Expression**.
They all describe the exact same class of languages: **Regular Languages**.
`, resources: []
    },
    {
        title: "Closure Properties of Regular Languages",
        slug: "closure-properties-regular",
        description: "Proving languages are regular.",
        order: 5, estimatedMinutes: 50, difficulty: "Hard",
        content: `
# Closure Properties of Regular Languages

A class of languages is "closed" under an operation if applying that operation to languages in the class produces another language IN the same class.

## 1. Regular Languages are Closed Under:

| Operation | Explanation | Proof Idea |
|-----------|-------------|------------|
| **Union** | L1 ∪ L2 | Connect start of NFA1 and NFA2 to a new start state via ε. |
| **Concatenation** | L1 • L2 | Connect accept states of NFA1 to start of NFA2 via ε. |
| **Star** | L* | Loop accept states back to start state via ε. |
| **Intersection** | L1 ∩ L2 | Using De Morgan's Laws or Cross-Product Construction. |
| **Complement** | L' (Not L) | Swap Accept and Non-Accept states in the DFA. |
| **Reversal** | L^R | Reverse all arrows in NFA, swap start/accept. |

## 2. Why does this matter?
**Problem**: Prove that "Binary strings NOT containing 010" is regular.
**Proof**:
1. Let L1 = Strings containing "010". (Regular, easy to draw DFA).
2. We want complement of L1.
3. Since Regular Languages are closed under complement, L1' is also Regular. QED.
`, resources: []
    },
    {
        title: "Pumping Lemma for Regular Languages",
        slug: "pumping-lemma",
        description: " Proving a language is NOT regular.",
        order: 6, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# The Pumping Lemma

How do we prove a language is **NOT** Regular? For example, L = { 0^n 1^n | n ≥ 0 }. You can't design a DFA because you need infinite memory to count the 0s.

## 1. The Lemma Statement
If L is regular, there exists a number **p** (pumping length) such that any string **s** in L with length ≥ p can be divided into **xyz** satisfying:
1. **xy^i z ∈ L** for every i ≥ 0 (You can "pump" y).
2. **|y| > 0** (y is not empty).
3. **|xy| ≤ p** (The loop happens early).

## 2. Using it to Prove Non-Regularity (Proof by Contradiction)
**Task**: Prove L = { 0^n 1^n } is not regular.

1. **Assume** L is regular. Let **p** be the pumping length.
2. **Choose** a string s = 0^p 1^p. (Clearly in L, length is 2p ≥ p).
3. **Split** s into xyz where |xy| ≤ p.
   - Since |xy| ≤ p, and s starts with p zeros, **x and y consist entirely of zeros**.
   - Let y = 0^k (where k > 0).
4. **Pump** up: Consider x y^2 z (i.e., pump y twice).
   - We added more zeros, but kept ones the same.
   - New string has (p+k) zeros and p ones.
5. **Contradiction**: Number of 0s ≠ Number of 1s. So the pumped string is NOT in L.
6. Therefore, L is **NOT Regular**.
`, resources: []
    },
    {
        title: "Context-Free Grammars (CFG)",
        slug: "cfg-basics",
        description: "Recursive definition of languages.",
        order: 7, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Context-Free Grammars (CFG)

Regular expressions can't handle nested structures (like HTML tags or parentheses). CFGs can.

## 1. Components of a CFG
A CFG is a 4-tuple (V, Σ, R, S):
- **V**: Variables (Non-terminals) like A, B, S.
- **Σ**: Terminals (Alphabet) like 0, 1, (, ).
- **R**: Production Rules (Substitution rules).
- **S**: Start variable.

## 2. Example: { 0^n 1^n }
**Rule**: \`S → 0S1 | ε\`

**Derivation for "0011"**:
1. S
2. 0S1 (Apply S → 0S1)
3. 00S11 (Apply S → 0S1)
4. 00ε11 (Apply S → ε)
5. 0011

## 3. Example: Balanced Parentheses
**Rule**: \`S → (S) | SS | ε\`
Generates: \`()\`, \`(())\`, \`()()\`, etc.

## 4. Parse Trees
A visual representation of a derivation.
- **Root**: Start variable.
- **Leaves**: Terminals (the final string).
- **Internal Nodes**: Variables.

This is exactly how compilers understand code syntax (AST - Abstract Syntax Tree).
`, resources: []
    },
    {
        title: "Pushdown Automata (PDA)",
        slug: "pda-basics",
        description: "DFA with a Stack memory.",
        order: 8, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Pushdown Automata (PDA)

A PDA is to Context-Free Languages what a DFA is to Regular Languages.

## 1. PDA = Finite Automaton + Stack
A FA has finite memory. A PDA has infinite memory, but LIFO (Last-In, First-Out).

**Components**:
- **Input Tape** (Read-only)
- **Finite Control** (States)
- **Stack** (Push/Pop)

## 2. Recognizing { 0^n 1^n }
How a PDA solves this:
1. Read **0**s from input. For each **0**, **PUSH** a symbol (e.g., 'X') onto the stack.
2. When you see a **1**, **POP** an 'X' from the stack.
3. If stack is empty exactly when input ends, **ACCEPT**.
4. If stack empties too early (more 1s) or creates 'X's left over (more 0s), REJECT.

## 3. Deterministic vs Non-Deterministic PDA
Unlike FAs, **DPDA is NOT equivalent to NPDA**.
- **DPDA**: Accepts Deterministic Context-Free Languages (DCFL). Efficient to parse (used in compilers).
- **NPDA**: Accepts all Context-Free Languages (CFL).

**Hierarchy**: Regular ⊂ DCFL ⊂ CFL.
`, resources: []
    },
    {
        title: "Context-Free Pumping Lemma",
        slug: "cf-pumping-lemma",
        description: "Proving a language is NOT Context-Free.",
        order: 9, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Pumping Lemma for CFLs

Used to prove languages like L = { a^n b^n c^n } are NOT Context-Free. (A stack can match a's to b's, but then forgets the count for c's).

## 1. The Lemma Statement
If L is CFL, string s (length ≥ p) can be split into **uvxyz**:
1. **u v^i x y^i z ∈ L** for i ≥ 0. (Pump v and y together).
2. **|vy| > 0** (Something is being pumped).
3. **|vxy| ≤ p** (Pumpable part is localized).

## 2. Example Proof: { a^n b^n c^n }
1. Assume Regular. Pick s = a^p b^p c^p.
2. Try to split into uvxyz where |vxy| ≤ p.
3. Since |vxy| ≤ p, the substring vxy can cover:
   - Only a's
   - Only b's
   - Only c's
   - a's and b's
   - b's and c's
   - **Crucially**: It cannot cover a's AND c's simultaneously (too far apart).
4. If we pump v and y, we increase count of one or two symbols, but not all three.
5. The number of a, b, c will no longer be equal.
6. Contradiction → **Not CFL**.
`, resources: []
    },
    {
        title: "Turing Machines (TM)",
        slug: "turing-machines",
        description: "The ultimate model of computation.",
        order: 10, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Turing Machines (TM)

Invented by Alan Turing in 1936. A simple mathematical model that can compute **ANY** algorithm that can be computed.

## 1. Components
A TM has:
1. **Infinite Tape**: Divided into cells. Read/Write access.
2. **Head**: Can read symbol, write symbol, and move Left or Right.
3. **State Register**: Current state of control.

## 2. Transition Function
**δ(Current State, Read Symbol) → (Next State, Write Symbol, Move Direction)**

Example: \`δ(q0, 'a') = (q1, 'b', R)\`
"If in state q0 and read 'a', go to q1, overwrite 'a' with 'b', and move tape head Right."

## 3. Church-Turing Thesis
**"Anything computable by any physical machine can be computed by a Turing Machine."**
- This is an axiom, not a theorem, but holds true for every model ever invented (Lambda calculus, Quantum computers, DNA computing).
- A Python program is just a fancy Turing Machine.

## 4. Universal Turing Machine (UTM)
A TM that can simulate any other TM.
- Input: Description of machine M, Input string w.
- Output: What M does on w.
- **Analogy**: Your laptop (UTM) works the same hardware but runs different software (M).
`, resources: []
    },
    {
        title: "Decidability & The Halting Problem",
        slug: "decidability-halting",
        description: "Things computers CANNOT do.",
        order: 11, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Decidability & The Halting Problem

Can computers solve every problem? No.

## 1. Decidable vs Undecidable
- **Decidable Language**: A TM exists that accepts w if w ∈ L, and rejects w if w ∉ L. (Always halts: Yes/No).
- **Recognizable Language**: A TM accepts w if w ∈ L, but might loop forever if w ∉ L.
- **Undecidable**: No algorithm exists to solve it for all inputs.

## 2. The Halting Problem
**Problem**: Given a program P and input I, will P ever stop running?
**Answer**: Undecidable. You cannot write a program that checks if ANY program halts.

### Proof Sketch (Contradiction)
1. Assume \`Halt(P, I)\` exists.
2. Create \`Paradox(X)\`:
   \`\`\`python
   if Halt(X, X) is True:
       Loop Forever
   else:
       Stop
   \`\`\`
3. Run \`Paradox(Paradox)\`.
   - If it halts, it implies it loops forever.
   - If it loops, it implies it halts.
4. Contradiction. \`Halt()\` cannot exist.

## 3. Other Undecidable Problems
- **Post Correspondence Problem (PCP)**: Matching domino tiles.
- **Rice's Theorem**: Any non-trivial property of a program's behavior is undecidable. (e.g., "Does this function ever return 0?" is undecidable).
`, resources: []
    }
];
