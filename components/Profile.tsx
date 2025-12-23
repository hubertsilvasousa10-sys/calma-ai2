
import React, { useState } from 'react';
import { User } from '../types';
import { db } from '../store';
import { 
  ArrowLeft, LogOut, Lock, User as UserIcon, Check, Eye, 
  EyeOff, Moon, Sun, Bell, Shield, Info, X
} from 'lucide-react';

interface Props {
  user: User | null;
  onBack: () => void;
  onLogout: () => void;
}

const Profile: React.FC<Props> = ({ user, onBack, onLogout }) => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleUpdatePassword = () => {
    if (!newPassword || !user) return;
    db.updatePassword(user.id, newPassword);
    setNewPassword('');
    setShowPassword(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleTheme = () => {
    if (!user) return;
    const updated = {
      ...user,
      preferences: {
        ...user.preferences,
        theme: user.preferences.theme === 'light' ? 'dark' : 'light'
      }
    };
    db.updateUser(updated);
  };

  const toggleReminders = () => {
    if (!user) return;
    const updated = {
      ...user,
      preferences: {
        ...user.preferences,
        reminders: !user.preferences.reminders
      }
    };
    db.updateUser(updated);
  };

  const isDark = user?.preferences.theme === 'dark';

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-[#0F172A]' : 'bg-white'}`}>
      <div className={`p-6 pt-10 flex flex-col items-center border-b ${isDark ? 'border-[#334155]' : 'border-gray-100'} relative`}>
        <button onClick={onBack} className="absolute left-6 top-10 p-2 text-gray-500">
          <ArrowLeft size={24} />
        </button>
        
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 relative">
          <UserIcon size={48} className="text-blue-600" />
          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white text-[10px] font-black px-2 py-1 rounded-full border-2 border-white">
            LVL {Math.floor((user?.points || 0) / 100) + 1}
          </div>
        </div>
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <span className="text-blue-500 text-sm font-bold">{user?.points} pts</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Preferências */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Preferências</h3>
          <div className="space-y-3">
            <button 
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between p-4 rounded-2xl ${isDark ? 'bg-[#1E293B]' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                {isDark ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-amber-500" />}
                <span className="text-sm font-medium">Modo Escuro</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isDark ? 'left-6' : 'left-1'}`} />
              </div>
            </button>

            <button 
              onClick={toggleReminders}
              className={`w-full flex items-center justify-between p-4 rounded-2xl ${isDark ? 'bg-[#1E293B]' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-purple-500" />
                <span className="text-sm font-medium">Lembretes Diários</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${user?.preferences.reminders ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${user?.preferences.reminders ? 'left-6' : 'left-1'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Segurança */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Segurança</h3>
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nova senha"
                className={`w-full pl-12 pr-10 py-4 ${isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-gray-50 border-gray-100'} border rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button 
              onClick={handleUpdatePassword}
              disabled={!newPassword}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                newPassword ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {showSuccess ? <Check size={20} /> : 'Alterar Senha'}
            </button>
          </div>
        </div>

        {/* Informações */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sobre o App</h3>
          <div className={`${isDark ? 'bg-[#1E293B]' : 'bg-gray-50'} rounded-2xl p-4 space-y-3`}>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-2"><Info size={14} /> Versão</span>
              <span className="font-mono">1.0.2</span>
            </div>
            <button onClick={() => setModalType('terms')} className="w-full flex justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-2"><Shield size={14} /> Termos de Uso</span>
              <span className="text-blue-600">Ler</span>
            </button>
            <button onClick={() => setModalType('privacy')} className="w-full flex justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-2"><Lock size={14} /> Privacidade</span>
              <span className="text-blue-600">Configurar</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 border-t ${isDark ? 'border-[#334155]' : 'border-gray-100'}`}>
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2"
        >
          <LogOut size={20} /> Sair da Conta
        </button>
      </div>

      {/* Modais de Info */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className={`${isDark ? 'bg-[#1E293B] text-white' : 'bg-white text-gray-900'} w-full max-w-sm rounded-[32px] p-6 shadow-2xl animate-in zoom-in-95`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">{modalType === 'terms' ? 'Termos de Uso' : 'Privacidade'}</h2>
              <button onClick={() => setModalType(null)} className="p-1"><X size={20} /></button>
            </div>
            <div className="text-xs text-gray-500 leading-relaxed max-h-60 overflow-y-auto space-y-3 pr-2">
              <p>O app <strong>Calma</strong> prioriza sua saúde mental e privacidade.</p>
              <p>Seus dados de conversa e humor são armazenados localmente para garantir sua segurança emocional.</p>
              <p>Utilizamos tecnologia de IA apenas para processamento de desabafos, sem compartilhamento com terceiros para fins publicitários.</p>
              <p>Ao usar o app, você concorda que este não substitui o atendimento psicológico profissional.</p>
            </div>
            <button 
              onClick={() => setModalType(null)}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-bold"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
