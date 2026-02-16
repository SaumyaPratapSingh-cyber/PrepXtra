// Count and categorize ALL broken problems precisely
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({}, { strict: false, collection: 'dsaproblems' });
const M = mongoose.models.DSAProblem || mongoose.model('DSAProblem', ProblemSchema);

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);

    const problems = await M.find({}).lean();

    const broken = [];
    const good = [];

    for (const p of problems) {
        const tcs = p.testCases || [];
        const slug = p.slug;
        const title = p.title;
        const fn = p.functionName || '';

        if (tcs.length === 0) {
            broken.push({ slug, title, fn, reason: 'NO_TEST_CASES', category: p.category });
            continue;
        }

        const firstIn = (tcs[0]?.input || '').trim();
        const firstOut = (tcs[0]?.output || '').trim();

        // PATTERN 1: Generic array placeholder (input === output is the dead giveaway)
        const isInputEqualsOutput = firstIn === firstOut && firstIn.length > 2;

        // PATTERN 2: Known generic placeholders
        const genericPatterns = [
            { in: '[1,2,3,4,5]', out: '[1,2,3,4,5]' },
            { in: '[5,3,1,2,4]', out: '[1,2,3,4,5]' },
            { in: '[1,2,3]', out: '[1,2,3]' },
            { in: '"hello"', out: '"hello"' },
            { in: '"world"', out: '"world"' },
            { in: '5', out: '5' },
            { in: '[[1,2],[3,4]]', out: '[[1,2],[3,4]]' },
            { in: '[1,null,2,3]', out: '[1,null,2,3]' },
        ];

        const isGeneric = genericPatterns.some(gp =>
            firstIn === gp.in && firstOut === gp.out
        );

        // PATTERN 3: Input equals output (likely just echoing input)
        // BUT exclude legitimate cases like sort problems
        const sortProblems = ['sort-an-array', 'sort-colors', 'sort-list', 'insertion-sort-list',
            'merge-sort', 'bubble-sort', 'selection-sort', 'quick-sort', 'recursive-bubble-sort',
            'recursive-insertion-sort', 'count-sort', 'plus-one'];

        if (!sortProblems.includes(slug) && isInputEqualsOutput) {
            broken.push({ slug, title, fn, reason: 'INPUT_EQUALS_OUTPUT', firstIn, firstOut, category: p.category });
            continue;
        }

        if (!sortProblems.includes(slug) && isGeneric) {
            broken.push({ slug, title, fn, reason: 'GENERIC_PLACEHOLDER', firstIn, firstOut, category: p.category });
            continue;
        }

        // PATTERN 4: Test cases where input is '"hello"' for non-string problems
        if (firstIn === '"hello"' && !['reverse-string', 'valid-palindrome', 'longest-palindromic-substring',
            'valid-anagram', 'group-anagrams', 'longest-substring-without-repeating-characters'].includes(slug)) {
            broken.push({ slug, title, fn, reason: 'HELLO_PLACEHOLDER', firstIn, firstOut, category: p.category });
            continue;
        }

        // PATTERN 5: Second test case also generic
        if (tcs.length >= 2) {
            const secondIn = (tcs[1]?.input || '').trim();
            const secondOut = (tcs[1]?.output || '').trim();
            if (secondIn === '[5,3,1,2,4]' && secondOut === '[1,2,3,4,5]' && !sortProblems.includes(slug)) {
                broken.push({ slug, title, fn, reason: 'SORT_PLACEHOLDER', firstIn, firstOut, category: p.category });
                continue;
            }
        }

        good.push({ slug, title, fn, firstIn, firstOut, category: p.category });
    }

    // Group broken by category
    const byCategory = {};
    for (const b of broken) {
        const cat = b.category || 'uncategorized';
        if (!byCategory[cat]) byCategory[cat] = [];
        byCategory[cat].push(b);
    }

    console.log(`\n========================================`);
    console.log(`TOTAL PROBLEMS: ${problems.length}`);
    console.log(`BROKEN: ${broken.length}`);
    console.log(`GOOD: ${good.length}`);
    console.log(`========================================\n`);

    console.log(`=== BROKEN BY CATEGORY ===`);
    for (const [cat, probs] of Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length)) {
        console.log(`\n[${cat}] — ${probs.length} broken`);
        for (const p of probs) {
            console.log(`  ${p.slug} (${p.reason})`);
        }
    }

    // Also dump all broken slugs as a JSON array for the repair script
    const brokenSlugs = broken.map(b => b.slug);
    require('fs').writeFileSync('scripts/broken-slugs.json', JSON.stringify(brokenSlugs, null, 2));
    console.log(`\nWrote ${brokenSlugs.length} broken slugs to scripts/broken-slugs.json`);

    // Also dump full broken data for the repair script
    require('fs').writeFileSync('scripts/broken-full.json', JSON.stringify(broken, null, 2));

    await mongoose.disconnect();
}

run().catch(console.error);
