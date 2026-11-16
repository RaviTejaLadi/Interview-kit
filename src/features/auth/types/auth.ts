export type AuthProviderName = 'local' | 'google' | 'github';

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  dob: string | null;
  bio: string | null;
  avatar: string | null;
  provider: AuthProviderName;
  google: boolean;
  github: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: string;
  bio?: string;
};

export type UpdateProfileInput = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  phoneNumber?: string;
  dob?: string;
  bio?: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export type VerifyOtpInput = {
  email: string;
  otp: string;
};

export type ResetPasswordInput = {
  email: string;
  resetToken: string;
  newPassword: string;
};

export type OAuthProviders = {
  google: boolean;
  github: boolean;
  googleUrl: string;
  githubUrl: string;
};

export type AuthScreen = 'login' | 'signup' | 'forgot' | 'verify-otp' | 'reset-password';
