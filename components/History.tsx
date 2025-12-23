
import React, { useState, useEffect } from 'react';
import { User, Conversation } from '../types';
import { db } from '../store';
import { ArrowLeft, Heart, Calendar } from 'lucide-react';

interface Props {
  user: User | null;
  onBack: () => void;
  onOpenChat: () => void;
}

const History: React.FC<Props> = ({ user, onBack, onOpenChat }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (user) {
      setConversations(db.getConversations(user.id));
    }
  }, [user]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-6 bg-white shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="p-2 -ml-2 mr-2 text-gray-400">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Histórico da Jornada</h1>
        </div>
        <p className="text-gray-500 text-sm">Reveja seus diálogos anteriores e observe seu progresso emocional.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center py-20 px-8">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-400">
              <Heart size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Sem registros recentes</h3>
            <p className="text-gray-500 text-sm mb-6">Inicie um diálogo quando sentir necessidade de ser ouvido.</p>
            <button 
              onClick={onOpenChat}
              className="bg-rose-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-rose-100"
            >
              Iniciar Conversa
            </button>
          </div>
        ) : (
          conversations.map((conv) => (
            <div key={conv.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  <Calendar size={12} />
                  <span className="text-[10px] font-bold uppercase">{formatDate(conv.timestamp)} • {formatTime(conv.timestamp)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col items-end">
                  <div className="bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-xl rounded-tr-none max-w-[90%]">
                    {conv.message}
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="bg-rose-50 text-rose-800 text-xs px-3 py-2 rounded-xl rounded-tl-none max-w-[90%] font-medium italic">
                    {conv.response.substring(0, 150)}{conv.response.length > 150 ? '...' : ''}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
