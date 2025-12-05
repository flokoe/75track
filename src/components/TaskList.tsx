import { TaskItem } from './TaskItem';
import { useChallengeStore } from '../stores/challengeStore';
import { getToday } from '../utils/dates';

export function TaskList() {
  const challenge = useChallengeStore((s) => s.getActiveChallenge());
  const toggleTask = useChallengeStore((s) => s.toggleTask);
  const dayLogs = useChallengeStore((s) => s.dayLogs);
  const activeChallengeId = useChallengeStore((s) => s.activeChallengeId);
  const today = getToday();

  if (!challenge) return null;

  const todayLog = dayLogs.find(
    (log) => log.challengeId === activeChallengeId && log.date === today
  );

  const isTaskCompleted = (taskId: string) => {
    return todayLog?.tasks.find((t) => t.taskId === taskId)?.completed ?? false;
  };

  return (
    <div className="flex flex-col gap-3">
      {challenge.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          completed={isTaskCompleted(task.id)}
          onToggle={() => toggleTask(today, task.id)}
        />
      ))}
    </div>
  );
}
