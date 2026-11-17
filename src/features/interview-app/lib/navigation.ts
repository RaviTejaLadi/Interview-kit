import type { TopicGroup } from '@/lib/content-index';

export type Theme = 'light' | 'dark';
export type HomeView = 'kits' | 'guides';
export type SettingsSection =
  'profile' | 'feedback' | 'admin-users' | 'admin-feedback' | 'admin-create';

export const THEME_STORAGE_KEY = 'interview-kit-theme';

function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

function getAppBasePath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  const basePath = normalizePathname(window.location.pathname).replace(
    /\/(?:kits|guides|settings(?:\/.*)?)$/i,
    '',
  );
  return basePath === '' ? '/' : basePath;
}

const settingsPathBySection: Record<SettingsSection, string> = {
  profile: '/settings/profile',
  feedback: '/settings/feedback',
  'admin-users': '/settings/admin/users',
  'admin-feedback': '/settings/admin/feedback',
  'admin-create': '/settings/admin/create',
};

export function getHomeViewFromLocation(): HomeView {
  if (typeof window === 'undefined') {
    return 'kits';
  }

  return /\/guides$/i.test(normalizePathname(window.location.pathname)) ? 'guides' : 'kits';
}

export function getHomePathForView(view: HomeView) {
  if (typeof window === 'undefined') {
    return view === 'guides' ? '/guides' : '/kits';
  }

  const base = getAppBasePath();
  return base === '/' ? `/${view}` : `${base}/${view}`;
}

export function getSettingsPath(section: SettingsSection = 'profile') {
  if (typeof window === 'undefined') {
    return settingsPathBySection[section];
  }

  const base = getAppBasePath();
  const suffix = settingsPathBySection[section];
  return base === '/' ? suffix : `${base}${suffix}`;
}

export function getSettingsSectionFromLocation(): SettingsSection | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const path = normalizePathname(window.location.pathname);
  const match = path.match(/\/settings(?:\/(.*))?$/i);
  if (!match) {
    return null;
  }

  const section = match[1]?.toLowerCase();
  if (!section || section === 'profile') {
    return 'profile';
  }

  if (section === 'feedback') {
    return 'feedback';
  }

  if (section === 'admin' || section === 'admin/users') {
    return 'admin-users';
  }

  if (section === 'admin/feedback' || section === 'admin-feedback') {
    return 'admin-feedback';
  }

  if (section === 'admin/create' || section === 'admin/create-admin') {
    return 'admin-create';
  }

  return null;
}

export function openSettingsRoute(section: SettingsSection = 'profile') {
  const path = getSettingsPath(section);
  if (normalizePathname(window.location.pathname) === path) {
    return;
  }

  window.history.pushState({ settings: true }, '', path);
}

export function leaveSettingsRoute(fallbackView: HomeView = 'kits') {
  const state = window.history.state as { settings?: boolean } | null;
  if (state?.settings) {
    window.history.back();
    return true;
  }

  const target = getHomePathForView(fallbackView);
  if (normalizePathname(window.location.pathname) !== target || window.location.hash) {
    window.history.pushState({}, '', target);
  }

  return false;
}

export function canonicalizeSettingsRoute() {
  const section = getSettingsSectionFromLocation();
  if (!section) {
    return null;
  }

  const path = getSettingsPath(section);
  if (normalizePathname(window.location.pathname) !== path) {
    window.history.replaceState(window.history.state, '', path);
  }

  return section;
}

export function getKitIdFromHash(groups: TopicGroup[]) {
  if (typeof window === 'undefined') {
    return null;
  }

  const kitId = decodeURIComponent(window.location.hash.replace(/^#/, '')).trim();
  return groups.some((group) => group.id === kitId) ? kitId : null;
}

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
