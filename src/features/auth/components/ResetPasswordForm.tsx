import { useEffect, useState, type FormEvent } from 'react';
import { KeyRoundIcon, RefreshCcwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AuthFormError } from '@/features/auth/components/AuthField';
import { AuthFormHeading } from '@/features/auth/components/AuthFormHeading';
import { AuthPasswordField } from '@/features/auth/components/AuthPasswordField';
import { useResetPassword } from '@/features/auth/hooks/use-reset-password';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { validateResetPassword } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

export function ResetPasswordForm() {
  const email = useAuthStore((state) => state.resetEmail);
  const resetToken = useAuthStore((state) => state.resetToken);
  const backToForgot = useAuthStore((state) => state.backToForgot);
  const clearReset = useAuthStore((state) => state.clearReset);
  const resetPassword = useResetPassword();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ReturnType<typeof validateResetPassword>>({});

  useEffect(() => {
    if (!email || !resetToken) {
      backToForgot();
    }
  }, [backToForgot, email, resetToken]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateResetPassword({ newPassword, confirmPassword });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      resetPassword.reset();
      return;
    }

    resetPassword.mutate(
      { email, resetToken, newPassword },
      {
        onSuccess: () => {
          clearReset();
        },
      },
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <AuthFormHeading
        icon={KeyRoundIcon}
        title="Choose a new password"
        description={`This replaces the password for ${email || 'your account'}. You will sign in with it next.`}
      />
      <AuthFormError
        message={
          resetPassword.error
            ? getApiErrorMessage(resetPassword.error, 'Could not reset the password. Try again.')
            : ''
        }
      />
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
      <Button
        type="submit"
        size="sm"
        className="w-full"
        disabled={resetPassword.isPending || !resetToken}
      >
        <KeyRoundIcon className="size-4" />
        {resetPassword.isPending ? 'Updating password…' : 'Update password'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        <Button type="button" variant="link" size="sm" onClick={backToForgot}>
          <RefreshCcwIcon className="size-4" />
          Request a new code
        </Button>
      </p>
    </form>
  );
}
