import { useState } from 'react';

import { SiteHeader } from '@/components/newspaper-masthead';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChangePasswordForm } from '@/features/auth/components/change-password-form';
import { EditProfileForm } from '@/features/auth/components/edit-profile-form';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import type { AuthUser } from '@/features/auth/types/auth';
import { AppHeaderActions } from '@/features/interview-app/components/app-header-actions';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';

function formatProfileDate(value: string) {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const date = new Date(dateOnly);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function initials(user: AuthUser) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}

function signInMethods(user: AuthUser) {
  const methods: string[] = [];
  if (user.provider === 'local') {
    methods.push('Email and password');
  }
  if (user.google) {
    methods.push('Google');
  }
  if (user.github) {
    methods.push('GitHub');
  }
  if (methods.length === 0) {
    methods.push('Email and password');
  }
  return methods.join(', ');
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function ProfileScreen() {
  const user = useCurrentUser().data;
  const theme = useInterviewAppStore((state) => state.theme);
  const setTheme = useInterviewAppStore((state) => state.setTheme);
  const setIsProfileOpen = useInterviewAppStore((state) => state.setIsProfileOpen);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="theme flex h-svh flex-col bg-background">
      <SiteHeader
        onBrandClick={() => setIsProfileOpen(false)}
        actions={
          <AppHeaderActions
            theme={theme}
            onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          />
        }
      />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 overflow-y-auto px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar size="lg" className="size-14">
              {user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
              <AvatarFallback className="bg-primary/15 text-base font-semibold text-primary">
                {initials(user)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="truncate text-2xl text-foreground">
                {user.firstName} {user.lastName}
              </h1>
              <p className="truncate text-sm text-muted-foreground">@{user.userName}</p>
            </div>
          </div>
          {isEditing ? null : (
            <Button type="button" variant="outline" size="lg" onClick={() => setIsEditing(true)}>
              Edit profile
            </Button>
          )}
        </div>
        <Card>
          <CardContent className="px-5 py-2 sm:px-6">
            {isEditing ? (
              <EditProfileForm
                key={user.updatedAt}
                user={user}
                onCancel={() => setIsEditing(false)}
                onSaved={() => setIsEditing(false)}
              />
            ) : (
              <dl>
                <ProfileRow label="Email" value={user.email} />
                <ProfileRow label="Phone" value={user.phoneNumber || 'Not set'} />
                <ProfileRow label="Date of birth" value={user.dob ? formatProfileDate(user.dob) : 'Not set'} />
                <ProfileRow label="Bio" value={user.bio?.trim() || 'No bio yet'} />
                <ProfileRow label="Sign-in" value={signInMethods(user)} />
                <ProfileRow label="Role" value={user.role} />
                <ProfileRow label="Member since" value={formatProfileDate(user.createdAt)} />
              </dl>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-5 py-6 sm:px-6">
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
