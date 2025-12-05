import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Challenge, DayLog, TaskCompletion, ChallengeTemplate } from '../types';
import { getToday, getDayNumber } from '../utils/dates';

interface ChallengeState {
  challenges: Challenge[];
  activeChallengeId: string | null;
  dayLogs: DayLog[];

  // Actions
  createChallenge: (template: ChallengeTemplate) => string;
  setActiveChallenge: (id: string | null) => void;
  abandonChallenge: (id: string) => void;

  toggleTask: (date: string, taskId: string) => void;
  setTaskValue: (date: string, taskId: string, value: number | string) => void;
  getDayLog: (date: string) => DayLog | undefined;

  // Computed
  getActiveChallenge: () => Challenge | undefined;
  getCurrentDay: () => number;
  getStreak: () => number;
  isTaskCompleted: (date: string, taskId: string) => boolean;
  getTaskValue: (date: string, taskId: string) => number | string | undefined;
  isDayComplete: (date: string) => boolean;
}

export const useChallengeStore = create<ChallengeState>()(
  persist(
    (set, get) => ({
      challenges: [],
      activeChallengeId: null,
      dayLogs: [],

      createChallenge: (template) => {
        const id = crypto.randomUUID();
        const challenge: Challenge = {
          ...template,
          id,
          startDate: getToday(),
          status: 'active',
        };
        set((state) => ({
          challenges: [...state.challenges, challenge],
          activeChallengeId: id,
        }));
        return id;
      },

      setActiveChallenge: (id) => {
        set({ activeChallengeId: id });
      },

      abandonChallenge: (id) => {
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === id ? { ...c, status: 'abandoned' as const } : c
          ),
          activeChallengeId: state.activeChallengeId === id ? null : state.activeChallengeId,
        }));
      },

      toggleTask: (date, taskId) => {
        const { activeChallengeId, dayLogs } = get();
        if (!activeChallengeId) return;

        const existingLog = dayLogs.find(
          (log) => log.challengeId === activeChallengeId && log.date === date
        );

        if (existingLog) {
          const existingTask = existingLog.tasks.find((t) => t.taskId === taskId);
          const updatedTasks: TaskCompletion[] = existingTask
            ? existingLog.tasks.map((t) =>
                t.taskId === taskId
                  ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined }
                  : t
              )
            : [...existingLog.tasks, { taskId, completed: true, completedAt: new Date().toISOString() }];

          set((state) => ({
            dayLogs: state.dayLogs.map((log) =>
              log.challengeId === activeChallengeId && log.date === date
                ? { ...log, tasks: updatedTasks }
                : log
            ),
          }));
        } else {
          const newLog: DayLog = {
            challengeId: activeChallengeId,
            date,
            tasks: [{ taskId, completed: true, completedAt: new Date().toISOString() }],
          };
          set((state) => ({
            dayLogs: [...state.dayLogs, newLog],
          }));
        }
      },

      setTaskValue: (date, taskId, value) => {
        const { activeChallengeId, dayLogs } = get();
        const challenge = get().getActiveChallenge();
        if (!activeChallengeId || !challenge) return;

        // Find the task definition to check if target is met
        const taskDef = challenge.tasks.find((t) => t.id === taskId);
        const isComplete = taskDef?.target
          ? typeof value === 'number' && value >= taskDef.target
          : typeof value === 'number' ? value > 0 : Boolean(value);

        const existingLog = dayLogs.find(
          (log) => log.challengeId === activeChallengeId && log.date === date
        );

        if (existingLog) {
          const existingTask = existingLog.tasks.find((t) => t.taskId === taskId);
          const updatedTasks: TaskCompletion[] = existingTask
            ? existingLog.tasks.map((t) =>
                t.taskId === taskId
                  ? { ...t, value, completed: isComplete, completedAt: isComplete ? new Date().toISOString() : undefined }
                  : t
              )
            : [...existingLog.tasks, { taskId, value, completed: isComplete, completedAt: isComplete ? new Date().toISOString() : undefined }];

          set((state) => ({
            dayLogs: state.dayLogs.map((log) =>
              log.challengeId === activeChallengeId && log.date === date
                ? { ...log, tasks: updatedTasks }
                : log
            ),
          }));
        } else {
          const newLog: DayLog = {
            challengeId: activeChallengeId,
            date,
            tasks: [{ taskId, value, completed: isComplete, completedAt: isComplete ? new Date().toISOString() : undefined }],
          };
          set((state) => ({
            dayLogs: [...state.dayLogs, newLog],
          }));
        }
      },

      getDayLog: (date) => {
        const { activeChallengeId, dayLogs } = get();
        if (!activeChallengeId) return undefined;
        return dayLogs.find(
          (log) => log.challengeId === activeChallengeId && log.date === date
        );
      },

      getActiveChallenge: () => {
        const { challenges, activeChallengeId } = get();
        return challenges.find((c) => c.id === activeChallengeId);
      },

      getCurrentDay: () => {
        const challenge = get().getActiveChallenge();
        if (!challenge) return 0;
        return getDayNumber(challenge.startDate, getToday());
      },

      getStreak: () => {
        const { activeChallengeId, dayLogs } = get();
        const challenge = get().getActiveChallenge();
        if (!activeChallengeId || !challenge) return 0;

        const challengeLogs = dayLogs.filter((log) => log.challengeId === activeChallengeId);
        let streak = 0;
        const today = getToday();
        const currentDay = getDayNumber(challenge.startDate, today);

        for (let i = currentDay; i >= 1; i--) {
          const dayOffset = currentDay - i;
          const checkDate = new Date(today + 'T00:00:00');
          checkDate.setDate(checkDate.getDate() - dayOffset);
          const dateStr = checkDate.toISOString().split('T')[0];

          const log = challengeLogs.find((l) => l.date === dateStr);
          const completedCount = log?.tasks.filter((t) => t.completed).length ?? 0;

          if (completedCount === challenge.tasks.length) {
            streak++;
          } else if (i < currentDay) {
            break;
          }
        }

        return streak;
      },

      isTaskCompleted: (date, taskId) => {
        const log = get().getDayLog(date);
        return log?.tasks.find((t) => t.taskId === taskId)?.completed ?? false;
      },

      getTaskValue: (date, taskId) => {
        const log = get().getDayLog(date);
        return log?.tasks.find((t) => t.taskId === taskId)?.value;
      },

      isDayComplete: (date) => {
        const challenge = get().getActiveChallenge();
        const log = get().getDayLog(date);
        if (!challenge || !log) return false;
        const completedCount = log.tasks.filter((t) => t.completed).length;
        return completedCount === challenge.tasks.length;
      },
    }),
    {
      name: '75track-storage',
    }
  )
);
