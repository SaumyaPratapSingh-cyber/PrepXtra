
import { RoadmapTrack } from './types';

export const flutterRoadmap: RoadmapTrack = {
    id: 'flutter',
    title: 'Flutter',
    description: 'Build beautiful native apps from a single codebase',
    category: 'skill-based',
    icon: '🦋',
    accentColor: '#027dfd',
    rootNodeId: 'flutter-root',
    nodes: {
        'flutter-root': {
            id: 'flutter-root',
            label: 'Flutter Mastery',
            description: 'Learn to build cross-platform mobile, web, and desktop apps with Dart and Flutter.',
            children: ['flutter-basics', 'flutter-widgets', 'flutter-navigation', 'flutter-state', 'flutter-data'],
            resources: [
                { type: 'documentation', title: 'Flutter Official Docs', url: 'https://docs.flutter.dev/', isFree: true },
                { type: 'video', title: 'Flutter Course for Beginners', url: 'https://www.youtube.com/watch?v=VPvVD8t02U8', isFree: true },
                { type: 'course', title: 'Flutter & Dart Complete Guide (Udemy)', url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/', isFree: false },
                { type: 'article', title: 'Flutter Codelabs', url: 'https://docs.flutter.dev/codelabs', isFree: true }
            ],
            content: {
                overview: 'Flutter is Google\'s open-source UI toolkit for building natively compiled applications for mobile (iOS and Android), web, and desktop from a single Dart codebase. Unlike React Native or Ionic, Flutter does not use native platform widgets — it renders everything with its own high-performance engine (Skia/Impeller), giving you pixel-perfect control over every visual element. This means your app looks identical on every platform. Flutter uses Dart, a strongly-typed, object-oriented language optimized for UI development. The "hot reload" feature lets you see changes instantly without losing application state. Flutter\'s widget-based architecture means everything is a widget: text, buttons, padding, layout, and even the app itself.',
                keyConcepts: [
                    'Dart programming language fundamentals',
                    'Everything is a widget',
                    'StatelessWidget vs StatefulWidget',
                    'Widget tree, element tree, and render tree',
                    'Material Design and Cupertino (iOS) widgets',
                    'Hot reload for instant development feedback',
                    'Platform channels for native code integration',
                    'Pub.dev: the Dart/Flutter package ecosystem'
                ],
                practiceQuestions: [
                    { question: 'How does Flutter differ from React Native?', hint: 'Flutter renders its own widgets with Skia. React Native bridges to native platform widgets. Flutter gives more control over appearance.', difficulty: 'easy' },
                    { question: 'What is the difference between StatelessWidget and StatefulWidget?', hint: 'Stateless has no mutable state — it rebuilds with new props. Stateful has internal state via setState().', difficulty: 'easy' },
                    { question: 'How does hot reload work?', hint: 'It injects updated code into the running Dart VM without restarting, preserving app state.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Follow the Flutter style guide and use dart format for consistent code.',
                    'Break large widgets into smaller, reusable components.',
                    'Use const constructors wherever possible for better performance.',
                    'Choose a state management solution early (Riverpod or BLoC for large apps).',
                    'Test on both iOS and Android regularly, not just one platform.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Dart and Flutter Basics', description: 'Language and first app.', tasks: ['Learn Dart basics: types, functions, classes, async/await', 'Create a Flutter project and understand the folder structure', 'Build a simple app with Text, Container, Column, and Row'] },
                { day: 2, title: 'Widgets and State', description: 'UI building and interactivity.', tasks: ['Learn layout widgets: Scaffold, AppBar, ListView, GridView', 'Build forms with TextField, buttons, and validation', 'Understand StatefulWidget and setState'] },
                { day: 3, title: 'Navigation and Data', description: 'Multi-screen apps.', tasks: ['Set up named routes and navigation with arguments', 'Fetch data from REST APIs with http package', 'Implement state management with Provider or Riverpod'] }
            ]
        },
        'flutter-basics': {
            id: 'flutter-basics',
            label: 'Dart & Setup',
            description: 'Dart language fundamentals and Flutter project structure.',
            parentId: 'flutter-root',
            resources: [
                { type: 'documentation', title: 'Dart Language Tour', url: 'https://dart.dev/language', isFree: true }
            ],
            content: {
                overview: 'Before building Flutter apps, you need to understand Dart. Dart is a statically-typed, object-oriented language with a syntax familiar to JavaScript, Java, and C# developers. Key features include null safety (variables cannot be null unless explicitly declared as nullable with ?), async/await for asynchronous programming, collections (List, Map, Set), and classes with named constructors and factory methods. Flutter projects have a specific structure: lib/ contains your Dart source code, pubspec.yaml defines dependencies and metadata, and platform folders (android/, ios/, web/) contain platform-specific configuration. The main.dart file is the entry point with runApp() launching the widget tree.',
                keyConcepts: [
                    'Dart types: String, int, double, bool, List, Map',
                    'Null safety: String? vs String',
                    'Functions: named parameters, default values, arrow syntax',
                    'Classes: constructors, named constructors, factory',
                    'Async/await and Futures',
                    'Streams for continuous data',
                    'pubspec.yaml for project configuration',
                    'Flutter CLI: flutter create, run, build'
                ],
                practiceQuestions: [
                    { question: 'What is null safety in Dart?', hint: 'Variables cannot be null unless you explicitly mark them with ? (e.g., String? name). This prevents null reference errors.', difficulty: 'easy' },
                    { question: 'What is a Future in Dart?', hint: 'An object representing a value that will be available in the future — used for async operations like API calls.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Enable strict null safety in all projects.',
                    'Use final for variables that do not change after assignment.',
                    'Organize code with feature-based folder structure in lib/.',
                    'Keep main.dart minimal — just the app startup.'
                ]
            }
        },
        'flutter-widgets': {
            id: 'flutter-widgets',
            label: 'Widgets & Layouts',
            description: 'Building UI with layout widgets, Material Design, and custom widgets.',
            parentId: 'flutter-root',
            resources: [
                { type: 'documentation', title: 'Flutter Widget Catalog', url: 'https://docs.flutter.dev/ui/widgets', isFree: true }
            ],
            content: {
                overview: 'Flutter\'s UI is built entirely with widgets. Layout widgets control how children are positioned: Row (horizontal), Column (vertical), Stack (overlapping), Wrap (flowing), and Expanded/Flexible (flex distribution). Container adds padding, margins, decoration, and constraints. Scaffold provides the standard Material Design app structure with AppBar, body, FloatingActionButton, Drawer, and BottomNavigationBar. ListView and GridView handle scrollable lists. Custom widgets are created by composing existing widgets in new build() methods. Understanding constraints (how parent widgets tell children their available space) is essential for building responsive layouts.',
                keyConcepts: [
                    'Layout widgets: Row, Column, Stack, Wrap',
                    'Flex widgets: Expanded, Flexible, Spacer',
                    'Container: padding, margin, decoration, constraints',
                    'Scaffold, AppBar, and Material Design structure',
                    'ListView, GridView for scrollable content',
                    'Text, Image, Icon, and Button widgets',
                    'Custom widgets and widget composition',
                    'Constraint-based layout model'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between Expanded and Flexible?', hint: 'Expanded forces the child to fill all available space. Flexible allows the child to be smaller than the available space.', difficulty: 'medium' },
                    { question: 'When would you use a Stack widget?', hint: 'When you need to overlay widgets on top of each other, like a badge on an icon or text over an image.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Mark widgets with const when they do not change for better performance.',
                    'Use themed styling (ThemeData) instead of inline styles.',
                    'Break complex UIs into smaller widget classes.',
                    'Use ListView.builder for long lists (lazy loading) instead of ListView.'
                ]
            }
        },
        'flutter-navigation': {
            id: 'flutter-navigation',
            label: 'Navigation',
            description: 'Routing, named routes, Navigator 2.0, and deep linking.',
            parentId: 'flutter-root',
            resources: [
                { type: 'documentation', title: 'Navigation & Routing', url: 'https://docs.flutter.dev/ui/navigation', isFree: true }
            ],
            content: {
                overview: 'Navigation in Flutter moves users between different screens (routes). The simplest approach uses Navigator.push and Navigator.pop to navigate between pages using a stack model. Named routes define paths in the MaterialApp and navigate with Navigator.pushNamed. For more complex apps, packages like go_router provide URL-based routing with deep linking support, nested routing, and redirects. Deep linking lets users open specific screens from external URLs (important for sharing and notifications). Bottom navigation bars and tab bars provide in-screen navigation patterns. Navigator 2.0 (the Router API) provides declarative routing for advanced use cases.',
                keyConcepts: [
                    'Navigator.push and Navigator.pop (imperative navigation)',
                    'Named routes with MaterialApp routes map',
                    'Passing data between routes',
                    'go_router for declarative URL-based routing',
                    'Deep linking from URLs to specific screens',
                    'Bottom navigation and tab bar patterns',
                    'Nested navigation for complex layouts',
                    'Route transitions and animations'
                ],
                practiceQuestions: [
                    { question: 'How do you pass data to a new screen?', hint: 'Through constructor parameters of the screen widget, or using arguments in Navigator.pushNamed.', difficulty: 'easy' },
                    { question: 'What is deep linking?', hint: 'Opening a specific screen in your app from an external URL (e.g., myapp://profile/123).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use go_router for production apps (type-safe, declarative, supports deep linking).',
                    'Define route constants to avoid hardcoding path strings.',
                    'Implement route guards for authentication checks.',
                    'Handle unknown routes with a 404/error screen.'
                ]
            }
        },
        'flutter-state': {
            id: 'flutter-state',
            label: 'State Management',
            description: 'setState, Provider, Riverpod, BLoC, and choosing the right approach.',
            parentId: 'flutter-root',
            resources: [
                { type: 'documentation', title: 'State Management Docs', url: 'https://docs.flutter.dev/data-and-backend/state-mgmt', isFree: true },
                { type: 'documentation', title: 'Riverpod', url: 'https://riverpod.dev/', isFree: true }
            ],
            content: {
                overview: 'State management is the most discussed topic in Flutter development. setState() is the built-in approach — it works for local, widget-level state but does not scale well for state shared across many widgets. Provider (by the Flutter team) is a simple wrapper around InheritedWidget for sharing state down the widget tree. Riverpod (by the same author) is the evolution of Provider — it is compile-safe, testable, and does not depend on BuildContext. BLoC (Business Logic Component) uses streams to separate business logic from UI, popular in large enterprise apps. GetX provides a simpler but less structured alternative. The choice depends on your app\'s complexity and team preferences.',
                keyConcepts: [
                    'setState for local widget state',
                    'InheritedWidget: how state sharing works under the hood',
                    'Provider for simple dependency injection and state',
                    'Riverpod: providers, notifiers, and auto-dispose',
                    'BLoC pattern: events, states, and streams',
                    'ChangeNotifier and ValueNotifier',
                    'Ephemeral state vs app state',
                    'State persistence across app restarts'
                ],
                practiceQuestions: [
                    { question: 'When is setState sufficient vs when do you need a state management library?', hint: 'setState is fine for state that stays within one widget. Use a library when state needs to be shared across many widgets.', difficulty: 'medium' },
                    { question: 'What is the difference between Provider and Riverpod?', hint: 'Riverpod is compile-safe, does not depend on BuildContext, and supports auto-dispose. Provider has some runtime limitations.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Start with setState for simple apps, migrate to Riverpod as complexity grows.',
                    'Separate business logic from UI code.',
                    'Use Riverpod for new projects — it is the recommended approach.',
                    'Avoid mixing multiple state management solutions in one app.'
                ]
            }
        },
        'flutter-data': {
            id: 'flutter-data',
            label: 'Data & APIs',
            description: 'REST APIs, local storage, Firebase, and serialization.',
            parentId: 'flutter-root',
            resources: [
                { type: 'documentation', title: 'Networking in Flutter', url: 'https://docs.flutter.dev/data-and-backend/networking', isFree: true }
            ],
            content: {
                overview: 'Most Flutter apps need to fetch data from APIs and store data locally. The http package handles REST API calls, while dio provides a more feature-rich HTTP client with interceptors, cancellation, and file upload. JSON serialization converts API responses to Dart objects using json_serializable and freezed packages for code generation. Local storage options include shared_preferences for key-value pairs, sqflite for SQLite databases, Hive for fast NoSQL storage, and drift (formerly moor) for type-safe SQL. Firebase provides a backend-as-a-service with authentication, Firestore (NoSQL database), Cloud Storage, push notifications, and analytics — all with first-class Flutter SDKs.',
                keyConcepts: [
                    'HTTP requests with http and dio packages',
                    'JSON serialization: fromJson/toJson',
                    'Code generation with json_serializable and freezed',
                    'SharedPreferences for simple key-value storage',
                    'SQLite with sqflite or drift',
                    'Hive for fast local NoSQL storage',
                    'Firebase Auth, Firestore, and Cloud Storage',
                    'Error handling and loading states for async data'
                ],
                practiceQuestions: [
                    { question: 'Why use code generation for JSON serialization?', hint: 'Manually writing fromJson/toJson is error-prone and tedious. Code generation (json_serializable) automates it from annotations.', difficulty: 'medium' },
                    { question: 'When would you use Hive over SQLite?', hint: 'Hive is faster for simple key-value or document storage. SQLite is better when you need complex queries and relations.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use dio with interceptors for API calls in production apps.',
                    'Use code generation (freezed + json_serializable) for data models.',
                    'Handle loading, error, and success states for every API call.',
                    'Cache API responses locally for offline support.',
                    'Use environment variables for API keys and base URLs.'
                ]
            }
        }
    }
};
