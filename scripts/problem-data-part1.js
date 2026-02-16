// LeetCode-style problem metadata: functionName, starterCode, testCases
// Part 1: Arrays & Hashing, Two Pointers, Sliding Window, Stack, Binary Search
const problems = {
    // ========== ARRAYS & HASHING ==========
    "contains-duplicate": {
        fn: "containsDuplicate",
        params: "nums: List[int]",
        ret: "bool",
        tests: [
            { input: "[1,2,3,1]", output: "true" },
            { input: "[1,2,3,4]", output: "false" },
            { input: "[1,1,1,3,3,4,3,2,4,2]", output: "true" },
        ],
    },
    "valid-anagram": {
        fn: "isAnagram",
        params: "s: str, t: str",
        ret: "bool",
        tests: [
            { input: '"anagram"\n"nagaram"', output: "true" },
            { input: '"rat"\n"car"', output: "false" },
        ],
    },
    "two-sum": {
        fn: "twoSum",
        params: "nums: List[int], target: int",
        ret: "List[int]",
        tests: [
            { input: "[2,7,11,15]\n9", output: "[0,1]" },
            { input: "[3,2,4]\n6", output: "[1,2]" },
            { input: "[3,3]\n6", output: "[0,1]" },
        ],
    },
    "group-anagrams": {
        fn: "groupAnagrams",
        params: "strs: List[str]",
        ret: "List[List[str]]",
        tests: [
            { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
            { input: '[""]', output: '[[""]]' },
        ],
    },
    "top-k-frequent-elements": {
        fn: "topKFrequent",
        params: "nums: List[int], k: int",
        ret: "List[int]",
        tests: [
            { input: "[1,1,1,2,2,3]\n2", output: "[1,2]" },
            { input: "[1]\n1", output: "[1]" },
        ],
    },
    "product-of-array-except-self": {
        fn: "productExceptSelf",
        params: "nums: List[int]",
        ret: "List[int]",
        tests: [
            { input: "[1,2,3,4]", output: "[24,12,8,6]" },
            { input: "[-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        ],
    },
    "valid-sudoku": {
        fn: "isValidSudoku",
        params: "board: List[List[str]]",
        ret: "bool",
        tests: [
            { input: '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', output: "true" },
        ],
    },
    "encode-and-decode-strings": {
        fn: "encode",
        params: "strs: List[str]",
        ret: "str",
        tests: [
            { input: '["neet","code","love","you"]', output: '"4#neet4#code4#love3#you"' },
        ],
    },
    "longest-consecutive-sequence": {
        fn: "longestConsecutive",
        params: "nums: List[int]",
        ret: "int",
        tests: [
            { input: "[100,4,200,1,3,2]", output: "4" },
            { input: "[0,3,7,2,5,8,4,6,0,1]", output: "9" },
        ],
    },
    // ========== TWO POINTERS ==========
    "valid-palindrome": {
        fn: "isPalindrome",
        params: "s: str",
        ret: "bool",
        tests: [
            { input: '"A man, a plan, a canal: Panama"', output: "true" },
            { input: '"race a car"', output: "false" },
        ],
    },
    "two-sum-ii-input-array-is-sorted": {
        fn: "twoSum",
        params: "numbers: List[int], target: int",
        ret: "List[int]",
        tests: [
            { input: "[2,7,11,15]\n9", output: "[1,2]" },
            { input: "[2,3,4]\n6", output: "[1,3]" },
        ],
    },
    "3sum": {
        fn: "threeSum",
        params: "nums: List[int]",
        ret: "List[List[int]]",
        tests: [
            { input: "[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
            { input: "[0,1,1]", output: "[]" },
        ],
    },
    "container-with-most-water": {
        fn: "maxArea",
        params: "height: List[int]",
        ret: "int",
        tests: [
            { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
            { input: "[1,1]", output: "1" },
        ],
    },
    "trapping-rain-water": {
        fn: "trap",
        params: "height: List[int]",
        ret: "int",
        tests: [
            { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
            { input: "[4,2,0,3,2,5]", output: "9" },
        ],
    },
    // ========== SLIDING WINDOW ==========
    "best-time-to-buy-and-sell-stock": {
        fn: "maxProfit",
        params: "prices: List[int]",
        ret: "int",
        tests: [
            { input: "[7,1,5,3,6,4]", output: "5" },
            { input: "[7,6,4,3,1]", output: "0" },
        ],
    },
    "longest-substring-without-repeating-characters": {
        fn: "lengthOfLongestSubstring",
        params: "s: str",
        ret: "int",
        tests: [
            { input: '"abcabcbb"', output: "3" },
            { input: '"bbbbb"', output: "1" },
            { input: '"pwwkew"', output: "3" },
        ],
    },
    "longest-repeating-character-replacement": {
        fn: "characterReplacement",
        params: "s: str, k: int",
        ret: "int",
        tests: [
            { input: '"ABAB"\n2', output: "4" },
            { input: '"AABABBA"\n1', output: "4" },
        ],
    },
    "permutation-in-string": {
        fn: "checkInclusion",
        params: "s1: str, s2: str",
        ret: "bool",
        tests: [
            { input: '"ab"\n"eidbaooo"', output: "true" },
            { input: '"ab"\n"eidboaoo"', output: "false" },
        ],
    },
    "minimum-window-substring": {
        fn: "minWindow",
        params: "s: str, t: str",
        ret: "str",
        tests: [
            { input: '"ADOBECODEBANC"\n"ABC"', output: '"BANC"' },
            { input: '"a"\n"a"', output: '"a"' },
        ],
    },
    // ========== STACK ==========
    "valid-parentheses": {
        fn: "isValid",
        params: "s: str",
        ret: "bool",
        tests: [
            { input: '"()"', output: "true" },
            { input: '"()[]{}"', output: "true" },
            { input: '"(]"', output: "false" },
        ],
    },
    "min-stack": {
        fn: "minStack",
        params: "",
        ret: "None",
        tests: [],
    },
    "evaluate-reverse-polish-notation": {
        fn: "evalRPN",
        params: 'tokens: List[str]',
        ret: "int",
        tests: [
            { input: '["2","1","+","3","*"]', output: "9" },
            { input: '["4","13","5","/","+"]', output: "6" },
        ],
    },
    "generate-parentheses": {
        fn: "generateParenthesis",
        params: "n: int",
        ret: "List[str]",
        tests: [
            { input: "3", output: '["((()))","(()())","(())()","()(())","()()()"]' },
            { input: "1", output: '["()"]' },
        ],
    },
    "daily-temperatures": {
        fn: "dailyTemperatures",
        params: "temperatures: List[int]",
        ret: "List[int]",
        tests: [
            { input: "[73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
            { input: "[30,40,50,60]", output: "[1,1,1,0]" },
        ],
    },
    "car-fleet": {
        fn: "carFleet",
        params: "target: int, position: List[int], speed: List[int]",
        ret: "int",
        tests: [
            { input: "12\n[10,8,0,5,3]\n[2,4,1,1,3]", output: "3" },
            { input: "10\n[3]\n[3]", output: "1" },
        ],
    },
    "largest-rectangle-in-histogram": {
        fn: "largestRectangleArea",
        params: "heights: List[int]",
        ret: "int",
        tests: [
            { input: "[2,1,5,6,2,3]", output: "10" },
            { input: "[2,4]", output: "4" },
        ],
    },
    // ========== BINARY SEARCH ==========
    "binary-search": {
        fn: "search",
        params: "nums: List[int], target: int",
        ret: "int",
        tests: [
            { input: "[-1,0,3,5,9,12]\n9", output: "4" },
            { input: "[-1,0,3,5,9,12]\n2", output: "-1" },
        ],
    },
    "search-a-2d-matrix": {
        fn: "searchMatrix",
        params: "matrix: List[List[int]], target: int",
        ret: "bool",
        tests: [
            { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3", output: "true" },
            { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13", output: "false" },
        ],
    },
    "koko-eating-bananas": {
        fn: "minEatingSpeed",
        params: "piles: List[int], h: int",
        ret: "int",
        tests: [
            { input: "[3,6,7,11]\n8", output: "4" },
            { input: "[30,11,23,4,20]\n5", output: "30" },
        ],
    },
    "find-minimum-in-rotated-sorted-array": {
        fn: "findMin",
        params: "nums: List[int]",
        ret: "int",
        tests: [
            { input: "[3,4,5,1,2]", output: "1" },
            { input: "[4,5,6,7,0,1,2]", output: "0" },
        ],
    },
    "search-in-rotated-sorted-array": {
        fn: "search",
        params: "nums: List[int], target: int",
        ret: "int",
        tests: [
            { input: "[4,5,6,7,0,1,2]\n0", output: "4" },
            { input: "[4,5,6,7,0,1,2]\n3", output: "-1" },
        ],
    },
    "time-based-key-value-store": {
        fn: "timeMap",
        params: "",
        ret: "None",
        tests: [],
    },
};

module.exports = problems;
