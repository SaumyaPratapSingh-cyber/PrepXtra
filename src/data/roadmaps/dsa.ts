
import { RoadmapTrack } from './types';

export const dsaRoadmap: RoadmapTrack = {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA for coding interviews and competitive programming',
    category: 'skill-based',
    icon: '🧮',
    accentColor: '#ef4444',
    rootNodeId: 'dsa-root',
    nodes: {
        'dsa-root': {
            id: 'dsa-root',
            label: 'Data Structures & Algorithms',
            description: 'Mastering the mathematical foundations and efficient data organization techniques required for high-performance software and technical interviews.',
            children: ['complexity-analysis', 'data-structures', 'algorithms'],
            resources: [
                { type: 'course', title: 'Striver\'s A2Z DSA Course', url: 'https://takeuforward.org/strivers-a2z-dsa-course/', isFree: true },
                { type: 'video', title: 'Abdul Bari - Algorithms', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkfz67UIPni_0nN16QDv8', isFree: true },
                { type: 'article', title: 'CP-Algorithms: Competitive Programming Techniques', url: 'https://cp-algorithms.com/', isFree: true },
                { type: 'documentation', title: 'LeetCode - Explore Card: DSA', url: 'https://leetcode.com/explore/', isFree: true }
            ],
            content: {
                overview: 'Data Structures and Algorithms (DSA) are the building blocks of efficient software. A data structure is a specialized format for organizing, processing, retrieving, and storing data, while an algorithm is a step-by-step procedure for calculations. \n\nMastering DSA is not just about passing interviews at top tech companies; it is about learning how to think clearly about computation. You will learn how to choose the right tools for the job—whether it\'s using a Hash Map for O(1) lookups or a Segment Tree for range queries. This track will take you from the basics of Big O notation to complex topics like Dynamic Programming and Graph Theory, equipping you with the problem-solving skills needed for any engineering challenge.',
                keyConcepts: [
                    'Complexity Analysis: Time and Space Big-O',
                    'Foundational Structures: Arrays, Lists, Stacks, Queues',
                    'Hierarchical Structures: Trees and Graphs',
                    'Searching and Sorting: Binary Search, Quick Sort, Merge Sort',
                    'Advanced Techniques: Dynamic Programming and Greedy',
                    'String Manipulation and Pattern Matching',
                    'Bit Manipulation and Combinatorics',
                    'Concurrency and Parallel Algorithms'
                ],
                practiceQuestions: [
                    { question: 'Why is Big O notation used in algorithm analysis?', hint: 'To describe the upper bound of time/space as input grows infinitely.', difficulty: 'easy' },
                    { question: 'Contrast "Iterative" vs "Recursive" solutions.', hint: 'Using loops vs functions calling themselves.', difficulty: 'easy' },
                    { question: 'What is the "Space-Time Tradeoff"?', hint: 'Increasing memory usage to reduce computation time, or vice versa.', difficulty: 'medium' },
                    { question: 'Explain the concept of "Amortized Analysis".', hint: 'Finding the average time per operation over a sequence of operations.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always analyze the time and space complexity before writing code.',
                    'Start with the "Brute Force" solution, then optimize iteratively.',
                    'Use meaningful variable names even in competitive programming.',
                    'Handle edge cases first (empty inputs, null values, large numbers).',
                    'Visualize the problem using diagrams before picking a data structure.',
                    'Practice regularly on platforms like LeetCode, Codeforces, or GFG.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Getting Started', description: 'Pick a language and understand the basics.', tasks: ['Choose C++, Java, or Python for DSA', 'Set up a competitive programming environment', 'Solve 5 basic problems on LeetCode'] },
            ]
        },

        // ─── Complexity Analysis ───
        'complexity-analysis': {
            id: 'complexity-analysis',
            label: 'Asymptotic Complexity Analysis',
            description: 'Mastering the mathematical language used to describe the efficiency and scalability of algorithms.',
            parentId: 'dsa-root',
            resources: [
                { type: 'article', title: 'Big-O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', isFree: true },
                { type: 'video', title: 'MIT 6.006 - Algorithmic Complexity', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-1-algorithmic-thinking-peak-finding/', isFree: true },
                { type: 'article', title: 'GeeksforGeeks - Analysis of Algorithms', url: 'https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/', isFree: true },
                { type: 'video', title: 'Big O for Software Engineers', url: 'https://www.youtube.com/watch?v=v4cd1O4zkGw', isFree: true }
            ],
            content: {
                overview: 'Complexity Analysis is the heartbeat of computer science. It allows us to compare different algorithms objectively based on how their resource consumption (time or memory) grows with the size of the input. \n\nWe primarily use Big O (O) notation for upper bounds, Big Omega (Ω) for lower bounds, and Big Theta (Θ) for tight bounds. Understanding complexity means knowing not just THAT an algorithm is O(n log n), but WHY. You must master analyzing loops, recursive calls (using the Master Theorem or recursion trees), and the trade-offs between space and time.',
                keyConcepts: [
                    'Big O, Big Omega, and Big Theta Notations',
                    'Constant O(1), Logarithmic O(log n), and Linear O(n)',
                    'Quadratic O(n²), Cubic O(n³), and Exponential O(2ⁿ)',
                    'Analyzing Iterative Loops and Nested Structures',
                    'Recursion Analysis and the Master Theorem',
                    'Best, Worst, and Average Case Scenarios',
                    'Space Complexity: Auxiliary space vs Total space',
                    'Amortized Analysis for dynamic structures'
                ],
                practiceQuestions: [
                    { question: 'What is the time complexity of Binary Search?', hint: 'O(log n) because the search space is halved in each step.', difficulty: 'easy' },
                    { question: 'Explain the "Master Theorem" for recursion.', hint: 'A mathematical formula to solve recurrence relations of the form T(n) = aT(n/b) + f(n).', difficulty: 'hard' },
                    { question: 'Is O(n + k) considered linear if k is a constant?', hint: 'Yes, because as n grows, k becomes negligible.', difficulty: 'medium' },
                    { question: 'What is the space complexity of a recursive function with depth n?', hint: 'O(n) due to the call stack.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Don\'t just count lines; analyze how the number of operations scales.',
                    'Ignore constant factors and lower-order terms (e.g., O(2n + 5) becomes O(n)).',
                    'Be aware of the "Space-Time Tradeoff" in every optimization.',
                    'Consider the constraints given in interview problems—they often hint at the required complexity.',
                    'Check for "Implicit Space" like recursive call stacks or temporary clones of data.',
                    'Use "Benchmarking" to verify your theoretical analysis in practice.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Time & Space Complexity', description: 'Understand algorithm efficiency.', tasks: ['Learn Big O, Big Omega, and Big Theta', 'Analyze loops, recursion, and nested operations', 'Compare O(1), O(n), O(log n), O(n²), O(2^n)'] },
            ]
        },

        // ─── Data Structures ───
        'data-structures': {
            id: 'data-structures',
            label: 'Core & Advanced Data Structures',
            description: 'Mastering the art of data organization for optimized storage, retrieval, and manipulation.',
            parentId: 'dsa-root',
            children: ['arrays-strings', 'linked-lists', 'stacks-queues', 'trees', 'graphs', 'heaps', 'hashing'],
            resources: [
                { type: 'video', title: 'Data Structures Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=8hly31xKli0', isFree: true },
                { type: 'article', title: 'Visualgo - Data Structure Visualizations', url: 'https://visualgo.net/', isFree: true },
                { type: 'documentation', title: 'Python Collections Module', url: 'https://docs.python.org/3/library/collections.html', isFree: true },
                { type: 'article', title: 'Commonly Used Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/', isFree: true }
            ],
            content: {
                overview: 'Data structures are the containers we use to hold data. Each structure has its own strengths and weaknesses depending on the operations you need to perform: insertion, deletion, search, or traversal. \n\nIn this section, you will progress from linear structures like Arrays and Linked Lists to hierarchical structures like Trees and Graphs. You will also learn about the power of Hashing for O(1) performance and Heaps for priority-based access. Choosing the right data structure is often 90% of solving a hard technical problem.',
                keyConcepts: [
                    'Linear Structures: Arrays, Dynamic Arrays (Vectors), Linked Lists',
                    'LIFO and FIFO: Stacks and Queues',
                    'Hashing: Hash Maps, Hash Sets, and Collision Resolution',
                    'Trees: Binary Trees, BST, Balanced Trees (AVL, Red-Black)',
                    'Graphs: Adjacency Lists vs Matrices, Directed vs Undirected',
                    'Priority Queues: Min-Heaps and Max-Heaps',
                    'Advanced Structures: Tries, Segment Trees, Fenwick Trees',
                    'Memory Management: Stack vs Heap allocation'
                ],
                practiceQuestions: [
                    { question: 'Contrast "Singly Linked List" vs "Doubly Linked List".', hint: 'One pointer forward vs pointers to both next and previous nodes.', difficulty: 'easy' },
                    { question: 'When would you use a "Stack" instead of an "Array"?', hint: 'When you need LIFO behavior (e.g., undo functionality or parsing brackets).', difficulty: 'easy' },
                    { question: 'What is a "Collision" in a Hash Map?', hint: 'When two different keys map to the same internal index.', difficulty: 'medium' },
                    { question: 'Why use a "Set" instead of a "List"?', hint: 'For O(1) membership checks and to ensure all elements are unique.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Know the time complexity for EVERY operation on your data structure.',
                    'Use "Built-in" structures (like Python\'s dict or Java\'s HashMap) instead of re-implementing.',
                    'Start with the simplest structure that satisfies your requirements.',
                    'Visualize your data structures as physical objects to understand their behavior.',
                    'Be aware of "Overhead" (e.g., pointers in a linked list take extra memory).',
                    'Practice implementing core structures from scratch to understand their internals.'
                ]
            }
        },

        'arrays-strings': {
            id: 'arrays-strings',
            label: 'Arrays & Strings',
            description: 'The most fundamental data structures. Learn traversal, two-pointer, sliding window, prefix sums, and string manipulation.',
            parentId: 'data-structures',
            resources: [
                { type: 'article', title: 'Array Problems - LeetCode', url: 'https://leetcode.com/tag/array/', isFree: true },
                { type: 'video', title: 'Array Techniques', url: 'https://www.youtube.com/watch?v=7pJo_rM0z_s', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Array Basics', description: 'Fundamental array operations.', tasks: ['Two Sum, Best Time to Buy and Sell Stock', 'Contains Duplicate, Product of Array Except Self', 'Maximum Subarray (Kadane\'s Algorithm)'] },
                { day: 2, title: 'Two Pointer & Sliding Window', description: 'Efficient array techniques.', tasks: ['Two Sum II (sorted array)', 'Container With Most Water', 'Longest Substring Without Repeating Characters'] },
                { day: 3, title: 'String Manipulation', description: 'Common string problems.', tasks: ['Valid Palindrome, Valid Anagram', 'Longest Palindromic Substring', 'Group Anagrams, String to Integer'] },
            ]
        },

        'linked-lists': {
            id: 'linked-lists',
            label: 'Linked Lists',
            description: 'Singly and doubly linked lists. Learn insertion, deletion, reversal, cycle detection, and merge operations.',
            parentId: 'data-structures',
            resources: [
                { type: 'article', title: 'Linked List - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Linked List Operations', description: 'Core linked list problems.', tasks: ['Reverse a Linked List', 'Detect cycle (Floyd\'s algorithm)', 'Merge Two Sorted Lists'] },
                { day: 2, title: 'Advanced Linked Lists', description: 'Complex linked list problems.', tasks: ['Remove Nth Node From End', 'Reorder List', 'LRU Cache implementation'] },
            ]
        },

        'stacks-queues': {
            id: 'stacks-queues',
            label: 'Stacks & Queues',
            description: 'LIFO (Stack) and FIFO (Queue) data structures. Learn monotonic stack, queue using stacks, and bracket matching.',
            parentId: 'data-structures',
            resources: [
                { type: 'article', title: 'Stack Problems', url: 'https://leetcode.com/tag/stack/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Stack & Queue Problems', description: 'Classic stack and queue problems.', tasks: ['Valid Parentheses', 'Min Stack, Daily Temperatures', 'Implement Queue using Stacks'] },
            ]
        },

        'trees': {
            id: 'trees',
            label: 'Trees & BST',
            description: 'Binary trees, binary search trees, and balanced trees. Learn traversals (inorder, preorder, postorder), BFS, DFS, and tree construction.',
            parentId: 'data-structures',
            children: ['binary-tree', 'bst'],
            resources: [
                { type: 'video', title: 'Binary Tree Bootcamp', url: 'https://www.youtube.com/watch?v=BHB0B1jFKQo', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Tree Traversals', description: 'Navigate tree structures.', tasks: ['Implement inorder, preorder, postorder traversals', 'Level Order Traversal (BFS)', 'Maximum Depth of Binary Tree'] },
                { day: 2, title: 'Tree Problems', description: 'Common tree interview problems.', tasks: ['Validate BST, Lowest Common Ancestor', 'Serialize and Deserialize Binary Tree', 'Binary Tree Maximum Path Sum'] },
            ]
        },

        'binary-tree': {
            id: 'binary-tree',
            label: 'Binary Trees',
            description: 'Tree where each node has at most two children. Learn traversals, height, diameter, and path problems.',
            parentId: 'trees',
            resources: [
                { type: 'article', title: 'Binary Tree - LeetCode', url: 'https://leetcode.com/tag/binary-tree/', isFree: true },
            ],
        },

        'bst': {
            id: 'bst',
            label: 'Binary Search Trees',
            description: 'A sorted binary tree enabling O(log n) search, insert, and delete. Learn AVL trees and Red-Black trees.',
            parentId: 'trees',
            resources: [
                { type: 'article', title: 'BST Operations', url: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/', isFree: true },
            ],
        },

        'graphs': {
            id: 'graphs',
            label: 'Graphs',
            description: 'Vertices and edges representing relationships. Learn BFS, DFS, topological sort, shortest paths (Dijkstra, Bellman-Ford), and MST.',
            parentId: 'data-structures',
            resources: [
                { type: 'video', title: 'Graph Algorithms', url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU', isFree: true },
                { type: 'article', title: 'Graph Theory - CP Algorithms', url: 'https://cp-algorithms.com/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Graph Basics', description: 'Graph representations and traversals.', tasks: ['Implement adjacency list and matrix', 'BFS and DFS traversals', 'Connected components and cycle detection'] },
                { day: 2, title: 'Shortest Paths', description: 'Find optimal paths in graphs.', tasks: ['Dijkstra\'s algorithm', 'Bellman-Ford algorithm', 'Floyd-Warshall for all pairs'] },
                { day: 3, title: 'Advanced Graphs', description: 'Topological sort and MST.', tasks: ['Topological Sort (Kahn\'s and DFS)', 'Minimum Spanning Tree (Kruskal\'s, Prim\'s)', 'Union-Find / Disjoint Set Union'] },
            ]
        },

        'heaps': {
            id: 'heaps',
            label: 'Heaps / Priority Queues',
            description: 'Min-heaps and max-heaps for efficient access to the minimum/maximum element. Essential for scheduling and top-K problems.',
            parentId: 'data-structures',
            resources: [
                { type: 'article', title: 'Heap Data Structure', url: 'https://www.geeksforgeeks.org/heap-data-structure/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Heap Problems', description: 'Priority queue applications.', tasks: ['Kth Largest Element in an Array', 'Top K Frequent Elements', 'Find Median from Data Stream'] },
            ]
        },

        'hashing': {
            id: 'hashing',
            label: 'Hash Maps & Sets',
            description: 'Hash-based data structures for O(1) lookups. Learn hash functions, collision resolution, and common interview patterns.',
            parentId: 'data-structures',
            resources: [
                { type: 'article', title: 'Hash Table', url: 'https://www.geeksforgeeks.org/hashing-data-structure/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Hashing Problems', description: 'Hash map interview problems.', tasks: ['Two Sum (classic hash map)', 'Group Anagrams', 'Longest Consecutive Sequence'] },
            ]
        },

        // ─── Algorithms ───
        'algorithms': {
            id: 'algorithms',
            label: 'Algorithmic Problem Solving',
            description: 'Mastering the logic and patterns used to solve complex computational problems with speed and precision.',
            parentId: 'dsa-root',
            children: ['sorting-searching', 'recursion-backtracking', 'dynamic-programming', 'greedy'],
            resources: [
                { type: 'video', title: 'Algorithmic Patterns for Interviews', url: 'https://www.youtube.com/watch?v=iJFr029B8X8', isFree: true },
                { type: 'article', title: 'The Algorithm Design Manual - Steven Skiena', url: 'https://www3.cs.stonybrook.edu/~skiena/algorist/', isFree: false },
                { type: 'course', title: 'Coursera - Algorithms I & II (Princeton)', url: 'https://www.coursera.org/learn/algorithms-part1', isFree: true },
                { type: 'article', title: 'Top 10 Algorithms for Interviews', url: 'https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/', isFree: true }
            ],
            content: {
                overview: 'Algorithms are the "instructions" that act on data. While data structures provide the ingredients, algorithms are the recipe. Mastering algorithms involves learning to recognize patterns—can this problem be solved by sorting? Is it a "Greedy" problem? Does it involve overlapping subproblems (Dynamic Programming)? \n\nThis section covers the essential techniques used daily by software engineers: Sorting and Searching for data organization, Recursion and Backtracking for exploring possibilities, and Dynamic Programming for optimizing complex decisions. You will learn not just how to code these algorithms, but the fundamental logic that makes them work.',
                keyConcepts: [
                    'Sorting: Merge Sort, Quick Sort, and stable vs unstable algorithms',
                    'Searching: Binary Search and its many variations',
                    'Divide and Conquer: Breaking problems into independent subproblems',
                    'Recursion and Backtracking: Exploring all valid possibilities',
                    'Dynamic Programming: Memoization and Tabulation',
                    'Greedy Algorithms: Local optimization for global results',
                    'Sliding Window and Two Pointers: Optimization techniques for arrays',
                    'Graph Algorithms: BFS, DFS, Dijkstra, and Topological Sort'
                ],
                practiceQuestions: [
                    { question: 'What is the "Divide and Conquer" approach?', hint: 'Splitting a problem into smaller subproblems, solving them, and merging results.', difficulty: 'easy' },
                    { question: 'Contrast "Greedy" vs "Dynamic Programming".', hint: 'Local optimum at each step vs Global optimum by considering all subproblems.', difficulty: 'hard' },
                    { question: 'When is "Recursion" less efficient than "Iteration"?', hint: 'When there is excessive stack memory usage or duplicate computations.', difficulty: 'medium' },
                    { question: 'Explain "Sliding Window" in one sentence.', hint: 'Moving a window of fixed or variable size over a sequence to find a desired property.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always check if there is a "Simplified" version of the problem first.',
                    'Dry-run your algorithm with small inputs on paper before coding.',
                    'Optimize for the common case, but ensure correctness for edge cases.',
                    'Use "Modular Code" by breaking algorithms into smaller, testable functions.',
                    'Avoid deep recursion in environments with small stack limits; use iteration instead.',
                    'Keep "Time to Benefit" in mind: an O(n log n) algorithm is often good enough.'
                ]
            }
        },

        'sorting-searching': {
            id: 'sorting-searching',
            label: 'Sorting & Searching',
            description: 'Sorting algorithms (merge sort, quick sort, heap sort) and binary search variations for efficient data processing.',
            parentId: 'algorithms',
            resources: [
                { type: 'article', title: 'Sorting Algorithms Visualized', url: 'https://visualgo.net/en/sorting', isFree: true },
                { type: 'video', title: 'Sorting Algorithms Explained', url: 'https://www.youtube.com/watch?v=kPRA0W1kECg', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Sorting', description: 'Implement and analyze sorting algorithms.', tasks: ['Implement Merge Sort and Quick Sort', 'Understand time/space complexity trade-offs', 'Solve: Sort Colors, Sort an Array'] },
                { day: 2, title: 'Binary Search', description: 'Efficient search in sorted data.', tasks: ['Basic binary search implementation', 'Search in Rotated Sorted Array', 'Find First and Last Position, Median of Two Sorted Arrays'] },
            ]
        },

        'recursion-backtracking': {
            id: 'recursion-backtracking',
            label: 'Recursion & Backtracking',
            description: 'Solve problems by breaking them into subproblems. Backtracking explores all potential solutions by building candidates and abandoning those that fail.',
            parentId: 'algorithms',
            resources: [
                { type: 'video', title: 'Recursion for Beginners', url: 'https://www.youtube.com/watch?v=IJDJ0kBx2LM', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Recursion', description: 'Think recursively.', tasks: ['Fibonacci, factorial, power function', 'Tower of Hanoi', 'Generate all subsets and permutations'] },
                { day: 2, title: 'Backtracking', description: 'Explore and prune solution space.', tasks: ['N-Queens Problem', 'Sudoku Solver', 'Word Search, Combination Sum'] },
            ]
        },

        'dynamic-programming': {
            id: 'dynamic-programming',
            label: 'Dynamic Programming',
            description: 'Optimize recursive solutions by storing computed results. Learn memoization, tabulation, and common DP patterns (knapsack, LCS, LIS).',
            parentId: 'algorithms',
            resources: [
                { type: 'video', title: 'Dynamic Programming - Striver', url: 'https://www.youtube.com/watch?v=FfXoiwwnxFw', isFree: true },
                { type: 'article', title: 'DP Patterns', url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'DP Basics', description: 'Foundations of dynamic programming.', tasks: ['Climbing Stairs, Fibonacci variations', 'House Robber, Coin Change', 'Understand top-down (memo) vs bottom-up (tabulation)'] },
                { day: 2, title: '1D DP', description: 'Single dimension DP problems.', tasks: ['Longest Increasing Subsequence', 'Word Break', 'Decode Ways'] },
                { day: 3, title: '2D DP', description: 'Multi-dimension DP problems.', tasks: ['Longest Common Subsequence', '0/1 Knapsack Problem', 'Edit Distance, Unique Paths'] },
                { day: 4, title: 'Advanced DP', description: 'Complex DP patterns.', tasks: ['DP on Trees and Graphs', 'Bitmask DP', 'Partition problems and interval DP'] },
            ]
        },

        'greedy': {
            id: 'greedy',
            label: 'Greedy Algorithms',
            description: 'Make locally optimal choices at each step to find a global optimum. Learn activity selection, interval scheduling, and Huffman coding.',
            parentId: 'algorithms',
            resources: [
                { type: 'article', title: 'Greedy Algorithms', url: 'https://www.geeksforgeeks.org/greedy-algorithms/', isFree: true },
            ],
            dayWisePlan: [
                { day: 1, title: 'Greedy Problems', description: 'Solve problems with greedy approach.', tasks: ['Jump Game I and II', 'Gas Station, Task Scheduler', 'Merge Intervals, Non-overlapping Intervals'] },
            ]
        },
    }
};
