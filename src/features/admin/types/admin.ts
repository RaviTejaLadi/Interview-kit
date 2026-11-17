import type { AuthUser, RegisterInput } from '@/features/auth/types/auth';
import type { FeedbackItem, FeedbackStatus } from '@/features/feedback/types/feedback';

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

export type { FeedbackStatus };

export type AdminFeedback = FeedbackItem;

export type AdminUpdateFeedbackInput = {
  status: FeedbackStatus;
};
