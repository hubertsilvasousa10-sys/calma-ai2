
import React, { useState, useEffect } from 'react';
import { User, Mission } from '../types';
import { db } from '../store';
import { ArrowLeft, CheckCircle2, Circle, Sparkles, Coffee, Wind, Moon, Heart } from 'lucide-react';

interface Props {
  user: User | null;
  onBack: () => void;
}

const MissionsList: React.FC<Props> = ({ user, onBack }) => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    if (user) {
      setMissions(db.getMissions(user.id));
    }
  }, [user]);

  const handleComplete = (id: string) => {
    if (!user) return;
    db.completeMission(user.id, id);
    setMissions(db.getMissions(user.id));
  };

  const getIcon = (category: string) => {
    switch(category) {
      case 'water': return <Coffee size={24} className="text-blue-500" />;
      case 'breath': return <Wind size={24} className="text-emerald-500" />;
      case 'pause': return <Moon size={24} className="text-purple-500" />;
      default: return <Heart size={24} className="text-rose-500" />;
    }
  };

  const isDark = user?.preferences.theme === 'dark';
  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      <div className={`p-6 pt-12 ${isDark ? 'bg-[#1E293B]' : 'bg-white'} flex items-center gap-4 shadow-sm`}>
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400"><ArrowLeft size={24} /></button>
        <h1 className="text-2xl font-bold">Missões de Hoje</h1>
      </div>

      <div className="p-6">
        <div className={`${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} p-6 rounded-[32px] flex items-center justify-between border ${isDark ? 'border-blue-800/50' : 'border-blue-100'}`}>
          <div>
            <h3 className="font-bold text-blue-600">Progresso do Dia</h3>
            <p className="text-xs text-blue-500/80">{completedCount} de {missions.length} concluídas</p>
          </div>
          <Sparkles className="text-amber-400" size={32} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-4">
        {missions.map((mission) => (
          <div 
            key={mission.id}
            onClick={() => handleComplete(mission.id)}
            className={`p-5 rounded-[28px] border flex items-center gap-4 transition-all active:scale-[0.98] cursor-pointer ${
              mission.completed 
                ? (isDark ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-100')
                : (isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-gray-100')
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-[#334155]' : 'bg-gray-50'}`}>
              {getIcon(mission.category)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className={`font-bold text-sm ${mission.completed ? 'text-emerald-600 line-through opacity-60' : ''}`}>
                  {mission.title}
                </h4>
                <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                  +{mission.points}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-1">{mission.description}</p>
            </div>
            {mission.completed ? (
              <CheckCircle2 className="text-emerald-500" size={24} />
            ) : (
              <Circle className="text-gray-300" size={24} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionsList;
