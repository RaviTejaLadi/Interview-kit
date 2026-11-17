import type { AuthUser } from '@/features/auth/types/auth';

export type AdminUser = AuthUser;

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
