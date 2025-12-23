
import React, { useState } from 'react';
import { AppScreen, User } from '../types';
import { db } from '../store';
import { ArrowLeft, UserPlus, Eye, EyeOff } from 'lucide-react';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  onRegisterSuccess: (user: User) => void;
}

const Register: React.FC<Props> = ({ onNavigate, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (db.findUserByEmail(email)) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      points: 0,
      preferences: {
        theme: 'light',
        reminders: true
      }
    };

    db.saveUser(newUser);
    db.setCurrentUser(newUser);
    onRegisterSuccess(newUser);
  };

  return (
    <div className="flex flex-col flex-1 p-6 bg-white">
      <button 
        onClick={() => onNavigate('LOGIN')}
        className="mb-8 p-2 text-gray-400 hover:text-blue-600 transition-colors w-fit"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Cadastro</h1>
        <p className="text-gray-500 mt-2">Crie sua conta para começar.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4 flex-1">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="Como podemos te chamar?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="exemplo@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Crie uma senha segura"
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
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <UserPlus size={20} /> Criar Conta
        </button>
      </form>
    </div>
  );
};

export default Register;
