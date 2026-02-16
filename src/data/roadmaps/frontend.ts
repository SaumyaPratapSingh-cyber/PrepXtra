
import { RoadmapTrack } from './types';

export const frontendRoadmap: RoadmapTrack = {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Step by step guide to becoming a modern Frontend Developer in 2025',
    category: 'role-based',
    icon: '🎨',
    accentColor: '#f59e0b',
    rootNodeId: 'internet',
    nodes: {
        // ─── LEVEL 0: Foundation ───
        'internet': {
            id: 'internet',
            label: 'Internet',
            description: 'The global system of interconnected computer networks that use the Internet protocol suite (TCP/IP) to link devices worldwide.',
            children: ['html', 'css', 'javascript'],
            resources: [
                { type: 'article', title: 'MDN - How the Web Works', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works', isFree: true },
                { type: 'video', title: 'How Does the Internet Work? - Stanford', url: 'https://www.youtube.com/watch?v=7_LPdttKXPc', isFree: true },
                { type: 'article', title: 'Cloudflare - What is the Internet?', url: 'https://www.cloudflare.com/learning/network-layer/what-is-the-internet/', isFree: true },
                { type: 'article', title: 'DNS Explained Simply', url: 'https://dns-explained.com/', isFree: true },
                { type: 'video', title: 'The OSI Model Explained', url: 'https://www.youtube.com/watch?v=vv4y_uOneC0', isFree: true }
            ],
            content: {
                overview: 'The Internet is a vast, decentralized "network of networks" that connects billions of devices worldwide. It operates on a standard suite of protocols called TCP/IP, which ensures that data sent from one device reaches the correct destination intact. \n\nAt its core, the internet uses a client-server model: your browser (the client) makes requests for resources (like a website), and a remote computer (the server) provides them. This communication is facilitated by DNS, which acts as the internet\'s phonebook, translating human-readable domain names into numerical IP addresses.',
                keyConcepts: [
                    'Network Protocols: TCP, UDP, IP, ICMP',
                    'DNS Resolution: Recursors, Root, TLD, and Authoritative Nameservers',
                    'HTTP/HTTPS: Requests, Responses, Status Codes, and Headers',
                    'IP Addressing: IPv4 vs IPv6, Public vs Private IPs',
                    'The OSI Model: Physical to Application Layers',
                    'Client-Server Architecture: Frontend vs Backend interaction',
                    'CDN and Latency: Optimizing packet delivery'
                ],
                practiceQuestions: [
                    { question: 'What is the primary difference between TCP and UDP?', hint: 'TCP is reliable/ordered, UDP is fast/lossy.', difficulty: 'medium' },
                    { question: 'What happens during a DNS lookup?', hint: 'Browser checks cache -> Resolver -> Root -> TLD -> Authoritative.', difficulty: 'hard' },
                    { question: 'What does an HTTP 404 status code mean?', hint: 'The requested resource was not found.', difficulty: 'easy' },
                    { question: 'What is the purpose of the TLS handshake in HTTPS?', hint: 'To establish a secure, encrypted connection.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always use TLS (HTTPS) to protect data integrity and user privacy.',
                    'Keep DNS TTLs (Time to Live) optimized for faster propagation vs caching.',
                    'Minimize HTTP requests per page to improve load times.',
                    'Use path-based routing for better SEO and deep linking.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Foundations of Networking', description: 'Packets and Protocols.', tasks: ['Read MDN: How the Internet works', 'Watch "How packets travel across the web"', 'Diagram the TCP 3-way handshake'] },
                { day: 2, title: 'The Addressable Web', description: 'DNS and IP.', tasks: ['Perform a `dig` or `nslookup` in your terminal', 'Understand the difference between A, AAAA, CNAME, and MX records', 'Map out the DNS resolution path'] },
                { day: 3, title: 'Browsers and HTTP', description: 'The Client-Server Cycle.', tasks: ['Explore HTTP headers in Chrome DevTools', 'Understand GET vs POST parameters', 'Learn the browser rendering lifecycle: Parse -> Layout -> Paint'] },
            ]
        },

        // ─── LEVEL 1: Core Technologies ───
        'html': {
            id: 'html',
            label: 'HTML',
            description: 'Learning the standard language for building the structure of every web page on the internet.',
            parentId: 'internet',
            children: ['seo', 'accessibility', 'html-best-practices'],
            resources: [
                { type: 'documentation', title: 'MDN - HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML', isFree: true },
                { type: 'article', title: 'HTML Living Standard (WHATWG)', url: 'https://html.spec.whatwg.org/multipage/', isFree: true },
                { type: 'video', title: 'HTML Full Course for Beginners', url: 'https://www.youtube.com/watch?v=qz0aGYMCzl0', isFree: true },
                { type: 'article', title: 'A Complete Guide to Semantic HTML', url: 'https://web.dev/learn/html/semantic-html/', isFree: true }
            ],
            content: {
                overview: 'HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page\'s appearance/presentation (CSS) or functionality/behavior (JavaScript). \n\nModern HTML focuses on Semantic elements: using tags that actually describe the type of content they hold (like `<main>`, `<article>`, `<section>`). This is critical for accessibility (helping screen readers) and SEO (helping search engine crawlers understand your hierarchy).',
                keyConcepts: [
                    'The Document Object Model (DOM)',
                    'Semantic Elements: header, nav, main, section, article, footer, aside',
                    'Forms and Validations: input types, labels, fieldsets, required, pattern',
                    'Media Elements: img, picture, audio, video, source',
                    'Attributes: id, class, data-*, aria-*, title, alt',
                    'SEO Basics: Title tags, meta descriptions, canonical links',
                    'Web Accessibility (WCAG): Semantic tags, alt text, focus management'
                ],
                codeExamples: [
                    {
                        title: 'Modern Accessible Structure',
                        language: 'html',
                        code: '<article>\n  <header>\n    <h1>The Future of Web Dev</h1>\n    <time datetime="2025-01-01">Jan 1, 2025</time>\n  </header>\n  <p>HTML is evolving with better semantic tags.</p>\n  <footer>\n    <a href="/author" aria-label="View author profile">Author Name</a>\n  </footer>\n</article>'
                    },
                    {
                        title: 'Accessible Forms',
                        language: 'html',
                        code: '<form action="/submit" method="POST">\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" required minlength="4">\n  \n  <label for="email">Email Address:</label>\n  <input type="email" id="email" name="email" required>\n  \n  <button type="submit">Join PrepXtra</button>\n</form>'
                    }
                ],
                practiceQuestions: [
                    { question: 'Why is `alt` text mandatory for images?', hint: 'Think about screen readers.', difficulty: 'easy' },
                    { question: 'Difference between `<div>` and `<article>`?', hint: 'Generic container vs Independent self-contained content.', difficulty: 'medium' },
                    { question: 'What is the purpose of the `<!DOCTYPE html>` declaration?', hint: 'It tells the browser which HTML version to use.', difficulty: 'easy' },
                    { question: 'How do you create an input for phone numbers with a specific format?', hint: 'Use type="tel" and the pattern attribute.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use descriptive ALT tags for every image.',
                    'Keep heading levels (H1-H6) in a logical hierarchy.',
                    'Use semantic tags instead of generic `<div>` for structural landmarks.',
                    'Ensure every form input has a corresponding `<label>` linked via `id` and `for`.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'HTML Basics', description: 'Tags and Structure.', tasks: ['Learn the skeleton: html, head, body tags', 'Learn text formatting elements: h1-h6, p, blockquote', 'Understand block vs inline elements'] },
                { day: 2, title: 'Semantic HTML & SEO', description: 'Meaningful Markup.', tasks: ['Replace generic divs with semantic tags', 'Set up SEO meta tags in the <head>', 'Practice accessible hierarchy'] },
                { day: 3, title: 'Advanced Elements', description: 'Forms and Media.', tasks: ['Build a complex form with various input types', 'Use <picture> and <video> with multiple sources', 'Analyze accessibility using Lighthouse'] },
            ]
        },

        'css': {
            id: 'css',
            label: 'CSS',
            description: 'Mastering Cascading Style Sheets to control the layout, colors, fonts, and overall visual presentation of web pages.',
            parentId: 'internet',
            children: ['css-architecture', 'css-preprocessors', 'css-frameworks'],
            resources: [
                { type: 'documentation', title: 'MDN - CSS First Steps', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps', isFree: true },
                { type: 'article', title: 'A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', isFree: true },
                { type: 'article', title: 'A Complete Guide to CSS Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', isFree: true },
                { type: 'video', title: 'CSS Crash Course for Absolute Beginners', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI', isFree: true },
                { type: 'course', title: 'CSS - The Complete Guide (Udemy)', url: 'https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/', isFree: false }
            ],
            content: {
                overview: 'CSS (Cascading Style Sheets) is the language used to style an HTML document. It describes how HTML elements should be displayed on screen, paper, or in other media. While HTML provides the structure, CSS provides the visual layer—defining everything from simple colors and fonts to complex 3D transforms and responsive grid systems. \n\nModern CSS has shifted towards layout modules like Flexbox and Grid, which allow for dynamic, responsive designs without the hacks of the past. It also supports variables (Custom Properties) and advanced selectors that make styling large-scale applications more maintainable.',
                keyConcepts: [
                    'The Cascade and Specificity: How browsers decide which styles to apply',
                    'The Box Model: Margin, Border, Padding, and Content sizing',
                    'Flexbox: One-dimensional layouts (rows or columns)',
                    'CSS Grid: Two-dimensional layouts (rows and columns)',
                    'Responsive Design: Media queries, fluid units (rem, em, vh, vw)',
                    'CSS Variables: Reusable tokens for themes and consistency',
                    'Positioning: Static, Relative, Absolute, Fixed, and Sticky',
                    'Transforms and Animations: Bringing life to the UI'
                ],
                codeExamples: [
                    {
                        title: 'Modern Flexbox Center',
                        language: 'css',
                        code: '.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  gap: 1.5rem;\n}'
                    },
                    {
                        title: 'Responsive Grid Layout',
                        language: 'css',
                        code: '.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n\n@media (max-width: 600px) {\n  .grid-container {\n    grid-template-columns: 1fr;\n  }\n}'
                    }
                ],
                practiceQuestions: [
                    { question: 'What is the difference between `padding` and `margin`?', hint: 'Internal vs External spacing.', difficulty: 'easy' },
                    { question: 'How does CSS Specificity work?', hint: 'Inline > ID > Class > Element.', difficulty: 'medium' },
                    { question: 'When would you use CSS Grid over Flexbox?', hint: 'Complex 2D layouts vs Simple 1D alignment.', difficulty: 'medium' },
                    { question: 'Explain the difference between `position: absolute` and `position: fixed`.', hint: 'RelativeTo Parent vs RelativeTo Viewport.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use relative units like `rem` and `em` for better accessibility and scaling.',
                    'Keep your CSS organized using methodologies like BEM (Block Element Modifier).',
                    'Avoid using `!important` unless absolutely necessary (destructive to the cascade).',
                    'Optimize performance by using `transform` and `opacity` for animations.',
                    'Design mobile-first to ensure a solid foundation for all devices.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'CSS Foundations', description: 'Selectors and Box Model.', tasks: ['Understand the Cascade and Specificity rules', 'Master the Box Model: box-sizing, margin, padding', 'Practice basic selectors and pseudo-classes'] },
                { day: 2, title: 'Modern Layouts', description: 'Flexbox and Grid.', tasks: ['Build a navigation bar with Flexbox', 'Create a responsive image gallery using CSS Grid', 'Understand gaps and alignment properties'] },
                { day: 3, title: 'Responsive Design', description: 'Fluidity and Media.', tasks: ['Implement media queries for mobile/desktop', 'Learn fluid typography with clamp()', 'Practice using CSS variables for theming'] },
            ]
        },

        'javascript': {
            id: 'javascript',
            label: 'JavaScript',
            description: 'Mastering the programming language that powers the interactive and dynamic behavior of the entire web.',
            parentId: 'internet',
            children: ['dom-manipulation', 'fetch-api', 'es6-modules'],
            resources: [
                { type: 'documentation', title: 'MDN - JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', isFree: true },
                { type: 'article', title: 'Eloquent JavaScript (Book)', url: 'https://eloquentjavascript.net/', isFree: true },
                { type: 'article', title: 'You Don\'t Know JS (Book Series)', url: 'https://github.com/getify/You-Dont-Know-JS', isFree: true },
                { type: 'video', title: 'Modern JavaScript Tutorial 2025', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', isFree: true },
                { type: 'course', title: 'The Complete JavaScript Course (Udemy)', url: 'https://www.udemy.com/course/the-complete-javascript-course/', isFree: false }
            ],
            content: {
                overview: 'JavaScript is a high-level, multi-paradigm programming language that is the foundation of modern web development. It allows for complex logic, asynchronous operations, and dynamic DOM manipulation directly in the browser. \n\nLearning JS involves moving from basic syntax (loops, conditionals) to advanced concepts like closures, prototypes, and the Event Loop. Modern JavaScript (ES6+) introduced classes, modules, and a wealth of syntax improvements that make the language more powerful and readable than ever before.',
                keyConcepts: [
                    'Data Types and Variables: let, const, primitive vs reference types',
                    'Functions: Declarations, Expressions, Arrow functions, and IIFEs',
                    'Scope and Closures: Global, Local, and Block scope',
                    'Asynchronous JS: Promises, Async/Await, and Callbacks',
                    'The DOM: Selecting, Modifying, and Appending elements',
                    'Events: Listeners, Bubbling, and Delegation',
                    'Modern ES6+: Destructuring, Spread/Rest, Modules',
                    'Execution Context and the Event Loop'
                ],
                codeExamples: [
                    {
                        title: 'Modern Async/Await Fetch',
                        language: 'javascript',
                        code: 'const fetchData = async (url) => {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error("Fetch failed");\n    const data = await response.json();\n    console.log("Success:", data);\n  } catch (error) {\n    console.error("Error:", error.message);\n  }\n};'
                    },
                    {
                        title: 'Array Methods Power',
                        language: 'javascript',
                        code: 'const users = [{ id: 1, active: true }, { id: 2, active: false }];\nconst activeUserIds = users\n  .filter(user => user.active)\n  .map(user => user.id);\nconsole.log(activeUserIds); // [1]'
                    }
                ],
                practiceQuestions: [
                    { question: 'What is the difference between `==` and `===`?', hint: 'Value vs Value + Type comparison.', difficulty: 'easy' },
                    { question: 'What is a "Closure" in JavaScript?', hint: 'A function that remembers its outer variables.', difficulty: 'hard' },
                    { question: 'Explicitly explain the Event Loop.', hint: 'Call stack, Web APIs, Task Queue, Microtask Queue.', difficulty: 'hard' },
                    { question: 'Difference between `let` and `var`?', hint: 'Block scope vs Function scope + hoisting.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use `const` by default; use `let` only if re-assignment is required.',
                    'Keep the global scope clean—use modules or closures.',
                    'Use Arrow functions for callbacks to maintain lexical `this` binding.',
                    'Prioritize cleaner ES6+ syntax (e.g., Template Literals over string concatenation).',
                    'Always handle errors in asynchronous code using try/catch.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Logic & Syntax', description: 'Core programming concepts.', tasks: ['Master data types and equality', 'Understand control flow: if/else, switch, loops', 'Practice creating and calling functions'] },
                { day: 2, title: 'The DOM & Events', description: 'Interactive Web.', tasks: ['Build a dynamic UI element (counter, modal)', 'Practice Event Delegation for performance', 'Explore Browser APIs like localStorage'] },
                { day: 3, title: 'Asynchronous JS', description: 'Handling time.', tasks: ['Learn the Promise lifecycle (pending, fulfilled, rejected)', 'Convert callback-based code to Async/Await', 'Practice fetching data from a public API'] },
            ]
        },

        // ─── LEVEL 2: HTML Sub-topics ───
        'seo': {
            id: 'seo',
            label: 'SEO Basics',
            description: 'Mastering the art and science of Search Engine Optimization (SEO) to ensure high visibility, organic traffic, and superior search rankings for modern web applications.',
            parentId: 'html',
            resources: [
                { type: 'article', title: 'Google Search Central - SEO Starter Guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', isFree: true },
                { type: 'video', title: 'Ahrefs - SEO Course for Beginners', url: 'https://www.youtube.com/watch?v=xsVTqzratPs', isFree: true },
                { type: 'documentation', title: 'Schema.org - Structured Data Documentation', url: 'https://schema.org/docs/gs.html', isFree: true },
                { type: 'article', title: 'Moz - The Beginner\'s Guide to SEO', url: 'https://moz.com/beginners-guide-to-seo', isFree: true },
                { type: 'video', title: 'Google Search Console Training', url: 'https://www.youtube.com/playlist?list=PLKoqnv2vTMUOnQn-lNDfTumbmS-iz3S6o', isFree: true }
            ],
            content: {
                overview: `Search Engine Optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic (known as "natural" or "organic" results) rather than direct traffic or paid traffic. Organic traffic can originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.

As a frontend developer, your role in SEO is fundamental. While content is king, the way that content is delivered is the castle. Google and other search engines use "bots" (also known as "spiders" or "crawlers") to navigate the web. These bots read your HTML code to understand what the page is about. If your code is messy, slow, or inaccessible, the bots will struggle to index your content, and your ranking will suffer.

### 1. The Three Pillars of SEO

Modern SEO is generally divided into three categories:

#### Technical SEO
This is where the frontend developer shines. Technical SEO refers to website and server optimizations that help search engine crawlers spider and index your site more effectively. 
- **Core Web Vitals**: Google uses LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift) as ranking factors.
- **Mobile Friendliness**: Since 2019, Google has used mobile-first indexing. Your site must be responsive and performant on mobile devices.
- **HTTPS**: Security is a ranking factor. Ensure your site uses SSL/TLS.
- **Sitemaps (XML)**: A list of all your pages that tells bots where to go.
- **Robots.txt**: A file that tells bots which pages NOT to visit.

#### On-Page SEO
On-page SEO is the practice of optimizing individual web pages in order to rank higher and earn more relevant traffic.
- **Titles and Meta Descriptions**: The first thing a user sees in search results.
- **Header Tags (H1-H6)**: Used to define the hierarchy of information.
- **URL Structure**: Human-readable, keyword-rich URLs (e.g., /blog/seo-basics vs /blog?id=123).
- **Image Optimization**: Using proper alt text and descriptive filenames.
- **Internal Linking**: Helping bots discover other pages on your site.

#### Off-Page SEO
Off-page SEO involves actions taken outside of your own website to impact your rankings.
- **Backlinks**: When other high-authority sites link to you, it tells Google your content is trustworthy.
- **Social Signals**: Engagement from social media platforms.

### 2. Semantic HTML and SEO

Search engines don't "see" your website the way humans do; they read the code. Using Semantic HTML is the single most important thing you can do for SEO as a developer.
- **<header> and <nav>**: Help bots identify site navigation.
- **<main>**: Tells bots where the primary content begins.
- **<article>**: Marks independent, self-contained content.
- **<footer>**: Contains meta information about the page.

Using <div> for everything makes it impossible for a bot to distinguish between a menu link and a blog post title.

### 3. Structured Data (Schema.org)

Structured data is a standardized format for providing information about a page and classifying the page content. For example, on a recipe page, you can use structured data to tell Google the cooking time, the ingredients, and the calorie count.
This often results in "Rich Snippets" in search results—those gold stars, images, and price ranges you see next to search entries. Implementing JSON-LD (JavaScript Object Notation for Linked Data) is the recommended way to add structured data to your pages.

### 4. Open Graph and Social SEO

While not strictly for Google rankings, Open Graph (OG) tags are essential for how your content looks when shared on social media (Facebook, LinkedIn, Twitter/X).
- **og:title**: The title that appears in the share card.
- **og:description**: A brief summary of the content.
- **og:image**: A high-quality image that grabs attention.
- **og:url**: The canonical URL of the page.

### 5. Indexing and Crawling: The Lifecycle

1. **Crawling**: Bots discover your URL via sitemaps or links from other sites.
2. **Processing**: Bots render the HTML and JavaScript to see the content.
3. **Indexing**: Bots store information about the page in a massive database.
4. **Ranking**: When a user searches, Google looks at its index and uses algorithms (like PageRank) to decide which order to show the results.

### 6. Common Pitfalls for Developers

- **JavaScript Reliance**: If your content is only rendered via client-side JS, bots might not see it correctly. Use Server-Side Rendering (SSR) or Static Site Generation (SSG) for SEO-critical pages.
- **Slow Load Times**: Every millisecond matters. Large unoptimized images or heavy JS bundles will kill your ranking.
- **Hidden Content**: Using 'display: none' to hide keywords is considered "Black Hat SEO" and can get your site penalized.
- **Broken Links**: 404 errors prevent bots from navigating your site.

### 7. Tools for the Modern Developer

- **Google Search Console**: Monitor how Google sees your site.
- **Lighthouse**: A Chrome DevTool that audits your site for SEO, Performance, and Accessibility.
- **Schema Markup Validator**: Test your JSON-LD implementations.
- **Ahrefs/Semrush**: Professional tools for keyword research and backlink analysis.

SEO is not a one-time task; it is a continuous process of refinement. By building performant, accessible, and semantically rich applications, you lay the foundation for organic growth and long-term success.`,
                keyConcepts: [
                    'Crawling, Indexing, and Ranking',
                    'Technical SEO: Core Web Vitals (LCP, FID, CLS)',
                    'On-Page SEO: Metadata, H-tags, and URL structure',
                    'Structured Data: JSON-LD and Schema.org',
                    'Mobile-First Indexing and Responsive Design',
                    'Open Graph (OG) and Twitter Card tags',
                    'Sitemaps (XML) and Robots.txt management',
                    'Canonical Tags and Duplicate Content prevention',
                    'Page Speed and Image Optimization strategies',
                    'Internal and External Linking hierarchies'
                ],
                practiceQuestions: [
                    { question: 'What are the three "Core Web Vitals" used by Google as ranking factors?', hint: 'LCP, FID, and CLS.', difficulty: 'medium' },
                    { question: 'Explain the purpose of a "Canonical Tag".', hint: 'To prevent duplicate content issues by specifying the master version of a page.', difficulty: 'hard' },
                    { question: 'What is the recommended format for implementing Structured Data?', hint: 'JSON-LD.', difficulty: 'easy' },
                    { question: 'Contrast "Sitemap.xml" and "Robots.txt".', hint: 'The folder map vs the permission slip for bots.', difficulty: 'medium' },
                    { question: 'Why is Mobile-First Indexing important?', hint: 'Google crawls the mobile version of your site primarily.', difficulty: 'easy' },
                    { question: 'What is a "Rich Snippet"?', hint: 'Enhanced search results with images, ratings, or prices using Schema.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use Semantic HTML to provide meaning to your structure.',
                    'Keep your Title tags under 60 characters and Meta Descriptions under 160.',
                    'Prioritize LCP: ensure the largest element above the fold loads instantly.',
                    'Use descriptive alt text for images to help bots and screen readers.',
                    'Implement regular SEO audits using Lighthouse or Search Console.',
                    'Ensure all pages are served over HTTPS for security and ranking.',
                    'Avoid deep nesting of content; keep important pages 1-3 clicks from home.',
                    'Use self-referencing canonical tags on all unique pages.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'SEO Fundamentals & Strategy', description: 'Understanding the ecosystem.', tasks: ['Read the Google SEO Starter Guide', 'Audit your current site using Lighthouse', 'Implement basic meta tags: title and description'] },
                { day: 2, title: 'Technical SEO & Performance', description: 'Optimizing for speed and bots.', tasks: ['Check and optimize Core Web Vitals', 'Create and submit a sitemap.xml', 'Configure robots.txt to manage bot access'] },
                { day: 3, title: 'Structured Data & Social', description: 'Enhancing search results.', tasks: ['Add JSON-LD Schema for an article or product', 'Implement Open Graph tags for better social scaling', 'Verify markup using the Schema Validator tool'] },
            ]
        },

        'accessibility': {
            id: 'accessibility',
            label: 'Web Accessibility (a11y)',
            description: 'The practice of making websites usable by everyone, including people with physical, sensory, cognitive, and situational disabilities. Mastering a11y is an ethical, legal, and professional imperative.',
            parentId: 'html',
            resources: [
                { type: 'documentation', title: 'W3C - Web Accessibility Initiative (WAI)', url: 'https://www.w3.org/WAI/', isFree: true },
                { type: 'article', title: 'A11y Project - Checklist', url: 'https://www.a11yproject.com/checklist/', isFree: true },
                { type: 'video', title: 'A11y Casts - Google Chrome Developers', url: 'https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0WC9638ZL1bP4pwf5yF', isFree: true },
                { type: 'documentation', title: 'MDN - Accessibility Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility', isFree: true },
                { type: 'course', title: 'Web Accessibility - Udacity/Google', url: 'https://www.udacity.com/course/web-accessibility--ud891', isFree: true },
                { type: 'article', title: 'WCAG 2.2 At a Glance', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/glance/', isFree: true }
            ],
            content: {
                overview: `Web Accessibility, often abbreviated as a11y (where the 11 represents the number of letters between 'a' and 'y'), is the design and development of websites that everyone can use. This includes people with disabilities such as visual impairment (blindness, low vision, color blindness), hearing impairment, motor difficulties, and cognitive differences. 

Accessibility is not just a "nice-to-have" feature; it is a fundamental human right recognized by the UN, and in many jurisdictions, it is a legal requirement (e.g., ADA in the US, EAA in Europe). As a frontend developer, you are the gatekeeper of access. The decisions you make—from the color contrast of a button to the way you structure a form—directly determine whether a user can interact with your application or is locked out of it.

### 1. The POUR Principles

The Web Content Accessibility Guidelines (WCAG) are organized around four main principles:

- **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive. This means users must be able to perceive the information being depicted (it can't be invisible to all of their senses). 
- **Operable**: User interface components and navigation must be operable. This means that users must be able to operate the interface (the interface cannot require interaction that a user cannot perform).
- **Understandable**: Information and the operation of the user interface must be understandable. Users must be able to understand the information as well as the operation of the user interface.
- **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

### 2. Assistive Technologies

Users interact with the web in many ways:
- **Screen Readers**: Software like NVDA, JAWS, or VoiceOver that reads the content of the screen aloud.
- **Screen Magnifiers**: Tools that enlarge parts of the screen.
- **Alternative Input Devices**: Head pointers, switch devices, or single-key entry systems for those who cannot use a mouse or standard keyboard.
- **Keyboard-only Navigation**: Using the Tab, Enter, and Arrow keys to move through a site.

### 3. ARIA: Accessible Rich Internet Applications

WAI-ARIA is a technical specification that provides a framework for adding attributes to HTML elements to improve accessibility. ARIA is used when native HTML elements lack the necessary semantics for complex UI patterns (like tabs, accordions, or modals).
- **Roles**: Define what an element is (e.g., 'role="button"', 'role="tablist"').
- **States and Properties**: Define the current condition of an element (e.g., 'aria-expanded="true"', 'aria-hidden="false"').

**Rule #1 of ARIA**: If you can use a native HTML element or attribute with the semantics and behavior you require already built-in, instead of re-purposing an element and adding an ARIA role, state, or property to make it accessible, then do so.

### 4. Designing for Accessibility

- **Color Contrast**: Ensure a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.
- **Text Alternatives**: Every non-text element (images, icons) must have an alternative description unless it is purely decorative.
- **Focus Indicators**: Never remove the 'outline' from focused elements without providing a clear, visible alternative.
- **Responsive Layouts**: Ensure users can zoom into your site up to 400% without losing functionality.

### 5. Testing and Validation

- **Automated Tools**: Use Lighthouse, Axe DevTools, or WAVE to catch common errors.
- **Manual Testing**: Navigate your site using ONLY the keyboard. Can you reach every link? Can you trigger every button?
- **Screen Reader Testing**: Turn on VoiceOver or TalkBack and listen to how your site is described. Does it make sense?

By adopting an "Accessibility-First" mindset, you create better products for everyone. Accessible design often leads to better SEO, cleaner code, and a more intuitive user experience for todos users, regardless of their abilities.`,
                keyConcepts: [
                    'POUR Principles: Perceivable, Operable, Understandable, Robust',
                    'Assistive Technologies: Screen Readers, Magnifiers, Alternative Inputs',
                    'Semantic HTML: The first line of defense in accessibility',
                    'WAI-ARIA: Roles, States, and Properties for complex UI',
                    'Color Contrast and Typography standards (WCAG AA/AAA)',
                    'Keyboard Focus Management and Skip Links',
                    'Alt Text and Descriptive Labels for non-text content',
                    'Aria-hidden and Screen Reader only classes',
                    'Form accessibility: Labels, fieldsets, and error announcements',
                    'User preference media queries (prefers-reduced-motion)'
                ],
                practiceQuestions: [
                    { question: 'What does the acronym "POUR" stand for in web accessibility?', hint: 'Perceivable, Operable, Understandable, Robust.', difficulty: 'easy' },
                    { question: 'When should you use ARIA roles over native HTML elements?', hint: 'Only when native elements don\'t exist for the required UI pattern.', difficulty: 'medium' },
                    { question: 'What is the minimum recommended contrast ratio for regular body text?', hint: '4.5:1 according to WCAG AA.', difficulty: 'medium' },
                    { question: 'What is a "Skip Link" and why is it useful?', hint: 'A hidden link at the top of a page to bypass navigation for keyboard users.', difficulty: 'hard' },
                    { question: 'How do you mark an image as purely "Decorative" for screen readers?', hint: 'Use an empty alt attribute (alt="") or role="presentation".', difficulty: 'easy' },
                    { question: 'What is the purpose of the "landmark" roles (main, nav, header)?', hint: 'To allow screen reader users to jump quickly to different page sections.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use semantic tags before reaching for ARIA.',
                    'Always provide visual focus indicators for keyboard navigation.',
                    'Keep heading levels in a logical, nested hierarchy (no skipping levels).',
                    'Ensure every form field has a programmatic label.',
                    'Don\'t rely on color alone to convey information (use text or icons too).',
                    'Test your site with a screen reader at least once during development.',
                    'Implement "Skip to Content" links for long navigation bars.',
                    'Provide captions and transcripts for all video and audio content.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'A11y Foundations & Semantic HTML', description: 'The basics of access.', tasks: ['Learn the POUR principles and WCAG levels', 'Audit a project using the axe DevTools extension', 'Refactor a section using proper semantic landmark tags'] },
                { day: 2, title: 'Keyboard & Focus Management', description: 'Navigation without a mouse.', tasks: ['Implement a visible focus ring for all interactive elements', 'Create a "Skip to Main Content" link', 'Trap focus within a modal or dialog component'] },
                { day: 3, title: 'ARIA & Complex UI', description: 'Beyond simple HTML.', tasks: ['Implement an accessible accordion using ARIA states', 'Learn about live regions (aria-live) for dynamic updates', 'Verify color contrast across your entire UI palette'] },
            ]
        },

        'html-best-practices': {
            id: 'html-best-practices',
            label: 'HTML Best Practices',
            description: 'Professional standards for writing clean, performant, and maintainable HTML. Learn the conventions followed by world-class engineering teams.',
            parentId: 'html',
            resources: [
                { type: 'article', title: 'Google HTML/CSS Style Guide', url: 'https://google.github.io/styleguide/htmlcssguide.html', isFree: true },
                { type: 'article', title: 'W3C - HTML Quality Assurance', url: 'https://www.w3.org/TR/html-qa/', isFree: true },
                { type: 'video', title: '10 HTML Pro-Tips', url: 'https://www.youtube.com/watch?v=kYJmO6lS39U', isFree: true },
                { type: 'article', title: 'HTML Boilerplate - Best Practices', url: 'https://html5boilerplate.com/', isFree: true }
            ],
            content: {
                overview: `Writing HTML is easy; writing "Good" HTML is an art. Professional HTML development focuses on three core pillars: Maintainability, Performance, and Semantics. In a clinical environment, your HTML should be self-documenting, meaning a developer should understand the structure of the data just by reading the tags, without seeing any CSS.

### 1. Document Structure and Meta Tags

Every professional HTML document starts with a solid foundation.
- **DOCTYPE**: Always use \`<!DOCTYPE html>\` to trigger standard mode in all browsers.
- **Lang Attribute**: Essential for accessibility. e.g., \`<html lang="en">\`.
- **Character Encoding**: Setup \`<meta charset="utf-8">\` as the first tag in your \`<head>\`.
- **Viewport Meta**: Crucial for responsive design: \`<meta name="viewport" content="width=device-width, initial-scale=1">\`.

### 2. Clean Code Conventions

- **Lower Case**: All tags and attributes should be lowercase.
- **Indentation**: Consistent indentation (2 or 4 spaces) improves readability.
- **Attribute Ordering**: Follow a logical order (e.g., class, id, name, type, src/href, alt).
- **Self-Closing Tags**: In HTML5, self-closing tags like \`<img />\` are valid, but keep them consistent throughout the project.

### 3. Semantics and Landmark Roles

Don't use \`<div>\` and \`<span>\` when a more descriptive tag exists.
- **Sectioning**: Use \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`.
- **Grouping**: Use \`<ul>\`, \`<ol>\`, \`<dl>\` for lists, and \`<figure>\` with \`<figcaption>\` for media.
- **Emphasis**: Use \`<strong>\` and \`<em>\` for meaning, not just bold/italic styles.

### 4. Performance Optimization

- **Resource Loading**: Place scripts at the end of the body or use \`defer\`/\`async\`.
- **Image Optimization**: Use the \`loading="lazy"\` attribute for non-critical images to speed up initial page loads.
- **Minimize DOM Depth**: Avoid "div-itis"—nesting elements too deeply makes the DOM tree heavy and slows down rendering performance.

### 5. Validation and Tooling

- **W3C Validator**: Use automated validators to catch syntax errors like unclosed tags or illegal nesting.
- **Linter**: Integrate HTML linters into your IDE (like Prettier or HTMLHint) to enforce style consistency across the team.

By following these best practices, you ensure that your code is not only understood by browsers but also by the human developers who will maintain it for years to come.`,
                keyConcepts: [
                    'Doctype and Standard Mode',
                    'Semantic Landrymarks: header, footer, main, nav',
                    'Attribute Ordering and Quoting consistency',
                    'Self-closing tags vs Void elements',
                    'Image loading attributes: lazy, fetchpriority',
                    'Script placement and loading: defer vs async',
                    'Document Language and Character Encoding',
                    'Proper Nesting and Flow Content rules',
                    'Form semantics: label/input coupling',
                    'Heading Hierarchy and Single H1 rule'
                ],
                codeExamples: [
                    {
                        title: 'Perfect HTML5 Boilerplate',
                        language: 'html',
                        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Your Site</title>\n  <meta name="description" content="Meta descriptions for SEO.">\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <nav>...</nav>\n  <main>...</main>\n  <script src="app.js" defer></script>\n</body>\n</html>'
                    }
                ],
                practiceQuestions: [
                    { question: 'What is the purpose of the `lang` attribute on the `<html>` tag?', hint: 'Identifies the language for screen readers and search engines.', difficulty: 'easy' },
                    { question: 'Difference between `defer` and `async` for script loading?', hint: 'Defer maintains execution order; async executes as soon as loaded.', difficulty: 'hard' },
                    { question: 'Why should you avoid deep nesting of HTML elements?', hint: 'It increases DOM complexity and hurts rendering performance.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use lowercase for all tag and attribute names.',
                    'Always include `alt` text for images.',
                    'Avoid inline styles—use external CSS.',
                    'Quote all attributes consistently.',
                    'Validate your markup using the W3C validator.',
                    'Use semantic tags instead of generic containers whenever possible.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'HTML Code Quality', description: 'Rules for clean code.', tasks: ['Audit your existing projects for semantic tags', 'Implement a consistent attribute ordering scheme', 'Run your site through the W3C Markup Validator'] },
            ]
        },

        // ─── LEVEL 2: CSS Sub-topics ───
        'css-architecture': {
            id: 'css-architecture',
            label: 'CSS Architecture',
            description: 'The strategy of organizing and structuring CSS to ensure scalability, maintainability, and collision-free styling in large-scale applications.',
            parentId: 'css',
            resources: [
                { type: 'article', title: 'BEM - Block Element Modifier', url: 'https://en.bem.info/methodology/', isFree: true },
                { type: 'article', title: 'SMACSS - Scalable and Modular Architecture for CSS', url: 'http://smacss.com/', isFree: true },
                { type: 'article', title: 'OOCSS - Object Oriented CSS', url: 'https://github.com/stubbornella/oocss/wiki', isFree: true },
                { type: 'article', title: 'ITCSS - Inverted Triangle CSS', url: 'https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/', isFree: true },
                { type: 'video', title: 'Scaling CSS at Scale', url: 'https://www.youtube.com/watch?v=t_u_K9pP0Yw', isFree: true }
            ],
            content: {
                overview: `As projects grow from small prototypes to massive enterprise applications, CSS becomes notoriously difficult to maintain. Without a structured architectural approach, developers often fall into the trap of "Selector Hell," where styles clash, "!important" is used as a band-aid, and changing one line of CSS breaks five other components. CSS Architecture is the set of methodologies and conventions used to prevent this chaos.

### 1. The Global Scope Problem

Unlike most programming languages, CSS is global by nature. Every selector you write can potentially affect every element on the page. This "feature" becomes a major liability in large teams. Architecture methodologies aim to create "local scope" through naming conventions and structural rules.

### 2. Common Methodologies

#### BEM (Block, Element, Modifier)
BEM is the most widely adopted naming convention. It provides a clear, transparent structure for your classes.
- **Block**: Standalone entity that is meaningful on its own (e.g., \`.card\`, \`.menu\`).
- **Element**: A part of a block that has no standalone meaning and is semantically tied to its block (e.g., \`.card__title\`, \`.menu__item\`).
- **Modifier**: A flag on a block or element to change appearance or behavior (e.g., \`.card--large\`, \`.menu__item--active\`).

#### SMACSS (Scalable and Modular Architecture for CSS)
SMACSS categorizes CSS into five types:
1. **Base**: Defaults (reset.css, typography).
2. **Layout**: Major components (header, footer, sidebar).
3. **Module**: Reusable UI blocks (buttons, cards).
4. **State**: Temporary conditions (is-active, is-hidden).
5. **Theme**: Visual skins (dark-mode).

#### ITCSS (Inverted Triangle CSS)
ITCSS organizes CSS by specificity and reach, moving from generic to explicit:
- **Settings**: Variabls/config.
- **Tools**: Mixins/functions.
- **Generic**: Resets/normalizers.
- **Elements**: Unclassed HTML tags.
- **Objects**: No-design patterns (layout).
- **Components**: Designed UI modules.
- **Trumps**: Utilities and overrides.

### 3. Modern Approaches: CSS Modules and Scoped CSS

In the era of React and Vue, we now have tools that automate architectural best practices. **CSS Modules** hash your class names at build time (e.g., \`.card\` becomes \`.card_a7b2\`), effectively solving the global collision problem. 

### 4. Choosing the Right Path

The "best" architecture depends on your team size and tech stack. 
- For small projects: Standard BEM is usually sufficient.
- For design systems: ITCSS or SMACSS provide a more robust framework.
- For React/Next.js: CSS Modules or CSS-in-JS (like Styled Components) are often preferred.

By mastering CSS Architecture, you ensure that adding a new feature today doesn't become a maintenance nightmare tomorrow.`,
                keyConcepts: [
                    'The Global Namespace Problem',
                    'BEM: Block, Element, Modifier semantics',
                    'SMACSS Categorization: Base, Layout, Module, State, Theme',
                    'ITCSS Hierarchy: Generic to Explicit layers',
                    'Selector Specificity management and avoidance of !important',
                    'Component-Driven Development (CDD)',
                    'CSS Modules and Local Scoping',
                    'Naming Conventions and Consistency',
                    'Dry (Don\'t Repeat Yourself) principle vs Over-abstraction',
                    'Architecting for Design Systems'
                ],
                practiceQuestions: [
                    { question: 'What does the "Element" represent in the BEM methodology?', hint: 'A piece of a block that has no meaning on its own.', difficulty: 'easy' },
                    { question: 'Explain the "Inverted Triangle" concept in ITCSS.', hint: 'Moving from generic, low-specificity styles to explicit, high-specificity components.', difficulty: 'hard' },
                    { question: 'Why is using an ID selector for styling generally considered bad practice in architecture?', hint: 'IDs have very high specificity and are not reusable.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Never use ID selectors for styling.',
                    'Keep selectors as flat as possible (avoid deep nesting).',
                    'Enforce a single naming convention throughout the entire team.',
                    'Modularize your CSS files—one file per component.',
                    'Avoid using !important; fix the specificity instead.',
                    'Use CSS variables for theme-wide tokens (colors, spacing).'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Mastering BEM', description: 'Clean naming conventions.', tasks: ['Read the BEM documentation', 'Refactor a messy UI component into BEM syntax', 'Practice creating modifier classes for state changes'] },
            ]
        },

        'css-preprocessors': {
            id: 'css-preprocessors',
            label: 'CSS Preprocessors',
            description: 'Advanced tools like Sass, Less, and PostCSS that extend CSS with variables, nesting, mixins, and logic to build more powerful and maintainable stylesheets.',
            parentId: 'css',
            resources: [
                { type: 'documentation', title: 'Sass - Official Documentation', url: 'https://sass-lang.com/documentation', isFree: true },
                { type: 'video', title: 'Sass Crash Course - Traversy Media', url: 'https://www.youtube.com/watch?v=nu5mdN2JIwM', isFree: true },
                { type: 'article', title: 'PostCSS - The Power of Plugins', url: 'https://evilmartians.com/chronicles/postcss-guide', isFree: true },
                { type: 'documentation', title: 'Less.js - Official Site', url: 'https://lesscss.org/', isFree: true }
            ],
            content: {
                overview: `CSS Preprocessors are scripting languages that extend the default capabilities of CSS. They allow you to use features that don't exist in standard CSS yet (or didn't for a long time), such as variables, nesting, mixins, functions, and mathematical operations. The most popular preprocessor today is Sass (specifically the SCSS syntax).

### 1. Why use a Preprocessor?

Standard CSS can be repetitive. If you have 50 components using the same primary color, and you want to change that color, you might have to search and replace across 50 files. Preprocessors solve this by introducing:
- **Variables**: Store colors, fonts, or any CSS value in a reusable name.
- **Nesting**: Nest your CSS selectors in a way that follows the hierarchy of your HTML, reducing repetition.
- **Mixins**: Create reusable blocks of CSS that can be "mixed in" to other selectors (like a macro).
- **Functions**: Perform calculations or manipulate colors dynamically.
- **Partials and Imports**: Break your CSS into many small files and compile them into one.

### 2. Sass (SCSS) vs. CSS Variables

Modern CSS now has native "Custom Properties" (CSS Variables). However, Sass is still relevant because it offers features that native CSS doesn't:
- **Compile-time checking**: Catch errors before they reach the browser.
- **Advanced logic**: If/Else statements and For loops to generate complex utility classes.
- **Cleaner syntax**: Nesting makes the code much more readable.

### 3. PostCSS: The Swiss Army Knife

PostCSS is slightly different. It's a tool for transforming CSS with JavaScript plugins. 
- **Autoprefixer**: Automatically adds browser prefixes (-webkit, -moz) so you don't have to.
- **CSSNano**: Compresses and minifies your CSS for production.
- **Tailwind CSS**: Actually runs as a PostCSS plugin!

### 4. The Compilation Step

Browsers cannot read Sass or Less directly. You must use a "compiler" (like Vite, Webpack, or a standalone CLI tool) to turn your preprocessor code into standard CSS.

By integrating preprocessors into your workflow, you write less code, make fewer mistakes, and build more robust design systems.`,
                keyConcepts: [
                    'Variables: Storing reusable tokens',
                    'Nesting: Hierarchical selector organization',
                    'Mixins: Reusable blocks with parameters',
                    'Partials and @use/@forward organization',
                    'Functions: Mathematical and color manipulations',
                    'Inheritance with @extend',
                    'Logic: Control directives (@if, @for, @each)',
                    'Sass (SCSS) syntax vs Original indented syntax',
                    'PostCSS: Transforming CSS with JS plugins',
                    'Autoprefixer and browser compatibility'
                ],
                codeExamples: [
                    {
                        title: 'Sass Mixin and Nesting',
                        language: 'scss',
                        code: '@mixin flex-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.card {\n  padding: 2rem;\n  \n  &__title {\n    color: $primary-color;\n    font-size: 1.5rem;\n  }\n  \n  &__content {\n    @include flex-center;\n    margin-top: 1rem;\n  }\n}'
                    }
                ],
                practiceQuestions: [
                    { question: 'What is the difference between `@import` and `@use` in modern Sass?', hint: 'Use @use for better namespacing and to avoid global scope issues.', difficulty: 'hard' },
                    { question: 'What is a "Mixin" in Sass?', hint: 'A reusable group of CSS declarations that can be included in other styles.', difficulty: 'easy' },
                    { question: 'Why is PostCSS often used alongside Sass?', hint: 'To handle post-processing tasks like Autoprefixing or Minification.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Don\'t nest too deep—limit yourself to 3 levels of nesting.',
                    'Use Mixins for repeated patterns, not just for one-off styles.',
                    'Leverage Partials to keep your file sizes manageable.',
                    'Prefer `@use` over the deprecated `@import`.',
                    'Comment your complex functions and mixins for other developers.'
                ]
            }
        },

        'css-frameworks': {
            id: 'css-frameworks',
            label: 'CSS Frameworks',
            description: 'Discover the world of UI frameworks that accelerate development by providing pre-built components and utility-first design systems.',
            parentId: 'css',
            children: ['tailwind', 'bootstrap'],
            resources: [
                { type: 'article', title: 'State of CSS - Frameworks Survey', url: 'https://2023.stateofcss.com/en-US/libraries/css-frameworks/', isFree: true },
                { type: 'video', title: 'CSS Frameworks Tier List', url: 'https://www.youtube.com/watch?v=u6_aXALlptc', isFree: true },
                { type: 'article', title: 'Tailwind vs Bootstrap vs MUI', url: 'https://blog.logrocket.com/tailwind-vs-bootstrap-vs-material-ui-comparison/', isFree: true }
            ],
            content: {
                overview: `CSS Frameworks are libraries of pre-written CSS that allow for easier, more standardized web design. Instead of starting from a blank stylesheet for every project, you can use a framework to provide a baseline of styles, a grid system, and reusable UI components (like buttons, navbars, and modals).

The industry has shifted significantly over the last decade, from "Element-Based" frameworks (like Bootstrap) to "Utility-First" frameworks (like Tailwind CSS).

### 1. Types of Frameworks

#### Element-Based (e.g., Bootstrap, Foundation)
These frameworks provide pre-designed components. You add a class like \`btn btn-primary\` and you get a fully styled button. 
- **Pros**: Extremely fast to build prototypes; standard look across the web.
- **Cons**: High customization difficulty; "looks like every other site".

#### Utility-First (e.g., Tailwind CSS)
These frameworks provide low-level utility classes that do one thing (e.g., \`p-4\` for padding, \`bg-blue-500\` for background). You build your components by composing these classes directly in your HTML.
- **Pros**: Infinite customization; smaller final CSS bundles; no need to leave your HTML file.
- **Cons**: Leanring curve for class names; "ugly" HTML with many classes.

#### Component Libraries (e.g., Material UI, Ant Design)
Often tied to JS frameworks like React. They provide actual JS components that handle both styling and behavior.

### 2. When to use a Framework?

- **Use one when**: You need to build a professional UI quickly, you're working in a large team that needs a shared design language, or you want to ensure cross-browser consistency without the manual work.
- **Avoid one when**: You are learning the basics of CSS (frameworks hide the "why" and "how"), you need a truly unique design that doesn't fit a grid system, or budget/performance constraints require a minimal footprint.

### 3. The Future: Design Systems

Many modern companies are moving away from public frameworks and building their own internal "Design Systems" using tools like **Style Dictionary** or **Figma-to-Code** workflows. However, for most developers, mastering one utility-first and one element-based framework is essential for employability.`,
                keyConcepts: [
                    'Utility-First vs Component-Based design',
                    'Grid Systems: Flexbox grids and 12-column layouts',
                    'Responsive Breakpoints and Mobile-First philosophy',
                    'Theme Customization and Configuration',
                    'CSS Purging/Shaking for performance optimization',
                    'Accessibility in pre-built UI components',
                    'Sass-based Frameworks vs Zero-Runtime CSS-in-JS',
                    'Standardizing Design Tokens (Colors, Spacing, Shadows)',
                    'Browser Normalization and Reset layers',
                    'Framework abstraction vs Custom Overrides'
                ],
                practiceQuestions: [
                    { question: 'What is the primary difference between Tailwind CSS and Bootstrap?', hint: 'Utility-first classes vs Pre-styled components.', difficulty: 'easy' },
                    { question: 'Why is "Purging" important when using a framework like Tailwind?', hint: 'To remove unused classes and minimize the final CSS bundle size.', difficulty: 'medium' },
                    { question: 'What is a "Design Token"?', hint: 'A named value (like $primary-blue) used to maintain consistency across a system.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Don\'t use a framework to hide your lack of CSS knowledge.',
                    'Keep your customization configuration (tailwind.config.js) organized.',
                    'Prioritize accessibility—ensure the framework\'s components are keyboard-navigable.',
                    'Audit the bundle size impact of the framework.',
                    'Avoid deep overrides of framework styles; try to work within its design system.'
                ]
            }
        },

        'tailwind': {
            id: 'tailwind',
            label: 'Tailwind CSS',
            description: 'A utility-first CSS framework for rapidly building custom user interfaces without ever leaving your HTML.',
            parentId: 'css-frameworks',
            resources: [
                { type: 'documentation', title: 'Tailwind CSS - Official Site', url: 'https://tailwindcss.com/', isFree: true },
                { type: 'video', title: 'Tailwind CSS Full Course - Beginner to Pro', url: 'https://www.youtube.com/watch?v=ft30zcMlFao', isFree: true },
                { type: 'article', title: 'Design Engines: Tailwind CSS', url: 'https://www.joshwcomeau.com/css/tailwind-css-guide/', isFree: true },
                { type: 'video', title: 'Tailwind CSS in 100 Seconds', url: 'https://www.youtube.com/watch?v=mr15Xzb1Ook', isFree: true }
            ],
            content: {
                overview: `Tailwind CSS has fundamentally changed how many developers think about styling. It is a "utility-first" framework, which means instead of writing CSS classes like \`.login-button\`, you use classes like \`bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white\`.

### 1. The Core Philosophy

Traditional CSS development involves a constant context switch between your HTML and your CSS files. Tailwind eliminates this by providing low-level utility classes that you apply directly to your elements.

- **Speed**: You build custom designs faster because you don't have to name classes or think about the'Cascade'.
- **Constraint-Based Design**: Tailwind doesn't give you "any" color; it gives you a curated palette (blue-100, blue-200, etc.). This ensures visual consistency across your app.
- **Maintainability**: When you delete a component in your HTML, you also delete its styles. There's no "dead CSS" left in a stylesheet.

### 2. Directing the Beast: Configuration

Tailwind is highly configurable via \`tailwind.config.js\`. You can:
- **Extend the theme**: Add your own brand colors, font families, or spacing scales.
- **Plugins**: Add functionality like typography or aspect-ratio support.
- **Variants**: Enable or disable responsive, hover, focus, and active variants for specific utilities.

### 3. The Build Process and Performance

A common criticism of Tailwind is the massive size of its full library. However, Tailwind uses **Just-In-Time (JIT)** compilation. During development, it watches your files and only generates the CSS for the classes you are actually using. If your project only uses 10 classes, your final CSS file will be tiny.

### 4. Advanced Patterns

- **Responsive Design**: Prefix any utility with a breakpoint name, e.g., \`md:flex\`.
- **States**: Use modifiers like \`hover:\`, \`focus:\`, \`active:\`, and even \`group-hover:\` for parent-child styling.
- **Dark Mode**: Simply add the \`dark:\` prefix to your utilities.

Tailwind is more than a framework; it's a workflow that prioritizes developer speed and design consistency.`,
                keyConcepts: [
                    'Utility-First Paradigm',
                    'JIT (Just-In-Time) Engine',
                    'The tailwind.config.js file',
                    'Responsive Modifiers: sm, md, lg, xl',
                    'State Modifiers: hover, focus, active, group, peer',
                    'Directives: @tailwind, @apply, @layer',
                    'Design Tokens and Theme Extension',
                    'PurgeCSS and Bundle Optimization',
                    'Plugins and the Tailwind Ecosystem',
                    'IntelliSense and Developer Tooling'
                ],
                codeExamples: [
                    {
                        title: 'Tailwind Component Pattern',
                        language: 'html',
                        code: '<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">\n  <div class="md:flex">\n    <div class="md:shrink-0">\n      <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img.jpg" alt="..."/>\n    </div>\n    <div class="p-8">\n      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>\n      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>\n      <p class="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work.</p>\n    </div>\n  </div>\n</div>'
                    }
                ],
                practiceQuestions: [
                    { question: 'How do you apply a style only on medium screens in Tailwind?', hint: 'Prefix with md: (e.g., md:bg-red-500).', difficulty: 'easy' },
                    { question: 'What is the `@apply` directive used for?', hint: 'To inline Tailwind utility classes into custom CSS blocks.', difficulty: 'medium' },
                    { question: 'Explain the difference between "hover:" and "group-hover:" variants.', hint: 'Hover is for the element itself; group-hover is for child elements based on parent state.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Avoid using `@apply` too much—it defeats the purpose of Tailwind.',
                    'Keep your configuration file the source of truth for your design tokens.',
                    'Use the Headless UI or Radix UI libraries for complex accessible components.',
                    'Install the Tailwind CSS IntelliSense extension in VS Code.',
                    'Organization your class names using a consistent order (e.g., layout -> box model -> visual).'
                ]
            }
        },

        'bootstrap': {
            id: 'bootstrap',
            label: 'Bootstrap',
            description: 'The world\'s most popular frontend toolkit for developing responsive, mobile-first projects with a powerful 12-column grid and pre-built components.',
            parentId: 'css-frameworks',
            resources: [
                { type: 'documentation', title: 'Bootstrap - Official Documentation', url: 'https://getbootstrap.com/', isFree: true },
                { type: 'video', title: 'Bootstrap 5 Crash Course', url: 'https://www.youtube.com/watch?v=4sosXZsdy-s', isFree: true },
                { type: 'article', title: 'Bootstrap 5 - New Features', url: 'https://blog.getbootstrap.com/2021/05/05/bootstrap-5/', isFree: true }
            ],
            content: {
                overview: `Bootstrap is a free, open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.

Originally created at Twitter, Bootstrap remains the go-to choice for developers who need to build professional, consistent dashboards and internal tools with minimal styling effort.

### 1. The 12-Column Grid System

Bootstrap's most famous feature is its responsive grid. It allows you to create layouts that automatically adapt to the screen size by dividing the page into 12 columns.
- **Container**: The root element for the grid.
- **Row**: Wraps horizontal columns.
- **Col**: The actual content columns (e.g., \`col-md-6\` takes half the width on medium screens).

### 2. Pre-Built Components

Bootstrap shines in its library of components. You don't have to build a Navbar, a Modal, or a Carousel from scratch. You simply copy the HTML structure provided in the docs, apply the classes, and include the Bootstrap JS file to handle the interactivity.

### 3. Utility Classes (The Bootstrap 5 Shift)

In version 5, Bootstrap followed the industry trend and added a robust set of utility classes (similar to Tailwind). You can now handle spacing, colors, and positioning using classes like \`m-5\`, \`text-primary\`, and \`d-flex\` without writing custom CSS.

### 4. Customization with Sass

Bootstrap is built with Sass. This means you can download the source code and change the primary variables (like \`$primary\`, \`$body-bg\`) to create a completely unique look that doesn't look like the default "Bootstrap blue".

### 5. When to use Bootstrap today?

While Tailwind is gaining ground, Bootstrap is still ideal for:
- **Internal Tools and CMS**: Where speed is more important than a "unique" design.
- **Legacy Projects**: Millions of websites still run on Bootstrap 3 and 4.
- **Junior Developers**: Bootstrap has a flatter learning curve than Tailwind for those just starting with frameworks.

Bootstrap remains a titan of the industry, offering a proven, battle-tested system for building responsive websites at scale.`,
                keyConcepts: [
                    '12-Column Responsive Grid System',
                    'Reboot: A collection of element-specific CSS resets',
                    'Gutters: Spacing between columns',
                    'Component Architecture: Modals, Navbars, Cards, Alerts',
                    'Flexbox-based Layout Utilities',
                    'Sass-based Theming and Variable customization',
                    'JavaScript Plugins: Popper.js integration',
                    'Mobile-First Breakpoints (xs, sm, md, lg, xl, xxl)',
                    'Form Validation and Component states',
                    'Icons: Bootstrap Icons library integration'
                ],
                practiceQuestions: [
                    { question: 'How many columns are in the default Bootstrap grid system?', hint: '12.', difficulty: 'easy' },
                    { question: 'What is the purpose of the `.container` class?', hint: 'To center content and provide horizontal padding within the grid.', difficulty: 'easy' },
                    { question: 'Which class makes an image responsive in Bootstrap 5?', hint: '.img-fluid.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always wrap Columns (`.col-*`) inside Rows (`.row`).',
                    'Use the Grid classes for layouts and Utility classes for spacing.',
                    'Don\'t modify the shared Bootstrap CSS file; use an override stylesheet.',
                    'Only include the components you actually use to minimize bundle size.',
                    'Leverage the built-in accessibility features (ARIA attributes) in Bootstrap components.'
                ]
            }
        },

        // ─── LEVEL 2: JS Sub-topics ───
        'dom-manipulation': {
            id: 'dom-manipulation',
            label: 'DOM Manipulation',
            description: 'Master the Document Object Model (DOM) to create dynamic, interactive, and responsive web experiences by directly manipulating the page structure and content.',
            parentId: 'javascript',
            resources: [
                { type: 'documentation', title: 'MDN - Document Object Model (DOM)', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', isFree: true },
                { type: 'video', title: 'DOM Manipulation Crash Course', url: 'https://www.youtube.com/watch?v=5fb2aPlgoys', isFree: true },
                { type: 'article', title: 'JavaScript.info - The DOM Tree', url: 'https://javascript.info/dom-nodes', isFree: true },
                { type: 'video', title: 'Eloquent JS - The DOM', url: 'https://www.youtube.com/watch?v=80O2DizstcQ', isFree: true }
            ],
            content: {
                overview: `The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

A web page is a document that can be either displayed in the browser window or as the HTML source. In both cases, it is the same document, but the DOM representation allows it to be manipulated. As an object-oriented representation of the web page, it can be modified with a scripting language such as JavaScript.

### 1. The DOM Tree Structure

Search for a "tree" in computer science, and you'll find the DOM. It starts with the \`window\` object, which contains the \`document\`. From there, it branches into the \`<html>\` element, which contains \`<head>\` and \`<body>\`, and so on. Every element, attribute, and piece of text in your HTML is a "node" in this tree.

### 2. Selecting Elements

Before you can change something, you have to find it. Modern JavaScript provides powerful methods:
- **querySelector()**: Uses CSS selectors to find the first matching element. (e.g., \`document.querySelector(".my-class")\`).
- **querySelectorAll()**: Returns a static NodeList of all matching elements.
- **getElementById()**: The fastest way to find a single element by its unique ID.

### 3. Modifying Content and Styles

Once you have an element, you can change it:
- **textContent vs innerHTML**: \`textContent\` is safer as it treats everything as text, while \`innerHTML\` parses strings as HTML (dangerous for XSS!).
- **classList**: The best way to manage styles. Use \`add()\`, \`remove()\`, and \`toggle()\` to apply CSS classes dynamicly.
- **Attributes**: Use \`setAttribute()\` and \`getAttribute()\` or the direct properties (e.g., \`img.src = "new.jpg"\`).

### 4. Creating and Removing Elements

You can build the UI on the fly:
- **createElement()**: Create a new tag in memory.
- **appendChild() / prepend()**: Insert the new element into the DOM tree.
- **remove()**: Delete an element from the page.

### 5. Event Handling

Events are the heart of interactivity.
- **addEventListener()**: The modern way to listen for clicks, scrolls, keypresses, and more.
- **Event Bubbling**: Events "bubble up" from the target element to its parents. Use this for **Event Delegation** (listening on a parent to handle events from many children).

### 6. Performance Considerations

The DOM is "expensive." Every time you change the DOM, the browser might have to recalculate the layout and repaint the screen. To stay performant:
- **DocumentFragments**: Build complex structures in memory before adding them to the live DOM.
- **Minimize Layout Thrashing**: Batch your reads (getting sizes) and writes (setting styles).

Mastering the DOM is what separates a "static site builder" from a true "Frontend Engineer."`,
                keyConcepts: [
                    'The Document Object Model (DOM) Tree',
                    'Node vs Element: Understanding the hierarchy',
                    'Selecting Elements: querySelector, getElementById',
                    'Traversing the DOM: parentNode, children, nextSibling',
                    'Manipulating Attributes and IDL properties',
                    'The classList API for style management',
                    'Event Listeners and the Event Object',
                    'Event Flow: Capturing vs Bubbling',
                    'Event Delegation patterns',
                    'Creating, Appending, and Cloning elements',
                    'InnerHTML vs TextContent vs InnerText',
                    'DOM Performance and Layout Thrashing'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a NodeList and an HTMLCollection?', hint: 'NodeList is often static; HTMLCollection is live.', difficulty: 'hard' },
                    { question: 'Why is Element Delegation more performant for large lists?', hint: 'You only attach one event listener to the parent instead of hundreds to the children.', difficulty: 'medium' },
                    { question: 'How do you prevent a link from navigating when clicked using JS?', hint: 'Use event.preventDefault().', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Avoid using inline event handlers (onclick="...")—use addEventListener.',
                    'Prioritize textContent over innerHTML to prevent XSS attacks.',
                    'Use classes for styling changes, not direct .style modifications.',
                    'Cache your DOM selections in variables if you use them multiple times.',
                    'Use DocumentFragments when inserting multiple elements at once.',
                    'Always remove event listeners if the element is removed to prevent memory leaks.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Traversal & Selection', description: 'Finding your way around.', tasks: ['Map out the DOM tree of a complex site', 'Practice complex CSS selectors with querySelectorAll', 'Navigate from a child to its grandparent using parentNode'] },
                { day: 2, title: 'Events & Interaction', description: 'Making things move.', tasks: ['Build a click-to-edit interface', 'Implement event delegation on a dynamic list', 'Discover the difference between stopPropagation and preventDefault'] },
            ]
        },

        'fetch-api': {
            id: 'fetch-api',
            label: 'Fetch API & AJAX',
            description: 'Learn how to communicate with remote servers, handle asynchronous data, and build data-driven applications using the modern Fetch API and AJAX patterns.',
            parentId: 'javascript',
            resources: [
                { type: 'documentation', title: 'MDN - Using the Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', isFree: true },
                { type: 'article', title: 'Fetch API Guide - JavaScript.info', url: 'https://javascript.info/fetch', isFree: true },
                { type: 'video', title: 'Async/Await & Fetch Crash Course', url: 'https://www.youtube.com/watch?v=9jOTXMA_Oxc', isFree: true },
                { type: 'article', title: 'Handling Errors in Fetch', url: 'https://www.freecodecamp.org/news/how-to-handle-errors-in-fetch/', isFree: true }
            ],
            content: {
                overview: `In the early days of the web, every change on a page required a full refresh. AJAX (Asynchronous JavaScript and XML) changed that, and the **Fetch API** is the modern, Promise-based standard for making these asynchronous requests. 

Fetch allows you to make network requests to a server and update parts of a web page without reloading the entire page. This is the foundation of Single Page Applications (SPAs) and modern user experiences.

### 1. The Basic Fetch Syntax

Fetch returns a **Promise** that resolves to the \`Response\` object representing the response to your request.
\`\`\`javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`

### 2. Async / Await: The Modern Way

While \`.then()\` works, \`async/await\` provides a much cleaner, more synchronous-looking way to handle asynchronous code. 
- **try/catch**: Essential for handling errors in async/await blocks.
- **Wait for JSON**: Remember that \`.json()\` is also an asynchronous operation!

### 3. HTTP Methods and Headers

Fetch isn't just for getting data (GET). You can use it to:
- **POST**: Send new data to a server.
- **PUT / PATCH**: Update existing data.
- **DELETE**: Remove data.

You often need to send **Headers** (like \`Content-Type: application/json\`) or **Authentication Tokens** to the server.

### 4. Handling Fetch Errors

A common "gotcha": **Fetch does not reject on HTTP error status codes** (like 404 or 500). The Promise only rejects on network failure (e.g., DNS error or lost connection). You must manually check \`response.ok\` to handle server-side errors.

### 5. Advanced Patterns: AbortController

Sometimes you need to cancel a request—for example, if a user navigates away from a page before the data arrives. The \`AbortController\` allows you to gracefully terminate a fetch operation.

By mastering Fetch, you unlock the ability to turn static HTML into live, data-connected applications.`,
                keyConcepts: [
                    'Promises and the Async/Await syntax',
                    'HTTP Methods: GET, POST, PUT, DELETE',
                    'Status Codes: 200 (OK), 404 (Not Found), 500 (Server Error)',
                    'Request and Response Headers',
                    'JSON Parsing and Serialization',
                    'Error Handling: response.ok vs catch block',
                    'CORS (Cross-Origin Resource Sharing) basics',
                    'Authentication with Bearer Tokens',
                    'The AbortController API',
                    'Request Body Formats: JSON, FormData, Blob'
                ],
                practiceQuestions: [
                    { question: 'Why does a 404 response not trigger the `.catch()` block in fetch?', hint: 'Fetch only rejects on network failures, not HTTP status errors.', difficulty: 'medium' },
                    { question: 'What is the purpose of the `Content-Type` header?', hint: 'It tells the server what format the request body is in (e.g., JSON).', difficulty: 'easy' },
                    { question: 'How do you send a JSON object in a POST request?', hint: 'Use JSON.stringify() in the body and set the Content-Type header.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use async/await for cleaner code.',
                    'Check response.ok before parsing the JSON body.',
                    'Use try/catch to handle both network and parsing errors.',
                    'Implement "Loading" and "Error" states in your UI during requests.',
                    'Secure your API keys—never store them in public client-side code.',
                    'Use the browser\'s Network tab to debug your requests.'
                ]
            }
        },

        'es6-modules': {
            id: 'es6-modules',
            label: 'ES6+ & Modules',
            description: 'Master the modern features of JavaScript that make code more readable, maintainable, and scalable through modularity and expressive syntax.',
            parentId: 'javascript',
            resources: [
                { type: 'article', title: 'ES6 Features - A Complete Overview', url: 'https://github.com/lukehoban/es6features', isFree: true },
                { type: 'documentation', title: 'MDN - JavaScript Modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', isFree: true },
                { type: 'video', title: 'JavaScript Modules in 5 Minutes', url: 'https://www.youtube.com/watch?v=cRHQzlhAF30', isFree: true },
                { type: 'article', title: 'Modern JS: Destructuring, Spread, and Rest', url: 'https://javascript.info/destructuring-assignment', isFree: true }
            ],
            content: {
                overview: `JavaScript has evolved dramatically since its inception. The ES6 (ECMAScript 2015) specification was the largest update in the language's history, introducing features that brought JavaScript in line with other modern programming languages. Modules, in particular, solved the problem of "Global Scope Pollution" and allowed for better code organization.

### 1. The Power of Modules

Before ES6, sharing code between files required complex libraries like RequireJS or polluting the global \`window\` object. ES6 Modules provide a native way to:
- **Export**: Share variables, functions, or classes from one file.
- **Import**: Use that shared code in another file.
- **Encapsulation**: Code inside a module is private by default and only shared if explicitly exported.

### 2. Standard vs. Default Exports

- **Named Exports**: You can export multiple items from a file. (\`export const myVar = 1;\`). When importing, the names must match.
- **Default Exports**: Each file can have one "main" export (\`export default myClass;\`). When importing, you can name it whatever you want.

### 3. Essential ES6+ Syntax

Modularity isn't just about files; it's about cleaner logic inside them:
- **Destructuring**: Pull values out of arrays or objects with ease.
- **Spread/Rest Operators**: Copy arrays (\`[...arr]\`) or collect arguments into an array.
- **Arrow Functions**: Concise syntax and lexical 'this' binding.
- **Template Literals**: Multi-line strings and easy interpolation (\`\${var}\`).
- **Optional Chaining**: Safely access deeply nested properties (\`user?.profile?.name\`).

### 4. The Path to Modern Development

Understanding modules is the prerequisite for using modern build tools like Vite or frameworks like React. These tools rely on \`import\` and \`export\` to bundle your application and optimize it for production.

Mastering these features will not only make you a faster developer but will also make your code significantly more readable for your teammates.`,
                keyConcepts: [
                    'Import and Export syntax (Default vs Named)',
                    'Module Scope and Encapsulation',
                    'Destructuring Assignment (Object and Array)',
                    'Spread and Rest Operators (...)',
                    'Arrow Functions and Lexical this',
                    'Template Literals and String Interpolation',
                    'Optional Chaining and Nullish Coalescing',
                    'Block Scoping: let vs const',
                    'Classes and Syntax Sugar for Prototypes',
                    'Async/Await and Modern Promises'
                ],
                practiceQuestions: [
                    { question: 'What is the main difference between a Named Export and a Default Export?', hint: 'Named exports require braces during import and multiple are allowed; only one default export is allowed.', difficulty: 'medium' },
                    { question: 'How do you copy an object while changing only one property using ES6?', hint: 'Use the spread operator: { ...oldObj, newProp: "value" }.', difficulty: 'easy' },
                    { question: 'Why is "Optional Chaining" (`?.`) useful?', hint: 'It prevents "Cannot read property of undefined" errors by stopping execution if a parent is null.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always use `const` unless you explicitly need to reassign a variable.',
                    'Use modules to keep your global scope clean.',
                    'Prefer named exports for better IDE autocomplete and refactoring.',
                    'Use destructuring for function parameters to make them more descriptive.',
                    'Leverage optional chaining to avoid deep "if" statements.',
                    'Keep your modules focused on a single responsibility.'
                ]
            }
        },

        // ─── LEVEL 3: Version Control & Tooling ───
        'version-control': {
            id: 'version-control',
            label: 'Version Control',
            description: 'Master Git, the industry standard for tracking changes in source code. Learn collaborative workflows that allow thousands of developers to work on the same project simultaneously.',
            children: ['git', 'github'],
            resources: [
                { type: 'video', title: 'Git & GitHub Crash Course - 2025', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', isFree: true },
                { type: 'article', title: 'Learn Git Branching (Interactive)', url: 'https://learngitbranching.js.org/', isFree: true },
                { type: 'documentation', title: 'Pro Git Book (Official)', url: 'https://git-scm.com/book/en/v2', isFree: true },
                { type: 'article', title: 'GitHub Flow - Collaborative Workflows', url: 'https://docs.github.com/en/get-started/quickstart/github-flow', isFree: true }
            ],
            content: {
                overview: `Version Control Systems (VCS) are tools used to track changes to source code over time. In a professional environment, working without version control is like driving without a seatbelt. Git, created by Linus Torvalds, is the most widely used distributed version control system in the world.

### 1. Why Git?

- **History**: You can "go back in time" to any previous version of your code.
- **Collaboration**: Multiple people can work on the same file without overwriting each other's work.
- **Branching**: You can create a "branch" to try a new feature safely without affecting the working "main" code.
- **Backup**: Every developer has a full copy of the project's history on their machine.

### 2. The Core Workflow

1. **Initialize**: Create a new repository (\`git init\`).
2. **Stage**: Select changes you want to save (\`git add\`).
3. **Commit**: Save those changes with a descriptive message (\`git commit\`).
4. **Push**: Send your changes to a central server like GitHub (\`git push\`).

### 3. Distributed vs. Centralized

Unlike older systems, Git is **distributed**. This means every collaborator has a complete copy of the code and its history. This makes Git incredibly fast and resilient to server failures.

### 4. Industry Standard Workflows

- **Git Flow**: A strict branching model geared toward scheduled releases.
- **GitHub Flow**: A lightweight, branch-based workflow that supports teams who deploy often.
- **Trunk-based Development**: Developers collaborate on a single branch ("trunk"), resisting long-lived feature branches.

Mastering version control is not just about commands; it's about the discipline of saving your work often and communicating clearly with your team through commit messages.`,
                keyConcepts: [
                    'Repositories: Local vs Remote',
                    'The Three States: Working Directory, Staging Area, .git Directory',
                    'Branching and Merging strategies',
                    'Commit History and the HEAD pointer',
                    'Remote Workflows: fetch, pull, push',
                    'Merge Conflicts: Why they happen and how to fix them',
                    'Rebasing vs Merging',
                    'Pull Requests (PRs) and Code Reviews',
                    'The .gitignore file',
                    'SSH vs HTTPS for authentication'
                ],
                practiceQuestions: [
                    { question: 'What is the command to see the current status of your repository?', hint: 'git status.', difficulty: 'easy' },
                    { question: 'Difference between `git fetch` and `git pull`?', hint: 'Fetch downloads changes but doesn\'t merge; Pull does both.', difficulty: 'medium' },
                    { question: 'What happens during a "Merge Conflict"?', hint: 'Two people changed the same line of code, and Git needs you to decide which one to keep.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Commit early and often with descriptive messages.',
                    'Never commit sensitive info (API keys, passwords) to Git.',
                    'Keep your branches short-lived and focused on a single feature.',
                    'Always pull the latest changes before starting new work.',
                    'Write commit messages in the imperative mood (e.g., "Fix bug" not "Fixed bug").',
                    'Use a .gitignore file to keep your repo clean of node_modules and builds.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Local Git Mastery', description: 'Working on your machine.', tasks: ['Initialize a repo and make your first commit', 'Create a branch, make changes, and merge it back', 'Use git log and git checkout to explore history'] },
                { day: 2, title: 'Collaborative GitHub', description: 'Working with a team.', tasks: ['Push a local repo to a new GitHub repository', 'Create a Pull Request and merge it', 'Resolve a simulated merge conflict'] },
            ]
        },

        'git': {
            id: 'git',
            label: 'Git',
            description: 'The distributed version control system that enables modern software development. Track every change, branch out for features, and collaborate without fear.',
            parentId: 'version-control',
            resources: [
                { type: 'documentation', title: 'Git Reference Manual', url: 'https://git-scm.com/doc', isFree: true },
                { type: 'article', title: 'Git Cheat Sheet (PDF)', url: 'https://education.github.com/git-cheat-sheet-education.pdf', isFree: true },
                { type: 'video', title: 'Intermediate Git: Rebase and Squashing', url: 'https://www.youtube.com/watch?v=GylH-m6-eE4', isFree: true }
            ],
            content: {
                overview: `Git is much more than a backup tool; it is a complex filesystem and communication tool. At its heart, Git tracks "snapshots" of your project, not just differences between files. This makes operations like branching nearly instantaneous.

### 1. The Power of \`rebase\`

While \`merge\` adds a new commit to the history, \`rebase\` allows you to move your work to a different starting point. This results in a "clean, linear history" that is easier for teams to follow.
> **Warning**: Never rebase a branch that is shared with others!

### 2. Undoing Mistakes

Git is very forgiving. 
- **git reset**: Move your branch back to an earlier commit.
- **git revert**: Create a new commit that undoes the changes of an old one (safe for shared branches).
- **git stash**: Temporarily "save" your work without committing it, allowing you to switch branches quickly.

### 3. The .git Folder

Inside every Git project is a hidden \`.git\` folder. This contains the entire database of your project's history. If you delete this folder, you lose your version history, but your current files remain.

Mastering the Git CLI (Command Line Interface) is highly recommended over using a GUI, as it gives you the full power of the tool and works in any environment (including remote servers).`,
                keyConcepts: [
                    'Staging Area (Index) and Worktree',
                    'Commits as immutable snapshots',
                    'Fast-forward vs Recursive merges',
                    'Rebasing and squashing commits',
                    'Stashing: Temporary work storage',
                    'Cherry-picking: Applying specific commits',
                    'Git Refs: Tags, Branches, and HEAD',
                    'Remote Tracking Branches (origin/main)',
                    'The Reflog: Git\'s internal safety net',
                    'Configuring global and local settings'
                ],
                practiceQuestions: [
                    { question: 'What is the "Staging Area" in Git?', hint: 'A buffer between your working directory and the commit history.', difficulty: 'easy' },
                    { question: 'What does "Fast-Forward" merge mean?', hint: 'Git just moves the branch pointer forward because there are no conflicting changes.', difficulty: 'medium' },
                    { question: 'How do you find a lost commit that isn\'t on any branch?', hint: 'Use git reflog.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Write meaningful commit messages (Subject < 50 chars).',
                    'Don\'t commit large binary files (use Git LFS for those).',
                    'Keep your main branch protected and deployable.',
                    'Use Tags to mark releases (e.g., v1.0.0).',
                    'Leverage Git Aliases for frequently used commands.'
                ]
            }
        },

        'github': {
            id: 'github',
            label: 'GitHub',
            description: 'The world\'s leading AI-powered developer platform. Host your code, manage projects, and collaborate with the global developer community.',
            parentId: 'version-control',
            resources: [
                { type: 'documentation', title: 'GitHub Docs', url: 'https://docs.github.com/', isFree: true },
                { type: 'article', title: 'Mastering GitHub Pages', url: 'https://pages.github.com/', isFree: true },
                { type: 'video', title: 'GitHub Actions Tutorial', url: 'https://www.youtube.com/watch?v=R8_veQiYBjI', isFree: true }
            ],
            content: {
                overview: `GitHub is to Git what Instagram is to photos. While Git is the tool that tracks changes, GitHub is the cloud platform where you store those changes and collaborate with others. It has become the "social network" for developers and the home of almost every major open-source project.

### 1. Beyond Hosting: Collaboration

GitHub provides specialized tools for team workflows:
- **Repositories**: Cloud hosting for your Git projects.
- **Pull Requests (PRs)**: A way to propose changes, discuss them, and review code before it's merged.
- **Issues and Projects**: Track bugs and manage your development roadmap using Kanban boards.
- **Discussions**: A forum for community questions and planning.

### 2. Automation: GitHub Actions

GitHub isn't just for storage; it can run code too. GitHub Actions is a powerful **CI/CD (Continuous Integration / Continuous Deployment)** tool. You can configure it to automatically run tests every time you push code, or to deploy your website to a server automatically when you merge a PR.

### 3. Your Developer Portfolio

Your GitHub profile is your "living resume." Potential employers look at your activity graph, your open-source contributions, and the quality of the projects you've built. Maintaining a clean, well-documented GitHub presence is essential for a modern career in tech.

Contributing to Open Source (fixing a bug in a library you use) is one of the fastest ways to improve your skills and build your professional network.`,
                keyConcepts: [
                    'Remote Repositories and Forks',
                    'Pull Requests: The heart of collaboration',
                    'GitHub Actions: CI/CD automation',
                    'Issues and Project Management (Agile/Scrum)',
                    'GitHub Pages: Free hosting for static sites',
                    'Webhooks: Connecting GitHub to other services',
                    'Social Coding: Starring, Following, and Gists',
                    'Advanced Security: Dependabot and Secret scanning',
                    'Personal Access Tokens and SSH Keys',
                    'Corporate features: Organizations and Teams'
                ],
                practiceQuestions: [
                    { question: 'What is a "Fork" on GitHub?', hint: 'A copy of someone else\'s repository in your own account.', difficulty: 'easy' },
                    { question: 'How do you propose changes to a project you don\'t have write access to?', hint: 'Fork it -> Change your fork -> Open a Pull Request back to the original.', difficulty: 'medium' },
                    { question: 'What is the purpose of "Dependabot"?', hint: 'To automatically find and help fix vulnerabilities in your dependencies.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Write a clear, professional README.md for every project.',
                    'Use Branches for all new features—never push directly to main.',
                    'Review your teammates\' Pull Requests with constructive feedback.',
                    'Use GitHub Actions to automate your testing suite.',
                    'Keep your profile "Green" by contributing consistently.'
                ]
            }
        },

        'package-managers': {
            id: 'package-managers',
            label: 'Package Managers',
            description: 'Learn how to manage, share, and reuse code modules efficiently using the vast ecosystem of JavaScript packages (npm, Yarn, pnpm).',
            children: ['npm', 'yarn'],
            resources: [
                { type: 'article', title: 'How Package Managers Work', url: 'https://blog.logrocket.com/javascript-package-managers-compared/', isFree: true },
                { type: 'video', title: 'NPM vs Yarn vs PNPM - Which to use?', url: 'https://www.youtube.com/watch?v=S0id07SAtH0', isFree: true },
                { type: 'documentation', title: 'The package.json Guide', url: 'https://docs.npmjs.com/cli/v9/configuring-npm/package-json', isFree: true }
            ],
            content: {
                overview: `In the past, to use a library like jQuery or Lodash, you had to manually download a .js file and include it in your HTML. In modern development, we use **Package Managers** to automate this entire process.

### 1. The Hub of Development
A package manager is a system that allows you to:
- **Install**: Download code libraries written by others.
- **Manage**: Keep track of which versions of which libraries your project needs.
- **Share**: Publish your own code for others to use.

### 2. The \`package.json\` File
This is the manifest of your project. It lists your dependencies (libraries your app needs to run) and devDependencies (libraries your app needs only during development, like testing tools). It also allows you to define **scripts**—shorthand commands for common tasks like starting a dev server or building for production.

### 3. Dependency Hell vs. Lockfiles
When you install a package, it might need 10 other packages, which each need 10 more. This is called a "dependency tree." To ensure that every developer on your team has exactly the same versions of all these sub-packages, package managers use **Lockfiles** (\`package-lock.json\`, \`yarn.lock\`, or \`pnpm-lock.yaml\`). Always commit these files to Git!`,
                keyConcepts: [
                    'Dependency Management and the manifest (package.json)',
                    'Semantic Versioning (SemVer): ^, ~, and exact versions',
                    'DevDependencies vs Regular Dependencies',
                    'The node_modules directory and dependency trees',
                    'Lockfiles: Ensuring deterministic builds',
                    'The npm Registry: Cloud hosting for packages',
                    'Scripting: Running CLI tools via npm scripts'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between `^1.2.3` and `~1.2.3` in package.json?', hint: 'Caret allows minor updates; Tilde only allow patch updates.', difficulty: 'hard' },
                    { question: 'Why should you NEVER edit the `node_modules` folder manually?', hint: 'It is generated and can be overwritten at any time by the package manager.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Keep your dependencies up to date but avoid using "latest" which can break things.',
                    'Always use a lockfile and commit it to version control.',
                    'Use `npm ci` for automated builds (clean install).'
                ]
            }
        },

        'npm': {
            id: 'npm',
            label: 'npm',
            description: 'Node Package Manager - the default and most widely used package manager for the JavaScript ecosystem.',
            parentId: 'package-managers',
            resources: [
                { type: 'documentation', title: 'npm Docs - Official Reference', url: 'https://docs.npmjs.com/', isFree: true },
                { type: 'video', title: 'NPM in 100 Seconds', url: 'https://www.youtube.com/watch?v=2V1U8_Wf4kE', isFree: true }
            ],
            content: {
                overview: `npm is the default package manager for Node.js. It consists of a command-line client and an online database of public and paid-for private packages.

### 1. Key Commands
- \`npm init\`: Initializes a new project.
- \`npm install\`: Installs dependencies.
- \`npm run <script>\`: Runs a script from package.json.

### 2. The Ecosystem
With over 2 million packages, npm is the largest software registry in the world. It enables "Lego-like" development where you can piece together functionality from existing blocks.`,
                keyConcepts: [
                    'npm CLI',
                    'The Registry',
                    'Scoping (@org/package)',
                    'npx: The package runner'
                ],
                bestPractices: [
                    'Use `npm audit` to check for security vulnerabilities.',
                    'Understand semantic versioning (major.minor.patch).'
                ]
            }
        },

        'yarn': {
            id: 'yarn',
            label: 'Yarn & pnpm',
            description: 'Modern alternatives to npm that offer faster speeds, better security, and more efficient dependency storage.',
            parentId: 'package-managers',
            resources: [
                { type: 'documentation', title: 'Yarn - Official Site', url: 'https://yarnpkg.com/', isFree: true },
                { type: 'documentation', title: 'pnpm - Official Site', url: 'https://pnpm.io/', isFree: true }
            ],
            content: {
                overview: `Yarn and pnpm were created to solve speed and reliability issues in early versions of npm.

### 1. pnpm: The Disk-Saver
pnpm uses hard links and symlinks to save one copy of a dependency globally, rather than duplicating it in every project's \`node_modules\`.

### 2. Yarn Berry
The modern version of Yarn (v2+) introduced **Plug\'n\'Play**, which aims to eliminate \`node_modules\` entirely by informing the runtime where to find packages.`,
                keyConcepts: [
                    'Content-addressable storage (pnpm)',
                    'Plug\'n\'Play (Yarn)',
                    'Workspaces (Monorepos)'
                ]
            }
        },

        'frameworks': {
            id: 'frameworks',
            label: 'Pick a Framework',
            description: 'JavaScript frameworks provide structure and tools for building complex single-page applications. Choose one to master: React, Vue, or Angular.',
            children: ['react', 'vue', 'angular'],
            resources: [
                { type: 'article', title: 'React vs Vue vs Angular', url: 'https://www.freecodecamp.org/news/angular-vs-react-vs-vue-a-complete-comparison-8fc0788d6801/', isFree: true },
            ],
        },

        'react': {
            id: 'react',
            label: 'React',
            description: 'Mastering the most popular JavaScript library for building component-based user interfaces and single-page applications.',
            parentId: 'frameworks',
            children: ['react-hooks', 'state-management', 'react-router'],
            resources: [
                { type: 'documentation', title: 'React Documentation (New)', url: 'https://react.dev/', isFree: true },
                { type: 'video', title: 'React Course 2025 - Beginner to Pro', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk', isFree: true }
            ],
            content: {
                overview: `React is a declarative library for building user interfaces. It uses a **Virtual DOM** to efficiently update the UI and follows a **Component-Based** architecture.

### 1. Thinking in React
In React, you build small, reusable components. Instead of talking to the browser directly (imperative), you describe what you want the UI to look like based on the current state (declarative).

### 2. Hooks and State
Hooks like \`useState\` and \`useEffect\` allow you to track data and perform side effects in functional components.`,
                keyConcepts: [
                    'Components and Props',
                    'JSX (JavaScript XML)',
                    'State and Hooks',
                    'Virtual DOM'
                ],
                bestPractices: [
                    'Keep components small.',
                    'Use functional components and hooks.',
                    'Avoid frequent state updates in top-level components.'
                ]
            }
        },

        'vue': {
            id: 'vue',
            label: 'Vue.js',
            description: 'Progressive JavaScript framework for building user interfaces with a gentle learning curve and excellent documentation.',
            parentId: 'frameworks',
            resources: [
                { type: 'documentation', title: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', isFree: true },
                { type: 'video', title: 'Vue.js Course for Beginners', url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', isFree: true }
            ],
            content: {
                overview: `Vue is the "progressive framework." You can use it as a simple script tag or build complex SPAs with it.

### 1. Templates vs. Render Functions
Vue uses an HTML-based template syntax that is easy for developers coming from traditional HTML/CSS backgrounds to pick up.

### 2. Reactivity
Vue's reactivity system automatically tracks dependencies and updates the DOM when data changes.`
            }
        },

        'angular': {
            id: 'angular',
            label: 'Angular',
            description: 'A platform and framework for building single-page client applications using HTML and TypeScript, maintained by Google.',
            parentId: 'frameworks',
            resources: [
                { type: 'documentation', title: 'Angular Official Docs', url: 'https://angular.io/docs', isFree: true },
                { type: 'course', title: 'Angular - The Complete Guide', url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/', isFree: false }
            ],
            content: {
                overview: `Angular is a comprehensive "batteries-included" framework. It provides everything from routing to HTTP clients out of the box.

### 1. Modules and Components
Angular uses a module-based architecture (\`NgModule\`) to organize code. It heavily relies on **TypeScript** and **Decorators**.

### 2. Dependency Injection
One of Angular's most powerful features is its built-in Dependency Injection system, making code modular and testable.`
            }
        },

        // ─── React Sub-topics ───
        'react-hooks': {
            id: 'react-hooks',
            label: 'React Hooks',
            description: 'Hooks let you use state and other React features in functional components. Master useState, useEffect, useContext, useReducer, useMemo, and custom hooks.',
            parentId: 'react',
            resources: [
                { type: 'documentation', title: 'React Hooks Reference', url: 'https://react.dev/reference/react/hooks', isFree: true },
                { type: 'video', title: 'React Hooks Course', url: 'https://www.youtube.com/watch?v=LlvBzyy-558', isFree: true }
            ],
            content: {
                overview: `Hooks were introduced in React 16.8 to allow functional components to use state and other React features. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.

### 1. The Big Two: useState & useEffect
- **useState**: Allows you to add state to your components.
- **useEffect**: Allows you to perform side effects (fetching data, subscriptions, or manually changing the DOM).

### 2. Performance Hooks
- **useMemo**: Returns a memoized value.
- **useCallback**: Returns a memoized callback function.

Using hooks effectively leads to flatter component trees and better code reuse through **Custom Hooks**.`,
                keyConcepts: [
                    'Rules of Hooks',
                    'State Management with useState',
                    'Side Effects with useEffect',
                    'Context with useContext',
                    'Performance optimization with useMemo/useCallback',
                    'References with useRef',
                    'Complex state with useReducer'
                ]
            }
        },

        'state-management': {
            id: 'state-management',
            label: 'State Management',
            description: 'Manage complex application state with libraries like Redux, Zustand, Jotai, or React Context API.',
            parentId: 'react',
            resources: [
                { type: 'documentation', title: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/', isFree: true },
                { type: 'documentation', title: 'Zustand', url: 'https://zustand-demo.pmnd.rs/', isFree: true },
                { type: 'video', title: 'React State Management Guide 2025', url: 'https://www.youtube.com/watch?v=5yEG6GhoJBs', isFree: true }
            ],
            content: {
                overview: `As applications grow, passing data through many layers of components (prop drilling) becomes unmanageable. State management libraries provide a centralized "store" for your data.

### 1. Redux & Toolkit
The industry standard for large-scale apps. Redux Toolkit (RTK) is the recommended way to write Redux today, providing a simplified API.

### 2. Zustand & Jotai
Modern, lightweight alternatives. **Zustand** is a favorite for its simplicity and small bundle size, while **Jotai** takes an "atomic" approach to state.`
            }
        },

        'react-router': {
            id: 'react-router',
            label: 'React Router',
            description: 'Client-side routing for React applications. Learn route configuration, navigation, dynamic routes, and protected routes.',
            parentId: 'react',
            resources: [
                { type: 'documentation', title: 'React Router Docs', url: 'https://reactrouter.com/', isFree: true },
            ],
            content: {
                overview: `React Router is the standard library for routing in React. It enables the creation of Single Page Applications (SPAs) with navigation that doesn't require a page reload.

### 1. Declarative Routing
You define your routes using components like \`<Route>\` and \`<Routes>\`.

### 2. Dynamic Routing
Use parameters like \`:id\` to create routes that match patterns, allowing you to build pages for specific products, users, or articles.`
            }
        },

        // ─── LEVEL 5: Build Tools ───
        'build-tools': {
            id: 'build-tools',
            label: 'Build Tools',
            description: 'Module bundlers and build tools like Vite, Webpack, and esbuild that compile, bundle, and optimize your code for production.',
            children: ['vite', 'webpack'],
            resources: [
                { type: 'article', title: 'Understanding Build Tools', url: 'https://www.freecodecamp.org/news/making-sense-of-front-end-build-tools-3a1b3a87043b/', isFree: true },
            ],
            content: {
                overview: `Browsers don't understand things like JSX, TypeScript, or modern CSS modules directly. Build tools bridge this gap by transforming and bundling your code.

### 1. Bundling
The process of taking hundreds of small files and combining them into a few highly optimized files for the browser.

### 2. Development Servers
Tools like Vite provide a development server with **Hot Module Replacement (HMR)**, allowing you to see changes instantly without refreshing the page.`
            }
        },

        'vite': {
            id: 'vite',
            label: 'Vite',
            description: 'Next-generation frontend build tool featuring instant server start, lightning-fast HMR, and optimized builds.',
            parentId: 'build-tools',
            resources: [
                { type: 'documentation', title: 'Vite Guide', url: 'https://vitejs.dev/guide/', isFree: true },
            ],
            content: {
                overview: `Vite (French for "fast") is the modern successor to tools like Webpack. It leverages native ES modules in the browser during development to provide nearly instant startup times.

### 1. The Speed Advantage
Unlike Webpack which bundles your entire app before starting the server, Vite only serves the code you are actually looking at.

### 2. Production Power
For production, Vite uses **Rollup**, ensuring your final bundle is as small and fast as possible.`
            }
        },

        'webpack': {
            id: 'webpack',
            label: 'Webpack',
            description: 'The most popular module bundler. Processes modules with loaders and plugins to create optimized bundles.',
            parentId: 'build-tools',
            resources: [
                { type: 'documentation', title: 'Webpack Documentation', url: 'https://webpack.js.org/', isFree: true },
            ],
            content: {
                overview: `Webpack is the "OG" of module bundlers. It is highly configurable and has a massive ecosystem of loaders and plugins.

### 1. Loaders
Loaders allow Webpack to process non-JavaScript files (like CSS, images, or TypeScript) and turn them into modules.

### 2. Plugins
Plugins can perform a wide range of tasks, from bundle optimization to environment variable injection.`
            }
        },

        // ─── LEVEL 5: Testing ───
        'testing': {
            id: 'testing',
            label: 'Testing',
            description: 'Ensure code quality with unit tests, integration tests, and end-to-end tests using frameworks like Jest, Vitest, and Cypress.',
            children: ['jest-vitest', 'e2e-testing'],
            resources: [
                { type: 'article', title: 'Testing JavaScript', url: 'https://testingjavascript.com/', isFree: false },
            ],
            content: {
                overview: `Automated testing gives you the confidence to refactor code and add new features without breaking existing functionality.

### 1. Unit Testing
Testing the smallest parts of your application (like a single function) in isolation.

### 2. Integration Testing
Testing how different parts of your application work together.

### 3. End-to-End (E2E) Testing
Testing the entire application flow from the user's perspective in a real browser.`
            },
            dayWisePlan: [
                { day: 1, title: 'Unit Testing', description: 'Test individual functions and components.', tasks: ['Set up Jest or Vitest', 'Write test cases with assertions', 'Test React components with Testing Library'] },
                { day: 2, title: 'E2E Testing', description: 'Test complete user flows.', tasks: ['Set up Cypress or Playwright', 'Write E2E tests for login and navigation flows', 'Run tests in CI/CD pipeline'] },
            ]
        },

        'jest-vitest': {
            id: 'jest-vitest',
            label: 'Jest / Vitest',
            description: 'Unit and integration testing frameworks for JavaScript. Vitest is optimized for Vite projects.',
            parentId: 'testing',
            resources: [
                { type: 'documentation', title: 'Jest Docs', url: 'https://jestjs.io/', isFree: true },
                { type: 'documentation', title: 'Vitest Docs', url: 'https://vitest.dev/', isFree: true },
            ],
        },

        'e2e-testing': {
            id: 'e2e-testing',
            label: 'Cypress / Playwright',
            description: 'End-to-end testing frameworks that simulate real user interactions in the browser.',
            parentId: 'testing',
            resources: [
                { type: 'documentation', title: 'Cypress Docs', url: 'https://docs.cypress.io/', isFree: true },
                { type: 'documentation', title: 'Playwright Docs', url: 'https://playwright.dev/', isFree: true },
            ],
        },

        // ─── LEVEL 6: TypeScript ───
        'typescript': {
            id: 'typescript',
            label: 'TypeScript',
            description: 'A strongly typed superset of JavaScript that adds static types, interfaces, generics, and better IDE support. Essential for large-scale applications.',
            children: ['ts-basics', 'ts-generics'],
            resources: [
                { type: 'documentation', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', isFree: true },
                { type: 'video', title: 'TypeScript Full Course', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', isFree: true },
                { type: 'course', title: 'Understanding TypeScript', url: 'https://www.udemy.com/course/understanding-typescript/', isFree: false },
            ],
            content: {
                overview: `TypeScript is "JavaScript with syntax for types." It is a strongly typed, object-oriented, compiled language developed and maintained by Microsoft.

### 1. The Value of Static Typing
Unlike JavaScript where you only find out a variable is undefined at runtime, TypeScript catches these errors while you are writing the code. This makes refactoring significantly safer and easier.

### 2. Modern Tooling
Because TypeScript understands your code's structure, it provides superior path completion, documentation-on-hover, and automated refactoring tools in IDEs like VS Code.`,
                keyConcepts: [
                    'Type Annotations and Inference',
                    'Interfaces and Type Aliases',
                    'Enums and Tuples',
                    'Generics and Reusability',
                    'Strict Mode and Type Checking',
                    'Decorators (Advanced)'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'TypeScript Basics', description: 'Types, interfaces, and configuration.', tasks: ['Set up TypeScript in a project', 'Learn type annotations and inference', 'Define interfaces and type aliases'] },
                { day: 2, title: 'Advanced Types', description: 'Generics, unions, and utility types.', tasks: ['Learn union and intersection types', 'Understand generics and type constraints', 'Use utility types (Partial, Required, Pick, Omit)'] },
            ]
        },

        'ts-basics': {
            id: 'ts-basics',
            label: 'TS Basics & Config',
            description: 'Learn TypeScript fundamentals: types, interfaces, enums, and tsconfig.json configuration.',
            parentId: 'typescript',
            resources: [
                { type: 'documentation', title: 'TSConfig Reference', url: 'https://www.typescriptlang.org/tsconfig', isFree: true },
            ],
            content: {
                overview: `To start with TypeScript, you need to understand how to annotate variables and configure the compiler (\`tsc\`).

### 1. Primitive Types
Learn how to use \`string\`, \`number\`, \`boolean\`, and \`any\` (though you should avoid \`any\`!).

### 2. The \`tsconfig.json\`
This file is the heart of any TypeScript project. It controls which files are included, where the compiled JavaScript goes, and how strict the type-checking should be.`
            }
        },

        'ts-generics': {
            id: 'ts-generics',
            label: 'Generics & Utility Types',
            description: 'Advanced TypeScript features for writing reusable, type-safe code.',
            parentId: 'typescript',
            resources: [
                { type: 'article', title: 'TypeScript Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', isFree: true },
            ],
            content: {
                overview: `Generics are to types what parameters are to functions. They allow you to create components that work over a variety of types rather than a single one.

### 1. Generic Functions & Classes
Learn how to use \`<T>\` to make your code more flexible and reusable while maintaining type safety.

### 2. Utility Types
TypeScript provides built-in helpers like \`Partial\`, \`Pick\`, \`Omit\`, and \`Readonly\` to transform types into new ones without duplication.`
            }
        },

        // ─── LEVEL 7: SSR / Meta-Frameworks ───
        'meta-frameworks': {
            id: 'meta-frameworks',
            label: 'Meta-Frameworks',
            description: 'Full-stack frameworks like Next.js, Nuxt.js, and Remix that provide SSR, SSG, routing, and data fetching out of the box.',
            children: ['nextjs', 'remix'],
            resources: [
                { type: 'article', title: 'SSR vs SSG vs ISR', url: 'https://www.smashingmagazine.com/2021/05/complete-nextjs-modern-react-applications/', isFree: true },
            ],
            content: {
                overview: `Meta-frameworks take a base library (like React or Vue) and add opinionated solutions for routing, data fetching, and rendering.

### 1. SSR (Server-Side Rendering)
Pages are generated on the server for every request. This is great for dynamic content and SEO.

### 2. SSG (Static Site Generation)
Pages are generated at build time. This results in the fastest possible load times but is less suitable for data that changes frequently.`
            }
        },

        'nextjs': {
            id: 'nextjs',
            label: 'Next.js',
            description: 'Mastering the industry-standard React framework for high-performance, full-stack web applications.',
            parentId: 'meta-frameworks',
            resources: [
                { type: 'documentation', title: 'Next.js Documentation', url: 'https://nextjs.org/docs', isFree: true },
                { type: 'article', title: 'Next.js App Router vs Pages Router', url: 'https://nextjs.org/docs/app', isFree: true },
                { type: 'video', title: 'Next.js 15 Full Course (2025)', url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', isFree: true },
                { type: 'article', title: 'Server Components Deep Dive', url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components', isFree: true },
                { type: 'course', title: 'Next.js & React - Complete Guide (Udemy)', url: 'https://www.udemy.com/course/nextjs-react-the-complete-guide/', isFree: false }
            ],
            content: {
                overview: 'Next.js is a powerful React framework that enables server-side rendering, static site generation, and full-stack capabilities out of the box. It optimizes your application for performance, SEO, and developer experience by handling the heavy lifting of routing, bundling, and rendering. \n\nWith the introduction of the App Router and React Server Components, Next.js has redefined how we build modern web apps—allowing for incredibly fast page loads by rendering components on the server and sending minimal JavaScript to the client.',
                keyConcepts: [
                    'App Router: File-system based routing (layout, page, loading)',
                    'Server Components (RSC): Default rendering on the server',
                    'Client Components: Opt-in interactivity with "use client"',
                    'Data Fetching: Server-side fetching with async/await',
                    'Rendering Strategies: SSR, Static (SSG), and Dynamic (ISR)',
                    'Middleware: Edge-side logic for auth and redirects',
                    'Next.js APIs: Images, Fonts, and Script optimization',
                    'API Routes: Full-stack backend logic within Next.js'
                ],
                codeExamples: [
                    {
                        title: 'Next.js Server Component Fetch',
                        language: 'tsx',
                        code: '// Default is a Server Component\nexport default async function Page() {\n  const res = await fetch("https://api.example.com/data");\n  const data = await res.json();\n\n  return (\n    <main>\n      <h1>{data.title}</h1>\n      <p>{data.content}</p>\n    </main>\n  );\n}'
                    },
                    {
                        title: 'Nested Layout Structure',
                        language: 'tsx',
                        code: 'export default function DashboardLayout({\n  children\n}: { children: React.ReactNode }) {\n  return (\n    <section className="dashboard-wrapper">\n      <nav>Sidebar</nav>\n      {children}\n    </section>\n  );\n}'
                    }
                ],
                practiceQuestions: [
                    { question: 'What is the "App Router" and how does it differ from "Pages Router"?', hint: 'File-based vs Nested routing with Server Components.', difficulty: 'medium' },
                    { question: 'When should you use "use client"?', hint: 'For hooks, event listeners, or browser-only APIs.', difficulty: 'easy' },
                    { question: 'Explain the difference between SSR and Static Generation.', hint: 'Run on every request vs Build time.', difficulty: 'medium' },
                    { question: 'What are React Server Components (RSC)?', hint: 'Components that stay on the server and never hydrate on the client.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Fetch data as close to where it\'s used as possible (Co-location).',
                    'Keep "use client" leaf components as small as possible.',
                    'Use the `<Image />` component for automatic optimization.',
                    'Utilize `loading.tsx` and `error.tsx` for professional UX.',
                    'Prefer Server Actions for mutations over manual API routes when possible.',
                    'Implement "Streaming" with Suspense for slow data fetches.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'App Router & Routing', description: 'The new way to route.', tasks: ['Learn nested routes: page, layout, loading components', 'Understand dynamic routes [id]', 'Practice navigation with <Link> and useRouter'] },
                { day: 2, title: 'Server vs Client Components', description: 'Rendering mastery.', tasks: ['Understand the "Server-only" code principle', 'Practice using "use client" sparingly', 'Pass data from Server to Client components'] },
                { day: 3, title: 'Data Fetching & SEO', description: 'Speed and Visibility.', tasks: ['Learn caching and revalidation signatures', 'Configure generateMetadata for dynamic SEO', 'Build a fully SSR page with high performance'] },
            ]
        },

        'remix': {
            id: 'remix',
            label: 'Remix',
            description: 'A full-stack web framework focused on web standards and modern web app UX with nested routes and data loading.',
            parentId: 'meta-frameworks',
            resources: [
                { type: 'documentation', title: 'Remix Docs', url: 'https://remix.run/docs/', isFree: true },
            ],
            content: {
                overview: `Remix is a full-stack web framework that lets you focus on user interface and work back through web standards to deliver a fast, slick, and resilient user experience.

### 1. Progressive Enhancement
Remix applications work even without JavaScript, using standard HTML forms and links for data mutations and navigation.

### 2. Data Loading
Remix uses \`loader\` functions that run on the server to fetch data, ensuring that your components only receive the data they need.`
            }
        },

        // ─── LEVEL 8: Performance & Security ───
        'web-performance': {
            id: 'web-performance',
            label: 'Web Performance',
            description: 'Optimize your web app for speed. Learn about Core Web Vitals, lazy loading, code splitting, caching strategies, and performance auditing tools.',
            resources: [
                { type: 'article', title: 'Web Performance - web.dev', url: 'https://web.dev/performance/', isFree: true },
                { type: 'article', title: 'Core Web Vitals', url: 'https://web.dev/vitals/', isFree: true },
                { type: 'article', title: 'Lighthouse Performance Scoring', url: 'https://web.dev/performance-scoring/', isFree: true },
            ],
            content: {
                overview: `Performance refers to how fast your website loads and how responsive it is to user interactions.

### 1. Core Web Vitals
Three metrics Google uses to measure user experience:
- **LCP (Largest Contentful Paint)**: Loading speed.
- **FID (First Input Delay)**: Interactivity.
- **CLS (Cumulative Layout Shift)**: Visual stability.

### 2. Optimization Techniques
- **Lazy Loading**: Only load images or components when they are needed.
- **Code Splitting**: Break your JavaScript bundle into smaller chunks.`
            },
            dayWisePlan: [
                { day: 1, title: 'Performance Optimization', description: 'Make your website fast.', tasks: ['Audit with Lighthouse and PageSpeed Insights', 'Implement lazy loading for images and components', 'Optimize bundle size with code splitting'] },
            ]
        },

        'web-security': {
            id: 'web-security',
            label: 'Web Security',
            description: 'Protect your applications from common vulnerabilities: XSS, CSRF, CORS, Content Security Policy, and OWASP Top 10.',
            resources: [
                { type: 'article', title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', isFree: true },
                { type: 'article', title: 'MDN - Web Security', url: 'https://developer.mozilla.org/en-US/docs/Web/Security', isFree: true },
            ],
            content: {
                overview: `Web security is the most critical part of web development. As a developer, you are responsible for protecting user data.

### 1. Cross-Site Scripting (XSS)
A vulnerability where attackers inject malicious scripts into web pages viewed by other users.

### 2. CSRF (Cross-Site Request Forgery)
An attack that forces an authenticated user to execute unwanted actions on a web application in which they are currently authenticated.`
            },
            dayWisePlan: [
                { day: 1, title: 'Security Fundamentals', description: 'Secure your web applications.', tasks: ['Understand XSS and how to prevent it', 'Learn about CSRF tokens and SameSite cookies', 'Implement Content Security Policy headers'] },
            ]
        },

        // ─── LEVEL 9: Deployment ───
        'deployment': {
            id: 'deployment',
            label: 'Deployment',
            description: 'Deploy your frontend applications to the web using platforms like Vercel, Netlify, GitHub Pages, or cloud services like AWS and Cloudflare.',
            children: ['vercel', 'netlify'],
            resources: [
                { type: 'article', title: 'How to Deploy a Website', url: 'https://www.freecodecamp.org/news/how-to-deploy-a-website/', isFree: true },
            ],
            content: {
                overview: `Deployment is the process of making your web application accessible on the internet.

### 1. CI/CD
Continuous Integration and Continuous Deployment automate the process of testing and deploying your code whenever you push changes.

### 2. Static vs. Dynamic Hosting
Traditional static hosting (like GitHub Pages) is enough for simple sites, but modern SPAs often need serverless functions or edge computing provided by platforms like Vercel.`
            }
        },

        'vercel': {
            id: 'vercel',
            label: 'Vercel',
            description: 'The platform for frontend developers, providing hosting for static sites, SSR apps, and serverless functions with automatic CI/CD.',
            parentId: 'deployment',
            resources: [
                { type: 'documentation', title: 'Vercel Documentation', url: 'https://vercel.com/docs', isFree: true },
            ],
            content: {
                overview: `Vercel is the creator of Next.js and provides the best hosting experience for it.

### 1. Integrated CI/CD
Whenever you push to Git, Vercel automatically builds a preview version of your site and deploys it.

### 2. Edge Functions
Vercel allows you to run code at the "edge" (close to the user), resulting in extremely low latency.`
            }
        },

        'netlify': {
            id: 'netlify',
            label: 'Netlify',
            description: 'An intuitive platform for deploying modern web apps with continuous deployment, serverless functions, and form handling.',
            parentId: 'deployment',
            resources: [
                { type: 'documentation', title: 'Netlify Docs', url: 'https://docs.netlify.com/', isFree: true },
            ],
            content: {
                overview: `Netlify is a powerful platform for the modern web (Jamstack).

### 1. Simple Deployment
Drag and drop your project folder or connect your Git repository.

### 2. Additional Services
Netlify provides easy-to-use services for forms, identity (authentication), and serverless functions.`
            }
        },
    }
};
