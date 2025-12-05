import type { TaskDefinition } from '../types';

interface TaskItemProps {
  task: TaskDefinition;
  completed: boolean;
  onToggle: () => void;
}

export function TaskItem({ task, completed, onToggle }: TaskItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
        completed
          ? 'bg-green-50 border-2 border-green-500'
          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
          completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300'
        }`}
      >
        {completed && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-xl mr-2">{task.icon}</span>
      <span
        className={`flex-1 text-left font-medium ${
          completed ? 'text-green-700' : 'text-gray-700'
        }`}
      >
        {task.name}
      </span>
    </button>
  );
}
