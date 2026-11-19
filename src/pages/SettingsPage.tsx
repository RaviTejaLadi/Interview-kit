import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useMatch, useNavigate } from 'react-router';
import { ChevronDownIcon, ShieldIcon } from 'lucide-react';

import { SiteHeader } from '@/components/NewspaperMasthead';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { AppHeaderActions } from '@/features/interview-app/components/AppHeaderActions';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { readSettingsReturnPath } from '@/routes/paths';
import {
  settingsAdminRoutes,
  settingsMainRoutes,
  type SettingsRoute,
} from '@/routes/settings-routes';
import { cn } from '@/lib/utils';

function SettingsNavLink({
  item,
  to,
  compact = false,
}: {
  item: SettingsRoute;
  to: string;
  compact?: boolean;
}) {
  const location = useLocation();
  const Icon = item.icon;

  return (
    <NavLink
      to={to}
      end
      state={location.state}
      className={({ isActive }) =>
        cn(
          'flex min-w-44 items-center gap-3 rounded-[6px] px-3 text-left text-[13px] transition-colors md:min-w-0',
          compact ? 'py-2' : 'py-[7px]',
          isActive
            ? 'bg-accent font-medium text-accent-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )
      }
    >
      <Icon className="size-4 shrink-0" />
      <span className="min-w-0">
        <span className="block text-sm font-medium">{item.label}</span>
      </span>
    </NavLink>
  );
}

export function SettingsPage() {
  const user = useCurrentUser().data;
  const isAdmin = user?.role === 'admin';
  const theme = useInterviewAppStore((state) => state.theme);
  const setTheme = useInterviewAppStore((state) => state.setTheme);
  const location = useLocation();
  const navigate = useNavigate();
  const onAdminRoute = useMatch({ path: '/settings/admin', end: false });
  const [isAdminExpanded, setIsAdminExpanded] = useState(Boolean(onAdminRoute));

  useEffect(() => {
    if (onAdminRoute) {
      setIsAdminExpanded(true);
    }
  }, [onAdminRoute]);

  function leaveSettings() {
    navigate(readSettingsReturnPath(location.state));
  }

  return (
    <div className="theme flex h-svh flex-col bg-background">
      <SiteHeader
        onBrandClick={leaveSettings}
        actions={
          <AppHeaderActions
            theme={theme}
            onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          />
        }
      />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside className="shrink-0 border-b border-border bg-card md:w-64 md:border-r md:border-b-0">
          <div className="px-4 pt-4 pb-2 md:px-3 md:pt-5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Settings
            </p>
          </div>
          <nav aria-label="Settings" className="flex flex-col gap-1 px-2 pb-2">
            {settingsMainRoutes.map((item) => (
              <SettingsNavLink key={item.path} item={item} to={item.path} />
            ))}

            {isAdmin ? (
              <div>
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center gap-3 rounded-[6px] px-3 py-[7px] text-left text-[13px] transition-colors',
                    onAdminRoute
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                  onClick={() => setIsAdminExpanded((current) => !current)}
                >
                  <ShieldIcon className="size-4 shrink-0" />
                  <span className="flex-1 text-sm font-medium">Admin</span>
                  <ChevronDownIcon
                    className={cn(
                      'size-4 transition-transform',
                      isAdminExpanded ? 'rotate-180' : '',
                    )}
                  />
                </button>
                {isAdminExpanded ? (
                  <div className="mt-1 space-y-1 pl-4">
                    {settingsAdminRoutes.map((item) => (
                      <SettingsNavLink
                        key={item.path}
                        item={item}
                        to={`admin/${item.path}`}
                        compact
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </nav>
        </aside>
        <ScrollArea className="min-h-0 flex-1">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5 lg:max-w-4xl lg:px-6">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
