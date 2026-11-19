import { useState, type FormEvent } from 'react';
import { KeyRoundIcon, ShieldCheckIcon, MailIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AuthFormError } from '@/features/auth/components/AuthField';
import { AuthPasswordField } from '@/features/auth/components/AuthPasswordField';
import { useChangePassword } from '@/features/auth/hooks/use-change-password';
import { validateChangePassword } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';
import { useCurrentUser } from '../hooks/use-current-user';

export function SignInMethod() {
  const user = useCurrentUser().data;
  const changePassword = useChangePassword();

  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ReturnType<typeof validateChangePassword>>({});

  function resetForm() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    changePassword.reset();
  }

  function handleCancel() {
    resetForm();
    setIsEditing(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateChangePassword({ currentPassword, newPassword, confirmPassword });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      changePassword.reset();
      return;
    }

    changePassword.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          resetForm();
          setIsEditing(false);
        },
      },
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="flex items-center gap-2 text-sm text-foreground">
          <ShieldCheckIcon className="size-4 text-primary" />
          Sign-in method
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the email and password you use to sign in.
        </p>
      </div>

      {/* Summary row: email + toggle button */}
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-muted">
            <MailIcon className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-foreground">{user?.email ?? '—'}</p>
            <p className="text-xs text-muted-foreground">
              {user?.provider === 'local' ? 'Email & password' : `Signed in with ${user?.provider}`}
            </p>
          </div>
        </div>

        {isEditing ? (
          <Button type="button" size="sm" variant="ghost" onClick={handleCancel}>
            <XIcon className="size-4" />
            Cancel
          </Button>
        ) : (
          <Button type="button" size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <KeyRoundIcon className="size-4" />
            Change password
          </Button>
        )}
      </div>

      {/* Change password form */}
      {isEditing && (
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <AuthFormError
            message={
              changePassword.error
                ? getApiErrorMessage(
                    changePassword.error,
                    'Could not change your password. Try again.',
                  )
                : ''
            }
          />

          <AuthPasswordField
            label="Current password"
            name="currentPassword"
            required
            autoComplete="current-password"
            value={currentPassword}
            error={errors.currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <AuthPasswordField
              label="New password"
              name="newPassword"
              required
              autoComplete="new-password"
              value={newPassword}
              error={errors.newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <AuthPasswordField
              label="Confirm password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              value={confirmPassword}
              error={errors.confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <Button type="submit" size="sm" disabled={changePassword.isPending}>
            <KeyRoundIcon className="size-4" />
            {changePassword.isPending ? 'Updating…' : 'Update password'}
          </Button>
        </form>
      )}
    </div>
  );
}
