import { FullscreenButton, ThemeToggle } from '@/components/topic-navigator';
import type { Theme } from '@/features/interview-app/lib/navigation';

type AppHeaderActionsProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function AppHeaderActions({ theme, onToggleTheme }: AppHeaderActionsProps) {
  return (
    <>
      <FullscreenButton />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </>
  );
}
