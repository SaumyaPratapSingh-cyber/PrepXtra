
import { RoadmapTrack } from './types';

export const angularRoadmap: RoadmapTrack = {
    id: 'angular',
    title: 'Angular',
    description: 'Master the enterprise-grade TypeScript framework by Google',
    category: 'skill-based',
    icon: '🅰️',
    accentColor: '#dd0031',
    rootNodeId: 'angular-root',
    nodes: {
        'angular-root': {
            id: 'angular-root',
            label: 'Angular Mastery',
            description: 'Learn to build enterprise-grade, scalable web applications with Angular.',
            children: ['angular-basics', 'angular-components', 'angular-services', 'angular-routing', 'angular-forms', 'angular-rxjs'],
            resources: [
                { type: 'documentation', title: 'Angular Official Docs', url: 'https://angular.dev/', isFree: true },
                { type: 'video', title: 'Angular Full Course - Academind', url: 'https://www.youtube.com/watch?v=3qBXWUpoPHo', isFree: true },
                { type: 'course', title: 'Angular - The Complete Guide (Udemy)', url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/', isFree: false }
            ],
            content: {
                overview: 'Angular is a full-featured, opinionated framework for building single-page applications, developed and maintained by Google. Unlike React (a library) or Vue (a progressive framework), Angular provides everything out of the box: routing, forms handling, HTTP client, dependency injection, and a powerful CLI. Angular uses TypeScript exclusively, enforcing type safety and enabling superior tooling. It follows the Model-View-Controller pattern with components as the building blocks. Angular is particularly popular in enterprise environments where large teams need consistent architecture and conventions. The framework has evolved significantly — Angular 17+ introduced standalone components (no NgModules needed), signals for reactive state management, and control flow syntax that modernize the developer experience significantly.',
                keyConcepts: [
                    'Components: templates, styles, and logic in one unit',
                    'TypeScript-first: static typing throughout',
                    'Dependency Injection (DI) for service management',
                    'Angular CLI for scaffolding and building',
                    'Modules and standalone components',
                    'RxJS and Observables for reactive programming',
                    'Two-way data binding with ngModel',
                    'Signals for fine-grained reactivity (Angular 17+)'
                ],
                practiceQuestions: [
                    { question: 'How does Angular differ from React?', hint: 'Angular is a full framework with routing, forms, and DI built in. React is a UI library that needs external packages for those features.', difficulty: 'easy' },
                    { question: 'What is Dependency Injection in Angular?', hint: 'A design pattern where Angular creates and provides service instances to components, rather than components creating them.', difficulty: 'medium' },
                    { question: 'What are Signals in Angular and why were they introduced?', hint: 'Signals provide fine-grained reactive state management, replacing zone.js-based change detection for better performance.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use the Angular CLI for generating components, services, and modules.',
                    'Use standalone components instead of NgModules for new projects.',
                    'Follow the Angular style guide for consistent naming and file structure.',
                    'Use lazy loading for routes to reduce initial bundle size.',
                    'Use OnPush change detection strategy for better performance.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Angular Fundamentals', description: 'Project setup and components.', tasks: ['Create a project with the Angular CLI', 'Understand components, templates, and data binding', 'Learn directives: ngIf, ngFor, and the new control flow syntax'] },
                { day: 2, title: 'Services and Routing', description: 'Application architecture.', tasks: ['Create services and inject them with DI', 'Set up routing with RouterModule and lazy loading', 'Make HTTP requests with HttpClient'] },
                { day: 3, title: 'Forms and State', description: 'User input and reactivity.', tasks: ['Build forms with Reactive Forms and FormBuilder', 'Learn RxJS basics: Observables, pipe, map, filter', 'Explore Signals for fine-grained state management'] }
            ]
        },
        'angular-basics': {
            id: 'angular-basics',
            label: 'Basics & CLI',
            description: 'Project structure, the Angular CLI, and TypeScript fundamentals.',
            parentId: 'angular-root',
            resources: [
                { type: 'documentation', title: 'Angular Getting Started', url: 'https://angular.dev/tutorials/learn-angular', isFree: true }
            ],
            content: {
                overview: 'Angular projects are created using the Angular CLI (ng new). The CLI generates a well-organized project structure with configuration, testing, and build tooling already set up. Every Angular app has a root component (AppComponent) that bootstraps the application. The project uses TypeScript, which you should be comfortable with before diving into Angular. Angular uses decorators (@Component, @Injectable, @NgModule) to add metadata to classes. The CLI provides commands for generating components (ng generate component), services, pipes, guards, and more. Understanding the angular.json configuration, the module system, and the build process (ng serve for development, ng build for production) is essential.',
                keyConcepts: [
                    'Angular CLI: ng new, ng serve, ng generate, ng build',
                    'Project structure: src/app, angular.json, tsconfig',
                    'Decorators: @Component, @Injectable, @NgModule',
                    'Standalone components vs NgModules',
                    'TypeScript fundamentals for Angular',
                    'Template syntax and interpolation',
                    'Property binding [prop] and event binding (event)',
                    'Environments and configuration'
                ],
                practiceQuestions: [
                    { question: 'What does ng generate component do?', hint: 'It scaffolds a new component with its TypeScript, HTML, CSS files and registers it.', difficulty: 'easy' },
                    { question: 'What is the difference between ng serve and ng build?', hint: 'ng serve starts a development server with hot reload. ng build creates an optimized production bundle.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always use the CLI for generating new artifacts — it follows conventions.',
                    'Keep components small and focused on a single responsibility.',
                    'Use environment files for environment-specific configuration.',
                    'Enable strict mode in TypeScript for better type safety.'
                ]
            }
        },
        'angular-components': {
            id: 'angular-components',
            label: 'Components & Templates',
            description: 'Data binding, directives, pipes, and component lifecycle.',
            parentId: 'angular-root',
            resources: [
                { type: 'documentation', title: 'Angular Components', url: 'https://angular.dev/guide/components', isFree: true }
            ],
            content: {
                overview: 'Components are the fundamental building blocks of Angular applications. Each component has a TypeScript class (logic), an HTML template (view), and a CSS file (styles). Angular provides four types of data binding: interpolation ({{ value }}), property binding ([property]="value"), event binding ((event)="handler()"), and two-way binding ([(ngModel)]="value"). Built-in directives like *ngIf, *ngFor, and *ngSwitch control rendering. Angular 17+ introduced a new control flow syntax (@if, @for, @switch) that replaces structural directives. Pipes transform displayed data (DatePipe, CurrencyPipe, custom pipes). Understanding the component lifecycle hooks (ngOnInit, ngOnChanges, ngOnDestroy) is essential for managing initialization, cleanup, and responding to input changes.',
                keyConcepts: [
                    'Four types of data binding',
                    'Structural directives: *ngIf, *ngFor, *ngSwitch',
                    'New control flow: @if, @for, @switch (Angular 17+)',
                    'Pipes for data transformation (built-in and custom)',
                    'Component lifecycle hooks: OnInit, OnChanges, OnDestroy',
                    'Input/Output decorators for parent-child communication',
                    'Content projection with ng-content',
                    'ViewChild and ContentChild for element references'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between property binding and interpolation?', hint: 'Interpolation works only with strings. Property binding can bind any type to an element property.', difficulty: 'easy' },
                    { question: 'When is ngOnInit called vs the constructor?', hint: 'The constructor is called when the class is instantiated. ngOnInit is called after Angular finishes setting up inputs.', difficulty: 'medium' },
                    { question: 'What is content projection?', hint: 'Allowing a parent to inject content into a child component using ng-content (like React children).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use the new control flow syntax (@if, @for) over structural directives.',
                    'Put initialization logic in ngOnInit, not the constructor.',
                    'Unsubscribe from observables in ngOnDestroy to prevent memory leaks.',
                    'Use OnPush change detection for better performance in large apps.'
                ]
            }
        },
        'angular-services': {
            id: 'angular-services',
            label: 'Services & DI',
            description: 'Dependency injection, HttpClient, and shared business logic.',
            parentId: 'angular-root',
            resources: [
                { type: 'documentation', title: 'Angular Dependency Injection', url: 'https://angular.dev/guide/di', isFree: true }
            ],
            content: {
                overview: 'Services in Angular encapsulate business logic, data access, and shared functionality. They are plain TypeScript classes decorated with @Injectable that are provided to components through Angular\'s dependency injection (DI) system. Instead of components creating their own service instances, Angular creates a single instance (singleton by default) and provides it wherever needed. This makes services testable (you can inject mock services during testing) and promotes loose coupling. The HttpClient module is an Angular service for making HTTP requests — it returns Observables, integrating naturally with Angular\'s reactive patterns. Interceptors allow you to modify all outgoing requests or incoming responses (adding auth headers, handling errors globally).',
                keyConcepts: [
                    'Creating services with @Injectable',
                    'Providing services: root, module, or component level',
                    'Constructor injection vs inject() function',
                    'HttpClient for REST API communication',
                    'HTTP Interceptors for cross-cutting concerns',
                    'Error handling with catchError and retry',
                    'Singleton vs scoped service instances',
                    'Using services for state management'
                ],
                practiceQuestions: [
                    { question: 'What does providedIn: root mean?', hint: 'It makes the service a singleton available throughout the entire application without needing to add it to providers.', difficulty: 'easy' },
                    { question: 'What is an HTTP Interceptor?', hint: 'Middleware that intercepts outgoing HTTP requests and incoming responses — commonly used for adding auth tokens.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use providedIn: root for application-wide services.',
                    'Keep services focused on a single domain or feature.',
                    'Use interceptors for authentication headers and global error handling.',
                    'Return typed Observables from HttpClient for type safety.'
                ]
            }
        },
        'angular-routing': {
            id: 'angular-routing',
            label: 'Routing',
            description: 'Navigation, lazy loading, guards, and route resolvers.',
            parentId: 'angular-root',
            resources: [
                { type: 'documentation', title: 'Angular Router', url: 'https://angular.dev/guide/routing', isFree: true }
            ],
            content: {
                overview: 'Angular Router handles navigation between views (components) in a single-page application. Routes map URL paths to components. Route parameters let you pass dynamic values (like /users/:id). Child routes create nested layouts. Lazy loading is a critical performance optimization — instead of loading the entire application upfront, you split it into feature modules that are loaded only when the user navigates to their route. Route guards (CanActivate, CanDeactivate, CanMatch) control access to routes, commonly used for authentication (redirect to login if not authenticated). Route resolvers pre-fetch data before a route is activated.',
                keyConcepts: [
                    'Route configuration: path, component, children',
                    'RouterLink and programmatic navigation (Router.navigate)',
                    'Route parameters and query parameters',
                    'Child routes and nested layouts',
                    'Lazy loading with loadComponent and loadChildren',
                    'Route guards: CanActivate, CanDeactivate',
                    'Route resolvers for pre-fetching data',
                    'Router outlet for rendering routed components'
                ],
                practiceQuestions: [
                    { question: 'What is lazy loading and why is it important?', hint: 'It defers loading a module/component until the user navigates to its route, reducing initial bundle size.', difficulty: 'medium' },
                    { question: 'What is a CanActivate guard?', hint: 'A function that runs before a route is activated — if it returns false, navigation is blocked (used for auth checks).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Lazy load every feature module for better initial load time.',
                    'Use functional guards and resolvers (Angular 15+) instead of class-based ones.',
                    'Implement a wildcard route (**) for 404 handling.',
                    'Use route parameters for entity IDs, query parameters for optional filters.'
                ]
            }
        },
        'angular-forms': {
            id: 'angular-forms',
            label: 'Forms',
            description: 'Template-driven forms, Reactive forms, validation, and FormBuilder.',
            parentId: 'angular-root',
            resources: [
                { type: 'documentation', title: 'Angular Forms', url: 'https://angular.dev/guide/forms', isFree: true }
            ],
            content: {
                overview: 'Angular provides two approaches to forms. Template-driven forms use directives (ngModel) in the template and are simpler for basic forms. Reactive forms are defined programmatically in the component class using FormGroup, FormControl, and FormBuilder, providing more control, testability, and scalability. Reactive forms are recommended for complex forms with dynamic fields, custom validation, or nested data. Angular provides built-in validators (required, minLength, maxLength, email, pattern) and allows custom validators. Form state tracking (dirty, touched, valid, invalid, pristine) lets you show validation messages and enable/disable submit buttons based on form state.',
                keyConcepts: [
                    'Template-driven forms with ngModel',
                    'Reactive forms with FormGroup and FormControl',
                    'FormBuilder for concise form creation',
                    'Built-in validators and custom validators',
                    'Form state: valid, invalid, dirty, touched, pristine',
                    'FormArrays for dynamic form fields',
                    'Cross-field validation',
                    'Async validators for server-side checks'
                ],
                practiceQuestions: [
                    { question: 'When should you use Reactive Forms over Template-driven forms?', hint: 'For complex forms with dynamic fields, custom validation, or when you need programmatic control and testing.', difficulty: 'medium' },
                    { question: 'What is a FormArray?', hint: 'A form control that holds an array of controls, useful for dynamic fields like adding/removing items.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use Reactive Forms for any form beyond simple login/signup.',
                    'Show validation messages only after the field is touched.',
                    'Use FormBuilder for cleaner form definitions.',
                    'Create reusable custom validators for common patterns.'
                ]
            }
        },
        'angular-rxjs': {
            id: 'angular-rxjs',
            label: 'RxJS & Observables',
            description: 'Reactive programming with RxJS operators, Subjects, and async patterns.',
            parentId: 'angular-root',
            resources: [
                { type: 'documentation', title: 'RxJS Documentation', url: 'https://rxjs.dev/', isFree: true },
                { type: 'article', title: 'Learn RxJS', url: 'https://www.learnrxjs.io/', isFree: true }
            ],
            content: {
                overview: 'RxJS (Reactive Extensions for JavaScript) is deeply integrated into Angular. HTTP requests, route events, form changes, and user interactions are all represented as Observables — streams of values over time. Understanding RxJS operators is essential for effective Angular development. The pipe function chains operators that transform, filter, and combine streams. Common operators include map (transform values), filter (exclude values), switchMap (cancel previous and switch to new), mergeMap (handle in parallel), debounceTime (wait for pause), and distinctUntilChanged (skip duplicates). Subjects are special Observables that can multicast values to multiple subscribers. BehaviorSubject holds and emits the latest value. Managing subscriptions (preventing memory leaks) is a key consideration.',
                keyConcepts: [
                    'Observables: cold vs hot',
                    'pipe and chaining operators',
                    'Transformation operators: map, switchMap, mergeMap, concatMap',
                    'Filtering operators: filter, debounceTime, distinctUntilChanged',
                    'Subjects: Subject, BehaviorSubject, ReplaySubject',
                    'Combining streams: combineLatest, forkJoin, merge',
                    'Error handling: catchError, retry, retryWhen',
                    'Subscription management: takeUntil, async pipe'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between switchMap and mergeMap?', hint: 'switchMap cancels the previous inner observable when a new value comes. mergeMap handles all in parallel.', difficulty: 'hard' },
                    { question: 'How do you prevent memory leaks with Observables?', hint: 'Use the async pipe in templates (auto-unsubscribes), or manually unsubscribe in ngOnDestroy.', difficulty: 'medium' },
                    { question: 'What is a BehaviorSubject?', hint: 'A Subject that holds the current value and emits it immediately to new subscribers.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use the async pipe in templates to auto-manage subscriptions.',
                    'Use switchMap for search/autocomplete (cancel previous requests).',
                    'Use takeUntil with a destroy Subject for manual subscription cleanup.',
                    'Prefer Signals over RxJS for simple synchronous state in Angular 17+.'
                ]
            }
        }
    }
};
