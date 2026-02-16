// MEGA REPAIR 4: Final 131 problems (Arrays, Striver LL/DP, Remaining Graphs)
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({}, { strict: false, collection: 'dsaproblems' });
const M = mongoose.models.DSAProblem || mongoose.model('DSAProblem', ProblemSchema);

const FIXES = {

    // ════════════════════════════════════════════════════════════════
    // ARRAYS & HASHING (Striver & LeetCode)
    // ════════════════════════════════════════════════════════════════
    "second-largest-element-in-array": [{ input: "[1,2,3,4,5]", output: "4" }, { input: "[10,5,10]", output: "5" }],
    "left-rotate-the-array-by-one": [{ input: "[1,2,3,4,5]", output: "[2,3,4,5,1]" }],
    "rotate-array-by-k-elements": [{ input: "[1,2,3,4,5,6,7]\n3", output: "[5,6,7,1,2,3,4]" }],
    "move-zeros-to-end": [{ input: "[0,1,0,3,12]", output: "[1,3,12,0,0]" }],
    "linear-search": [{ input: "[1,2,3,4,5]\n4", output: "3" }],
    "union-of-two-sorted-arrays": [{ input: "[1,2,3,4,5]\n[1,2,3]", output: "[1,2,3,4,5]" }],
    "longest-subarray-with-sum-k": [{ input: "[10, 5, 2, 7, 1, 9]\n15", output: "4" }],
    "best-time-to-buy-and-sell-stock-ii": [{ input: "[7,1,5,3,6,4]", output: "7" }],
    "concatenation-of-array": [{ input: "[1,2,1]", output: "[1,2,1,1,2,1]" }],
    "replace-elements-with-greatest-element-on-right-side": [{ input: "[17,18,5,4,6,1]", output: "[18,6,6,6,1,-1]" }],
    "length-of-last-word": [{ input: "\"Hello World\"", output: "5" }],
    "pascals-triangle": [{ input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" }],
    "majority-element-ii": [{ input: "[3,2,3]", output: "[3]" }, { input: "[1,2]", output: "[1,2]" }],
    "missing-number": [{ input: "[3,0,1]", output: "2" }],
    "maximum-consecutive-ones": [{ input: "[1,1,0,1,1,1]", output: "3" }],
    "single-number": [{ input: "[2,2,1]", output: "1" }],
    "intersection-of-two-arrays-ii": [{ input: "[1,2,2,1]\n[2,2]", output: "[2,2]" }],
    "summary-ranges": [{ input: "[0,1,2,4,5,7]", output: "[\"0->2\",\"4->5\",\"7\"]" }],
    "can-place-flowers": [{ input: "[1,0,0,0,1]\n1", output: "true" }],
    "grid-unique-paths": [{ input: "3\n7", output: "28" }],
    "sort-an-array-of-0s-1s-and-2s": [{ input: "[2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" }],
    "check-if-array-is-sorted-and-rotated": [{ input: "[3,4,5,1,2]", output: "true" }],
    "remove-duplicates-from-sorted-array": [{ input: "[1,1,2]", output: "2" }],
    "intersection-of-two-sorted-arrays": [{ input: "[1,2,3,3,4,5,6]\n[3,3,5]", output: "[3,3,5]" }],
    "longest-consecutive-sequence-in-an-array": [{ input: "[100,4,200,1,3,2]", output: "4" }],

    // ════════════════════════════════════════════════════════════════
    // LINKED LIST (Striver Variations)
    // ════════════════════════════════════════════════════════════════
    "introduction-to-linked-list": [{ input: "[1,2,3,4,5]", output: "1 2 3 4 5" }],
    "insert-node-at-beginning": [{ input: "[1,2,3]\n0", output: "0 1 2 3" }],
    "delete-node-in-linked-list": [{ input: "[4,5,1,9]\n5", output: "4 1 9" }], // Input usually gives value or node ref
    "find-length-of-linked-list": [{ input: "[1,2,3,4,5]", output: "5" }],
    "search-in-linked-list": [{ input: "[1,2,3]\n2", output: "1" }],
    "introduction-to-doubly-linked-list": [{ input: "[1,2,3]", output: "1 2 3" }],
    "insert-a-node-in-dll": [{ input: "[1,2,3]\n2\n5", output: "[1,2,5,3]" }],
    "delete-a-node-in-dll": [{ input: "[1,5,2]\n5", output: "[1,2]" }],
    "reverse-a-dll": [{ input: "[1,2,3]", output: "[3,2,1]" }],
    "detect-loop-in-linked-list": [{ input: "[3,2,0,-4]\n1", output: "true" }],
    "find-starting-point-of-loop": [{ input: "[3,2,0,-4]\n1", output: "2" }],
    "length-of-loop-in-linked-list": [{ input: "[1,2,3,4,5]\n1", output: "4" }],
    "check-if-ll-is-palindrome": [{ input: "[1,2,2,1]", output: "true" }],
    "segregate-odd-and-even-nodes": [{ input: "[1,2,3,4,5]", output: "[1,3,5,2,4]" }],
    "remove-nth-node-from-end": [{ input: "[1,2,3,4,5]\n2", output: "[1,2,3,5]" }],
    "delete-middle-node": [{ input: "[1,3,4,7,1,2,6]", output: "[1,3,4,1,2,6]" }],
    "add-two-numbers-in-ll": [{ input: "[2,4,3]\n[5,6,4]", output: "[7,0,8]" }],
    "delete-all-occurrences-of-key-in-dll": [{ input: "[10,10,2]\n10", output: "[2]" }],
    "maximum-twin-sum-of-a-linked-list": [{ input: "[5,4,2,1]", output: "6" }],
    "swapping-nodes-in-a-linked-list": [{ input: "[1,2,3,4,5]\n2", output: "[1,4,3,2,5]" }],
    "split-linked-list-in-parts": [{ input: "[1,2,3]\n5", output: "[[1],[2],[3],[],[]]" }],

    // ════════════════════════════════════════════════════════════════
    // DYNAMIC PROGRAMMING (Striver)
    // ════════════════════════════════════════════════════════════════
    "max-sum-of-non-adjacent-elements": [{ input: "[2, 1, 4, 9]", output: "11" }],
    "ninja-s-training": [{ input: "[[1,2,5],[3,1,1],[3,3,3]]", output: "11" }],
    "minimum-falling-path-sum": [{ input: "[[2,1,3],[6,5,4],[7,8,9]]", output: "13" }],
    "subset-sum-equal-to-target": [{ input: "[1,2,3]\n4", output: "true" }],
    "count-subsets-with-sum-k": [{ input: "[1,2,2,3]\n3", output: "3" }], // 1+2, 1+2, 3
    "partitions-with-given-difference": [{ input: "[5, 2, 6, 4]\n3", output: "1" }],
    "0-1-knapsack": [{ input: "[1,2,3]\n[4,5,1]\n4", output: "3" }],
    "unbounded-knapsack": [{ input: "[2,4,6]\n[5,11,13]\n10", output: "27" }],
    "rod-cutting-problem": [{ input: "[1, 5, 8, 9, 10, 17, 17, 20]", output: "22" }],
    "longest-common-substring": [{ input: "\"abcd\"\n\"abzd\"", output: "2" }],
    "shortest-common-supersequence": [{ input: "\"abac\"\n\"cab\"", output: "\"cabac\"" }],
    "matrix-chain-multiplication": [{ input: "5\n[40, 20, 30, 10, 30]", output: "26000" }],
    "minimum-cost-to-cut-the-stick": [{ input: "7\n[1,3,4,5]", output: "16" }],
    "burst-balloons": [{ input: "[3,1,5,8]", output: "167" }], // Duplicated check, fine
    "palindrome-partitioning-ii": [{ input: "\"aab\"", output: "1" }],
    "maximum-sum-increasing-subsequence": [{ input: "[1, 101, 2, 3, 100]", output: "106" }],
    "number-of-longest-increasing-subsequences": [{ input: "[1,3,5,4,7]", output: "2" }],
    "paint-house": [{ input: "[[17,2,17],[16,16,5],[14,3,19]]", output: "10" }],

    // ════════════════════════════════════════════════════════════════
    // REMAINING GRAPHS
    // ════════════════════════════════════════════════════════════════
    "0-1-matrix": [{ input: "[[0,0,0],[0,1,0],[0,0,0]]", output: "[[0,0,0],[0,1,0],[0,0,0]]" }],
    "word-ladder-i": [{ input: "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", output: "5" }],
    "bipartite-graph": [{ input: "[[1,3],[0,2],[1,3],[0,2]]", output: "true" }],
    "course-schedule-i": [{ input: "2\n[[1,0]]", output: "true" }],
    "course-schedule-iv": [{ input: "2\n[[1,0]]\n[[0,1],[1,0]]", output: "[false,true]" }],
    "walls-and-gates": [{ input: "[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]", output: "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]" }],
    "check-if-move-is-legal": [{ input: "[[0,0,0],[0,1,0],[0,0,0]]\n0\n0\n0", output: "false" }], // simplified
    "path-with-maximum-probability": [{ input: "3\n[[0,1],[1,2],[0,2]]\n[0.5,0.5,0.2]\n0\n2", output: "0.25000" }],
    "number-of-good-paths": [{ input: "[1,3,2,1,3]\n[[0,1],[0,2],[2,3],[2,4]]", output: "6" }],

    // ════════════════════════════════════════════════════════════════
    // REMAINING OTHERS
    // ════════════════════════════════════════════════════════════════
    "minimum-days-to-make-m-bouquets": [{ input: "[1,10,3,10,2]\n3\n1", output: "3" }],
    "find-the-smallest-divisor-given-a-threshold": [{ input: "[1,2,5,9]\n6", output: "5" }],
    "print-all-subsequences": [{ input: "[1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },],
    "sleep": [{ input: "100", output: "100" }],
    "differences-between-two-objects": [{ input: "{\"a\":1}\n{\"a\":2}", output: "{\"a\":[1,2]}" }],
    "user-input-output": [{ input: "5", output: "5" }],

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
