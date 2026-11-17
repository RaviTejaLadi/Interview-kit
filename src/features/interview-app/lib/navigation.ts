export type Theme = 'light' | 'dark';
export type HomeView = 'kits' | 'guides';
export type SettingsSection =
  'profile' | 'feedback' | 'admin-users' | 'admin-feedback' | 'admin-create';

export const THEME_STORAGE_KEY = 'interview-kit-theme';

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
