// Full Striver's A2Z DSA Sheet Seed Script
import dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from "mongoose";

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const DSAProblemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    category: { type: String, required: true },
    subCategory: String,
    tags: [String],
    description: { type: String, required: true },
    examples: [{ input: String, output: String, explanation: String }],
    constraints: String,
    companies: [String],
    solution: {
        approach: String,
        code: {
            python: String,
            javascript: String,
            cpp: String,
            java: String
        },
        timeComplexity: String,
        spaceComplexity: String
    }
}, { timestamps: true });

const DSAProblem = mongoose.models.DSAProblem || mongoose.model('DSAProblem', DSAProblemSchema);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found");
    process.exit(1);
}

// Helper to create slug
const createSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Problem Template
const createProblem = (title, difficulty, category, subCategory, description = "") => ({
    title,
    slug: createSlug(title),
    difficulty,
    category,
    subCategory,
    tags: [category, subCategory, difficulty],
    description: description || `Given a problem "${title}", solve it efficiently.\n\nTime Limit: 1s\nMemory Limit: 256MB`,
    examples: [
        { input: "Sample Input", output: "Sample Output", explanation: "Explanation of the sample case." }
    ],
    constraints: "1 <= N <= 10^5",
    companies: ["Amazon", "Microsoft", "Google"],
    solution: {
        approach: "Standard optimal approach for this problem.",
        code: {
            python: "# Python solution\ndef solve():\n    pass",
            javascript: "// JavaScript solution\nfunction solve() {\n    return;\n}",
            cpp: "// C++ solution\nvoid solve() {\n    return;\n}",
            java: "// Java solution\nclass Solution {\n    public void solve() {\n        return;\n    }\n}"
        },
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
    }
});

// === FULL SHEET DATA ===
const problems = [
    // --- LEARN THE BASICS (31) ---
    // Things to Know (9)
    createProblem("User Input / Output", "easy", "basics", "things-to-know"),
    createProblem("Data Types", "easy", "basics", "things-to-know"),
    createProblem("If Else statements", "easy", "basics", "things-to-know"),
    createProblem("Switch Statement", "easy", "basics", "things-to-know"),
    createProblem("While loops", "easy", "basics", "things-to-know"),
    createProblem("For loops", "easy", "basics", "things-to-know"),
    createProblem("Functions (Pass by Reference and Value)", "easy", "basics", "things-to-know"),
    createProblem("Time Complexity Analysis", "easy", "basics", "things-to-know"),

    // Basic Maths (7)
    createProblem("Count Digits", "easy", "basics", "maths"),
    createProblem("Reverse a Number", "easy", "basics", "maths"),
    createProblem("Check Palindrome", "easy", "basics", "maths"),
    createProblem("GCD or HCF", "easy", "basics", "maths"),
    createProblem("Armstrong Numbers", "easy", "basics", "maths"),
    createProblem("Print all Divisors", "easy", "basics", "maths"),
    createProblem("Check Prime", "easy", "basics", "maths"),

    // Basic Recursion (9)
    createProblem("Print 1 to N using Recursion", "easy", "basics", "recursion"),
    createProblem("Print N to 1 using Recursion", "easy", "basics", "recursion"),
    createProblem("Sum of first N numbers", "easy", "basics", "recursion"),
    createProblem("Factorial of N numbers", "easy", "basics", "recursion"),
    createProblem("Reverse an Array", "easy", "basics", "recursion"),
    createProblem("Check if String is Palindrome", "easy", "basics", "recursion"),
    createProblem("Fibonacci Number", "easy", "basics", "recursion"),

    // Hashing (3)
    createProblem("Count frequencies of array elements", "easy", "basics", "hashing"),
    createProblem("Find the highest/lowest frequency element", "easy", "basics", "hashing"),

    // --- SORTING (7) ---
    createProblem("Selection Sort", "easy", "sorting", "sorting-1"),
    createProblem("Bubble Sort", "easy", "sorting", "sorting-1"),
    createProblem("Insertion Sort", "easy", "sorting", "sorting-1"),
    createProblem("Merge Sort", "medium", "sorting", "sorting-2"),
    createProblem("Recursive Bubble Sort", "easy", "sorting", "sorting-2"),
    createProblem("Recursive Insertion Sort", "easy", "sorting", "sorting-2"),
    createProblem("Quick Sort", "medium", "sorting", "sorting-2"),

    // --- ARRAYS (40) ---
    // Easy
    createProblem("Largest Element in Array", "easy", "arrays", "easy"),
    createProblem("Second Largest Element in Array", "easy", "arrays", "easy"),
    createProblem("Check if Array is Sorted", "easy", "arrays", "easy"),
    createProblem("Remove Duplicates from Sorted Array", "easy", "arrays", "easy"),
    createProblem("Left Rotate the Array by One", "easy", "arrays", "easy"),
    createProblem("Rotate Array by K elements", "medium", "arrays", "easy"),
    createProblem("Move Zeros to end", "easy", "arrays", "easy"),
    createProblem("Linear Search", "easy", "arrays", "easy"),
    createProblem("Find Union", "easy", "arrays", "easy"),
    createProblem("Find Missing Number", "easy", "arrays", "easy"),
    createProblem("Max Consecutive Ones", "easy", "arrays", "easy"),
    createProblem("Find the number that appears once", "easy", "arrays", "easy"),

    // Medium
    createProblem("Two Sum", "easy", "arrays", "medium"),
    createProblem("Sort an array of 0s 1s and 2s", "medium", "arrays", "medium"),
    createProblem("Majority Element (>N/2 times)", "easy", "arrays", "medium"),
    createProblem("Kadane's Algorithm", "medium", "arrays", "medium"),
    createProblem("Print Subarray with Maximum Subarray Sum", "medium", "arrays", "medium"),
    createProblem("Stock Buy and Sell", "easy", "arrays", "medium"),
    createProblem("Rearrange Array Elements by Sign", "medium", "arrays", "medium"),
    createProblem("Next Permutation", "medium", "arrays", "medium"),
    createProblem("Leaders in an Array", "medium", "arrays", "medium"),
    createProblem("Longest Consecutive Sequence", "medium", "arrays", "medium"),
    createProblem("Set Matrix Zeros", "medium", "arrays", "medium"),
    createProblem("Rotate Matrix by 90 degrees", "medium", "arrays", "medium"),
    createProblem("Spiral Matrix", "medium", "arrays", "medium"),
    createProblem("Subarray Sum Equals K", "medium", "arrays", "medium"),

    // Hard
    createProblem("Pascal's Triangle", "medium", "arrays", "hard"),
    createProblem("Majority Element (N/3 times)", "medium", "arrays", "hard"),
    createProblem("3 Sum", "medium", "arrays", "hard"),
    createProblem("4 Sum", "medium", "arrays", "hard"),
    createProblem("Largest Subarray with 0 Sum", "easy", "arrays", "hard"),
    createProblem("Count Subarrays with XOR as K", "medium", "arrays", "hard"),
    createProblem("Merge Overlapping Subintervals", "medium", "arrays", "hard"),
    createProblem("Merge two sorted arrays without extra space", "medium", "arrays", "hard"),
    createProblem("Find Repeating and Missing Number", "medium", "arrays", "hard"),
    createProblem("Count Inversions", "medium", "arrays", "hard"),
    createProblem("Reverse Pairs", "hard", "arrays", "hard"),
    createProblem("Maximum Product Subarray", "medium", "arrays", "hard"),

    // --- BINARY SEARCH (32) ---
    // 1D Array
    createProblem("Binary Search to find X in sorted array", "easy", "binary-search", "1d-arrays"),
    createProblem("Implement Lower Bound", "easy", "binary-search", "1d-arrays"),
    createProblem("Implement Upper Bound", "easy", "binary-search", "1d-arrays"),
    createProblem("Search Insert Position", "easy", "binary-search", "1d-arrays"),
    createProblem("Floor and Ceil in Sorted Array", "easy", "binary-search", "1d-arrays"),
    createProblem("First and Last Occurrences of x", "medium", "binary-search", "1d-arrays"),
    createProblem("Count Occurrences in Sorted Array", "medium", "binary-search", "1d-arrays"),
    createProblem("Search in Rotated Sorted Array I", "medium", "binary-search", "1d-arrays"),
    createProblem("Search in Rotated Sorted Array II", "medium", "binary-search", "1d-arrays"),
    createProblem("Find Minimum in Rotated Sorted Array", "medium", "binary-search", "1d-arrays"),
    createProblem("Single Element in Sorted Array", "medium", "binary-search", "1d-arrays"),
    createProblem("Find Peak Element", "medium", "binary-search", "1d-arrays"),

    // On Answers
    createProblem("Find Sqrt of a number", "easy", "binary-search", "answers"),
    createProblem("Nth Root of a Number", "easy", "binary-search", "answers"),
    createProblem("Koko Eating Bananas", "medium", "binary-search", "answers"),
    createProblem("Minimum days to make M bouquets", "medium", "binary-search", "answers"),
    createProblem("Find the smallest divisor given a threshold", "medium", "binary-search", "answers"),
    createProblem("Capacity to Ship Packages within D Days", "medium", "binary-search", "answers"),
    createProblem("Kth Missing Positive Number", "easy", "binary-search", "answers"),
    createProblem("Aggressive Cows", "medium", "binary-search", "answers"),
    createProblem("Book Allocation Problem", "hard", "binary-search", "answers"),
    createProblem("Split Array - Largest Sum", "hard", "binary-search", "answers"),
    createProblem("Painter's Partition Problem", "hard", "binary-search", "answers"),
    createProblem("Minimize Max Distance to Gas Station", "hard", "binary-search", "answers"),
    createProblem("Median of two sorted arrays", "hard", "binary-search", "answers"),
    createProblem("Kth element of two sorted arrays", "medium", "binary-search", "answers"),

    // 2D Arrays
    createProblem("Row with max 1s", "medium", "binary-search", "2d-arrays"),
    createProblem("Search in a 2D Matrix", "medium", "binary-search", "2d-arrays"),
    createProblem("Search in a 2D Matrix II", "medium", "binary-search", "2d-arrays"),
    createProblem("Find Peak Element II", "medium", "binary-search", "2d-arrays"),
    createProblem("Matrix Median", "medium", "binary-search", "2d-arrays"),

    // --- STRINGS (15) ---
    // Easy
    createProblem("Remove Outermost Parentheses", "easy", "strings", "easy"),
    createProblem("Reverse words in a given string", "medium", "strings", "easy"),
    createProblem("Largest Odd Number in String", "easy", "strings", "easy"),
    createProblem("Longest Common Prefix", "easy", "strings", "easy"),
    createProblem("Isomorphic Strings", "easy", "strings", "easy"),
    createProblem("Check if two strings are anagrams", "easy", "strings", "easy"),
    createProblem("Sort Characters by Frequency", "medium", "strings", "easy"),

    // Medium
    createProblem("Maximum Nesting Depth of Parentheses", "easy", "strings", "medium"),
    createProblem("Roman to Integer", "easy", "strings", "medium"),
    createProblem("String to Integer (atoi)", "medium", "strings", "medium"),
    createProblem("Count number of substrings", "medium", "strings", "medium"),
    createProblem("Longest Palindromic Substring", "medium", "strings", "medium"),
    createProblem("Sum of Beauty of all substrings", "medium", "strings", "medium"),
    createProblem("Reverse every word in a string", "medium", "strings", "medium"),

    // --- LINKED LIST (31) ---
    // 1D LL
    createProblem("Introduction to Linked List", "easy", "linked-list", "1d"),
    createProblem("Insert Node at beginning", "easy", "linked-list", "1d"),
    createProblem("Delete Node in Linked List", "easy", "linked-list", "1d"),
    createProblem("Find length of Linked List", "easy", "linked-list", "1d"),
    createProblem("Search in Linked List", "easy", "linked-list", "1d"),

    // Doubly LL
    createProblem("Introduction to Doubly Linked List", "easy", "linked-list", "doubly"),
    createProblem("Insert a node in DLL", "easy", "linked-list", "doubly"),
    createProblem("Delete a node in DLL", "easy", "linked-list", "doubly"),
    createProblem("Reverse a DLL", "easy", "linked-list", "doubly"),

    // Medium
    createProblem("Middle of the Linked List", "easy", "linked-list", "medium"),
    createProblem("Reverse Linked List", "easy", "linked-list", "medium"),
    createProblem("Detect Loop in Linked List", "easy", "linked-list", "medium"),
    createProblem("Find Starting Point of Loop", "medium", "linked-list", "medium"),
    createProblem("Length of Loop in Linked List", "easy", "linked-list", "medium"),
    createProblem("Check if LL is Palindrome", "medium", "linked-list", "medium"),
    createProblem("Segregate Odd and Even nodes", "medium", "linked-list", "medium"),
    createProblem("Remove Nth node from end", "medium", "linked-list", "medium"),
    createProblem("Delete Middle Node", "medium", "linked-list", "medium"),
    createProblem("Sort Linked List", "medium", "linked-list", "medium"),
    createProblem("Sort LL of 0s 1s 2s", "medium", "linked-list", "medium"),
    createProblem("Intersection of Two Linked Lists", "easy", "linked-list", "medium"),
    createProblem("Add 1 to a number represented by LL", "medium", "linked-list", "medium"),
    createProblem("Add two numbers in LL", "medium", "linked-list", "medium"),

    // DLL Hard
    createProblem("Delete all occurrences of Key in DLL", "medium", "linked-list", "dll-medium"),
    createProblem("Find pairs with given sum in DLL", "medium", "linked-list", "dll-medium"),
    createProblem("Remove duplicates from sorted DLL", "easy", "linked-list", "dll-medium"),

    // Hard LL
    createProblem("Reverse Nodes in k-Group", "hard", "linked-list", "hard"),
    createProblem("Rotate List", "medium", "linked-list", "hard"),
    createProblem("Flatten a Linked List", "medium", "linked-list", "hard"),
    createProblem("Clone a Linked List with random pointers", "hard", "linked-list", "hard"),

    // --- RECURSION (25) ---
    // Strong Hold
    createProblem("Recursive Implementation of atoi()", "medium", "recursion", "strong-hold"),
    createProblem("Pow(x, n)", "medium", "recursion", "strong-hold"),
    createProblem("Count Good Numbers", "medium", "recursion", "strong-hold"),
    createProblem("Sort a Stack using Recursion", "medium", "recursion", "strong-hold"),
    createProblem("Reverse a Stack using Recursion", "medium", "recursion", "strong-hold"),

    // Subsequences
    createProblem("Generate Binary Strings", "medium", "recursion", "subsequences"),
    createProblem("Generate Parentheses", "medium", "recursion", "subsequences"),
    createProblem("Print all Subsequences", "medium", "recursion", "subsequences"),
    createProblem("Check if there exists a subsequence with sum K", "medium", "recursion", "subsequences"),
    createProblem("Combination Sum", "medium", "recursion", "subsequences"),
    createProblem("Combination Sum II", "medium", "recursion", "subsequences"),
    createProblem("Subset Sum I", "medium", "recursion", "subsequences"),
    createProblem("Subset Sum II", "medium", "recursion", "subsequences"),
    createProblem("Combination Sum III", "medium", "recursion", "subsequences"),
    createProblem("Letter Combinations of a Phone Number", "medium", "recursion", "subsequences"),

    // Hard
    createProblem("Palindrome Partitioning", "medium", "recursion", "hard"),
    createProblem("Word Search", "medium", "recursion", "hard"),
    createProblem("N-Queens", "hard", "recursion", "hard"),
    createProblem("Rat in a Maze", "medium", "recursion", "hard"),
    createProblem("Word Break", "medium", "recursion", "hard"),
    createProblem("M Coloring Problem", "medium", "recursion", "hard"),
    createProblem("Sudoku Solver", "hard", "recursion", "hard"),
    createProblem("Expression Add Operators", "hard", "recursion", "hard"),

    // --- BIT MANIPULATION (18) ---
    createProblem("Introduction to Bit Manipulation", "easy", "bit-manipulation", "basics"),
    createProblem("Check if ith bit is set", "easy", "bit-manipulation", "basics"),
    createProblem("Set/Unset the rightmost unset bit", "easy", "bit-manipulation", "basics"),
    createProblem("Swap two numbers", "easy", "bit-manipulation", "basics"),
    createProblem("Count set bits", "easy", "bit-manipulation", "basics"),
    createProblem("Min Bit Flips to Convert Number", "easy", "bit-manipulation", "basics"),
    createProblem("Single Number", "easy", "bit-manipulation", "basics"),
    createProblem("Power Set", "medium", "bit-manipulation", "basics"),
    createProblem("Single Number II", "medium", "bit-manipulation", "interview"),
    createProblem("Single Number III", "medium", "bit-manipulation", "interview"),
    createProblem("XOR of numbers in a range", "medium", "bit-manipulation", "interview"),
    createProblem("Divide Two Integers", "medium", "bit-manipulation", "interview"),

    // --- STACK AND QUEUES (30) ---
    createProblem("Implement Stack using Arrays", "easy", "stack-queue", "learning"),
    createProblem("Implement Queue using Arrays", "easy", "stack-queue", "learning"),
    createProblem("Implement Stack using Queue", "easy", "stack-queue", "learning"),
    createProblem("Implement Queue using Stack", "easy", "stack-queue", "learning"),
    createProblem("Valid Parentheses", "easy", "stack-queue", "learning"),
    createProblem("Implement Min Stack", "medium", "stack-queue", "learning"),

    // Conversion
    createProblem("Infix to Postfix", "medium", "stack-queue", "conversion"),
    createProblem("Prefix to Infix", "medium", "stack-queue", "conversion"),
    createProblem("Postfix to Prefix", "medium", "stack-queue", "conversion"),

    // Monotonic Stack
    createProblem("Next Greater Element", "medium", "stack-queue", "monotonic"),
    createProblem("Next Greater Element II", "medium", "stack-queue", "monotonic"),
    createProblem("Next Smaller Element", "medium", "stack-queue", "monotonic"),
    createProblem("Trapping Rain Water", "hard", "stack-queue", "monotonic"),
    createProblem("Sum of Subarray Minimums", "medium", "stack-queue", "monotonic"),
    createProblem("Asteroid Collision", "medium", "stack-queue", "monotonic"),
    createProblem("Sum of Subarray Ranges", "medium", "stack-queue", "monotonic"),
    createProblem("Largest Rectangle in Histogram", "hard", "stack-queue", "monotonic"),
    createProblem("Maximal Rectangle", "hard", "stack-queue", "monotonic"),

    // Implementation
    createProblem("Sliding Window Maximum", "hard", "stack-queue", "implementation"),
    createProblem("Stock Span Problem", "medium", "stack-queue", "implementation"),
    createProblem("The Celebrity Problem", "medium", "stack-queue", "implementation"),
    createProblem("LRU Cache", "medium", "stack-queue", "implementation"),
    createProblem("LFU Cache", "hard", "stack-queue", "implementation"),

    // --- SLIDING WINDOW (12) ---
    createProblem("Longest Substring Without Repeating Characters", "medium", "sliding-window", "medium"),
    createProblem("Max Consecutive Ones III", "medium", "sliding-window", "medium"),
    createProblem("Fruit Into Baskets", "medium", "sliding-window", "medium"),
    createProblem("Longest Repeating Character Replacement", "medium", "sliding-window", "medium"),
    createProblem("Binary Subarrays With Sum", "medium", "sliding-window", "medium"),
    createProblem("Count Number of Nice Subarrays", "medium", "sliding-window", "medium"),
    createProblem("Number of Substrings Containing All Three Characters", "medium", "sliding-window", "medium"),
    createProblem("Maximum Points You Can Obtain from Cards", "medium", "sliding-window", "medium"),
    createProblem("Longest Substring with At Most K Distinct Characters", "medium", "sliding-window", "hard"),
    createProblem("Subarrays with K Different Integers", "hard", "sliding-window", "hard"),
    createProblem("Minimum Window Substring", "hard", "sliding-window", "hard"),

    // --- HEAPS (17) ---
    createProblem("Kth Largest Element", "medium", "heaps", "medium"),
    createProblem("Kth Smallest Element", "medium", "heaps", "medium"),
    createProblem("Merge K Sorted Lists", "hard", "heaps", "medium"),
    createProblem("Replace elements by its rank", "easy", "heaps", "medium"),
    createProblem("Task Scheduler", "medium", "heaps", "medium"),
    createProblem("Hands of Straights", "medium", "heaps", "medium"),
    createProblem("Design Twitter", "medium", "heaps", "hard"),
    createProblem("Median from Data Stream", "hard", "heaps", "hard"),
    createProblem("Top K Frequent Elements", "medium", "heaps", "hard"),

    // --- GREEDY (16) ---
    createProblem("Assign Cookies", "easy", "greedy", "easy"),
    createProblem("Fractional Knapsack", "medium", "greedy", "easy"),
    createProblem("Minimum Coins", "medium", "greedy", "easy"),
    createProblem("Lemonade Change", "easy", "greedy", "easy"),
    createProblem("N Meetings in One Room", "medium", "greedy", "medium"),
    createProblem("Jump Game", "medium", "greedy", "medium"),
    createProblem("Jump Game II", "medium", "greedy", "medium"),
    createProblem("Minimum Platforms", "medium", "greedy", "medium"),
    createProblem("Job Sequencing Problem", "medium", "greedy", "medium"),
    createProblem("Candy", "hard", "greedy", "medium"),
    createProblem("Insert Interval", "medium", "greedy", "medium"),
    createProblem("Merge Intervals", "medium", "greedy", "medium"),
    createProblem("Non Overlapping Intervals", "medium", "greedy", "medium"),

    // --- BINARY TREES (39) ---
    createProblem("Inorder Traversal", "easy", "trees", "traversal"),
    createProblem("Preorder Traversal", "easy", "trees", "traversal"),
    createProblem("Postorder Traversal", "easy", "trees", "traversal"),
    createProblem("Level Order Traversal", "medium", "trees", "traversal"),
    createProblem("Maximum Depth of Binary Tree", "easy", "trees", "medium"),
    createProblem("Check for Balanced Binary Tree", "easy", "trees", "medium"),
    createProblem("Diameter of Binary Tree", "medium", "trees", "medium"),
    createProblem("Maximum Path Sum", "hard", "trees", "medium"),
    createProblem("Check if two trees are identical", "easy", "trees", "medium"),
    createProblem("Zig Zag Traversal", "medium", "trees", "medium"),
    createProblem("Boundary Traversal", "medium", "trees", "medium"),
    createProblem("Vertical Order Traversal", "hard", "trees", "medium"),
    createProblem("Top View of Binary Tree", "medium", "trees", "medium"),
    createProblem("Bottom View of Binary Tree", "medium", "trees", "medium"),
    createProblem("Right View of Binary Tree", "medium", "trees", "medium"),
    createProblem("Symmetric Binary Tree", "easy", "trees", "medium"),
    createProblem("LCA in Binary Tree", "medium", "trees", "hard"),
    createProblem("Maximum Width of Binary Tree", "medium", "trees", "hard"),
    createProblem("Children Sum Property", "medium", "trees", "hard"),
    createProblem("Nodes at distance K", "medium", "trees", "hard"),
    createProblem("Flatten Binary Tree to Linked List", "medium", "trees", "hard"),

    // --- BINARY SEARCH TREES (16) ---
    createProblem("Search in BST", "easy", "bst", "concepts"),
    createProblem("Ceil in a BST", "medium", "bst", "practice"),
    createProblem("Floor in BST", "medium", "bst", "practice"),
    createProblem("Insert a given Node in BST", "medium", "bst", "practice"),
    createProblem("Delete a Node in BST", "medium", "bst", "practice"),
    createProblem("Kth Smallest Element in BST", "medium", "bst", "practice"),
    createProblem("Check if a tree is a BST", "medium", "bst", "practice"),
    createProblem("LCA in BST", "medium", "bst", "practice"),
    createProblem("Construct BST from Preorder Traversal", "medium", "bst", "practice"),
    createProblem("Inorder Successor in BST", "medium", "bst", "practice"),
    createProblem("Two Sum in BST", "easy", "bst", "practice"),
    createProblem("Recover BST", "medium", "bst", "practice"),
    createProblem("Largest BST in Binary Tree", "hard", "bst", "practice"),

    // --- GRAPHS (53) ---
    createProblem("BFS of Graph", "easy", "graphs", "bfs-dfs"),
    createProblem("DFS of Graph", "easy", "graphs", "bfs-dfs"),
    createProblem("Number of Provinces", "medium", "graphs", "bfs-dfs"),
    createProblem("Number of Islands", "medium", "graphs", "bfs-dfs"),
    createProblem("Flood Fill", "easy", "graphs", "bfs-dfs"),
    createProblem("Rotting Oranges", "medium", "graphs", "bfs-dfs"),
    createProblem("Cycle Detection in Undirected Graph (BFS/DFS)", "medium", "graphs", "bfs-dfs"),
    createProblem("0/1 Matrix", "medium", "graphs", "bfs-dfs"),
    createProblem("Surrounded Regions", "medium", "graphs", "bfs-dfs"),
    createProblem("Number of Enclaves", "medium", "graphs", "bfs-dfs"),
    createProblem("Word Ladder I", "hard", "graphs", "bfs-dfs"),
    createProblem("Word Ladder II", "hard", "graphs", "bfs-dfs"),
    createProblem("Bipartite Graph", "medium", "graphs", "bfs-dfs"),
    createProblem("Cycle Detection in Directed Graph", "medium", "graphs", "bfs-dfs"),

    // Topo Sort
    createProblem("Topological Sort", "medium", "graphs", "topo-sort"),
    createProblem("Kahn's Algorithm", "medium", "graphs", "topo-sort"),
    createProblem("Course Schedule I", "medium", "graphs", "topo-sort"),
    createProblem("Course Schedule II", "medium", "graphs", "topo-sort"),
    createProblem("Find Eventual Safe States", "medium", "graphs", "topo-sort"),
    createProblem("Alien Dictionary", "hard", "graphs", "topo-sort"),

    // Shortest Path
    createProblem("Shortest Path in Undirected Graph", "easy", "graphs", "shortest-path"),
    createProblem("Shortest Path in DAG", "medium", "graphs", "shortest-path"),
    createProblem("Dijkstra's Algorithm", "medium", "graphs", "shortest-path"),
    createProblem("Shortest Path in Binary Maze", "medium", "graphs", "shortest-path"),
    createProblem("Path With Minimum Effort", "medium", "graphs", "shortest-path"),
    createProblem("Cheapest Flights Within K Stops", "medium", "graphs", "shortest-path"),
    createProblem("Network Delay Time", "medium", "graphs", "shortest-path"),
    createProblem("Number of Ways to Arrive at Destination", "medium", "graphs", "shortest-path"),
    createProblem("Bellman Ford Algorithm", "medium", "graphs", "shortest-path"),
    createProblem("Floyd Warshall Algorithm", "medium", "graphs", "shortest-path"),

    // MST
    createProblem("Prim's Algorithm", "medium", "graphs", "mst"),
    createProblem("Kruskal's Algorithm", "medium", "graphs", "mst"),
    createProblem("Disjoint Set Union", "medium", "graphs", "mst"),
    createProblem("Number of Operations to Make Network Connected", "medium", "graphs", "mst"),
    createProblem("Most Stones Removed with Same Row or Column", "medium", "graphs", "mst"),
    createProblem("Accounts Merge", "medium", "graphs", "mst"),
    createProblem("Number of Islands II", "hard", "graphs", "mst"),
    createProblem("Making a Large Island", "hard", "graphs", "mst"),
    createProblem("Swim in Rising Water", "hard", "graphs", "mst"),

    // --- DYNAMIC PROGRAMMING (56) ---
    // 1D
    createProblem("Climbing Stairs", "easy", "dp", "1d"),
    createProblem("Frog Jump", "easy", "dp", "1d"),
    createProblem("Max Sum of Non-Adjacent Elements", "medium", "dp", "1d"),
    createProblem("House Robber", "medium", "dp", "1d"),
    createProblem("House Robber II", "medium", "dp", "1d"),

    // Grid
    createProblem("Ninja's Training", "medium", "dp", "grid"),
    createProblem("Unique Paths", "medium", "dp", "grid"),
    createProblem("Unique Paths II", "medium", "dp", "grid"),
    createProblem("Minimum Path Sum", "medium", "dp", "grid"),
    createProblem("Triangle", "medium", "dp", "grid"),
    createProblem("Minimum Falling Path Sum", "medium", "dp", "grid"),

    // Subsequences
    createProblem("Subset Sum Equal to Target", "medium", "dp", "subsequences"),
    createProblem("Partition Equal Subset Sum", "medium", "dp", "subsequences"),
    createProblem("Partition Set Into 2 Subsets with Min Absolute Diff", "hard", "dp", "subsequences"),
    createProblem("Count Subsets with Sum K", "medium", "dp", "subsequences"),
    createProblem("Count Partitions with Given Difference", "medium", "dp", "subsequences"),
    createProblem("Knapsack Problem", "medium", "dp", "subsequences"),
    createProblem("Coin Change", "medium", "dp", "subsequences"),
    createProblem("Target Sum", "medium", "dp", "subsequences"),
    createProblem("Unbounded Knapsack", "medium", "dp", "subsequences"),
    createProblem("Rod Cutting", "medium", "dp", "subsequences"),

    // Strings
    createProblem("Longest Common Subsequence", "medium", "dp", "strings"),
    createProblem("Print LCS", "medium", "dp", "strings"),
    createProblem("Longest Common Substring", "medium", "dp", "strings"),
    createProblem("Longest Palindromic Subsequence", "medium", "dp", "strings"),
    createProblem("Min Insertions to Make String Palindrome", "medium", "dp", "strings"),
    createProblem("Min Operations to Convert String A to B", "medium", "dp", "strings"),
    createProblem("Shortest Common Supersequence", "medium", "dp", "strings"),
    createProblem("Distinct Subsequences", "hard", "dp", "strings"),
    createProblem("Edit Distance", "medium", "dp", "strings"),
    createProblem("Wildcard Matching", "hard", "dp", "strings"),

    // Stocks
    createProblem("Best Time to Buy and Sell Stock", "easy", "dp", "stocks"),
    createProblem("Best Time to Buy and Sell Stock II", "medium", "dp", "stocks"),
    createProblem("Best Time to Buy and Sell Stock III", "hard", "dp", "stocks"),
    createProblem("Best Time to Buy and Sell Stock IV", "hard", "dp", "stocks"),
    createProblem("Buy and Sell Stock with Cooldown", "medium", "dp", "stocks"),
    createProblem("Buy and Sell Stock with Transaction Fee", "medium", "dp", "stocks"),

    // LIS
    createProblem("Longest Increasing Subsequence", "medium", "dp", "lis"),
    createProblem("Largest Divisible Subset", "medium", "dp", "lis"),
    createProblem("Longest String Chain", "medium", "dp", "lis"),
    createProblem("Number of Longest Increasing Subsequences", "medium", "dp", "lis"),

    // Partition DP
    createProblem("Matrix Chain Multiplication", "hard", "dp", "partition"),
    createProblem("Burst Balloons", "hard", "dp", "partition"),
    createProblem("Evaluate Boolean Expression to True", "hard", "dp", "partition"),
    createProblem("Palindrome Partitioning II", "hard", "dp", "partition"),

    // --- TRIES (7) ---
    createProblem("Implement Trie", "medium", "tries", "concepts"),
    createProblem("Implement Trie II", "medium", "tries", "concepts"),
    createProblem("Longest Word With All Prefixes", "medium", "tries", "problems"),
    createProblem("Number of Distinct Substrings in a String", "medium", "tries", "problems"),
    createProblem("Maximum XOR of Two Numbers in an Array", "medium", "tries", "problems"),
    createProblem("Maximum XOR With an Element From Array", "hard", "tries", "problems")
];

async function seedDatabase() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing
        await DSAProblem.deleteMany({});
        console.log("🗑️  Cleared existing problems");

        // Insert new
        const result = await DSAProblem.insertMany(problems);
        console.log(`✅ Inserted ${result.length} problems successfully!`);

        console.log("\n🎉 Database seeded with full Striver's A2Z Sheet!");
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
