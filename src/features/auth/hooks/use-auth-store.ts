import { create } from 'zustand';

import type { AuthScreen } from '@/features/auth/types/auth';

type AuthState = {
  screen: AuthScreen;
  resetEmail: string;
  resetOtp: string;
  resetToken: string;
  setScreen: (screen: AuthScreen) => void;
  beginReset: (email: string, otp?: string) => void;
  continueReset: (resetToken: string) => void;
  backToForgot: () => void;
  clearReset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  screen: 'login',
  resetEmail: '',
  resetOtp: '',
  resetToken: '',
  setScreen: (screen) => set({ screen }),
  beginReset: (email, otp = '') =>
    set({
      screen: 'verify-otp',
      resetEmail: email,
      resetOtp: otp,
      resetToken: '',
    }),
  continueReset: (resetToken) =>
    set({
      screen: 'reset-password',
      resetToken,
      resetOtp: '',
    }),
  backToForgot: () =>
    set({
      screen: 'forgot',
      resetOtp: '',
      resetToken: '',
    }),
  clearReset: () =>
    set({
      screen: 'login',
      resetEmail: '',
      resetOtp: '',
      resetToken: '',
    }),
}));
