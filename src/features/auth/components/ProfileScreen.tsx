import { useState } from 'react';
import { PencilLineIcon, UserCircle2Icon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EditProfileForm } from '@/features/auth/components/EditProfileForm';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import type { AuthUser } from '@/features/auth/types/auth';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

export function ProfileSettingsPanel() {
  const user = useCurrentUser().data;
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar size="sm" className="size-14">
            {user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
            <AvatarFallback className="bg-primary/15 text-base font-semibold text-primary">
              {initials(user)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-2xl text-foreground">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-sm text-muted-foreground">@{user.userName}</p>
          </div>
        </div>
        {isEditing ? null : (
          <Tooltip>
            <TooltipTrigger>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => setIsEditing(true)}
              >
                <PencilLineIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center" alignOffset={10}>
              <p className="text-sm bg-black text-white">Edit profile</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <Card>
        <CardContent className="px-5 py-2 sm:px-6">
          <h2 className="flex items-center gap-2 py-4 text-sm font-medium text-foreground">
            <UserCircle2Icon className="size-4 text-primary" />
            Account details
          </h2>
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
              <ProfileRow
                label="Date of birth"
                value={user.dob ? formatProfileDate(user.dob) : 'Not set'}
              />
              <ProfileRow label="Bio" value={user.bio?.trim() || 'No bio yet'} />
              <ProfileRow label="Sign-in" value={signInMethods(user)} />
              <ProfileRow label="Role" value={user.role} />
              <ProfileRow label="Member since" value={formatProfileDate(user.createdAt)} />
            </dl>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
