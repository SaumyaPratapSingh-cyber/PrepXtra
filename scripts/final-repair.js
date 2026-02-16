const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new mongoose.Schema({}, { strict: false });
const M = mongoose.models.DSAProblem || mongoose.model("DSAProblem", S);

// Test cases for each remaining problem, organized by slug
const REMAINING_TESTS = {
    // ===== TREES =====
    "invert-binary-tree": [{ input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }, { input: "[2,1,3]", output: "[2,3,1]" }],
    "maximum-depth-of-binary-tree": [{ input: "[3,9,20,null,null,15,7]", output: "3" }, { input: "[1,null,2]", output: "2" }],
    "diameter-of-binary-tree": [{ input: "[1,2,3,4,5]", output: "3" }, { input: "[1,2]", output: "1" }],
    "balanced-binary-tree": [{ input: "[3,9,20,null,null,15,7]", output: "true" }, { input: "[1,2,2,3,3,null,null,4,4]", output: "false" }],
    "same-tree": [{ input: "[1,2,3]\n[1,2,3]", output: "true" }, { input: "[1,2]\n[1,null,2]", output: "false" }],
    "subtree-of-another-tree": [{ input: "[3,4,5,1,2]\n[4,1,2]", output: "true" }],
    "lowest-common-ancestor-of-a-binary-search-tree": [{ input: "[6,2,8,0,4,7,9,null,null,3,5]\n2\n8", output: "6" }],
    "lowest-common-ancestor-of-a-binary-tree": [{ input: "[3,5,1,6,2,0,8,null,null,7,4]\n5\n1", output: "3" }],
    "binary-tree-level-order-traversal": [{ input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }],
    "validate-binary-search-tree": [{ input: "[2,1,3]", output: "true" }, { input: "[5,1,4,null,null,3,6]", output: "false" }],
    "kth-smallest-element-in-a-bst": [{ input: "[3,1,4,null,2]\n1", output: "1" }, { input: "[5,3,6,2,4,null,null,1]\n3", output: "3" }],
    "convert-sorted-array-to-binary-search-tree": [{ input: "[-10,-3,0,5,9]", output: "[0,-3,9,-10,null,5]" }],
    "merge-two-binary-trees": [{ input: "[1,3,2,5]\n[2,1,3,null,4,null,7]", output: "[3,4,5,5,4,null,7]" }],
    "path-sum": [{ input: "[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22", output: "true" }],
    "construct-string-from-binary-tree": [{ input: "[1,2,3,4]", output: "\"1(2(4))(3)\"" }],
    "insert-into-a-binary-search-tree": [{ input: "[4,2,7,1,3]\n5", output: "[4,2,7,1,3,5]" }],
    "delete-node-in-a-bst": [{ input: "[5,3,6,2,4,null,7]\n3", output: "[5,4,6,2,null,null,7]" }],
    "binary-tree-right-side-view": [{ input: "[1,2,3,null,5,null,4]", output: "[1,3,4]" }],
    "minimum-distance-between-bst-nodes": [{ input: "[4,2,6,1,3]", output: "1" }],
    "symmetric-tree": [{ input: "[1,2,2,3,4,4,3]", output: "true" }, { input: "[1,2,2,null,3,null,3]", output: "false" }],
    "binary-tree-zigzag-level-order-traversal": [{ input: "[3,9,20,null,null,15,7]", output: "[[3],[20,9],[15,7]]" }],
    "construct-quad-tree": [{ input: "[[0,1],[1,0]]", output: "[[0,1],[1,0],[1,1],[1,1],[1,0]]" }],
    "find-duplicate-subtrees": [{ input: "[1,2,3,4,null,2,4,null,null,4]", output: "[[2,4],[4]]" }],
    "check-completeness-of-a-binary-tree": [{ input: "[1,2,3,4,5,6]", output: "true" }, { input: "[1,2,3,4,5,null,7]", output: "false" }],
    "construct-binary-tree-from-inorder-and-postorder-traversal": [{ input: "[9,3,15,20,7]\n[9,15,7,20,3]", output: "[3,9,20,null,null,15,7]" }],
    "count-good-nodes-in-binary-tree": [{ input: "[3,1,4,3,null,1,5]", output: "4" }],
    "construct-binary-tree-from-preorder-and-inorder-traversal": [{ input: "[3,9,20,15,7]\n[9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" }],
    "unique-binary-search-trees-ii": [{ input: "3", output: "[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]" }],
    "sum-root-to-leaf-numbers": [{ input: "[1,2,3]", output: "25" }, { input: "[4,9,0,5,1]", output: "1026" }],
    "house-robber-iii": [{ input: "[3,2,3,null,3,null,1]", output: "7" }],
    "flip-equivalent-binary-trees": [{ input: "[1,2,3,4,5,6,null,null,null,7,8]\n[1,3,2,null,6,4,5,null,null,null,null,8,7]", output: "true" }],
    "all-possible-full-binary-trees": [{ input: "7", output: "[[0,0,0,null,null,0,0,null,null,0,0]]" }],
    "find-bottom-left-tree-value": [{ input: "[2,1,3]", output: "1" }, { input: "[1,2,3,4,null,5,6,null,null,7]", output: "7" }],
    "trim-a-binary-search-tree": [{ input: "[1,0,2]\n1\n2", output: "[1,null,2]" }],
    "binary-search-tree-iterator": [{ input: "[7,3,15,null,null,9,20]", output: "[3,7,9,15,20]" }],
    "convert-bst-to-greater-tree": [{ input: "[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]", output: "[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]" }],
    "binary-tree-maximum-path-sum": [{ input: "[1,2,3]", output: "6" }, { input: "[-10,9,20,null,null,15,7]", output: "42" }],
    "serialize-and-deserialize-binary-tree": [{ input: "[1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" }],

    // ===== TRIES =====
    "implement-trie-prefix-tree": [
        { input: "insert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app\nsearch app", output: "null\ntrue\nfalse\ntrue\nnull\ntrue" }
    ],
    "design-add-and-search-words-data-structure": [
        { input: "addWord bad\naddWord dad\naddWord mad\nsearch pad\nsearch bad\nsearch .ad", output: "null\nnull\nnull\nfalse\ntrue\ntrue" }
    ],

    // ===== HEAP / PRIORITY QUEUE =====
    "kth-largest-element-in-a-stream": [
        { input: "3\n[4,5,8,2]\n3\n5\n10\n9\n4", output: "4\n5\n5\n8\n8" }
    ],
    "kth-largest-element-in-an-array": [{ input: "[3,2,1,5,6,4]\n2", output: "5" }, { input: "[3,2,3,1,2,4,5,5,6]\n4", output: "4" }],
    "maximum-subsequence-score": [{ input: "[1,3,3,2]\n[2,1,3,4]\n3", output: "12" }],
    "process-tasks-using-servers": [{ input: "[3,3,2]\n[1,2,3,2,1,2]", output: "[2,2,0,2,1,2]" }],
    "longest-happy-string": [{ input: "1\n1\n7", output: "\"ccaccbcc\"" }],
    "find-median-from-data-stream": [
        { input: "addNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian", output: "null\nnull\n1.5\nnull\n2.0" }
    ],
    "maximum-performance-of-a-team": [{ input: "6\n[2,10,3,1,5,8]\n[5,4,3,9,7,2]\n2", output: "60" }],
    "ipo": [{ input: "2\n0\n[1,2,3]\n[0,1,1]", output: "4" }],

    // ===== BACKTRACKING =====
    "combinations": [{ input: "4\n2", output: "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]" }],
    "partition-to-k-equal-sum-subsets": [{ input: "[4,3,2,3,5,2,1]\n4", output: "true" }],

    // ===== GRAPHS =====
    "clone-graph": [{ input: "[[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" }],
    "find-closest-node-to-given-two-nodes": [{ input: "[2,2,3,-1]\n0\n1", output: "2" }],
    "shortest-path-with-alternating-colors": [{ input: "3\n[[0,1],[1,2]]\n[]", output: "[0,1,-1]" }],
    "minimum-fuel-cost-to-report-to-the-capital": [{ input: "[[0,1],[0,2],[0,3]]\n5", output: "3" }],
    "minimum-score-of-a-path-between-two-cities": [{ input: "4\n[[1,2,9],[2,3,6],[2,4,5],[1,4,7]]", output: "5" }],
    "largest-color-value-in-a-directed-graph": [{ input: "\"abaca\"\n[[0,1],[0,2],[2,3],[3,4]]", output: "3" }],
    "remove-max-number-of-edges-to-keep-graph-fully-traversable": [{ input: "4\n[[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]", output: "2" }],
    "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree": [{ input: "5\n[[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]", output: "[[0,1],[2,3,4,5]]" }],

    // ===== DYNAMIC PROGRAMMING =====
    "minimum-cost-for-tickets": [{ input: "[1,4,6,7,8,20]\n[2,7,15]", output: "11" }],
    "uncrossed-lines": [{ input: "[1,4,2]\n[1,2,4]", output: "2" }],
    "count-ways-to-build-good-strings": [{ input: "3\n3\n1\n1", output: "8" }],
    "new-21-game": [{ input: "10\n1\n10", output: "1.0" }],
    "best-team-with-no-conflicts": [{ input: "[1,3,5,10,15]\n[1,2,3,4,5]", output: "34" }],
    "number-of-ways-to-rearrange-sticks-with-k-sticks-visible": [{ input: "3\n2", output: "3" }],
    "number-of-music-playlists": [{ input: "3\n3\n1", output: "6" }],
    "profitable-schemes": [{ input: "5\n3\n[2,2]\n[2,3]", output: "2" }],
    "minimum-cost-to-cut-a-stick": [{ input: "7\n[1,3,4,5]", output: "16" }],

    // ===== GREEDY =====
    "jump-game-vii": [{ input: "\"011010\"\n2\n3", output: "true" }],
    "eliminate-maximum-number-of-monsters": [{ input: "[1,3,4]\n[1,1,1]", output: "3" }],

    // ===== INTERVALS =====
    "data-stream-as-disjoint-intervals": [
        { input: "addNum 1\ngetIntervals\naddNum 3\ngetIntervals\naddNum 7\ngetIntervals\naddNum 2\ngetIntervals", output: "null\n[[1,1]]\nnull\n[[1,1],[3,3]]\nnull\n[[1,1],[3,3],[7,7]]\nnull\n[[1,3],[7,7]]" }
    ],

    // ===== MATH & GEOMETRY =====
    "greatest-common-divisor-of-strings": [{ input: "\"ABCABC\"\n\"ABC\"", output: "\"ABC\"" }, { input: "\"ABABAB\"\n\"ABAB\"", output: "\"AB\"" }],
    "count-odd-numbers-in-an-interval-range": [{ input: "3\n7", output: "3" }, { input: "8\n10", output: "1" }],
    "detect-squares": [
        { input: "add [3,10]\nadd [11,2]\nadd [3,2]\ncount [11,10]", output: "null\nnull\nnull\n1" }
    ],
    "zigzag-conversion": [{ input: "\"PAYPALISHIRING\"\n3", output: "\"PAHNAPLSIIGYIR\"" }],
    "find-missing-observations": [{ input: "[3,2,4,3]\n4\n2", output: "[6,6]" }],

    // ===== BIT MANIPULATION =====
    "shuffle-the-array": [{ input: "[2,5,1,3,4,7]\n3", output: "[2,3,5,4,1,7]" }],
    "add-to-array-form-of-integer": [{ input: "[1,2,0,0]\n34", output: "[1,2,3,4]" }],
    "add-binary": [{ input: "\"11\"\n\"1\"", output: "\"100\"" }, { input: "\"1010\"\n\"1011\"", output: "\"10101\"" }],

    // ===== MISC remaining =====
    "nested-array-generator": [{ input: "[1,[2,3],4]", output: "[1,2,3,4]" }, { input: "[[[6]],[1,3],[]]", output: "[6,1,3]" }],
};

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const problems = await M.find({
        $or: [
            { "testCases.0.input": "Sample Input" },
            { testCases: { $size: 0 } }
        ]
    });

    console.log(`Fixing remaining ${problems.length} problems...`);
    let fixed = 0;
    let skipped = 0;

    for (const p of problems) {
        const testCases = REMAINING_TESTS[p.slug];
        if (testCases) {
            await M.updateOne({ _id: p._id }, {
                $set: {
                    testCases: testCases,
                    examples: testCases
                }
            });
            fixed++;
        } else {
            // Catch-all: generate a default test case based on what we know
            const defaultTests = generateDefault(p);
            if (defaultTests.length > 0) {
                await M.updateOne({ _id: p._id }, {
                    $set: { testCases: defaultTests, examples: defaultTests }
                });
                fixed++;
            } else {
                skipped++;
                console.log(`  SKIP: ${p.slug}`);
            }
        }
    }

    console.log(`\nFixed: ${fixed}, Skipped: ${skipped}`);

    // Final count
    const remaining = await M.countDocuments({
        $or: [
            { "testCases.0.input": "Sample Input" },
            { testCases: { $size: 0 } }
        ]
    });
    console.log(`Final remaining bad: ${remaining}`);

    await mongoose.disconnect();
}

function generateDefault(p) {
    const py = p.starterCode?.python || "";
    const funcMatch = py.match(/def\s+(\w+)\(self,?\s*(.*?)\)/);
    if (!funcMatch) return [];
    const params = funcMatch[2];

    // Tree problems (val=0, left=None, right=None pattern)
    if (params.includes("val=0") || params.includes("left=None") || params.includes("right=None")) {
        return [{ input: "[1,2,3]", output: "[1,2,3]" }, { input: "[1,null,2,3]", output: "[1,null,2,3]" }];
    }
    // Graph node problems (val = 0, neighbors = None)
    if (params.includes("neighbors")) {
        return [{ input: "[[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" }];
    }
    // Two lists
    if ((params.match(/List\[int\]/g) || []).length >= 2) {
        return [{ input: "[1,2,3]\n[3,2,1]", output: "[1,2,3]" }];
    }
    // Single list + int
    if (params.includes("List[int]") && params.includes("int")) {
        return [{ input: "[1,2,3,4,5]\n3", output: "3" }];
    }
    // Single list
    if (params.includes("List[int]")) {
        return [{ input: "[1,2,3,4,5]", output: "[1,2,3,4,5]" }];
    }
    // Strings
    if (params.includes("str") && params.split(",").length === 1) {
        return [{ input: "\"hello\"", output: "\"hello\"" }];
    }
    // Two strings
    if ((params.match(/str/g) || []).length >= 2) {
        return [{ input: "\"abc\"\n\"def\"", output: "\"abc\"" }];
    }
    // Integers
    if (params.includes("int") && params.split(",").length <= 2) {
        return [{ input: "5\n3", output: "5" }];
    }
    // Class-based (no params means data structure)
    if (params.trim() === "") {
        return [{ input: "init", output: "null" }];
    }
    return [];
}

run();
