import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChallengeStore } from '../stores/challengeStore';
import { TEMPLATES, createEmptyTemplate } from '../utils/templates';
import type { ChallengeTemplate, TaskDefinition } from '../types';

export function Setup() {
  const navigate = useNavigate();
  const createChallenge = useChallengeStore((s) => s.createChallenge);
  const activeChallenge = useChallengeStore((s) => s.getActiveChallenge());

  const [step, setStep] = useState<'select' | 'customize'>(activeChallenge ? 'customize' : 'select');
  const [template, setTemplate] = useState<ChallengeTemplate>(
    activeChallenge
      ? { name: activeChallenge.name, duration: activeChallenge.duration, strictMode: activeChallenge.strictMode, tasks: activeChallenge.tasks }
      : TEMPLATES['75hard']
  );
  const [newTaskName, setNewTaskName] = useState('');

  const handleSelectTemplate = (key: string) => {
    if (key === 'custom') {
      setTemplate(createEmptyTemplate());
    } else {
      setTemplate({ ...TEMPLATES[key] });
    }
    setStep('customize');
  };

  const handleAddTask = () => {
    if (!newTaskName.trim()) return;
    const newTask: TaskDefinition = {
      id: crypto.randomUUID(),
      name: newTaskName.trim(),
      icon: '✓',
    };
    setTemplate({
      ...template,
      tasks: [...template.tasks, newTask],
    });
    setNewTaskName('');
  };

  const handleRemoveTask = (taskId: string) => {
    setTemplate({
      ...template,
      tasks: template.tasks.filter((t) => t.id !== taskId),
    });
  };

  const handleStart = () => {
    if (template.tasks.length === 0) return;
    createChallenge(template);
    navigate('/');
  };

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Start a Challenge</h1>
          <p className="text-gray-500 mb-6">Choose a template or create your own</p>

          <div className="space-y-3">
            <button
              onClick={() => handleSelectTemplate('75hard')}
              className="w-full bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors text-left"
            >
              <h3 className="font-semibold text-gray-900">75 Hard</h3>
              <p className="text-sm text-gray-500">The original mental toughness program</p>
              <p className="text-xs text-gray-400 mt-1">7 daily tasks • 75 days • Strict mode</p>
            </button>

            <button
              onClick={() => handleSelectTemplate('75soft')}
              className="w-full bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors text-left"
            >
              <h3 className="font-semibold text-gray-900">75 Soft</h3>
              <p className="text-sm text-gray-500">A more flexible approach</p>
              <p className="text-xs text-gray-400 mt-1">5 daily tasks • 75 days • Flexible mode</p>
            </button>

            <button
              onClick={() => handleSelectTemplate('custom')}
              className="w-full bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors text-left"
            >
              <h3 className="font-semibold text-gray-900">Custom Challenge</h3>
              <p className="text-sm text-gray-500">Create your own challenge from scratch</p>
              <p className="text-xs text-gray-400 mt-1">Define your own tasks and duration</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => setStep('select')}
          className="flex items-center text-gray-500 mb-4 hover:text-gray-700"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Customize Challenge</h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Challenge Name
          </label>
          <input
            type="text"
            value={template.name}
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (days)
          </label>
          <input
            type="number"
            value={template.duration}
            onChange={(e) => setTemplate({ ...template, duration: parseInt(e.target.value) || 1 })}
            min={1}
            max={365}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Strict Mode */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={template.strictMode}
              onChange={(e) => setTemplate({ ...template, strictMode: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900">Strict Mode</span>
              <p className="text-sm text-gray-500">Reset streak if you miss a day</p>
            </div>
          </label>
        </div>

        {/* Tasks */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Tasks
          </label>

          <div className="space-y-2 mb-3">
            {template.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200"
              >
                <span className="flex items-center gap-2">
                  <span>{task.icon}</span>
                  <span className="text-gray-700">{task.name}</span>
                </span>
                <button
                  onClick={() => handleRemoveTask(task.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="Add a task..."
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={template.tasks.length === 0}
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            template.tasks.length > 0
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Start Challenge
        </button>

        {template.tasks.length === 0 && (
          <p className="text-sm text-red-500 text-center mt-2">
            Add at least one task to start
          </p>
        )}
      </div>
    </div>
  );
}
