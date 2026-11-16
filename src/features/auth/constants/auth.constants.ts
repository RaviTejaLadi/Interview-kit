export const ACCESS_TOKEN_KEY = 'interview-kit-access-token';
export const REFRESH_TOKEN_KEY = 'interview-kit-refresh-token';

export const authQueryKeys = {
  me: ['auth', 'me'] as const,
};

export const AUTH_FIELD_LIMITS = {
  nameMin: 3,
  nameMax: 60,
  userNameMin: 2,
  userNameMax: 60,
  passwordMin: 6,
  passwordMax: 100,
  bioMin: 2,
  bioMax: 250,
} as const;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^[6-9]\d{9}$/;
