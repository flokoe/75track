interface StreakCounterProps {
  streak: number;
  currentDay: number;
  totalDays: number;
}

export function StreakCounter({ streak, currentDay, totalDays }: StreakCounterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-2xl font-bold text-gray-900">{streak}</p>
          <p className="text-sm text-gray-500">day streak</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900">Day {currentDay}</p>
        <p className="text-sm text-gray-500">of {totalDays}</p>
      </div>
    </div>
  );
}
