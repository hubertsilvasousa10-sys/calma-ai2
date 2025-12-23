
import React, { useState, useEffect } from 'react';
import { AppScreen, User } from './types';
import { db } from './store';

// Screens
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChatRoom from './components/ChatRoom';
import TechniquesList from './components/TechniquesList';
import BreathingGuide from './components/BreathingGuide';
import History from './components/History';
import Profile from './components/Profile';
import Diary from './components/Diary';
import Statistics from './components/Statistics';
import Goals from './components/Goals';
import MissionsList from './components/MissionsList';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('LOGIN');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedUser = db.getCurrentUser();
    if (loggedUser) {
      setUser(loggedUser);
      setScreen('DASHBOARD');
    }
  }, []);

  // Sincroniza estado do usuário globalmente quando o DB muda localmente
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        const u = db.getCurrentUser();
        if (JSON.stringify(u) !== JSON.stringify(user)) {
          setUser(u);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleLogout = () => {
    db.setCurrentUser(null);
    setUser(null);
    setScreen('LOGIN');
  };

  const renderScreen = () => {
    const isDark = user?.preferences.theme === 'dark';
    const bgClass = isDark ? 'bg-[#0F172A]' : 'bg-white';

    switch (screen) {
      case 'LOGIN':
        return <Login 
          onNavigate={(s) => setScreen(s)} 
          onLoginSuccess={(u) => { setUser(u); setScreen('DASHBOARD'); }} 
        />;
      case 'REGISTER':
        return <Register 
          onNavigate={(s) => setScreen(s)} 
          onRegisterSuccess={(u) => { setUser(u); setScreen('DASHBOARD'); }} 
        />;
      case 'DASHBOARD':
        return <Dashboard user={user} onNavigate={(s) => setScreen(s)} />;
      case 'CHAT':
        return <ChatRoom user={user} onBack={() => setScreen('DASHBOARD')} />;
      case 'ROUTINES':
        return <TechniquesList onBack={() => setScreen('DASHBOARD')} />;
      case 'BREATHING':
        return <BreathingGuide onBack={() => setScreen('DASHBOARD')} />;
      case 'HISTORY':
        return <History user={user} onBack={() => setScreen('DASHBOARD')} onOpenChat={() => setScreen('CHAT')} />;
      case 'PROFILE':
        return <Profile user={user} onBack={() => setScreen('DASHBOARD')} onLogout={handleLogout} />;
      case 'DIARY':
        return <Diary user={user} onBack={() => setScreen('DASHBOARD')} />;
      case 'STATISTICS':
        return <Statistics user={user} onBack={() => setScreen('DASHBOARD')} />;
      case 'GOALS':
        return <Goals user={user} onBack={() => setScreen('DASHBOARD')} />;
      case 'MISSIONS_LIST':
        return <MissionsList user={user} onBack={() => setScreen('DASHBOARD')} />;
      default:
        return <Dashboard user={user} onNavigate={(s) => setScreen(s)} />;
    }
  };

  const isDark = user?.preferences.theme === 'dark';

  return (
    <div className={`app-container shadow-2xl relative overflow-hidden transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <div className={`${isDark ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-900'} h-full w-full flex flex-col`}>
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
