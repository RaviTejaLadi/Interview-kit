import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { useVerifyOtp } from '@/features/auth/hooks/use-verify-otp';
import { validateOtp } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

export function VerifyOtpForm() {
  const email = useAuthStore((state) => state.resetEmail);
  const presetOtp = useAuthStore((state) => state.resetOtp);
  const backToForgot = useAuthStore((state) => state.backToForgot);
  const continueReset = useAuthStore((state) => state.continueReset);
  const setScreen = useAuthStore((state) => state.setScreen);
  const verifyOtp = useVerifyOtp();
  const resend = useForgotPassword();
  const [otp, setOtp] = useState(presetOtp);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      setScreen('forgot');
    }
  }, [email, setScreen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateOtp(otp);
    setError(nextErrors.otp ?? '');
    if (nextErrors.otp) {
      verifyOtp.reset();
      return;
    }

    verifyOtp.mutate(
      { email, otp: otp.trim() },
      {
        onSuccess: (result) => {
          continueReset(result.resetToken);
        },
      },
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className="text-2xl text-foreground">Enter the code</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the 6-digit code sent to {email || 'your email'}.
        </p>
      </div>
      <AuthFormError
        message={
          verifyOtp.error ? getApiErrorMessage(verifyOtp.error, 'Could not verify the code. Try again.') : ''
        }
      />
      <AuthField
        label="Reset code"
        name="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={otp}
        error={error}
        onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
      />
      <Button type="submit" size="lg" className="w-full" disabled={verifyOtp.isPending || !email}>
        {verifyOtp.isPending ? 'Checking code…' : 'Verify code'}
      </Button>
      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="link" size="sm" onClick={backToForgot}>
          Use a different email
        </Button>
        <Button
          type="button"
          variant="link"
          size="sm"
          disabled={resend.isPending || !email}
          onClick={() => {
            resend.mutate(email, {
              onSuccess: (result) => {
                if (result.otp) {
                  setOtp(result.otp);
                }
              },
            });
          }}
        >
          {resend.isPending ? 'Sending…' : 'Resend code'}
        </Button>
      </div>
    </form>
  );
}
