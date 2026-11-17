import { useEffect } from 'react';
import { Toaster } from 'sonner';

import { AuthScreen } from '@/features/auth/components/auth-screen';
import { SettingsScreen } from '@/features/auth/components/settings-screen';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { hasStoredSession } from '@/features/auth/utils/session';
import { THEME_STORAGE_KEY } from '@/features/interview-app/lib/navigation';
import {
  syncAppLocation,
  useInterviewAppStore,
} from '@/features/interview-app/store/use-interview-app-store';
import { GuideScreen } from '@/features/interview-app/views/guide-screen';
import { HomeScreen } from '@/features/interview-app/views/home-screen';
import { KitReaderScreen } from '@/features/interview-app/views/kit-reader-screen';
import AlertDialogWrapper from '@/components/AlertDialog/AlertDialogWrapper';

function InterviewApp() {
  const settingsSection = useInterviewAppStore((state) => state.settingsSection);
  const selectedGuideId = useInterviewAppStore((state) => state.selectedGuideId);
  const selectedKitId = useInterviewAppStore((state) => state.selectedKitId);

  if (settingsSection) {
    return <SettingsScreen />;
  }

  if (selectedGuideId) {
    return <GuideScreen />;
  }

  if (!selectedKitId) {
    return <HomeScreen />;
  }

  return <KitReaderScreen />;
}

function App() {
  const currentUser = useCurrentUser();
  const theme = useInterviewAppStore((state) => state.theme);
  const hasSession = hasStoredSession();

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

  let screen = <InterviewApp />;
  if (hasSession && currentUser.isLoading) {
    screen = (
      <div className="theme grid min-h-svh place-items-center bg-background text-sm text-muted-foreground">
        Checking your session…
      </div>
    );
  } else if (!hasSession || !currentUser.data) {
    screen = <AuthScreen />;
  }

  return (
    <AlertDialogWrapper>
      <Toaster theme={theme} position="top-right" />
      {screen}
    </AlertDialogWrapper>
  );
}

export default App;
