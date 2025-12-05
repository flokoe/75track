# 75track - Design Proposal

A simple, low-friction web app for tracking progress on the 75 Hard challenge (or any custom challenge variant).

## Problem Statement

The 75 Hard challenge requires tracking multiple daily tasks for 75 consecutive days. Existing solutions are either:
- Too complex with unnecessary features
- Not customizable for personal challenge variants
- Require too many clicks/interactions for daily tracking

## Goals

1. **Simplicity First**: One-tap/click tracking for each task
2. **Customizable**: Define your own challenges and daily tasks
3. **Visual Progress**: See your streak and history at a glance
4. **Zero Account Friction**: Works offline, data stored locally (with optional sync)

---

## Core Features

### 1. Challenge Management

Users can create custom challenges with:
- **Name**: e.g., "My 75 Hard", "30 Day Fitness"
- **Duration**: Number of days (default: 75)
- **Daily Tasks**: List of tasks to complete each day
- **Streak Rules**: Strict (restart on miss) or Flexible (continue counting)

**Pre-built Templates:**
- 75 Hard (original rules)
- 75 Soft (modified version)
- Custom (start from scratch)

### 2. Daily Task Tracking

The main interface shows today's tasks with:
- Task name
- Simple checkbox/toggle to mark complete
- Optional: Quick notes or values (e.g., "8 glasses" for water)

**Task Types:**
| Type | Example | Input |
|------|---------|-------|
| Boolean | "Take progress photo" | Checkbox |
| Counter | "Drink water (glasses)" | +/- buttons |
| Duration | "Workout" | Minutes input |
| Text | "Daily reflection" | Text field |

### 3. Progress Dashboard

- **Current Streak**: Days completed consecutively
- **Day X of Y**: Current position in challenge
- **Calendar View**: Visual grid showing completed/missed days
- **Completion Rate**: Percentage of tasks completed overall

### 4. History & Analytics

- View past days and what was completed
- See patterns (which tasks are hardest to complete)
- Export data (JSON/CSV)

---

## User Interface

### Screen 1: Home / Today View

```
┌─────────────────────────────────────┐
│  75track              Day 23 of 75  │
│  ═══════════════════════════════════│
│                                     │
│  ☀️ Today's Tasks                   │
│  ─────────────────────────────────  │
│  [✓] Workout #1 (45 min)           │
│  [ ] Workout #2 - outdoor (45 min) │
│  [✓] Read 10 pages                 │
│  [ ] Drink 1 gallon water  ████░░  │
│  [ ] Follow diet                   │
│  [ ] Progress photo                │
│  [ ] No alcohol                    │
│                                     │
│  ─────────────────────────────────  │
│  Progress: 4/7 tasks               │
│  🔥 Streak: 22 days                │
│                                     │
└─────────────────────────────────────┘
```

### Screen 2: Calendar View

```
┌─────────────────────────────────────┐
│  ← November 2024                 →  │
│  ═══════════════════════════════════│
│  Mo Tu We Th Fr Sa Su               │
│                    1  2  3          │
│  ●  ●  ●  ●  ●  ◐  ●               │
│  4  5  6  7  8  9  10              │
│  ●  ●  ●  ○  ●  ●  ●               │
│  11 12 13 14 15 16 17              │
│  ●  ●  ●  ●  ●  ●  ●               │
│  18 19 20 21 22 23                 │
│  ●  ●  ●  ●  ●  ◌                  │
│                                     │
│  Legend: ● Complete ◐ Partial ○ Miss│
└─────────────────────────────────────┘
```

### Screen 3: Challenge Setup

```
┌─────────────────────────────────────┐
│  Create Challenge                   │
│  ═══════════════════════════════════│
│                                     │
│  Name: [My 75 Hard            ]     │
│  Days: [75]                         │
│                                     │
│  Daily Tasks:                       │
│  ┌─────────────────────────────┐    │
│  │ + Add task                  │    │
│  ├─────────────────────────────┤    │
│  │ ☐ Workout #1      [boolean] │ ✕  │
│  │ ☐ Workout #2      [boolean] │ ✕  │
│  │ 📖 Read pages     [counter] │ ✕  │
│  │ 💧 Water glasses  [counter] │ ✕  │
│  └─────────────────────────────┘    │
│                                     │
│  [ ] Strict mode (reset on miss)   │
│                                     │
│  [    Start Challenge    ]          │
└─────────────────────────────────────┘
```

---

## Technical Architecture

### Tech Stack (Recommended)

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | React + TypeScript | Type safety, component reuse |
| Styling | Tailwind CSS | Rapid UI development |
| State | Zustand | Simple, lightweight state management |
| Storage | localStorage + IndexedDB | Offline-first, no backend needed |
| Build | Vite | Fast development experience |
| Hosting | Static (GitHub Pages/Vercel) | Free, simple deployment |

**Optional Future Additions:**
- Supabase/Firebase for cloud sync
- PWA support for mobile install

### Data Model

```typescript
interface Challenge {
  id: string;
  name: string;
  duration: number;           // days
  startDate: string;          // ISO date
  strictMode: boolean;        // reset streak on miss
  tasks: TaskDefinition[];
  status: 'active' | 'completed' | 'abandoned';
}

interface TaskDefinition {
  id: string;
  name: string;
  type: 'boolean' | 'counter' | 'duration' | 'text';
  target?: number;            // for counter/duration types
  icon?: string;              // emoji or icon name
}

interface DayLog {
  challengeId: string;
  date: string;               // ISO date (YYYY-MM-DD)
  tasks: TaskCompletion[];
  notes?: string;
}

interface TaskCompletion {
  taskId: string;
  completed: boolean;
  value?: number | string;    // for non-boolean types
  completedAt?: string;       // timestamp
}
```

### Storage Strategy

```
localStorage
├── 75track_challenges      // Challenge definitions
├── 75track_active          // Currently active challenge ID
└── 75track_logs_<id>       // Day logs per challenge
```

---

## User Flows

### Flow 1: First Time User

1. Land on app → See welcome screen
2. Choose template or create custom challenge
3. Define tasks (or accept defaults)
4. Start challenge → Redirected to Today view

### Flow 2: Daily Check-in (Primary Flow)

1. Open app → See Today view with current day's tasks
2. Tap each task as completed throughout the day
3. See progress bar fill up
4. When all complete → Celebration animation
5. Close app (auto-saves)

### Flow 3: Viewing Progress

1. Tap calendar icon → See monthly calendar view
2. Tap any day → See that day's task completion
3. View streak counter and stats

---

## MVP Scope (v1.0)

**Include:**
- [x] Single active challenge at a time
- [x] Boolean task type (checkbox only)
- [x] Today view with task list
- [x] Calendar view (month)
- [x] Streak counter
- [x] Local storage persistence
- [x] 75 Hard default template
- [x] Custom challenge creation

**Exclude (Future):**
- [ ] Multiple simultaneous challenges
- [ ] Counter/duration task types
- [ ] Cloud sync
- [ ] Social features
- [ ] Notifications/reminders
- [ ] Data export

---

## Design Principles

1. **One-Tap Tracking**: The most common action (marking a task complete) should require exactly one tap
2. **Glanceable Progress**: Current status visible immediately on app open
3. **Offline First**: Works without internet, data never lost
4. **Minimal Decisions**: Sensible defaults, don't ask unnecessary questions
5. **Mobile First**: Designed for phone use (most common tracking scenario)

---

## File Structure (Proposed)

```
75track/
├── src/
│   ├── components/
│   │   ├── TaskItem.tsx        # Single task checkbox
│   │   ├── TaskList.tsx        # Today's task list
│   │   ├── ProgressBar.tsx     # Visual progress indicator
│   │   ├── Calendar.tsx        # Monthly calendar view
│   │   ├── StreakCounter.tsx   # Current streak display
│   │   └── ChallengeForm.tsx   # Challenge creation form
│   ├── pages/
│   │   ├── Today.tsx           # Main daily view
│   │   ├── Calendar.tsx        # Calendar/history view
│   │   ├── Settings.tsx        # Challenge settings
│   │   └── Setup.tsx           # New challenge setup
│   ├── stores/
│   │   └── challengeStore.ts   # Zustand store
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── storage.ts          # localStorage helpers
│   │   └── dates.ts            # Date utilities
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Next Steps

1. **Approve Design**: Review and finalize this proposal
2. **Setup Project**: Initialize Vite + React + TypeScript + Tailwind
3. **Build Core Components**: TaskItem, TaskList, ProgressBar
4. **Implement Storage**: Zustand store with localStorage persistence
5. **Create Pages**: Today view, Calendar view, Setup flow
6. **Add Templates**: 75 Hard default challenge
7. **Polish**: Animations, mobile optimization
8. **Deploy**: GitHub Pages or Vercel

---

## Questions to Consider

1. Should completed challenges be archived or deleted?
2. Do you want dark mode support?
3. Any specific tasks you always want in your custom challenges?
4. Should missed days show a modal asking to restart or continue?
