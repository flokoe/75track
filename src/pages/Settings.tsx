import { Link, useNavigate } from 'react-router-dom';
import { useChallengeStore } from '../stores/challengeStore';
import { formatDate } from '../utils/dates';

export function Settings() {
  const navigate = useNavigate();
  const challenge = useChallengeStore((s) => s.getActiveChallenge());
  const abandonChallenge = useChallengeStore((s) => s.abandonChallenge);

  const handleAbandon = () => {
    if (!challenge) return;
    if (confirm('Are you sure you want to abandon this challenge? This cannot be undone.')) {
      abandonChallenge(challenge.id);
      navigate('/setup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto p-4 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        {challenge ? (
          <>
            {/* Current Challenge */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Current Challenge</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="text-gray-900">{challenge.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="text-gray-900">{challenge.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Started</span>
                  <span className="text-gray-900">{formatDate(challenge.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mode</span>
                  <span className="text-gray-900">{challenge.strictMode ? 'Strict' : 'Flexible'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tasks</span>
                  <span className="text-gray-900">{challenge.tasks.length} daily tasks</span>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Daily Tasks</h2>
              <ul className="space-y-2">
                {challenge.tasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-2 text-sm text-gray-700">
                    <span>{task.icon}</span>
                    <span>{task.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-3">Actions</h2>
              <div className="space-y-2">
                <Link
                  to="/setup"
                  className="block w-full py-2 px-4 text-center text-blue-500 border-2 border-blue-500 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Edit Challenge
                </Link>
                <button
                  onClick={handleAbandon}
                  className="w-full py-2 px-4 text-red-500 border-2 border-red-500 rounded-xl hover:bg-red-50 transition-colors"
                >
                  Abandon Challenge
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-500 mb-4">No active challenge</p>
            <Link
              to="/setup"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold"
            >
              Start a Challenge
            </Link>
          </div>
        )}

        {/* About */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>75track v1.0</p>
          <p>Data stored locally in your browser</p>
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
            className="flex-1 py-4 flex flex-col items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs mt-1">Calendar</span>
          </Link>
          <Link
            to="/settings"
            className="flex-1 py-4 flex flex-col items-center text-blue-500"
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
