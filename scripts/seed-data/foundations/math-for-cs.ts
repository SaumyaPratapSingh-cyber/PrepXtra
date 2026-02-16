// Mathematics for Computer Science Seed Data
export const mathForCSTopics = [
    {
        title: "Mathematical Logic",
        slug: "math-logic",
        description: "Propositional and predicate logic, truth tables, and quantifiers.",
        order: 1, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Mathematical Logic

Logic is the foundation of computer science, from hardware design to software verification.

## 1. Propositional Logic
Deals with propositions that can be either True (T) or False (F).
- **Conjunction ($P \land Q$):** AND
- **Disjunction ($P \lor Q$):** OR
- **Negation ($\neg P$):** NOT
- **Implication ($P \implies Q$):** "If P then Q". Only false if $P$ is T and $Q$ is F.
- **Biconditional ($P \iff Q$):** "P if and only if Q".

## 2. Predicate Logic (First-Order Logic)
Adds variables and quantifiers to propositional logic.
- **Universal Quantifier ($\forall x$):** "For all x".
- **Existential Quantifier ($\exists x$):** "There exists an x".

## 3. Logical Equivalences
- **Double Negation**: $\neg(\neg P) \equiv P$
- **De Morgan's**: $\neg(P \land Q) \equiv \neg P \lor \neg Q$
- **Contrapositive**: $(P \implies Q) \equiv (\neg Q \implies \neg P)$

## 4. Tautology and Contradiction
- **Tautology**: A statement that is always true.
- **Contradiction**: A statement that is always false.
- **Satisfiable**: There exists at least one truth assignment that makes it true.
`, resources: []
    },
    {
        title: "Proof Techniques",
        slug: "proof-techniques",
        description: "Direct proofs, contradiction, and the art of mathematical induction.",
        order: 2, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Proof Techniques

Proving that a mathematical statement is true under all circumstances.

## 1. Direct Proof
Assume $P$ is true, and show through a series of logical steps that $Q$ must be true.
- **Example**: Prove that the sum of two even numbers is even.

## 2. Proof by Contraposition
To prove $P \implies Q$, we prove $\neg Q \implies \neg P$.
- Useful when $\neg Q$ is easier to work with than $P$.

## 3. Proof by Contradiction (Reductio ad absurdum)
Assume the negation of what you want to prove ($\neg P$), and show it leads to a logical impossibility.
- **Example**: Proof that $\sqrt{2}$ is irrational.

## 4. Mathematical Induction
Used for statements involving an integer $n$.
1. **Basis Step**: Show $P(1)$ is true.
2. **Inductive Step**: Assume $P(k)$ is true (Hypothesis), and show $P(k+1)$ is true.

## 5. Strong Induction
Assumes that $P(1), P(2), \dots, P(k)$ are all true to prove $P(k+1)$.
`, resources: []
    },
    {
        title: "Sets and Cardinality",
        slug: "sets-cardinality",
        description: "Infinite sets, Cantor's diagonal argument, and countability.",
        order: 3, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Sets and Cardinality

## 1. Set Basics
A set is an unordered collection of distinct objects.
- **Subset ($A \subseteq B$):** Every element of A is in B.
- **Power Set ($P(A)$):** The set of all subsets of A.

## 2. Cardinality ($|A|$)
The "size" of a set.
- **Finite Set**: Cardinality is a natural number.
- **Infinite Set**: Needs special comparison.

## 3. Countable vs Uncountable
- **Countable**: A set that has the same cardinality as the natural numbers ($\mathbb{N}$).
    - Integers ($\mathbb{Z}$) and Rationals ($\mathbb{Q}$) are **Countable**.
- **Uncountable**: Larger than $\mathbb{N}$.
    - Real Numbers ($\mathbb{R}$) are **Uncountable**.

## 4. Cantor's Diagonal Argument
A formal proof that the set of real numbers is uncountable. It showed that no matter how you list the reals, there is always a number missing.

## 5. Russell's Paradox
$S = \{x \mid x \notin x\}$ (The set of all sets that do not contain themselves).
Does S contain itself? Leads to a contradiction, showing that "naive set theory" needs formal axioms (ZFC).
`, resources: []
    },
    {
        title: "Relations and Partial Orders",
        slug: "relations-partial-orders",
        description: "Equivalence relations, Hasse diagrams, and lattices.",
        order: 4, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Relations and Partial Orders

## 1. Binary Relations
A subset of the Cartesian product $A \times B$.

## 2. Equivalence Relations
A relation that is **Reflexive, Symmetric, and Transitive**.
- It partitions a set into disjoint **Equivalence Classes**.

## 3. Partial Orders (Posets)
A relation that is **Reflexive, Anti-symmetric, and Transitive**.
- Examples: "$\leq$" on numbers, "$\subseteq$" on sets.
- **Hasse Diagrams**: A visual representation of a poset where loops and redundant edges are removed.

## 4. Lattices
A poset where every pair of elements has a:
- **Least Upper Bound (Join)**
- **Greatest Lower Bound (Meet)**

## 5. Applications
- Database schema design (Normalization).
- Access Control Lists (Hierarchies).
- Scheduling tasks (Topological sort).
`, resources: []
    },
    {
        title: "Asymptotic Analysis",
        slug: "asymptotic-analysis",
        description: "Big O, Omega, and Theta notations for algorithm complexity.",
        order: 5, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Asymptotic Analysis

Quantifying how the running time or memory usage of an algorithm grows with input size $n$.

## 1. Big O Notation ($O$)
Upper bound (Worst case). $f(n) = O(g(n))$ if $f(n) \leq c \cdot g(n)$ for large $n$.

## 2. Big Omega Notation ($\Omega$)
Lower bound (Best case). $f(n) = \Omega(g(n))$ if $f(n) \geq c \cdot g(n)$ for large $n$.

## 3. Big Theta Notation ($\Theta$)
Tight bound (Average case). Both $O$ and $\Omega$.

## 4. Common Growth Rates
- **$O(1)$**: Constant
- **$O(\log n)$**: Logarithmic (Binary Search)
- **$O(n)$**: Linear
- **$O(n \log n)$**: Linearithmic (Merge Sort)
- **$O(n^2)$**: Quadratic (Bubble Sort)
- **$O(2^n)$**: Exponential (Recursive Fibonacci)
- **$O(n!)$**: Factorial (Traveling Salesman)

## 5. Limit Rule
If $\lim_{n \to \infty} \frac{f(n)}{g(n)} = L$:
- If $L = 0$, $f(n) = o(g(n))$ (strictly smaller).
- If $0 < L < \infty$, $f(n) = \Theta(g(n))$.
- If $L = \infty$, $f(n) = \omega(g(n))$ (strictly larger).
`, resources: []
    },
    {
        title: "Information Theory",
        slug: "information-theory",
        description: "Entropy, channel capacity, and data compression limits.",
        order: 6, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Information Theory

Founded by Claude Shannon, it defines the fundamental limits of communication and data storage.

## 1. Entropy ($H$)
The measure of uncertainty or surprise in a random variable.
$$H(X) = -\sum P(x) \log_2 P(x)$$
- Entropy is maximized when all outcomes are equally likely.

## 2. Mutual Information
How much information is shared between two variables $X$ and $Y$.

## 3. Channel Capacity ($C$)
The maximum rate at which information can be sent over a noisy channel with zero error.
**Shannon-Hartley Theorem**: $C = B \log_2(1 + S/N)$ (B = Bandwidth, S/N = Signal-to-noise ratio).

## 4. Source Coding Theorem
Defines the limit of data compression (Entropy is the lower bound).

## 5. Error Correction
Adding redundancy to data so it can be recovered if corrupted (e.g., Hamming Codes, Reed-Solomon).
`, resources: []
    },
    {
        title: "Information Coding",
        slug: "information-coding",
        description: "Huffman coding, Hamming codes, and error correction.",
        order: 7, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Information Coding

## 1. Huffman Coding
A variable-length prefix-free code used for lossless data compression.
- Frequent characters get shorter codes.
- Rare characters get longer codes.

## 2. Parity Bits
Simple error detection.
- **Even Parity**: Add a bit to make total number of 1s even.
- **Odd Parity**: Add a bit to make total number of 1s odd.

## 3. Hamming Codes
Can **Detect and Correct** single-bit errors.
- Uses redundant parity bits at positions $2^n$ (1, 2, 4, 8...).

## 4. Checksums & CRC
- **Checksum**: Summing bytes together.
- **CRC (Cyclic Redundancy Check)**: Uses polynomial division. Used in Ethernet and Wi-Fi.

## 5. Gray Codes
Sequence where only one bit changes between successive values. Used in mechanical encoders to prevent errors during transitions.
`, resources: []
    },
    {
        title: "Foundations of Automata",
        slug: "automata-foundations",
        description: "DFA, NFA, and the world of state machines.",
        order: 8, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Foundations of Automata

Automata theory is the study of abstract machines and the problems they can solve.

## 1. Finite Automata (FA)
Machines with a finite number of states.
- **DFA (Deterministic)**: For every state and input, there is exactly one next state.
- **NFA (Non-deterministic)**: Can be in multiple states at once. **Equivalence**: Every NFA can be converted to a DFA ($2^n$ states max).

## 2. Regular Languages
Languages accepted by Finite Automata.
- Represented by **Regular Expressions**.

## 3. Transitions
- **$\epsilon$-transitions**: Changing state without consuming input.

## 4. Pumping Lemma for Regular Languages
A property that all regular languages must satisfy. Used to PROVE that a language is **NOT** regular (e.g., $0^n 1^n$ is not regular).

## 5. Myhill-Nerode Theorem
Defines the minimum number of states needed for a DFA for a given language.
`, resources: []
    },
    {
        title: "Turing Machines",
        slug: "turing-machines",
        description: "The universal model of computation and decidability.",
        order: 9, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Turing Machines (TM)

A mathematical model of computation that defines what it means to "calculate".

## 1. The Model
- An infinite tape divided into cells.
- A read/write head that can move Left (L), Right (R), or stay.
- A finite set of states (including Start, Accept, and Reject).

## 2. Church-Turing Thesis
Anything that can be computed by an algorithm can be computed by a Turing Machine.

## 3. Universal Turing Machine (UTM)
A TM that can simulate any other TM. This is the mathematical basis for the stored-program computer (Modern PC).

## 4. Decidability
- **Decidable**: A TM exists that always halts (Accepts or Rejects).
- **Recognizable**: A TM accepts if the string is in the language, but might loop forever if not.

## 5. The Halting Problem
Can we write a program that takes another program and its input and tells us if it will loop forever?
**Alan Turing proved NO**. This shows there are limits to what computers can ever do.
`, resources: []
    },
    {
        title: "Complexity Theory: P vs NP",
        slug: "p-vs-np",
        description: "Classifying problems by their difficulty and the million dollar question.",
        order: 10, estimatedMinutes: 80, difficulty: "Hard",
        content: `
# Complexity Theory: P vs NP

Classifying problems based on the resources (time/space) required to solve them.

## 1. Class P (Polynomial Time)
Problems that can be **solved** quickly (e.g., Sorting, Shortest Path).

## 2. Class NP (Nondeterministic Polynomial Time)
Problems where a solution can be **verified** quickly.
- All P problems are in NP ($P \subseteq NP$).

## 3. NP-Completeness
The "hardest" problems in NP. If you find a fast solution for one, you solve $P=NP$.
- **Examples**: Sudoku, Traveling Salesman, Knapsack.

## 4. NP-Hard
Problems at least as hard as the hardest problems in NP, but not necessarily in NP (e.g., Halting Problem).

## 5. P vs NP Question
Can everything that can be verified quickly also be solved quickly?
- Most computer scientists believe $P \neq NP$.
- Solving this earns you a **\$1 Million** Millennium Prize.
`, resources: []
    },
    {
        title: "Combinatorics: Advanced Counting",
        slug: "combinatorics-advanced",
        description: "Recurrence relations, generating functions, and pigeonholes.",
        order: 11, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Combinatorics: Advanced Counting

## 1. Recurrence Relations
Equations that define a sequence based on previous terms.
- **Fibonacci**: $F_n = F_{n-1} + F_{n-2}$.
- Used to analyze recursive algorithms (e.g., Master Theorem).

## 2. Generating Functions
Representing sequences as coefficients of power series.
- $1, 1, 1, \dots \iff \sum x^n = \frac{1}{1-x}$.

## 3. Permutations with Repetition
Formula for arranging $n$ items where some are identical.
$$\frac{n!}{n_1!n_2!\dots n_k!}$$

## 4. Catalan Numbers
Sequence used in counting structures like:
- Correctly parenthesized expressions.
- Binary trees with $n$ nodes.
$$C_n = \frac{1}{n+1} \binom{2n}{n}$$

## 5. Principle of Inclusion-Exclusion
Counting elements in the union of multiple sets by adding and subtracting intersections.
`, resources: []
    },
    {
        title: "Discrete Probability & Expectation",
        slug: "discrete-probability",
        description: "Probability in a discrete world, expectation, and variance.",
        order: 12, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Discrete Probability & Expectation

## 1. Probability Space
- **Sample Space ($\Omega$):** Set of all outcomes.
- **Event**: A subset of $\Omega$.

## 2. Random Variables (RVs)
A function from $\Omega$ to $\mathbb{R}$.
- **Bernoulli**: Coin flip (0 or 1).
- **Geometric**: Number of trials until first success.

## 3. Expectation ($E[X]$)
The "average" value of a random variable.
$$E[X] = \sum x \cdot P(X=x)$$
**Linearity of Expectation**: $E[X+Y] = E[X] + E[Y]$ (true even if X and Y are dependent!).

## 4. Conditional Probability
$P(A|B) = \frac{P(A \cap B)}{P(B)}$
- **Independence**: $P(A \cap B) = P(A)P(B)$.

## 5. Variance and Standard Deviation
Measuring how much the data spreads from the mean.
`, resources: []
    },
    {
        title: "Mathematical Foundations of Cryptography",
        slug: "crypto-math",
        description: "Modular inverse, Euler's totient, and public key math.",
        order: 13, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Math for Cryptography

Modern security relies on "hard" mathematical problems.

## 1. Modular Arithmetic (The Clock)
Calculations wrap around a modulus $n$.
- **Modular Inverse**: $x$ such that $ax \equiv 1 \pmod n$. Exists if $\gcd(a, n) = 1$.

## 2. Prime Factorization
Given $n = p \times q$, it is easy to multiply but very hard to factor (Basis of RSA).

## 3. Euler's Totient Function ($\phi(n)$)
The count of numbers up to $n$ that are coprime to $n$.
- If $n = p \times q$ (primes), $\phi(n) = (p-1)(q-1)$.

## 4. Discrete Logarithm Problem
Given $g^x \equiv y \pmod p$, find $x$.
- Used in Diffie-Hellman key exchange.

## 5. Elliptic Curve Cryptography (ECC)
Uses the algebraic structure of elliptic curves over finite fields. Provides same security as RSA but with much smaller keys.
`, resources: []
    },
    {
        title: "Group Theory Basics",
        slug: "group-theory",
        description: "Groups, rings, and algebraic structures for code and keys.",
        order: 14, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Group Theory

A group is a set $G$ with an operation $*$ that follows four axioms:
1. **Closure**: $a * b \in G$.
2. **Associativity**: $(a*b)*c = a*(b*c)$.
3. **Identity**: $e * a = a$.
4. **Inverse**: $a * a^{-1} = e$.

## 1. Abelian Groups
Groups where $a * b = b * a$ (Commutative).

## 2. Rings and Fields
Structures with TWO operations (Addition and Multiplication).
- **Field**: Every non-zero element has a multiplicative inverse (e.g., $\mathbb{R}$, $\mathbb{Q}$, Finite Fields).

## 3. Finite Fields (Galois Fields $GF(p)$)
Fields with a finite number of elements.
- Extremely important for:
    - **AES Encryption**.
    - **Error Correction Codes**.

## 4. Order of a Group
The number of elements in a group. Lagrange's theorem states the order of a subgroup must divide the order of the group.
`, resources: []
    },
    {
        title: "Linear Algebra: Modern Applications",
        slug: "linear-algebra-modern",
        description: "SVD, PageRank, and foundations of Data Science.",
        order: 15, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Linear Algebra in CS

How matrices and vectors power the modern web and AI.

## 1. Orthonormal Bases
Sets of vectors that are at right angles and have length 1.
- Simplifies many calculations in 3D graphics and physics engines.

## 2. Eigenvalues in Search
**The Google PageRank Algorithm**:
Computes the importance of a web page by finding the principal eigenvector of a massive "link matrix".

## 3. Singular Value Decomposition (SVD)
Factorizing any matrix into three components.
- Used for:
    - Recommender Systems (Netflix/Amazon).
    - Image compression.
    - Principal Component Analysis (PCA).

## 4. Latent Semantic Analysis (LSA)
Using linear algebra to understand the meaning of documents by finding relationships between words.

## 5. Tensors
Generalization of scalars (0D), vectors (1D), and matrices (2D) to higher dimensions. Powering Deep Learning (PyTorch/TensorFlow).
`, resources: []
    },
    {
        title: "Algebraic Structures in Design",
        slug: "algebraic-structures",
        description: "Semigroups, monoids, and functional programming concepts.",
        order: 16, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Algebraic Structures in Software

Modern software patterns (especially in Functional Programming) are based on math structures.

## 1. Semigroups
A set with an associative operation.
- Example: Lists with concatenation.

## 2. Monoids
A Semigroup with an **Identity element**.
- Numbers with Addition (0 is identity).
- Strings with Concatenation ("" is identity).
- **Why it matters**: Parallel computation. If a task is a monoid, you can split it across many servers safely.

## 3. Categories and Functors
- **Functor**: A mapping between categories that preserves structure (e.g., \`map()\` in JS/Python).

## 4. Distributed Systems
Concepts from Group theory (Consensus) help ensure all servers agree on the state of data.
`, resources: []
    },
    {
        title: "Predicate Logic & Verifiers",
        slug: "predicate-logic",
        description: "Formal verification, Z3 solver, and bug-free code.",
        order: 17, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Logic for Software Verification

## 1. Formal Methods
Using mathematical logic to prove that a program is correct (Bug-free).
- Used in critical systems (SpaceX, Medical devices, Kernels).

## 2. SAT Solvers
Programs that find out if a boolean formula can ever evaluate to True.
- **Z3 Theorem Prover**: A powerful tool by Microsoft used to check code for security bugs.

## 3. Model Checking
Exhaustively checking every possible state of a program to find bugs.

## 4. Floyd-Hoare Logic
Uses "Pre-conditions" and "Post-conditions" with logic to verify loops and assignments.
$$\{P\} C \{Q\}$$
(If P is true before C, then Q is true after C).
`, resources: []
    },
    {
        title: "Graph Theory: Coloring and Flow",
        slug: "graph-coloring-flow",
        description: "Network flow, vertex coloring, and bipartite matching.",
        order: 18, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Advanced Graph Theory

## 1. Vertex Coloring
Assigning colors so no two connected nodes share a color.
- **Chromatic Number ($\chi(G)$):** Minimum colors needed.
- **Applications**: Register Allocation in compilers, Exam Scheduling.

## 2. Bipartite Matching
Finding pairs between two groups (e.g., Jobs and Applicants).
- **Hall's Marriage Theorem**: Condition for a perfect matching.

## 3. Network Flow
Max flux through a network with capacities.
- **Ford-Fulkerson Algorithm**: Standard solution.
- **Max-Flow Min-Cut Theorem**: The maximum flow equals the smallest bottle-neck capacity.

## 4. Planar Graphs & Four Color Theorem
Any map can be colored with at most **4 colors**. Proved using computers in 1976.
`, resources: []
    },
    {
        title: "Information Entropy & Compression",
        slug: "entropy-compression",
        description: "Lempel-Ziv, Arithmetic coding, and the limits of ZIP.",
        order: 19, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Entropy and Compression

## 1. Arithmetic Coding
A superior alternative to Huffman coding. It encodes the entire message as a single number between 0 and 1.

## 2. Dictionary-Based Coding (LZW)
Finding repeated patterns and replacing them with shorter keys.
- **Lempel-Ziv (LZ77/LZ78)**: Used in ZIP files, Gzip, and the GIF format.

## 3. Lossy Compression Limits
How much data can we discard before the human eye/ear notices? (Psychoacoustics and Psychovisuals).

## 4. Kolmogorov Complexity
The length of the shortest possible program that produces a string. A measure of the "inherent" information in a string.
`, resources: []
    },
    {
        title: "Discrete Geometry & Graphics",
        slug: "discrete-geometry",
        description: "Math for 3D rendering, convex hulls, and collision.",
        order: 20, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Discrete Geometry for Graphics

## 1. Affine Transformations
Rotating, scaling, and moving objects in 3D using **Homogeneous Coordinates** (4x4 matrices).

## 2. Convex Hull
The smallest "rubber band" that encloses a set of points.
- **Gift Wrapping Algorithm**
- **Graham Scan**

## 3. Spatial Partitioning
Dividing space to speed up collision detection in games.
- **Quadtrees** (2D)
- **Octrees** (3D)
- **BSP Trees** (Doom-style levels)

## 4. Delaunay Triangulation
Creating a mesh from points such that every triangle is as "fat" as possible. Essential for terrain rendering and 3D modeling.
`, resources: []
    }
];
