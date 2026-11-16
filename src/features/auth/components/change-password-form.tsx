import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { useChangePassword } from '@/features/auth/hooks/use-change-password';
import { validateChangePassword } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

export function ChangePasswordForm() {
  const changePassword = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ReturnType<typeof validateChangePassword>>({});

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
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setErrors({});
        },
      },
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h2 className="text-lg text-foreground">Change password</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Google and GitHub accounts that have never set a password can create one from Forgot password on the
          sign-in screen.
        </p>
      </div>
      <AuthFormError
        message={
          changePassword.error
            ? getApiErrorMessage(changePassword.error, 'Could not change your password. Try again.')
            : ''
        }
      />
      <AuthField
        label="Current password"
        name="currentPassword"
        type="password"
        autoComplete="current-password"
        value={currentPassword}
        error={errors.currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="New password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          value={newPassword}
          error={errors.newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <AuthField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          error={errors.confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      <Button type="submit" size="lg" disabled={changePassword.isPending}>
        {changePassword.isPending ? 'Updating…' : 'Update password'}
      </Button>
    </form>
  );
}
