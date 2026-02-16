const d = require('./broken-full.json');
const cats = {};
d.forEach(p => {
    const c = p.category || 'unknown';
    if (!cats[c]) cats[c] = [];
    cats[c].push(p.slug);
});

console.log(`Total remaining broken: ${d.length}`);
Object.entries(cats)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([c, slugs]) => {
        console.log(`\n[${c}]: ${slugs.length} problems`);
        // Print first 5 slugs
        console.log(`  ${slugs.slice(0, 5).join(', ')}${slugs.length > 5 ? '...' : ''}`);
        // If small category, print all
        if (slugs.length <= 5) console.log(`  (All: ${slugs.join(', ')})`);
    });
