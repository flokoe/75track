import type { TaskDefinition } from '../types';

interface TaskItemProps {
  task: TaskDefinition;
  completed: boolean;
  value?: number | string;
  onToggle: () => void;
  onValueChange: (value: number | string) => void;
}

export function TaskItem({ task, completed, value, onToggle, onValueChange }: TaskItemProps) {
  const taskType = task.type || 'boolean';

  // For counter/duration, check if target is met
  const isTargetMet = () => {
    if (taskType === 'counter' || taskType === 'duration') {
      const numValue = typeof value === 'number' ? value : 0;
      return task.target ? numValue >= task.target : numValue > 0;
    }
    return completed;
  };

  const isComplete = taskType === 'boolean' || taskType === 'text' ? completed : isTargetMet();

  // Boolean task - simple checkbox
  if (taskType === 'boolean') {
    return (
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
          isComplete
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-white border-2 border-gray-200 hover:border-gray-300'
        }`}
      >
        <CheckCircle checked={isComplete} />
        <span className="text-xl mr-2">{task.icon}</span>
        <span className={`flex-1 text-left font-medium ${isComplete ? 'text-green-700' : 'text-gray-700'}`}>
          {task.name}
        </span>
      </button>
    );
  }

  // Counter task - +/- buttons
  if (taskType === 'counter') {
    const numValue = typeof value === 'number' ? value : 0;
    const target = task.target || 1;
    const progress = Math.min((numValue / target) * 100, 100);

    return (
      <div
        className={`w-full p-4 rounded-xl transition-all duration-200 ${
          isComplete
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-white border-2 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle checked={isComplete} />
          <span className="text-xl mr-2">{task.icon}</span>
          <span className={`flex-1 text-left font-medium ${isComplete ? 'text-green-700' : 'text-gray-700'}`}>
            {task.name}
          </span>
        </div>
        <div className="flex items-center gap-3 ml-10">
          <button
            onClick={() => onValueChange(Math.max(0, numValue - 1))}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600"
          >
            -
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-700">{numValue}</span>
              <span className="text-gray-500">/ {target}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => onValueChange(numValue + 1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  // Duration task - minutes input with +/- buttons
  if (taskType === 'duration') {
    const numValue = typeof value === 'number' ? value : 0;
    const target = task.target || 30;
    const progress = Math.min((numValue / target) * 100, 100);

    return (
      <div
        className={`w-full p-4 rounded-xl transition-all duration-200 ${
          isComplete
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-white border-2 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle checked={isComplete} />
          <span className="text-xl mr-2">{task.icon}</span>
          <span className={`flex-1 text-left font-medium ${isComplete ? 'text-green-700' : 'text-gray-700'}`}>
            {task.name}
          </span>
        </div>
        <div className="flex items-center gap-3 ml-10">
          <button
            onClick={() => onValueChange(Math.max(0, numValue - 5))}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600"
          >
            -5
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-700">{numValue} min</span>
              <span className="text-gray-500">/ {target} min</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => onValueChange(numValue + 5)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600"
          >
            +5
          </button>
        </div>
      </div>
    );
  }

  // Text task - text input
  if (taskType === 'text') {
    const textValue = typeof value === 'string' ? value : '';

    return (
      <div
        className={`w-full p-4 rounded-xl transition-all duration-200 ${
          isComplete
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-white border-2 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onToggle}>
            <CheckCircle checked={isComplete} />
          </button>
          <span className="text-xl mr-2">{task.icon}</span>
          <span className={`flex-1 text-left font-medium ${isComplete ? 'text-green-700' : 'text-gray-700'}`}>
            {task.name}
          </span>
        </div>
        <div className="ml-10">
          <textarea
            value={textValue}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="Write your notes..."
            className="w-full p-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-blue-500"
            rows={2}
          />
        </div>
      </div>
    );
  }

  return null;
}

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
        checked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
      }`}
    >
      {checked && (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}
