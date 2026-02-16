// Deep audit: fetch problems and analyze test case quality
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({}, { strict: false, collection: 'dsaproblems' });
const M = mongoose.models.DSAProblem || mongoose.model('DSAProblem', ProblemSchema);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const problems = await M.find({}).lean();
    console.log(`Total problems: ${problems.length}\n`);

    const issues = {
        genericTestCases: [],
        singleTestCase: [],
        tooFewTestCases: [],
    };

    const inputPatterns = {};

    for (const p of problems) {
        const tcs = p.testCases || [];
        const slug = p.slug;
        const title = p.title;

        if (tcs.length === 0) {
            issues.genericTestCases.push({ slug, title, reason: 'No test cases' });
            continue;
        }

        if (tcs.length === 1) {
            issues.singleTestCase.push({ slug, title });
        } else if (tcs.length === 2) {
            issues.tooFewTestCases.push({ slug, title });
        }

        const firstInput = (tcs[0]?.input || '').trim();

        if (!inputPatterns[firstInput]) inputPatterns[firstInput] = [];
        inputPatterns[firstInput].push(slug);

        const isGenericArray = /^\[1,2,3(,4,5)?\]$/.test(firstInput) ||
            firstInput === '[1,2,3,4,5]' ||
            firstInput === '"hello"' ||
            firstInput === '5';

        if (isGenericArray) {
            issues.genericTestCases.push({ slug, title, fn: p.functionName, input: firstInput, output: (tcs[0]?.output || '').trim() });
        }
    }

    // Find duplicated inputs
    const duplicatedInputs = Object.entries(inputPatterns)
        .filter(([_, slugs]) => slugs.length > 5)
        .sort((a, b) => b[1].length - a[1].length);

    console.log("=== MOST DUPLICATED TEST CASE INPUTS ===");
    console.log("(Same input used across many different problems = likely auto-generated)\n");
    for (const [input, slugs] of duplicatedInputs.slice(0, 20)) {
        console.log(`Input: "${input.substring(0, 80)}" → used by ${slugs.length} problems`);
        console.log(`  Examples: ${slugs.slice(0, 6).join(', ')}\n`);
    }

    console.log(`\n=== SUMMARY ===`);
    console.log(`Generic/suspicious test cases: ${issues.genericTestCases.length}`);
    console.log(`Single test case only: ${issues.singleTestCase.length}`);
    console.log(`Only 2 test cases: ${issues.tooFewTestCases.length}`);

    // Print ALL generic problems for repair
    console.log(`\n=== ALL GENERIC TEST CASE PROBLEMS ===`);
    for (const p of issues.genericTestCases) {
        console.log(`  ${p.slug} | fn: ${p.fn || '?'} | input: "${p.input}" → output: "${p.output}"`);
    }

    // Sample 30 random problems to show quality
    console.log(`\n=== RANDOM SAMPLE (30 problems) ===`);
    const sample = problems.sort(() => Math.random() - 0.5).slice(0, 30);
    for (const p of sample) {
        const tcs = p.testCases || [];
        console.log(`\n[${p.slug}] "${p.title}"`);
        console.log(`  Function: ${p.functionName} | TCs: ${tcs.length}`);
        for (let i = 0; i < Math.min(tcs.length, 2); i++) {
            console.log(`  TC${i + 1}: in="${(tcs[i].input || '').substring(0, 80)}" → out="${(tcs[i].output || '').substring(0, 80)}"`);
        }
    }

    await mongoose.disconnect();
}

run().catch(console.error);
