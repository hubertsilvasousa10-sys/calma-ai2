
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  points: number;
  preferences: {
    theme: 'light' | 'dark';
    reminders: boolean;
  };
}

export type MoodType = 'happy' | 'anxious' | 'sad' | 'neutral' | 'angry';

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  note: string;
  timestamp: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  timestamp: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'water' | 'breath' | 'pause' | 'meditation';
}

export interface Conversation {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: string;
}

export type AppScreen = 
  | 'LOGIN' 
  | 'REGISTER' 
  | 'DASHBOARD' 
  | 'CHAT' 
  | 'ROUTINES' 
  | 'BREATHING' 
  | 'HISTORY' 
  | 'PROFILE'
  | 'DIARY'
  | 'STATISTICS'
  | 'GOALS'
  | 'MISSIONS_LIST';

export interface Technique {
  id: string;
  title: string;
  description: string;
  category: 'Anxiety' | 'Focus' | 'Sleep' | 'Relaxation';
  steps: string[];
}
