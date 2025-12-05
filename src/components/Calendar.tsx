import { useState } from 'react';
import { useChallengeStore } from '../stores/challengeStore';
import { getMonthDays, getFirstDayOfMonth, getToday } from '../utils/dates';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function Calendar() {
  const today = getToday();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());

  const challenge = useChallengeStore((s) => s.getActiveChallenge());
  const getDayLog = useChallengeStore((s) => s.getDayLog);

  const days = getMonthDays(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getDayStatus = (date: string): 'complete' | 'partial' | 'missed' | 'future' | 'inactive' => {
    if (!challenge) return 'inactive';
    if (date > today) return 'future';
    if (date < challenge.startDate) return 'inactive';

    const log = getDayLog(date);
    if (!log || log.tasks.length === 0) return 'missed';

    const completedCount = log.tasks.filter((t) => t.completed).length;
    if (completedCount === challenge.tasks.length) return 'complete';
    if (completedCount > 0) return 'partial';
    return 'missed';
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-semibold text-lg">
          {MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map((date) => {
          const status = getDayStatus(date);
          const dayNum = new Date(date + 'T00:00:00').getDate();
          const isToday = date === today;

          return (
            <div
              key={date}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                isToday ? 'ring-2 ring-blue-500' : ''
              } ${
                status === 'complete'
                  ? 'bg-green-500 text-white'
                  : status === 'partial'
                  ? 'bg-yellow-400 text-white'
                  : status === 'missed'
                  ? 'bg-red-100 text-red-600'
                  : status === 'future'
                  ? 'bg-gray-50 text-gray-400'
                  : 'bg-gray-50 text-gray-300'
              }`}
            >
              {dayNum}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Complete</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-400" />
          <span>Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-100" />
          <span>Missed</span>
        </div>
      </div>
    </div>
  );
}
