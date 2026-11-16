import { useState, type FormEvent } from 'react';
import { ArrowLeftIcon, MailIcon, SendIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { AuthFormHeading } from '@/features/auth/components/auth-form-heading';
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
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <AuthFormHeading
        icon={SendIcon}
        title="Forgot password"
        description="Enter your account email. We will send a 6-digit code so you can choose a new password."
      />
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
        required
        type="email"
        autoComplete="email"
        value={email}
        error={error}
        icon={<MailIcon className="size-4" />}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" size="lg" className="w-full" disabled={forgotPassword.isPending}>
        <SendIcon className="size-4" />
        {forgotPassword.isPending ? 'Sending…' : 'Send reset code'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        <Button type="button" variant="link" size="sm" onClick={() => setScreen('login')}>
          <ArrowLeftIcon className="size-4" />
          Back to sign in
        </Button>
      </p>
    </form>
  );
}
