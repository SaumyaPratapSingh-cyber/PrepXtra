// Part 2: Linked List, Trees, Tries, Heap, Backtracking, Graphs, DP, Greedy, Intervals, Math, Bit Manipulation
const problems = {
    // ========== LINKED LIST ==========
    "reverse-linked-list": { fn: "reverseList", params: "head: Optional[ListNode]", ret: "Optional[ListNode]", tests: [{ input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" }, { input: "[1,2]", output: "[2,1]" }] },
    "merge-two-sorted-lists": { fn: "mergeTwoLists", params: "list1: Optional[ListNode], list2: Optional[ListNode]", ret: "Optional[ListNode]", tests: [{ input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]" }] },
    "reorder-list": { fn: "reorderList", params: "head: Optional[ListNode]", ret: "None", tests: [] },
    "remove-nth-node-from-end-of-list": { fn: "removeNthFromEnd", params: "head: Optional[ListNode], n: int", ret: "Optional[ListNode]", tests: [{ input: "[1,2,3,4,5]\n2", output: "[1,2,3,5]" }] },
    "copy-list-with-random-pointer": { fn: "copyRandomList", params: "head: Optional[Node]", ret: "Optional[Node]", tests: [] },
    "add-two-numbers": { fn: "addTwoNumbers", params: "l1: Optional[ListNode], l2: Optional[ListNode]", ret: "Optional[ListNode]", tests: [{ input: "[2,4,3]\n[5,6,4]", output: "[7,0,8]" }] },
    "linked-list-cycle": { fn: "hasCycle", params: "head: Optional[ListNode]", ret: "bool", tests: [] },
    "find-the-duplicate-number": { fn: "findDuplicate", params: "nums: List[int]", ret: "int", tests: [{ input: "[1,3,4,2,2]", output: "2" }, { input: "[3,1,3,4,2]", output: "3" }] },
    "merge-k-sorted-lists": { fn: "mergeKLists", params: "lists: List[Optional[ListNode]]", ret: "Optional[ListNode]", tests: [] },
    "lru-cache": { fn: "lruCache", params: "", ret: "None", tests: [] },

    // ========== TREES ==========
    "invert-binary-tree": { fn: "invertTree", params: "root: Optional[TreeNode]", ret: "Optional[TreeNode]", tests: [] },
    "maximum-depth-of-binary-tree": { fn: "maxDepth", params: "root: Optional[TreeNode]", ret: "int", tests: [] },
    "diameter-of-binary-tree": { fn: "diameterOfBinaryTree", params: "root: Optional[TreeNode]", ret: "int", tests: [] },
    "balanced-binary-tree": { fn: "isBalanced", params: "root: Optional[TreeNode]", ret: "bool", tests: [] },
    "same-tree": { fn: "isSameTree", params: "p: Optional[TreeNode], q: Optional[TreeNode]", ret: "bool", tests: [] },
    "subtree-of-another-tree": { fn: "isSubtree", params: "root: Optional[TreeNode], subRoot: Optional[TreeNode]", ret: "bool", tests: [] },
    "lowest-common-ancestor-of-a-binary-search-tree": { fn: "lowestCommonAncestor", params: "root: TreeNode, p: TreeNode, q: TreeNode", ret: "TreeNode", tests: [] },
    "binary-tree-level-order-traversal": { fn: "levelOrder", params: "root: Optional[TreeNode]", ret: "List[List[int]]", tests: [] },
    "binary-tree-right-side-view": { fn: "rightSideView", params: "root: Optional[TreeNode]", ret: "List[int]", tests: [] },
    "count-good-nodes-in-binary-tree": { fn: "goodNodes", params: "root: TreeNode", ret: "int", tests: [] },
    "validate-binary-search-tree": { fn: "isValidBST", params: "root: Optional[TreeNode]", ret: "bool", tests: [] },
    "kth-smallest-element-in-a-bst": { fn: "kthSmallest", params: "root: Optional[TreeNode], k: int", ret: "int", tests: [] },
    "construct-binary-tree-from-preorder-and-inorder-traversal": { fn: "buildTree", params: "preorder: List[int], inorder: List[int]", ret: "Optional[TreeNode]", tests: [] },
    "binary-tree-maximum-path-sum": { fn: "maxPathSum", params: "root: Optional[TreeNode]", ret: "int", tests: [] },
    "serialize-and-deserialize-binary-tree": { fn: "serialize", params: "root: TreeNode", ret: "str", tests: [] },

    // ========== TRIES ==========
    "implement-trie-prefix-tree": { fn: "trie", params: "", ret: "None", tests: [] },
    "design-add-and-search-words-data-structure": { fn: "wordDictionary", params: "", ret: "None", tests: [] },
    "word-search-ii": { fn: "findWords", params: "board: List[List[str]], words: List[str]", ret: "List[str]", tests: [{ input: '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\n["oath","pea","eat","rain"]', output: '["eat","oath"]' }] },

    // ========== HEAP ==========
    "kth-largest-element-in-a-stream": { fn: "kthLargest", params: "", ret: "None", tests: [] },
    "last-stone-weight": { fn: "lastStoneWeight", params: "stones: List[int]", ret: "int", tests: [{ input: "[2,7,4,1,8,1]", output: "1" }] },
    "k-closest-points-to-origin": { fn: "kClosest", params: "points: List[List[int]], k: int", ret: "List[List[int]]", tests: [{ input: "[[1,3],[-2,2]]\n1", output: "[[-2,2]]" }] },
    "task-scheduler": { fn: "leastInterval", params: 'tasks: List[str], n: int', ret: "int", tests: [{ input: '["A","A","A","B","B","B"]\n2', output: "8" }] },
    "design-twitter": { fn: "twitter", params: "", ret: "None", tests: [] },
    "find-median-from-data-stream": { fn: "medianFinder", params: "", ret: "None", tests: [] },

    // ========== BACKTRACKING ==========
    "subsets": { fn: "subsets", params: "nums: List[int]", ret: "List[List[int]]", tests: [{ input: "[1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }] },
    "combination-sum": { fn: "combinationSum", params: "candidates: List[int], target: int", ret: "List[List[int]]", tests: [{ input: "[2,3,6,7]\n7", output: "[[2,2,3],[7]]" }] },
    "combination-sum-ii": { fn: "combinationSum2", params: "candidates: List[int], target: int", ret: "List[List[int]]", tests: [{ input: "[10,1,2,7,6,1,5]\n8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" }] },
    "permutations": { fn: "permute", params: "nums: List[int]", ret: "List[List[int]]", tests: [{ input: "[1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }] },
    "subsets-ii": { fn: "subsetsWithDup", params: "nums: List[int]", ret: "List[List[int]]", tests: [{ input: "[1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" }] },
    "word-search": { fn: "exist", params: "board: List[List[str]], word: str", ret: "bool", tests: [{ input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"', output: "true" }] },
    "palindrome-partitioning": { fn: "partition", params: "s: str", ret: "List[List[str]]", tests: [{ input: '"aab"', output: '[["a","a","b"],["aa","b"]]' }] },
    "letter-combinations-of-a-phone-number": { fn: "letterCombinations", params: "digits: str", ret: "List[str]", tests: [{ input: '"23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' }] },
    "n-queens": { fn: "solveNQueens", params: "n: int", ret: "List[List[str]]", tests: [{ input: "4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' }] },

    // ========== GRAPHS ==========
    "number-of-islands": { fn: "numIslands", params: "grid: List[List[str]]", ret: "int", tests: [{ input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" }] },
    "clone-graph": { fn: "cloneGraph", params: "node: Optional[Node]", ret: "Optional[Node]", tests: [] },
    "max-area-of-island": { fn: "maxAreaOfIsland", params: "grid: List[List[int]]", ret: "int", tests: [{ input: "[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]", output: "6" }] },
    "pacific-atlantic-water-flow": { fn: "pacificAtlantic", params: "heights: List[List[int]]", ret: "List[List[int]]", tests: [] },
    "rotting-oranges": { fn: "orangesRotting", params: "grid: List[List[int]]", ret: "int", tests: [{ input: "[[2,1,1],[1,1,0],[0,1,1]]", output: "4" }] },
    "walls-and-gates": { fn: "wallsAndGates", params: "rooms: List[List[int]]", ret: "None", tests: [] },
    "course-schedule": { fn: "canFinish", params: "numCourses: int, prerequisites: List[List[int]]", ret: "bool", tests: [{ input: "2\n[[1,0]]", output: "true" }, { input: "2\n[[1,0],[0,1]]", output: "false" }] },
    "course-schedule-ii": { fn: "findOrder", params: "numCourses: int, prerequisites: List[List[int]]", ret: "List[int]", tests: [{ input: "4\n[[1,0],[2,0],[3,1],[3,2]]", output: "[0,2,1,3]" }] },
    "number-of-connected-components-in-an-undirected-graph": { fn: "countComponents", params: "n: int, edges: List[List[int]]", ret: "int", tests: [{ input: "5\n[[0,1],[1,2],[3,4]]", output: "2" }] },
    "graph-valid-tree": { fn: "validTree", params: "n: int, edges: List[List[int]]", ret: "bool", tests: [{ input: "5\n[[0,1],[0,2],[0,3],[1,4]]", output: "true" }] },
    "redundant-connection": { fn: "findRedundantConnection", params: "edges: List[List[int]]", ret: "List[int]", tests: [{ input: "[[1,2],[1,3],[2,3]]", output: "[2,3]" }] },
    "word-ladder": { fn: "ladderLength", params: "beginWord: str, endWord: str, wordList: List[str]", ret: "int", tests: [{ input: '"hit"\n"cog"\n["hot","dot","dog","lot","log","cog"]', output: "5" }] },

    // ========== ADVANCED GRAPHS ==========
    "reconstruct-itinerary": { fn: "findItinerary", params: "tickets: List[List[str]]", ret: "List[str]", tests: [] },
    "min-cost-to-connect-all-points": { fn: "minCostConnectPoints", params: "points: List[List[int]]", ret: "int", tests: [{ input: "[[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20" }] },
    "network-delay-time": { fn: "networkDelayTime", params: "times: List[List[int]], n: int, k: int", ret: "int", tests: [{ input: "[[2,1,1],[2,3,1],[3,4,1]]\n4\n2", output: "2" }] },
    "swim-in-rising-water": { fn: "swimInWater", params: "grid: List[List[int]]", ret: "int", tests: [] },
    "alien-dictionary": { fn: "alienOrder", params: "words: List[str]", ret: "str", tests: [] },
    "cheapest-flights-within-k-stops": { fn: "findCheapestPrice", params: "n: int, flights: List[List[int]], src: int, dst: int, k: int", ret: "int", tests: [{ input: "4\n[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]\n0\n3\n1", output: "700" }] },

    // ========== 1-D DYNAMIC PROGRAMMING ==========
    "climbing-stairs": { fn: "climbStairs", params: "n: int", ret: "int", tests: [{ input: "2", output: "2" }, { input: "3", output: "3" }] },
    "min-cost-climbing-stairs": { fn: "minCostClimbingStairs", params: "cost: List[int]", ret: "int", tests: [{ input: "[10,15,20]", output: "15" }, { input: "[1,100,1,1,1,100,1,1,100,1]", output: "6" }] },
    "house-robber": { fn: "rob", params: "nums: List[int]", ret: "int", tests: [{ input: "[1,2,3,1]", output: "4" }, { input: "[2,7,9,3,1]", output: "12" }] },
    "house-robber-ii": { fn: "rob", params: "nums: List[int]", ret: "int", tests: [{ input: "[2,3,2]", output: "3" }, { input: "[1,2,3,1]", output: "4" }] },
    "longest-palindromic-substring": { fn: "longestPalindrome", params: "s: str", ret: "str", tests: [{ input: '"babad"', output: '"bab"' }] },
    "palindromic-substrings": { fn: "countSubstrings", params: "s: str", ret: "int", tests: [{ input: '"abc"', output: "3" }, { input: '"aaa"', output: "6" }] },
    "decode-ways": { fn: "numDecodings", params: "s: str", ret: "int", tests: [{ input: '"12"', output: "2" }, { input: '"226"', output: "3" }] },
    "coin-change": { fn: "coinChange", params: "coins: List[int], amount: int", ret: "int", tests: [{ input: "[1,5,11]\n11", output: "3" }, { input: "[2]\n3", output: "-1" }] },
    "maximum-product-subarray": { fn: "maxProduct", params: "nums: List[int]", ret: "int", tests: [{ input: "[2,3,-2,4]", output: "6" }] },
    "word-break": { fn: "wordBreak", params: "s: str, wordDict: List[str]", ret: "bool", tests: [{ input: '"leetcode"\n["leet","code"]', output: "true" }] },
    "longest-increasing-subsequence": { fn: "lengthOfLIS", params: "nums: List[int]", ret: "int", tests: [{ input: "[10,9,2,5,3,7,101,18]", output: "4" }] },
    "partition-equal-subset-sum": { fn: "canPartition", params: "nums: List[int]", ret: "bool", tests: [{ input: "[1,5,11,5]", output: "true" }, { input: "[1,2,3,5]", output: "false" }] },

    // ========== 2-D DYNAMIC PROGRAMMING ==========
    "unique-paths": { fn: "uniquePaths", params: "m: int, n: int", ret: "int", tests: [{ input: "3\n7", output: "28" }, { input: "3\n2", output: "3" }] },
    "longest-common-subsequence": { fn: "longestCommonSubsequence", params: "text1: str, text2: str", ret: "int", tests: [{ input: '"abcde"\n"ace"', output: "3" }] },
    "best-time-to-buy-and-sell-stock-with-cooldown": { fn: "maxProfit", params: "prices: List[int]", ret: "int", tests: [{ input: "[1,2,3,0,2]", output: "3" }] },
    "coin-change-ii": { fn: "change", params: "amount: int, coins: List[int]", ret: "int", tests: [{ input: "5\n[1,2,5]", output: "4" }] },
    "target-sum": { fn: "findTargetSumWays", params: "nums: List[int], target: int", ret: "int", tests: [{ input: "[1,1,1,1,1]\n3", output: "5" }] },
    "interleaving-string": { fn: "isInterleave", params: "s1: str, s2: str, s3: str", ret: "bool", tests: [{ input: '"aabcc"\n"dbbca"\n"aadbbcbcac"', output: "true" }] },
    "longest-increasing-path-in-a-matrix": { fn: "longestIncreasingPath", params: "matrix: List[List[int]]", ret: "int", tests: [{ input: "[[9,9,4],[6,6,8],[2,1,1]]", output: "4" }] },
    "distinct-subsequences": { fn: "numDistinct", params: "s: str, t: str", ret: "int", tests: [{ input: '"rabbbit"\n"rabbit"', output: "3" }] },
    "edit-distance": { fn: "minDistance", params: "word1: str, word2: str", ret: "int", tests: [{ input: '"horse"\n"ros"', output: "3" }] },
    "burst-balloons": { fn: "maxCoins", params: "nums: List[int]", ret: "int", tests: [{ input: "[3,1,5,8]", output: "167" }] },
    "regular-expression-matching": { fn: "isMatch", params: "s: str, p: str", ret: "bool", tests: [{ input: '"aa"\n"a"', output: "false" }, { input: '"aa"\n"a*"', output: "true" }] },

    // ========== GREEDY ==========
    "maximum-subarray": { fn: "maxSubArray", params: "nums: List[int]", ret: "int", tests: [{ input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" }] },
    "jump-game": { fn: "canJump", params: "nums: List[int]", ret: "bool", tests: [{ input: "[2,3,1,1,4]", output: "true" }, { input: "[3,2,1,0,4]", output: "false" }] },
    "jump-game-ii": { fn: "jump", params: "nums: List[int]", ret: "int", tests: [{ input: "[2,3,1,1,4]", output: "2" }] },
    "gas-station": { fn: "canCompleteCircuit", params: "gas: List[int], cost: List[int]", ret: "int", tests: [{ input: "[1,2,3,4,5]\n[3,4,5,1,2]", output: "3" }] },
    "hand-of-straights": { fn: "isNStraightHand", params: "hand: List[int], groupSize: int", ret: "bool", tests: [{ input: "[1,2,3,6,2,3,4,7,8]\n3", output: "true" }] },
    "merge-triplets-to-form-target-triplet": { fn: "mergeTriplets", params: "triplets: List[List[int]], target: List[int]", ret: "bool", tests: [{ input: "[[2,5,3],[1,8,4],[1,7,5]]\n[2,7,5]", output: "true" }] },
    "partition-labels": { fn: "partitionLabels", params: "s: str", ret: "List[int]", tests: [{ input: '"ababcbacadefegdehijhklij"', output: "[9,7,8]" }] },
    "valid-parenthesis-string": { fn: "checkValidString", params: "s: str", ret: "bool", tests: [{ input: '"()"', output: "true" }, { input: '"(*)"', output: "true" }] },

    // ========== INTERVALS ==========
    "insert-interval": { fn: "insert", params: "intervals: List[List[int]], newInterval: List[int]", ret: "List[List[int]]", tests: [{ input: "[[1,3],[6,9]]\n[2,5]", output: "[[1,5],[6,9]]" }] },
    "merge-intervals": { fn: "merge", params: "intervals: List[List[int]]", ret: "List[List[int]]", tests: [{ input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }] },
    "non-overlapping-intervals": { fn: "eraseOverlapIntervals", params: "intervals: List[List[int]]", ret: "int", tests: [{ input: "[[1,2],[2,3],[3,4],[1,3]]", output: "1" }] },
    "meeting-rooms": { fn: "canAttendMeetings", params: "intervals: List[List[int]]", ret: "bool", tests: [{ input: "[[0,30],[5,10],[15,20]]", output: "false" }] },
    "meeting-rooms-ii": { fn: "minMeetingRooms", params: "intervals: List[List[int]]", ret: "int", tests: [{ input: "[[0,30],[5,10],[15,20]]", output: "2" }] },
    "minimum-interval-to-include-each-query": { fn: "minInterval", params: "intervals: List[List[int]], queries: List[int]", ret: "List[int]", tests: [{ input: "[[1,4],[2,4],[3,6],[4,4]]\n[2,3,4,5]", output: "[3,3,1,4]" }] },

    // ========== MATH & GEOMETRY ==========
    "rotate-image": { fn: "rotate", params: "matrix: List[List[int]]", ret: "None", tests: [] },
    "spiral-matrix": { fn: "spiralOrder", params: "matrix: List[List[int]]", ret: "List[int]", tests: [{ input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }] },
    "set-matrix-zeroes": { fn: "setZeroes", params: "matrix: List[List[int]]", ret: "None", tests: [] },
    "happy-number": { fn: "isHappy", params: "n: int", ret: "bool", tests: [{ input: "19", output: "true" }, { input: "2", output: "false" }] },
    "plus-one": { fn: "plusOne", params: "digits: List[int]", ret: "List[int]", tests: [{ input: "[1,2,3]", output: "[1,2,4]" }, { input: "[9]", output: "[1,0]" }] },
    "powx-n": { fn: "myPow", params: "x: float, n: int", ret: "float", tests: [{ input: "2.0\n10", output: "1024.0" }] },
    "multiply-strings": { fn: "multiply", params: "num1: str, num2: str", ret: "str", tests: [{ input: '"2"\n"3"', output: '"6"' }, { input: '"123"\n"456"', output: '"56088"' }] },
    "detect-squares": { fn: "detectSquares", params: "", ret: "None", tests: [] },

    // ========== BIT MANIPULATION ==========
    "single-number": { fn: "singleNumber", params: "nums: List[int]", ret: "int", tests: [{ input: "[2,2,1]", output: "1" }, { input: "[4,1,2,1,2]", output: "4" }] },
    "number-of-1-bits": { fn: "hammingWeight", params: "n: int", ret: "int", tests: [{ input: "11", output: "3" }, { input: "128", output: "1" }] },
    "counting-bits": { fn: "countBits", params: "n: int", ret: "List[int]", tests: [{ input: "2", output: "[0,1,1]" }, { input: "5", output: "[0,1,1,2,1,2]" }] },
    "reverse-bits": { fn: "reverseBits", params: "n: int", ret: "int", tests: [{ input: "43261596", output: "964176192" }] },
    "missing-number": { fn: "missingNumber", params: "nums: List[int]", ret: "int", tests: [{ input: "[3,0,1]", output: "2" }, { input: "[0,1]", output: "2" }] },
    "sum-of-two-integers": { fn: "getSum", params: "a: int, b: int", ret: "int", tests: [{ input: "1\n2", output: "3" }, { input: "2\n3", output: "5" }] },
    "reverse-integer": { fn: "reverse", params: "x: int", ret: "int", tests: [{ input: "123", output: "321" }, { input: "-123", output: "-321" }] },
};

module.exports = problems;
