// Web Technology Seed Data — Enriched
export const webTechnologyTopics = [
    {
        title: "How the Web Works (HTTP/HTTPS)",
        slug: "how-web-works",
        description: "The Request-Response cycle, DNS, and IP.",
        order: 1, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# How the Web Works

## 1. The Client-Server Model
- **Client**: Your browser (Chrome, Safari) — sends requests.
- **Server**: A remote computer — processes requests and sends responses.

## 2. The Journey of a Web Request
1. **URL Entry**: You type \\\`google.com\\\`.
2. **DNS Lookup**: Browser queries DNS to resolve domain → IP (e.g., \\\`142.250.190.46\\\`).
3. **TCP Handshake**: 3-way handshake (SYN → SYN-ACK → ACK) establishes connection.
4. **TLS Handshake** (HTTPS): Negotiates encryption keys for secure communication.
5. **HTTP Request**: Browser sends \\\`GET /index.html HTTP/1.1\\\`.
6. **HTTP Response**: Server sends \\\`200 OK\\\` + HTML content.
7. **Rendering**: Browser parses HTML → fetches CSS/JS → paints the page.

## 3. HTTP Methods

| Method | Purpose | Idempotent? |
|--------|---------|-------------|
| **GET** | Retrieve data | Yes |
| **POST** | Create new resource | No |
| **PUT** | Replace entire resource | Yes |
| **PATCH** | Partially update resource | No |
| **DELETE** | Remove resource | Yes |
| **OPTIONS** | Check allowed methods (CORS preflight) | Yes |

## 4. HTTP Status Codes

| Range | Category | Examples |
|-------|---------|---------|
| 1xx | Informational | 101 Switching Protocols |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| 5xx | Server Error | 500 Internal Server Error, 503 Service Unavailable |

## 5. HTTP/1.1 vs HTTP/2 vs HTTP/3

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---------|---------|--------|--------|
| Protocol | TCP | TCP | QUIC (UDP) |
| Multiplexing | No (one request at a time per connection) | Yes (multiple streams) | Yes |
| Header Compression | No | HPACK | QPACK |
| Server Push | No | Yes | Yes |
`, resources: []
    },
    {
        title: "HTML5: Semantic Structure",
        slug: "html5-semantics",
        description: "Meaningful markup for accessibility and SEO.",
        order: 2, estimatedMinutes: 45, difficulty: "Easy",
        content: `
# HTML5 Semantic Structure

Semantic HTML uses elements that describe their **meaning** rather than just their appearance.

## 1. Semantic vs Non-Semantic Elements

| Semantic | Non-Semantic |
|---------|-------------|
| \\\`<header>\\\`, \\\`<nav>\\\`, \\\`<main>\\\`, \\\`<article>\\\` | \\\`<div>\\\`, \\\`<span>\\\` |
| Meaningful to browsers, screen readers, search engines | No inherent meaning |

## 2. Key Semantic Elements

| Element | Purpose |
|---------|---------|
| \\\`<header>\\\` | Page or section header (logo, nav) |
| \\\`<nav>\\\` | Navigation links |
| \\\`<main>\\\` | Primary content (one per page) |
| \\\`<article>\\\` | Self-contained content (blog post, product card) |
| \\\`<section>\\\` | Thematic grouping of content |
| \\\`<aside>\\\` | Sidebar, related content |
| \\\`<footer>\\\` | Page or section footer |
| \\\`<figure>\\\` + \\\`<figcaption>\\\` | Image with caption |
| \\\`<time>\\\` | Machine-readable date/time |

## 3. HTML5 APIs

| API | Purpose |
|-----|---------|
| **Canvas** | 2D drawing and animation |
| **Geolocation** | Get user's GPS coordinates |
| **Web Storage** | localStorage and sessionStorage |
| **Web Workers** | Background threads for heavy computation |
| **Drag & Drop** | Native drag-and-drop interactions |
| **WebSocket** | Real-time bidirectional communication |

## 4. Forms in HTML5
New input types: \\\`email\\\`, \\\`tel\\\`, \\\`url\\\`, \\\`date\\\`, \\\`number\\\`, \\\`range\\\`, \\\`color\\\`.
Built-in validation: \\\`required\\\`, \\\`pattern\\\`, \\\`min/max\\\`, \\\`minlength/maxlength\\\`.

## 5. Why Semantic HTML Matters
- **Accessibility**: Screen readers can navigate by landmarks (header, nav, main)
- **SEO**: Search engines better understand your content structure
- **Maintainability**: Code is self-documenting
`, resources: []
    },
    {
        title: "CSS3: Box Model & Flexbox",
        slug: "css3-box-model-flexbox",
        description: "Understanding layout fundamentals.",
        order: 3, estimatedMinutes: 55, difficulty: "Easy",
        content: `
# CSS3: Box Model & Flexbox

## 1. The CSS Box Model
Every HTML element is a rectangular box with four layers:

\\\`\\\`\\\`
+---------------------------+
|         Margin            |
|  +---------------------+  |
|  |      Border         |  |
|  |  +---------------+  |  |
|  |  |    Padding    |  |  |
|  |  |  +---------+  |  |  |
|  |  |  | Content |  |  |  |
|  |  |  +---------+  |  |  |
\\\`\\\`\\\`

## 2. box-sizing Property

| Value | Width Includes |
|-------|---------------|
| \\\`content-box\\\` (default) | Content only — padding & border are added on top |
| \\\`border-box\\\` | Content + Padding + Border — total width stays as specified |

**Best Practice**: Always set \\\`* { box-sizing: border-box; }\\\`

## 3. Flexbox (1D Layout)
Flexbox is designed for laying out items in a **single direction** (row or column).

### Container Properties

| Property | Values | Purpose |
|----------|--------|---------|
| \\\`display\\\` | \\\`flex\\\` | Enable flexbox |
| \\\`flex-direction\\\` | row, column, row-reverse, column-reverse | Main axis direction |
| \\\`justify-content\\\` | flex-start, center, space-between, space-around, space-evenly | Main axis alignment |
| \\\`align-items\\\` | flex-start, center, stretch, baseline | Cross axis alignment |
| \\\`flex-wrap\\\` | nowrap, wrap | Allow items to wrap to next line |
| \\\`gap\\\` | e.g., \\\`16px\\\` | Space between flex items |

### Item Properties

| Property | Purpose |
|----------|---------|
| \\\`flex-grow\\\` | How much the item should grow relative to siblings |
| \\\`flex-shrink\\\` | How much the item should shrink |
| \\\`flex-basis\\\` | Initial size before growing/shrinking |
| \\\`align-self\\\` | Override container's align-items for this item |
| \\\`order\\\` | Change visual order without changing HTML |

## 4. Common Flexbox Patterns
- **Center anything**: \\\`display: flex; justify-content: center; align-items: center;\\\`
- **Navbar**: \\\`display: flex; justify-content: space-between;\\\`
- **Equal columns**: Each child gets \\\`flex: 1\\\`
`, resources: []
    },
    {
        title: "CSS Grid: 2D Mastery",
        slug: "css-grid-2d",
        description: "Rows and columns for complex layouts.",
        order: 4, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# CSS Grid: 2D Layout Mastery

CSS Grid is designed for **two-dimensional layouts** — controlling both rows AND columns simultaneously.

## 1. Grid vs Flexbox

| Feature | Flexbox | Grid |
|---------|---------|------|
| Dimensions | 1D (row OR column) | 2D (rows AND columns) |
| Best for | Component-level layout (navbar, card) | Page-level layout (entire page structure) |
| Content flow | Content determines layout | Layout determines content placement |

## 2. Container Properties

| Property | Example | Purpose |
|----------|---------|---------|
| \\\`display: grid\\\` | — | Enable grid |
| \\\`grid-template-columns\\\` | \\\`1fr 2fr 1fr\\\` | Define column sizes |
| \\\`grid-template-rows\\\` | \\\`100px auto 50px\\\` | Define row sizes |
| \\\`gap\\\` | \\\`20px\\\` | Space between cells |
| \\\`grid-template-areas\\\` | Named regions | Semantic layout definition |

## 3. The \\\`fr\\\` Unit
Fractional unit — distributes available space proportionally.
- \\\`1fr 1fr 1fr\\\` = 3 equal columns
- \\\`1fr 2fr 1fr\\\` = middle column is twice as wide
- \\\`200px 1fr\\\` = fixed sidebar + fluid main content

## 4. Grid Template Areas (Named Layouts)
\\\`\\\`\\\`css
.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 250px 1fr 1fr;
    grid-template-rows: 80px 1fr 60px;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\\\`\\\`\\\`

## 5. Item Placement

| Property | Purpose | Example |
|----------|---------|---------|
| \\\`grid-column\\\` | Span columns | \\\`1 / 3\\\` (spans col 1-2) |
| \\\`grid-row\\\` | Span rows | \\\`1 / 4\\\` (spans row 1-3) |
| \\\`place-self\\\` | Align individual item | \\\`center center\\\` |

## 6. Responsive Grid with auto-fill/auto-fit
\\\`\\\`\\\`css
/* Cards that auto-wrap, minimum 300px each */
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
\\\`\\\`\\\`
No media queries needed — the grid automatically adjusts the number of columns.
`, resources: []
    },
    {
        title: "Responsive Design: Media Queries",
        slug: "responsive-design",
        description: "Adapting to every screen size.",
        order: 5, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# Responsive Web Design

Making websites work beautifully on any screen size — from 320px phones to 4K monitors.

## 1. The Viewport Meta Tag
\\\`\\\`\\\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\\\`\\\`\\\`
Without this, mobile browsers render the page at desktop width and zoom out.

## 2. Mobile-First vs Desktop-First

| Approach | Base Styles For | Media Queries |
|----------|----------------|---------------|
| **Mobile-First** | Small screens | \\\`@media (min-width: 768px)\\\` — add complexity |
| **Desktop-First** | Large screens | \\\`@media (max-width: 768px)\\\` — remove complexity |

**Best Practice**: Mobile-first forces you to prioritize content and performance.

## 3. Common Breakpoints

| Breakpoint | Target |
|-----------|--------|
| 320px | Small phones |
| 480px | Large phones |
| 768px | Tablets |
| 1024px | Small desktops / landscape tablets |
| 1200px | Standard desktops |
| 1440px+ | Large desktops |

## 4. Responsive Techniques

| Technique | How |
|-----------|-----|
| **Fluid widths** | Use \\\`%\\\`, \\\`vw\\\`, \\\`fr\\\` instead of fixed \\\`px\\\` |
| **Responsive images** | \\\`max-width: 100%\\\`, \\\`<picture>\\\` element, \\\`srcset\\\` |
| **CSS Grid auto-fill** | \\\`repeat(auto-fill, minmax(300px, 1fr))\\\` |
| **Clamp()** | \\\`font-size: clamp(1rem, 2.5vw, 2rem)\\\` — fluid typography |
| **Container queries** | Style based on parent container size, not viewport |

## 5. Modern CSS Features for Responsiveness
- **Container Queries**: \\\`@container (min-width: 400px) { ... }\\\` — component-level responsiveness
- **\\\`clamp()\\\`**: Fluid values without media queries
- **\\\`aspect-ratio\\\`**: Maintain proportions across screen sizes
- **Logical Properties**: \\\`margin-inline\\\`, \\\`padding-block\\\` for internationalization
`, resources: []
    },
    {
        title: "JavaScript ES6+ Features",
        slug: "js-es6-features",
        description: "Arrow functions, destructuring, modules, and more.",
        order: 6, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# JavaScript ES6+ Features

## 1. Variable Declarations

| Keyword | Scope | Reassignable | Hoisted |
|---------|-------|-------------|---------|
| \\\`var\\\` | Function | Yes | Yes (undefined) |
| \\\`let\\\` | Block | Yes | No (TDZ) |
| \\\`const\\\` | Block | No | No (TDZ) |

**Rule**: Use \\\`const\\\` by default, \\\`let\\\` when reassignment needed, never \\\`var\\\`.

## 2. Arrow Functions
\\\`\\\`\\\`javascript
// Traditional
function add(a, b) { return a + b; }

// Arrow (concise)
const add = (a, b) => a + b;
\\\`\\\`\\\`
**Key difference**: Arrow functions do NOT have their own \\\`this\\\` — they inherit from the enclosing scope.

## 3. Destructuring
\\\`\\\`\\\`javascript
// Object destructuring
const { name, age, role = "user" } = person;

// Array destructuring
const [first, ...rest] = [1, 2, 3, 4]; // first=1, rest=[2,3,4]

// Function parameters
function greet({ name, age }) { return name + age; }
\\\`\\\`\\\`

## 4. Template Literals
\\\`\\\`\\\`javascript
const greeting = \\\\\\\`Hello, my name is \\\\$\\\\{name\\\\} and I am \\\\$\\\\{age\\\\} years old.\\\\\\\`;
\\\`\\\`\\\`

## 5. Spread & Rest Operators
\\\`\\\`\\\`javascript
// Spread (expand)
const merged = [...arr1, ...arr2];
const clone = { ...original, name: "updated" };

// Rest (collect)
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
\\\`\\\`\\\`

## 6. Other Essential ES6+ Features

| Feature | Purpose |
|---------|---------|
| **Optional Chaining** \\\`?.\\\` | Safe property access: \\\`user?.address?.city\\\` |
| **Nullish Coalescing** \\\`??\\\` | Default only for null/undefined: \\\`value ?? "default"\\\` |
| **Map / Set** | Key-value store / unique values collection |
| **for...of** | Iterate over arrays, strings, Maps, Sets |
| **Modules** | \\\`import/export\\\` for code organization |
| **Symbol** | Unique identifiers for object properties |
| **Proxy** | Intercept and customize object operations |
`, resources: []
    },
    {
        title: "Asynchronous JS: Promises & Async/Await",
        slug: "async-js-promises",
        description: "Non-blocking code for network requests.",
        order: 7, estimatedMinutes: 60, difficulty: "Medium",
        content: `
# Asynchronous JavaScript

JavaScript is **single-threaded** — it can only do one thing at a time. Async patterns allow it to handle long-running tasks (API calls, file I/O) without freezing the UI.

## 1. The Event Loop

\\\`\\\`\\\`
Call Stack → [Current function executing]
Web APIs  → [setTimeout, fetch, DOM events]  (handled by browser)
Task Queue → [Callback waiting to run]
Microtask Queue → [Promise callbacks] (higher priority)
\\\`\\\`\\\`

The Event Loop continuously checks: "Is the Call Stack empty? If yes, move the next task from the queue."

## 2. Callbacks (Old Way)
\\\`\\\`\\\`javascript
getData(function(data) {
    processData(data, function(result) {
        saveResult(result, function(saved) {
            // Callback Hell / Pyramid of Doom!
        });
    });
});
\\\`\\\`\\\`

## 3. Promises (Modern Way)
\\\`\\\`\\\`javascript
fetch("/api/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log("Done"));
\\\`\\\`\\\`

| State | Meaning |
|-------|---------|
| **Pending** | Operation not yet completed |
| **Fulfilled** | Operation succeeded (.then) |
| **Rejected** | Operation failed (.catch) |

## 4. Async/Await (Best Way)
Syntactic sugar over Promises — looks synchronous but is non-blocking.
\\\`\\\`\\\`javascript
async function fetchUsers() {
    try {
        const response = await fetch("/api/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error);
    }
}
\\\`\\\`\\\`

## 5. Parallel Execution

| Method | Behavior |
|--------|---------|
| \\\`Promise.all([p1, p2, p3])\\\` | Wait for ALL to resolve (fails if ANY fails) |
| \\\`Promise.allSettled([p1, p2])\\\` | Wait for ALL to complete (never rejects) |
| \\\`Promise.race([p1, p2])\\\` | Returns the FIRST to settle (resolve or reject) |
| \\\`Promise.any([p1, p2])\\\` | Returns the FIRST to RESOLVE (ignores rejections) |

## 6. Common Pitfalls
- **Not awaiting**: Forgetting \\\`await\\\` makes the function return a Promise, not the value
- **Sequential when parallel**: Use \\\`Promise.all()\\\` instead of sequential \\\`await\\\` for independent calls
- **Unhandled rejections**: Always add \\\`.catch()\\\` or \\\`try/catch\\\` blocks
`, resources: []
    },
    {
        title: "DOM Manipulation & Events",
        slug: "dom-manipulation",
        description: "Selecting, creating, and modifying HTML elements.",
        order: 8, estimatedMinutes: 50, difficulty: "Medium",
        content: `
# DOM Manipulation & Events

The DOM (Document Object Model) is the browser's internal representation of the HTML page as a tree of objects.

## 1. Selecting Elements

| Method | Returns | Example |
|--------|---------|---------|
| \\\`getElementById\\\` | Single element | \\\`document.getElementById("app")\\\` |
| \\\`querySelector\\\` | First match | \\\`document.querySelector(".card")\\\` |
| \\\`querySelectorAll\\\` | NodeList (all matches) | \\\`document.querySelectorAll("li")\\\` |
| \\\`getElementsByClassName\\\` | HTMLCollection (live) | \\\`document.getElementsByClassName("btn")\\\` |

**Best Practice**: Use \\\`querySelector\\\` / \\\`querySelectorAll\\\` — they accept any CSS selector.

## 2. Modifying Elements

| Operation | Code |
|-----------|------|
| Change text | \\\`el.textContent = "Hello"\\\` |
| Change HTML | \\\`el.innerHTML = "<b>Bold</b>"\\\` |
| Add class | \\\`el.classList.add("active")\\\` |
| Remove class | \\\`el.classList.remove("active")\\\` |
| Toggle class | \\\`el.classList.toggle("active")\\\` |
| Set attribute | \\\`el.setAttribute("data-id", "5")\\\` |
| Set style | \\\`el.style.color = "red"\\\` |

## 3. Creating & Inserting Elements
\\\`\\\`\\\`javascript
const card = document.createElement("div");
card.className = "card";
card.textContent = "New Card";
document.querySelector("#container").appendChild(card);
\\\`\\\`\\\`

## 4. Event Handling

| Approach | Syntax | Recommended? |
|----------|--------|-------------|
| Inline HTML | \\\`<button onclick="fn()">\\\` | No (mixes HTML & JS) |
| DOM property | \\\`btn.onclick = fn\\\` | Okay (only one handler) |
| addEventListener | \\\`btn.addEventListener("click", fn)\\\` | **Yes** (multiple handlers, options) |

## 5. Event Propagation

| Phase | Direction | Description |
|-------|----------|-------------|
| **Capturing** | Window → Target | Event travels DOWN the DOM tree |
| **Target** | At element | Event fires on the clicked element |
| **Bubbling** | Target → Window | Event travels UP the DOM tree |

**\\\`event.stopPropagation()\\\`**: Stops the event from bubbling further.
**\\\`event.preventDefault()\\\`**: Prevents the default action (e.g., form submission, link navigation).

## 6. Event Delegation
Instead of adding listeners to every child, add ONE listener to the parent:
\\\`\\\`\\\`javascript
document.querySelector("ul").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        console.log("Clicked:", e.target.textContent);
    }
});
\\\`\\\`\\\`
**Benefit**: Works for dynamically added elements, uses less memory.
`, resources: []
    },
    {
        title: "Web Storage: Local vs Session",
        slug: "web-storage-apis",
        description: "Persisting data in the browser.",
        order: 9, estimatedMinutes: 40, difficulty: "Easy",
        content: `
# Web Storage APIs

Methods for storing data in the user's browser without sending it to the server on every request.

## 1. Storage Comparison

| Feature | localStorage | sessionStorage | Cookies | IndexedDB |
|---------|-------------|---------------|---------|-----------|
| Capacity | ~5-10 MB | ~5 MB | ~4 KB | ~50+ MB |
| Lifetime | Until manually cleared | Until tab closes | Configurable (Expires/Max-Age) | Until manually cleared |
| Sent with requests | No | No | Yes (every HTTP request) | No |
| API | Simple (key-value) | Simple (key-value) | Complex (string parsing) | Complex (async, DB-like) |
| Scope | Same origin | Same tab + origin | Same origin (configurable) | Same origin |

## 2. localStorage API
\\\`\\\`\\\`javascript
// Set
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ name: "Alice", id: 1 }));

// Get
const theme = localStorage.getItem("theme"); // "dark"
const user = JSON.parse(localStorage.getItem("user")); // { name: "Alice", id: 1 }

// Remove
localStorage.removeItem("theme");
localStorage.clear(); // Remove everything
\\\`\\\`\\\`

## 3. Common Use Cases

| Storage | Use Case |
|---------|---------|
| **localStorage** | Dark mode preference, saved form drafts, cached API responses |
| **sessionStorage** | Multi-step form data, temporary auth tokens, tab-specific state |
| **Cookies** | Authentication (session ID), tracking, GDPR consent |
| **IndexedDB** | Offline-first apps, large datasets, binary files (images) |

## 4. Security Considerations
- **Never store sensitive data** (passwords, tokens) in localStorage — it's accessible to any JavaScript on the page (XSS vulnerability)
- Use **HttpOnly, Secure, SameSite** cookies for authentication tokens
- IndexedDB data is accessible to any script on the same origin

## 5. Service Workers & Cache API
For offline-first PWAs (Progressive Web Apps):
- **Service Worker**: A background script that intercepts network requests
- **Cache API**: Stores request/response pairs for offline access
- **Strategy**: Cache-first (fast), Network-first (fresh), Stale-while-revalidate (balanced)
`, resources: []
    },
    {
        title: "React Fundamentals: Props & State",
        slug: "react-fundamentals",
        description: "Components, JSX, and unidirectional data flow.",
        order: 10, estimatedMinutes: 55, difficulty: "Medium",
        content: `
# React Fundamentals

React is a JavaScript library for building user interfaces using reusable components.

## 1. JSX (JavaScript XML)
HTML-like syntax that compiles to JavaScript function calls:
\\\`\\\`\\\`jsx
// JSX
const element = <h1 className="title">Hello, {name}!</h1>;

// Compiles to:
const element = React.createElement("h1", { className: "title" }, "Hello, ", name, "!");
\\\`\\\`\\\`

## 2. Components
Two types of components:
\\\`\\\`\\\`jsx
// Function Component (modern, preferred)
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Alice" />
\\\`\\\`\\\`

## 3. Props (Read-Only Data)
Props flow DOWN from parent to child — **unidirectional data flow**.

| Rule | Detail |
|------|--------|
| Read-only | Child cannot modify its props |
| Any type | Strings, numbers, arrays, objects, functions, JSX |
| Default values | \\\`function Btn({ color = "blue" })\\\` |
| Children | Special prop for nested content: \\\`{props.children}\\\` |

## 4. State (Component Memory)
State is data that can change over time, owned by the component.
\\\`\\\`\\\`jsx
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}
\\\`\\\`\\\`

## 5. Props vs State

| Feature | Props | State |
|---------|-------|-------|
| Owned by | Parent component | The component itself |
| Mutable | No (read-only) | Yes (via setter function) |
| Triggers re-render | When parent re-renders with new props | When setter is called |
| Use for | Configuration, callbacks | Interactive data (form values, toggles) |

## 6. Rendering Rules
- React re-renders a component when its **state** or **props** change
- State updates are **batched** — multiple \\\`setState\\\` calls in the same event handler result in one re-render
- State updates are **asynchronous** — you cannot read the new value immediately after setting it
- **Key prop**: When rendering lists, each item needs a unique \\\`key\\\` for efficient reconciliation
`, resources: []
    },
{
    title: "React Hooks: useEffect & Context",
        slug: "react-hooks-context",
            description: "Side effects, lifecycle, and global state.",
                order: 11, estimatedMinutes: 60, difficulty: "Medium",
                    content: `
# React Hooks: useEffect & Context

## 1. useEffect — Side Effects
Handles operations that are "outside React" — API calls, subscriptions, timers, DOM manipulation.
\\\`\\\`\\\`jsx
useEffect(() => {
    // Runs after render
    fetchData();
    
    return () => {
        // Cleanup (runs before next effect or unmount)
        cancelSubscription();
    };
}, [dependency]); // Re-runs only when dependency changes
\\\`\\\`\\\`

| Dependency Array | When It Runs |
|-----------------|-------------|
| \\\`[]\\\` (empty) | Once on mount, cleanup on unmount |
| \\\`[value]\\\` | When \\\`value\\\` changes |
| No array | After every render (usually a bug) |

## 2. Common Hooks

| Hook | Purpose |
|------|---------|
| \\\`useState\\\` | Component-level state |
| \\\`useEffect\\\` | Side effects (fetch, timers, DOM) |
| \\\`useContext\\\` | Access context values without prop drilling |
| \\\`useRef\\\` | Mutable reference that persists across renders (DOM refs, timers) |
| \\\`useMemo\\\` | Memoize expensive calculations |
| \\\`useCallback\\\` | Memoize function references (prevent child re-renders) |
| \\\`useReducer\\\` | Complex state logic (like Redux in a component) |

## 3. Context API — Avoiding Prop Drilling
\\\`\\\`\\\`jsx
// 1. Create
const ThemeContext = createContext("light");

// 2. Provide (wraps component tree)
<ThemeContext.Provider value="dark">
    <App />
</ThemeContext.Provider>

// 3. Consume (any nested child)
const theme = useContext(ThemeContext); // "dark"
\\\`\\\`\\\`

## 4. Custom Hooks
Extract reusable logic into custom hooks:
\\\`\\\`\\\`jsx
function useWindowSize() {
    const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
    useEffect(() => {
        const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return size;
}
// Usage: const { w, h } = useWindowSize();
\\\`\\\`\\\`

## 5. Rules of Hooks
- Only call hooks at the **top level** (not inside loops, conditions, or nested functions)
- Only call hooks from **React function components** or **custom hooks**
`, resources: []
},
{
    title: "Client-Side Routing (Next.js)",
        slug: "client-side-routing",
            description: "SPA navigation without page reloads.",
                order: 12, estimatedMinutes: 50, difficulty: "Medium",
                    content: `
# Client-Side Routing

Traditional websites reload the entire page for every navigation. SPAs (Single Page Applications) update only the content that changes.

## 1. How Client-Side Routing Works
1. User clicks a link
2. JavaScript intercepts the click (prevents default navigation)
3. URL updates via History API (\\\`pushState\\\`)
4. React renders the matched component
5. No server request — instant navigation

## 2. Next.js File-Based Routing (App Router)

| File Path | URL Route |
|-----------|-----------|
| \\\`app/page.tsx\\\` | \\\`/\\\` |
| \\\`app/about/page.tsx\\\` | \\\`/about\\\` |
| \\\`app/blog/[slug]/page.tsx\\\` | \\\`/blog/hello-world\\\` (dynamic) |
| \\\`app/shop/[...slug]/page.tsx\\\` | \\\`/shop/a/b/c\\\` (catch-all) |
| \\\`app/dashboard/layout.tsx\\\` | Shared layout for all /dashboard/* pages |

## 3. Rendering Strategies

| Strategy | Where | When | Best For |
|----------|-------|------|----------|
| **SSG** | Build time | At deploy | Blog posts, docs, marketing pages |
| **SSR** | Server | Every request | Personalized pages, real-time data |
| **CSR** | Browser | After hydration | Interactive dashboards, forms |
| **ISR** | Server | On interval | E-commerce products (revalidate every 60s) |

## 4. Navigation in Next.js
\\\`\\\`\\\`jsx
import Link from "next/link";

// Declarative
<Link href="/about">About</Link>

// Programmatic
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/dashboard");
\\\`\\\`\\\`

## 5. Data Fetching (Server Components)
\\\`\\\`\\\`jsx
// This runs on the SERVER — no useEffect needed
async function UsersPage() {
    const users = await fetch("https://api.example.com/users").then(r => r.json());
    return <UserList users={users} />;
}
\\\`\\\`\\\`

## 6. Server vs Client Components

| Feature | Server Component (default) | Client Component (\\\`"use client"\\\`) |
|---------|--------------------------|-------------------------------------|
| Runs on | Server only | Browser (+ server for SSR) |
| Can use | async/await, DB queries | useState, useEffect, event handlers |
| Bundle size | Zero JS shipped to client | Included in client bundle |
| Best for | Data fetching, static content | Interactivity, forms, animations |
`, resources: []
},
{
    title: "Tailwind CSS & Component Libraries",
        slug: "tailwind-component-libs",
            description: "Utility-first CSS and pre-built components.",
                order: 13, estimatedMinutes: 45, difficulty: "Easy",
                    content: `
# Tailwind CSS & Component Libraries

## 1. Utility-First CSS (Tailwind)
Instead of writing custom CSS classes, compose styles using small utility classes:
\\\`\\\`\\\`html
<!-- Traditional CSS: Write a class, then style it -->
<div class="card">...</div>

<!-- Tailwind: Style directly in HTML -->
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">...</div>
\\\`\\\`\\\`

## 2. Key Tailwind Concepts

| Concept | Example | Purpose |
|---------|---------|---------|
| Responsive | \\\`md:flex lg:grid\\\` | Mobile-first breakpoints |
| Hover/Focus | \\\`hover:bg-blue-600 focus:ring-2\\\` | Interactive states |
| Dark Mode | \\\`dark:bg-gray-900\\\` | Theme support |
| Arbitrary Values | \\\`w-[137px] bg-[#1a1a2e]\\\` | Custom one-off values |
| Group | \\\`group-hover:text-white\\\` | Style child based on parent state |

## 3. Component Libraries Comparison

| Library | Framework | Styling | Accessibility |
|---------|----------|---------|--------------|
| **shadcn/ui** | React | Tailwind (copy-paste) | Yes (Radix) |
| **Material UI (MUI)** | React | CSS-in-JS / Emotion | Yes |
| **Ant Design** | React | Less → CSS Modules | Yes |
| **Chakra UI** | React | CSS-in-JS | Yes |
| **DaisyUI** | Any | Tailwind plugin | Partial |
| **Radix UI** | React | Unstyled (headless) | Excellent |
| **Headless UI** | React/Vue | Unstyled (headless) | Yes |

## 4. CSS-in-JS vs Utility-First vs CSS Modules

| Approach | Example | Pros | Cons |
|----------|---------|------|------|
| **CSS Modules** | \\\`styles.card\\\` | Scoped, no conflicts | Extra files |
| **CSS-in-JS** | styled-components, Emotion | Dynamic styles, co-located | Runtime cost, bundle size |
| **Tailwind** | \\\`className="p-4 bg-blue-500"\\\` | No CSS files, consistent | Long class strings, learning curve |

## 5. When to Use What
- **Tailwind**: Full control, custom designs, performance-critical
- **Component Library**: Rapid prototyping, consistent design system, accessibility out of the box
- **Headless UI**: Maximum flexibility — you provide all styling, library handles behavior + accessibility
`, resources: []
},
{
    title: "Web Security: XSS & CSRF",
        slug: "web-security-attacks",
            description: "Protecting users from client-side attacks.",
                order: 14, estimatedMinutes: 55, difficulty: "Hard",
                    content: `
# Web Security: XSS & CSRF

## 1. XSS (Cross-Site Scripting)
Attacker injects malicious JavaScript into a web page that other users view.

| Type | How | Example |
|------|-----|---------|
| **Stored XSS** | Malicious script saved in database | Attacker posts \\\`<script>steal(cookies)</script>\\\` in a comment — every viewer executes it |
| **Reflected XSS** | Script in URL, reflected by server | \\\`example.com/search?q=<script>alert(1)</script>\\\` |
| **DOM XSS** | Client-side JS inserts untrusted data into DOM | Using \\\`innerHTML\\\` with user input |

### Prevention
- **Sanitize input**: Strip or encode HTML entities (\\\`<\\\` → \\\`&lt;\\\`)
- **Use textContent** instead of \\\`innerHTML\\\`
- **CSP Header**: \\\`Content-Security-Policy: script-src 'self'\\\` — blocks inline scripts
- **React auto-escapes** JSX values by default (safe from most XSS)

## 2. CSRF (Cross-Site Request Forgery)
Attacker tricks a logged-in user into making unintended requests.

**Example**: User is logged into their bank. Attacker's site has:
\\\`\\\`\\\`html
<img src="https://bank.com/transfer?to=attacker&amount=10000" />
\\\`\\\`\\\`
The browser automatically sends the bank's session cookie with this request.

### Prevention
- **CSRF Tokens**: Server generates a random token per session; forms include it; server validates it
- **SameSite Cookies**: \\\`Set-Cookie: session=abc; SameSite=Strict\\\` — cookie not sent from cross-origin requests
- **Check Referer/Origin header**: Verify requests come from your domain

## 3. Other Common Attacks

| Attack | Defense |
|--------|---------|
| **SQL Injection** | Parameterized queries, ORMs |
| **Clickjacking** | \\\`X-Frame-Options: DENY\\\` header |
| **MITM** | HTTPS everywhere, HSTS header |
| **Open Redirect** | Validate redirect URLs against allowlist |

## 4. Security Headers

| Header | Purpose |
|--------|---------|
| \\\`Content-Security-Policy\\\` | Controls which resources can load |
| \\\`X-Content-Type-Options: nosniff\\\` | Prevents MIME-type sniffing |
| \\\`X-Frame-Options: DENY\\\` | Prevents page from being embedded in iframes |
| \\\`Strict-Transport-Security\\\` | Forces HTTPS for all future requests |
| \\\`Referrer-Policy\\\` | Controls what referrer info is sent |
`, resources: []
},
{
    title: "Web Performance: Core Web Vitals",
        slug: "web-performance-cwv",
            description: "LCP, FID, CLS — Google's performance metrics.",
                order: 15, estimatedMinutes: 55, difficulty: "Medium",
                    content: `
# Web Performance: Core Web Vitals

Google uses Core Web Vitals as a ranking signal. They measure real-user experience.

## 1. The Three Core Web Vitals

| Metric | Measures | Good | Poor |
|--------|---------|------|------|
| **LCP** (Largest Contentful Paint) | Loading speed — when main content is visible | < 2.5s | > 4.0s |
| **INP** (Interaction to Next Paint) | Responsiveness — delay after user interaction | < 200ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability — unexpected layout jumps | < 0.1 | > 0.25 |

## 2. Improving LCP
- Optimize and compress images (WebP/AVIF format)
- Preload critical resources: \\\`<link rel="preload" as="image" href="hero.webp">\\\`
- Use a CDN for faster delivery
- Remove render-blocking CSS/JS
- Server-side render above-the-fold content

## 3. Improving INP
- Break long JavaScript tasks into smaller chunks
- Use \\\`requestIdleCallback\\\` for non-urgent work
- Debounce/throttle input handlers
- Minimize main-thread work during interactions
- Use Web Workers for heavy computation

## 4. Improving CLS
- Set explicit \\\`width\\\` and \\\`height\\\` on images and videos
- Reserve space for ads and embeds
- Avoid inserting content above existing content
- Use \\\`font-display: swap\\\` for web fonts
- Avoid dynamic content that shifts the layout

## 5. Performance Optimization Toolbox

| Technique | Impact |
|-----------|--------|
| **Code Splitting** | Load only JS needed for current page |
| **Tree Shaking** | Remove unused code from bundles |
| **Lazy Loading** | Load images/components only when visible |
| **Image Optimization** | WebP/AVIF, responsive images, srcset |
| **Caching** | Cache-Control headers, service workers |
| **Minification** | Remove whitespace, shorten variable names |
| **Compression** | Gzip/Brotli for text-based assets |

## 6. Tools for Measurement

| Tool | Type |
|------|------|
| **Lighthouse** | Lab data (simulated conditions) |
| **PageSpeed Insights** | Lab + Field data (real users via CrUX) |
| **Chrome DevTools** | Performance profiling, network analysis |
| **WebPageTest** | Advanced waterfall analysis, multi-location |
| **web-vitals** (npm) | Measure CWV in production code |
`, resources: []
},
{
    title: "SEO & Accessibility (A11Y)",
        slug: "seo-accessibility",
            description: "Ranking higher and including everyone.",
                order: 16, estimatedMinutes: 45, difficulty: "Easy",
                    content: `
# SEO & Web Accessibility

## 1. SEO (Search Engine Optimization)
Techniques to improve your website's visibility in search engine results.

### On-Page SEO

| Element | Best Practice |
|---------|-------------|
| **Title tag** | Unique, descriptive, 50-60 characters |
| **Meta description** | Compelling, 150-160 characters |
| **Heading structure** | One \\\`<h1>\\\` per page, logical hierarchy |
| **URL structure** | Clean slugs: \\\`/blog/react-hooks\\\` not \\\`/p?id=123\\\` |
| **Image alt text** | Descriptive, includes keywords naturally |
| **Internal linking** | Connect related pages |
| **Structured Data** | JSON-LD schema markup for rich snippets |

### Technical SEO

| Factor | Implementation |
|--------|---------------|
| **Page speed** | Core Web Vitals targets |
| **Mobile-friendly** | Responsive design |
| **HTTPS** | SSL certificate |
| **Sitemap** | \\\`/sitemap.xml\\\` for search engine crawlers |
| **robots.txt** | Control what gets crawled |
| **Canonical URLs** | Prevent duplicate content issues |

## 2. Accessibility (A11Y)
Making web content usable for everyone, including people with disabilities.

### WCAG 2.1 Principles (POUR)
- **Perceivable**: Content can be seen/heard (alt text, captions)
- **Operable**: Can be navigated with keyboard/assistive tech
- **Understandable**: Content and UI are clear
- **Robust**: Works with assistive technologies

### Key Accessibility Requirements

| Area | Requirement |
|------|------------|
| **Keyboard** | All interactive elements focusable and operable via Tab/Enter/Space |
| **Screen Readers** | Semantic HTML, ARIA labels, live regions |
| **Color** | Contrast ratio > 4.5:1 (normal text), > 3:1 (large text) |
| **Forms** | Labels associated with inputs, error messages announced |
| **Images** | Descriptive alt text (or empty alt for decorative images) |
| **Motion** | Respect \\\`prefers-reduced-motion\\\` media query |

### ARIA (Accessible Rich Internet Applications)
Use ARIA only when native HTML isn't sufficient:
- \\\`aria-label\\\`: Provides accessible name
- \\\`aria-hidden\\\`: Hides element from screen readers
- \\\`aria-live\\\`: Announces dynamic content changes
- \\\`role\\\`: Defines element's purpose (e.g., \\\`role="alert"\\\`)
`, resources: []
},
{
    title: "Working with APIs (REST & GraphQL)",
        slug: "rest-graphql-apis",
            description: "Consuming and designing web APIs.",
                order: 17, estimatedMinutes: 60, difficulty: "Medium",
                    content: `
# Working with APIs: REST & GraphQL

## 1. REST (Representational State Transfer)
An architectural style using HTTP methods on resources identified by URLs.

### RESTful URL Design

| Action | Method | URL | Body |
|--------|--------|-----|------|
| List all users | GET | /api/users | — |
| Get one user | GET | /api/users/123 | — |
| Create user | POST | /api/users | { name, email } |
| Update user | PUT | /api/users/123 | { name, email } |
| Partial update | PATCH | /api/users/123 | { email } |
| Delete user | DELETE | /api/users/123 | — |

### REST Best Practices
- Use **nouns** for resources (\\\`/users\\\`, not \\\`/getUsers\\\`)
- Use **plural** names (\\\`/users\\\` not \\\`/user\\\`)
- Version your API (\\\`/api/v1/users\\\`)
- Use query params for filtering: \\\`/users?role=admin&page=2\\\`
- Return appropriate status codes

## 2. GraphQL
A query language that lets clients request exactly the data they need.

\\\`\\\`\\\`graphql
# Client specifies exact fields needed
query {
    user(id: 123) {
        name
        email
        posts {
            title
        }
    }
}
\\\`\\\`\\\`

## 3. REST vs GraphQL

| Feature | REST | GraphQL |
|---------|------|---------|
| Data fetching | Fixed endpoints, server decides shape | Client specifies exact fields |
| Over-fetching | Common (get entire user object for just the name) | Never (request only needed fields) |
| Under-fetching | Common (need multiple requests for related data) | Never (get related data in one query) |
| Versioning | URL-based (/v1, /v2) | Schema evolution, no versioning needed |
| Caching | Easy (HTTP caching by URL) | Complex (responses vary per query) |
| Learning curve | Low | Medium |
| Best for | Simple CRUD, public APIs | Complex relationships, mobile apps |

## 4. Authentication Methods

| Method | How | Best For |
|--------|-----|----------|
| **API Key** | Key in header or query param | Public APIs, simple auth |
| **JWT** | Signed token in Authorization header | Stateless auth, SPAs |
| **OAuth 2.0** | Token-based delegated auth | Third-party login (Google, GitHub) |
| **Session Cookie** | Server-stored session, cookie sent automatically | Traditional web apps |
`, resources: []
},
{
    title: "Testing Web Apps (Cypress & Playwright)",
        slug: "testing-web-apps",
            description: "End-to-end testing in the browser.",
                order: 18, estimatedMinutes: 55, difficulty: "Medium",
                    content: `
# Testing Web Applications

## 1. The Testing Pyramid for Web Apps

\\\`\\\`\\\`
         /  E2E Tests (Cypress/Playwright)  \\\\       ← Few, slow, high confidence
        /  Integration Tests (API testing)   \\\\      ← Moderate
       /  Unit Tests (Jest/Vitest)            \\\\     ← Many, fast, focused
\\\`\\\`\\\`

## 2. Cypress vs Playwright

| Feature | Cypress | Playwright |
|---------|---------|------------|
| Browsers | Chrome, Firefox, Edge | Chromium, Firefox, WebKit (Safari) |
| Language | JavaScript only | JS, Python, Java, C# |
| Multi-tab | Not supported | Fully supported |
| Architecture | Runs inside browser | Controls browser externally (CDP) |
| Auto-wait | Built-in | Built-in |
| Network mocking | \\\`cy.intercept()\\\` | \\\`page.route()\\\` |
| Debugging | Time-travel, screenshots | Trace viewer, video recording |
| Parallel | Paid (Cypress Cloud) | Free, built-in |
| Best for | Frontend devs, React/Vue apps | Cross-browser, complex flows |

## 3. E2E Test Example (Playwright)
\\\`\\\`\\\`javascript
test("user can log in and see dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#email", "alice@test.com");
    await page.fill("#password", "password123");
    await page.click("#login-btn");
    
    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("h1")).toContainText("Welcome, Alice");
});
\\\`\\\`\\\`

## 4. What to E2E Test
- **Critical user paths**: Login, signup, checkout, payment
- **Happy paths + key error paths**: Valid login + invalid credentials
- **Cross-page flows**: Add to cart → Checkout → Payment → Confirmation

## 5. Best Practices

| Practice | Why |
|----------|-----|
| Use data-testid attributes | Stable selectors: \\\`data-testid="submit-btn"\\\` |
| Test user behavior, not implementation | Click buttons, fill forms — don't test CSS classes |
| Reset state before each test | Use API/DB to seed clean data |
| Keep E2E tests focused | Test one user flow per test |
| Run in CI | E2E tests on every PR |

## 6. Visual Regression Testing
Compare screenshots of your app between versions to catch unintended visual changes:
- **Percy**: Cloud-based visual testing, integrates with Cypress/Playwright
- **Chromatic**: Storybook visual testing for components
- **Applitools**: AI-powered visual comparison
`, resources: []
},
{
    title: "Deployment & CDNs",
        slug: "deployment-cdns",
            description: "Getting your app live on the internet.",
                order: 19, estimatedMinutes: 50, difficulty: "Medium",
                    content: `
# Web App Deployment

## 1. Deployment Platforms

| Platform | Best For | Features |
|----------|---------|---------|
| **Vercel** | Next.js, React | Auto-deploy from Git, Edge Functions, Analytics |
| **Netlify** | Static sites, Jamstack | Forms, Functions, Split testing |
| **AWS (EC2, ECS, Lambda)** | Full control, enterprise | Everything, but complex |
| **Railway / Render** | Full-stack apps | Easy DB setup, auto-deploy |
| **Cloudflare Pages** | Static + Workers | Edge computing, DDoS protection |
| **Docker + K8s** | Microservices, custom infra | Container orchestration |

## 2. CI/CD Pipeline for Web Apps

\\\`\\\`\\\`
Push to main → Lint + Type Check → Unit Tests → Build → Integration Tests
    → Deploy to Staging → E2E Tests → Deploy to Production → Smoke Tests
\\\`\\\`\\\`

## 3. Environment Management

| Environment | Purpose | Data |
|-------------|---------|------|
| **Development** | Local coding | Fake/seed data |
| **Staging** | Pre-production testing | Copy of production data |
| **Production** | Live users | Real data |

**Environment Variables**: Store secrets per environment (\\\`.env.local\\\`, \\\`.env.production\\\`). Never commit secrets to Git.

## 4. Deployment Strategies

| Strategy | How | Risk |
|----------|-----|------|
| **Rolling** | Replace instances one at a time | Low (gradual) |
| **Blue-Green** | Two identical environments, switch traffic | Very low (instant rollback) |
| **Canary** | Route 5% of traffic to new version first | Lowest (test on real users) |
| **Feature Flags** | Deploy code but toggle features on/off | Very low (decouple deploy from release) |

## 5. Domain & DNS Setup
1. Buy domain from registrar (Namecheap, Google Domains)
2. Point DNS A/CNAME records to your hosting provider
3. Enable HTTPS via Let's Encrypt (auto-TLS on Vercel/Netlify)
4. Configure redirects (www → naked domain or vice versa)

## 6. Monitoring in Production
- **Error tracking**: Sentry (catches and groups runtime errors)
- **Analytics**: Vercel Analytics, Plausible, PostHog
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Performance**: Core Web Vitals via web-vitals library
`, resources: []
},
{
    title: "Web 3.0 & Future Trends",
        slug: "web3-future-trends",
            description: "Decentralization, AI-web, and emerging standards.",
                order: 20, estimatedMinutes: 45, difficulty: "Easy",
                    content: `
# Web 3.0 & Future Trends

## 1. Evolution of the Web

| Era | Characteristics | Example |
|-----|----------------|---------|
| **Web 1.0** (1990s) | Static, read-only pages | GeoCities, early Yahoo |
| **Web 2.0** (2000s-now) | Dynamic, user-generated content, social | Facebook, YouTube, Twitter |
| **Web 3.0** (emerging) | Decentralized, user-owned, AI-augmented | DApps, DeFi, AI agents |

## 2. Key Web 3.0 Technologies

| Technology | Purpose |
|-----------|---------|
| **Blockchain** | Decentralized, immutable ledger |
| **Smart Contracts** | Self-executing code on blockchain (Solidity, Ethereum) |
| **DApps** | Decentralized applications (no central server) |
| **IPFS** | Peer-to-peer file storage (no single server) |
| **Tokens (NFTs)** | Digital ownership and provenance |
| **DAOs** | Decentralized governance organizations |
| **Wallets** | MetaMask, Phantom — user identity and assets |

## 3. AI on the Web
- **AI-Powered Search**: Google SGE, Perplexity — conversational search
- **AI Code Generation**: GitHub Copilot, Cursor — AI-assisted development
- **AI Content**: Automated writing, image generation, personalization
- **AI Agents**: Autonomous systems that browse and interact with the web
- **LLM APIs**: OpenAI, Anthropic — integrate AI into any web app

## 4. Emerging Web Standards

| Standard | What It Enables |
|---------|----------------|
| **WebGPU** | GPU-accelerated graphics and ML in the browser |
| **WebAssembly (WASM)** | Run C/C++/Rust at near-native speed in browsers |
| **View Transitions API** | Smooth animated page transitions (native) |
| **Container Queries** | Component-level responsive design |
| **Speculation Rules** | Pre-render pages the user is likely to visit |
| **Popover API** | Native tooltips and popovers without JS |

## 5. PWAs (Progressive Web Apps)
Web apps that behave like native apps:
- Work offline (Service Workers)
- Installable on home screen
- Push notifications
- Access to device APIs (camera, GPS, Bluetooth)

## 6. The Server Renaissance
After years of heavy client-side rendering, the trend is shifting back to the server:
- **React Server Components**: Components render on the server, zero client JS
- **htmx**: Send HTML fragments from server, minimal JS
- **Astro**: Islands architecture — most of the page is static HTML
- **Partial Hydration**: Only hydrate interactive parts of the page
`, resources: []
}
];
