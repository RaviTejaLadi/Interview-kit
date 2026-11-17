import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { hasStoredSession } from '@/features/auth/utils/session';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { AuthPage } from '@/pages/auth-page';
import { GuidePage } from '@/pages/guide-page';
import { HomePage } from '@/pages/home-page';
import { KitReaderPage } from '@/pages/kit-reader-page';
import { SettingsPage } from '@/pages/settings-page';

function InterviewPages() {
  const settingsSection = useInterviewAppStore((state) => state.settingsSection);
  const selectedGuideId = useInterviewAppStore((state) => state.selectedGuideId);
  const selectedKitId = useInterviewAppStore((state) => state.selectedKitId);

  if (settingsSection) {
    return <SettingsPage />;
  }

  if (selectedGuideId) {
    return <GuidePage />;
  }

  if (!selectedKitId) {
    return <HomePage />;
  }

  return <KitReaderPage />;
}

export function AppPages() {
  const currentUser = useCurrentUser();
  const hasSession = hasStoredSession();

  if (hasSession && currentUser.isLoading) {
    return (
      <div className="theme grid min-h-svh place-items-center bg-background text-sm text-muted-foreground">
        Checking your session…
      </div>
    );
  }

  if (!hasSession || !currentUser.data) {
    return <AuthPage />;
  }

  return <InterviewPages />;
}
