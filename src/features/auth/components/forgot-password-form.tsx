import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { validateForgotPassword } from '@/features/auth/utils/validation';
import { getApiErrorMessage, getApiErrorStatus } from '@/utils/axios';

export function ForgotPasswordForm() {
  const setScreen = useAuthStore((state) => state.setScreen);
  const forgotPassword = useForgotPassword();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForgotPassword(email);
    setError(nextErrors.email ?? '');
    if (nextErrors.email) {
      forgotPassword.reset();
      return;
    }

    forgotPassword.mutate(email.trim());
  }

  const formError = !forgotPassword.error
    ? ''
    : getApiErrorStatus(forgotPassword.error) === 404
      ? 'Password reset by email is not available on this API yet. Sign in with your current password, or create an account.'
      : getApiErrorMessage(forgotPassword.error, 'Could not start password reset. Try again.');

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className="text-2xl text-foreground">Forgot password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the email on your account. The API will start a reset if that route is available.
        </p>
      </div>
      <AuthFormError message={formError} />
      {forgotPassword.isSuccess ? (
        <p
          role="status"
          className="rounded-[var(--radius-control)] border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-foreground"
        >
          {forgotPassword.data.message || 'Password reset started. Check your email.'}
        </p>
      ) : null}
      <AuthField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        error={error}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" size="lg" className="w-full" disabled={forgotPassword.isPending}>
        {forgotPassword.isPending ? 'Sending…' : 'Send reset link'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        <Button type="button" variant="link" size="sm" onClick={() => setScreen('login')}>
          Back to sign in
        </Button>
      </p>
    </form>
  );
}
