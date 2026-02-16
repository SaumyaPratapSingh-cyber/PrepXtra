# Core Subjects Learning Module

This directory contains the UI components for the core computer science subjects learning module.

## Components

- `SubjectCard.tsx`: Displays subject summary, progress, and entry point.
- `TopicList.tsx`: Displays list of topics for a subject with status indicators.
- `ContentViewer.tsx`: Renders markdown content, code blocks, and diagrams.
- `QuizComponent.tsx`: Interactive quiz engine with multiple question types.
- `ProgressTracker.tsx`: Visualizes user learning progress stats.

## Data Structure

The content is organized hierarchically:
1. **CoreSubject**: Main subject category (e.g., "Operating Systems")
2. **CoreTopic**: Individual topic (e.g., "Process Management")
3. **CoreContent**: Actual lesson content (Markdown)
4. **CoreQuiz**: Quiz associated with a topic

## Adding Content

To add new content, you can:
1. Use the API endpoints (POST) - *To be implemented for admin dashboard*
2. Add to seed data scripts in `scripts/seed-data/` and re-run the seeder

### Markdown Support

The `ContentViewer` uses `react-markdown` and supports:
- Standard Markdown syntax
- GFM (GitHub Flavored Markdown) tables, strikethrough, etc.
- Syntax highlighting for code blocks using `react-syntax-highlighter`
- Images and diagrams

## Progress Tracking

User progress is tracked in the `User` model under `coreSubjectsProgress` array.
- Completed topics are stored by ID
- Quiz scores are recorded with timestamps
- Learning streak is calculated daily on activity
