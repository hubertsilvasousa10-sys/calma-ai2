
import React, { useState, useEffect } from 'react';
import { User, Goal } from '../types';
import { db } from '../store';
import { ArrowLeft, Target, Plus, CheckCircle2, Circle } from 'lucide-react';

interface Props {
  user: User | null;
  onBack: () => void;
}

const Goals: React.FC<Props> = ({ user, onBack }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    if (user) setGoals(db.getGoals(user.id));
  }, [user]);

  const handleAdd = () => {
    if (!newGoal.trim() || !user) return;
    const g: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      title: newGoal,
      completed: false,
      timestamp: new Date().toISOString()
    };
    db.saveGoal(g);
    setGoals([...goals, g]);
    setNewGoal('');
  };

  const handleToggle = (id: string) => {
    db.toggleGoal(id);
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const percent = goals.length ? (completedCount / goals.length) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 pt-12 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400"><ArrowLeft size={24} /></button>
        <h1 className="text-2xl font-bold text-gray-900">Minhas Metas</h1>
      </div>

      <div className="p-6 bg-blue-50 m-6 rounded-[32px] flex items-center gap-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-100" />
            <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * percent) / 100} className="text-blue-600 transition-all duration-1000" />
          </svg>
          <span className="absolute text-sm font-black text-blue-700">{Math.round(percent)}%</span>
        </div>
        <div>
          <h3 className="font-bold text-blue-900">Progresso Mental</h3>
          <p className="text-xs text-blue-700">{completedCount} de {goals.length} metas atingidas</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-4">
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="flex-1 bg-gray-50 border-none rounded-2xl px-4 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Meditar 10 minutos"
          />
          <button 
            onClick={handleAdd}
            className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Plus size={24} />
          </button>
        </div>

        {goals.map(goal => (
          <button 
            key={goal.id}
            onClick={() => handleToggle(goal.id)}
            className={`w-full p-4 rounded-3xl border flex items-center gap-4 transition-all ${
              goal.completed ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-gray-100'
            }`}
          >
            {goal.completed ? (
              <CheckCircle2 className="text-emerald-500" size={24} />
            ) : (
              <Circle className="text-gray-300" size={24} />
            )}
            <span className={`text-sm font-medium ${goal.completed ? 'text-emerald-800 line-through' : 'text-gray-700'}`}>
              {goal.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Goals;
