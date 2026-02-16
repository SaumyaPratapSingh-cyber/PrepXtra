
import { RoadmapTrack } from './types';

export const uxDesignRoadmap: RoadmapTrack = {
    id: 'ux-design',
    title: 'UX Design',
    description: 'Learn how to design user-centered experiences',
    category: 'role-based',
    icon: '✨',
    accentColor: '#ec4899',
    rootNodeId: 'ux-root',
    nodes: {
        'ux-root': {
            id: 'ux-root',
            label: 'UX Design Mastery',
            description: 'Learn the research and design skills needed to build products people love.',
            children: ['ux-research', 'ux-wireframing', 'ux-ui-design', 'ux-testing'],
            resources: [
                { type: 'article', title: 'UX Design Roadmap', url: 'https://roadmap.sh/ux-design', isFree: true },
                { type: 'course', title: 'Google UX Design Certificate', url: 'https://www.coursera.org/professional-certificates/google-ux-design', isFree: false },
                { type: 'article', title: 'Laws of UX', url: 'https://lawsofux.com/', isFree: true }
            ],
            content: {
                overview: 'UX (User Experience) Design is the process of designing products that are useful, easy to use, and delightful. A UX designer researches user needs, creates information architectures, designs wireframes and prototypes, and validates designs through usability testing. The field combines psychology (understanding how people think and behave), visual design (creating interfaces that are clear and appealing), and business strategy (aligning design with business goals). The double diamond framework guides the process: discover (research), define (problem), develop (ideate solutions), deliver (test and iterate). UX designers use tools like Figma for design, FigJam for collaboration, and Maze or UserTesting for research.',
                keyConcepts: [
                    'User-centered design process',
                    'Double diamond: discover, define, develop, deliver',
                    'Information architecture: organizing content and navigation',
                    'Interaction design: how users interact with elements',
                    'Accessibility: WCAG guidelines for inclusive design',
                    'Design thinking: empathize, define, ideate, prototype, test',
                    'Heuristic evaluation: Nielsen\'s 10 usability heuristics',
                    'Design systems: reusable components and patterns'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between UX and UI design?', hint: 'UX is the overall experience (research, flows, architecture). UI is the visual layer (colors, typography, component design). UX comes first.', difficulty: 'easy' },
                    { question: 'What are Nielsen\'s 10 usability heuristics?', hint: 'Design principles like visibility of system status, match with real world, user control, consistency, error prevention, and help documentation.', difficulty: 'medium' },
                    { question: 'Why is accessibility important in UX design?', hint: 'About 15% of the world has a disability. Accessible design helps everyone (curb cuts benefit wheelchairs, parents with strollers, and deliveries).', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Always start with user research — never design based on assumptions.',
                    'Design for accessibility from the start, not as an afterthought.',
                    'Test with real users early and often.',
                    'Build and maintain a design system for consistency.',
                    'Collaborate closely with developers to ensure feasibility.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'UX Foundations', description: 'Core concepts and research.', tasks: ['Learn user-centered design principles', 'Conduct a user interview or survey', 'Create a user persona from research findings'] },
                { day: 2, title: 'Design and Prototype', description: 'Wireframing and interaction.', tasks: ['Create wireframes in Figma for a simple app', 'Build an interactive prototype with clickable flows', 'Apply visual design: typography, color, spacing'] },
                { day: 3, title: 'Test and Iterate', description: 'Validate with users.', tasks: ['Run a usability test with 3-5 users', 'Analyze feedback and identify pain points', 'Iterate on the design based on findings'] }
            ]
        },
        'ux-research': {
            id: 'ux-research',
            label: 'User Research',
            description: 'Understanding user needs through interviews, personas, and empathy mapping.',
            parentId: 'ux-root',
            resources: [
                { type: 'article', title: 'NNGroup Research Methods', url: 'https://www.nngroup.com/articles/which-ux-research-methods/', isFree: true }
            ],
            content: {
                overview: 'User research is the foundation of good UX design. It answers the questions: who are your users, what do they need, and what problems do they face? Qualitative methods (user interviews, contextual inquiry, diary studies) uncover motivations, frustrations, and behaviors in depth. Quantitative methods (surveys, analytics, A/B tests) measure patterns at scale. User personas are fictional representations of your target users based on real research data. Empathy maps visualize what users say, think, feel, and do. Journey maps trace the complete user experience across touchpoints. The key insight is that users often cannot tell you what they want — you need to observe their behavior and infer unmet needs.',
                keyConcepts: [
                    'User interviews: structured, semi-structured, unstructured',
                    'Surveys and questionnaires for quantitative data',
                    'User personas: demographics, goals, frustrations',
                    'Empathy maps: say, think, feel, do',
                    'User journey maps: touchpoints and pain points',
                    'Contextual inquiry: observing users in their environment',
                    'Card sorting for information architecture',
                    'Competitive analysis: studying existing solutions'
                ],
                practiceQuestions: [
                    { question: 'Why is observing behavior better than asking preferences?', hint: 'People often say one thing but do another. Behavioral data reveals what users actually do, not what they think they would do.', difficulty: 'medium' },
                    { question: 'How many users do you need for a usability test?', hint: 'Nielsen recommends 5 users to find about 85% of usability problems. More users have diminishing returns.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Ask open-ended questions in interviews (how, why, tell me about).',
                    'Avoid leading questions that suggest a specific answer.',
                    'Use a mix of qualitative and quantitative methods.',
                    'Document and share findings with the entire team.',
                    'Update personas and journey maps as you learn more.'
                ]
            }
        },
        'ux-wireframing': {
            id: 'ux-wireframing',
            label: 'Wireframing & Prototyping',
            description: 'Creating low-fidelity layouts, user flows, and interactive prototypes.',
            parentId: 'ux-root',
            resources: [
                { type: 'documentation', title: 'Figma', url: 'https://www.figma.com/', isFree: true }
            ],
            content: {
                overview: 'Wireframing is the process of creating low-fidelity blueprints of screens before adding visual design. Wireframes focus on layout, content hierarchy, and functionality — not colors or fonts. They are fast to create and easy to change, making them ideal for exploring different approaches. User flows diagram the paths a user takes to complete a task (signup, checkout, onboarding). Prototypes add interactivity to wireframes — clickable hotspots that simulate navigation and interactions. Figma is the industry-standard tool for both wireframing and prototyping. Low-fidelity prototypes (paper sketches or simple wireframes) are for concept validation. High-fidelity prototypes (pixel-perfect designs with animations) are for final user testing and developer handoff.',
                keyConcepts: [
                    'Sketching: paper wireframes for rapid exploration',
                    'Digital wireframes in Figma or similar tools',
                    'User flows: task-based navigation diagrams',
                    'Information architecture: organizing content logically',
                    'Low-fidelity vs high-fidelity prototypes',
                    'Interactive prototyping with clickable connections',
                    'Micro-interactions and transition animations',
                    'Developer handoff: specs, assets, and design tokens'
                ],
                practiceQuestions: [
                    { question: 'Why start with low-fidelity wireframes?', hint: 'They are fast to create and cheap to throw away. You can explore many ideas before investing in detailed designs.', difficulty: 'easy' },
                    { question: 'What is information architecture?', hint: 'Organizing and structuring content so users can find what they need. Navigation menus, categories, and page hierarchies.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Start with pen and paper before opening Figma.',
                    'Create multiple layout options before committing to one.',
                    'Use real content (not lorem ipsum) to catch layout issues.',
                    'Keep prototypes interactive enough to test, but no more.',
                    'Use Figma components and auto-layout for efficiency.'
                ]
            }
        },
        'ux-ui-design': {
            id: 'ux-ui-design',
            label: 'UI Design Basics',
            description: 'Typography, color theory, layout, and design systems.',
            parentId: 'ux-root',
            resources: [
                { type: 'article', title: 'Refactoring UI', url: 'https://www.refactoringui.com/', isFree: false },
                { type: 'article', title: 'Material Design Guidelines', url: 'https://m3.material.io/', isFree: true }
            ],
            content: {
                overview: 'UI (User Interface) design is the visual layer of UX — it determines how a product looks and feels. Typography establishes hierarchy and readability: choose a primary font (Inter, Outfit, or Roboto for web), use consistent size scales, and limit to 2-3 font sizes per screen. Color theory guides palette selection: use a primary color for actions, a neutral palette for content areas, and semantic colors (red for errors, green for success). Layout uses grids, spacing, and alignment to create visual order. Design systems (collections of reusable components with defined styles) ensure consistency across a product. Apple\'s Human Interface Guidelines and Google\'s Material Design are industry-standard references.',
                keyConcepts: [
                    'Typography: typeface selection, hierarchy, line height, letter spacing',
                    'Color theory: primary, secondary, neutral, semantic colors',
                    'Color accessibility: contrast ratios (WCAG AA/AAA)',
                    'Layout: grid systems, spacing scales, alignment',
                    'Visual hierarchy: size, color, weight, position',
                    'Icons and imagery guidelines',
                    'Design tokens: colors, spacing, typography as variables',
                    'Design systems: component libraries with usage guidelines'
                ],
                practiceQuestions: [
                    { question: 'What is visual hierarchy and why does it matter?', hint: 'Controlling what users see first by using size, color, and position. Without hierarchy, everything competes for attention.', difficulty: 'easy' },
                    { question: 'What is a design system?', hint: 'A collection of reusable components (buttons, inputs, cards) with documented guidelines for consistent design across a product or company.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use a consistent spacing scale (4px, 8px, 16px, 24px, 32px, etc.).',
                    'Ensure all text passes WCAG AA contrast ratio (4.5:1 for body text).',
                    'Limit your color palette — fewer colors, used consistently.',
                    'Build a component library early and maintain it.',
                    'Study existing design systems (Material, Apple HIG, Ant Design) for inspiration.'
                ]
            }
        },
        'ux-testing': {
            id: 'ux-testing',
            label: 'Usability Testing',
            description: 'Validating designs with real users through testing and iteration.',
            parentId: 'ux-root',
            resources: [
                { type: 'article', title: 'NNGroup Usability Testing', url: 'https://www.nngroup.com/articles/usability-testing-101/', isFree: true }
            ],
            content: {
                overview: 'Usability testing puts your design in front of real users and observes whether they can complete tasks successfully. Moderated testing involves a facilitator guiding participants through tasks while asking questions. Unmoderated testing uses tools (Maze, UserTesting) where participants complete tasks independently and their interactions are recorded. Think-aloud protocol asks users to verbalize their thoughts while using the design, revealing confusion and expectations. A/B testing compares two design variations with real traffic to see which performs better. The System Usability Scale (SUS) provides a standardized score. Usability testing is not about proving your design is good — it is about finding problems before they ship to production.',
                keyConcepts: [
                    'Moderated vs unmoderated testing',
                    'Task-based scenarios and success metrics',
                    'Think-aloud protocol for qualitative insights',
                    'A/B testing for quantitative comparison',
                    'System Usability Scale (SUS) scoring',
                    'First-click testing for navigation validation',
                    'Heatmaps and session recordings',
                    'Affinity diagrams for organizing findings'
                ],
                practiceQuestions: [
                    { question: 'How do you write a good usability test task?', hint: 'Make it realistic and goal-oriented ("Find and book a hotel in Paris for next weekend") not instruction-based ("Click the search button").', difficulty: 'medium' },
                    { question: 'What is the difference between moderated and unmoderated testing?', hint: 'Moderated: facilitator is present, can ask follow-up questions, more insights. Unmoderated: remote, scalable, faster, but less depth.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Test with 5 users per round — more has diminishing returns.',
                    'Write task scenarios that mimic real goals, not instructions.',
                    'Never help or guide the user during a test.',
                    'Focus on patterns across users, not individual opinions.',
                    'Iterate quickly: test, learn, redesign, test again.'
                ]
            }
        }
    }
};
