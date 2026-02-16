
import { RoadmapTrack } from './types';

export const gameDeveloperRoadmap: RoadmapTrack = {
    id: 'game-developer',
    title: 'Game Developer',
    description: 'Master the art and science of game development',
    category: 'role-based',
    icon: '🎮',
    accentColor: '#fbbf24',
    rootNodeId: 'game-root',
    nodes: {
        'game-root': {
            id: 'game-root',
            label: 'Game Development',
            description: 'Learn to create interactive experiences with game engines and code.',
            children: ['game-basics', 'game-math', 'game-engines', 'game-graphics'],
            resources: [
                { type: 'article', title: 'Game Developer Roadmap', url: 'https://roadmap.sh/game-developer', isFree: true },
                { type: 'video', title: 'Game Development Full Course', url: 'https://www.youtube.com/watch?v=tPWm4U__DGI', isFree: true }
            ],
            content: {
                overview: 'Game development combines programming, art, design, and sound to create interactive experiences. The industry uses two main engines: Unity (C#, best for indie and mobile games) and Unreal Engine (C++/Blueprints, best for AAA and high-fidelity graphics). Game development requires understanding a game loop (input, update, render), physics simulation, collision detection, AI, animation, audio, networking for multiplayer, and platform-specific optimization. The workflow typically involves prototyping gameplay mechanics, building art pipelines, implementing systems, playtesting, and polishing. Game developers often specialize in areas like gameplay programming, engine development, graphics programming, tools development, or technical art.',
                keyConcepts: [
                    'The game loop: input, update, render',
                    'Game engines: Unity (C#), Unreal (C++)',
                    'Physics: rigid body, collision detection, raycasting',
                    '2D vs 3D game development',
                    'Game design: mechanics, dynamics, aesthetics (MDA)',
                    'Asset pipelines: models, textures, animations, audio',
                    'Networking for multiplayer games',
                    'Platform optimization: PC, console, mobile'
                ],
                practiceQuestions: [
                    { question: 'When would you choose Unity over Unreal Engine?', hint: 'Unity for 2D games, mobile games, and indie projects. Unreal for AAA graphics, large teams, and photorealistic visuals.', difficulty: 'easy' },
                    { question: 'What is a game loop?', hint: 'The core cycle that runs every frame: process input, update game state (physics, AI, logic), and render the frame to screen.', difficulty: 'easy' },
                    { question: 'What is the difference between delta time and fixed delta time?', hint: 'Delta time varies per frame (for smooth rendering). Fixed delta time is constant (for deterministic physics). Use fixed for physics, delta for visuals.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Start with small, completable projects (avoid scope creep).',
                    'Learn a game engine before trying to build one.',
                    'Playtest early and often with real people.',
                    'Use version control (Git with LFS for large binary assets).',
                    'Study games you admire and analyze their design decisions.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Game Dev Foundations', description: 'Core concepts and first game.', tasks: ['Install Unity or Unreal Engine', 'Understand the game loop and frame updates', 'Build a simple 2D game (like Pong or Breakout)'] },
                { day: 2, title: 'Game Mechanics', description: 'Physics and interactions.', tasks: ['Implement physics: gravity, collisions, forces', 'Add player input handling (keyboard, controller)', 'Create a basic UI: health bars, score, menus'] },
                { day: 3, title: 'Polish and Publish', description: 'Make it feel good and share it.', tasks: ['Add sound effects and music', 'Implement particle effects and screen shake', 'Build and export for your target platform'] }
            ]
        },
        'game-basics': {
            id: 'game-basics',
            label: 'Programming Basics',
            description: 'C++ or C# fundamentals essential for game development.',
            parentId: 'game-root',
            resources: [
                { type: 'documentation', title: 'C# Programming Guide', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', isFree: true }
            ],
            content: {
                overview: 'Game programming requires strong fundamentals in either C# (for Unity) or C++ (for Unreal Engine). C# is easier to learn and more forgiving — it handles memory management automatically and has clean, readable syntax. C++ gives you direct hardware access, manual memory management, and maximum performance — critical for AAA games and engine development. Key programming concepts for games include object-oriented programming (classes, inheritance, polymorphism), design patterns (singleton, observer, state machine, component), data structures (arrays, hash maps, spatial partitioning), and algorithms (pathfinding, sorting). Understanding pointers and memory in C++ is essential for performance-critical code.',
                keyConcepts: [
                    'C# for Unity: classes, inheritance, interfaces, delegates',
                    'C++ for Unreal: pointers, references, RAII, smart pointers',
                    'Object-oriented programming for game entities',
                    'Design patterns: Singleton, Observer, State Machine, Component',
                    'Data structures: arrays, linked lists, hash maps, trees',
                    'Memory management: heap vs stack, garbage collection vs manual',
                    'Event systems and delegates',
                    'Debugging: breakpoints, logging, profiling'
                ],
                practiceQuestions: [
                    { question: 'Why does game development favor C++ over higher-level languages?', hint: 'C++ allows manual memory control and zero-overhead abstractions, achieving maximum performance needed for 60+ FPS.', difficulty: 'medium' },
                    { question: 'What is the Component design pattern in games?', hint: 'Instead of deep inheritance hierarchies, attach behavior components (physics, rendering, AI) to generic game objects.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Start with C# and Unity if you are new to game development.',
                    'Learn OOP well — games are naturally object-oriented.',
                    'Understand when to use composition over inheritance.',
                    'Profile your code to find actual bottlenecks before optimizing.'
                ]
            }
        },
        'game-math': {
            id: 'game-math',
            label: 'Mathematics',
            description: 'Linear algebra, trigonometry, and physics for game development.',
            parentId: 'game-root',
            resources: [
                { type: 'video', title: '3Blue1Brown Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', isFree: true },
                { type: 'article', title: 'Essential Math for Game Developers', url: 'https://www.gamedev.net/articles/programming/math-and-physics/', isFree: true }
            ],
            content: {
                overview: 'Mathematics is the foundation of everything visual and physical in games. Vectors represent positions, directions, and velocities — vector math (addition, subtraction, dot product, cross product) controls movement and camera systems. Matrices handle transformations: translation, rotation, and scaling in 2D and 3D space. Trigonometry (sine, cosine, tangent) is used for circular motion, aiming, field of view calculations, and wave effects. Physics simulation uses Newtonian mechanics: force = mass * acceleration, velocity integration, and impulse-based collision response. Quaternions represent 3D rotations without gimbal lock. You do not need to be a math expert, but understanding these concepts makes game programming much easier.',
                keyConcepts: [
                    'Vectors: position, direction, magnitude, normalization',
                    'Vector operations: dot product, cross product',
                    'Matrices: transformation, rotation, scaling',
                    'Trigonometry: sin, cos, atan2 for angles and rotation',
                    'Quaternions for 3D rotation (no gimbal lock)',
                    'Newtonian physics: force, velocity, acceleration',
                    'Collision detection: AABB, sphere, raycast',
                    'Interpolation: lerp, slerp for smooth transitions'
                ],
                practiceQuestions: [
                    { question: 'What is the dot product used for in games?', hint: 'It tells you how much two directions align. Used for field of view checks, light intensity, and determining if something is in front or behind.', difficulty: 'medium' },
                    { question: 'What is lerp?', hint: 'Linear interpolation: smoothly transition between two values. lerp(a, b, t) returns a value between a and b based on t (0 to 1).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Learn the math as you need it — game engines abstract much of it.',
                    'Visualize math operations to build intuition.',
                    'Use quaternions for 3D rotation instead of Euler angles.',
                    'Use built-in math libraries (Vector3, Quaternion) in your engine.'
                ]
            }
        },
        'game-engines': {
            id: 'game-engines',
            label: 'Game Engines',
            description: 'Unity (C#) and Unreal Engine (C++) for building games.',
            parentId: 'game-root',
            resources: [
                { type: 'documentation', title: 'Unity Learn', url: 'https://learn.unity.com/', isFree: true },
                { type: 'documentation', title: 'Unreal Engine Docs', url: 'https://docs.unrealengine.com/', isFree: true }
            ],
            content: {
                overview: 'A game engine provides the core systems you need to build games: rendering (drawing to the screen), physics (simulation), audio, input handling, asset management, and scripting. Unity is the most popular engine for indie and mobile games — it uses C# scripting, has a massive Asset Store, supports 2D and 3D, and exports to 25+ platforms. Unreal Engine is the choice for AAA-quality visuals — it uses C++ and the Blueprint visual scripting system, has built-in Nanite (virtualized geometry), Lumen (global illumination), and MetaHuman (photorealistic characters). Godot is an open-source alternative growing in popularity. Choose based on your project and learning goals.',
                keyConcepts: [
                    'Unity: GameObject, Component, MonoBehaviour',
                    'Unity: Scene management, prefabs, ScriptableObjects',
                    'Unreal: Actor, ActorComponent, Blueprint visual scripting',
                    'Unreal: Materials, Niagara particles, Sequencer cinematics',
                    'Godot: Node-based architecture, GDScript',
                    'Scene graphs and hierarchical transforms',
                    'Asset import pipelines: models, textures, audio',
                    'Cross-platform build and deployment'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between Unity and Godot?', hint: 'Unity is industry-standard with a huge ecosystem but has licensing costs. Godot is fully open-source, lighter, but has a smaller community and asset library.', difficulty: 'easy' },
                    { question: 'What are Blueprints in Unreal Engine?', hint: 'A visual scripting system where you connect nodes instead of writing C++ code. Good for designers and rapid prototyping.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Learn one engine deeply before switching to another.',
                    'Build small, complete games before attempting large projects.',
                    'Use the engine\'s built-in systems before writing custom solutions.',
                    'Follow the engine\'s recommended project structure and naming conventions.'
                ]
            }
        },
        'game-graphics': {
            id: 'game-graphics',
            label: 'Computer Graphics',
            description: 'Shaders, rendering pipelines, 3D modeling, and visual effects.',
            parentId: 'game-root',
            resources: [
                { type: 'article', title: 'Learn OpenGL', url: 'https://learnopengl.com/', isFree: true }
            ],
            content: {
                overview: 'Computer graphics is the science of rendering images from 3D data. The rendering pipeline transforms 3D vertices through vertex shaders (positioning), rasterization (converting to pixels), and fragment/pixel shaders (coloring). Shaders are small programs that run on the GPU — they control how surfaces look (materials, lighting, reflections). Modern rendering uses physically-based rendering (PBR) for realistic materials, global illumination for indirect lighting, post-processing effects (bloom, ambient occlusion, motion blur), and shadow mapping. Graphics APIs (OpenGL, Vulkan, DirectX, Metal) provide low-level GPU access. For most game developers, understanding shader concepts and using the engine\'s material editor is sufficient.',
                keyConcepts: [
                    'The rendering pipeline: vertex, rasterization, fragment stages',
                    'Shaders: vertex, fragment/pixel, compute',
                    'Shader languages: HLSL (DirectX), GLSL (OpenGL), ShaderLab (Unity)',
                    'Physically-based rendering (PBR): albedo, metallic, roughness',
                    'Lighting: directional, point, spot, global illumination',
                    'Shadow mapping and soft shadows',
                    'Post-processing: bloom, SSAO, tone mapping, motion blur',
                    'Particle systems for visual effects'
                ],
                practiceQuestions: [
                    { question: 'What is a shader?', hint: 'A small program that runs on the GPU, determining how vertices are positioned and how each pixel is colored on screen.', difficulty: 'easy' },
                    { question: 'What is PBR and why is it popular?', hint: 'Physically-Based Rendering simulates how light actually interacts with materials. It looks realistic under all lighting conditions.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Learn shader basics even if you use visual material editors.',
                    'Optimize draw calls and polygon counts for target hardware.',
                    'Use LODs (level of detail) for distant objects.',
                    'Profile GPU performance with engine profiling tools.'
                ]
            }
        }
    }
};
