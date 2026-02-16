
import { RoadmapTrack } from './types';

export const devopsBeginnerRoadmap: RoadmapTrack = {
    id: 'devops-beginner',
    title: 'DevOps Beginner',
    description: 'Start your journey into DevOps, infrastructure, and automation',
    category: 'beginner',
    icon: '🚀',
    accentColor: '#818cf8',
    rootNodeId: 'db-root',
    nodes: {
        'db-root': {
            id: 'db-root',
            label: 'DevOps Basics',
            description: 'The intersection of software development (Dev) and IT operations (Ops).',
            children: ['db-linux', 'db-git', 'db-cloud', 'db-containers'],
            resources: [
                { type: 'article', title: 'What is DevOps?', url: 'https://aws.amazon.com/devops/what-is-devops/', isFree: true },
                { type: 'article', title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', isFree: true }
            ],
            content: {
                overview: 'DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). The goal is to shorten the development life cycle and provide continuous delivery with high quality. As a beginner, you need to master the command line (Linux), version control (Git), and the basics of deploying applications to the cloud. Automation is the core philosophy: if you do it more than once, automate it. You will move from manually copying files to servers to building automated pipelines that test and deploy code in minutes.',
                keyConcepts: [
                    'CI/CD: Continuous Integration / Continuous Deployment',
                    'Infrastructure as Code (IaC)',
                    'Automation vs Manual processes',
                    'Monitoring and Logging',
                    'Cloud Computing basics',
                    'Virtualization vs Containerization'
                ],
                practiceQuestions: [
                    { question: 'What is the main goal of DevOps?', hint: 'To deliver high-quality software faster by collaborating and automating.', difficulty: 'easy' },
                    { question: 'What is CI/CD?', hint: 'CI is automatically testing code changes (Integration). CD is automatically deploying them (Delivery/Deployment).', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Automate everything.',
                    'Treat infrastructure like software (code it).',
                    'Collaborate closely with developers.',
                    'Start small: learn Linux and Git first.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Command Line', description: 'Linux terminal basics.', tasks: ['Install a terminal (WSL on Windows, Terminal on Mac)', 'Learn ls, cd, mkdir, touch, cat', 'Learn file permissions (chmod, chown)'] },
                { day: 2, title: 'Version Control', description: 'Git fundamentals.', tasks: ['Create a GitHub account', 'Initialize a repo, add, commit, push', 'Understand branching and merging'] },
                { day: 3, title: 'Cloud Intro', description: 'Where does code live?', tasks: ['Create a free AWS or DigitalOcean account', 'Spin up a VM (EC2/Droplet)', 'SSH into the remote server'] }
            ]
        },
        'db-linux': {
            id: 'db-linux',
            label: 'Linux Basics',
            description: 'The operating system of the cloud. Command line mastery is required.',
            parentId: 'db-root',
            resources: [
                { type: 'article', title: 'Linux Command Line for Beginners', url: 'https://ubuntu.com/tutorials/command-line-for-beginners', isFree: true }
            ],
            content: {
                overview: 'Linux powers the vast majority of the world\'s servers. As a DevOps engineer, you will spend most of your time in a terminal (shell), not a GUI. You need to be comfortable navigating the file system, managing processes, editing files (Vim/Nano), and writing simple shell scripts (Bash). Understanding permissions, users, and SSH (Secure Shell) is non-negotiable.',
                keyConcepts: [
                    'Shells: Bash, Zsh',
                    'File System: /root, /home, /var, /etc',
                    'Commands: ls, cd, cp, mv, rm, grep, cat, chmod, chown',
                    'Process management: ps, top, kill',
                    'SSH: connecting to remote servers',
                    'Package managers: apt, yum, apk',
                    'Text editors: Vim, Nano'
                ],
                practiceQuestions: [
                    { question: 'How do you list all files including hidden ones?', hint: 'ls -a', difficulty: 'easy' },
                    { question: 'What does "chmod 777" do?', hint: 'Gives Read, Write, and Execute permissions to Everyone. (Usually bad practice!)', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Never run as root unless necessary (use sudo).',
                    'Learn Vim basics — it is available on every server.',
                    'Script repetitive tasks.'
                ]
            }
        },
        'db-git': {
            id: 'db-git',
            label: 'Git & GitHub',
            description: 'Source code management and version control.',
            parentId: 'db-root',
            content: {
                overview: 'Git is the standard for version control. It tracks changes to code over time. GitHub (or GitLab/Bitbucket) is where that code is stored in the cloud. You need to know how to save work (commit), sync with the cloud (push/pull), and manage parallel work streams (branching). Infrastructure as Code means even your server configs will be stored in Git.',
                keyConcepts: [
                    'Repository, Commit, Stage',
                    'Push, Pull, Fetch',
                    'Branches, Merging, Pull Requests',
                    'Merge Conflicts',
                    '.gitignore'
                ]
            }
        },
        'db-cloud': {
            id: 'db-cloud',
            label: 'Cloud Concepts',
            description: 'Compute, Storage, and Networking in the cloud.',
            parentId: 'db-root',
            content: {
                overview: 'The Cloud is just someone else\'s computer, but with APIs. The big providers are AWS, Azure, and Google Cloud (GCP). They provide three main primitives: Compute (VMs like EC2), Storage (Object storage like S3), and Networking (VPC, DNS, Load Balancers). DevOps is about stitching these services together to run applications reliably.',
                keyConcepts: [
                    'IaaS vs PaaS vs SaaS',
                    'Virtual Machines (EC2)',
                    'Object Storage (S3)',
                    'Load Balancers',
                    'Regions and Availability Zones'
                ]
            }
        },
        'db-containers': {
            id: 'db-containers',
            label: 'Containerization',
            description: 'Docker: Packaging applications for consistency.',
            parentId: 'db-root',
            content: {
                overview: 'Containers solve the "it works on my machine" problem. A container packages code + dependencies + OS libraries into a single unit that runs the same everywhere. Docker is the standard tool. You write a Dockerfile to define the environment, build an Image, and run that image as a Container. Kubernetes (K8s) is then used to manage (orchestrate) many containers across many servers.',
                keyConcepts: [
                    'Docker vs Virtual Machines',
                    'Dockerfile, Image, Container',
                    'Docker Hub / Registries',
                    'Volumes (persistence)',
                    'Networking between containers'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between an Image and a Container?', hint: 'An Image is the blueprint (read-only). A Container is the running instance of that blueprint.', difficulty: 'easy' }
                ]
            }
        }
    }
};
