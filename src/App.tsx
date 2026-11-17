import { useEffect } from 'react';
import { Toaster } from 'sonner';

import AlertDialogWrapper from '@/components/AlertDialog/AlertDialogWrapper';
import { THEME_STORAGE_KEY } from '@/features/interview-app/lib/navigation';
import {
  syncAppLocation,
  useInterviewAppStore,
} from '@/features/interview-app/store/use-interview-app-store';
import { AppPages } from '@/pages';

function App() {
  const theme = useInterviewAppStore((state) => state.theme);

  useEffect(() => {
    syncAppLocation();
    window.addEventListener('popstate', syncAppLocation);
    window.addEventListener('hashchange', syncAppLocation);
    return () => {
      window.removeEventListener('popstate', syncAppLocation);
      window.removeEventListener('hashchange', syncAppLocation);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <AlertDialogWrapper>
      <Toaster theme={theme} position="top-right" />
      <AppPages />
    </AlertDialogWrapper>
  );
}

export default App;
