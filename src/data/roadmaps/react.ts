
import { RoadmapTrack } from './types';

export const reactRoadmap: RoadmapTrack = {
    id: 'react',
    title: 'React Developer',
    description: 'Comprehensive guide to becoming a proficient React developer in 2025',
    category: 'skill-based',
    icon: '⚛️',
    accentColor: '#06b6d4',
    rootNodeId: 'react-root',
    nodes: {
        'react-root': {
            id: 'react-root',
            label: 'React',
            description: 'React is the most popular JavaScript library for building user interfaces. Master components, hooks, state management, routing, and the React ecosystem to build production-grade applications.',
            children: ['react-fundamentals', 'react-ecosystem', 'react-advanced', 'data-fetching'],
            resources: [
                { type: 'documentation', title: 'React Official Documentation', url: 'https://react.dev/', isFree: true },
                { type: 'article', title: 'React Developer Roadmap', url: 'https://roadmap.sh/react', isFree: true },
                { type: 'course', title: 'React - The Complete Guide', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', isFree: false },
            ],
            content: {
                overview: 'React is a JavaScript library for building user interfaces, created by Facebook (Meta) in 2013. It is the most popular front-end library in the world, powering Facebook, Instagram, Netflix, Airbnb, and millions of other applications. React introduced the concept of a virtual DOM — instead of manipulating the real DOM directly (which is slow), React builds a lightweight copy in memory, calculates the minimum changes needed, and batches updates efficiently. React uses a component-based architecture where every piece of UI is a reusable function that returns JSX (a syntax extension that looks like HTML in JavaScript). The unidirectional data flow (data flows from parent to child via props) makes applications predictable and easier to debug.',
                keyConcepts: [
                    'Components: the building blocks of every React app',
                    'JSX: JavaScript XML for declaring UI',
                    'Props: passing data from parent to child',
                    'State: data that changes over time within a component',
                    'Virtual DOM and reconciliation',
                    'Unidirectional data flow',
                    'Hooks: functions for state and side effects',
                    'Component lifecycle and effects'
                ],
                practiceQuestions: [
                    { question: 'Why does React use a virtual DOM?', hint: 'Direct DOM manipulation is slow. The virtual DOM lets React calculate the minimum changes and batch updates efficiently.', difficulty: 'easy' },
                    { question: 'What is JSX and can you use React without it?', hint: 'JSX is a syntax extension that looks like HTML. Yes, you can use React.createElement directly, but JSX is far more readable.', difficulty: 'easy' },
                    { question: 'What is the difference between props and state?', hint: 'Props are passed from parent (immutable in child). State is owned and managed within the component (mutable via setState/useState).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use functional components with hooks (class components are legacy).',
                    'Keep components small and focused on a single responsibility.',
                    'Lift state up when two sibling components need access to the same data.',
                    'Use React DevTools for debugging component trees and state.',
                    'Use Vite (not Create React App) for new projects.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Getting Started', description: 'Set up your React development environment.', tasks: ['Install Node.js and create a React app with Vite', 'Understand the project structure', 'Explore JSX syntax and React DevTools'] },
            ]
        },

        'react-fundamentals': {
            id: 'react-fundamentals',
            label: 'React Fundamentals',
            description: 'Core React concepts including components, JSX, props, state, event handling, conditional rendering, and lists.',
            parentId: 'react-root',
            children: ['components-jsx', 'hooks-deep-dive', 'rendering-patterns'],
            resources: [
                { type: 'documentation', title: 'React - Learn', url: 'https://react.dev/learn', isFree: true },
            ],
            content: {
                overview: 'React fundamentals cover the core building blocks you need to build any React application. This includes understanding how to create components, pass data with props, manage local state with hooks, handle user events, conditionally render UI elements, and render lists. React follows a declarative approach — you describe what the UI should look like for any given state, and React figures out how to update the DOM. This is fundamentally different from imperative approaches where you manually tell the browser to add, remove, or modify elements.',
                keyConcepts: [
                    'Functional components and JSX syntax',
                    'Props for passing data and callbacks',
                    'Event handling: onClick, onChange, onSubmit',
                    'Conditional rendering: ternary, &&, early return',
                    'List rendering with .map() and the key prop',
                    'Controlled vs uncontrolled components',
                    'Component composition over inheritance',
                    'Thinking in React: breaking UI into components'
                ]
            }
        },

        'components-jsx': {
            id: 'components-jsx',
            label: 'Components & JSX',
            description: 'Build reusable UI components with JSX. Learn functional components, props, children, composition, and component design patterns.',
            parentId: 'react-fundamentals',
            resources: [
                { type: 'documentation', title: 'Your First Component', url: 'https://react.dev/learn/your-first-component', isFree: true },
                { type: 'article', title: 'React Component Patterns', url: 'https://www.patterns.dev/react', isFree: true },
            ],
            content: {
                overview: 'Components are reusable functions that return JSX describing what should appear on screen. A component can be as simple as a button or as complex as an entire page. Props (properties) are how you pass data from a parent component to a child — they are read-only and flow in one direction (top-down). The special children prop lets you pass JSX elements between opening and closing tags. Component composition (building complex components from simpler ones) is preferred over inheritance in React. Good components are small, single-responsibility, and accept props for customization.',
                keyConcepts: [
                    'Functional components and return values',
                    'JSX expressions and JavaScript interpolation',
                    'Props: passing data and default values',
                    'children prop for component composition',
                    'Conditional rendering patterns',
                    'Rendering lists with .map() and keys',
                    'Fragments (<> </>) for grouping without extra DOM nodes',
                    'Component naming conventions (PascalCase)'
                ],
                practiceQuestions: [
                    { question: 'Why are keys important when rendering lists?', hint: 'Keys help React identify which items changed, were added, or removed. Without them, React may re-render incorrectly.', difficulty: 'easy' },
                    { question: 'What is the children prop used for?', hint: 'It lets you pass content between the opening and closing tags of a component, like a wrapper or layout component.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Extract repeated UI into reusable components.',
                    'Use TypeScript interfaces to define prop types.',
                    'Never use array index as a key for lists that can reorder.',
                    'Prefer composition (wrapping components) over prop drilling.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Components Basics', description: 'Create and compose components.', tasks: ['Create functional components', 'Pass props and use children', 'Build a reusable Button and Card component'] },
                { day: 2, title: 'Advanced Components', description: 'Component patterns and composition.', tasks: ['Implement conditional rendering', 'Render lists with keys', 'Create compound components and render props'] },
            ]
        },

        'hooks-deep-dive': {
            id: 'hooks-deep-dive',
            label: 'Hooks Deep Dive',
            description: 'Master all React hooks: useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef, and create custom hooks.',
            parentId: 'react-fundamentals',
            resources: [
                { type: 'documentation', title: 'React Hooks Reference', url: 'https://react.dev/reference/react/hooks', isFree: true },
                { type: 'video', title: 'React Hooks Explained', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', isFree: true },
            ],
            content: {
                overview: 'Hooks are functions that let you "hook into" React state and lifecycle features from functional components. useState manages local state (a counter, form input, toggle). useEffect handles side effects — anything that reaches outside the React rendering cycle (API calls, subscriptions, timers, DOM manipulation). useContext accesses shared data without prop drilling. useReducer manages complex state with a reducer pattern (like a mini Redux). useMemo and useCallback are performance optimizations — they memoize values and functions to prevent unnecessary recalculations and re-renders. useRef holds a mutable reference that persists across renders without causing re-renders. Custom hooks let you extract reusable stateful logic into functions.',
                keyConcepts: [
                    'useState for local state management',
                    'useEffect for side effects and cleanup',
                    'useContext for consuming context values',
                    'useReducer for complex state logic',
                    'useMemo for expensive computation caching',
                    'useCallback for stable function references',
                    'useRef for DOM access and persistent values',
                    'Custom hooks: extracting reusable logic (useXxx pattern)'
                ],
                practiceQuestions: [
                    { question: 'When should you use useReducer instead of useState?', hint: 'When state logic is complex (multiple sub-values) or when the next state depends on the previous state.', difficulty: 'medium' },
                    { question: 'What is the dependency array in useEffect?', hint: 'An array of values that, when changed, cause the effect to re-run. An empty array means run only once (on mount).', difficulty: 'easy' },
                    { question: 'When should you use useMemo?', hint: 'Only for computationally expensive calculations. Do not use it for everything — premature optimization adds complexity.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Always include all dependencies in the useEffect dependency array.',
                    'Clean up effects (subscriptions, timers) in the return function.',
                    'Do not overuse useMemo and useCallback — profile first.',
                    'Extract complex hook logic into custom hooks for reuse.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Basic Hooks', description: 'useState, useEffect, useRef.', tasks: ['Manage component state with useState', 'Handle side effects with useEffect', 'Access DOM elements with useRef'] },
                { day: 2, title: 'Advanced Hooks', description: 'useReducer, useMemo, useCallback.', tasks: ['Complex state with useReducer', 'Optimize rendering with useMemo and useCallback', 'Share state with useContext'] },
                { day: 3, title: 'Custom Hooks', description: 'Extract reusable logic.', tasks: ['Create useLocalStorage hook', 'Build useFetch for data fetching', 'Create useDebounce for input optimization'] },
            ]
        },

        'rendering-patterns': {
            id: 'rendering-patterns',
            label: 'Rendering Patterns',
            description: 'Understand different rendering strategies: client-side rendering (CSR), server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR).',
            parentId: 'react-fundamentals',
            resources: [
                { type: 'article', title: 'Rendering on the Web', url: 'https://web.dev/rendering-on-the-web/', isFree: true },
                { type: 'article', title: 'React Rendering Patterns', url: 'https://www.patterns.dev/react/rendering-patterns', isFree: true },
            ],
            content: {
                overview: 'Rendering patterns determine when and where your HTML is generated. Client-side rendering (CSR) renders everything in the browser — fast navigation after initial load but slow first paint and poor SEO. Server-side rendering (SSR) generates HTML on the server for each request — fast first paint and good SEO but slower navigation. Static site generation (SSG) pre-renders pages at build time — fastest possible performance but data might be stale. Incremental static regeneration (ISR) combines SSG with background revalidation. React Server Components (RSC) in Next.js 13+ run on the server and send minimal HTML/data to the client, reducing JavaScript bundle size.',
                keyConcepts: [
                    'CSR: client-side rendering (traditional React)',
                    'SSR: server-side rendering (per request)',
                    'SSG: static site generation (at build time)',
                    'ISR: incremental static regeneration',
                    'React Server Components (RSC)',
                    'Streaming SSR for progressive rendering',
                    'Hydration: making server HTML interactive',
                    'When to use which pattern'
                ],
                practiceQuestions: [
                    { question: 'Why is CSR bad for SEO?', hint: 'Search engines see an empty page initially. Content is only rendered after JavaScript downloads and executes.', difficulty: 'easy' },
                    { question: 'What is hydration?', hint: 'The process of attaching event handlers and React functionality to server-rendered HTML to make it interactive.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use SSR or SSG for content that needs SEO (landing pages, blogs).',
                    'Use CSR for authenticated dashboard pages that do not need SEO.',
                    'Use Next.js for projects that need multiple rendering patterns.',
                    'Prefer Server Components for data-heavy pages to reduce client bundle.'
                ]
            }
        },

        'react-ecosystem': {
            id: 'react-ecosystem',
            label: 'React Ecosystem',
            description: 'The React ecosystem includes routing, state management, form handling, styling solutions, and data fetching libraries.',
            parentId: 'react-root',
            children: ['routing', 'state-mgmt', 'forms-ecosystem', 'styling-solutions'],
            resources: [],
            content: {
                overview: 'React is "just" a UI library, so building real applications requires choosing libraries for routing, state management, forms, styling, and data fetching. This ecosystem is both a strength (flexibility) and a challenge (decision fatigue). The React community has converged on several excellent options: React Router or TanStack Router for navigation, Zustand or Redux Toolkit for global state, React Hook Form with Zod for forms and validation, Tailwind CSS or CSS Modules for styling, and TanStack Query for server state management.',
                keyConcepts: [
                    'Routing: React Router, TanStack Router',
                    'State management: Zustand, Redux Toolkit, Jotai',
                    'Forms: React Hook Form, Formik',
                    'Validation: Zod, Yup',
                    'Styling: Tailwind, CSS Modules, Styled Components',
                    'Data fetching: TanStack Query, SWR',
                    'Animation: Framer Motion',
                    'Meta-frameworks: Next.js, Remix'
                ]
            }
        },

        'routing': {
            id: 'routing',
            label: 'Routing',
            description: 'Client-side routing with React Router or TanStack Router. Implement navigation, dynamic routes, nested routes, and protected routes.',
            parentId: 'react-ecosystem',
            resources: [
                { type: 'documentation', title: 'React Router v6', url: 'https://reactrouter.com/', isFree: true },
                { type: 'documentation', title: 'TanStack Router', url: 'https://tanstack.com/router/', isFree: true },
            ],
            content: {
                overview: 'React does not include routing — you choose a library. React Router v6 is the most widely used, providing BrowserRouter, Routes, and Route components for declarative routing. Dynamic segments (:id) capture URL parameters. Nested routes render child components inside parent layouts. useNavigate provides programmatic navigation. TanStack Router is a newer, fully type-safe alternative with file-based routing. Protected routes check authentication before rendering — if not logged in, redirect to login.',
                keyConcepts: [
                    'BrowserRouter, Routes, and Route components',
                    'Dynamic routes with URL parameters',
                    'Nested routes and Outlet',
                    'useNavigate, useParams, useSearchParams',
                    'Protected/private routes with auth checks',
                    'Lazy loading routes with React.lazy and Suspense',
                    'Error boundaries for route-level errors',
                    'TanStack Router for type-safe routing'
                ],
                practiceQuestions: [
                    { question: 'How do you implement a protected route?', hint: 'Create a wrapper component that checks auth state and either renders the children or redirects to login.', difficulty: 'medium' },
                    { question: 'What is the Outlet component in React Router?', hint: 'It renders nested child routes inside a parent layout component.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Code-split routes with React.lazy for smaller initial bundles.',
                    'Use a layout route for shared UI (navbar, sidebar).',
                    'Handle 404s with a wildcard route ("*").',
                    'Use useSearchParams for filters and pagination, not state.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'React Router', description: 'Implement client-side routing.', tasks: ['Set up BrowserRouter and Routes', 'Create nested and dynamic routes', 'Implement protected routes with auth guards'] },
            ]
        },

        'state-mgmt': {
            id: 'state-mgmt',
            label: 'State Management',
            description: 'Manage global application state with React Context, Redux Toolkit, Zustand, Jotai, or Recoil based on your app\'s complexity.',
            parentId: 'react-ecosystem',
            children: ['redux-toolkit', 'zustand'],
            resources: [
                { type: 'documentation', title: 'React Context API', url: 'https://react.dev/learn/passing-data-deeply-with-context', isFree: true },
            ],
            content: {
                overview: 'State management determines how global data (authentication, theme, cart, notifications) is shared across components. React Context is built-in and works for low-update state (theme, locale). Zustand is a minimalist store with an extremely simple API — no boilerplate, no providers. Redux Toolkit is the industry standard for complex enterprise apps with predictable state updates, middleware, and time-travel debugging. Jotai and Recoil provide atomic state management (individual atoms of state). Server state (data from APIs) should be managed with TanStack Query, not these client state libraries.',
                keyConcepts: [
                    'React Context: createContext, useContext',
                    'When to use client state vs server state',
                    'Zustand: minimal API, no boilerplate',
                    'Redux Toolkit: slices, reducers, actions, thunks',
                    'Jotai / Recoil: atomic state management',
                    'State immutability and pure reducers',
                    'Devtools integration for debugging',
                    'Selectors for derived state'
                ],
                practiceQuestions: [
                    { question: 'When should you use an external state library vs React Context?', hint: 'Context re-renders all consumers on any change. External libraries (Zustand, Redux) allow selective subscriptions.', difficulty: 'medium' },
                    { question: 'What is the difference between client state and server state?', hint: 'Client state is UI data (modals, theme). Server state is data from APIs (users, products). They need different tools.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use React Context only for infrequently changing data (theme, auth).',
                    'Use Zustand for most apps — it has the simplest API.',
                    'Use TanStack Query for server state, not Redux or Context.',
                    'Keep global state minimal — most state should stay local in components.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Context', description: 'Built-in state sharing.', tasks: ['Create a ThemeContext with useContext', 'Understand Context re-rendering behavior', 'Learn when Context is not enough'] },
                { day: 2, title: 'Zustand / Redux', description: 'External state management.', tasks: ['Build a store with Zustand', 'Compare with Redux Toolkit approach', 'Choose the right tool for your app'] },
            ]
        },

        'redux-toolkit': {
            id: 'redux-toolkit',
            label: 'Redux Toolkit',
            description: 'The official, opinionated toolset for efficient Redux development. Simplifies store setup, reducers, and async logic.',
            parentId: 'state-mgmt',
            resources: [
                { type: 'documentation', title: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/', isFree: true },
            ],
            content: {
                overview: 'Redux Toolkit (RTK) is the modern way to use Redux. It eliminates the boilerplate that made old Redux painful: configureStore sets up the store with good defaults, createSlice generates action creators and reducers together, and createAsyncThunk handles async API calls with pending/fulfilled/rejected states. RTK Query goes even further by generating API CRUD hooks from endpoint definitions, similar to TanStack Query. Use Redux Toolkit for large enterprise apps with complex state interactions, middleware needs, or when your team already knows Redux.',
                keyConcepts: [
                    'configureStore for store setup',
                    'createSlice for reducers and actions',
                    'createAsyncThunk for async operations',
                    'RTK Query for auto-generated API hooks',
                    'Middleware for logging, analytics, and side effects',
                    'Selectors with createSelector for memoized derived state',
                    'Redux DevTools for time-travel debugging'
                ]
            }
        },

        'zustand': {
            id: 'zustand',
            label: 'Zustand',
            description: 'A small, fast state management library with minimal boilerplate.',
            parentId: 'state-mgmt',
            resources: [
                { type: 'documentation', title: 'Zustand Documentation', url: 'https://zustand-demo.pmnd.rs/', isFree: true },
            ],
            content: {
                overview: 'Zustand is a tiny (1kb) state management library that has become extremely popular for its simplicity. You create a store with create(), define state and actions in a single function, and use the store hook directly in components — no providers needed. Zustand supports middleware (persist for localStorage, devtools for debugging, immer for immutable updates). Unlike React Context, Zustand only re-renders components that subscribe to the specific state they use, avoiding unnecessary renders.',
                keyConcepts: [
                    'create() for defining stores',
                    'No providers needed (unlike Redux or Context)',
                    'Selective subscriptions to avoid unnecessary re-renders',
                    'Middleware: persist, devtools, immer',
                    'Computed/derived state with getters',
                    'Async actions for API calls'
                ],
                practiceQuestions: [
                    { question: 'Why does Zustand not need a Provider component?', hint: 'Zustand stores exist outside the React tree. Components subscribe directly to the store hook.', difficulty: 'medium' }
                ]
            }
        },

        'forms-ecosystem': {
            id: 'forms-ecosystem',
            label: 'Form Libraries',
            description: 'Handle complex forms with React Hook Form or Formik. Add validation with Yup or Zod schemas.',
            parentId: 'react-ecosystem',
            resources: [
                { type: 'documentation', title: 'React Hook Form', url: 'https://react-hook-form.com/', isFree: true },
                { type: 'documentation', title: 'Zod', url: 'https://zod.dev/', isFree: true },
            ],
            content: {
                overview: 'Form handling in React can be complex — tracking values, validation, error messages, submission state, and field-level controls. React Hook Form is the most popular solution, using uncontrolled components and refs for minimal re-renders and excellent performance. Formik uses controlled components and is simpler but re-renders more frequently. Zod and Yup are schema validation libraries that define validation rules declaratively — integrate them with React Hook Form using resolvers. For complex forms (multi-step wizards, dynamic fields, dependent validation), React Hook Form with Zod is the industry standard.',
                keyConcepts: [
                    'React Hook Form: register, handleSubmit, errors',
                    'Controlled vs uncontrolled inputs',
                    'Zod schemas for type-safe validation',
                    'Yup schemas for object validation',
                    'Field arrays for dynamic form fields',
                    'Multi-step forms with form state preservation',
                    'Server-side validation and error handling',
                    'Form accessibility (labels, ARIA, error announcements)'
                ],
                practiceQuestions: [
                    { question: 'Why is React Hook Form faster than Formik?', hint: 'RHF uses uncontrolled components (refs), so it does not trigger re-renders on every keystroke like Formik does.', difficulty: 'medium' },
                    { question: 'Why use Zod over Yup?', hint: 'Zod provides TypeScript type inference from schemas. Your validation schema doubles as your type definition.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use React Hook Form with Zod for new projects.',
                    'Show validation errors only after the user interacts with a field.',
                    'Handle server-side validation errors and display them on the form.',
                    'Make forms accessible with proper labels and error messaging.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Form Handling', description: 'Build validated forms.', tasks: ['Set up React Hook Form with register and handleSubmit', 'Add Zod validation with zodResolver', 'Handle form errors and submission states'] },
            ]
        },

        'styling-solutions': {
            id: 'styling-solutions',
            label: 'Styling',
            description: 'Choose between Tailwind CSS, CSS Modules, Styled Components, or CSS-in-JS.',
            parentId: 'react-ecosystem',
            resources: [
                { type: 'documentation', title: 'Tailwind CSS', url: 'https://tailwindcss.com/', isFree: true },
                { type: 'documentation', title: 'CSS Modules', url: 'https://github.com/css-modules/css-modules', isFree: true },
                { type: 'documentation', title: 'Styled Components', url: 'https://styled-components.com/', isFree: true },
            ],
            content: {
                overview: 'Styling in React has many approaches. Tailwind CSS uses utility classes directly in JSX (className="flex gap-4 p-2") — it is fast to develop with, tree-shakeable, and has become the most popular choice. CSS Modules scope regular CSS to individual components (import styles from "./Button.module.css") — no class name conflicts. Styled Components (CSS-in-JS) define styles in JavaScript with tagged template literals, allowing dynamic styling based on props. Vanilla CSS with BEM naming works but can lead to conflicts in large apps.',
                keyConcepts: [
                    'Tailwind CSS: utility-first approach',
                    'CSS Modules: scoped CSS with imports',
                    'Styled Components: CSS-in-JS with tagged templates',
                    'CSS variables for theming',
                    'Responsive design with breakpoints',
                    'Dark mode implementation strategies',
                    'Animation with Framer Motion'
                ],
                practiceQuestions: [
                    { question: 'When would you choose CSS Modules over Tailwind?', hint: 'When you prefer writing traditional CSS, need complex selectors, or want separation of concerns.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Pick one styling approach and use it consistently across the project.',
                    'Use CSS variables for theme values (colors, spacing, typography).',
                    'Design mobile-first, then add breakpoints for larger screens.',
                    'Use Framer Motion for smooth animations and transitions.'
                ]
            }
        },

        'react-advanced': {
            id: 'react-advanced',
            label: 'Advanced React',
            description: 'Performance optimization, testing, Next.js, and production patterns.',
            parentId: 'react-root',
            children: ['performance-optimization', 'testing-react', 'nextjs-advanced'],
            resources: [
                { type: 'article', title: 'React Design Patterns', url: 'https://www.patterns.dev/react', isFree: true },
            ],
            content: {
                overview: 'Advanced React covers the skills needed for production-grade applications: performance optimization (why your app is slow and how to fix it), testing (ensuring your code works and keeps working), and meta-frameworks (Next.js for SSR, routing, and full-stack capabilities). These topics separate junior developers from seniors — a senior React developer knows how to profile performance, write meaningful tests, and architect scalable applications.',
                keyConcepts: [
                    'Performance profiling with React DevTools',
                    'Code splitting and lazy loading',
                    'Testing: unit, integration, and E2E',
                    'Next.js App Router and Server Components',
                    'Error boundaries for graceful error handling',
                    'Accessibility (a11y) best practices',
                    'Security: XSS prevention, CSP headers'
                ]
            }
        },

        'performance-optimization': {
            id: 'performance-optimization',
            label: 'Performance',
            description: 'Optimize React apps with React.memo, useMemo, useCallback, lazy loading, code splitting, and React Profiler.',
            parentId: 'react-advanced',
            resources: [
                { type: 'documentation', title: 'React Profiler', url: 'https://react.dev/reference/react/Profiler', isFree: true },
            ],
            content: {
                overview: 'Performance optimization in React means reducing unnecessary re-renders and minimizing JavaScript sent to the browser. React.memo wraps a component to skip re-renders when props have not changed. useMemo caches expensive calculations. useCallback caches function references. Code splitting with React.lazy and dynamic import() breaks your app into smaller chunks loaded on demand. The React Profiler identifies which components re-render and why. Virtualization (react-window, react-virtuoso) renders only visible items in long lists. Always profile first to find actual bottlenecks — premature optimization wastes time and adds complexity.',
                keyConcepts: [
                    'React.memo for preventing unnecessary re-renders',
                    'useMemo and useCallback for memoization',
                    'React.lazy and Suspense for code splitting',
                    'React Profiler for identifying re-render bottlenecks',
                    'Virtualization for large lists',
                    'Web Vitals: LCP, FID, CLS',
                    'Bundle analysis with source-map-explorer',
                    'Image optimization with lazy loading and modern formats'
                ],
                practiceQuestions: [
                    { question: 'Should you wrap every component in React.memo?', hint: 'No. Only use it for components that re-render frequently with the same props. Overuse adds overhead.', difficulty: 'medium' },
                    { question: 'What are Web Vitals?', hint: 'Metrics measuring user experience: LCP (loading speed), FID (interactivity), CLS (visual stability).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Profile first, optimize second — never guess where the bottleneck is.',
                    'Code split at the route level at minimum.',
                    'Use React.memo only when profiling shows it helps.',
                    'Virtualize any list with more than 100 items.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'React Performance', description: 'Profile and optimize.', tasks: ['Profile an app with React DevTools Profiler', 'Implement React.memo and identify when it helps', 'Add code splitting with React.lazy on routes'] },
            ]
        },

        'testing-react': {
            id: 'testing-react',
            label: 'Testing React Apps',
            description: 'Test React components and user flows with Vitest, React Testing Library, and Playwright.',
            parentId: 'react-advanced',
            resources: [
                { type: 'documentation', title: 'React Testing Library', url: 'https://testing-library.com/docs/react-testing-library/intro/', isFree: true },
                { type: 'documentation', title: 'Vitest', url: 'https://vitest.dev/', isFree: true },
            ],
            content: {
                overview: 'Testing ensures your code works correctly and continues working as you add features. React Testing Library (RTL) tests components from the user\'s perspective — find elements by role, label, or text (not by CSS class or div id). Vitest (or Jest) is the test runner that executes your tests. Unit tests verify individual functions and hooks. Component tests verify that components render correctly and respond to user interactions (clicks, typing). Integration tests verify that multiple components work together. End-to-end (E2E) tests with Playwright or Cypress simulate real user flows in a browser.',
                keyConcepts: [
                    'React Testing Library: render, screen, fireEvent, waitFor',
                    'Testing by user behavior, not implementation details',
                    'Vitest/Jest as the test runner',
                    'Mocking API calls with MSW (Mock Service Worker)',
                    'Testing hooks with renderHook',
                    'Playwright for end-to-end browser testing',
                    'Code coverage analysis',
                    'Testing async operations and loading states'
                ],
                practiceQuestions: [
                    { question: 'Why should you test behavior instead of implementation?', hint: 'Implementation details change during refactoring. Behavior tests (what the user sees) survive refactors.', difficulty: 'medium' },
                    { question: 'What is MSW (Mock Service Worker)?', hint: 'A tool that intercepts network requests at the service worker level, providing realistic mock API responses for testing.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Test user-visible behavior, not internal component state.',
                    'Use MSW to mock API calls instead of mocking fetch directly.',
                    'Write integration tests that cover user workflows.',
                    'Add E2E tests for critical paths (login, checkout, signup).'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Component Testing', description: 'Unit and component tests.', tasks: ['Set up Vitest with React Testing Library', 'Write tests for a form component', 'Mock API calls with MSW'] },
                { day: 2, title: 'Integration & E2E', description: 'Test complete user flows.', tasks: ['Write integration tests for page flows', 'Set up Playwright for E2E testing', 'Add tests to CI/CD pipeline'] },
            ]
        },

        'nextjs-advanced': {
            id: 'nextjs-advanced',
            label: 'Next.js Deep Dive',
            description: 'Master Next.js App Router, Server Components, Server Actions, streaming, middleware, and deployment strategies.',
            parentId: 'react-advanced',
            resources: [
                { type: 'documentation', title: 'Next.js Documentation', url: 'https://nextjs.org/docs', isFree: true },
                { type: 'video', title: 'Next.js 14 Full Course', url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', isFree: true },
            ],
            content: {
                overview: 'Next.js is the most popular React meta-framework, providing a full-stack development experience. The App Router (introduced in Next.js 13) uses file-based routing with layouts, loading states, and error boundaries built into the file system. Server Components run on the server by default, sending only HTML (no JavaScript) to the client — drastically reducing bundle size. Client Components (marked with "use client") handle interactivity. Server Actions let you write server-side logic (database mutations, form submissions) directly in your components. Middleware runs before every request for auth checks, redirects, and header manipulation. Next.js deploys seamlessly to Vercel but also works with Docker, AWS, and any Node.js hosting.',
                keyConcepts: [
                    'App Router: file-based routing with page.tsx and layout.tsx',
                    'Server Components vs Client Components ("use client")',
                    'Server Actions for data mutations ("use server")',
                    'Streaming with loading.tsx and Suspense boundaries',
                    'Middleware for auth, redirects, and headers',
                    'Data fetching in Server Components (async/await)',
                    'Static and dynamic rendering',
                    'Deployment: Vercel, Docker, self-hosting'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between Server Components and Client Components?', hint: 'Server Components run on the server (no JavaScript sent to client). Client Components run in the browser (needed for interactivity, hooks, browser APIs).', difficulty: 'medium' },
                    { question: 'What are Server Actions?', hint: 'Functions marked with "use server" that run on the server. Called directly from client forms or components for data mutations.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Default to Server Components, add "use client" only when needed.',
                    'Use Server Actions for form submissions and data mutations.',
                    'Add loading.tsx files for streaming UX during server rendering.',
                    'Use Next.js Image component for automatic image optimization.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'App Router', description: 'File-based routing and layouts.', tasks: ['Create pages with the App Router file convention', 'Implement layouts, loading, and error boundaries', 'Use Server Components for data fetching'] },
                { day: 2, title: 'Full Stack Next.js', description: 'Server-side features.', tasks: ['Create Server Actions for form handling', 'Implement middleware for authentication', 'Deploy to Vercel'] },
            ]
        },

        'data-fetching': {
            id: 'data-fetching',
            label: 'Data Fetching',
            description: 'Fetch, cache, and synchronize server data with TanStack Query, SWR, or custom hooks.',
            parentId: 'react-root',
            children: ['tanstack-query'],
            resources: [
                { type: 'documentation', title: 'TanStack Query', url: 'https://tanstack.com/query/latest', isFree: true },
                { type: 'documentation', title: 'SWR', url: 'https://swr.vercel.app/', isFree: true },
            ],
            content: {
                overview: 'Data fetching in React goes beyond calling fetch in a useEffect. Production apps need caching, background refetching, loading and error states, pagination, infinite scrolling, and optimistic updates. TanStack Query (formerly React Query) is the standard for server state management — it caches responses, refetches in the background when data might be stale, handles loading/error states, and provides mutations for creating/updating/deleting data. SWR by Vercel is a lighter alternative with a similar "stale-while-revalidate" strategy. Both eliminate the need to store server data in Redux or Context.',
                keyConcepts: [
                    'TanStack Query: useQuery, useMutation',
                    'Caching, stale time, and background refetching',
                    'Loading, error, and success states',
                    'Pagination and infinite queries',
                    'Optimistic updates for instant UI feedback',
                    'Query invalidation and refetching',
                    'SWR: stale-while-revalidate pattern',
                    'Custom fetch hooks for simple use cases'
                ],
                practiceQuestions: [
                    { question: 'What does "stale-while-revalidate" mean?', hint: 'Show cached (stale) data immediately, then fetch fresh data in the background and update when ready.', difficulty: 'medium' },
                    { question: 'What is an optimistic update?', hint: 'Updating the UI immediately before the server confirms the change, rolling back if it fails.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use TanStack Query for all API data instead of managing it in state.',
                    'Configure appropriate staleTime and refetch intervals.',
                    'Implement optimistic updates for better UX on mutations.',
                    'Use queryClient.invalidateQueries to refresh related data after mutations.'
                ]
            }
        },

        'tanstack-query': {
            id: 'tanstack-query',
            label: 'TanStack Query',
            description: 'The industry standard for server state management in React applications.',
            parentId: 'data-fetching',
            resources: [
                { type: 'documentation', title: 'TanStack Query Docs', url: 'https://tanstack.com/query/latest/docs/framework/react/overview', isFree: true },
            ],
            content: {
                overview: 'TanStack Query replaces the pattern of fetching in useEffect and storing in useState. useQuery takes a query key (for caching) and a fetch function, returning { data, error, isLoading, isError, refetch }. useMutation handles create, update, and delete operations with onSuccess/onError callbacks. Query keys form a hierarchical caching system (["users"] contains all users, ["users", 1] is a specific user). Invalidating a parent key refetches all related queries. The QueryClient manages the cache and can be configured globally or per-query.',
                keyConcepts: [
                    'useQuery: fetching and caching data',
                    'useMutation: creating, updating, and deleting data',
                    'Query keys for hierarchical caching',
                    'queryClient.invalidateQueries for cache management',
                    'Dependent queries (enabled option)',
                    'useInfiniteQuery for infinite scrolling',
                    'Prefetching for instant navigation',
                    'Devtools for debugging queries'
                ],
                practiceQuestions: [
                    { question: 'What are query keys and why do they matter?', hint: 'Unique identifiers for cached data. Same key = same cached result. Different keys = different cache entries.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Structure query keys hierarchically: ["entity", id, "subresource"].',
                    'Always handle loading and error states.',
                    'Invalidate related queries after successful mutations.',
                    'Use the TanStack Query Devtools during development.'
                ]
            }
        }
    }
};
