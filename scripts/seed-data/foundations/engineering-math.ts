// Engineering Mathematics Seed Data
export const engineeringMathematicsTopics = [
    {
        title: "Calculus Fundamentals",
        slug: "calculus-fundamentals",
        description: "Limits, continuity, derivatives, and rules of integration.",
        order: 1, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Calculus Fundamentals

Calculus is the mathematical study of continuous change.

## 1. Limits and Continuity
A limit describes the value a function approaches as the input approaches some value.
$$\lim_{x \to a} f(x) = L$$
A function is **continuous** if the limit exists and equals the function value at that point.

## 2. Differentiation (Derivatives)
Represents the instantaneous rate of change (slope of the tangent).
$$f'(x) = \frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

### Key Rules:
- **Power Rule**: $\frac{d}{dx}(x^n) = nx^{n-1}$
- **Product Rule**: $(uv)' = u'v + uv'$
- **Chain Rule**: $\frac{d}{dx}[f(g(x))] = f'(g(x))g'(x)$

## 3. Integration
The reverse of differentiation; used to find areas under curves.
- **Indefinite**: $\int f(x) dx = F(x) + C$
- **Definite**: $\int_{a}^{b} f(x) dx = F(b) - F(a)$

### Fundamental Theorem of Calculus
Relates differentiation and integration. It states that integration and differentiation are inverse operations.

## 4. Maxima and Minima
Used to find the peak or valley of a function.
- Find $f'(x) = 0$ to get critical points.
- If $f''(x) > 0$, it is a **Minimum**.
- If $f''(x) < 0$, it is a **Maximum**.
`, resources: []
    },
    {
        title: "Linear Algebra",
        slug: "linear-algebra",
        description: "Vector spaces, basis, and transformations.",
        order: 2, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Linear Algebra

Linear algebra is the study of vectors and linear mappings between them.

## 1. Vector Spaces
A collection of vectors that can be added together and multiplied by scalars.
- **Span**: All possible linear combinations of a set of vectors.
- **Linear Independence**: Vectors where none can be written as a combination of others.
- **Basis**: A set of linearly independent vectors that span the entire space.

## 2. Inner Product Processes
- **Dot Product**: $a \cdot b = \sum a_i b_i$
- **Orthogonality**: Two vectors are orthogonal if $a \cdot b = 0$.

## 3. Linear Transformations
A mapping $T: V \to W$ such that:
1. $T(u + v) = T(u) + T(v)$
2. $T(cu) = cT(u)$

## 4. Rank and Nullity
- **Rank**: Number of linearly independent rows or columns in a matrix.
- **Nullity**: Dimension of the null space.
- **Rank-Nullity Theorem**: $\text{Rank}(A) + \text{Nullity}(A) = n$ (where $n$ is columns).

### Code Example (Python/NumPy)
\`\`\`python
import numpy as np

# Creating vectors
v1 = np.array([1, 2, 3])
v2 = np.array([4, 5, 6])

# Dot Product
dot_product = np.dot(v1, v2)

# Linear combination
result = 2 * v1 + 3 * v2
print(result) # [14, 19, 24]
\`\`\`
`, resources: []
    },
    {
        title: "Probability and Statistics",
        slug: "probability-statistics",
        description: "Distributions, Bayes theorem, and random variables.",
        order: 3, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Probability and Statistics

## 1. Basic Probability
The measure of the likelihood that an event will occur.
$$P(A) = \frac{\text{favorable outcomes}}{\text{total outcomes}}$$

## 2. Bayes' Theorem
Describes the probability of an event based on prior knowledge of conditions.
$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$

## 3. Random Variables
- **Discrete**: Countable (e.g., number of coin flips).
- **Continuous**: Measurable (e.g., height, temperature).

## 4. Probability Distributions
- **Normal (Gaussian)**: Bell curve. Centered at mean $\mu$.
- **Bernoulli**: Single trial with two outcomes (Success/Failure).
- **Binomial**: Number of successes in $n$ trials.
- **Poisson**: Number of events in a fixed interval of time.

## 5. Descriptive Statistics
- **Mean**: Average value.
- **Median**: Middle value.
- **Mode**: Most frequent value.
- **Variance**: $\sigma^2 = \frac{\sum (x_i - \mu)^2}{n}$
- **Standard Deviation**: $\sigma = \sqrt{\text{Variance}}$
`, resources: []
    },
    {
        title: "Discrete Mathematics",
        slug: "discrete-mathematics",
        description: "Sets, relations, functions, and logic.",
        order: 4, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Discrete Mathematics

The study of mathematical structures that are fundamentally discrete rather than continuous.

## 1. Set Theory
- **Union ($A \cup B$):** Elements in either A or B.
- **Intersection ($A \cap B$):** Elements in both A and B.
- **Difference ($A - B$):** Elements in A but not in B.
- **Power Set ($P(A)$):** Set of all subsets of A. Size is $2^n$.

## 2. Relations and Functions
- **Reflexive**: $aRa$ for all $a$.
- **Symmetric**: $aRb \implies bRa$.
- **Transitive**: $aRb$ and $bRc \implies aRc$.
- **Equivalence Relation**: Reflexive + Symmetric + Transitive.

## 3. Mathematical Induction
A technique to prove a statement $P(n)$ is true for all $n$.
1. **Basis Step**: Prove $P(1)$ is true.
2. **Inductive Step**: Assume $P(k)$ is true, prove $P(k+1)$ is true.

## 4. Pigeonhole Principle
If $n$ items are put into $m$ containers, and $n > m$, then at least one container must contain more than one item.
`, resources: []
    },
    {
        title: "Graph Theory",
        slug: "graph-theory",
        description: "Nodes, edges, paths, and graph algorithms.",
        order: 5, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Graph Theory

A graph $G = (V, E)$ consists of vertices $V$ and edges $E$.

## 1. Basic Terminology
- **Degree**: Number of edges connected to a vertex.
- **Path**: Sequence of vertices connected by edges.
- **Cycle**: A path that starts and ends at the same vertex.
- **Connected Graph**: A path exists between every pair of vertices.

## 2. Types of Graphs
- **Directed (Digraph)**: Edges have a direction.
- **Undirected**: Edges have no direction.
- **Weighted**: Edges have values (weights).
- **Bipartite**: Vertices can be split into two sets with no edges within sets.

## 3. Trees
A connected graph with no cycles.
- A tree with $n$ vertices always has $n-1$ edges.

## 4. Important Concepts
- **Euler Path**: Path using every edge exactly once.
- **Hamiltonian Path**: Path visiting every vertex exactly once.
- **Planar Graph**: Can be drawn without crossing edges.

\`\`\`mermaid
graph LR
    A --- B
    B --- C
    C --- A
    C --- D
    D --- E
\`\`\`
`, resources: []
    },
    {
        title: "Combinatorics and Counting",
        slug: "combinatorics-counting",
        description: "Permutations, combinations, and counting principles.",
        order: 6, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Combinatorics

The art of counting without actually counting every item.

## 1. Fundamental Principles
- **Sum Rule**: If tasks A and B are independent, total ways = $n + m$.
- **Product Rule**: If task B follows A, total ways = $n \times m$.

## 2. Permutations ($P$)
Order MATTERS.
$$P(n, r) = \frac{n!}{(n-r)!}$$

## 3. Combinations ($C$)
Order does NOT matter.
$$C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}$$

## 4. Inclusion-Exclusion Principle
$$|A \cup B| = |A| + |B| - |A \cap B|$$

## 5. Binomial Theorem
$$(x+y)^n = \sum_{k=0}^{n} \binom{n}{k} x^{n-k} y^k$$
`, resources: []
    },
    {
        title: "Number Theory",
        slug: "number-theory",
        description: "Primes, divisibility, and modular arithmetic.",
        order: 7, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# Number Theory

The study of the properties of integers.

## 1. Divisibility and Primes
- **Divisibility**: $a | b$ means $b = ac$ for some integer $c$.
- **Prime Number**: Only divisible by 1 and itself.
- **Fundamental Theorem of Arithmetic**: Every integer $>1$ has a unique prime factorization.

## 2. GCD and LCM
- **GCD**: Greatest Common Divisor. Calculated using **Euclidean Algorithm**.
- **LCM**: Least Common Multiple.

## 3. Modular Arithmetic
Congruence relation: $a \equiv b \pmod n$ if $n$ divides $(a - b)$.
- $17 \equiv 2 \pmod 5$ because $17 - 2 = 15$, which is divisible by 5.

## 4. Fermat's Little Theorem
If $p$ is prime, for any integer $a$:
$$a^p \equiv a \pmod p$$

## 5. Chinese Remainder Theorem
Used to solve systems of simultaneous congruences with different moduli.
`, resources: []
    },
    {
        title: "Numerical Methods",
        slug: "numerical-methods",
        description: "Root finding, integration, and solving equations numerically.",
        order: 8, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Numerical Methods

Used when exact analytical solutions are difficult or impossible to find.

## 1. Root Finding
Finding $x$ such that $f(x) = 0$.
- **Bisection Method**: Repeatedly halving an interval.
- **Newton-Raphson Method**: Using derivatives for faster convergence.
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

## 2. Numerical Integration
- **Trapezoidal Rule**: Approximating area as trapezoids.
- **Simpson's Rules**: Approximating using parabolas.

## 3. Solving Linear Systems
- **Gauss Elimination**: Converting to upper triangular form.
- **Gauss-Seidel**: Iterative method.

## 4. Error Analysis
- **Truncation Error**: Due to approximating an infinite process.
- **Round-off Error**: Due to limited computer precision.
`, resources: []
    },
    {
        title: "Matrices & Determinants",
        slug: "matrices-determinants",
        description: "Matrix operations, properties of determinants, and inverse.",
        order: 9, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Matrices & Determinants

A matrix is a rectangular array of numbers.

## 1. Matrix Operations
- **Addition/Subtraction**: Element-wise. Matrices must have same dimensions.
- **Multiplication**: Row by Column. If A is $m \times n$ and B is $n \times p$, AB is $m \times p$.
- **Transpose ($A^T$)**: Swapping rows and columns.

## 2. Determinants ($|A|$)
A scalar value calculated from a square matrix.
- If $|A| = 0$, the matrix is **Singular** (no inverse).
- $|AB| = |A| \cdot |B|$
- $|A^T| = |A|$

## 3. Special Matrices
- **Identity ($I$)**: Diagonal is 1s, others 0. $AI = A$.
- **Symmetric**: $A = A^T$.
- **Orthogonal**: $A^T = A^{-1}$.

## 4. Matrix Inverse ($A^{-1}$)
$$A \cdot A^{-1} = I$$
Formula: $A^{-1} = \frac{1}{|A|} \text{adj}(A)$
`, resources: []
    },
    {
        title: "Systems of Linear Equations",
        slug: "linear-equations-systems",
        description: "Solving Ax = b using Cramer's rule and Matrix methods.",
        order: 10, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Systems of Linear Equations

A collection of linear equations involving the same set of variables.

## 1. Matrix Form
A system can be written as:
$$Ax = b$$
Where $A$ is the coefficient matrix, $x$ is the variable vector, and $b$ is the constant vector.

## 2. Types of Solutions
- **Consistent**: At least one solution.
    - **Unique**: Only one solution (Rank $A$ = Rank $[A|b]$ = Number of variables).
    - **Infinite**: Infinitely many (Rank $A$ = Rank $[A|b]$ < Number of variables).
- **Inconsistent**: No solution (Rank $A \neq$ Rank $[A|b]$).

## 3. Solution Methods
- **Cramer's Rule**: Uses determinants. Good for small systems.
- **Matrix Inverse Method**: $x = A^{-1}b$.
- **Gauss Elimination**: Most robust for computers.

## 4. Consistency Condition
For a system $Ax = b$, it is consistent if the constant vector $b$ lies in the column space of $A$.
`, resources: []
    },
    {
        title: "Eigenvalues and Eigenvectors",
        slug: "eigenvalues-eigenvectors",
        description: "Characteristic equations and diagonalization.",
        order: 11, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Eigenvalues and Eigenvectors

When a linear transformation $A$ acts on a vector $v$, if the result is a scalar multiple of $v$, then $v$ is an **eigenvector** and the scalar $\lambda$ is an **eigenvalue**.
$$Av = \lambda v$$

## 1. Characteristic Equation
To find $\lambda$, we solve:
$$|A - \lambda I| = 0$$

## 2. Properties
- Sum of eigenvalues = Trace of matrix.
- Product of eigenvalues = Determinant of matrix.
- Matrix $A$ and its transpose $A^T$ have same eigenvalues.

## 3. Cayley-Hamilton Theorem
Every square matrix satisfies its own characteristic equation. Highly useful for finding $A^{-1}$ or high powers of $A$.

## 4. Diagonalization
If a matrix has $n$ linearly independent eigenvectors, it can be diagonalized:
$$D = P^{-1}AP$$
Where $D$ is a diagonal matrix containing eigenvalues.
`, resources: []
    },
    {
        title: "Vector Calculus",
        slug: "vector-calculus",
        description: "Gradient, Divergence, Curl, and Line integrals.",
        order: 12, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Vector Calculus

Dealing with functions that map multidimensional space.

## 1. Gradient ($\nabla \phi$)
Vector of partial derivatives. Points in the direction of steepest increase.
$$\nabla \phi = \frac{\partial \phi}{\partial x}\hat{i} + \frac{\partial \phi}{\partial y}\hat{j} + \frac{\partial \phi}{\partial z}\hat{k}$$

## 2. Divergence ($\nabla \cdot F$)
Measures the "outward flow" from a point. Scalar result.
$$\text{div } F = \nabla \cdot F = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}$$

## 3. Curl ($\nabla \times F$)
Measures the rotation of a vector field. Vector result.

## 4. Important Theorems
- **Gauss Divergence Theorem**: Relates volume integral to surface integral.
- **Stokes' Theorem**: Relates surface integral to line integral.
- **Green's Theorem**: Specialized version for 2D.
`, resources: []
    },
    {
        title: "Differential Equations",
        slug: "differential-equations",
        description: "First and second order linear differential equations.",
        order: 13, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Differential Equations

Equations involve derivatives of a function. Used to model physical phenomena like heat, vibration, and circuits.

## 1. First Order Equations
$$\frac{dy}{dx} + P(x)y = Q(x)$$
Solved using an **Integrating Factor**: $IF = e^{\int P(x) dx}$.

## 2. Second Order Linear Homogeneous
$$a\frac{d^2y}{dx^2} + b\frac{dy}{dx} + cy = 0$$
Solved using the **Auxiliary Equation**: $am^2 + bm + c = 0$.

## 3. Nonlinear Equations
Often require numerical methods or approximations to solve.

## 4. Applications in CS
- Signal Processing.
- Control Systems.
- Modeling population growth or financial markets.
`, resources: []
    },
    {
        title: "Fourier Series & Transforms",
        slug: "fourier-series-transforms",
        description: "Frequency domain analysis and signal representation.",
        order: 14, estimatedMinutes: 80, difficulty: "Hard",
        content: `
# Fourier Analysis

The process of decomposing a function/signal into its constituent frequencies (sines and cosines).

## 1. Fourier Series
Representing a **periodic** signal as a sum of harmonics.
$$f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} (a_n \cos(nx) + b_n \sin(nx))$$

## 2. Fourier Transform (FT)
Extending the concept to **non-periodic** signals.
$$\mathcal{F}(\omega) = \int_{-\infty}^{\infty} f(t)e^{-i\omega t} dt$$

## 3. Discrete Fourier Transform (DFT)
Used in digital signal processing (DSP).

## 4. Fast Fourier Transform (FFT)
An efficient algorithm to compute DFT in $O(N \log N)$ time instead of $O(N^2)$. Essential for:
- Audio/Video compression (MP3, JPEG).
- Image processing.
- Solving partial differential equations.
`, resources: []
    },
    {
        title: "Laplace Transforms",
        slug: "laplace-transforms",
        description: "Transforming time domain to s-domain for circuit analysis.",
        order: 15, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Laplace Transforms

Converts differential equations into algebraic equations, making them easier to solve.

## 1. Definition
$$L\{f(t)\} = F(s) = \int_{0}^{\infty} e^{-st} f(t) dt$$

## 2. Common Transforms
- $L\{1\} = 1/s$
- $L\{e^{at}\} = 1 / (s-a)$
- $L\{\sin(at)\} = a / (s^2 + a^2)$

## 3. Properties
- **Linearity**: $L\{af + bg\} = aL\{f\} + bL\{g\}$
- **Shifting Theorem**: $L\{e^{at}f(t)\} = F(s-a)$

## 4. Inverse Laplace Transform
Used to go from $s$-domain back to time-domain $t$.

## 5. Applications
- Automatic Control Systems.
- Analog Circuit Design.
- Mechanical Vibrations.
`, resources: []
    },
    {
        title: "Z-Transforms",
        slug: "z-transforms",
        description: "The discrete version of Laplace for digital signals.",
        order: 16, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Z-Transforms

The Z-transform is the discrete-time equivalent of the Laplace transform.

## 1. Definition
$$X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n}$$

## 2. Region of Convergence (ROC)
The range of values of $z$ for which the summation converges.

## 3. Properties
- **Time Shifting**: $x[n-k] \iff z^{-k}X(z)$
- **Convolution in time** becomes **Multiplication in Z-domain**.

## 4. Difference Equations
Z-transforms are used to solve difference equations, which are fundamental in:
- Digital Filters (IIR, FIR).
- Recursive algorithms.
- Digital Control Systems.
`, resources: []
    },
    {
        title: "Optimization (Linear Programming)",
        slug: "optimization-linear-programming",
        description: "Maximizing/Minimizing objective functions under constraints.",
        order: 17, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Optimization (Linear Programming)

Finding the best outcome (such as maximum profit or lowest cost) in a mathematical model.

## 1. Components
- **Objective Function**: $Z = ax + by$ (to maximize/minimize).
- **Constraints**: Inequalities like $cx + dy \leq k$.
- **Non-negativity**: $x \geq 0, y \geq 0$.

## 2. Solution Methods
- **Graphical Method**: For 2 variables. Find the feasible region and check vertices.
- **Simplex Algorithm**: Iterative procedure for many variables.

## 3. Duality
Every Linear Program (Primal) has a corresponding Dual program. The optimal solution for both is related.

## 4. Applications in CS
- Network Flow optimization.
- Resource allocation in Cloud.
- Compiler optimizations.
`, resources: []
    },
    {
        title: "Complex Variables",
        slug: "complex-variables",
        description: "Analytic functions, residues, and contour integration.",
        order: 18, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Complex Variables

Mathematics involving $z = x + iy$ where $i^2 = -1$.

## 1. Analytic Functions
A function is analytic if it is differentiable at every point in a region.
- **Cauchy-Riemann Equations**: Necessary conditions for analyticity.
$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \quad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

## 2. Complex Integrals
- **Cauchy Integral Theorem**: If $f(z)$ is analytic, its integral around a closed path is 0.
- **Residue Theorem**: Allows computing difficult real integrals using complex analysis.

## 3. Conformal Mapping
Transformations that preserve angles. Used in 2D fluid flow and electrostatics.

## 4. Poles and Zeros
Points where a function goes to infinity (pole) or becomes zero. Essential for system stability analysis (Pole-Zero plots).
`, resources: []
    },
    {
        title: "Statistical Hypothesis Testing",
        slug: "hypothesis-testing",
        description: "P-values, Z-tests, T-tests, and null hypotheses.",
        order: 19, estimatedMinutes: 65, difficulty: "Medium",
        content: `
# Statistical Hypothesis Testing

A method of making decisions using data from a scientific study.

## 1. Hypotheses
- **Null Hypothesis ($H_0$)**: No effect or no difference.
- **Alternative Hypothesis ($H_1$)**: There is an effect or difference.

## 2. Error Types
- **Type I Error ($\alpha$)**: Rejecting $H_0$ when it's actually true (False Positive).
- **Type II Error ($\beta$)**: Failing to reject $H_0$ when $H_1$ is true (False Negative).

## 3. Testing Methods
- **Z-Test**: Used when sample size is large or variance is known.
- **T-Test**: Used when sample size is small ($n < 30$) and variance is unknown.
- **P-Value**: Probability of obtaining the observed results if $H_0$ is true. If $P < 0.05$, we reject $H_0$.

## 4. Chi-Square Test
Used for testing relationships between categorical variables.
`, resources: []
    },
    {
        title: "Regression and Correlation",
        slug: "regression-correlation",
        description: "Simple linear regression and statistical relationships.",
        order: 20, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Regression and Correlation

## 1. Correlation ($r$)
Measures the strength and direction of a linear relationship between two variables.
- Range: -1 to +1.
- $r = 1$: Perfect positive correlation.
- $r = 0$: No correlation.

## 2. Simple Linear Regression
Predicting $Y$ (dependent) based on $X$ (independent).
$$Y = \beta_0 + \beta_1 X + \epsilon$$

## 3. Least Squares Method
The goal is to minimize the sum of the squares of the differences (residuals) between observed and predicted values.

## 4. R-Squared ($R^2$)
Measures how well the regression line predicts the actual data. $R^2 = 1.0$ is perfect fit.

## 5. Multiple Regression
Using two or more variables to predict a single outcome.
`, resources: []
    }
];
