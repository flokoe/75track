export interface TaskDefinition {
  id: string;
  name: string;
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
  completedAt?: string;
}

export interface DayLog {
  challengeId: string;
  date: string;
  tasks: TaskCompletion[];
  notes?: string;
}

export type ChallengeTemplate = Omit<Challenge, 'id' | 'startDate' | 'status'>;
