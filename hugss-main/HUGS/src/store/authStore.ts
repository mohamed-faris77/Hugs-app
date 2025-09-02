import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isAdmin: boolean;
  isUserLoggedIn: boolean;
  adminPassword: string;
  login: (password: string) => boolean;
  logout: () => void;
  userLogin: () => void;
  userLogout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAdmin: false,
      isUserLoggedIn: false,
      adminPassword: 'admin123', // In production, this should be properly hashed and stored securely
      login: (password: string) => {
        const isValid = password === 'admin123';
        if (isValid) {
          set({ isAdmin: true });
        }
        return isValid;
      },
      logout: () => set({ isAdmin: false }),
      userLogin: () => set({ isUserLoggedIn: true }),
      userLogout: () => set({ isUserLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);