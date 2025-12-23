
import { User, Conversation, MoodEntry, Goal, Mission } from './types';

const USERS_KEY = 'calma_ai_users';
const CONVS_KEY = 'calma_ai_conversations';
const MOODS_KEY = 'calma_ai_moods';
const GOALS_KEY = 'calma_ai_goals';
const MISSIONS_KEY = 'calma_ai_missions';
const CURRENT_USER_KEY = 'calma_ai_current_user';

const DEFAULT_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Beber Água', description: 'Mantenha seu corpo hidratado.', points: 10, completed: false, category: 'water' },
  { id: 'm2', title: 'Respiração 4-7-8', description: 'Pratique 3 ciclos.', points: 15, completed: false, category: 'breath' },
  { id: 'm3', title: 'Pausa de 5min', description: 'Afaste-se das telas.', points: 10, completed: false, category: 'pause' },
  { id: 'm4', title: 'Agradecimento', description: 'Pense em algo bom hoje.', points: 20, completed: false, category: 'meditation' }
];

export const db = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),
  
  saveUser: (user: User) => {
    const users = db.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  updateUser: (updatedUser: User) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      db.setCurrentUser(updatedUser);
    }
  },

  findUserByEmail: (email: string) => {
    return db.getUsers().find(u => u.email === email);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // Missões
  getMissions: (userId: string): Mission[] => {
    const data = localStorage.getItem(`${MISSIONS_KEY}_${userId}`);
    return data ? JSON.parse(data) : DEFAULT_MISSIONS;
  },

  completeMission: (userId: string, missionId: string) => {
    const missions = db.getMissions(userId);
    const index = missions.findIndex(m => m.id === missionId);
    if (index !== -1 && !missions[index].completed) {
      missions[index].completed = true;
      localStorage.setItem(`${MISSIONS_KEY}_${userId}`, JSON.stringify(missions));
      
      const user = db.getCurrentUser();
      if (user) {
        user.points += missions[index].points;
        db.updateUser(user);
      }
    }
  },

  // Conversas
  getConversations: (userId: string): Conversation[] => {
    const convs: Conversation[] = JSON.parse(localStorage.getItem(CONVS_KEY) || '[]');
    return convs.filter(c => c.userId === userId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  saveConversation: (conv: Conversation) => {
    const convs = JSON.parse(localStorage.getItem(CONVS_KEY) || '[]');
    convs.push(conv);
    localStorage.setItem(CONVS_KEY, JSON.stringify(convs));
  },

  // Humor / Diário
  getMoods: (userId: string): MoodEntry[] => {
    const moods: MoodEntry[] = JSON.parse(localStorage.getItem(MOODS_KEY) || '[]');
    return moods.filter(m => m.userId === userId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  saveMood: (entry: MoodEntry) => {
    const moods = JSON.parse(localStorage.getItem(MOODS_KEY) || '[]');
    moods.push(entry);
    localStorage.setItem(MOODS_KEY, JSON.stringify(moods));
  },

  // Metas
  getGoals: (userId: string): Goal[] => {
    const goals: Goal[] = JSON.parse(localStorage.getItem(GOALS_KEY) || '[]');
    return goals.filter(g => g.userId === userId);
  },

  saveGoal: (goal: Goal) => {
    const goals = JSON.parse(localStorage.getItem(GOALS_KEY) || '[]');
    goals.push(goal);
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  },

  toggleGoal: (goalId: string) => {
    const goals: Goal[] = JSON.parse(localStorage.getItem(GOALS_KEY) || '[]');
    const index = goals.findIndex(g => g.id === goalId);
    if (index !== -1) {
      goals[index].completed = !goals[index].completed;
      localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
    }
  },

  updatePassword: (userId: string, newPass: string) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].password = newPass;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      db.setCurrentUser(users[index]);
    }
  }
};
