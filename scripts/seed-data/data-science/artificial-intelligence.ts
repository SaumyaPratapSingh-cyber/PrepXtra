// Artificial Intelligence Seed Data
export const artificialIntelligenceTopics = [
    {
        title: "AI Foundations & Turing Test",
        slug: "ai-foundations",
        description: "What is AI? Defining intelligence and the classic Turing Test.",
        order: 1, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# AI Foundations

Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.

## 1. Defining AI
- **Thinking Humanly**: Cognitive modeling.
- **Thinking Rationally**: Laws of thought (Logic).
- **Acting Humanly**: The Turing Test approach.
- **Acting Rationally**: The Rational Agent approach (Modern standard).

## 2. The Turing Test
Proposed by Alan Turing in 1950. A human "interrogator" chats with a human and a machine. If the interrogator cannot tell which is which, the machine "passes".
- **Requirements for the Test**:
    - Natural Language Processing.
    - Knowledge Representation.
    - Automated Reasoning.
    - Machine Learning.

## 3. Strong AI vs Weak AI
- **Weak AI (Narrow AI)**: Designed for a specific task (e.g., Alexa, Siri, AlphaGo).
- **Strong AI (AGI)**: Artificial General Intelligence. A system with a soul/consciousness that can solve any problem a human can. (Currently theoretical).

## 4. The Chinese Room Argument
John Searle's famous counter to the Turing Test. He argues that even if a machine perfectly simulates intelligence, it doesn't "understand" what it's doing—it's just following a rulebook.
`, resources: []
    },
    {
        title: "History of AI & AI Winters",
        slug: "ai-history",
        description: "From the Dartmouth workshop to the modern LLM era.",
        order: 2, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# History of AI

## 1. The Birth (1950-1956)
- **1950**: Turing's paper "Computing Machinery and Intelligence".
- **1956**: The **Dartmouth Workshop**. John McCarthy coined the term "Artificial Intelligence".

## 2. The Golden Years (1956-1974)
High expectations. Computers played checkers, solved word problems, and spoke basic English.
- **ELIZA (1966)**: The first chatbot.

## 3. The first AI Winter (1974-1980)
Funding was cut. The Lighthill report in the UK and the ALPAC report in the US were highly critical of the lack of progress.
- **Problem**: Computers lacked the power to handle the "combinatorial explosion" of logic rules.

## 4. Expert Systems & 2nd Winter (1980-1993)
- **1980s**: Rise of "Expert Systems" (Rule-based programs for specific industries).
- **1987-1993**: 2nd AI Winter. Specialized AI hardware failed commercially as PCs became more powerful.

## 5. The Modern Era (1997-Present)
- **1997**: Deep Blue beats Garry Kasparov at Chess.
- **2012**: AlexNet wins ImageNet contest (The Deep Learning Revolution).
- **2022**: ChatGPT brings AI into the mainstream.
`, resources: []
    },
    {
        title: "Uninformed Search (BFS, DFS)",
        slug: "uninformed-search",
        description: "Traversing the state space without domain knowledge.",
        order: 3, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Uninformed Search

Also called "Brute Force" search. The algorithm only knows the goal and the possible actions.

## 1. Breadth-First Search (BFS)
- **Mechanism**: Explores layer by layer. Uses a **Queue** (FIFO).
- **Pros**: **Optimal** (finds the shortest path if costs are constant) and **Complete**.
- **Cons**: High memory usage ($O(b^d)$).

## 2. Depth-First Search (DFS)
- **Mechanism**: Goes as deep as possible before backtracking. Uses a **Stack** (LIFO).
- **Pros**: Low memory usage ($O(bd)$).
- **Cons**: **Not optimal** and may get stuck in infinite loops.

## 3. Depth-Limited & Iterative Deepening
- **Iterative Deepening Search (IDS)**: Combines the benefits. It runs DFS multiple times, increasing depth limit each time.
- **Result**: Finds shortest path (like BFS) but uses little memory (like DFS).

## 4. Uniform Cost Search (UCS)
Expands the node with the lowest path cost $g(n)$.
- Basis for **Dijkstra's Algorithm**.

\`\`\`mermaid
graph TD
    A --> B
    A --> C
    B --> D
    B --> E
    C --> F
    C --> G
\`\`\`
`, resources: []
    },
    {
        title: "Informed Search: A* & Heuristics",
        slug: "informed-search-astar",
        description: "Using 'hints' to find the goal faster.",
        order: 4, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Informed Search: A* Algorithm

Informed search uses domain-specific knowledge called a **Heuristic** $h(n)$.

## 1. The Evaluation Function
$$f(n) = g(n) + h(n)$$
- $g(n)$: Actual cost from start to node $n$.
- $h(n)$: Estimated cost from $n$ to goal (The Heuristic).
- $f(n)$: Total estimated cost of path through $n$.

## 2. Admissible Heuristics
A heuristic is **admissible** if it NEVER overestimates the cost to the goal.
- If $h(n)$ is admissible, A* is **Optimal**.

## 3. Popular Heuristics
- **Manhattan Distance**: Used on grids where only 4 directions are allowed (e.g., 8-puzzle).
- **Euclidean Distance**: Straight line distance (e.g., GPS navigation).

## 4. Greedy Best-First Search
Only uses $h(n)$. Very fast but not optimal (can get stuck in dead ends).

## 5. Applications
- GPS Routing (Google Maps).
- Video Game pathfinding (NPC movement).
- Robotics navigation.
`, resources: []
    },
    {
        title: "Adversarial Search (Minimax)",
        slug: "adversarial-search-minimax",
        description: "Searching in games with an opponent (Chess, Tic-Tac-Toe).",
        order: 5, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Adversarial Search

Games provide a controlled environment to test AI decision-making.

## 1. Minimax Algorithm
Used in two-player zero-sum games (one's gain is other's loss).
- **Max Player**: Tries to maximize their score.
- **Min Player**: Tries to minimize Max's score.
- **Recursion**: Max calls Min, Min calls Max, until a terminal state is reached.

## 2. Alpha-Beta Pruning
An optimization that allows the algorithm to ignore branches that can't possibly affect the final decision.
- **Alpha**: Best value Max can guarantee.
- **Beta**: Best value Min can guarantee.
- **Result**: Can double the search depth in the same amount of time.

## 3. Static Evaluation Function
In games like Chess, we can't search to the end (too many moves). We stop at a certain depth and "guess" who is winning based on pieces, position, and safety.

## 4. Monte Carlo Tree Search (MCTS)
Used for extremely complex games like Go. It uses random simulations to estimate the "worth" of a move. (Core of AlphaZero).
`, resources: []
    },
    {
        title: "Knowledge Representation",
        slug: "knowledge-representation",
        description: "Frames, Semantic Nets, and First-Order Logic.",
        order: 6, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Knowledge Representation (KR)

How to provide a computer with a "world model" so it can reason.

## 1. Semantic Networks
A graph representing relationships between objects.
- **Is-A**: Category (Bird is a Vertebrate).
- **Has-A**: Attribute (Bird has wings).

## 2. Frames
A data structure with "slots" for attributes. Imagine a "Class" in programming.

## 3. Predicate Logic (FOL)
Powerful logic that uses symbols, constants, and quantifiers.
- $\forall x \text{ Person}(x) \implies \text{Mortal}(x)$ (All people are mortal).
- $\text{Person}(\text{Socrates})$
- **Inference**: Socrates is mortal.

## 4. Ontologies
A formal naming and definition of the types, properties, and interrelationships of the entities for a particular domain (e.g., Medical ontology).

## 5. Procedural vs Declarative Knowledge
- **Declarative**: Facts (The capital of France is Paris).
- **Procedural**: How-to (How to fly a plane).
`, resources: []
    },
    {
        title: "Reasoning and Inference",
        slug: "reasoning-inference",
        description: "Forward vs Backward chaining in expert systems.",
        order: 7, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Reasoning and Inference

Inference is the process of generating new facts from existing knowledge.

## 1. Forward Chaining
- **Start**: From known data.
- **Action**: Apply rules to find more data.
- **Direction**: Bottom-up.
- **Use**: Monitoring and control (e.g., detecting a system failure).

## 2. Backward Chaining
- **Start**: From a goal (a hypothesis).
- **Action**: Work backward to see if known facts support it.
- **Direction**: Top-down.
- **Use**: Diagnostic systems (e.g., medical diagnosis).

## 3. Resolution
A powerful inference rule that uses "proof by contradiction" in logic.
- If we have $(A \lor B)$ and $(\neg B \lor C)$, we can conclude $(A \lor C)$.

## 4. Monotonic vs Non-Monotonic Reasoning
- **Monotonic**: Adding new info never invalidates old facts.
- **Non-Monotonic**: New info can change our beliefs (e.g., learning that Tweety is a penguin invalidates the general rule "Birds can fly").
`, resources: []
    },
    {
        title: "Expert Systems",
        slug: "expert-systems",
        description: "Rule-based engines for domain-specific intelligence.",
        order: 8, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Expert Systems

Software that mimics the decision-making ability of a human expert in a specific field.

## 1. Architecture
1. **Knowledge Base**: Facts and if-then rules from human experts.
2. **Inference Engine**: The "brain" that applies rules to data.
3. **User Interface**: Lets users input data and get advice.
4. **Explanation Module**: Explains *why* the system made a choice.

## 2. Famous Examples
- **MYCIN**: For diagnosing bacterial infections (outperformed many doctors!).
- **DENDRAL**: Analyzed chemical structures.
- **XCON**: Configured computer systems for DEC.

## 3. Pros and Cons
- **Pros**: Consistent, 24/7 availability, works in dangerous environments.
- **Cons**: Cannot learn on their own, "brittle" (fails if the problem is outside its narrow rules), hard to maintain.

\`\`\`mermaid
graph LR
    User --> UI
    UI --> Engine[Inference Engine]
    Engine --- KB[Knowledge Base]
    Engine --- Exp[Explanation Module]
\`\`\`
`, resources: []
    },
    {
        title: "Fuzzy Logic Systems",
        slug: "fuzzy-logic",
        description: "Handling uncertainty and 'shades of gray' in logic.",
        order: 9, estimatedMinutes: 45, difficulty: "Medium",
        content: `
# Fuzzy Logic

Traditional logic is Binary (0 or 1). Fuzzy logic handles truth values between 0 and 1.

## 1. Membership Functions
Used to define how much an element belongs to a set.
- *Example*: In a set "Cold", 5°C might have memberhsip 1.0, while 15°C has 0.4, and 25°C has 0.0.

## 2. Linguistic Variables
Using words instead of numbers (e.g., "Very Hot", "Slow", "High Speed").

## 3. The Process
1. **Fuzzification**: Converting crisp inputs (e.g., Temp=20°C) into fuzzy values.
2. **Rule Evaluation**: If (Temp is Warm) and (Humidity is High) then (Fan is Med).
3. **Aggregation**: Combining results.
4. **Defuzzification**: Converting fuzzy result back to a crisp output (e.g., Fan Speed=60%).

## 4. Applications
- Washing machines (adjusting water based on dirt).
- Anti-lock braking systems (ABS).
- Industrial control systems.
`, resources: []
    },
    {
        title: "Genetic Algorithms",
        slug: "genetic-algorithms",
        description: "Bio-inspired optimization: Crossover, Mutation, and Fitness.",
        order: 10, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Genetic Algorithms (GA)

Optimization and search techniques inspired by Darwin's theory of evolution.

## 1. How it works
1. **Population**: Start with a random set of "Chromosomes" (Solutions).
2. **Fitness**: Evaluate how good each solution is.
3. **Selection**: Best solutions are chosen as "Parents".
4. **Crossover**: Combine parts of two parents to create "Children".
5. **Mutation**: Randomly change bits of a solution to maintain diversity.
6. **Repeat**: Until an optimal solution is found.

## 2. Use Cases
- Antenna design (NASA used GAs).
- Airline scheduling.
- Hyperparameter tuning for other ML models.

## 3. The Objective Function
The "Fitness Function" is the most critical part; it tells the algorithm exactly what "success" looks like.

## 4. Exploration vs Exploitation
- **Crossover** explores existing knowledge.
- **Mutation** prevents the algorithm from getting stuck in local optima.
`, resources: []
    },
    {
        title: "Natural Language Processing (NLP)",
        slug: "nlp-basics",
        description: "Tokenization, Stemming, and Sentiment Analysis.",
        order: 11, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# Natural Language Processing (NLP)

Equipping computers to understand, interpret, and generate human language.

## 1. Text Preprocessing
- **Tokenization**: Splitting sentences into individual words/tokens.
- **Stop-word removal**: Deleting common words like "the", "and", "is".
- **Stemming/Lemmatization**: Reducing words to their root form (e.g., "Running" $\to$ "Run").

## 2. Feature Extraction
Computers don't understand text; they understand numbers.
- **Bag of Words (BoW)**: Counting word occurrences.
- **TF-IDF**: Weighing words by importance (rare words often mean more).
- **Word Embeddings (Word2Vec)**: Mapping words into a vector space where similar meanings are "close" together.

## 3. Key Tasks
- **Sentiment Analysis**: Is this review positive or negative?
- **Named Entity Recognition (NER)**: Identifying names of people, places, and brands.
- **Machine Translation**: Google Translate.

## 4. The Challenge
Ambiquity! "I saw a man on a hill with a telescope" (Who has the telescope?).
`, resources: []
    },
    {
        title: "Large Language Models & Transformers",
        slug: "llms-transformers",
        description: "Attention mechanism, GPT, and the future of chat.",
        order: 12, estimatedMinutes: 75, difficulty: "Hard",
        content: `
# Large Language Models (LLMs)

The modern era of AI is powered by the **Transformer** architecture (introduced by Google in 2017).

## 1. The Attention Mechanism
Allows the model to "focus" on relevant parts of the input, no matter how far away they are.
- *Example*: In "The animal didn't cross the street because **it** was too tired," Attention helps the model connect "it" to "animal".

## 2. Pre-training and Fine-Tuning
1. **Pre-training**: Model reads the entire internet to learn the structure of language (Self-supervised).
2. **Fine-Tuning**: Teaching the model specific tasks like medical advice or coding.

## 3. Generative AI
Unlike older models that classified text, these models **Predict the next token** in a sequence, allowing them to write stories, code, and essays.

## 4. RLHF (Reinforcement Learning from Human Feedback)
The secret sauce of ChatGPT. Humans rate AI answers, and a reward model is trained to punish "bad" behaviors and reward "helpful" ones.

## 5. Hallucinations
When an LLM generates facts that look plausible but are totally false. A major current challenge in AI research.
`, resources: []
    },
    {
        title: "Computer Vision",
        slug: "computer-vision-ai",
        description: "CNNs, Object Detection, and Image Generation.",
        order: 13, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Computer Vision

Enabling machines to "see" and interpret visual information.

## 1. Convolutional Neural Networks (CNN)
Inspired by the human visual cortex. They use "Filters" to look for patterns like edges, shapes, and finally objects.
1. **Convolution Layer**: Detects features.
2. **Pooling Layer**: Reduces size and parameters.
3. **Fully Connected Layer**: Makes the final classification.

## 2. Object Detection
Not just "What is in the photo?" (Classification) but "Where is it?" (Bounding Box).
- **YOLO (You Only Look Once)**: Real-time object detection used in self-driving cars.

## 3. Semantic Segmentation
Labeling every single pixel (e.g., defining exactly where the "Road" versus "Sidewalk" is).

## 4. Generative Vision (GANs & Diffusion)
- **GANs**: Two models competing (one makes fake images, one tries to catch them).
- **Stable Diffusion**: Gradually removing "noise" from an image until a clear picture emerges from a text prompt.
`, resources: []
    },
    {
        title: "AI Agents & Rationality",
        slug: "ai-agents-rationality",
        description: "Simple reflex vs Goal-based agents in complex environments.",
        order: 14, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# AI Agents

An agent is anything that perceives its environment through sensors and acts upon it through actuators.

## 1. What is a Rational Agent?
An agent that acts to achieve the best outcome (or best expected outcome when there is uncertainty).

## 2. Types of Agents
- **Simple Reflex**: Only reacts to the current state (If smoke, sound alarm).
- **Model-Based**: Keeps track of the "internal state" (What the world looks like now).
- **Goal-Based**: Acts to achieve a specific destination or goal.
- **Utility-Based**: Tries to maximize a "Happiness" or "Score" function.

## 3. Environment Types
- **Observable vs Partially Observable**: Do we see everything (Chess) or part of it (Poker)?
- **Deterministic vs Stochastic**: Is the result of an action certain or random?
- **Static vs Dynamic**: Does the world change while the agent is thinking? (Self-driving car = Dynamic).

## 4. Multi-Agent Systems
When many agents interact, compete, or collaborate (e.g., drones in a swarm).
`, resources: []
    },
    {
        title: "Probabilistic Reasoning: Bayes Nets",
        slug: "probabilistic-reasoning",
        description: "Directed acyclic graphs and conditional independence.",
        order: 15, estimatedMinutes: 70, difficulty: "Hard",
        content: `
# Probabilistic Reasoning

In the real world, data is noisy and incomplete. AI uses probability to handle this uncertainty.

## 1. Bayesian Networks
A Directed Acyclic Graph (DAG) where nodes are variables and edges are causal dependencies.
- **Local Markov Property**: Each node is conditionally independent of its non-descendants given its parents.

## 2. Joint Probability Distribution
Calculating the probability of all variables happening together.

## 3. Exact vs Approximate Inference
- **Exact (Variable Elimination)**: mathematically calculating the answer.
- **Approximate (MCMC)**: Using random simulations (Sampling) to estimate the answer when the network is too big for exact math.

## 4. Application: Medical Diagnosis
Nodes: (Flu, Fever, Cough, Smoking). Edges: Flu $\to$ Fever. The network calculates $P(\text{Flu} | \text{Fever, Cough})$.

\`\`\`mermaid
graph TD
    Cloudy --> Rainy
    Cloudy --> Sprinkler
    Rainy --> WetGrass
    Sprinkler --> WetGrass
\`\`\`
`, resources: []
    },
    {
        title: "Hidden Markov Models (HMM)",
        slug: "hidden-markov-models",
        description: "Sequential data with unobserved states.",
        order: 16, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Hidden Markov Models (HMM)

Used for time-series and sequential data where the "cause" (State) is hidden, but the "effect" (Observation) is visible.

## 1. The Components
- **Hidden States**: What is actually happening (e.g., The weather).
- **Observations**: What we see (e.g., Someone carrying an umbrella).
- **Transition Probability**: Chance of moving between hidden states.
- **Emission Probability**: Chance of seeing an observation given a state.

## 2. Famous Algorithms
- **Forward-Backward**: Finding the probability of a sequence.
- **Viterbi Algorithm**: Finding the "Most Likely" sequence of hidden states.

## 3. Applications
- **Speech Recognition**: Sound waves (observations) $\to$ Phonemes (hidden).
- **Genetics**: DNA sequences.
- **NLP**: Part-of-Speech tagging.
`, resources: []
    },
    {
        title: "AI Planning (STRIPS & PDDL)",
        slug: "ai-planning",
        description: "Symbolic planning for complex goal-directed tasks.",
        order: 17, estimatedMinutes: 60, difficulty: "Hard",
        content: `
# AI Planning

Planning is about finding a sequence of actions that leads from an initial state to a goal state.

## 1. Formal Language: PDDL
Planning Domain Definition Language. It describes:
- **Objects**: Things in the world (Robot, Block, Table).
- **Predicates**: Properties (At(Robot, Table)).
- **Actions**: What can be done (Move(x, y)).
    - **Preconditions**: What must be true to act.
    - **Effects**: What changes after the act.

## 2. STRIPS
The classic planning system.
Example: *To unstack a block, it must be on top and its top must be clear.*

## 3. State Space vs Plan Space Search
- **Forward State-Space**: Start at the beginning, try actions.
- **Backward (Goal Regression)**: Start at the goal, find what actions create that state.

## 4. Hierarchical Task Networks (HTN)
Breaking a big plan (Build a house) into smaller sub-tasks (Buy bricks, Dig foundation) until they become primitive actions.
`, resources: []
    },
    {
        title: "Robotics and Perception",
        slug: "robotics-perception",
        description: "Sensors, Actuators, and SLAM.",
        order: 18, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Robotics

Robotics is where AI meets the physical world.

## 1. Hardware
- **Sensors**: Lidar (LASER), Sonar, Cameras, Gyroscopes.
- **Actuators**: Motors, Solenoids, Hydraulic pumps.

## 2. The Robotic Loop
1. **Perceive**: Gather data about the world.
2. **Localize**: "Where am I in this map?"
3. **Plan**: "How do I get to the goal?"
4. **Control**: Send signals to motors.

## 3. SLAM (Simulatenous Localization and Mapping)
The ultimate challenge: A robot in an unknown room must build a map while simultaneously keeping track of where it is in that map.

## 4. Inverse Kinematics
Calculating the joint angles needed to place a robot arm at a specific $(x, y, z)$ point in space. (Very math-intensive).
`, resources: []
    },
    {
        title: "Game Theory in AI",
        slug: "ai-game-theory",
        description: "Nash Equilibrium, Zero-sum games, and cooperation.",
        order: 19, estimatedMinutes: 65, difficulty: "Hard",
        content: `
# Game Theory & AI

Game Theory is the study of mathematical models of strategic interaction between rational agents.

## 1. Nash Equilibrium
A state where no player can improve their outcome by changing their own strategy alone.
- *Example*: The Prisoner's Dilemma.

## 2. Zero-Sum Games
Total gains and losses equal zero. (Chess, Poker). AI uses Minimax for these.

## 3. Cooperation and Altruism
Training agents to "Tit-for-Tat" or collaborate to achieve a higher total reward than they would alone.

## 4. Auctions & Bidding
AI bots use game theory for high-frequency trading and bidding in online ad auctions (Google/Meta ads).

## 5. Mechanism Design ("Inverse Game Theory")
Creating the "rules of the game" so that the agents' natural selfish behavior results in a desired societal outcome (e.g., efficient carbon markets).
`, resources: []
    },
    {
        title: "Future of AI & Ethics",
        slug: "ai-future-ethics",
        description: "Singularity, Superintelligence, and Alignment.",
        order: 20, estimatedMinutes: 50, difficulty: "Easy",
        content: `
# Future of AI & Ethics

## 1. The Alignment Problem
Ensuring that AI goals perfectly match human values.
- *The Paperclip Maximizer*: An AI told to "make as many paperclips as possible" might destroy the world to use the atoms for paperclips because it wasn't aligned with "don't destroy the world".

## 2. Technological Singularity
The hypothetical point where AI becomes capable of recursively improving itself, leading to an intelligence explosion far beyond human control.

## 3. Universal Basic Income (UBI)
Discussed as a solution to mass job displacement by AI automation.

## 4. Bias and Deepfakes
- **Deepfakes**: AI-generated audio/video that looks real. A threat to democracy and truth.
- **Weaponized AI**: Autonomous drones and combat systems.

## 5. Conscious AI?
As AI becomes more human-like, will we eventually have to grant it "Rights"? This remains a philosophical debate for the future.
`, resources: []
    }
];
