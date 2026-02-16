// MEGA REPAIR 2: Fix remaining 250+ broken test cases (Graphs, DP, Recursion, Mismatched Slugs)
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({}, { strict: false, collection: 'dsaproblems' });
const M = mongoose.models.DSAProblem || mongoose.model('DSAProblem', ProblemSchema);

const FIXES = {

    // ════════════════════════════════════════════════════════════════
    // GRAPHS (Striver & LeetCode)
    // ════════════════════════════════════════════════════════════════
    "number-of-provinces": [
        { input: "[[1,1,0],[1,1,0],[0,0,1]]", output: "2" },
        { input: "[[1,0,0],[0,1,0],[0,0,1]]", output: "3" }
    ],
    "number-of-connected-components-in-an-undirected-graph": [
        { input: "5\n[[0,1],[1,2],[3,4]]", output: "2" },
        { input: "5\n[[0,1],[1,2],[2,3],[3,4]]", output: "1" }
    ],
    "rotting-oranges": [
        { input: "[[2,1,1],[1,1,0],[0,1,1]]", output: "4" },
        { input: "[[2,1,1],[0,1,1],[1,0,1]]", output: "-1" }
    ],
    "flood-fill": [
        { input: "[[1,1,1],[1,1,0],[1,0,1]]\n1\n1\n2", output: "[[2,2,2],[2,2,0],[2,0,1]]" },
    ],
    "01-matrix": [
        { input: "[[0,0,0],[0,1,0],[0,0,0]]", output: "[[0,0,0],[0,1,0],[0,0,0]]" },
        { input: "[[0,0,0],[0,1,0],[1,1,1]]", output: "[[0,0,0],[0,1,0],[1,2,1]]" }
    ],
    "surrounded-regions": [
        { input: "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", output: "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]" },
    ],
    "word-ladder": [
        { input: "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", output: "5" },
        { input: "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]", output: "0" }
    ],
    "word-ladder-ii": [
        { input: "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", output: "[[\"hit\",\"hot\",\"dot\",\"dog\",\"cog\"],[\"hit\",\"hot\",\"lot\",\"log\",\"cog\"]]" },
    ],
    "course-schedule": [
        { input: "2\n[[1,0]]", output: "true" },
        { input: "2\n[[1,0],[0,1]]", output: "false" }
    ],
    "course-schedule-ii": [
        { input: "2\n[[1,0]]", output: "[0,1]" },
        { input: "4\n[[1,0],[2,0],[3,1],[3,2]]", output: "[0,1,2,3]" }
    ],
    "network-delay-time": [
        { input: "[[2,1,1],[2,3,1],[3,4,1]]\n4\n2", output: "2" },
    ],
    "cheapest-flights-within-k-stops": [
        { input: "3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n1", output: "200" },
    ],
    "number-of-islands": [
        { input: "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", output: "1" },
        { input: "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", output: "3" }
    ],
    "alien-dictionary": [
        { input: "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]", output: "\"wertf\"" },
    ],
    "graph-valid-tree": [
        { input: "5\n[[0,1],[0,2],[0,3],[1,4]]", output: "true" },
        { input: "5\n[[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false" }
    ],
    "clone-graph": [
        { input: "[[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
    ],
    "pacific-atlantic-water-flow": [
        { input: "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" },
    ],
    "shortest-bridge": [
        { input: "[[0,1],[1,0]]", output: "1" },
        { input: "[[0,1,0],[0,0,0],[0,0,1]]", output: "2" }
    ],
    "all-paths-from-source-to-target": [
        { input: "[[1,2],[3],[3],[]]", output: "[[0,1,3],[0,2,3]]" },
    ],
    "is-graph-bipartite": [
        { input: "[[1,2,3],[0,2],[0,1,3],[0,2]]", output: "false" },
        { input: "[[1,3],[0,2],[1,3],[0,2]]", output: "true" }
    ],
    "path-with-minimum-effort": [
        { input: "[[1,2,2],[3,8,2],[5,3,5]]", output: "2" },
    ],
    "reconstruct-itinerary": [
        { input: "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]", output: "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]" },
    ],
    "min-cost-to-connect-all-points": [
        { input: "[[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20" },
    ],
    "swim-in-rising-water": [
        { input: "[[0,2],[1,3]]", output: "3" },
    ],
    "alien-dictionary": [
        { input: "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]", output: "\"wertf\"" }
    ],

    // ════════════════════════════════════════════════════════════════
    // DYNAMIC PROGRAMMING (1D & 2D)
    // ════════════════════════════════════════════════════════════════
    "climbing-stairs": [
        { input: "2", output: "2" },
        { input: "3", output: "3" }
    ],
    "min-cost-climbing-stairs": [
        { input: "[10,15,20]", output: "15" },
        { input: "[1,100,1,1,1,100,1,1,100,1]", output: "6" }
    ],
    "house-robber": [
        { input: "[1,2,3,1]", output: "4" },
        { input: "[2,7,9,3,1]", output: "12" }
    ],
    "house-robber-ii": [
        { input: "[2,3,2]", output: "3" },
        { input: "[1,2,3,1]", output: "4" }
    ],
    "longest-palindromic-substring": [
        { input: "\"babad\"", output: "\"bab\"" }, // or "aba"
        { input: "\"cbbd\"", output: "\"bb\"" }
    ],
    "palindromic-substrings": [
        { input: "\"abc\"", output: "3" },
        { input: "\"aaa\"", output: "6" }
    ],
    "decode-ways": [
        { input: "\"12\"", output: "2" },
        { input: "\"226\"", output: "3" }
    ],
    "coin-change": [
        { input: "[1,2,5]\n11", output: "3" },
        { input: "[2]\n3", output: "-1" }
    ],
    "maximum-product-subarray": [
        { input: "[2,3,-2,4]", output: "6" },
        { input: "[-2,0,-1]", output: "0" }
    ],
    "word-break": [
        { input: "\"leetcode\"\n[\"leet\",\"code\"]", output: "true" },
        { input: "\"catsandog\"\n[\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", output: "false" }
    ],
    "longest-increasing-subsequence": [
        { input: "[10,9,2,5,3,7,101,18]", output: "4" },
        { input: "[0,1,0,3,2,3]", output: "4" }
    ],
    "partition-equal-subset-sum": [
        { input: "[1,5,11,5]", output: "true" },
        { input: "[1,2,3,5]", output: "false" }
    ],
    "unique-paths": [
        { input: "3\n7", output: "28" },
        { input: "3\n2", output: "3" }
    ],
    "unique-paths-ii": [
        { input: "[[0,0,0],[0,1,0],[0,0,0]]", output: "2" },
        { input: "[[0,1],[0,0]]", output: "1" }
    ],
    "minimum-path-sum": [
        { input: "[[1,3,1],[1,5,1],[4,2,1]]", output: "7" },
        { input: "[[1,2,3],[4,5,6]]", output: "12" }
    ],
    "longest-common-subsequence": [
        { input: "\"abcde\"\n\"ace\"", output: "3" },
        { input: "\"abc\"\n\"abc\"", output: "3" }
    ],
    "best-time-to-buy-and-sell-stock-with-cooldown": [
        { input: "[1,2,3,0,2]", output: "3" },
    ],
    "best-time-to-buy-and-sell-stock-iv": [
        { input: "2\n[2,4,1]", output: "2" },
        { input: "2\n[3,2,6,5,0,3]", output: "7" }
    ],
    "edit-distance": [
        { input: "\"horse\"\n\"ros\"", output: "3" },
        { input: "\"intention\"\n\"execution\"", output: "5" }
    ],
    "distinct-subsequences": [
        { input: "\"rabbbit\"\n\"rabbit\"", output: "3" },
        { input: "\"babgbag\"\n\"bag\"", output: "5" }
    ],
    "interleaving-string": [
        { input: "\"aabcc\"\n\"dbbca\"\n\"aadbbcbcac\"", output: "true" },
        { input: "\"aabcc\"\n\"dbbca\"\n\"aadbbbaccc\"", output: "false" }
    ],
    "burst-balloons": [
        { input: "[3,1,5,8]", output: "167" },
        { input: "[1,5]", output: "10" }
    ],
    "regular-expression-matching": [
        { input: "\"aa\"\n\"a\"", output: "false" },
        { input: "\"aa\"\n\"a*\"", output: "true" }
    ],
    "triangle": [
        { input: "[[2],[3,4],[6,5,7],[4,1,8,3]]", output: "11" },
    ],
    "delete-and-earn": [
        { input: "[3,4,2]", output: "6" },
        { input: "[2,2,3,3,3,4]", output: "9" }
    ],
    "perfect-squares": [
        { input: "12", output: "3" },
        { input: "13", output: "2" }
    ],
    "maximal-square": [
        { input: "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]", output: "4" },
    ],
    "ones-and-zeroes": [
        { input: "[\"10\",\"0001\",\"111001\",\"1\",\"0\"]\n5\n3", output: "4" },
    ],
    "stone-game": [
        { input: "[5,3,4,5]", output: "true" },
    ],
    "stone-game-ii": [
        { input: "[2,7,9,4,4]", output: "10" },
    ],
    "stone-game-iii": [
        { input: "[1,2,3,7]", output: "Alice" },
        { input: "[1,2,3,-9]", output: "Alice" }
    ],
    "concatenated-words": [
        { input: "[\"cat\",\"cats\",\"catsdogcats\",\"dog\",\"dogcatsdog\",\"hippopotamuses\",\"rat\",\"ratcatdogcat\"]", output: "[\"catsdogcats\",\"dogcatsdog\",\"ratcatdogcat\"]" },
    ],
    "n-th-tribonacci-number": [
        { input: "4", output: "4" },
        { input: "25", output: "1389537" }
    ],

    // ════════════════════════════════════════════════════════════════
    // RECURSION
    // ════════════════════════════════════════════════════════════════
    "subsets": [
        { input: "[1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
        { input: "[0]", output: "[[],[0]]" }
    ],
    "subsets-ii": [
        { input: "[1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" },
    ],
    "combination-sum": [
        { input: "[2,3,6,7]\n7", output: "[[2,2,3],[7]]" },
    ],
    "combination-sum-ii": [
        { input: "[10,1,2,7,6,1,5]\n8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" },
    ],
    "permutations": [
        { input: "[1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
    ],
    "letter-combinations-of-a-phone-number": [
        { input: "\"23\"", output: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]" },
    ],
    "palindrome-partitioning": [
        { input: "\"aab\"", output: "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]" },
    ],
    "word-search": [
        { input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\n\"ABCCED\"", output: "true" },
    ],
    "n-queens": [
        { input: "4", output: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]" },
    ],
    "sudoku-solver": [
        { input: "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", output: "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]" },
    ],
    "rat-in-a-maze": [
        { input: "[[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]]", output: "[\"DDRDRR\",\"DRDDRR\"]" },
    ],
    "m-coloring-problem": [
        { input: "4\n3\n[[0,1],[1,2],[2,3],[3,0],[0,2]]", output: "true" },
    ],
    "recursive-implementation-of-atoi": [
        { input: "\"42\"", output: "42" },
        { input: "\"   -42\"", output: "-42" }
    ],
    "count-good-numbers": [
        { input: "1", output: "5" },
        { input: "4", output: "400" },
        { input: "50", output: "564908303" }
    ],

    // ════════════════════════════════════════════════════════════════
    // MISMATCHED SLUGS (Striver / LeetCode variants)
    // ════════════════════════════════════════════════════════════════
    "middle-of-the-linked-list": [
        { input: "[1,2,3,4,5]", output: "[3,4,5]" },
    ],
    "linked-list-cycle": [
        { input: "[3,2,0,-4]\n1", output: "true" },
    ],
    "linked-list-cycle-ii": [
        { input: "[3,2,0,-4]\n1", output: "2" },
    ],
    "remove-duplicates-from-sorted-list": [
        { input: "[1,1,2]", output: "[1,2]" },
    ],
    "remove-linked-list-elements": [
        { input: "[1,2,6,3,4,5,6]\n6", output: "[1,2,3,4,5]" },
    ],
    "palindrome-linked-list": [
        { input: "[1,2,2,1]", output: "true" },
    ],
    "invert-binary-tree": [
        { input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
    ],
    "maximum-depth-of-binary-tree": [
        { input: "[3,9,20,null,null,15,7]", output: "3" },
    ],
    "diameter-of-binary-tree": [
        { input: "[1,2,3,4,5]", output: "3" },
    ],
    "binary-tree-inorder-traversal": [
        { input: "[1,null,2,3]", output: "[1,3,2]" },
    ],
    "binary-tree-preorder-traversal": [
        { input: "[1,null,2,3]", output: "[1,2,3]" },
    ],
    "binary-tree-postorder-traversal": [
        { input: "[1,null,2,3]", output: "[3,2,1]" },
    ],
    "binary-tree-level-order-traversal": [
        { input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
    ],
    "subtree-of-another-tree": [
        { input: "[3,4,5,1,2]\n[4,1,2]", output: "true" },
    ],
    "lowest-common-ancestor-of-a-binary-search-tree": [
        { input: "[6,2,8,0,4,7,9,null,null,3,5]\n2\n8", output: "6" },
    ],
    "validate-binary-search-tree": [
        { input: "[2,1,3]", output: "true" },
    ],
    "kth-smallest-element-in-a-bst": [
        { input: "[3,1,4,null,2]\n1", output: "1" },
    ],

};

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    let updated = 0;
    let notFound = 0;

    for (const [slug, testCases] of Object.entries(FIXES)) {
        const result = await M.updateOne(
            { slug },
            { $set: { testCases, examples: testCases.slice(0, 2) } }
        );
        if (result.matchedCount > 0) {
            updated++;
        } else {
            notFound++;
            console.log(`  NOT FOUND: ${slug}`);
        }
    }

    console.log(`\n========================================`);
    console.log(`Updated: ${updated} problems`);
    console.log(`Not found: ${notFound}`);
    console.log(`========================================`);

    await mongoose.disconnect();
}

run().catch(console.error);
