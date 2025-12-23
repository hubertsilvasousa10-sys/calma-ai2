
import React from 'react';
import { User, MoodEntry } from '../types';
import { db } from '../store';
// Add Sparkles to the list of imports from lucide-react
import { ArrowLeft, TrendingUp, Calendar, Heart, Sparkles } from 'lucide-react';

interface Props {
  user: User | null;
  onBack: () => void;
}

const Statistics: React.FC<Props> = ({ user, onBack }) => {
  const moods = user ? db.getMoods(user.id) : [];
  
  const moodCounts = moods.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = moods.length || 1;
  const moodLabels: Record<string, string> = {
    happy: 'Feliz',
    neutral: 'Neutro',
    anxious: 'Ansioso',
    sad: 'Triste',
    angry: 'Irritado'
  };

  const moodColors: Record<string, string> = {
    happy: 'bg-emerald-400',
    neutral: 'bg-gray-400',
    anxious: 'bg-amber-400',
    sad: 'bg-blue-400',
    angry: 'bg-red-400'
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="p-6 pt-12 bg-white flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400"><ArrowLeft size={24} /></button>
        <h1 className="text-2xl font-bold text-gray-900">Seu Coração</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Card de Resumo */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Momentos Registrados</p>
            <h2 className="text-3xl font-black text-[#1E88FE]">{moods.length}</h2>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <Calendar size={24} />
          </div>
        </div>

        {/* Gráfico de Humor */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" /> Como você tem se sentido
          </h3>
          
          <div className="space-y-4">
            {Object.entries(moodLabels).map(([key, label]) => {
              const count = moodCounts[key] || 0;
              const percent = (count / total) * 100;
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-500">
                    <span>{label}</span>
                    <span>{Math.round(percent)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${moodColors[key]} transition-all duration-1000`} 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-[#1E88FE] p-6 rounded-[32px] shadow-xl shadow-blue-100 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Heart size={18} /> Pensamento do Dia
            </h3>
            <p className="text-sm text-blue-50 leading-relaxed italic">
              "Cada registro seu é um passo em direção ao autoconhecimento. Percebemos sua constância em buscar equilíbrio. Estamos juntos nessa caminhada."
            </p>
          </div>
          <Sparkles size={80} className="absolute -right-4 -bottom-4 text-white/10" />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
