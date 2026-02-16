
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import DSAProblem from "../src/models/DSAProblem";

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

console.log("Connecting to MongoDB at:", process.env.MONGODB_URI);

const problems = [
    {
        title: "Two Sum",
        slug: "two-sum",
        difficulty: "easy",
        category: "Arrays & Hashing",
        tags: ["Array", "Hash Table"],
        description: `Given an array of integers \`nums\` and an integer \`target\`, return _indices of the two numbers such that they add up to \`target\`_.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.`,
        inputFormat: "nums = [2,7,11,15], target = 9",
        outputFormat: "[0,1]",
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ],
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]"
            }
        ],
        starterCode: {
            python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`
        },
        functionName: "twoSum",
        solutions: [
            {
                language: "python",
                approach: "Hash Map (One Pass)",
                code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val : index
        
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
        return []`,
                timeComplexity: "O(n)",
                spaceComplexity: "O(n)"
            }
        ],
        hints: ["A really brute force way would be to search for all possible pairs of numbers but that would be slow. Again, it's best to try out brute force solutions for completeness. It is from these brute force solutions that you can come up with optimizations.", "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?", "The second train of thought is, without changing the array, can we use additional space to somehow speed up the search?"]
    },
    {
        title: "Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating-characters",
        difficulty: "medium",
        category: "Sliding Window",
        tags: ["String", "Sliding Window", "Hash Table"],
        description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
        examples: [
            {
                input: 's = "abcabcbb"',
                output: "3",
                explanation: "The answer is \"abc\", with the length of 3."
            },
            {
                input: 's = "bbbbb"',
                output: "1",
                explanation: "The answer is \"b\", with the length of 1."
            },
            {
                input: 's = "pwwkew"',
                output: "3",
                explanation: "The answer is \"wke\", with the length of 3. Notice that the answer must be a substring, \"pwke\" is a subsequence and not a substring."
            }
        ],
        constraints: [
            "0 <= s.length <= 5 * 10^4",
            "s consists of English letters, digits, symbols and spaces."
        ],
        starterCode: {
            python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        `,
            javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`
        },
        functionName: "lengthOfLongestSubstring",
        solutions: [
            {
                language: "python",
                approach: "Sliding Window",
                code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charSet = set()
        l = 0
        res = 0
        
        for r in range(len(s)):
            while s[r] in charSet:
                charSet.remove(s[l])
                l += 1
            charSet.add(s[r])
            res = max(res, r - l + 1)
        return res`,
                timeComplexity: "O(n)",
                spaceComplexity: "O(min(m, n))"
            }
        ]
    },
    {
        title: "Valid Parentheses",
        slug: "valid-parentheses",
        difficulty: "easy",
        category: "Stack",
        tags: ["Stack", "String"],
        description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "()[]{}"', output: "true" },
            { input: 's = "(]"', output: "false" }
        ],
        constraints: [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '()[]{}'."
        ],
        starterCode: {
            python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
            javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`
        },
        functionName: "isValid",
        solutions: [{
            language: "python",
            approach: "Stack",
            code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        closeToOpen = { ")": "(", "]": "[", "}": "{" }
        
        for c in s:
            if c in closeToOpen:
                if stack and stack[-1] == closeToOpen[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)
        return True if not stack else False`,
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)"
        }]
    }
];

// Add 30 more placeholders from the top list to reach roughly 50
const topProblemTitles = [
    "Median of Two Sorted Arrays", "Longest Palindromic Substring", "Zigzag Conversion", "Reverse Integer",
    "String to Integer (atoi)", "Palindrome Number", "Regular Expression Matching", "Container With Most Water",
    "Integer to Roman", "Roman to Integer", "Longest Common Prefix", "3Sum", "3Sum Closest",
    "Letter Combinations of a Phone Number", "4Sum", "Remove Nth Node From End of List", "Merge Two Sorted Lists",
    "Generate Parentheses", "Merge k Sorted Lists", "Swap Nodes in Pairs", "Reverse Nodes in k-Group",
    "Remove Duplicates from Sorted Array", "Remove Element", "Find the Index of the First Occurrence in a String",
    "Divide Two Integers", "Substring with Concatenation of All Words", "Next Permutation", "Longest Valid Parentheses",
    "Search in Rotated Sorted Array", "Find First and Last Position of Element in Sorted Array"
];

topProblemTitles.forEach(title => {
    problems.push({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        difficulty: ["Median of Two Sorted Arrays", "Regular Expression Matching", "Merge k Sorted Lists", "Reverse Nodes in k-Group", "Substring with Concatenation of All Words", "Longest Valid Parentheses"].includes(title) ? "hard" : "medium",
        category: "General",
        tags: ["Placeholder"],
        description: `This is a placeholder for **${title}**. Full content coming soon.`,
        examples: [],
        constraints: ["Coming soon"],
        starterCode: { python: "# Coming soon" },
        functionName: "solution",
        solutions: [],
        hints: []
    } as any);
});


const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");

        await DSAProblem.deleteMany({});
        console.log("Cleared existing DSA Problems");

        await DSAProblem.insertMany(problems);
        console.log(`Seeded ${problems.length} DSA Problems`);

        await mongoose.disconnect();
        console.log("Disconnected");
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
