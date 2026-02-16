const axios = require("axios");

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

async function test(language, version, code, stdin) {
    console.log(`\n=== Testing ${language} ${version} ===`);
    try {
        const response = await axios.post(PISTON_URL, {
            language,
            version,
            files: [{ content: code }],
            stdin: stdin || "",
            run_timeout: 5000,
            compile_timeout: 10000
        });
        const d = response.data;
        console.log("Compile:", d.compile?.output || "(none)");
        console.log("Run stdout:", d.run?.stdout);
        console.log("Run stderr:", d.run?.stderr);
        console.log("Run code:", d.run?.code);
        console.log("Run signal:", d.run?.signal);
    } catch (e) {
        console.error("Error:", e.response?.data || e.message);
    }
}

async function main() {
    // Python
    await test("python", "3.10.0",
        `class Solution:
    def twoSum(self, nums, target):
        prevMap = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i

sol = Solution()
print(sol.twoSum([2,7,11,15], 9))`,
        ""
    );

    // JavaScript
    await test("javascript", "18.15.0",
        `class Solution {
    twoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
            const diff = target - nums[i];
            if (map.has(diff)) return [map.get(diff), i];
            map.set(nums[i], i);
        }
    }
}
const sol = new Solution();
console.log(JSON.stringify(sol.twoSum([2,7,11,15], 9)));`,
        ""
    );

    // C++
    await test("c++", "10.2.0",
        `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> m;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (m.count(diff)) return {m[diff], i};
            m[nums[i]] = i;
        }
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {2,7,11,15};
    auto res = sol.twoSum(nums, 9);
    cout << "[" << res[0] << "," << res[1] << "]" << endl;
    return 0;
}`,
        ""
    );

    // Java
    await test("java", "15.0.2",
        `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) return new int[]{map.get(diff), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] result = twoSum(new int[]{2,7,11,15}, 9);
        System.out.println("[" + result[0] + "," + result[1] + "]");
    }
}`,
        ""
    );

    // Test error with line number
    console.log("\n=== Testing Python ERROR reporting ===");
    await test("python", "3.10.0",
        `x = 5
y = 0
print(x / y)`,
        ""
    );

    console.log("\n=== Testing C++ COMPILE ERROR ===");
    await test("c++", "10.2.0",
        `#include <iostream>
int main() {
    std::cout << "hello" << std::endl
    return 0;
}`,
        ""
    );
}

main();
