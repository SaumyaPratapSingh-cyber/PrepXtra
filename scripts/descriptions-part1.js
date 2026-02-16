
// Part 1: Classic DSA problem descriptions
const descriptions = {
    "reverse-linked-list": `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.

**Example 1:**
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

**Example 2:**
Input: head = [1,2]
Output: [2,1]

**Example 3:**
Input: head = []
Output: []

**Constraints:**
- The number of nodes in the list is the range \`[0, 5000]\`.
- \`-5000 <= Node.val <= 5000\`

**Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?`,

    "combination-sum": `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return *a list of all **unique combinations** of* \`candidates\` *where the chosen numbers sum to* \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

**Example 1:**
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]

**Example 2:**
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]

**Constraints:**
- \`1 <= candidates.length <= 30\`
- \`2 <= candidates[i] <= 40\`
- All elements of \`candidates\` are **distinct**.
- \`1 <= target <= 40\``,

    "combination-sum-ii": `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used **once** in the combination.

**Note:** The solution set must not contain duplicate combinations.

**Example 1:**
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]

**Example 2:**
Input: candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],[5]]

**Constraints:**
- \`1 <= candidates.length <= 100\`
- \`1 <= candidates[i] <= 50\`
- \`1 <= target <= 30\``,

    "letter-combinations-of-a-phone-number": `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

2 -> abc, 3 -> def, 4 -> ghi, 5 -> jkl, 6 -> mno, 7 -> pqrs, 8 -> tuv, 9 -> wxyz

**Example 1:**
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

**Example 2:**
Input: digits = ""
Output: []

**Constraints:**
- \`0 <= digits.length <= 4\`
- \`digits[i]\` is a digit in the range \`['2', '9']\`.`,

    "word-search": `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` *if* \`word\` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

**Example 2:**
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true

**Constraints:**
- \`m == board.length\`
- \`n = board[i].length\`
- \`1 <= m, n <= 6\`
- \`1 <= word.length <= 15\`
- \`board\` and \`word\` consists of only lowercase and uppercase English letters.`,

    "longest-repeating-character-replacement": `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.

**Example 1:**
Input: s = "ABAB", k = 2
Output: 4

**Example 2:**
Input: s = "AABABBA", k = 1
Output: 4

**Constraints:**
- \`1 <= s.length <= 10^5\`
- \`s\` consists of only uppercase English letters.
- \`0 <= k <= s.length\``,

    "minimum-window-substring": `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return *the minimum window substring of* \`s\` *such that every character in* \`t\` *(including duplicates) is included in the window*. If there is no such substring, return the empty string \`""\`.

**Example 1:**
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

**Example 2:**
Input: s = "a", t = "a"
Output: "a"

**Constraints:**
- \`m == s.length\`
- \`n == t.length\`
- \`1 <= m, n <= 10^5\`
- \`s\` and \`t\` consist of uppercase and lowercase English letters.`,

    "merge-k-sorted-lists": `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*

**Example 1:**
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]

**Example 2:**
Input: lists = []
Output: []

**Constraints:**
- \`k == lists.length\`
- \`0 <= k <= 10^4\`
- \`0 <= lists[i].length <= 500\`
- \`-10^4 <= lists[i][j] <= 10^4\`
- \`lists[i]\` is sorted in **ascending order**.
- The sum of \`lists[i].length\` will not exceed \`10^4\`.`,

    "task-scheduler": `You are given an array of CPU tasks \`tasks\`, each labeled with a letter from A to Z, and a number \`n\`. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of **at least** \`n\` intervals between two executions of the same task.

Return *the minimum number of CPU intervals required to complete all tasks*.

**Example 1:**
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8

**Example 2:**
Input: tasks = ["A","C","A","B","D","B"], n = 1
Output: 6

**Constraints:**
- \`1 <= tasks.length <= 10^4\`
- \`tasks[i]\` is an uppercase English letter.
- \`0 <= n <= 100\``,

    "design-twitter": `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.

Implement the \`Twitter\` class:
- \`Twitter()\` Initializes your twitter object.
- \`void postTweet(int userId, int tweetId)\` Composes a new tweet with ID \`tweetId\` by the user \`userId\`.
- \`List<Integer> getNewsFeed(int userId)\` Retrieves the 10 most recent tweet IDs in the user's news feed.
- \`void follow(int followerId, int followeeId)\` The user with ID \`followerId\` started following the user with ID \`followeeId\`.
- \`void unfollow(int followerId, int followeeId)\` The user with ID \`followerId\` started unfollowing the user with ID \`followeeId\`.

**Example 1:**
Input: ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output: [null, null, [5], null, null, [6, 5], null, [5]]

**Constraints:**
- \`1 <= userId, followerId, followeeId <= 500\`
- \`0 <= tweetId <= 10^4\`
- At most \`3 * 10^4\` calls will be made to \`postTweet\`, \`getNewsFeed\`, \`follow\`, and \`unfollow\`.`,

    "top-k-frequent-elements": `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.

**Example 1:**
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

**Example 2:**
Input: nums = [1], k = 1
Output: [1]

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`k\` is in the range \`[1, the number of unique elements in the array]\`.
- It is **guaranteed** that the answer is **unique**.

**Follow up:** Your algorithm's time complexity must be better than O(n log n).`,

    "insert-interval": `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` represent the start and the end of the \`ith\` interval and \`intervals\` is sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` *after the insertion*.

**Example 1:**
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

**Example 2:**
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]

**Constraints:**
- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti <= endi <= 10^5\`
- \`intervals\` is sorted by \`starti\` in **ascending** order.`,

    "maximum-depth-of-binary-tree": `Given the \`root\` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**
Input: root = [3,9,20,null,null,15,7]
Output: 3

**Example 2:**
Input: root = [1,null,2]
Output: 2

**Constraints:**
- The number of nodes in the tree is in the range \`[0, 10^4]\`.
- \`-100 <= Node.val <= 100\``,

    "diameter-of-binary-tree": `Given the \`root\` of a binary tree, return *the length of the **diameter** of the tree*.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the \`root\`.

The **length** of a path between two nodes is represented by the number of edges between them.

**Example 1:**
Input: root = [1,2,3,4,5]
Output: 3

**Example 2:**
Input: root = [1,2]
Output: 1

**Constraints:**
- The number of nodes in the tree is in the range \`[1, 10^4]\`.
- \`-100 <= Node.val <= 100\``,

    "number-of-islands": `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**
Input: grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
Output: 1

**Example 2:**
Input: grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
Output: 3

**Constraints:**
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 300\`
- \`grid[i][j]\` is \`'0'\` or \`'1'\`.`,

    "rotting-oranges": `You are given an \`m x n\` \`grid\` where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return *the minimum number of minutes that must elapse until no cell has a fresh orange*. If this is impossible, return \`-1\`.

**Example 1:**
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

**Example 2:**
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1

**Constraints:**
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 10\`
- \`grid[i][j]\` is \`0\`, \`1\`, or \`2\`.`,

    "alien-dictionary": `There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings \`words\` from the alien dictionary, where the strings in \`words\` are sorted lexicographically by the rules of this new language.

Return *a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules*. If there is no solution, return \`""\`. If there are multiple solutions, return **any of them**.

**Example 1:**
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"

**Constraints:**
- \`1 <= words.length <= 100\`
- \`1 <= words[i].length <= 100\`
- \`words[i]\` consists of only lowercase English letters.`,

    "cheapest-flights-within-k-stops": `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [fromi, toi, pricei]\` indicates that there is a flight from city \`fromi\` to city \`toi\` with cost \`pricei\`.

You are also given three integers \`src\`, \`dst\`, and \`k\`, return *the cheapest price from* \`src\` *to* \`dst\` *with at most* \`k\` *stops*. If there is no such route, return \`-1\`.

**Example 1:**
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700

**Constraints:**
- \`1 <= n <= 100\`
- \`0 <= flights.length <= (n * (n - 1) / 2)\`
- \`0 <= fromi, toi < n\`
- \`fromi != toi\`
- \`1 <= pricei <= 10^4\`
- There will not be any multiple flights between two cities.
- \`0 <= src, dst, k < n\``,

    "unique-paths": `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

**Example 1:**
Input: m = 3, n = 7
Output: 28

**Example 2:**
Input: m = 3, n = 2
Output: 3

**Constraints:**
- \`1 <= m, n <= 100\``,

    "distinct-subsequences": `Given two strings \`s\` and \`t\`, return *the number of distinct **subsequences** of* \`s\` *which equals* \`t\`.

The test cases are generated so that the answer fits on a 32-bit signed integer.

**Example 1:**
Input: s = "rabbbit", t = "rabbit"
Output: 3

**Example 2:**
Input: s = "babgbag", t = "bag"
Output: 5

**Constraints:**
- \`1 <= s.length, t.length <= 1000\`
- \`s\` and \`t\` consist of English letters.`,

    "best-time-to-buy-and-sell-stock": `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.

**Example 1:**
Input: prices = [7,1,5,3,6,4]
Output: 5

**Example 2:**
Input: prices = [7,6,4,3,1]
Output: 0

**Constraints:**
- \`1 <= prices.length <= 10^5\`
- \`0 <= prices[i] <= 10^4\``,

    "contains-duplicate": `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.

**Example 1:**
Input: nums = [1,2,3,1]
Output: true

**Example 2:**
Input: nums = [1,2,3,4]
Output: false

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,

    "valid-anagram": `Given two strings \`s\` and \`t\`, return \`true\` *if* \`t\` *is an anagram of* \`s\`*, and* \`false\` *otherwise*.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**
Input: s = "anagram", t = "nagaram"
Output: true

**Example 2:**
Input: s = "rat", t = "car"
Output: false

**Constraints:**
- \`1 <= s.length, t.length <= 5 * 10^4\`
- \`s\` and \`t\` consist of lowercase English letters.`,

    "group-anagrams": `Given an array of strings \`strs\`, group **the anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

**Example 2:**
Input: strs = [""]
Output: [[""]]

**Constraints:**
- \`1 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` consists of lowercase English letters.`,

    "product-of-array-except-self": `Given an integer array \`nums\`, return *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.

**Example 1:**
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

**Example 2:**
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

**Constraints:**
- \`2 <= nums.length <= 10^5\`
- \`-30 <= nums[i] <= 30\``,

    "encode-and-decode-strings": `Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

Implement \`encode\` and \`decode\`:
- \`encode(strs)\`: Encodes a list of strings to a single string.
- \`decode(s)\`: Decodes a single string to a list of strings.

**Example 1:**
Input: ["neet","code","love","you"]
Output: ["neet","code","love","you"]

**Example 2:**
Input: ["we","say",":","yes"]
Output: ["we","say",":","yes"]

**Constraints:**
- \`0 <= strs.length < 100\`
- \`0 <= strs[i].length < 200\`
- \`strs[i]\` contains any possible characters out of 256 valid ASCII characters.`,

    "valid-palindrome": `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a **palindrome**, or* \`false\` *otherwise*.

**Example 1:**
Input: s = "A man, a plan, a canal: Panama"
Output: true

**Example 2:**
Input: s = "race a car"
Output: false

**Constraints:**
- \`1 <= s.length <= 2 * 10^5\`
- \`s\` consists only of printable ASCII characters.`,

    "two-sum-ii-input-array-is-sorted": `Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\` number.

Return *the indices of the two numbers*, \`index1\` *and* \`index2\`, **added by one** as an integer array \`[index1, index2]\` of length 2.

You may not use the same element twice. Your solution must use only constant extra space.

**Example 1:**
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]

**Example 2:**
Input: numbers = [2,3,4], target = 6
Output: [1,3]

**Constraints:**
- \`2 <= numbers.length <= 3 * 10^4\`
- \`-1000 <= numbers[i] <= 1000\`
- \`numbers\` is sorted in **non-decreasing order**.
- \`-1000 <= target <= 1000\`
- The tests are generated such that there is **exactly one solution**.`,

    "3sum": `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

**Example 1:**
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

**Example 2:**
Input: nums = [0,1,1]
Output: []

**Constraints:**
- \`3 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\``,

    "container-with-most-water": `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`ith\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Example 1:**
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49

**Example 2:**
Input: height = [1,1]
Output: 1

**Constraints:**
- \`n == height.length\`
- \`2 <= n <= 10^5\`
- \`0 <= height[i] <= 10^4\``,

    "permutation-in-string": `Given two strings \`s1\` and \`s2\`, return \`true\` *if* \`s2\` *contains a permutation of* \`s1\`*, or* \`false\` *otherwise*.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.

**Example 1:**
Input: s1 = "ab", s2 = "eidbaooo"
Output: true

**Example 2:**
Input: s1 = "ab", s2 = "eidboaoo"
Output: false

**Constraints:**
- \`1 <= s1.length, s2.length <= 10^4\`
- \`s1\` and \`s2\` consist of lowercase English letters.`,

    "min-stack": `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:
- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element \`val\` onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.

**Example 1:**
Input: ["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output: [null,null,null,null,-3,null,0,-2]

**Constraints:**
- \`-2^31 <= val <= 2^31 - 1\`
- Methods \`pop\`, \`top\` and \`getMin\` operations will always be called on **non-empty** stacks.
- At most \`3 * 10^4\` calls will be made to \`push\`, \`pop\`, \`top\`, and \`getMin\`.`,

    "search-a-2d-matrix": `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` *if* \`target\` *is in* \`matrix\` *or* \`false\` *otherwise*.

You must write a solution in \`O(log(m * n))\` time complexity.

**Example 1:**
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true

**Example 2:**
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

**Constraints:**
- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 100\`
- \`-10^4 <= matrix[i][j], target <= 10^4\``,

    "search-in-rotated-sorted-array": `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\` (\`1 <= k < nums.length\`) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\`.

Given the array \`nums\` **after** the possible rotation and an integer \`target\`, return *the index of* \`target\` *if it is in* \`nums\`*, or* \`-1\` *if it is not in* \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

**Example 1:**
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

**Example 2:**
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

**Constraints:**
- \`1 <= nums.length <= 5000\`
- \`-10^4 <= nums[i] <= 10^4\`
- All values of \`nums\` are **unique**.
- \`nums\` is an ascending array that is possibly rotated.`,
};

module.exports = descriptions;
