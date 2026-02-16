
import { RoadmapTrack } from './types';

export const frontendBeginnerRoadmap: RoadmapTrack = {
    id: 'frontend-beginner',
    title: 'Frontend Beginner',
    description: 'Start your journey into web development with the absolute basics',
    category: 'beginner',
    icon: '👶',
    accentColor: '#fef08a',
    rootNodeId: 'fb-root',
    nodes: {
        'fb-root': {
            id: 'fb-root',
            label: 'Frontend Basics',
            description: 'The absolute starting point for any web developer: HTML, CSS, and JavaScript.',
            children: ['fb-html', 'fb-css', 'fb-js'],
            resources: [
                { type: 'article', title: 'MDN: Getting started with the web', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web', isFree: true },
                { type: 'video', title: 'HTML & CSS Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=D-h8L5hgW-w', isFree: true },
                { type: 'article', title: 'Frontend Developer Roadmap', url: 'https://roadmap.sh/frontend', isFree: true }
            ],
            content: {
                overview: 'Frontend development is about building what users see and interact with on a website. It represents the "client-side" of web development. The three core technologies are HTML (structure), CSS (style), and JavaScript (interactivity). Before jumping into frameworks like React or tools like Tailwind, you must master these fundamentals. A strong foundation here makes learning everything else much easier. You will learn how the web works, how browsers render pages, and how to build responsive, accessible websites from scratch.',
                keyConcepts: [
                    'How the internet works: HTTP, DNS, Browsers',
                    'HTML for semantic structure',
                    'CSS for layout and design',
                    'JavaScript for logic and interactivity',
                    'The DOM (Document Object Model)',
                    'Responsive design for mobile devices',
                    'Web accessibility (a11y)',
                    'Developer tools (Console, Inspector)'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between HTML, CSS, and JavaScript?', hint: 'Analogy: HTML is the skeleton (structure), CSS is the skin/clothing (style), and JavaScript is the muscles (movement/logic).', difficulty: 'easy' },
                    { question: 'What is a "responsive" website?', hint: 'A site that adjusts its layout and content to look good on any screen size (mobile, tablet, desktop).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Focus on fundamentals before frameworks.',
                    'Write semantic HTML (use <button> not <div> for buttons).',
                    'Learn to use the browser developer tools early.',
                    'Build real projects, do not just watch tutorials.',
                    'Test your websites on your phone, not just your laptop.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'How the Web Works', description: 'Understanding the ecosystem.', tasks: ['Read about client-server model', 'Understand HTTP requests and responses', 'Learn what a domain name and DNS are'] },
                { day: 2, title: 'Your First Page', description: 'Writing HTML.', tasks: ['Install VS Code', 'Create an index.html file', 'Add headings, paragraphs, and lists'] },
                { day: 3, title: 'Styling with CSS', description: 'Making it look good.', tasks: ['Link a CSS file to your HTML', 'Change colors and fonts', 'Understand the box model (margin, border, padding)'] }
            ]
        },
        'fb-html': {
            id: 'fb-html',
            label: 'HTML',
            description: 'HyperText Markup Language: the skeleton of every web page.',
            parentId: 'fb-root',
            resources: [
                { type: 'documentation', title: 'MDN HTML Elements Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', isFree: true }
            ],
            content: {
                overview: 'HTML (HyperText Markup Language) provides the structure for web pages. It uses "tags" to define elements like headings, paragraphs, images, links, and forms. Semantic HTML means using the correct tag for the content (e.g., <nav> for navigation, <article> for posts), which improves accessibility for screen readers and SEO for search engines. You do not need to memorize every tag, but you should know the most common 20-30 tags and how to structure a document properly.',
                keyConcepts: [
                    'Document structure: <!DOCTYPE html>, <html>, <head>, <body>',
                    'Text tags: <h1>-<h6>, <p>, <span>, <strong>, <em>',
                    'Container tags: <div>, <section>, <article>, <nav>, <header>, <footer>',
                    'Media: <img>, <video>, <audio>',
                    'Links and interaction: <a>, <button>',
                    'Lists: <ul>, <ol>, <li>',
                    'Forms: <form>, <input>, <label>, <textarea>, <select>',
                    'Attributes: id, class, src, href, alt'
                ],
                practiceQuestions: [
                    { question: 'Why is the "alt" attribute important on images?', hint: 'It describes the image to screen readers for blind users and displays text if the image fails to load.', difficulty: 'easy' },
                    { question: 'What is the difference between a <div> and a <section>?', hint: '<div> is a generic container. <section> is a semantic element meaning a standalone section of content.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always close your tags.',
                    'Use semantic elements whenever possible.',
                    'Keep your code indented and readable.',
                    'Use lowercase for tag names and attributes.'
                ]
            }
        },
        'fb-css': {
            id: 'fb-css',
            label: 'CSS',
            description: 'Cascading Style Sheets: controlling layout, colors, and fonts.',
            parentId: 'fb-root',
            resources: [
                { type: 'article', title: 'A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', isFree: true }
            ],
            content: {
                overview: 'CSS (Cascading Style Sheets) determines how HTML elements look. You use selectors (like tag names, classes, or IDs) to target elements and apply properties (like color, font-size, margin). The "Cascading" part means that styles can be overwritten by more specific rules. The Box Model is crucial: every element is a box with content, padding, border, and margin. Modern CSS layout relies heavily on Flexbox (for one-dimensional layouts) and Grid (for two-dimensional layouts). Media queries allow you to create responsive designs that adapt to different screen sizes.',
                keyConcepts: [
                    'Selectors: element, .class, #id, *',
                    'The Box Model: content, padding, border, margin',
                    'Display property: block, inline, inline-block, none',
                    'Flexbox: justify-content, align-items, flex-direction',
                    'CSS Grid: grid-template-columns, gap',
                    'Positioning: static, relative, absolute, fixed, sticky',
                    'Units: px, rem, em, %, vh, vw',
                    'Media queries for responsiveness'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between class and ID selectors?', hint: 'Classes (.name) can be used on multiple elements. IDs (#name) must be unique on the page. IDs have higher specificity.', difficulty: 'easy' },
                    { question: 'What is the Box Model?', hint: 'The concept that every element is a rectangular box consisting of content, padding, border, and margin.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use classes for styling, not IDs (IDs are for JS hooks or anchors).',
                    'Use a CSS reset or normalizer to remove browser defaults.',
                    'Use "rem" units for font sizes instead of "px" for accessibility.',
                    'Learn Flexbox deeply — it is the most used layout tool.'
                ]
            }
        },
        'fb-js': {
            id: 'fb-js',
            label: 'JavaScript',
            description: 'The programming language of the web.',
            parentId: 'fb-root',
            resources: [
                { type: 'documentation', title: 'JavaScript.info', url: 'https://javascript.info/', isFree: true }
            ],
            content: {
                overview: 'JavaScript is the only programming language that runs natively in the browser. It allows you to make web pages interactive: responding to clicks, fetching data from servers, validating forms, and animating elements. You interact with the HTML via the DOM (Document Object Model). Modern JavaScript (ES6+) includes powerful features like arrow functions, destructuring, template literals, and modules. Unlike HTML/CSS, JavaScript is a full programming language with variables, loops, functions, and logic. It is the most popular language in the world.',
                keyConcepts: [
                    'Variables: let, const (avoid var)',
                    'Data types: string, number, boolean, null, undefined, object, array',
                    'Functions: declarations, expressions, arrow functions',
                    'Control flow: if/else, loops, switch',
                    'DOM manipulation: querySelector, addEventListener, innerText',
                    'Events: click, submit, change, hover',
                    'Asynchronous JS: callbacks, promises, async/await',
                    'ES6+ features: destructuring, spread operator, template literals'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between == and ===?', hint: '== checks value only (allowing type coercion). === checks both value and type (strict equality). Always use ===.', difficulty: 'medium' },
                    { question: 'What is the DOM?', hint: 'The Document Object Model. It is a tree-like representation of the HTML page that JavaScript can read and modify.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Always use "const" by default, "let" if you need to reassign. Never use "var".',
                    'Use meaningful variable names.',
                    'Keep functions small and focused on one task.',
                    'Learn to debug with `console.log` and the browser debugger.'
                ]
            }
        }
    }
};
