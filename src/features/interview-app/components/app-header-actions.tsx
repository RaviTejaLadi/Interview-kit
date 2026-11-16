import { useEffect, useState } from 'react';
import { LogOutIcon, Maximize2Icon, Minimize2Icon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FullscreenButton, ThemeToggle } from '@/components/topic-navigator';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useLogout } from '@/features/auth/hooks/use-logout';
import type { AuthUser } from '@/features/auth/types/auth';
import type { Theme } from '@/features/interview-app/lib/navigation';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { cn } from '@/lib/utils';

type AppHeaderActionsProps = {
  theme: Theme;
  onToggleTheme: () => void;
  showGuestFullscreen?: boolean;
};

const accountMenuItemClassName =
  'h-auto cursor-pointer gap-3 rounded-lg px-2.5 py-2.5 text-sm font-normal text-popover-foreground focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg]:size-[18px] [&_svg]:text-muted-foreground';

function initials(user: AuthUser) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}

function AccountAvatar({ user, className }: { user: AuthUser; className?: string }) {
  return (
    <Avatar className={cn('size-9 after:border-border', className)}>
      {user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
      <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
        {initials(user)}
      </AvatarFallback>
    </Avatar>
  );
}

export function AppHeaderActions({ theme, onToggleTheme, showGuestFullscreen = true }: AppHeaderActionsProps) {
  const user = useCurrentUser().data;
  const logout = useLogout();
  const setIsProfileOpen = useInterviewAppStore((state) => state.setIsProfileOpen);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    onChange();
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen can be blocked by the browser or unsupported on some devices.
    }
  }

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Account menu"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <AccountAvatar user={user} className="size-8 ring-2 ring-primary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="!w-[228px] !min-w-[228px] overflow-hidden !rounded-[14px] border-border bg-popover p-0 text-popover-foreground shadow-lg"
          >
            <div className="flex items-center gap-3 px-3.5 py-3">
              <AccountAvatar user={user} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight text-popover-foreground">
                  {user.firstName} {user.lastName}
                </p>
                <p className="mt-0.5 text-xs leading-snug break-all text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator className="mx-0 my-0 bg-border" />
            <div className="p-1.5">
              <DropdownMenuItem
                className={accountMenuItemClassName}
                onClick={() => setIsProfileOpen(true)}
              >
                <SettingsIcon strokeWidth={1.75} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className={accountMenuItemClassName} onClick={() => void toggleFullscreen()}>
                {isFullscreen ? (
                  <Minimize2Icon strokeWidth={1.75} />
                ) : (
                  <Maximize2Icon strokeWidth={1.75} />
                )}
                {isFullscreen ? 'Exit full screen' : 'Enter full screen'}
              </DropdownMenuItem>
              <DropdownMenuItem className={accountMenuItemClassName} onClick={onToggleTheme}>
                {theme === 'dark' ? <SunIcon strokeWidth={1.75} /> : <MoonIcon strokeWidth={1.75} />}
                Switch to {theme === 'dark' ? 'light' : 'dark'} mode
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="mx-0 my-0 bg-border" />
            <div className="p-1.5">
              <DropdownMenuItem
                className={accountMenuItemClassName}
                disabled={logout.isPending}
                onClick={() => logout.mutate()}
              >
                <LogOutIcon strokeWidth={1.75} />
                Logout
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {showGuestFullscreen ? <FullscreenButton /> : null}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </>
      )}
    </>
  );
}
