import { OAUTH_CALLBACK_PATH } from '@/features/auth/constants/auth.constants';

export const paths = {
  kits: '/kits',
  guides: '/guides',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  verifyOtp: '/verify-otp',
  resetPassword: '/reset-password',
  oauthCallback: OAUTH_CALLBACK_PATH,
  settings: {
    profile: '/settings/profile',
  },
} as const;

const authPathSet = new Set<string>([
  paths.login,
  paths.signup,
  paths.forgotPassword,
  paths.verifyOtp,
  paths.resetPassword,
]);

export function kitPath(kitId: string, topicId?: string) {
  const pathname = `/kits/${encodeURIComponent(kitId)}`;
  if (!topicId) {
    return pathname;
  }

  return `${pathname}?topic=${encodeURIComponent(topicId)}`;
}

export function guidePath(guideId: string) {
  return `/guides/${encodeURIComponent(guideId)}`;
}

export function isAuthPath(pathname: string) {
  return authPathSet.has(pathname);
}

export function readSettingsReturnPath(state: unknown) {
  if (!state || typeof state !== 'object' || !('from' in state)) {
    return paths.kits;
  }

  const from = (state as { from?: unknown }).from;
  if (typeof from !== 'string' || !from.startsWith('/') || from.startsWith('/settings')) {
    return paths.kits;
  }

  return from;
}
