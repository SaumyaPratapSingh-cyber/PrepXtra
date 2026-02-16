
// Part 2: Remaining DSA + JavaScript problem descriptions
const descriptions = {
    "merge-two-sorted-lists": `You are given the heads of two sorted linked lists \`list1\` and \`list2\`. Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists. Return *the head of the merged linked list*.

**Example 1:**
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

**Example 2:**
Input: list1 = [], list2 = []
Output: []

**Constraints:**
- The number of nodes in both lists is in the range \`[0, 50]\`.
- \`-100 <= Node.val <= 100\`
- Both \`list1\` and \`list2\` are sorted in **non-decreasing** order.`,

    "reorder-list": `You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln. *Reorder the list to be on the following form:* L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

**Example 1:**
Input: head = [1,2,3,4]
Output: [1,4,2,3]

**Example 2:**
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

**Constraints:**
- The number of nodes in the list is in the range \`[1, 5 * 10^4]\`.
- \`1 <= Node.val <= 1000\``,

    "remove-nth-node-from-end-of-list": `Given the \`head\` of a linked list, remove the \`nth\` node from the end of the list and return its head.

**Example 1:**
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

**Example 2:**
Input: head = [1], n = 1
Output: []

**Constraints:**
- The number of nodes in the list is \`sz\`.
- \`1 <= sz <= 30\`
- \`0 <= Node.val <= 100\`
- \`1 <= n <= sz\``,

    "copy-list-with-random-pointer": `A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or \`null\`. Construct a **deep copy** of the list.

**Example 1:**
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

**Constraints:**
- \`0 <= n <= 1000\`
- \`-10^4 <= Node.val <= 10^4\`
- \`Node.random\` is \`null\` or is pointing to some node in the linked list.`,

    "linked-list-cycle": `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it. Return \`true\` if there is a cycle, otherwise return \`false\`.

**Example 1:**
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

**Constraints:**
- The number of the nodes in the list is in the range \`[0, 10^4]\`.
- \`-10^5 <= Node.val <= 10^5\`
- \`pos\` is \`-1\` or a **valid index** in the linked-list.`,

    "find-the-duplicate-number": `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive. There is only **one repeated number** in \`nums\`, return *this repeated number*.

You must solve the problem **without** modifying the array \`nums\` and uses only constant extra space.

**Example 1:**
Input: nums = [1,3,4,2,2]
Output: 2

**Example 2:**
Input: nums = [3,1,3,4,2]
Output: 3

**Constraints:**
- \`1 <= n <= 10^5\`
- \`nums.length == n + 1\`
- \`1 <= nums[i] <= n\`
- All the integers in \`nums\` appear only **once** except for precisely one integer which appears **two or more** times.`,

    "invert-binary-tree": `Given the \`root\` of a binary tree, invert the tree, and return *its root*.

**Example 1:**
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

**Example 2:**
Input: root = [2,1,3]
Output: [2,3,1]

**Constraints:**
- The number of nodes in the tree is in the range \`[0, 100]\`.
- \`-100 <= Node.val <= 100\``,

    "same-tree": `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Example 1:**
Input: p = [1,2,3], q = [1,2,3]
Output: true

**Example 2:**
Input: p = [1,2], q = [1,null,2]
Output: false

**Constraints:**
- The number of nodes in both trees is in the range \`[0, 100]\`.
- \`-10^4 <= Node.val <= 10^4\``,

    "subtree-of-another-tree": `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.

**Example 1:**
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true

**Example 2:**
Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false

**Constraints:**
- The number of nodes in the \`root\` tree is in the range \`[1, 2000]\`.
- The number of nodes in the \`subRoot\` tree is in the range \`[1, 1000]\`.
- \`-10^4 <= root.val <= 10^4\`
- \`-10^4 <= subRoot.val <= 10^4\``,

    "lowest-common-ancestor-of-a-binary-search-tree": `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow **a node to be a descendant of itself**).

**Example 1:**
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6

**Constraints:**
- The number of nodes in the tree is in the range \`[2, 10^5]\`.
- \`-10^9 <= Node.val <= 10^9\`
- All \`Node.val\` are **unique**.
- \`p != q\`
- \`p\` and \`q\` will exist in the BST.`,

    "binary-tree-level-order-traversal": `Given the \`root\` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).

**Example 1:**
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

**Example 2:**
Input: root = [1]
Output: [[1]]

**Constraints:**
- The number of nodes in the tree is in the range \`[0, 2000]\`.
- \`-1000 <= Node.val <= 1000\``,

    "validate-binary-search-tree": `Given the \`root\` of a binary tree, *determine if it is a valid binary search tree (BST)*.

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Example 1:**
Input: root = [2,1,3]
Output: true

**Example 2:**
Input: root = [5,1,4,null,null,3,6]
Output: false

**Constraints:**
- The number of nodes in the tree is in the range \`[1, 10^4]\`.
- \`-2^31 <= Node.val <= 2^31 - 1\``,

    "kth-smallest-element-in-a-bst": `Given the \`root\` of a binary search tree, and an integer \`k\`, return *the* \`kth\` *smallest value (**1-indexed**) of all the values of the nodes in the tree*.

**Example 1:**
Input: root = [3,1,4,null,2], k = 1
Output: 1

**Example 2:**
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

**Constraints:**
- The number of nodes in the tree is \`n\`.
- \`1 <= k <= n <= 10^4\`
- \`0 <= Node.val <= 10^4\``,

    "construct-binary-tree-from-preorder-and-inorder-traversal": `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return *the binary tree*.

**Example 1:**
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

**Constraints:**
- \`1 <= preorder.length <= 3000\`
- \`inorder.length == preorder.length\`
- \`-3000 <= preorder[i], inorder[i] <= 3000\`
- \`preorder\` and \`inorder\` consist of **unique** values.`,

    "implement-trie-prefix-tree": `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement the Trie class:
- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie.
- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`.

**Example 1:**
Input: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output: [null, null, true, false, true, null, true]

**Constraints:**
- \`1 <= word.length, prefix.length <= 2000\`
- \`word\` and \`prefix\` consist only of lowercase English letters.
- At most \`3 * 10^4\` calls **in total** will be made to \`insert\`, \`search\`, and \`startsWith\`.`,

    "design-add-and-search-words-data-structure": `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
- \`WordDictionary()\` Initializes the object.
- \`void addWord(word)\` Adds \`word\` to the data structure, it can be matched later.
- \`bool search(word)\` Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.

**Example 1:**
Input: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output: [null,null,null,null,false,true,true,true]

**Constraints:**
- \`1 <= word.length <= 25\`
- \`word\` in \`addWord\` consists of lowercase English letters.
- \`word\` in \`search\` consist of \`'.'\` or lowercase English letters.
- There will be at most \`3\` dots in \`word\` for \`search\` queries.
- At most \`10^4\` calls will be made to \`addWord\` and \`search\`.`,

    "word-search-ii": `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return *all words on the board*.

Each word must be constructed from letters of sequentially adjacent cells, where **adjacent cells** are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

**Example 1:**
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

**Constraints:**
- \`m == board.length\`
- \`n == board[i].length\`
- \`1 <= m, n <= 12\`
- \`board[i][j]\` is a lowercase English letter.
- \`1 <= words.length <= 3 * 10^4\`
- \`1 <= words[i].length <= 10\`
- \`words[i]\` consists of lowercase English letters.
- All the strings of \`words\` are unique.`,

    "kth-largest-element-in-a-stream": `Design a class to find the \`kth\` largest element in a stream. Note that it is the \`kth\` largest element in the sorted order, not the \`kth\` distinct element.

**Example 1:**
Input: ["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]

**Constraints:**
- \`1 <= k <= 10^4\`
- \`0 <= nums.length <= 10^4\`
- \`-10^4 <= val <= 10^4\`
- At most \`10^4\` calls will be made to \`add\`.`,

    "find-median-from-data-stream": `The **median** is the middle value in an ordered integer list. Implement the MedianFinder class:
- \`MedianFinder()\` initializes the MedianFinder object.
- \`void addNum(int num)\` adds the integer \`num\` from the data stream.
- \`double findMedian()\` returns the median of all elements so far.

**Example 1:**
Input: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output: [null, null, null, 1.5, null, 2.0]

**Constraints:**
- \`-10^5 <= num <= 10^5\`
- There will be at least one element in the data structure before calling \`findMedian\`.
- At most \`5 * 10^4\` calls will be made to \`addNum\` and \`findMedian\`.`,

    "walls-and-gates": `You are given an \`m x n\` grid \`rooms\` initialized with these three possible values:
- \`-1\` A wall or an obstacle.
- \`0\` A gate.
- \`INF\` Infinity means an empty room. We use the value \`2^31 - 1 = 2147483647\` to represent \`INF\`.

Fill each empty room with the distance to its **nearest gate**. If it is impossible to reach a gate, leave it as \`INF\`.

**Example 1:**
Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

**Constraints:**
- \`m == rooms.length\`
- \`n == rooms[i].length\`
- \`1 <= m, n <= 250\``,

    "number-of-connected-components-in-an-undirected-graph": `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.

Return *the number of connected components in the graph*.

**Example 1:**
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

**Constraints:**
- \`1 <= n <= 2000\`
- \`1 <= edges.length <= 5000\`
- \`edges[i].length == 2\`
- \`0 <= ai <= bi < n\`
- \`ai != bi\`
- There are no repeated edges.`,

    "graph-valid-tree": `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between nodes \`ai\` and \`bi\`.

Return \`true\` *if the edges of the given graph make up a valid tree, and* \`false\` *otherwise*.

**Example 1:**
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true

**Example 2:**
Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false

**Constraints:**
- \`1 <= n <= 2000\`
- \`0 <= edges.length <= 5000\``,

    "reconstruct-itinerary": `You are given a list of airline \`tickets\` where \`tickets[i] = [fromi, toi]\` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from \`"JFK"\`, thus, the itinerary must begin with \`"JFK"\`. If there are multiple valid itineraries, return the itinerary that has the smallest lexical order when read as a single string.

**Example 1:**
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]

**Constraints:**
- \`1 <= tickets.length <= 300\`
- \`tickets[i].length == 2\`
- \`fromi.length == 3\`
- \`toi.length == 3\`
- \`fromi\` and \`toi\` consist of uppercase English letters.
- \`fromi != toi\``,

    "min-cost-to-connect-all-points": `You are given an array \`points\` representing integer coordinates of some points on a 2D-plane, where \`points[i] = [xi, yi]\`.

The cost of connecting two points \`[xi, yi]\` and \`[xj, yj]\` is the **manhattan distance** between them: \`|xi - xj| + |yi - yj|\`.

Return *the minimum cost to make all points connected*. All points are connected if there is **exactly one** simple path between any two points.

**Example 1:**
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20

**Constraints:**
- \`1 <= points.length <= 1000\`
- \`-10^6 <= xi, yi <= 10^6\`
- All pairs \`(xi, yi)\` are distinct.`,

    "best-time-to-buy-and-sell-stock-with-cooldown": `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

**Note:** You may not engage in multiple transactions simultaneously.

**Example 1:**
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]

**Constraints:**
- \`1 <= prices.length <= 5000\`
- \`0 <= prices[i] <= 1000\``,

    "longest-increasing-path-in-a-matrix": `Given an \`m x n\` integers \`matrix\`, return *the length of the longest increasing path in* \`matrix\`.

From each cell, you can either move in four directions: left, right, up, or down. You **may not** move **diagonally** or move **outside the boundary**.

**Example 1:**
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is \`[1, 2, 6, 9]\`.

**Constraints:**
- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 200\`
- \`0 <= matrix[i][j] <= 2^31 - 1\``,

    "merge-triplets-to-form-target-triplet": `A **triplet** is an array of three integers. You are given a 2D integer array \`triplets\`, where \`triplets[i] = [ai, bi, ci]\` describes the \`ith\` **triplet**. You are also given an integer array \`target = [x, y, z]\` that describes the **triplet** you want to obtain.

To obtain \`target\`, you may apply the following operation on \`triplets\` **any number** of times: Choose two indices \`i\` and \`j\` and **update** \`triplets[j]\` to become \`[max(ai, aj), max(bi, bj), max(ci, cj)]\`.

Return \`true\` *if it is possible to obtain the target triplet* \`[x, y, z]\` *as an element of* \`triplets\`*, or* \`false\` *otherwise*.

**Example 1:**
Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true

**Constraints:**
- \`1 <= triplets.length <= 10^5\`
- \`triplets[i].length == target.length == 3\`
- \`1 <= ai, bi, ci, x, y, z <= 1000\``,

    "meeting-rooms": `Given an array of meeting time intervals where \`intervals[i] = [starti, endi]\`, determine if a person could attend all meetings.

**Example 1:**
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false

**Example 2:**
Input: intervals = [[7,10],[2,4]]
Output: true

**Constraints:**
- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti < endi <= 10^6\``,

    "meeting-rooms-ii": `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return *the minimum number of conference rooms required*.

**Example 1:**
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

**Example 2:**
Input: intervals = [[7,10],[2,4]]
Output: 1

**Constraints:**
- \`1 <= intervals.length <= 10^4\`
- \`0 <= starti < endi <= 10^6\``,

    "minimum-interval-to-include-each-query": `You are given a 2D integer array \`intervals\`, where \`intervals[i] = [lefti, righti]\` describes the \`ith\` interval starting at \`lefti\` and ending at \`righti\` (**inclusive**). The **size** of an interval is defined as the number of integers it contains, or more formally \`righti - lefti + 1\`.

You are also given an integer array \`queries\`. The answer to the \`jth\` query is the **size of the smallest interval** \`i\` such that \`lefti <= queries[j] <= righti\`. If no such interval exists, the answer is \`-1\`.

Return *an array containing the answers to the queries*.

**Example 1:**
Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
Output: [3,3,1,4]

**Constraints:**
- \`1 <= intervals.length <= 10^5\`
- \`1 <= queries.length <= 10^5\`
- \`intervals[i].length == 2\`
- \`1 <= lefti <= righti <= 10^7\`
- \`1 <= queries[j] <= 10^7\``,

    "rotate-image": `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90 degrees** (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

**Example 1:**
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

**Constraints:**
- \`n == matrix.length == matrix[i].length\`
- \`1 <= n <= 20\`
- \`-1000 <= matrix[i][j] <= 1000\``,

    "set-matrix-zeroes": `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s. You must do it **in place**.

**Example 1:**
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

**Constraints:**
- \`m == matrix.length\`
- \`n == matrix[0].length\`
- \`1 <= m, n <= 200\`
- \`-2^31 <= matrix[i][j] <= 2^31 - 1\``,

    "happy-number": `Write an algorithm to determine if a number \`n\` is happy.

A **happy number** is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
- Those numbers for which this process **ends in 1** are happy.

Return \`true\` *if* \`n\` *is a happy number, and* \`false\` *if not*.

**Example 1:**
Input: n = 19
Output: true (1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1)

**Constraints:**
- \`1 <= n <= 2^31 - 1\``,

    "powx-n": `Implement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).

**Example 1:**
Input: x = 2.00000, n = 10
Output: 1024.00000

**Example 2:**
Input: x = 2.10000, n = 3
Output: 9.26100

**Constraints:**
- \`-100.0 < x < 100.0\`
- \`-2^31 <= n <= 2^31 - 1\`
- \`n\` is an integer.
- Either \`x\` is not zero or \`n > 0\`.
- \`-10^4 <= x^n <= 10^4\``,

    "detect-squares": `You are given a stream of points on the X-Y plane. Design a data structure that:
- **Adds** new points from the stream into a data structure. **Duplicate** points are allowed and should be treated as different points.
- Given a query point, **counts** the number of ways to choose three points from the data structure such that the three points and the query point form an **axis-aligned square** with **positive area**.

**Example 1:**
Input: ["DetectSquares", "add", "add", "add", "count", "count", "add", "count"]
[[], [[3, 10]], [[11, 1]], [[3, 1]], [[11, 10]], [[14, 8]], [[11, 10]], [[11, 10]]]
Output: [null, null, null, null, 1, 0, null, 2]

**Constraints:**
- \`point.length == 2\`
- \`0 <= x, y <= 1000\`
- At most \`3000\` calls **in total** will be made to \`add\` and \`count\`.`,

    "number-of-1-bits": `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the **Hamming weight**).

**Example 1:**
Input: n = 11
Output: 3 (The input binary string \`1011\` has three set bits.)

**Example 2:**
Input: n = 128
Output: 1 (The input binary string \`10000000\` has one set bit.)

**Constraints:**
- \`1 <= n <= 2^31 - 1\``,

    "create-hello-world-function": `Write a function \`createHelloWorld\`. It should return a new function that always returns \`"Hello World"\`.

**Example 1:**
Input: args = []
Output: "Hello World"

**Example 2:**
Input: args = [{},null,42]
Output: "Hello World"

**Constraints:**
- \`0 <= args.length <= 10\``,

    "counter": `Given an integer \`n\`, return a \`counter\` function. This \`counter\` function initially returns \`n\` and then returns 1 more than the previous value every subsequent time it is called (\`n\`, \`n + 1\`, \`n + 2\`, etc).

**Example 1:**
Input: n = 10, ["call","call","call"]
Output: [10,11,12]

**Example 2:**
Input: n = -2, ["call","call","call","call","call"]
Output: [-2,-1,0,1,2]

**Constraints:**
- \`-1000 <= n <= 1000\`
- \`0 <= calls.length <= 1000\``,

    "counter-ii": `Write a function \`createCounter\`. It should accept an initial integer \`init\`. It should return an object with three functions: \`increment()\` increases the current value by 1 and then returns it; \`decrement()\` reduces the current value by 1 and then returns it; \`reset()\` sets the current value to \`init\` and then returns it.

**Example 1:**
Input: init = 5, calls = ["increment","reset","decrement"]
Output: [6,5,4]

**Constraints:**
- \`-1000 <= init <= 1000\`
- \`0 <= calls.length <= 1000\``,

    "apply-transform-over-each-element-in-array": `Given an integer array \`arr\` and a mapping function \`fn\`, return a new array with a transformation applied to each element. The returned array should be created such that \`returnedArray[i] = fn(arr[i], i)\`.

Please solve it without the built-in \`Array.map\` method.

**Example 1:**
Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
Output: [2,3,4]

**Constraints:**
- \`0 <= arr.length <= 1000\`
- \`-10^9 <= arr[i] <= 10^9\`
- \`fn\` returns a number`,

    "filter-elements-from-array": `Given an integer array \`arr\` and a filtering function \`fn\`, return a filtered array \`filteredArr\`.

The \`fn\` function takes one or two arguments:
- \`arr[i]\` - number from the \`arr\`
- \`i\` - index of \`arr[i]\`

\`filteredArr\` should only contain the elements from the \`arr\` for which the expression \`fn(arr[i], i)\` evaluates to a truthy value. Please solve it without the built-in \`Array.filter\` method.

**Example 1:**
Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
Output: [20,30]

**Constraints:**
- \`0 <= arr.length <= 1000\`
- \`-10^9 <= arr[i] <= 10^9\``,

    "array-reduce-transformation": `Given an integer array \`nums\`, a reducer function \`fn\`, and an initial value \`init\`, return the final result obtained by executing the \`fn\` function on each element of the array, sequentially, passing in the return value from the calculation on the preceding element.

\`result = fn(init, nums[0])\`, \`fn(result, nums[1])\`, ...

Please solve it without using the built-in \`Array.reduce\` method.

**Example 1:**
Input: nums = [1,2,3,4], fn = function sum(accum, curr) { return accum + curr; }, init = 0
Output: 10

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`0 <= nums[i] <= 1000\`
- \`0 <= init <= 1000\``,

    "function-composition": `Given an array of functions \`[f1, f2, f3, ..., fn]\`, return a new function \`fn\` that is the **function composition** of the array of functions.

The **function composition** of \`[f(x), g(x), h(x)]\` is \`fn(x) = f(g(h(x)))\`.

**Example 1:**
Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
Output: 65

**Constraints:**
- \`-1000 <= x <= 1000\`
- \`0 <= functions.length <= 1000\`
- all functions accept and return a single integer`,

    "allow-one-function-call": `Given a function \`fn\`, return a new function that is identical to the original function except that it ensures \`fn\` is called at most once.

The first time the returned function is called, it should return the same result as \`fn\`. Every subsequent time it is called, it should return \`undefined\`.

**Example 1:**
Input: fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]
Output: [{"calls":1,"value":6},{"calls":2,"value":undefined}]

**Constraints:**
- \`calls\` is a valid JSON array
- \`1 <= calls.length <= 10\`
- \`1 <= calls[i].length <= 100\`
- \`2 <= JSON.stringify(googcalls).length <= 1000\``,

    "memoize": `Given a function \`fn\`, return a **memoized** version of that function.

A **memoized** function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

You can assume there are **3** possible input functions: \`sum\`, \`fib\`, and \`factorial\`.

**Example 1:**
Input: fnName = "sum", actions = ["call","call","getCallCount","call","getCallCount"], values = [[2,2],[2,2],[],[1,2],[]]
Output: [4,4,1,3,2]

**Constraints:**
- \`0 <= a, b <= 10^5\`
- \`1 <= n <= 10\`
- \`0 <= actions.length <= 10^5\`
- actions.length === values.length`,

    "curry": `Given a function \`fn\`, return a **curried** version of that function.

A **curried** function is a function that accepts fewer or an equal number of parameters as the original function and returns either another **curried** function or the same value the original function would have returned.

**Example 1:**
Input: fn = function sum(a, b, c) { return a + b + c; }, inputs = [[1],[2],[3]]
Output: 6

**Constraints:**
- \`1 <= inputs.length <= 1000\`
- \`0 <= inputs[i][j] <= 10^5\`
- \`0 <= fn.length <= 1000\`
- inputs.flat().length == fn.length`,

    "sleep": `Given a positive integer \`millis\`, write an asynchronous function that sleeps for \`millis\` milliseconds. It can resolve any value.

**Example 1:**
Input: millis = 100
Output: 100 (Returned promise resolves after 100ms)

**Constraints:**
- \`1 <= millis <= 1000\``,

    "promise-time-limit": `Given an asynchronous function \`fn\` and a time \`t\` in milliseconds, return a new **time limited** version of the input function. \`fn\` takes arguments provided to the **time limited** function.

If the \`fn\` resolves within the time limit of \`t\` milliseconds, the **time limited** function should resolve with the same result. Otherwise, it should reject with the string \`"Time Limit Exceeded"\`.

**Example 1:**
Input: fn = async (n) => { await new Promise(res => setTimeout(res, 100)); return n * n; }, inputs = [5], t = 150
Output: {"resolved":25,"time":100}

**Constraints:**
- \`0 <= inputs.length <= 10\`
- \`0 <= t <= 1000\`
- \`fn\` returns a promise`,

    "promise-pool": `Given an array of asynchronous functions \`functions\` and a **pool limit** \`n\`, return an asynchronous function \`promisePool\`. It should return a promise that resolves when all the input functions resolve.

**Pool limit** is defined as the maximum number promises that can be pending at once. \`promisePool\` should begin execution of as many functions as possible, and when any promise resolves, another function should begin execution.

**Example 1:**
Input: functions = [() => new Promise(res => setTimeout(res, 300)), () => new Promise(res => setTimeout(res, 400)), () => new Promise(res => setTimeout(res, 200))], n = 2
Output: {"t":500,"resolved":[]}

**Constraints:**
- \`0 <= functions.length <= 10\`
- \`1 <= n <= 10\``,

    "cache-with-time-limit": `Write a class that allows getting and setting key-value pairs, however a **time until expiration** is associated with each key.

The class has three public methods:
- \`set(key, value, duration)\`: accepts an integer \`key\`, an integer \`value\`, and a \`duration\` in milliseconds. If the key already exists and has not expired, returns \`true\`, otherwise \`false\`. Sets or updates key-value pair.
- \`get(key)\`: If an un-expired key exists, returns the associated value. Otherwise returns \`-1\`.
- \`count()\`: Returns the count of un-expired keys.

**Example 1:**
Input: actions = ["TimeLimitedCache", "set", "get", "count", "get"], values = [[], [1, 42, 100], [1], [], [1]], timeDelays = [0, 0, 50, 50, 150]
Output: [null, false, 42, 1, -1]

**Constraints:**
- \`0 <= key, value <= 10^9\`
- \`0 <= duration <= 1000\`
- \`1 <= actions.length <= 100\``,

    "debounce": `Given a function \`fn\` and a time in milliseconds \`t\`, return a **debounced** version of that function.

A **debounced** function is a function whose execution is delayed by \`t\` milliseconds and whose execution is cancelled if it is called again within that window of time. The debounced function should also receive the passed parameters.

**Example 1:**
Input: t = 50, calls = [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]}]
Output: [{"t":125,"inputs":[2]}]

**Constraints:**
- \`0 <= t <= 1000\`
- \`1 <= calls.length <= 10\`
- \`0 <= calls[i].t <= 1000\`
- \`0 <= calls[i].inputs.length <= 10\``,

    "throttle": `Given a function \`fn\` and a time in milliseconds \`t\`, return a **throttled** version of that function.

A **throttled** function is first called without delay and then, for a time interval of \`t\` milliseconds, can't be executed but should store the latest function arguments provided to call \`fn\` with them after the end of the delay.

**Example 1:**
Input: t = 100, calls = [{"t":20,"inputs":[1]}]
Output: [{"t":20,"inputs":[1]}]

**Constraints:**
- \`0 <= t <= 1000\`
- \`1 <= calls.length <= 10\`
- \`0 <= calls[i].t <= 1000\`
- \`0 <= calls[i].inputs.length <= 10\``,

    "json-deep-equal": `Given two objects \`o1\` and \`o2\`, check if they are **deeply equal**.

Two values are considered deeply equal when:
- They are exactly equal (using \`===\`).
- They are both objects of the same type, have the same keys, and all values are deeply equal.
- They are both arrays, have the same length, and all values are deeply equal.

**Example 1:**
Input: o1 = {"x":1,"y":2}, o2 = {"x":1,"y":2}
Output: true

**Constraints:**
- \`1 <= JSON.stringify(o1).length <= 10^5\`
- \`1 <= JSON.stringify(o2).length <= 10^5\`
- \`maxNestingDepth <= 1000\``,

    "convert-object-to-json-string": `Given a value, return a valid JSON string of that value. The value can be a string, number, array, object, boolean, or null.

**Example 1:**
Input: object = {"y":1,"x":2}
Output: '{"y":1,"x":2}'

**Constraints:**
- \`value\` is a valid JSON value
- \`1 <= JSON.stringify(object).length <= 10^5\`
- \`maxNestingDepth <= 1000\`
- all strings contain only alphanumeric characters`,

    "array-of-objects-to-matrix": `Write a function that converts an array of objects \`arr\` into a matrix \`m\`.

\`arr\` is an array of objects or arrays. Each item has a unique set of key-value pairs. \`m\` is a 2D array. The first row should be the column headings. If there is no data for a given cell, the corresponding cell should be an empty string \`""\`.

**Example 1:**
Input: arr = [{"b": 1, "a": 2}, {"b": 3, "a": 4}]
Output: [["a","b"],[2,1],[4,3]]

**Constraints:**
- \`arr\` is a valid JSON array
- \`1 <= arr.length <= 1000\`
- \`unique keys <= 1000\``,

    "differences-between-two-objects": `Write a function that accepts two deeply nested objects \`obj1\` and \`obj2\` and returns a new object representing their differences.

The function should return the changes from \`obj2\` relative to \`obj1\`.

**Example 1:**
Input: obj1 = {}, obj2 = {"a": 1, "b": 2}
Output: {}

**Constraints:**
- Both objects are valid JSON objects
- \`2 <= JSON.stringify(obj).length <= 10^4\``,

    "chunk-array": `Given an array \`arr\` and a chunk size \`size\`, return a **chunked** array. A **chunked** array contains the original elements in \`arr\`, but consists of subarrays each of length \`size\`. The length of the last subarray may be less than \`size\` if \`arr.length\` is not evenly divisible by \`size\`.

**Example 1:**
Input: arr = [1,2,3,4,5], size = 1
Output: [[1],[2],[3],[4],[5]]

**Example 2:**
Input: arr = [1,9,6,3,2], size = 3
Output: [[1,9,6],[3,2]]

**Constraints:**
- \`arr\` is a valid JSON array
- \`2 <= JSON.stringify(arr).length <= 10^5\`
- \`1 <= size <= arr.length\``,

    "flatten-deeply-nested-array": `Given a **multi-dimensional** array \`arr\` and a depth \`n\`, return a **flattened** version of that array.

A **multi-dimensional** array is a recursive data structure that contains integers or other **multi-dimensional** arrays.

A **flattened** array is a version of that array with some or all of the sub-arrays removed and replaced with the actual elements in that sub-array. This flattening operation should only be done if the current depth of nesting is less than \`n\`.

**Example 1:**
Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 0
Output: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

**Constraints:**
- \`0 <= count of numbers in arr <= 10^5\`
- \`0 <= count of subarrays in arr <= 10^5\`
- \`maxDepth <= 1000\`
- \`-1000 <= each number <= 1000\`
- \`0 <= n <= 1000\``,

    "array-prototype-last": `Write code that enhances all arrays such that you can call the \`array.last()\` method on any array and it will return the last element. If there are no elements in the array, it should return \`-1\`.

You may assume the array is the output of \`JSON.parse\`.

**Example 1:**
Input: nums = [null, {}, 3]
Output: 3

**Example 2:**
Input: nums = []
Output: -1

**Constraints:**
- \`arr\` is a valid JSON array
- \`0 <= arr.length <= 1000\``,

    "group-by": `Write code that enhances all arrays such that you can call the \`array.groupBy(fn)\` method on any array and it will return a **grouped** version of the array.

A **grouped** array is an object where each key is the output of \`fn(arr[i])\` and each value is an array containing all items in the original array with that key.

**Example 1:**
Input: array = [{"id":"1"},{"id":"1"},{"id":"2"}], fn = function (item) { return item.id; }
Output: {"1":[{"id":"1"},{"id":"1"}],"2":[{"id":"2"}]}

**Constraints:**
- \`0 <= array.length <= 10^5\`
- \`fn\` returns a string`,

    "check-if-object-instance-of-class": `Write a function that checks if a given value is an instance of a given class or superclass. For this problem, an object is considered an instance of a given class if that object has access to that class's methods.

There are no constraints on the data types that can be passed to the function. For example, the value or the class could be \`undefined\`.

**Example 1:**
Input: func = () => checkIfInstanceOf(new Date(), Date)
Output: true

**Example 2:**
Input: func = () => checkIfInstanceOf(Date, Date)
Output: false

**Constraints:**
- \`1 <= func.length <= 10\``,

    "call-function-with-custom-context": `Enhance all functions to have a \`callPolyfill\` method. The method accepts an object \`obj\` as its first parameter and any number of additional arguments. The \`obj\` becomes the \`this\` context for the function.

**Example 1:**
Input: fn = function add(b) { return this.a + b; }, obj = {"a": 5}, args = [7]
Output: 12

**Constraints:**
- \`obj\` is a valid JSON object
- \`fn\` is a function\`
- \`fn.length\` is in the range \`[0, 5]\``,

    "event-emitter": `Design an \`EventEmitter\` class. This interface is similar (but with some differences) to the one found in Node.js or the Event Target interface of the DOM.

The \`EventEmitter\` should allow for subscribing to events and emitting them.
- \`subscribe(eventName, callback)\` - Subscribes to an event with a callback. Returns a subscription object with an \`unsubscribe\` method.
- \`emit(eventName, args)\` - Trigger all callbacks subscribed to \`eventName\` with the provided \`args\`. Returns an array of results.

**Example 1:**
Input: actions = ["EventEmitter", "emit", "subscribe", "subscribe", "emit"], values = [[], ["firstEvent", "function cb1(...args){return args.join(',');}"], ["firstEvent", "function cb1(...args){return args.join(',');}"], ["firstEvent", "function cb2(...args){return args.join(',');}"], ["firstEvent", [1,2,3]]]
Output: [[], ["emitted", []], ["subscribed"], ["subscribed"], ["emitted", ["1,2,3", "1,2,3"]]]

**Constraints:**
- \`1 <= actions.length <= 10\``,

    "array-wrapper": `Create a class \`ArrayWrapper\` that accepts an array of integers in its constructor. This class should have two features:
- When two instances of this class are added together with the \`+\` operator, the resulting value is the sum of all the elements in both arrays.
- When the \`String()\` function is called on the instance, it will return a comma separated string surrounded by brackets.

**Example 1:**
Input: nums = [[1,2],[3,4]], operation = "Add"
Output: 10

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`0 <= nums[i] <= 1000\`
- \`Note: nums is the array passed to the constructor\``,

    "generate-fibonacci-sequence": `Write a generator function that returns a generator object which yields the **fibonacci sequence**.

The **fibonacci sequence** is defined by the relation \`Xn = Xn-1 + Xn-2\`. The first few numbers of the series are \`0, 1, 1, 2, 3, 5, 8, 13\`.

**Example 1:**
Input: callCount = 5
Output: [0,1,1,2,3]

**Constraints:**
- \`0 <= callCount <= 50\``,

    "nested-array-generator": `Given a **multi-dimensional array** of integers, return a generator object which yields integers in the same order as \`inorder traversal\`.

A **multi-dimensional array** is a recursive data structure that contains both integers and other **multi-dimensional arrays**.

**Example 1:**
Input: arr = [[[6]],[1,3],[]]
Output: [6,1,3]

**Constraints:**
- \`0 <= arr.flat().length <= 10^5\`
- \`0 <= arr.flat()[i] <= 10^5\`
- \`maxNestingDepth <= 10^5\``,
};

module.exports = descriptions;
