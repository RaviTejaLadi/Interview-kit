import { create } from 'zustand';

type AuthState = {
  resetEmail: string;
  resetOtp: string;
  resetToken: string;
  beginReset: (email: string, otp?: string) => void;
  continueReset: (resetToken: string) => void;
  backToForgot: () => void;
  clearReset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  resetEmail: '',
  resetOtp: '',
  resetToken: '',
  beginReset: (email, otp = '') =>
    set({
      resetEmail: email,
      resetOtp: otp,
      resetToken: '',
    }),
  continueReset: (resetToken) =>
    set({
      resetToken,
      resetOtp: '',
    }),
  backToForgot: () =>
    set({
      resetOtp: '',
      resetToken: '',
    }),
  clearReset: () =>
    set({
      resetEmail: '',
      resetOtp: '',
      resetToken: '',
    }),
}));
