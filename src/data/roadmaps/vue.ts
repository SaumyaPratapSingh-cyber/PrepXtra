
import { RoadmapTrack } from './types';

export const vueRoadmap: RoadmapTrack = {
    id: 'vue',
    title: 'Vue.js',
    description: 'Master the progressive JavaScript framework',
    category: 'skill-based',
    icon: '💚',
    accentColor: '#42b883',
    rootNodeId: 'vue-root',
    nodes: {
        'vue-root': {
            id: 'vue-root',
            label: 'Vue.js Mastery',
            description: 'Learn to build elegant, reactive web applications with Vue.',
            children: ['vue-basics', 'vue-composition', 'vue-routing', 'vue-state', 'vue-ecosystem'],
            resources: [
                { type: 'documentation', title: 'Vue.js Official Docs', url: 'https://vuejs.org/', isFree: true },
                { type: 'video', title: 'Vue.js Course for Beginners', url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', isFree: true },
                { type: 'course', title: 'Vue.js 3 - The Complete Guide (Udemy)', url: 'https://www.udemy.com/course/vuejs-2-the-complete-guide/', isFree: false },
                { type: 'article', title: 'Vue School', url: 'https://vueschool.io/', isFree: true }
            ],
            content: {
                overview: 'Vue.js is a progressive JavaScript framework for building user interfaces. Created by Evan You in 2014, it is designed to be incrementally adoptable — you can start with a simple script tag and progressively add more features as your application grows. Vue combines the best ideas from React (virtual DOM, component model) and Angular (directives, two-way binding) with a cleaner, more intuitive API. Vue 3 introduced the Composition API (inspired by React Hooks) which provides better logic reuse, TypeScript support, and code organization compared to the Options API. Vue is known for its excellent documentation, gentle learning curve, and developer-friendly error messages. It powers major applications at companies like GitLab, Alibaba, and Nintendo.',
                keyConcepts: [
                    'Reactive data binding and the virtual DOM',
                    'Single File Components (.vue files)',
                    'Options API vs Composition API',
                    'Template syntax: v-bind, v-on, v-if, v-for, v-model',
                    'Props and events for parent-child communication',
                    'Lifecycle hooks: onMounted, onUpdated, onUnmounted',
                    'Computed properties and watchers',
                    'Slots for content distribution'
                ],
                practiceQuestions: [
                    { question: 'What makes Vue "progressive"?', hint: 'You can use it as a simple library or scale up to a full framework with routing, state management, and build tools.', difficulty: 'easy' },
                    { question: 'What is the difference between Options API and Composition API?', hint: 'Options API organizes by options (data, methods, computed). Composition API organizes by logical concern using setup().', difficulty: 'medium' },
                    { question: 'How does Vue reactivity work under the hood?', hint: 'Vue 3 uses JavaScript Proxies to track reads and writes to reactive data, triggering re-renders when data changes.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use the Composition API with script setup for new projects.',
                    'Use TypeScript with Vue for type safety.',
                    'Keep components small and focused.',
                    'Use Nuxt for full-stack Vue applications with SSR.',
                    'Follow the official Vue style guide for naming and coding conventions.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Vue Fundamentals', description: 'Reactivity and template syntax.', tasks: ['Create a project with create-vue (Vite-based)', 'Learn template syntax: v-bind, v-on, v-if, v-for', 'Understand reactive state with ref() and reactive()'] },
                { day: 2, title: 'Components and Composition', description: 'Building reusable UI.', tasks: ['Create components with props and events', 'Use the Composition API with script setup', 'Learn computed properties and watchers'] },
                { day: 3, title: 'Routing and State', description: 'Full application architecture.', tasks: ['Set up Vue Router with dynamic routes and guards', 'Implement state management with Pinia', 'Build a complete CRUD application'] }
            ]
        },
        'vue-basics': {
            id: 'vue-basics',
            label: 'Vue Basics',
            description: 'Reactivity, template syntax, directives, and component fundamentals.',
            parentId: 'vue-root',
            resources: [
                { type: 'documentation', title: 'Vue Essentials', url: 'https://vuejs.org/guide/essentials/application.html', isFree: true }
            ],
            content: {
                overview: 'Vue basics start with understanding its reactivity system and template syntax. In the Composition API, you use ref() for primitive reactive values and reactive() for objects. When reactive data changes, the template automatically re-renders. Vue templates use a special syntax: v-bind (or : shorthand) for binding attributes, v-on (or @ shorthand) for event handling, v-if/v-else/v-show for conditional rendering, v-for for list rendering, and v-model for two-way input binding. Single File Components (.vue files) encapsulate template, script, and style in one file. The script setup syntax is the modern recommended way to write Vue components — it is more concise and provides better TypeScript integration.',
                keyConcepts: [
                    'ref() and reactive() for state',
                    'Template interpolation {{ }}',
                    'v-bind (:) for dynamic attributes',
                    'v-on (@) for event handling',
                    'v-if, v-else-if, v-else for conditional rendering',
                    'v-for with :key for list rendering',
                    'v-model for two-way binding',
                    'script setup for concise component definitions'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between ref() and reactive()?', hint: 'ref() wraps primitives (access via .value). reactive() wraps objects (access properties directly).', difficulty: 'medium' },
                    { question: 'When should you use v-if vs v-show?', hint: 'v-if removes/adds elements from DOM (use for rarely toggled). v-show uses CSS display (use for frequently toggled).', difficulty: 'easy' },
                    { question: 'Why do v-for lists need a :key attribute?', hint: 'Keys help Vue track list items for efficient re-rendering and maintaining component state.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use script setup for all new components.',
                    'Always provide a unique :key for v-for loops.',
                    'Use ref() for primitives, reactive() for objects.',
                    'Prefer v-if over v-show for elements that rarely toggle.'
                ]
            }
        },
        'vue-composition': {
            id: 'vue-composition',
            label: 'Composition API',
            description: 'Composables, lifecycle hooks, provide/inject, and logic reuse.',
            parentId: 'vue-root',
            resources: [
                { type: 'documentation', title: 'Composition API', url: 'https://vuejs.org/guide/extras/composition-api-faq.html', isFree: true }
            ],
            content: {
                overview: 'The Composition API is Vue\'s modern approach to organizing component logic. Instead of spreading related logic across data, methods, computed, and watch options, you group related code together. Composables are the key pattern — they are reusable functions that encapsulate stateful logic (like React custom hooks). A composable might handle fetching data, managing a form, or controlling a timer — and you can use it across multiple components. Lifecycle hooks (onMounted, onUpdated, onUnmounted) are called within setup. Provide/inject enables dependency injection from ancestor components to descendants without prop drilling. The Composition API also provides excellent TypeScript support with full type inference.',
                keyConcepts: [
                    'setup() function and script setup',
                    'Composables: reusable stateful logic (useXxx naming)',
                    'Lifecycle hooks: onMounted, onUpdated, onUnmounted',
                    'Computed refs for derived state',
                    'Watchers: watch() and watchEffect()',
                    'Provide/inject for dependency injection',
                    'toRefs and toRef for destructuring reactive objects',
                    'defineProps and defineEmits in script setup'
                ],
                practiceQuestions: [
                    { question: 'What is a composable in Vue?', hint: 'A function that uses Composition API to encapsulate and reuse stateful logic across components.', difficulty: 'easy' },
                    { question: 'What is the difference between watch() and watchEffect()?', hint: 'watch() explicitly specifies what to track. watchEffect() automatically tracks all reactive dependencies used inside it.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Name composables with the use prefix (useFetch, useAuth).',
                    'Use computed() for derived values instead of methods.',
                    'Clean up side effects in onUnmounted to prevent memory leaks.',
                    'Extract complex logic into composables for reusability.'
                ]
            }
        },
        'vue-routing': {
            id: 'vue-routing',
            label: 'Vue Router',
            description: 'Client-side routing, navigation guards, lazy loading, and nested routes.',
            parentId: 'vue-root',
            resources: [
                { type: 'documentation', title: 'Vue Router', url: 'https://router.vuejs.org/', isFree: true }
            ],
            content: {
                overview: 'Vue Router is the official router for Vue.js. It maps URL paths to components and handles navigation in single-page applications. Routes are defined as an array of objects with path, component, and optional meta, children, and props. Dynamic segments (/users/:id) capture URL parameters. Nested routes create layouts with child views rendered inside a router-view. Navigation guards (beforeEach, beforeResolve, afterEach) run before or after navigation — commonly used for authentication checks and page title updates. Lazy loading with dynamic imports splits route components into separate chunks that are loaded on demand.',
                keyConcepts: [
                    'Route definitions: path, component, name',
                    'Dynamic routes with params (/users/:id)',
                    'Nested routes and multiple router-views',
                    'Navigation: router.push, router.replace, RouterLink',
                    'Navigation guards: beforeEach, beforeEnter',
                    'Route meta fields for permissions and metadata',
                    'Lazy loading with dynamic import()',
                    'Query parameters and hash fragments'
                ],
                practiceQuestions: [
                    { question: 'How do you protect a route that requires authentication?', hint: 'Use a beforeEach navigation guard that checks if the user is logged in and redirects to login if not.', difficulty: 'medium' },
                    { question: 'What is the difference between router.push and router.replace?', hint: 'push adds a new entry to browser history. replace replaces the current entry (no back button).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Lazy load all route components for faster initial load.',
                    'Use named routes for navigation instead of hardcoded paths.',
                    'Implement a global beforeEach guard for authentication.',
                    'Add a catch-all route for 404 handling.'
                ]
            }
        },
        'vue-state': {
            id: 'vue-state',
            label: 'State Management (Pinia)',
            description: 'Pinia stores for global state, actions, getters, and persistence.',
            parentId: 'vue-root',
            resources: [
                { type: 'documentation', title: 'Pinia', url: 'https://pinia.vuejs.org/', isFree: true }
            ],
            content: {
                overview: 'Pinia is the official state management library for Vue (replacing Vuex). It provides a simple, type-safe way to manage global state that needs to be shared across components. A Pinia store is defined with defineStore and contains state (reactive data), getters (computed derived values), and actions (methods to modify state). Unlike Vuex, Pinia does not require mutations — you can modify state directly in actions. Pinia provides full TypeScript support with type inference, DevTools integration for debugging, and can be used with the Composition API or Options API syntax. Plugins like pinia-plugin-persistedstate can persist store state across page refreshes using localStorage.',
                keyConcepts: [
                    'defineStore with unique ID',
                    'State: reactive store data',
                    'Getters: computed derived values',
                    'Actions: methods to modify state (sync and async)',
                    'Using stores in components',
                    'storeToRefs for reactive destructuring',
                    'Pinia plugins for persistence and logging',
                    'Store composition: using one store inside another'
                ],
                practiceQuestions: [
                    { question: 'Why did Pinia replace Vuex?', hint: 'Pinia is simpler (no mutations), has better TypeScript support, and works naturally with the Composition API.', difficulty: 'easy' },
                    { question: 'What does storeToRefs do?', hint: 'It destructures store properties while preserving reactivity (without it, destructured values would not be reactive).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Create separate stores for each domain (auth, cart, user).',
                    'Use getters for derived state instead of computing in components.',
                    'Use storeToRefs when destructuring store state.',
                    'Only put truly global state in stores — not component-local state.'
                ]
            }
        },
        'vue-ecosystem': {
            id: 'vue-ecosystem',
            label: 'Vue Ecosystem',
            description: 'Nuxt, VitePress, Vitest, VueUse, and the broader Vue tooling.',
            parentId: 'vue-root',
            resources: [
                { type: 'documentation', title: 'Nuxt 3', url: 'https://nuxt.com/', isFree: true },
                { type: 'documentation', title: 'VueUse Composables', url: 'https://vueuse.org/', isFree: true }
            ],
            content: {
                overview: 'The Vue ecosystem extends far beyond the core framework. Nuxt is the full-stack meta-framework for Vue (similar to Next.js for React) providing server-side rendering, file-based routing, auto-imports, and full-stack capabilities. VitePress is a static site generator powered by Vue, ideal for documentation sites. Vitest is the Vite-native testing framework with a Jest-compatible API. VueUse is a collection of 200+ composables for common tasks like storage, sensors, animations, and browser APIs. UI component libraries include PrimeVue, Vuetify, and Quasar. Understanding this ecosystem helps you pick the right tools for your project needs.',
                keyConcepts: [
                    'Nuxt 3: SSR, SSG, file-based routing, auto-imports',
                    'VitePress for documentation sites',
                    'Vitest for fast unit and component testing',
                    'VueUse: composable collection (useStorage, useFetch, etc.)',
                    'UI libraries: PrimeVue, Vuetify, Quasar',
                    'Vite as the build tool for Vue projects',
                    'Vue DevTools for debugging',
                    'Storybook for component development'
                ],
                practiceQuestions: [
                    { question: 'When would you use Nuxt instead of plain Vue?', hint: 'When you need SSR for SEO, file-based routing, or full-stack features with API routes.', difficulty: 'medium' },
                    { question: 'What is VueUse?', hint: 'A large collection of pre-built composables for common operations like localStorage, mouse position, and dark mode.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use Nuxt for any project that needs SEO or server-side rendering.',
                    'Use VueUse composables before writing your own.',
                    'Use Vitest for testing Vue applications.',
                    'Choose a UI framework early and stick with it throughout the project.'
                ]
            }
        }
    }
};
