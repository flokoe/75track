import { Link } from 'react-router-dom';
import { Calendar } from '../components';
import { useChallengeStore } from '../stores/challengeStore';

export function CalendarPage() {
  const challenge = useChallengeStore((s) => s.getActiveChallenge());
  const streak = useChallengeStore((s) => s.getStreak());
  const currentDay = useChallengeStore((s) => s.getCurrentDay());

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No active challenge</p>
          <Link
            to="/setup"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Start a Challenge
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto p-4 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{challenge.name}</h1>
          <p className="text-gray-500">
            Day {currentDay} of {challenge.duration} • {streak} day streak 🔥
          </p>
        </div>

        {/* Calendar */}
        <Calendar />

        {/* Stats */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">Challenge Stats</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-500">{currentDay}</p>
              <p className="text-xs text-gray-500">Current Day</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{streak}</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-500">
                {challenge.duration - currentDay + 1}
              </p>
              <p className="text-xs text-gray-500">Days Left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-lg mx-auto flex">
          <Link
            to="/"
            className="flex-1 py-4 flex flex-col items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs mt-1">Today</span>
          </Link>
          <Link
            to="/calendar"
            className="flex-1 py-4 flex flex-col items-center text-blue-500"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs mt-1">Calendar</span>
          </Link>
          <Link
            to="/settings"
            className="flex-1 py-4 flex flex-col items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
