
import { RoadmapTrack } from './types';

export const gitRoadmap: RoadmapTrack = {
    id: 'git',
    title: 'Git & GitHub',
    description: 'Master version control and collaborative development',
    category: 'skill-based',
    icon: '📦',
    accentColor: '#f05032',
    rootNodeId: 'git-root',
    nodes: {
        'git-root': {
            id: 'git-root',
            label: 'Git & GitHub Mastery',
            description: 'Learn version control, branching, collaboration, and CI/CD with Git and GitHub.',
            children: ['git-basics', 'git-branching', 'git-collaboration', 'git-advanced', 'git-cicd'],
            resources: [
                { type: 'documentation', title: 'Git Official Documentation', url: 'https://git-scm.com/doc', isFree: true },
                { type: 'article', title: 'Git Handbook - GitHub', url: 'https://guides.github.com/introduction/git-handbook/', isFree: true },
                { type: 'video', title: 'Git & GitHub Full Course', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', isFree: true },
                { type: 'article', title: 'Learn Git Branching (Interactive)', url: 'https://learngitbranching.js.org/', isFree: true }
            ],
            content: {
                overview: 'Git is the most widely used version control system in the world, created by Linus Torvalds in 2005 for Linux kernel development. It tracks every change made to your codebase, allowing you to go back to any previous state, collaborate with others without overwriting each other\'s work, and maintain parallel lines of development through branching. Git is distributed — every developer has a complete copy of the project history on their machine, making it fast and resilient. GitHub is the largest platform for hosting Git repositories and adds collaboration features like Pull Requests, Issues, code review, Actions (CI/CD), and project management. Understanding Git is not just about memorizing commands; it is about developing the discipline of saving your work often, writing clear commit messages, and following workflows that keep your team productive.',
                keyConcepts: [
                    'Repositories: local vs remote',
                    'The three states: working directory, staging area, .git directory',
                    'Commits and the commit graph (DAG)',
                    'Branches and HEAD pointer',
                    'Merging and rebasing',
                    'Remote repositories: push, pull, fetch',
                    'Pull Requests and code review',
                    'Merge conflicts and resolution'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between git fetch and git pull?', hint: 'fetch downloads changes but does not merge them. pull does both fetch and merge.', difficulty: 'medium' },
                    { question: 'What is the staging area (index)?', hint: 'An intermediate area where you prepare (stage) changes before committing them.', difficulty: 'easy' },
                    { question: 'Why is Git distributed?', hint: 'Every clone is a full repository with complete history. You can work offline and sync later.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Commit early and commit often with clear, descriptive messages.',
                    'Never commit sensitive data (API keys, passwords) to Git.',
                    'Use .gitignore to keep build artifacts, node_modules, and IDE files out of the repo.',
                    'Write commit messages in the imperative mood: "Fix bug" not "Fixed bug".',
                    'Keep branches short-lived and focused on a single feature or fix.',
                    'Always pull the latest changes before starting new work.'
                ]
            },
            dayWisePlan: [
                { day: 1, title: 'Git Fundamentals', description: 'Local Git workflow.', tasks: ['Install Git and configure user name/email', 'Initialize a repository, add files, and make commits', 'Practice git log, git diff, and git checkout'] },
                { day: 2, title: 'Branching and Merging', description: 'Parallel development.', tasks: ['Create branches, switch between them, and merge', 'Understand fast-forward vs three-way merges', 'Resolve a merge conflict'] },
                { day: 3, title: 'GitHub Collaboration', description: 'Remote workflows.', tasks: ['Push a local repo to GitHub', 'Create and review a Pull Request', 'Set up a basic GitHub Actions workflow'] }
            ]
        },
        'git-basics': {
            id: 'git-basics',
            label: 'Git Basics',
            description: 'init, add, commit, status, log, diff — the everyday commands.',
            parentId: 'git-root',
            resources: [
                { type: 'article', title: 'Git Basics - Pro Git Book', url: 'https://git-scm.com/book/en/v2/Getting-Started-Git-Basics', isFree: true }
            ],
            content: {
                overview: 'Mastering the basic Git commands is essential before moving to more advanced topics. git init creates a new repository. git add stages changes (moves them from working directory to the staging area). git commit saves staged changes as a snapshot with a message. git status shows the current state of your working directory and staging area. git log displays the commit history. git diff shows what has changed but has not been staged yet. Understanding the three states of files (modified, staged, committed) and the working directory / staging area / repository model is the foundation of everything else in Git.',
                keyConcepts: [
                    'git init: create a new repository',
                    'git add: stage changes (. for all, or specific files)',
                    'git commit -m: save a snapshot with a message',
                    'git status: see what has changed',
                    'git log: view commit history (--oneline for compact view)',
                    'git diff: see unstaged changes',
                    '.gitignore: exclude files from tracking',
                    'git rm and git mv for file operations'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between git add and git commit?', hint: 'git add stages changes (prepares them). git commit saves the staged changes as a permanent snapshot.', difficulty: 'easy' },
                    { question: 'What does git status show?', hint: 'Files that are modified, staged, or untracked — your current working state.', difficulty: 'easy' },
                    { question: 'How do you undo the last commit without losing changes?', hint: 'git reset --soft HEAD~1 moves the commit pointer back but keeps your changes staged.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Make small, focused commits — not one giant commit at the end of the day.',
                    'Use git status frequently to understand what state your repo is in.',
                    'Write meaningful commit messages that explain WHY, not just WHAT.',
                    'Set up .gitignore before the first commit.'
                ]
            }
        },
        'git-branching': {
            id: 'git-branching',
            label: 'Branching & Merging',
            description: 'Create branches, merge strategies, rebasing, and conflict resolution.',
            parentId: 'git-root',
            resources: [
                { type: 'article', title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/', isFree: true },
                { type: 'article', title: 'Git Branching - Pro Git', url: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging', isFree: true }
            ],
            content: {
                overview: 'Branching is Git\'s killer feature. A branch is simply a pointer to a commit. Creating a branch is instantaneous (unlike some older version control systems where it copies the entire codebase). The main branch (previously called master) represents the stable production code. Feature branches let you develop new features in isolation. When a feature is complete, you merge it back into main. Fast-forward merges happen when there is a linear path from main to your branch (no divergence). Three-way merges happen when both branches have new commits. Rebasing rewrites your branch\'s commits on top of the latest main, creating a cleaner linear history. Merge conflicts occur when two branches change the same lines of the same file, requiring manual resolution.',
                keyConcepts: [
                    'Branches as lightweight pointers to commits',
                    'git branch, git checkout, git switch',
                    'Fast-forward merge vs three-way merge',
                    'Rebasing: rewriting history for a linear graph',
                    'Merge conflicts: why they happen and how to resolve them',
                    'Feature branch workflow',
                    'Deleting merged branches: git branch -d',
                    'git stash: temporarily save uncommitted changes'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between merging and rebasing?', hint: 'Merge creates a merge commit preserving history. Rebase moves your commits to the tip of the target branch for a linear history.', difficulty: 'medium' },
                    { question: 'When should you NOT rebase?', hint: 'Never rebase commits that have been pushed to a shared remote branch. It rewrites history others depend on.', difficulty: 'hard' },
                    { question: 'What is git stash used for?', hint: 'Temporarily saving uncommitted changes so you can switch branches without committing half-finished work.', difficulty: 'easy' }
                ],
                bestPractices: [
                    'Use descriptive branch names: feature/user-auth, fix/login-bug.',
                    'Keep feature branches short-lived (days, not weeks).',
                    'Rebase your feature branch on main before creating a PR for a clean history.',
                    'Delete branches after they are merged.',
                    'Never force push to shared branches.'
                ]
            }
        },
        'git-collaboration': {
            id: 'git-collaboration',
            label: 'GitHub Collaboration',
            description: 'Pull Requests, code review, Issues, forks, and project management.',
            parentId: 'git-root',
            resources: [
                { type: 'documentation', title: 'GitHub Docs', url: 'https://docs.github.com/en', isFree: true },
                { type: 'article', title: 'GitHub Flow', url: 'https://docs.github.com/en/get-started/using-github/github-flow', isFree: true }
            ],
            content: {
                overview: 'GitHub transforms Git from a personal version control tool into a collaboration platform. Pull Requests (PRs) are the primary mechanism for proposing changes — you push a branch, create a PR, and teammates review your code before it is merged. Code reviews catch bugs, ensure coding standards, and share knowledge across the team. Issues track bugs, feature requests, and tasks. Forks let you copy someone else\'s repository to your account, make changes, and submit PRs back to the original (essential for open-source contribution). GitHub Projects provides kanban-style boards for project management. Branch protection rules prevent direct pushes to main, requiring PRs and passing checks before merging.',
                keyConcepts: [
                    'Pull Requests: creating, reviewing, and merging',
                    'Code review: commenting, requesting changes, approving',
                    'Issues: bug reports, feature requests, labels, milestones',
                    'Forks and upstream remotes for open-source',
                    'CODEOWNERS for automatic review assignment',
                    'Branch protection rules',
                    'GitHub Projects for task management',
                    'GitHub Discussions for community Q&A'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between a fork and a branch?', hint: 'A fork is a copy of an entire repository under your account. A branch is a separate line of development within the same repository.', difficulty: 'easy' },
                    { question: 'What are branch protection rules?', hint: 'Settings that prevent direct pushes to a branch, requiring PRs, reviews, and passing CI checks before merging.', difficulty: 'medium' },
                    { question: 'How do you contribute to an open-source project?', hint: 'Fork the repo, create a branch, make changes, push to your fork, and open a PR to the original repo.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Write descriptive PR titles and fill out PR templates.',
                    'Request reviews from relevant teammates.',
                    'Keep PRs small and focused — large PRs are hard to review.',
                    'Use GitHub Issues to track all work items.',
                    'Set up branch protection rules on main to enforce code review.'
                ]
            }
        },
        'git-advanced': {
            id: 'git-advanced',
            label: 'Advanced Git',
            description: 'Interactive rebase, cherry-pick, bisect, reflog, and recovering from mistakes.',
            parentId: 'git-root',
            resources: [
                { type: 'article', title: 'Advanced Git - Atlassian', url: 'https://www.atlassian.com/git/tutorials/advanced-overview', isFree: true }
            ],
            content: {
                overview: 'Advanced Git covers the tools for rewriting history, debugging, and recovering from mistakes. Interactive rebase (git rebase -i) lets you squash, reorder, edit, or drop commits before merging. Cherry-pick applies a specific commit from one branch to another. Bisect performs a binary search through commit history to find which commit introduced a bug. The reflog records every time HEAD moves, making it possible to recover "lost" commits after an accidental reset or rebase. Understanding the difference between reset (move branch pointer, potentially destructive) and revert (create a new commit that undoes changes, safe for shared branches) is critical for handling mistakes in team environments.',
                keyConcepts: [
                    'Interactive rebase: squash, reword, edit, drop',
                    'Cherry-pick: apply specific commits to another branch',
                    'git bisect: binary search for bugs',
                    'git reflog: the safety net for lost commits',
                    'Reset vs revert: when to use each',
                    'git reset --soft, --mixed, --hard',
                    'Submodules for nested repositories',
                    'Git hooks for automated checks'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between git reset and git revert?', hint: 'Reset moves the branch pointer (rewrites history). Revert creates a new commit that undoes changes (safe for shared branches).', difficulty: 'hard' },
                    { question: 'How does git bisect work?', hint: 'It performs a binary search through commits. You mark commits as good or bad, and it finds the first bad commit.', difficulty: 'medium' },
                    { question: 'How can you recover a commit after git reset --hard?', hint: 'Use git reflog to find the commit hash, then git checkout or git reset to that hash.', difficulty: 'hard' }
                ],
                bestPractices: [
                    'Squash commits before merging PRs to keep the main branch history clean.',
                    'Use git revert on shared branches, never git reset.',
                    'Learn git reflog — it will save you from data loss.',
                    'Use pre-commit hooks for automatic linting and formatting.'
                ]
            }
        },
        'git-cicd': {
            id: 'git-cicd',
            label: 'GitHub Actions & CI/CD',
            description: 'Automate testing, building, and deployment with GitHub Actions.',
            parentId: 'git-root',
            resources: [
                { type: 'documentation', title: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions', isFree: true },
                { type: 'video', title: 'GitHub Actions Tutorial', url: 'https://www.youtube.com/watch?v=R8_veQiYBjI', isFree: true }
            ],
            content: {
                overview: 'GitHub Actions is a CI/CD (Continuous Integration / Continuous Deployment) platform built directly into GitHub. You define workflows in YAML files inside .github/workflows/ that run automatically on triggers like push, pull request, or on a schedule. A workflow contains jobs, and each job runs on a virtual machine (runner) and contains steps (individual commands or reusable actions). Common workflows include running tests on every PR, building Docker images, deploying to cloud platforms, and publishing npm packages. The GitHub Marketplace has thousands of pre-built actions you can reuse. Secrets (environment variables stored securely in GitHub) let you store API keys and credentials for deployments.',
                keyConcepts: [
                    'Workflows, jobs, steps, and runners',
                    'Triggers: on push, on pull_request, on schedule',
                    'YAML workflow file syntax',
                    'Using pre-built actions from the marketplace',
                    'GitHub Secrets for sensitive data',
                    'Caching dependencies for faster builds',
                    'Matrix builds for testing multiple versions',
                    'Deployment to cloud platforms (Vercel, AWS, Render)'
                ],
                practiceQuestions: [
                    { question: 'What is the difference between CI and CD?', hint: 'CI (Continuous Integration) automatically tests and builds code. CD (Continuous Deployment) automatically deploys it to production.', difficulty: 'easy' },
                    { question: 'Where do you store workflows in a GitHub repository?', hint: 'In the .github/workflows/ directory as YAML files.', difficulty: 'easy' },
                    { question: 'What is a matrix build?', hint: 'Running the same job with different configurations (like Node 18, 20, and 22) in parallel.', difficulty: 'medium' }
                ],
                bestPractices: [
                    'Run tests on every pull request before merging.',
                    'Cache node_modules or dependencies to speed up workflows.',
                    'Use GitHub Secrets for all sensitive values — never hardcode them.',
                    'Keep workflows focused — separate build, test, and deploy into different jobs.',
                    'Use matrix builds to test against multiple runtime versions.'
                ]
            }
        }
    }
};
