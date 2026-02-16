const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const S = new mongoose.Schema({}, { strict: false });
const M = mongoose.models.DSAProblem || mongoose.model("DSAProblem", S);

const LAST_FIXES = {
    "print-1-to-n-using-recursion": [
        { input: "5", output: "1 2 3 4 5" },
        { input: "3", output: "1 2 3" }
    ],
    "print-n-to-1-using-recursion": [
        { input: "5", output: "5 4 3 2 1" },
        { input: "3", output: "3 2 1" }
    ],
    "sort-an-array-of-0s-1s-and-2s": [
        { input: "[2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
        { input: "[2,0,1]", output: "[0,1,2]" }
    ],
    "majority-element-n-2-times": [
        { input: "[3,2,3]", output: "3" },
        { input: "[2,2,1,1,1,2,2]", output: "2" }
    ],
    "rotate-matrix-by-90-degrees": [
        { input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }
    ],
    "majority-element-n-3-times": [
        { input: "[3,2,3]", output: "[3]" },
        { input: "[1]", output: "[1]" },
        { input: "[1,2]", output: "[1,2]" }
    ],
    "largest-subarray-with-0-sum": [
        { input: "[15,-2,2,-8,1,7,10,23]", output: "5" },
        { input: "[1,2,3]", output: "0" }
    ],
    "row-with-max-1s": [
        { input: "[[0,1,1,1],[0,0,1,1],[1,1,1,1],[0,0,0,0]]", output: "2" }
    ],
    "search-in-a-2d-matrix": [
        { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3", output: "true" },
        { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13", output: "false" }
    ],
    "search-in-a-2d-matrix-ii": [
        { input: "[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n5", output: "true" },
        { input: "[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n20", output: "false" }
    ],
    "sort-ll-of-0s-1s-2s": [
        { input: "[1,2,0,1,2,0,1]", output: "[0,0,1,1,1,2,2]" }
    ],
    "intersection-of-two-linked-lists": [
        { input: "[4,1,8,4,5]\n[5,6,1,8,4,5]\n8", output: "8" }
    ],
    "add-1-to-a-number-represented-by-ll": [
        { input: "[1,9,9]", output: "[2,0,0]" },
        { input: "[9,9,9]", output: "[1,0,0,0]" }
    ],
    "merge-k-sorted-lists": [
        { input: "[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
        { input: "[]", output: "[]" }
    ],
    "0-1-matrix": [
        { input: "[[0,0,0],[0,1,0],[0,0,0]]", output: "[[0,0,0],[0,1,0],[0,0,0]]" },
        { input: "[[0,0,0],[0,1,0],[1,1,1]]", output: "[[0,0,0],[0,1,0],[1,2,1]]" }
    ],
    "number-of-islands-ii": [
        { input: "3\n3\n[[0,0],[0,1],[1,2],[2,1]]", output: "[1,1,2,3]" }
    ],
    "partition-set-into-2-subsets-with-min-absolute-diff": [
        { input: "[1,6,11,5]", output: "1" }
    ],
    "range-sum-query-immutable": [
        { input: "[-2,0,3,-5,2,-1]\nsumRange 0 2\nsumRange 2 5\nsumRange 0 5", output: "null\n1\n-1\n-3" }
    ],
    "design-parking-system": [
        { input: "1 1 0\naddCar 1\naddCar 2\naddCar 3\naddCar 1", output: "null\ntrue\ntrue\nfalse\nfalse" }
    ],
    "populating-next-right-pointers-in-each-node": [
        { input: "[1,2,3,4,5,6,7]", output: "[1,#,2,3,#,4,5,6,7,#]" }
    ]
};

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    let fixed = 0;
    for (const [slug, testCases] of Object.entries(LAST_FIXES)) {
        const result = await M.updateOne({ slug }, {
            $set: { testCases, examples: testCases }
        });
        if (result.modifiedCount > 0) {
            fixed++;
            console.log(`  ✓ ${slug}`);
        } else {
            console.log(`  ✗ ${slug} (not found or already fixed)`);
        }
    }

    const remaining = await M.countDocuments({
        $or: [
            { "testCases.0.input": "Sample Input" },
            { testCases: { $size: 0 } }
        ]
    });

    console.log(`\nFixed: ${fixed}/${Object.keys(LAST_FIXES).length}`);
    console.log(`Final remaining bad: ${remaining}`);
    console.log(`Total good: ${722 - remaining}/722`);

    await mongoose.disconnect();
}

run();
