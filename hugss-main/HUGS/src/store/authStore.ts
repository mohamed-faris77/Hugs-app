import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isAdmin: boolean;
  adminPassword: string;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAdmin: false,
      adminPassword: 'admin123', // In production, this should be properly hashed and stored securely
      login: (password: string) => {
        const isValid = password === 'admin123';
        if (isValid) {
          set({ isAdmin: true });
        }
        return isValid;
      },
      logout: () => set({ isAdmin: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);