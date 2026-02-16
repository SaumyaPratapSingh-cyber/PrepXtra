
import { RoadmapTrack } from './types';

export const androidRoadmap: RoadmapTrack = {
    id: 'android',
    title: 'Android Developer',
    description: 'Complete guide to becoming an Android Developer in 2025',
    category: 'role-based',
    icon: '📱',
    accentColor: '#34d399',
    rootNodeId: 'android-root',
    nodes: {
        'android-root': {
            id: 'android-root',
            label: 'Android Development',
            description: 'Build native Android apps using Kotlin and Jetpack Compose.',
            children: ['android-kotlin', 'android-ui', 'android-arch'],
            resources: [
                { type: 'article', title: 'Android Roadmap', url: 'https://roadmap.sh/android', isFree: true },
                { type: 'documentation', title: 'Android Developers', url: 'https://developer.android.com/', isFree: true },
                { type: 'video', title: 'Android Development Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=fis26HvvDII', isFree: true }
            ],
            content: {
                overview: 'Android is the world\'s most popular mobile operating system, powering over 70% of smartphones globally. Modern Android development uses Kotlin as the primary language (officially recommended by Google since 2019) and Jetpack Compose for building UIs declaratively. The Android ecosystem includes Android Studio (the official IDE), Gradle (the build system), and a rich set of Jetpack libraries for navigation, database, networking, and architecture. Android apps run on a wide variety of devices with different screen sizes, hardware capabilities, and OS versions, making responsive design and backward compatibility important considerations.',
                keyConcepts: [
                    'Kotlin as the primary Android language',
                    'Jetpack Compose for declarative UI',
                    'Android app lifecycle: Activity, Fragment, Service',
                    'Material Design 3 for consistent UI',
                    'Architecture patterns: MVVM, Clean Architecture',
                    'Jetpack libraries: Navigation, Room, Hilt, WorkManager',
                    'Gradle build system and dependencies',
                    'Google Play Store deployment'
                ],
                practiceQuestions: [
                    { question: 'Why did Google choose Kotlin over Java for Android?', hint: 'Kotlin is more concise, null-safe by default, has coroutines for async programming, and is fully interoperable with Java.', difficulty: 'easy' },
                    { question: 'What is the difference between Jetpack Compose and XML layouts?', hint: 'Compose builds UI with Kotlin functions (declarative). XML uses markup files (imperative). Compose is the modern recommended approach.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use Kotlin for all new Android projects.',
                    'Build UI with Jetpack Compose instead of XML layouts.',
                    'Follow the official Android app architecture guidelines.',
                    'Test on multiple device sizes and Android versions.',
                    'Use Android Studio profiling tools for performance optimization.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Android Overview', description: 'Get started with Android.', tasks: ['Install Android Studio', 'Create your first Kotlin project', 'Understand the Android app lifecycle'] },
                { day: 2, title: 'Jetpack Compose', description: 'Build your first UI.', tasks: ['Learn Compose basics: Text, Button, Column, Row', 'Build a simple counter app', 'Apply Material Design 3 theming'] },
                { day: 3, title: 'App Architecture', description: 'Structure your app properly.', tasks: ['Implement MVVM with ViewModel', 'Set up Hilt for dependency injection', 'Connect to a REST API with Retrofit'] }
            ]
        },
        'android-kotlin': {
            id: 'android-kotlin',
            label: 'Kotlin',
            description: 'Modern, concise language for Android development with null safety and coroutines.',
            parentId: 'android-root',
            children: ['kotlin-basics', 'kotlin-coroutines'],
            resources: [
                { type: 'documentation', title: 'Kotlin Lang', url: 'https://kotlinlang.org/docs/home.html', isFree: true }
            ],
            content: {
                overview: 'Kotlin is a modern, statically typed language developed by JetBrains that runs on the JVM. It is 100% interoperable with Java, meaning you can use all existing Java/Android libraries. Kotlin reduces boilerplate significantly compared to Java: data classes replace hundreds of lines of getters/setters/equals/hashCode, null safety catches NullPointerExceptions at compile time, extension functions add behavior to existing classes, and coroutines provide structured concurrency without callback hell. Since Google declared Kotlin the preferred language for Android in 2019, the vast majority of new Android apps are written in Kotlin.',
                keyConcepts: [
                    'Variables: val (immutable) vs var (mutable)',
                    'Null safety: String? vs String, safe calls (?.), elvis (?:)',
                    'Data classes, sealed classes, enums',
                    'Extension functions and properties',
                    'Lambda expressions and higher-order functions',
                    'Collections: List, Map, Set with functional operations',
                    'Scope functions: let, apply, also, run, with',
                    'Type inference and smart casts'
                ],
                practiceQuestions: [
                    { question: 'What is null safety in Kotlin?', hint: 'Variables cannot be null unless marked with ?. The compiler forces you to handle null cases, preventing NullPointerException.', difficulty: 'easy' },
                    { question: 'What is the difference between val and var?', hint: 'val is immutable (read-only, like final in Java). var is mutable and can be reassigned.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use val by default, only use var when the value must change.',
                    'Use data classes for model/entity objects.',
                    'Avoid using !! (force unwrap) — handle nulls properly.',
                    'Use scope functions to make code more readable.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Kotlin Fundamentals', description: 'Learn Kotlin for Android.', tasks: ['Variables, types, null safety', 'Functions, lambdas, and extensions', 'Classes, data classes, sealed classes'] }
            ]
        },
        'kotlin-basics': {
            id: 'kotlin-basics',
            label: 'Kotlin Basics',
            description: 'Variables, types, null safety, control flow, functions, lambdas, and OOP in Kotlin.',
            parentId: 'android-kotlin',
            resources: [
                { type: 'documentation', title: 'Kotlin Basics', url: 'https://kotlinlang.org/docs/basic-syntax.html', isFree: true }
            ],
            content: {
                overview: 'Kotlin basics cover the language fundamentals you need before building Android apps. Kotlin uses type inference so you rarely need to declare types explicitly. The when expression replaces Java\'s switch with a much more powerful pattern matching. String templates (\"Hello, $name\") make string formatting concise. Collections have rich functional APIs: filter, map, flatMap, groupBy, sortedBy. Destructuring declarations let you unpack data classes into variables. Understanding these basics makes Android development significantly more productive compared to Java.',
                keyConcepts: [
                    'Type inference and explicit typing',
                    'Control flow: if/else (also expressions), when, for, while',
                    'String templates: \"Hello, $name\"',
                    'Ranges: 1..10, until, downTo, step',
                    'Functions: default params, named params, vararg',
                    'Object declarations and companion objects',
                    'Interfaces and abstract classes',
                    'Destructuring and component functions'
                ],
                practiceQuestions: [
                    { question: 'How is when different from switch in Java?', hint: 'when is an expression (returns a value), supports any type, ranges, type checks, and does not need break statements.', difficulty: 'easy' },
                    { question: 'What is a companion object?', hint: 'The Kotlin equivalent of static members in Java. A singleton object inside a class.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use when instead of long if-else chains.',
                    'Use string templates instead of string concatenation.',
                    'Take advantage of Kotlin collections API for data processing.',
                    'Learn Kotlin idioms — do not write Java in Kotlin syntax.'
                ]
            }
        },
        'kotlin-coroutines': {
            id: 'kotlin-coroutines',
            label: 'Coroutines & Flow',
            description: 'Asynchronous programming with Kotlin coroutines, Flow, StateFlow, and SharedFlow.',
            parentId: 'android-kotlin',
            resources: [
                { type: 'documentation', title: 'Kotlin Coroutines', url: 'https://kotlinlang.org/docs/coroutines-overview.html', isFree: true }
            ],
            content: {
                overview: 'Coroutines are Kotlin\'s solution for asynchronous programming. They let you write async code that looks sequential, avoiding callback hell. A coroutine is a lightweight thread that can be suspended and resumed. The suspend keyword marks functions that can be paused without blocking the thread. CoroutineScope and dispatchers (Main for UI, IO for network/disk, Default for CPU) control where coroutines run. Flow is Kotlin\'s reactive streams API — similar to RxJava but built on coroutines. StateFlow holds and emits the latest value (used for UI state in MVVM). SharedFlow broadcasts events to multiple collectors.',
                keyConcepts: [
                    'suspend functions and coroutine builders (launch, async)',
                    'CoroutineScope and structured concurrency',
                    'Dispatchers: Main, IO, Default',
                    'Flow: cold streams of data',
                    'StateFlow: holds current value for UI state',
                    'SharedFlow: broadcasts events to collectors',
                    'Exception handling in coroutines',
                    'Cancellation and timeouts'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between launch and async?', hint: 'launch fires and forgets (returns Job). async returns a Deferred with a result you can await.', difficulty: 'medium' },
                    { question: 'Why use StateFlow for UI state?', hint: 'StateFlow always holds the latest value, survives configuration changes when in ViewModel, and integrates with Compose.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use viewModelScope for coroutines in ViewModels.',
                    'Use Dispatchers.IO for network and database operations.',
                    'Collect flows in the UI layer with lifecycle-aware collectors.',
                    'Handle exceptions with try/catch or CoroutineExceptionHandler.'
                ]
            }
        },
        'android-ui': {
            id: 'android-ui',
            label: 'UI & Design',
            description: 'Build beautiful UIs with Jetpack Compose, Material Design 3, navigation, and animations.',
            parentId: 'android-root',
            children: ['jetpack-compose', 'material-design'],
            resources: [
                { type: 'documentation', title: 'Jetpack Compose', url: 'https://developer.android.com/jetpack/compose', isFree: true }
            ],
            content: {
                overview: 'Android UI development has evolved from XML layouts to Jetpack Compose, a modern declarative UI toolkit. With Compose, you describe what the UI should look like for a given state, and the framework handles rendering and updates. Compose is built on composable functions — Kotlin functions annotated with @Composable that describe a piece of UI. State management with remember and mutableStateOf triggers recomposition when data changes. Material Design 3 provides a comprehensive design system with dynamic color, updated components, and typography. Navigation in Compose uses the NavHost and NavController for multi-screen apps.',
                keyConcepts: [
                    'Composable functions: @Composable annotation',
                    'State management: remember, mutableStateOf',
                    'Layout composables: Column, Row, Box, LazyColumn',
                    'Material Design 3 components and theming',
                    'Navigation: NavHost, NavController, arguments',
                    'Animations: animate*AsState, AnimatedVisibility',
                    'Modifiers for styling and layout',
                    'Compose lifecycle: composition, recomposition'
                ],
                practiceQuestions: [
                    { question: 'What is recomposition in Jetpack Compose?', hint: 'When state changes, Compose re-executes composables that read that state and updates only the affected UI parts.', difficulty: 'medium' },
                    { question: 'How is Compose different from Flutter?', hint: 'Both are declarative but Compose uses Kotlin and targets Android natively. Flutter uses Dart and targets multiple platforms.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Hoist state up to make composables reusable and testable.',
                    'Use LazyColumn instead of Column for scrollable lists.',
                    'Apply theming through MaterialTheme for consistent styling.',
                    'Use preview composables (@Preview) for rapid UI development.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Jetpack Compose', description: 'Declarative UI for Android.', tasks: ['Build layouts with Row, Column, Box', 'Create reusable composables', 'Implement Material 3 theming'] }
            ]
        },
        'jetpack-compose': {
            id: 'jetpack-compose',
            label: 'Jetpack Compose',
            description: 'Modern declarative UI toolkit for Android with composable functions and state management.',
            parentId: 'android-ui',
            resources: [
                { type: 'documentation', title: 'Compose Tutorial', url: 'https://developer.android.com/jetpack/compose/tutorial', isFree: true }
            ],
            content: {
                overview: 'Jetpack Compose replaces XML layouts with Kotlin functions. Every UI element is a composable function. Text() displays text, Button() creates a button, TextField() creates an input. Layout composables like Column (vertical), Row (horizontal), and Box (stacking) position children. LazyColumn and LazyRow are the Compose equivalents of RecyclerView for efficient scrollable lists. Modifiers chain styling and behavior: Modifier.padding(), .fillMaxWidth(), .clickable(), .background(). State drives the UI — when state changes, Compose intelligently recomposes only the composables that depend on that state.',
                keyConcepts: [
                    'Basic composables: Text, Button, Image, TextField',
                    'Layout: Column, Row, Box, Spacer',
                    'Modifiers for styling and behavior',
                    'LazyColumn and LazyRow for lists',
                    'State: remember, rememberSaveable, mutableStateOf',
                    'Side effects: LaunchedEffect, SideEffect',
                    'Custom composables and slots API',
                    'Compose preview and interactive mode'
                ]
            }
        },
        'material-design': {
            id: 'material-design',
            label: 'Material Design 3',
            description: 'Google\'s design system with dynamic color, updated components, and guidelines.',
            parentId: 'android-ui',
            resources: [
                { type: 'documentation', title: 'Material Design 3', url: 'https://m3.material.io/', isFree: true }
            ],
            content: {
                overview: 'Material Design 3 (Material You) is the latest iteration of Google\'s design system. Its standout feature is Dynamic Color — the system extracts colors from the user\'s wallpaper and applies them across the app. The tone-based color system generates an entire color scheme from a single seed color. M3 includes updated components (buttons, cards, navigation bars, chips), new typography scale, and improved motion guidelines. In Compose, you apply M3 through MaterialTheme with colorScheme, typography, and shapes. Following Material Design guidelines ensures your app feels native on Android and provides a cohesive, accessible experience.',
                keyConcepts: [
                    'Dynamic Color based on user wallpaper',
                    'Color schemes: primary, secondary, tertiary, surface',
                    'MaterialTheme: colorScheme, typography, shapes',
                    'M3 components: TopAppBar, NavigationBar, FAB, Card',
                    'Typography scale and custom fonts',
                    'Shape system: rounded corners and cut corners',
                    'Motion and transitions guidelines',
                    'Dark theme support'
                ]
            }
        },
        'android-arch': {
            id: 'android-arch',
            label: 'Architecture',
            description: 'Clean architecture with MVVM/MVI, dependency injection, local storage, and networking.',
            parentId: 'android-root',
            children: ['android-mvvm', 'android-di', 'android-networking'],
            resources: [
                { type: 'documentation', title: 'App Architecture', url: 'https://developer.android.com/topic/architecture', isFree: true }
            ],
            content: {
                overview: 'Good architecture is critical for Android apps that need to survive lifecycle changes (screen rotations, process death), handle offline scenarios, and scale as features grow. Google recommends a layered architecture with UI layer (composables + ViewModel), Domain layer (use cases), and Data layer (repositories + data sources). The ViewModel survives configuration changes and holds UI state. The Repository pattern abstracts data sources (network, database, cache) behind a clean interface. Dependency injection with Hilt wires everything together. This architecture makes your code testable, maintainable, and follows separation of concerns.',
                keyConcepts: [
                    'UI Layer: composables and ViewModel',
                    'Domain Layer: use cases (optional)',
                    'Data Layer: repositories and data sources',
                    'ViewModel for surviving configuration changes',
                    'Repository pattern for data abstraction',
                    'Hilt for dependency injection',
                    'Room for local SQLite database',
                    'Retrofit for REST API communication'
                ],
                practiceQuestions: [
                    { question: 'Why does Android need ViewModel?', hint: 'ViewModel survives configuration changes (like screen rotation). Without it, UI state is lost on rotation.', difficulty: 'easy' },
                    { question: 'What is the Repository pattern?', hint: 'A class that abstracts multiple data sources (API + database) behind a single interface, deciding where to fetch data from.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Follow the official Android architecture guidelines.',
                    'Use ViewModels for all screen-level state.',
                    'Use repositories to abstract data access.',
                    'Use Hilt for dependency injection across the app.'
                ]
            }
        },
        'android-mvvm': {
            id: 'android-mvvm',
            label: 'MVVM / MVI',
            description: 'Architecture patterns for separating UI from business logic.',
            parentId: 'android-arch',
            resources: [
                { type: 'documentation', title: 'ViewModel Guide', url: 'https://developer.android.com/topic/libraries/architecture/viewmodel', isFree: true }
            ],
            content: {
                overview: 'MVVM (Model-View-ViewModel) is the recommended architecture pattern for Android. The View (composables) observes state from the ViewModel. The ViewModel processes events, calls repositories, and exposes UI state via StateFlow. The Model represents data and business logic. MVI (Model-View-Intent) is a stricter version where user actions are modeled as Intents (sealed classes), state is a single immutable object, and state transitions are predictable. MVI is preferred for complex screens where debugging state is important.',
                keyConcepts: [
                    'MVVM: View observes ViewModel state',
                    'MVI: unidirectional data flow with Intents',
                    'UI State as a single sealed class or data class',
                    'UI Events: one-time actions (navigation, snackbar)',
                    'ViewModel to Composable communication patterns',
                    'State reducers for predictable updates'
                ]
            }
        },
        'android-di': {
            id: 'android-di',
            label: 'Hilt / Dagger',
            description: 'Dependency injection for managing dependencies across your Android app.',
            parentId: 'android-arch',
            resources: [
                { type: 'documentation', title: 'Hilt Guide', url: 'https://developer.android.com/training/dependency-injection/hilt-android', isFree: true }
            ],
            content: {
                overview: 'Hilt is the recommended dependency injection framework for Android, built on top of Dagger. DI means that instead of a class creating its own dependencies (like a ViewModel creating a Repository), the dependencies are provided from outside. This makes classes testable (you can inject mock dependencies during testing) and decoupled. Hilt simplifies Dagger with predefined components for Android (Application, Activity, ViewModel, Fragment). You annotate modules with @Module and @InstallIn, provide dependencies with @Provides or @Binds, and inject them with @Inject.',
                keyConcepts: [
                    '@HiltAndroidApp, @AndroidEntryPoint',
                    '@Inject for constructor injection',
                    '@Module and @InstallIn for providing dependencies',
                    '@Provides and @Binds for factory methods',
                    'Scopes: @Singleton, @ViewModelScoped, @ActivityScoped',
                    '@HiltViewModel for ViewModels',
                    'Testing with Hilt: @UninstallModules, @BindValue'
                ]
            }
        },
        'android-networking': {
            id: 'android-networking',
            label: 'Retrofit & Room',
            description: 'Retrofit for API calls, Room for local database, and DataStore for preferences.',
            parentId: 'android-arch',
            resources: [
                { type: 'documentation', title: 'Room Guide', url: 'https://developer.android.com/training/data-storage/room', isFree: true }
            ],
            content: {
                overview: 'Retrofit is the industry standard HTTP client for Android. You define API endpoints as Kotlin interface functions, and Retrofit generates the implementation. It supports coroutines (suspend functions), serialization with Gson/Moshi/kotlinx.serialization, and interceptors for logging and authentication. Room is an abstraction layer over SQLite that provides compile-time query verification. You define entities (tables), DAOs (data access objects with SQL queries), and the database class. Room returns Flow for reactive database queries. DataStore replaces SharedPreferences for storing key-value data or typed objects with Protocol Buffers.',
                keyConcepts: [
                    'Retrofit: defining API interfaces with annotations',
                    'Retrofit converters: Gson, Moshi, kotlinx.serialization',
                    'OkHttp interceptors for logging and auth tokens',
                    'Room: Entity, Dao, Database, TypeConverters',
                    'Room with Flow for reactive queries',
                    'Database migrations',
                    'DataStore for preferences (replacing SharedPreferences)',
                    'Offline-first with Room + Retrofit (cache strategy)'
                ],
                practiceQuestions: [
                    { question: 'Why use Room instead of raw SQLite?', hint: 'Room provides compile-time SQL verification, less boilerplate, Flow integration, and migration support.', difficulty: 'easy' },
                    { question: 'How do you implement offline-first with Room and Retrofit?', hint: 'Load from Room first (instant), fetch from API in background, and update Room. UI observes Room as single source of truth.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Use kotlinx.serialization over Gson for better Kotlin support.',
                    'Add an OkHttp logging interceptor for debugging API calls.',
                    'Use Room with Flow to observe database changes reactively.',
                    'Implement proper error handling for network failures.'
                ]
            }
        }
    }
};
