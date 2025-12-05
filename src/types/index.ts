export type TaskType = 'boolean' | 'counter' | 'duration' | 'text';

export interface TaskDefinition {
  id: string;
  name: string;
  type: TaskType;
  target?: number; // for counter (e.g., 8 glasses) or duration (e.g., 45 minutes)
  icon?: string;
}

export interface Challenge {
  id: string;
  name: string;
  duration: number;
  startDate: string;
  strictMode: boolean;
  tasks: TaskDefinition[];
  status: 'active' | 'completed' | 'abandoned';
}

export interface TaskCompletion {
  taskId: string;
  completed: boolean;
  value?: number | string; // for counter/duration/text types
  completedAt?: string;
}

export interface DayLog {
  challengeId: string;
  date: string;
  tasks: TaskCompletion[];
  notes?: string;
}

export type ChallengeTemplate = Omit<Challenge, 'id' | 'startDate' | 'status'>;
