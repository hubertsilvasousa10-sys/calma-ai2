
import React, { useState } from 'react';
import { AppScreen, User } from '../types';
import { db } from '../store';
import { LogIn, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  onLoginSuccess: (user: User) => void;
}

const Login: React.FC<Props> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const found = db.findUserByEmail(email);
    if (found && found.password === password) {
      db.setCurrentUser(found);
      onLoginSuccess(found);
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Insira seu e-mail para recuperar a senha.');
      return;
    }
    setRecoverySent(true);
    setTimeout(() => {
      setIsRecovering(false);
      setRecoverySent(false);
      setError('');
    }, 3000);
  };

  if (isRecovering) {
    return (
      <div className="flex flex-col flex-1 p-8 justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Recuperar Senha</h2>
        <p className="text-gray-500 text-center mb-8">Enviaremos as instruções para o seu e-mail.</p>
        
        {recoverySent ? (
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-center border border-emerald-100">
            Link de recuperação enviado com sucesso!
          </div>
        ) : (
          <form onSubmit={handleRecovery} className="space-y-4">
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Seu e-mail cadastrado"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100">
              Enviar Link
            </button>
            <button type="button" onClick={() => setIsRecovering(false)} className="w-full py-2 text-gray-400 text-sm font-medium">
              Voltar para o Login
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-6 justify-center bg-white">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 bg-[#1E88FE] rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-xl shadow-blue-200">
          <span className="text-white text-3xl font-bold">CA</span>
        </div>
        <h1 className="text-3xl font-bold text-[#0E0E0E]">Calma AI</h1>
        <p className="text-gray-500 mt-2">Seu refúgio para paz mental.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="nome@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Senha</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-[#1E88FE] text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <LogIn size={20} /> Entrar
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <button 
          onClick={() => onNavigate('REGISTER')}
          className="text-[#1E88FE] font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
        >
          <UserPlus size={18} /> Criar nova conta
        </button>
        <button 
          onClick={() => setIsRecovering(true)}
          className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
        >
          Esqueceu a senha? Clique aqui para recuperar.
        </button>
      </div>
    </div>
  );
};

export default Login;
