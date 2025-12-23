
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Square, RefreshCcw } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const BreathingGuide: React.FC<Props> = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes default
  const [cycleProgress, setCycleProgress] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        
        // Simulating the 4-7-8 cycle roughly
        setCycleProgress((prev) => (prev + 0.1) % 19); 
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (!isActive) return;
    const current = cycleProgress;
    if (current < 4) setPhase('Inhale');
    else if (current < 11) setPhase('Hold');
    else setPhase('Exhale');
  }, [cycleProgress, isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getLabel = () => {
    if (!isActive) return 'Pronto para começar?';
    switch (phase) {
      case 'Inhale': return 'Inspire pelo nariz...';
      case 'Hold': return 'Segure a respiração...';
      case 'Exhale': return 'Solte o ar pela boca...';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white items-center justify-between p-8">
      <div className="w-full flex items-center justify-between">
        <button onClick={onBack} className="p-2 text-gray-500">
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-gray-900">Respiração Guiada</span>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-64 h-64">
          {/* Main Breathing Circle */}
          <div 
            className={`absolute rounded-full transition-all duration-[1000ms] flex items-center justify-center
              ${phase === 'Inhale' ? 'scale-150 bg-blue-100/50' : phase === 'Hold' ? 'scale-150 bg-blue-200/50' : 'scale-100 bg-blue-50/50'}
            `}
            style={{ width: '160px', height: '160px' }}
          >
            <div 
              className={`rounded-full bg-blue-600 transition-all duration-[1000ms] flex items-center justify-center
                ${phase === 'Inhale' ? 'scale-125' : phase === 'Hold' ? 'scale-125 opacity-80' : 'scale-100'}
              `}
              style={{ width: '100px', height: '100px' }}
            >
              <div className="w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <div className="absolute -bottom-16 text-center">
            <h2 className="text-xl font-bold text-blue-600 h-8 transition-all">{getLabel()}</h2>
            <p className="text-gray-400 text-sm mt-2 font-mono">{formatTime(timeLeft)} restantes</p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        {!isActive ? (
          <button 
            onClick={() => setIsActive(true)}
            className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-transform active:scale-95"
          >
            <Play fill="currentColor" size={20} /> Iniciar Sessão
          </button>
        ) : (
          <button 
            onClick={() => setIsActive(false)}
            className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl shadow-xl shadow-gray-100 flex items-center justify-center gap-3 transition-transform active:scale-95"
          >
            <Square fill="currentColor" size={20} /> Pausar
          </button>
        )}
        
        {timeLeft < 180 && !isActive && (
          <button 
            onClick={() => { setTimeLeft(180); setCycleProgress(0); }}
            className="w-full py-4 text-gray-500 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 rounded-2xl transition-colors"
          >
            <RefreshCcw size={18} /> Reiniciar
          </button>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400">Técnica recomendada: 4s inspira, 7s segura, 8s expira.</p>
      </div>
    </div>
  );
};

export default BreathingGuide;
