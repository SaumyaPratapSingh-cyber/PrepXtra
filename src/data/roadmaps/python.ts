
import { RoadmapTrack } from './types';

export const pythonRoadmap: RoadmapTrack = {
    id: 'python',
    title: 'Python',
    description: 'Master one of the most versatile programming languages',
    category: 'skill-based',
    icon: '🐍',
    accentColor: '#3776ab',
    rootNodeId: 'py-root',
    nodes: {
        'py-root': {
            id: 'py-root',
            label: 'Python Mastery',
            description: 'Learn Python from basics to advanced topics like web-dev and data science.',
            children: ['py-basics', 'py-intermediate', 'py-frameworks', 'py-data-science', 'py-testing'],
            resources: [
                { type: 'documentation', title: 'Python Official Docs', url: 'https://docs.python.org/3/', isFree: true },
                { type: 'video', title: 'Python for Beginners - Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', isFree: true },
                { type: 'course', title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', isFree: true },
                { type: 'article', title: 'Real Python Tutorials', url: 'https://realpython.com/', isFree: true }
            ],
            content: {
                overview: 'Python is one of the most popular and versatile languages in the world. Created by Guido van Rossum and first released in 1991, it was designed with readability as a core principle, using whitespace indentation rather than curly braces. Today Python dominates in fields like data science, machine learning, web development, automation, and scripting. Its philosophy is captured in "The Zen of Python" (try running import this in a Python shell). The language emphasizes writing code that is clear and readable over being clever. Python is dynamically typed and interpreted, which means you can run code line by line without a compilation step. This makes it an excellent choice for rapid prototyping. While it is slower than compiled languages like C++ or Rust, its developer productivity and massive ecosystem of libraries (over 400,000 packages on PyPI) more than make up for the raw performance gap in most use cases.',
                keyConcepts: [
                    'Interpreted and dynamically typed language',
                    'Whitespace-based indentation for code blocks',
                    'Batteries-included standard library',
                    'Package management with pip and PyPI',
                    'Virtual environments for dependency isolation',
                    'CPython vs PyPy and other implementations',
                    'The GIL (Global Interpreter Lock) and its implications',
                    'Python 2 vs Python 3 differences'
                ],
                practiceQuestions: [
                    { question: 'Why does Python use indentation instead of curly braces?', hint: 'It enforces code readability as part of the syntax.', difficulty: 'easy' },
                    { question: 'What is the GIL and how does it affect multi-threaded programs?', hint: 'It prevents true parallel execution of Python bytecode in CPython.', difficulty: 'hard' },
                    { question: 'How do you create an isolated environment for a Python project?', hint: 'Use python -m venv or virtualenv.', difficulty: 'easy' },
                    { question: 'What is the difference between a list and a tuple?', hint: 'Lists are mutable, tuples are immutable.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always use virtual environments for project isolation.',
                    'Follow PEP 8 style guidelines for consistent formatting.',
                    'Use type hints (PEP 484) for better code documentation and IDE support.',
                    'Prefer list comprehensions over manual for-loops when appropriate.',
                    'Write docstrings for all public functions and classes.',
                    'Use f-strings for string formatting instead of .format() or % operator.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Setup and Fundamentals', description: 'Install Python, write your first scripts.', tasks: ['Install Python 3.x and set up VS Code', 'Learn variables, data types, and operators', 'Write your first functions and use input/output'] },
                { day: 2, title: 'Data Structures and Control Flow', description: 'Master lists, dicts, and loops.', tasks: ['Practice with lists, tuples, sets, and dicts', 'Write programs using if/elif/else and for/while loops', 'Solve 5 problems on HackerRank or LeetCode using Python'] },
                { day: 3, title: 'OOP and Advanced Concepts', description: 'Classes, inheritance, and decorators.', tasks: ['Create classes with constructors, methods, and inheritance', 'Understand decorators and context managers', 'Build a small CLI project using everything you learned'] }
            ]
        },
        'py-basics': {
            id: 'py-basics',
            label: 'Python Basics',
            description: 'Variables, data types, control flow, functions, and basic I/O.',
            parentId: 'py-root',
            resources: [
                { type: 'article', title: 'W3Schools Python Tutorial', url: 'https://www.w3schools.com/python/', isFree: true },
                { type: 'video', title: 'Python Variables and Data Types', url: 'https://www.youtube.com/watch?v=cQT33yu9pY8', isFree: true },
                { type: 'documentation', title: 'Python Tutorial - Official', url: 'https://docs.python.org/3/tutorial/', isFree: true }
            ],
            content: {
                overview: 'Python basics cover the fundamental building blocks you need to write any program. This includes understanding variables (which are dynamically typed, meaning you do not declare types explicitly), data types like int, float, str, bool, list, tuple, dict, and set, as well as control flow with if/elif/else statements, for and while loops, and functions. Python also has powerful features even at the basic level, such as list slicing, multiple assignment, and built-in functions like len(), range(), enumerate(), and zip(). Understanding how to read from and write to the console using input() and print() is essential. Error handling with try/except blocks should also be learned early. One key thing to understand is that everything in Python is an object, including functions and classes themselves.',
                keyConcepts: [
                    'Variables and dynamic typing',
                    'Primitive types: int, float, str, bool',
                    'Collections: list, tuple, dict, set',
                    'Control flow: if/elif/else, for, while',
                    'Functions: def, return, args, kwargs',
                    'String methods and f-string formatting',
                    'List slicing and comprehensions',
                    'Error handling with try/except/finally'
                ],
                practiceQuestions: [
                    { question: 'What is the output of [1,2,3] + [4,5]?', hint: 'Lists concatenate with the + operator.', difficulty: 'easy' },
                    { question: 'How do you swap two variables in Python in one line?', hint: 'a, b = b, a', difficulty: 'easy' },
                    { question: 'What does *args and **kwargs mean in a function definition?', hint: 'args collects positional arguments as a tuple, kwargs collects keyword arguments as a dict.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use meaningful variable names, not single letters (except in loops).',
                    'Always handle exceptions rather than letting programs crash.',
                    'Use enumerate() instead of manually tracking index in loops.',
                    'Prefer is for None comparisons: if x is None instead of if x == None.'
                ]
            }
        },
        'py-intermediate': {
            id: 'py-intermediate',
            label: 'Intermediate Python',
            description: 'OOP, decorators, generators, context managers, and modules.',
            parentId: 'py-root',
            resources: [
                { type: 'article', title: 'Python OOP Tutorial - Real Python', url: 'https://realpython.com/python3-object-oriented-programming/', isFree: true },
                { type: 'video', title: 'Python OOP in 1 Hour', url: 'https://www.youtube.com/watch?v=JeznW_7DlB0', isFree: true },
                { type: 'article', title: 'Decorators in Python', url: 'https://realpython.com/primer-on-python-decorators/', isFree: true }
            ],
            content: {
                overview: 'Intermediate Python takes you beyond the basics into the features that make Python truly powerful. Object-Oriented Programming (OOP) lets you model real-world concepts using classes, inheritance, encapsulation, and polymorphism. Decorators are functions that modify the behavior of other functions, and they are used extensively in frameworks like Flask and Django. Generators allow you to create iterators using yield, producing values lazily without storing the entire sequence in memory. Context managers (the with statement) handle resource cleanup automatically, which is essential for working with files, network connections, and database cursors. You should also learn about modules and packages, which let you organize code across multiple files, and understand how Python resolves imports.',
                keyConcepts: [
                    'Classes, objects, and the self parameter',
                    'Inheritance, super(), and method resolution order (MRO)',
                    'Dunder (magic) methods: __init__, __str__, __repr__, __len__',
                    'Decorators and higher-order functions',
                    'Generators and the yield keyword',
                    'Context managers and the with statement',
                    'Modules, packages, and import system',
                    'Property decorators and getters/setters'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a generator and a regular function?', hint: 'Generators use yield and produce values lazily one at a time.', difficulty: 'medium' },
                    { question: 'How does Python handle multiple inheritance conflicts?', hint: 'It uses Method Resolution Order (MRO) based on the C3 linearization algorithm.', difficulty: 'hard' },
                    { question: 'Write a decorator that logs the execution time of any function.', hint: 'Use time.time() before and after calling the wrapped function.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use @property for controlled attribute access instead of public variables.',
                    'Prefer composition over inheritance when possible.',
                    'Use dataclasses for simple data-holding classes.',
                    'Always use with statements for file operations to prevent resource leaks.'
                ]
            }
        },
        'py-frameworks': {
            id: 'py-frameworks',
            label: 'Web Frameworks',
            description: 'Build web applications and APIs with Django, Flask, and FastAPI.',
            parentId: 'py-root',
            resources: [
                { type: 'documentation', title: 'Django Official Tutorial', url: 'https://docs.djangoproject.com/en/5.0/intro/tutorial01/', isFree: true },
                { type: 'documentation', title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', isFree: true },
                { type: 'video', title: 'Flask Course - Full Tutorial', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA', isFree: true },
                { type: 'article', title: 'Django vs Flask vs FastAPI', url: 'https://testdriven.io/blog/django-vs-flask-vs-fastapi/', isFree: true }
            ],
            content: {
                overview: 'Python has three major web frameworks, each suited for different use cases. Django is a "batteries-included" framework that provides an ORM, admin panel, authentication, and templating out of the box. It follows the "Don\'t Repeat Yourself" (DRY) principle and is ideal for large, data-driven applications. Flask is a "micro-framework" that gives you the basics (routing, request handling) and lets you choose your own tools for everything else. It is great for smaller apps, APIs, and when you want flexibility. FastAPI is the modern choice, built on top of Python type hints and async/await. It automatically generates OpenAPI documentation, provides built-in request validation via Pydantic, and delivers performance close to Node.js thanks to its async architecture.',
                keyConcepts: [
                    'Django: MTV pattern, ORM, admin, migrations',
                    'Flask: Routing, Jinja2 templates, Blueprints',
                    'FastAPI: Async endpoints, Pydantic models, OpenAPI',
                    'REST API design principles',
                    'Middleware and request lifecycle',
                    'Database integration with SQLAlchemy or Django ORM',
                    'Authentication and session management'
                ],
                practiceQuestions: [
                    { question: 'When would you pick Django over Flask?', hint: 'When you need a full-featured framework with ORM, admin, and auth built in.', difficulty: 'medium' },
                    { question: 'What makes FastAPI faster than Flask?', hint: 'It uses async/await and ASGI instead of WSGI.', difficulty: 'medium' },
                    { question: 'What is a Django migration?', hint: 'A version-controlled change to your database schema.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use environment variables for configuration and secrets.',
                    'Structure your project with clear separation of concerns.',
                    'Always validate and sanitize user input.',
                    'Write API documentation using OpenAPI or Swagger.'
                ]
            }
        },
        'py-data-science': {
            id: 'py-data-science',
            label: 'Data Science Stack',
            description: 'NumPy, Pandas, Matplotlib, and Jupyter for data analysis and visualization.',
            parentId: 'py-root',
            resources: [
                { type: 'documentation', title: 'NumPy User Guide', url: 'https://numpy.org/doc/stable/user/', isFree: true },
                { type: 'documentation', title: 'Pandas Getting Started', url: 'https://pandas.pydata.org/docs/getting_started/', isFree: true },
                { type: 'video', title: 'Data Analysis with Python - Full Course', url: 'https://www.youtube.com/watch?v=r-uOLxNrNk8', isFree: true },
                { type: 'article', title: 'Kaggle Learn - Data Viz', url: 'https://www.kaggle.com/learn/data-visualization', isFree: true }
            ],
            content: {
                overview: 'Python is the dominant language in data science because of its ecosystem. NumPy provides fast numerical arrays and operations. Pandas builds on top of NumPy and gives you DataFrames, which are spreadsheet-like structures you can filter, group, merge, and transform with simple method chains. Matplotlib and Seaborn handle data visualization, from simple line charts to complex statistical plots. Jupyter Notebooks provide an interactive environment where you can write code, see results, and add documentation all in one place. This stack is the starting point for anyone moving into machine learning, AI, or any data-centric role.',
                keyConcepts: [
                    'NumPy arrays and vectorized operations',
                    'Pandas DataFrames and Series',
                    'Data cleaning: handling missing values, duplicates, and types',
                    'GroupBy, merge, join, and pivot tables in Pandas',
                    'Matplotlib and Seaborn for visualization',
                    'Jupyter Notebooks for interactive development',
                    'Reading data from CSV, JSON, Excel, and SQL',
                    'Basic statistics: mean, median, standard deviation, correlation'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a NumPy array and a Python list?', hint: 'NumPy arrays are homogeneous and support vectorized operations, making them much faster.', difficulty: 'easy' },
                    { question: 'How do you handle missing (NaN) values in a Pandas DataFrame?', hint: 'Use dropna() to remove or fillna() to replace them.', difficulty: 'medium' },
                    { question: 'What does the groupby() method do in Pandas?', hint: 'It splits data into groups based on a column, applies a function, and combines results.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Use vectorized NumPy/Pandas operations instead of Python loops for performance.',
                    'Always explore your data with .head(), .info(), and .describe() before analysis.',
                    'Use seaborn over raw matplotlib for cleaner statistical visualizations.',
                    'Document your analysis in Jupyter with markdown cells explaining each step.'
                ]
            }
        },
        'py-testing': {
            id: 'py-testing',
            label: 'Testing in Python',
            description: 'Write reliable code with pytest, unittest, and test-driven development.',
            parentId: 'py-root',
            resources: [
                { type: 'documentation', title: 'pytest Documentation', url: 'https://docs.pytest.org/', isFree: true },
                { type: 'article', title: 'Getting Started with Testing in Python', url: 'https://realpython.com/python-testing/', isFree: true },
                { type: 'video', title: 'Pytest Tutorial', url: 'https://www.youtube.com/watch?v=cHYq1MRoyI0', isFree: true }
            ],
            content: {
                overview: 'Testing is how you prove your code works. Python has a built-in unittest module, but the community overwhelmingly prefers pytest for its simpler syntax and powerful plugin ecosystem. With pytest, you write test functions that use plain assert statements instead of special assertion methods. Fixtures let you set up preconditions, parametrize lets you run the same test with multiple inputs, and plugins like pytest-cov measure how much of your code is covered by tests. Test-Driven Development (TDD) is a practice where you write the test before you write the code, ensuring that every feature has a corresponding test from the start.',
                keyConcepts: [
                    'Unit tests vs integration tests vs end-to-end tests',
                    'pytest fixtures and conftest.py',
                    'Parameterized testing with @pytest.mark.parametrize',
                    'Mocking with unittest.mock and pytest-mock',
                    'Code coverage with pytest-cov',
                    'Test-Driven Development (TDD) workflow',
                    'Continuous testing in CI/CD pipelines'
                ],
                practiceQuestions: [
                    { question: 'What is a pytest fixture?', hint: 'A reusable setup/teardown function that provides test data or resources.', difficulty: 'easy' },
                    { question: 'Why would you use mocking in tests?', hint: 'To replace external dependencies (APIs, databases) with controlled fake implementations.', difficulty: 'medium' },
                    { question: 'What is code coverage and what is a good target?', hint: 'The percentage of code executed by tests. 80%+ is a common goal.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Aim for at least 80% code coverage but prioritize testing critical paths.',
                    'Keep tests fast, independent, and deterministic.',
                    'Use fixtures for setup instead of duplicating code across tests.',
                    'Run tests in CI so that broken code cannot be merged.'
                ]
            }
        }
    }
};
