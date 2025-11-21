import { create } from 'zustand';
import authService from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  
  login: async (email, password) => {
    const user = await authService.login({ email, password });
    set({ user, isAuthenticated: true });
  },
  
  register: async (name, email, password) => {
    const user = await authService.register({ name, email, password });
    set({ user, isAuthenticated: true });
  },
  
  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },
  
  restoreSession: async () => {
    set({ loading: true });
    
    // Solo intentar restaurar si hay un token CSRF guardado
    const csrfToken = localStorage.getItem('csrfToken');
    if (!csrfToken) {
      set({ user: null, isAuthenticated: false, loading: false });
      return;
    }
    
    try {
      const user = await authService.restoreLogin();
      if (user) {
        set({ user, isAuthenticated: true, loading: false });
      } else {
        set({ user: null, isAuthenticated: false, loading: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));
