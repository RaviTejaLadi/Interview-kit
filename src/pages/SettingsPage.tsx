import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDownIcon,
  MessageSquareTextIcon,
  ShieldIcon,
  UserCircle2Icon,
  UserPlusIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';

import { SiteHeader } from '@/components/NewspaperMasthead';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AdminPanel } from '@/features/admin/components/AdminPanel';
import { ProfileSettingsPanel } from '@/features/auth/components/ProfileScreen';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { FeedbackPanel } from '@/features/feedback/components/FeedbackPanel';
import { AppHeaderActions } from '@/features/interview-app/components/AppHeaderActions';
import {
  getSettingsPath,
  leaveSettingsRoute,
  openSettingsRoute,
  type SettingsSection,
} from '@/features/interview-app/lib/navigation';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { cn } from '@/lib/utils';

type SettingsNavItem = {
  id: SettingsSection;
  label: string;
  description: string;
  icon: LucideIcon;
};

const profileNavItem: SettingsNavItem = {
  id: 'profile',
  label: 'Profile',
  description: 'Name, contact, and security',
  icon: UserCircle2Icon,
};

const feedbackNavItem: SettingsNavItem = {
  id: 'feedback',
  label: 'Feedback',
  description: 'Share feedback and manage your submissions',
  icon: MessageSquareTextIcon,
};

const adminNavItems: SettingsNavItem[] = [
  {
    id: 'admin-users',
    label: 'Users',
    description: 'List, view, edit, and delete users',
    icon: UsersIcon,
  },
  {
    id: 'admin-feedback',
    label: 'Feedback',
    description: 'List, view, and delete any feedback',
    icon: MessageSquareTextIcon,
  },
  {
    id: 'admin-create',
    label: 'Create admin',
    description: 'Create a new admin account',
    icon: UserPlusIcon,
  },
];

function isAdminSection(section: SettingsSection) {
  return section === 'admin-users' || section === 'admin-feedback' || section === 'admin-create';
}

export function SettingsPage() {
  const user = useCurrentUser().data;
  const isAdmin = user?.role === 'admin';
  const theme = useInterviewAppStore((state) => state.theme);
  const setTheme = useInterviewAppStore((state) => state.setTheme);
  const homeView = useInterviewAppStore((state) => state.homeView);
  const section = useInterviewAppStore((state) => state.settingsSection) ?? 'profile';
  const setSettingsSection = useInterviewAppStore((state) => state.setSettingsSection);
  const [isAdminExpanded, setIsAdminExpanded] = useState(() => isAdminSection(section));

  // Single unified list of nav items, built dynamically based on role.
  const navItems = useMemo<SettingsNavItem[]>(() => {
    return [profileNavItem, feedbackNavItem, ...(isAdmin ? adminNavItems : [])];
  }, [isAdmin]);

  const activeItem = useMemo(() => {
    return navItems.find((item) => item.id === section) ?? profileNavItem;
  }, [navItems, section]);

  useEffect(() => {
    if (isAdminSection(section)) {
      setIsAdminExpanded(true);
    }
  }, [section]);

  useEffect(() => {
    if (isAdmin || !isAdminSection(section)) {
      return;
    }

    window.history.replaceState(window.history.state, '', getSettingsPath('profile'));
    setSettingsSection('profile');
  }, [isAdmin, section, setSettingsSection]);

  function leaveSettings() {
    const waitedForHistory = leaveSettingsRoute(homeView);
    if (!waitedForHistory) {
      setSettingsSection(null);
    }
  }

  function selectSection(next: SettingsSection) {
    if (next === section) {
      return;
    }

    openSettingsRoute(next);
    setSettingsSection(next);
  }

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, next: SettingsSection) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    selectSection(next);
  }

  const nonAdminItems = navItems.filter((item) => !isAdminSection(item.id));
  const adminItems = navItems.filter((item) => isAdminSection(item.id));

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
            {nonAdminItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === section;

              return (
                <a
                  key={item.id}
                  href={getSettingsPath(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex min-w-44 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors md:min-w-0',
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted',
                  )}
                  onClick={(event) => handleNavClick(event, item.id)}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{item.label}</span>
                  </span>
                </a>
              );
            })}

            {adminItems.length > 0 ? (
              <div>
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    isAdminSection(section)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted',
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
                    {adminItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.id === section;

                      return (
                        <a
                          key={item.id}
                          href={getSettingsPath(item.id)}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'flex min-w-44 items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors md:min-w-0',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-muted',
                          )}
                          onClick={(event) => handleNavClick(event, item.id)}
                        >
                          <Icon className="size-4 shrink-0" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium">{item.label}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
          </nav>
        </aside>
        <ScrollArea className="min-h-0 flex-1">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:max-w-4xl lg:px-8">
            <div>
              <h1 className="text-2xl text-foreground">{activeItem.label}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{activeItem.description}</p>
            </div>
            {activeItem.id === 'profile' ? <ProfileSettingsPanel /> : null}
            {activeItem.id === 'feedback' ? <FeedbackPanel /> : null}
            {isAdminSection(activeItem.id) && isAdmin ? (
              <AdminPanel section={activeItem.id} />
            ) : null}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
