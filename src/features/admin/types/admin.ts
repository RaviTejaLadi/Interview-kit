import type { AuthUser, RegisterInput } from '@/features/auth/types/auth';

export type AdminUser = AuthUser;

export type AdminCreateInput = RegisterInput;

export type AdminRole = 'user' | 'admin';

export type AdminUpdateUserInput = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  phoneNumber?: string;
  dob?: string;
  bio?: string;
  role?: AdminRole;
};

export type AdminFeedback = {
  id: string;
  user: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};
