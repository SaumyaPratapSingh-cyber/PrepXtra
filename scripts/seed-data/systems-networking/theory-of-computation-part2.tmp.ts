{
    title: "Time Complexity: Big O Notation",
        slug: "time-complexity-big-o",
            description: "Analyzing efficiency and growth rates.",
                order: 12, estimatedMinutes: 45, difficulty: "Medium",
                    content: `
# Time Complexity: Big O Notation

Time Complexity measures how the runtime of an algorithm grows as the input size (n) increases.

## 1. Asymptotic Notations

| Notation | Name | Meaning | Use Case |
|----------|------|---------|----------|
| **O(g(n))** | Big O | **Upper Bound** (Worst Case) | "This takes *at most* g(n) time." |
| **Ω(g(n))** | Big Omega | **Lower Bound** (Best Case) | "This takes *at least* g(n) time." |
| **Θ(g(n))** | Big Theta | **Tight Bound** (Average) | "This takes *exactly* g(n) time." |
| **o(g(n))** | Little o | Strict Upper Bound (<) | Like < vs ≤ |
| **ω(g(n))** | Little omega | Strict Lower Bound (>) | Like > vs ≥ |

## 2. Common Complexity Classes

| Class | Name | Example Algorithm |
|-------|------|-------------------|
| **O(1)** | Constant | Access array index |
| **O(log n)** | Logarithmic | Binary Search |
| **O(n)** | Linear | Loop through array |
| **O(n log n)** | Linearithmic | Merge Sort, Quick Sort |
| **O(n^2)** | Quadratic | Bubble Sort |
| **O(2^n)** | Exponential | Traveling Salesman (Brute Force) |
| **O(n!)** | Factorial | Generating Permutations |

## 3. Master Theorem
Used to solve recurrence relations of the form:
**T(n) = aT(n/b) + f(n)**
Where:
- **a**: number of subproblems.
- **n/b**: size of each subproblem.
- **f(n)**: cost of work done outside recursive calls.

**Compare**: n^(log_b a) vs f(n).
If n^(log_b a) > f(n), then T(n) = Θ(n^(log_b a)).
`, resources: []
},
{
    title: "Complexity Classes P and NP",
        slug: "p-vs-np",
            description: "The most famous open problem in CS.",
                order: 13, estimatedMinutes: 60, difficulty: "Hard",
                    content: `
# Complexity Classes P and NP

## 1. Class P (Polynomial Time)
**P** is the set of problems that can be **SOLVED** by a deterministic TM in polynomial time (O(n^k)).
- **Examples**: Sorting, Shortest Path, Primality Testing.
- These are "easy" or "efficiently solvable" problems.

## 2. Class NP (Nondeterministic Polynomial Time)
**NP** is the set of problems whose solution can be **VERIFIED** in polynomial time.
- **Example**: Sudoku. Solving it is hard. Checking if a filled grid is correct is easy (O(n^2)).
- **Example**: Factoring. Finding factors of a huge number is hard. Verifying 3 * 5 = 15 is easy.

**Key Insight**: P ⊆ NP. (If you can solve it easily, you can verify it easily).

## 3. The P vs NP Question
**Is P = NP?**
- If yes: Every problem whose solution can be quickly verified can also be quickly solved.
- This would break all modern cryptography (RSA relies on factoring being hard).
- Most computer scientists believe **P ≠ NP**, but no one has proved it.
`, resources: []
},
{
    title: "NP-Completeness & Reductions",
        slug: "np-completeness",
            description: "The hardest problems in NP.",
                order: 14, estimatedMinutes: 60, difficulty: "Hard",
                    content: `
# NP-Completeness & Reductions

How do we prove a problem is "hard"? By showing it's as hard as another known hard problem.

## 1. Polynomial-Time Reduction (A ≤p B)
If we can transform instances of Problem A into instances of Problem B in polynomial time, then:
- If B is easy, A is easy.
- If A is hard, B is hard.
- **Notation**: A ≤p B ("A reduces to B").

## 2. NP-Complete (NPC)
A problem L is NP-Complete if:
1. **L ∈ NP** (Verifiable in poly-time).
2. **Every problem in NP reduces to L** (Hardest in NP).

**Consequence**: If you find a poly-time algorithm for ANY NP-Complete problem, you solve ALL NP problems (P = NP).

## 3. Famous NPC Problems
- **SAT (Boolean Satisfiability)**: The first NPC problem (Cook-Levin Theorem).
- **3-SAT**: SAT with clauses of 3 variables.
- **Traveling Salesman Problem (TSP)**: Visit every city exactly once with minimum cost.
- **Clique**: Does graph G contain a fully connected subgraph of size k?
- **Knapsack**: Maximize value within weight limit.

## 4. NP-Hard
Problems that are at least as hard as NPC, but might not be in NP (e.g., Halting Problem).
`, resources: []
},
{
    title: "Space Complexity (L, NL, PSPACE)",
        slug: "space-complexity",
            description: "Counting memory usage instead of time.",
                order: 15, estimatedMinutes: 55, difficulty: "Hard",
                    content: `
# Space Complexity

How much memory (tape cells) does a TM need to solve a problem?

## 1. Definitions
- **SPACE(f(n))**: Problems solvable using O(f(n)) tape cells.
- **L (Log Space)**: Deterministic TM uses O(log n) space. (Pointers, counters).
- **NL (Nondeterministic Log Space)**: Nondeterministic TM uses O(log n) space.
- **PSPACE**: Problems solvable in polynomial space (O(n^k)).

## 2. Hierarchy
\`\`\`
L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME
\`\`\`
**Note**: We know L ≠ PSPACE, but we don't know where the breaks are. It's possible L = P!

## 3. Savitch's Theorem
**NSPACE(f(n)) ⊆ SPACE(f^2(n))**
- Any nondeterministic space computation can be simulated by a deterministic one with only a quadratic increase in space.
- **Implication**: PSPACE = NPSPACE. (Space is more powerful than Time).

## 4. PSPACE-Complete
The hardest problems in PSPACE.
- **Example**: Generalized Geography (Game), TQBF (True Quantified Boolean Formulas).
- Games like Chess and Go (on n*n boards) are typically PSPACE-hard or EXPTIME-hard.
`, resources: []
},
{
    title: "Randomized Algorithms (RP, ZPP, BPP)",
        slug: "randomized-complexity",
            description: "Using coin flips to compute faster.",
                order: 16, estimatedMinutes: 50, difficulty: "Hard",
                    content: `
# Randomized Complexity Classes

What if our TM has a "coin flip" state? It can make random choices.

## 1. Complexity Classes

| Class | Name | Error Type |
|-------|------|------------|
| **RP** | Randomized Polynomial | One-sided error. (If answer is Yes, can say Yes or No. If No, always says No). |
| **co-RP** | Complement RP | One-sided error. (If answer is No, can say Yes or No. If Yes, always says Yes). |
| **ZPP** | Zero-Error Probabilistic | No error allowed. (Returns "Yes", "No", or "Don't Know"). Expected poly-time. |
| **BPP** | Bounded-Error Probabilistic | Two-sided error. (Answer is correct with probability ≥ 2/3). |

## 2. Monte Carlo vs Las Vegas
- **Monte Carlo**: Fast, but might be wrong (BPP/RP).
- **Las Vegas**: Always correct, but runtime varies (ZPP). QuickSort is Las Vegas.

## 3. Significance
**BPP** is arguably the class of problems "efficiently solvable" in the real world.
- Primality Testing was in BPP for decades before AKS algorithm proved it's in P.
- Many believe **P = BPP**, meaning randomness doesn't actually help solve harder problems, just solves them faster.
`, resources: []
},
{
    title: "Quantum Computing Basics",
        slug: "quantum-computing-intro",
            description: "Qubits, Superposition, and BQP.",
                order: 17, estimatedMinutes: 60, difficulty: "Hard",
                    content: `
# Quantum Computing Basics

Quantum computers use quantum mechanics to process information.

## 1. Qubits vs Bits
- **Bit**: 0 OR 1.
- **Qubit**: α|0⟩ + β|1⟩. (Superposition of both 0 and 1).
- **Measurement**: Collapses the qubit to 0 or 1 based on probability.

## 2. Entanglement
Two qubits can be linked such that the state of one instantly determines the state of the other, even if separated by light-years ("Spooky action at a distance").

## 3. Quantum Algorithms
- **Shor's Algorithm**: Factors integers in polynomial time. (Breaks RSA).
- **Grover's Algorithm**: Searches unsorted DB in O(√N). (Quadratic speedup).

## 4. Class BQP (Bounded-Error Quantum Polynomial)
Problems solvable by a quantum computer in polynomial time with error probability < 1/3.
- **Relation**: P ⊆ BQP ⊆ PSPACE.
- Is NP ⊆ BQP? Unlikely. Quantum computers probably can't solve NP-Complete problems efficiently, but they can simulate quantum physics (which classical computers can't).
`, resources: []
},
{
    title: "Lambda Calculus",
        slug: "lambda-calculus",
            description: "The foundation of functional programming.",
                order: 18, estimatedMinutes: 55, difficulty: "Hard",
                    content: `
# Lambda Calculus (λ-calculus)

Invented by Alonzo Church (1930s). A formal system in mathematical logic for expressing computation based on function abstraction and application.

## 1. Syntax
Everything is a function. No numbers, no booleans, just functions.
- **Variable**: x
- **Abstraction**: λx.M (Function taking x, returning M).
- **Application**: M N (Apply function M to argument N).

## 2. Example: Identity Function
I = λx.x
(I a) → a

## 3. Example: True and False
- **True**: λx.λy.x (Takes two args, returns the first).
- **False**: λx.λy.y (Takes two args, returns the second).

## 4. Beta Reduction
The process of computing. Replacing the bound variable with the argument.
(λx.x) y → y

## 5. Significance
- It is Turing Complete.
- It is the basis of all Functional Programming languages (Haskell, Lisp, OCaml).
- Showing that simple substitution rules can compute *anything* is profound.
`, resources: []
},
{
    title: "Kolmogorov Complexity",
        slug: "kolmogorov-complexity",
            description: "Randomness vs Structure.",
                order: 19, estimatedMinutes: 50, difficulty: "Hard",
                    content: `
# Kolmogorov Complexity

What makes a string "random"?

## 1. Definition
The Kolmogorov complexity **K(s)** of a string **s** is the length of the shortest computer program (in a fixed language) that outputs **s**.

## 2. Examples
- **String A**: "01010101010101010101" (20 chars)
  - Program: \`print "01" * 10\` (Short program).
  - Low complexity. Not random.
- **String B**: "4c1j5b2p9m0q3d8f7h6g" (20 chars)
  - Program: \`print "4c1j5b2p9m0q3d8f7h6g"\` (Long program).
  - High complexity. Random.

## 3. Incompressibility
- If K(s) ≈ |s|, the string is incompressible(random).
- **Berry Paradox**: "The smallest positive integer not definable in fewer than twelve words." (This definition has fewer than twelve words).
- K(s) is **Uncomputable**. You can never know for sure if you found the shortest program.
`, resources: []
},
{
    title: "Church-Turing Thesis (Expanded)",
        slug: "church-turing-extended",
            description: "The physical limits of computation.",
                order: 20, estimatedMinutes: 50, difficulty: "Medium",
                    content: `
# The Extended Church-Turing Thesis

## 1. The Original Thesis
A function is algorithmically computable if and only if it is computable by a Turing Machine.
**Status**: Universally accepted definition of "computable".

## 2. The Extended Thesis (Efficiency)
**"Any physically realizable model of computation can be simulated by a deterministic Turing Machine with at most a polynomial slowdown."**
- Meaning: If a new fancy computer solves a problem in O(n), a normal PC can solve it in O(n^k).
- **Quantum Computing Challenge**: Shor's algorithm (Factoring) runs in O(log n) on Quantum, but no known polynomial algorithm exists for Classical.
- If Quantum Computers work as predicted, the **Extended** thesis is FALSE. (Quantum is exponentially faster for some problems).

## 3. Hypercomputation?
Can we build a machine more powerful than a TM?
- **Zeno Machine**: Performs 1st step in 1s, next in 0.5s, next in 0.25s... doing infinite steps in 2 seconds.
- **Why impossible?**: Planck time limits hardware speed; thermal noise; energy constraints.

> **Philosophical Insight**: The universe seems to process information. Is the universe itself a Turing Machine? (Digital Physics).
`, resources: []
}
];
