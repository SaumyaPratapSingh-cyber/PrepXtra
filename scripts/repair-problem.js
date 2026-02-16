const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const S = new Schema({}, { strict: false });
const M = models.DSAProblem || model('DSAProblem', S);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const update = {
        description: "Given a multi-dimensional array of integers, return a generator object which yields integers in the same order as they appear in the array.\n\nA multi-dimensional array is an array whose elements are either integers or other multi-dimensional arrays.",
        examples: [
            {
                input: "[1,[2,3],4]",
                output: "[1,2,3,4]",
                explanation: "The generator yields 1, 2, 3, and 4 in order."
            },
            {
                input: "[[[6]],[1,3],[]]",
                output: "[6,1,3]",
                explanation: "Nested arrays are flattened in the resulting yield sequence."
            }
        ],
        testCases: [
            { input: "[1,[2,3],4]", output: "[1,2,3,4]" },
            { input: "[[[6]],[1,3],[]]", output: "[6,1,3]" },
            { input: "[]", output: "[]" }
        ],
        starterCode: {
            javascript: "/**\n * @param {Array}\n * @return {Generator}\n */\nvar nestedArrayGenerator = function* (arr) {\n    for (const item of arr) {\n        if (Array.isArray(item)) {\n            yield* nestedArrayGenerator(item);\n        } else {\n            yield item;\n        }\n    }\n};",
            python: "class Solution:\n    def nestedArrayGenerator(self, arr: List[any]) -> Iterator[int]:\n        for item in arr:\n            if isinstance(item, list):\n                yield from self.nestedArrayGenerator(item)\n            else:\n                yield item",
            java: "import java.util.*;\n\nclass Solution {\n    public List<Integer> nestedArrayGenerator(Object[] arr) {\n        List<Integer> result = new ArrayList<>();\n        flatten(arr, result);\n        return result;\n    }\n    \n    private void flatten(Object[] arr, List<Integer> result) {\n        for (Object item : arr) {\n            if (item instanceof Object[]) {\n                flatten((Object[]) item, result);\n            } else if (item instanceof Integer) {\n                result.add((Integer) item);\n            }\n        }\n    }\n}",
            cpp: "#include <vector>\n#include <any>\n#include <iostream>\n\nclass Solution {\npublic:\n    std::vector<int> nestedArrayGenerator(std::vector<std::any> arr) {\n        std::vector<int> result;\n        flatten(arr, result);\n        return result;\n    }\n\nprivate:\n    void flatten(const std::vector<std::any>& arr, std::vector<int>& result) {\n        for (const auto& item : arr) {\n            if (item.type() == typeid(std::vector<std::any>)) {\n                flatten(std::any_cast<std::vector<std::any>>(item), result);\n            } else if (item.type() == typeid(int)) {\n                result.add(std::any_cast<int>(item));\n            }\n        }\n    }\n};"
        }
    };

    await M.updateOne({ slug: 'nested-array-generator' }, { $set: update });
    console.log('Successfully updated Nested Array Generator');
    await mongoose.disconnect();
}

run().catch(console.error);
