
import React, { useState } from 'react';
import { User, MoodType } from '../types';
import { db } from '../store';
import { ArrowLeft, Save, Smile, CloudRain, Meh, Zap, Frown } from 'lucide-react';

interface Props {
  user: User | null;
  onBack: () => void;
}

const Diary: React.FC<Props> = ({ user, onBack }) => {
  const [mood, setMood] = useState<MoodType>('neutral');
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const moods: { type: MoodType, label: string, icon: React.ReactNode, color: string }[] = [
    { type: 'happy', label: 'Pleno', icon: <Smile />, color: 'text-emerald-500 bg-emerald-50' },
    { type: 'neutral', label: 'Estável', icon: <Meh />, color: 'text-gray-500 bg-gray-50' },
    { type: 'anxious', label: 'Inquieto', icon: <Zap />, color: 'text-amber-500 bg-amber-50' },
    { type: 'sad', label: 'Melancólico', icon: <CloudRain />, color: 'text-blue-500 bg-blue-50' },
    { type: 'angry', label: 'Irritado', icon: <Frown />, color: 'text-red-500 bg-red-50' },
  ];

  const handleSave = () => {
    if (!user) return;
    db.saveMood({
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      mood,
      note,
      timestamp: new Date().toISOString()
    });
    setIsSaved(true);
    setTimeout(() => onBack(), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 pt-12 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400"><ArrowLeft size={24} /></button>
        <h1 className="text-2xl font-bold text-gray-900">Registro Diário</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Como descreveria seu estado atual?</h3>
          <div className="grid grid-cols-5 gap-2">
            {moods.map((m) => (
              <button
                key={m.type}
                onClick={() => setMood(m.type)}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                  mood === m.type ? `${m.color} ring-2 ring-current` : 'bg-gray-50 text-gray-300'
                }`}
              >
                {m.icon}
                <span className="text-[10px] mt-2 font-bold">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Descreva seu estado de espírito</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-48 p-5 bg-gray-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-blue-600 resize-none"
            placeholder="Registre aqui suas reflexões mais profundas..."
          />
        </div>

        <div className="p-4 bg-blue-50 rounded-3xl flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <BookText size={20} />
          </div>
          <p className="text-xs text-blue-800 font-medium">A verbalização escrita é um recurso fundamental para o processamento emocional.</p>
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all ${
            isSaved ? 'bg-emerald-500 text-white' : 'bg-[#1E88FE] text-white shadow-blue-200'
          }`}
        >
          {isSaved ? 'Concluído' : <><Save size={20} /> Confirmar Registro</>}
        </button>
      </div>
    </div>
  );
};

import { BookText } from 'lucide-react';
export default Diary;
