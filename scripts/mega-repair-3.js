// MEGA REPAIR 3: Final batch - Advanced Graphs, Hard DP, Design Problems, JS
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({}, { strict: false, collection: 'dsaproblems' });
const M = mongoose.models.DSAProblem || mongoose.model('DSAProblem', ProblemSchema);

const FIXES = {

    // ════════════════════════════════════════════════════════════════
    // GRAPHS (Advanced & Algorithms)
    // ════════════════════════════════════════════════════════════════
    "dijkstra-s-algorithm": [
        { input: "3\n3\n[[0,1,1],[0,2,6],[1,2,3]]\n0", output: "[0,1,4]" },
    ],
    "bellman-ford-algorithm": [
        { input: "[[0,1,5],[1,0,3],[1,2,-1],[2,0,1]]\n0", output: "[0,5,4]" },
    ],
    "floyd-warshall-algorithm": [
        { input: "[[0,1,43],[1,0,6],[-1,-1,0]]", output: "[[0,1,7],[1,0,6],[-1,-1,0]]" },
    ],
    "prim-s-algorithm": [
        { input: "3\n3\n[[0,1,5],[1,2,3],[0,2,1]]", output: "4" },
    ],
    "kruskal-s-algorithm": [
        { input: "3\n3\n[[0,1,5],[1,2,3],[0,2,1]]", output: "4" },
    ],
    "disjoint-set-union": [
        { input: "5\n[[0,1],[2,3],[1,2]]", output: "true" }, // check if connected
    ],
    "topological-sort": [
        { input: "4\n[[1,0],[2,0],[3,1],[3,2]]", output: "[0,1,2,3]" },
    ],
    "kahn-s-algorithm": [
        { input: "4\n[[1,0],[2,0],[3,1],[3,2]]", output: "[0,1,2,3]" },
    ],
    "cycle-detection-in-undirected-graph-bfs-dfs": [
        { input: "5\n[[0,1],[1,2],[2,3],[3,4],[4,0]]", output: "true" },
        { input: "3\n[[0,1],[1,2]]", output: "false" }
    ],
    "cycle-detection-in-directed-graph": [
        { input: "4\n[[0,1],[1,2],[2,3],[3,1]]", output: "true" },
        { input: "4\n[[0,1],[1,2],[2,3]]", output: "false" }
    ],
    "shortest-path-in-undirected-graph": [
        { input: "[[0,1],[0,3],[1,2],[3,4],[4,5]]\n0\n5", output: "3" },
    ],
    "shortest-path-in-dag": [
        { input: "[[0,1,2],[0,4,1],[4,5,4],[4,2,2],[1,2,3],[2,3,6],[5,3,1]]\n0", output: "[0,2,3,6,1,5]" },
    ],
    "shortest-path-in-binary-maze": [
        { input: "[[0,0,0],[1,1,0],[1,1,0]]\n[0,0]\n[2,2]", output: "-1" },
        { input: "[[0,1],[1,0]]\n[0,0]\n[1,1]", output: "2" }
    ],
    "number-of-ways-to-arrive-at-destination": [
        { input: "7\n[[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]", output: "4" },
    ],
    "number-of-operations-to-make-network-connected": [
        { input: "4\n[[0,1],[0,2],[1,2]]", output: "1" },
    ],
    "most-stones-removed-with-same-row-or-column": [
        { input: "[[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]", output: "5" },
    ],
    "making-a-large-island": [
        { input: "[[1,0],[0,1]]", output: "3" },
        { input: "[[1,1],[1,0]]", output: "4" }
    ],
    "accounts-merge": [
        { input: "[[\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],[\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]", output: "[[\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]" },
    ],
    "island-perimeter": [
        { input: "[[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]", output: "16" },
    ],
    "find-eventual-safe-states": [
        { input: "[[1,2],[2,3],[5],[0],[5],[],[]]", output: "[2,4,5,6]" },
    ],
    "number-of-enclaves": [
        { input: "[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]", output: "3" },
    ],
    "count-sub-islands": [
        { input: "[[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]]\n[[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]", output: "3" },
    ],
    "reorder-routes-to-make-all-paths-lead-to-the-city-zero": [
        { input: "6\n[[0,1],[1,3],[2,3],[4,0],[4,5]]", output: "3" },
    ],
    "snakes-and-ladders": [
        { input: "[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]", output: "4" },
    ],
    "open-the-lock": [
        { input: "[\"0201\",\"0101\",\"0102\",\"1212\",\"2002\"]\n\"0202\"", output: "6" },
    ],
    "evaluate-division": [
        { input: "[[\"a\",\"b\"],[\"b\",\"c\"]]\n[2.0,3.0]\n[[\"a\",\"c\"],[\"b\",\"a\"],[\"a\",\"e\"],[\"a\",\"a\"],[\"x\",\"x\"]]", output: "[6.00000,0.50000,-1.00000,1.00000,-1.00000]" },
    ],
    "shortest-path-in-binary-matrix": [
        { input: "[[0,1],[1,0]]", output: "2" },
        { input: "[[0,0,0],[1,1,0],[1,1,0]]", output: "4" }
    ],
    "as-far-from-land-as-possible": [
        { input: "[[1,0,1],[0,0,0],[1,0,1]]", output: "2" },
    ],
    "number-of-closed-islands": [
        { input: "[[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]", output: "2" },
    ],
    "minimum-number-of-vertices-to-reach-all-nodes": [
        { input: "6\n[[0,1],[0,2],[2,5],[3,4],[4,2]]", output: "[0,3]" },
    ],

    // ════════════════════════════════════════════════════════════════
    // BINARY SEARCH (Striver)
    // ════════════════════════════════════════════════════════════════
    "binary-search-to-find-x-in-sorted-array": [
        { input: "[1,2,3,4,5,6,7]\n4", output: "3" },
    ],
    "implement-lower-bound": [
        { input: "[1,2,8,10,11,12,19]\n5", output: "2" },
    ],
    "implement-upper-bound": [
        { input: "[1,2,8,10,11,12,19]\n5", output: "2" },
    ],
    "floor-and-ceil-in-sorted-array": [
        { input: "[3, 4, 4, 7, 8, 10]\n5", output: "4 7" },
    ],
    "first-and-last-occurrences-of-x": [
        { input: "[5,7,7,8,8,10]\n8", output: "[3,4]" },
    ],
    "count-occurrences-in-sorted-array": [
        { input: "[1, 1, 2, 2, 2, 2, 3]\n2", output: "4" },
    ],
    "search-in-rotated-sorted-array-i": [
        { input: "[4,5,6,7,0,1,2]\n0", output: "4" },
    ],
    "search-in-rotated-sorted-array-ii": [
        { input: "[2,5,6,0,0,1,2]\n0", output: "true" },
    ],
    "find-minimum-in-rotated-sorted-array": [
        { input: "[3,4,5,1,2]", output: "1" },
    ],
    "single-element-in-sorted-array": [
        { input: "[1,1,2,3,3,4,4,8,8]", output: "2" },
    ],
    "find-peak-element-ii": [
        { input: "[[1,4],[3,2]]", output: "[0,1]" },
    ],
    "find-sqrt-of-a-number": [
        { input: "5", output: "2" },
    ],
    "nth-root-of-a-number": [
        { input: "3\n27", output: "3" },
    ],
    "kth-missing-positive-number": [
        { input: "[2,3,4,7,11]\n5", output: "9" },
    ],
    "capacity-to-ship-packages-within-d-days": [
        { input: "[1,2,3,4,5,6,7,8,9,10]\n5", output: "15" },
    ],
    "aggressive-cows": [
        { input: "5\n3\n[1,2,8,4,9]", output: "3" },
    ],
    "book-allocation-problem": [
        { input: "4\n2\n[12,34,67,90]", output: "113" },
    ],
    "painter-s-partition-problem": [
        { input: "2\n2\n[5,10]", output: "10" },
    ],
    "split-array-largest-sum": [
        { input: "[7,2,5,10,8]\n2", output: "18" },
    ],
    "minimize-max-distance-to-gas-station": [
        { input: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n9", output: "0.5" },
    ],
    "median-of-two-sorted-arrays": [
        { input: "[1,3]\n[2]", output: "2.00000" },
    ],
    "kth-element-of-two-sorted-arrays": [
        { input: "[2,3,6,7,9]\n[1,4,8,10]\n5", output: "6" },
    ],
    "matrix-median": [
        { input: "[[1,3,5],[2,6,9],[3,6,9]]", output: "5" },
    ],

    // ════════════════════════════════════════════════════════════════
    // LINKED LIST (Design & Striver Mismatches)
    // ════════════════════════════════════════════════════════════════
    "lru-cache": [
        { input: "[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]", output: "[null, null, null, 1, null, -1, null, -1, 3, 4]" },
    ],
    "lfu-cache": [
        { input: "[\"LFUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]", output: "[null, null, null, 1, null, -1, 3, null, -1, 3, 4]" },
    ],
    "design-linked-list": [
        { input: "[\"MyLinkedList\", \"addAtHead\", \"addAtTail\", \"addAtIndex\", \"get\", \"deleteAtIndex\", \"get\"]\n[[], [1], [3], [1, 2], [1], [1], [1]]", output: "[null, null, null, null, 2, null, 3]" },
    ],
    "design-browser-history": [
        { input: "[\"BrowserHistory\",\"visit\",\"visit\",\"visit\",\"back\",\"back\",\"forward\",\"visit\",\"forward\",\"back\",\"back\"]\n[[\"leetcode.com\"],[\"google.com\"],[\"facebook.com\"],[\"youtube.com\"],[1],[1],[1],[\"linkedin.com\"],[2],[2],[7]]", output: "[null,null,null,null,\"facebook.com\",\"google.com\",\"facebook.com\",null,\"linkedin.com\",\"google.com\",\"leetcode.com\"]" },
    ],
    "design-circular-queue": [
        { input: "[\"MyCircularQueue\", \"enQueue\", \"enQueue\", \"enQueue\", \"enQueue\", \"Rear\", \"isFull\", \"deQueue\", \"enQueue\", \"Rear\"]\n[[3], [1], [2], [3], [4], [], [], [], [4], []]", output: "[null, true, true, true, false, 3, true, true, true, 4]" },
    ],
    "flatten-a-linked-list": [
        { input: "[5,10,19,28]\n[7,20]\n[8]\n[30,22,50]", output: "[5,7,8,10,19,20,22,28,30,50]" },
    ],
    "rotate-list": [
        { input: "[1,2,3,4,5]\n2", output: "[4,5,1,2,3]" },
    ],
    "copy-list-with-random-pointer": [
        { input: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" },
    ],
    "reverse-linked-list-ii": [
        { input: "[1,2,3,4,5]\n2\n4", output: "[1,4,3,2,5]" },
    ],
    "partition-list": [
        { input: "[1,4,3,2,5,2]\n3", output: "[1,2,2,4,3,5]" },
    ],
    "swap-nodes-in-pairs": [
        { input: "[1,2,3,4]", output: "[2,1,4,3]" },
    ],
    "reorder-list": [
        { input: "[1,2,3,4]", output: "[1,4,2,3]" },
    ],

    // ════════════════════════════════════════════════════════════════
    // DYNAMIC PROGRAMMING (Hard)
    // ════════════════════════════════════════════════════════════════
    "palindrome-partitioning-ii": [
        { input: "\"aab\"", output: "1" },
    ],
    "burst-balloons": [
        { input: "[3,1,5,8]", output: "167" },
    ],
    "evaluate-boolean-expression-to-true": [
        { input: "\"T|T&F^T\"", output: "4" },
    ],
    "matrix-chain-multiplication": [
        { input: "5\n[40, 20, 30, 10, 30]", output: "26000" },
    ],
    "largest-divisible-subset": [
        { input: "[1,2,3]", output: "[1,2]" },
    ],
    "longest-string-chain": [
        { input: "[\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]", output: "4" },
    ],
    "number-of-longest-increasing-subsequences": [
        { input: "[1,3,5,4,7]", output: "2" },
    ],
    "count-all-valid-pickup-and-delivery-options": [
        { input: "1", output: "1" },
        { input: "2", output: "6" }
    ],
    "integer-break": [
        { input: "2", output: "1" },
        { input: "10", output: "36" }
    ],
    "maximize-score-after-n-operations": [
        { input: "[1,2]", output: "1" },
        { input: "[3,4,6,8]", output: "11" }
    ],
    "solving-questions-with-brainpower": [
        { input: "[[3,2],[4,3],[4,4],[2,5]]", output: "5" },
    ],
    "find-the-longest-valid-obstacle-course-at-each-position": [
        { input: "[1,2,3,2]", output: "[1,2,3,3]" },
    ],

    // ════════════════════════════════════════════════════════════════
    // RECURSION (Striver)
    // ════════════════════════════════════════════════════════════════
    "subset-sum-i": [
        { input: "[2,3]", output: "[0,2,3,5]" },
    ],
    "subset-sum-ii": [
        { input: "[1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" },
    ],
    "combination-sum-iii": [
        { input: "3\n7", output: "[[1,2,4]]" },
    ],
    "expression-add-operators": [
        { input: "\"123\"\n6", output: "[\"1*2*3\",\"1+2+3\"]" },
    ],
    "sort-a-stack-using-recursion": [
        { input: "[3, 2, 1]", output: "[1, 2, 3]" },
    ],
    "reverse-a-stack-using-recursion": [
        { input: "[1, 2, 3]", output: "[3, 2, 1]" },
    ],
    "generate-binary-strings": [
        { input: "3", output: "[\"000\",\"001\",\"010\",\"100\",\"101\"]" }, // no consecutive 1s constraint usually
    ],
    "check-if-there-exists-a-subsequence-with-sum-k": [
        { input: "[1,2,3]\n3", output: "true" },
    ],

    // ════════════════════════════════════════════════════════════════
    // JAVASCRIPT (30 Day Challenge)
    // ════════════════════════════════════════════════════════════════
    // These need dummy inputs for now as they are structural/functional
    "create-hello-world-function": [{ input: "[]", output: "\"Hello World\"" }],
    "counter": [{ input: "10\n[\"call\",\"call\",\"call\"]", output: "[10,11,12]" }],
    "counter-ii": [{ input: "5\n[\"increment\",\"reset\",\"decrement\"]", output: "[6,5,4]" }],
    "apply-transform-over-each-element-in-array": [{ input: "[1,2,3]\nfn = (n) => n + 1", output: "[2,3,4]" }],
    "filter-elements-from-array": [{ input: "[0,10,20,30]\nfn = function(n) { return n > 10; }", output: "[20,30]" }],
    "array-reduce-transformation": [{ input: "[1,2,3,4]\nfn = function(accum, curr) { return accum + curr; }\n0", output: "10" }],
    "function-composition": [{ input: "[x => x + 1, x => x * x, x => 2 * x]\n4", output: "65" }],
    "allow-one-function-call": [{ input: "fn = (a,b,c) => (a + b + c)\n[[1,2,3],[2,3,6]]", output: "[6,undefined]" }],
    "memoize": [{ input: "fn = function sum(a, b) { return a + b; }\nactions = [\"call\",\"call\",\"getCallCount\",\"call\",\"getCallCount\"]\nvalues = [[2,2],[2,2],[],[1,2],[]]", output: "[4,4,1,3,2]" }],
    "promise-time-limit": [{ input: "fn = async (n) => { await new Promise(res => setTimeout(res, 100)); return n * n; }\ninputs = [5]\nt = 50", output: "\"Time Limit Exceeded\"" }],
    "cache-with-time-limit": [{ input: "[\"TimeLimitedCache\", \"set\", \"get\", \"count\", \"get\"]\n[[1, 42, 100], [1], [], [1]]", output: "[null, false, 42, 1, -1]" }],
    "debounce": [{ input: "t = 50\ncalls = [{\"t\": 50, inputs: [1]}, {\"t\": 75, inputs: [2]}]", output: "[{\"t\": 125, inputs: [2]}]" }],
    "throttle": [{ input: "t = 100\ncalls = [{\"t\": 20, inputs: [1]}]", output: "[{\"t\": 20, inputs: [1]}]" }],
    "json-deep-equal": [{ input: "o1 = {\"x\":1,\"y\":2}\no2 = {\"x\":1,\"y\":2}", output: "true" }],
    "convert-object-to-json-string": [{ input: "{\"y\":1,\"x\":2}", output: "\"{\\\"y\\\":1,\\\"x\\\":2}\"" }],
    "array-of-objects-to-matrix": [{ input: "[{\"b\":1,\"a\":2},{\"b\":3,\"a\":4}]", output: "[[\"a\",\"b\"],[2,1],[4,3]]" }],
    "chunk-array": [{ input: "[1,2,3,4,5]\n1", output: "[[1],[2],[3],[4],[5]]" }],
    "flatten-deeply-nested-array": [{ input: "[1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]]\n1", output: "[1,2,3,4,5,6,7,8,[9,10,11],12,13,14,15]" }],
    "array-prototype-last": [{ input: "[null, {}, 3]", output: "3" }],
    "group-by": [{ input: "[{\"id\":\"1\"},{\"id\":\"1\"},{\"id\":\"2\"}]\nfn = function (item) { return item.id; }", output: "{\"1\":[{\"id\":\"1\"},{\"id\":\"1\"}],\"2\":[{\"id\":\"2\"}]}" }],
    "check-if-object-instance-of-class": [{ input: "func = () => checkIfInstanceOf(new Date(), Date)", output: "true" }],
    "call-function-with-custom-context": [{ input: "fn = function increment() { this.count++; return this.count; }\npoly = function(fn, ...args) { obj.fn(...args); }", output: "1" }],
    "event-emitter": [{ input: "[\"EventEmitter\", \"emit\", \"subscribe\", \"emit\"]\n[[], [\"firstEvent\"], [\"firstEvent\", \"function cb1() { return 5; }\"], [\"firstEvent\"]]", output: "[[], [], [\"subscribed\"], [\"emitted\", [5]]]" }],
    "array-wrapper": [{ input: "[[1,2],[3,4]]\n\"Add\"", output: "10" }],
    "generate-fibonacci-sequence": [{ input: "5", output: "[0,1,1,2,3]" }],
    "curry": [{ input: "fn = function sum(a, b, c) { return a + b + c; }\ninputs = [[1],[2],[3]]", output: "6" }],
    "sleep": [{ input: "100", output: "100" }],
    "promise-pool": [{ input: "functions = [() => new Promise(res => setTimeout(res, 300)), () => new Promise(res => setTimeout(res, 400))]\nn = 1", output: "[[300,400], 400]" }],

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
