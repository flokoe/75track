import { TaskItem } from './TaskItem';
import { useChallengeStore } from '../stores/challengeStore';
import { getToday } from '../utils/dates';

export function TaskList() {
  const challenge = useChallengeStore((s) => s.getActiveChallenge());
  const toggleTask = useChallengeStore((s) => s.toggleTask);
  const isTaskCompleted = useChallengeStore((s) => s.isTaskCompleted);
  const today = getToday();

  if (!challenge) return null;

  return (
    <div className="flex flex-col gap-3">
      {challenge.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          completed={isTaskCompleted(today, task.id)}
          onToggle={() => toggleTask(today, task.id)}
        />
      ))}
    </div>
  );
}
