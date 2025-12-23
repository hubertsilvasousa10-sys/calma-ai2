
import React, { useState } from 'react';
import { TECHNIQUES } from '../constants';
import { Technique } from '../types';
import { ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const TechniquesList: React.FC<Props> = ({ onBack }) => {
  const [selected, setSelected] = useState<Technique | null>(null);

  if (selected) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <button onClick={() => setSelected(null)} className="p-2 mr-2 text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-gray-900 truncate">{selected.title}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-gray-500 mb-8 leading-relaxed">{selected.description}</p>
          <h3 className="font-bold text-gray-900 mb-4">Passo a passo:</h3>
          <div className="space-y-6">
            {selected.steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 border border-blue-100">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <p className="text-gray-700 leading-relaxed group-hover:text-blue-600 transition-colors">{step}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4">
            <CheckCircle2 className="text-emerald-500 shrink-0" size={32} />
            <p className="text-emerald-800 text-sm font-medium">Repita conforme necessário até se sentir mais calmo.</p>
          </div>
        </div>
        <div className="p-6">
          <button 
            onClick={() => setSelected(null)}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl"
          >
            Concluir Técnica
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-6 bg-white shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="p-2 -ml-2 mr-2 text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Técnicas</h1>
        </div>
        <p className="text-gray-500 text-sm">Métodos comprovados para ajudar a reduzir a ansiedade em momentos difíceis.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {TECHNIQUES.map((t) => (
          <button 
            key={t.id}
            onClick={() => setSelected(t)}
            className="w-full p-6 bg-white rounded-3xl shadow-sm flex items-center justify-between group hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="text-left">
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{t.title}</h3>
              <p className="text-gray-400 text-xs line-clamp-1">{t.description}</p>
            </div>
            <ChevronRight className="text-gray-300" size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TechniquesList;
