import type { ChallengeTemplate } from '../types';

export const TEMPLATES: Record<string, ChallengeTemplate> = {
  '75hard': {
    name: '75 Hard',
    duration: 75,
    strictMode: true,
    tasks: [
      { id: 'workout1', name: 'Workout #1', type: 'duration', target: 45, icon: '💪' },
      { id: 'workout2', name: 'Workout #2 (outdoor)', type: 'duration', target: 45, icon: '🏃' },
      { id: 'diet', name: 'Follow diet', type: 'boolean', icon: '🥗' },
      { id: 'water', name: 'Drink water (glasses)', type: 'counter', target: 8, icon: '💧' },
      { id: 'read', name: 'Read (pages)', type: 'counter', target: 10, icon: '📖' },
      { id: 'photo', name: 'Progress photo', type: 'boolean', icon: '📸' },
      { id: 'alcohol', name: 'No alcohol', type: 'boolean', icon: '🚫' },
    ],
  },
  '75soft': {
    name: '75 Soft',
    duration: 75,
    strictMode: false,
    tasks: [
      { id: 'workout', name: 'Workout', type: 'duration', target: 45, icon: '💪' },
      { id: 'diet', name: 'Eat well', type: 'boolean', icon: '🥗' },
      { id: 'water', name: 'Drink water (glasses)', type: 'counter', target: 8, icon: '💧' },
      { id: 'read', name: 'Read (pages)', type: 'counter', target: 10, icon: '📖' },
      { id: 'reflection', name: 'Daily reflection', type: 'text', icon: '📝' },
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
