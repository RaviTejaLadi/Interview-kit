import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

import AlertDialogWrapper from '@/components/AlertDialog/AlertDialogWrapper';
import { THEME_STORAGE_KEY } from '@/features/interview-app/lib/navigation';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';

export function RootLayout() {
  const theme = useInterviewAppStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <AlertDialogWrapper>
      <Toaster theme={theme} position="top-right" />
      <Outlet />
    </AlertDialogWrapper>
  );
}
