import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface AuthStore {
  isAdmin: boolean;
  isUserLoggedIn: boolean;
  isDoctor: boolean;
  doctorUsername: string | null;
  adminPassword: string;
  login: (password: string) => boolean;
  logout: () => void;
  userLogin: () => void;
  userLogout: () => void;
  doctorLogin: (username: string) => void;
  doctorLogout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAdmin: false,
      isUserLoggedIn: false,
      isDoctor: false,
      doctorUsername: null,
      adminPassword: 'admin123', // In production, this should be properly hashed and stored securely
      login: (password: string) => {
        const isValid = password === 'admin123';
        if (isValid) {
          set({ isAdmin: true });
        }
        return isValid;
      },
      logout: () => set({ isAdmin: false, isDoctor: false, doctorUsername: null }),
      userLogin: () => set({ isUserLoggedIn: true }),
      userLogout: () => set({ isUserLoggedIn: false }),
      doctorLogin: (username: string) => set({ isDoctor: true, doctorUsername: username }),
      doctorLogout: () => set({ isDoctor: false, doctorUsername: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);