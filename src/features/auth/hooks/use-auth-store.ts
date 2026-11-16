import { create } from 'zustand';

import type { AuthScreen } from '@/features/auth/types/auth';

type AuthState = {
  screen: AuthScreen;
  setScreen: (screen: AuthScreen) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  screen: 'login',
  setScreen: (screen) => set({ screen }),
}));
