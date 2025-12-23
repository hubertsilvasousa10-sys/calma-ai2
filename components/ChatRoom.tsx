
import React, { useState, useRef, useEffect } from 'react';
import { User, Conversation } from '../types';
import { db } from '../store';
import { getAIResponse } from '../geminiService';
import { ArrowLeft, Send, Sparkles, HeartPulse } from 'lucide-react';

interface Props {
  user: User | null;
  onBack: () => void;
}

const ChatRoom: React.FC<Props> = ({ user, onBack }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string, time: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: 'user', text: userText, time }]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getAIResponse(userText, history);
    
    const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'model', text: responseText, time: aiTime }]);
    setIsLoading(false);

    if (user) {
      db.saveConversation({
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        message: userText,
        response: responseText,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] overflow-hidden">
      {/* Cabeçalho de Apoio */}
      <div className="flex items-center px-4 py-4 bg-white shadow-sm z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 mr-2 text-gray-400 hover:text-blue-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3 shadow-sm">
          <HeartPulse className="text-white" size={20} />
        </div>
        <div>
          <h2 className="font-bold text-gray-900 leading-none">Canal de Diálogo</h2>
          <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">Escuta Atenciosa</span>
        </div>
      </div>

      {/* Espaço de Conversação */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="text-center py-10 px-6 space-y-4">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-gray-50">
              <Sparkles className="text-rose-500" size={32} />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Olá. Eu sou a <strong>Calma</strong>. <br/>
              Este é um ambiente seguro para compartilhar seus pensamentos. Como você se sente nesta ocasião?
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-rose-500 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-rose-100' : 'text-gray-400'}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 border border-gray-100">
              <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Campo de Entrada Polido */}
      <form 
        onSubmit={handleSend}
        className="p-4 bg-white border-t border-gray-100 flex items-center gap-3"
      >
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Expresse seus sentimentos aqui..."
          className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
        />
        <button 
          disabled={!input.trim() || isLoading}
          className={`p-3 rounded-full transition-all ${
            !input.trim() || isLoading ? 'bg-gray-100 text-gray-400' : 'bg-rose-500 text-white shadow-lg shadow-rose-100'
          }`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
