import type { ChallengeTemplate } from '../types';

export const TEMPLATES: Record<string, ChallengeTemplate> = {
  '75hard': {
    name: '75 Hard',
    duration: 75,
    strictMode: true,
    tasks: [
      { id: 'workout1', name: 'Workout #1 (45 min)', icon: '💪' },
      { id: 'workout2', name: 'Workout #2 - outdoor (45 min)', icon: '🏃' },
      { id: 'diet', name: 'Follow diet', icon: '🥗' },
      { id: 'water', name: 'Drink 1 gallon water', icon: '💧' },
      { id: 'read', name: 'Read 10 pages', icon: '📖' },
      { id: 'photo', name: 'Progress photo', icon: '📸' },
      { id: 'alcohol', name: 'No alcohol', icon: '🚫' },
    ],
  },
  '75soft': {
    name: '75 Soft',
    duration: 75,
    strictMode: false,
    tasks: [
      { id: 'workout', name: 'Workout (45 min)', icon: '💪' },
      { id: 'diet', name: 'Eat well (1 cheat meal/week)', icon: '🥗' },
      { id: 'water', name: 'Drink 3L water', icon: '💧' },
      { id: 'read', name: 'Read 10 pages', icon: '📖' },
      { id: 'alcohol', name: 'No alcohol except social', icon: '🍷' },
    ],
  },
};

export function createEmptyTemplate(): ChallengeTemplate {
  return {
    name: 'My Challenge',
    duration: 30,
    strictMode: false,
    tasks: [],
  };
}
