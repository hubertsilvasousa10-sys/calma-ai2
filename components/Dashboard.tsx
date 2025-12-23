
import React, { useState, useEffect } from 'react';
import { User, AppScreen, Mission } from '../types';
import { db } from '../store';
import { 
  MessageCircle, Wind, Activity, History, 
  User as UserIcon, Sparkles, BookText, 
  BarChart3, Target, CheckCircle2, Circle
} from 'lucide-react';

interface Props {
  user: User | null;
  onNavigate: (screen: AppScreen) => void;
}

const Dashboard: React.FC<Props> = ({ user, onNavigate }) => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    if (user) {
      setMissions(db.getMissions(user.id));
    }
  }, [user]);

  const handleCompleteMission = (id: string) => {
    if (!user) return;
    db.completeMission(user.id, id);
    setMissions(db.getMissions(user.id));
  };

  const actions = [
    { id: 'CHAT', label: 'Diálogo', icon: <MessageCircle size={20} />, color: 'bg-rose-100 text-rose-600' },
    { id: 'DIARY', label: 'Reflexão', icon: <BookText size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 'ROUTINES', label: 'Técnicas', icon: <Activity size={20} />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'BREATHING', label: 'Respirar', icon: <Wind size={20} />, color: 'bg-cyan-100 text-cyan-600' },
  ];

  const firstName = user?.name.split(' ')[0] || 'Visitante';
  const isDark = user?.preferences.theme === 'dark';

  return (
    <div className={`flex flex-col flex-1 ${isDark ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'} overflow-y-auto pb-10`}>
      {/* Cabeçalho Formal-Acolhedor */}
      <div className={`${isDark ? 'bg-[#1E293B]' : 'bg-white'} px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight">
              Olá, {firstName}
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1 font-medium italic`}>
              "Que este espaço lhe proporcione a serenidade necessária."
            </p>
          </div>
          <button 
            onClick={() => onNavigate('PROFILE')}
            className={`w-14 h-14 ${isDark ? 'bg-[#334155]' : 'bg-gray-50'} rounded-2xl flex items-center justify-center border ${isDark ? 'border-[#475569]' : 'border-gray-100'}`}
          >
            <UserIcon size={28} className="text-[#1E88FE]" />
          </button>
        </div>
      </div>

      {/* Navegação Estruturada */}
      <div className="grid grid-cols-4 gap-3 p-6">
        {actions.map(action => (
          <button 
            key={action.id}
            onClick={() => onNavigate(action.id as AppScreen)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center group-active:scale-90 transition-transform shadow-sm`}>
              {action.icon}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recomendações Diárias */}
      <div className="px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" /> Atividades Recomendadas
          </h2>
          <button 
            onClick={() => onNavigate('MISSIONS_LIST')}
            className="text-xs text-blue-600 font-bold hover:underline"
          >
            Ver todas
          </button>
        </div>
        
        <div className="space-y-3">
          {missions.slice(0, 2).map((mission) => (
            <div 
              key={mission.id} 
              className={`${isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-gray-100'} p-4 rounded-3xl shadow-sm border flex items-center gap-4 transition-all`}
            >
              <div className={`w-10 h-10 ${isDark ? 'bg-[#334155]' : 'bg-blue-50'} rounded-xl flex items-center justify-center text-blue-500`}>
                <Activity size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold">{mission.title}</h4>
                <p className="text-xs text-gray-400">{mission.description}</p>
              </div>
              <button 
                onClick={() => handleCompleteMission(mission.id)}
                className={`transition-colors ${mission.completed ? 'text-emerald-500' : 'text-gray-300'}`}
              >
                {mission.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoramento de Progresso */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('STATISTICS')}
          className={`${isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-gray-50'} p-5 rounded-3xl shadow-sm border flex flex-col items-start gap-3`}
        >
          <BarChart3 className="text-purple-500" size={24} />
          <div>
            <h4 className="text-sm font-bold">Estado Emocional</h4>
            <p className="text-[10px] text-gray-400">Análise de registros</p>
          </div>
        </button>
        
        <button 
          onClick={() => onNavigate('GOALS')}
          className={`${isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-gray-50'} p-5 rounded-3xl shadow-sm border flex flex-col items-start gap-3`}
        >
          <Target className="text-amber-500" size={24} />
          <div>
            <h4 className="text-sm font-bold">Metas Pessoais</h4>
            <p className="text-[10px] text-gray-400">Objetivos individuais</p>
          </div>
        </button>
      </div>

      <div className="px-6 pb-6">
        <button 
          onClick={() => onNavigate('HISTORY')}
          className="w-full p-4 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-sm shadow-xl hover:bg-black transition-colors"
        >
          <History size={18} /> Registros de Jornada
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
