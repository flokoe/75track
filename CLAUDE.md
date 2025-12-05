# CLAUDE.md

This file provides context for Claude Code when working on the 75track project.

## Project Overview

75track is a simple, low-friction web app for tracking progress on the 75 Hard challenge (or any custom challenge variant). It's designed for one-tap daily task tracking with offline-first data persistence.

## Tech Stack

- **React 19** + **TypeScript** - UI framework
- **Tailwind CSS v4** - Utility-first styling (via `@tailwindcss/vite` plugin)
- **Zustand** - State management with localStorage persistence
- **React Router v7** - Client-side routing
- **Vite** - Build tool and dev server

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Type-check and build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Calendar.tsx     # Monthly calendar view
│   ├── ProgressBar.tsx  # Task completion progress
│   ├── StreakCounter.tsx# Streak and day counter
│   ├── TaskItem.tsx     # Single task checkbox
│   ├── TaskList.tsx     # Today's task list
│   └── index.ts         # Barrel export
├── pages/               # Route pages
│   ├── Today.tsx        # Main daily view (/)
│   ├── CalendarPage.tsx # Calendar view (/calendar)
│   ├── Setup.tsx        # Challenge creation (/setup)
│   ├── Settings.tsx     # Settings & management (/settings)
│   └── index.ts         # Barrel export
├── stores/
│   └── challengeStore.ts # Zustand store with persistence
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   ├── dates.ts         # Date helper functions
│   └── templates.ts     # Challenge templates (75 Hard, 75 Soft)
├── App.tsx              # Router setup
├── main.tsx             # Entry point
└── index.css            # Tailwind imports
```

## Key Concepts

### Data Model

- **Challenge**: A challenge definition (name, duration, tasks, strictMode)
- **TaskDefinition**: A task template (id, name, icon)
- **DayLog**: Daily completion record (date, task completions)
- **TaskCompletion**: Individual task status (taskId, completed, timestamp)

### State Management

All state is managed via Zustand in `src/stores/challengeStore.ts`:
- Persisted to localStorage under key `75track-storage`
- Actions: `createChallenge`, `toggleTask`, `abandonChallenge`
- Selectors: `getActiveChallenge`, `getCurrentDay`, `getStreak`, `isDayComplete`

### Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | Today | Daily task checklist |
| `/calendar` | CalendarPage | Monthly progress view |
| `/setup` | Setup | Create/edit challenge |
| `/settings` | Settings | Challenge management |

## Code Conventions

- Components use function declarations with named exports
- Tailwind classes inline (no separate CSS files)
- Date strings in ISO format (YYYY-MM-DD)
- Icons via inline SVG or emoji

## Design Principles

1. **One-tap tracking** - Marking a task complete requires exactly one tap
2. **Offline first** - Works without internet, data stored locally
3. **Mobile first** - Designed primarily for phone use
4. **Minimal UI** - Clean, focused interface without clutter
