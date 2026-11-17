import type { SettingsSection } from '@/features/interview-app/lib/navigation';
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
    feedback: '/settings/feedback',
    adminUsers: '/settings/admin/users',
    adminFeedback: '/settings/admin/feedback',
    adminCreate: '/settings/admin/create',
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

export function settingsPath(section: SettingsSection) {
  switch (section) {
    case 'profile':
      return paths.settings.profile;
    case 'feedback':
      return paths.settings.feedback;
    case 'admin-users':
      return paths.settings.adminUsers;
    case 'admin-feedback':
      return paths.settings.adminFeedback;
    case 'admin-create':
      return paths.settings.adminCreate;
  }
}

export function parseSettingsPathname(pathname: string): {
  section: SettingsSection;
  canonical: string;
} | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (!path.toLowerCase().startsWith('/settings')) {
    return null;
  }

  const rest = path.slice('/settings'.length).replace(/^\//, '').toLowerCase();

  if (rest === '' || rest === 'profile') {
    return { section: 'profile', canonical: paths.settings.profile };
  }

  if (rest === 'feedback') {
    return { section: 'feedback', canonical: paths.settings.feedback };
  }

  if (rest === 'admin' || rest === 'admin/users') {
    return { section: 'admin-users', canonical: paths.settings.adminUsers };
  }

  if (rest === 'admin/feedback' || rest === 'admin-feedback') {
    return { section: 'admin-feedback', canonical: paths.settings.adminFeedback };
  }

  if (rest === 'admin/create' || rest === 'admin/create-admin') {
    return { section: 'admin-create', canonical: paths.settings.adminCreate };
  }

  return null;
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
