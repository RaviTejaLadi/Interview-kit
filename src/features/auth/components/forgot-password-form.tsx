import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { validateForgotPassword } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

export function ForgotPasswordForm() {
  const setScreen = useAuthStore((state) => state.setScreen);
  const beginReset = useAuthStore((state) => state.beginReset);
  const storedEmail = useAuthStore((state) => state.resetEmail);
  const forgotPassword = useForgotPassword();
  const [email, setEmail] = useState(storedEmail);
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForgotPassword(email);
    setError(nextErrors.email ?? '');
    if (nextErrors.email) {
      forgotPassword.reset();
      return;
    }

    const trimmedEmail = email.trim();
    forgotPassword.mutate(trimmedEmail, {
      onSuccess: (result) => {
        beginReset(trimmedEmail, result.otp);
      },
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className="text-2xl text-foreground">Forgot password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the email on your account. We will send a 6-digit code you can use to choose a new password.
        </p>
      </div>
      <AuthFormError
        message={
          forgotPassword.error
            ? getApiErrorMessage(forgotPassword.error, 'Could not send the reset code. Try again.')
            : ''
        }
      />
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
        {forgotPassword.isPending ? 'Sending…' : 'Send reset code'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        <Button type="button" variant="link" size="sm" onClick={() => setScreen('login')}>
          Back to sign in
        </Button>
      </p>
    </form>
  );
}
