import type { TopicGroup } from '@/lib/content-index';

export type Theme = 'light' | 'dark';
export type HomeView = 'kits' | 'guides';

export const THEME_STORAGE_KEY = 'interview-kit-theme';

function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

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

  const basePath = normalizePathname(window.location.pathname).replace(/\/(kits|guides)$/i, '');
  const base = basePath === '' ? '/' : basePath;
  return base === '/' ? `/${view}` : `${base}/${view}`;
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
