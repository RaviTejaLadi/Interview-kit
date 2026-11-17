import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeftIcon, RefreshCcwIcon, ShieldCheckIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/AuthField';
import { AuthFormHeading } from '@/features/auth/components/AuthFormHeading';
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { useVerifyOtp } from '@/features/auth/hooks/use-verify-otp';
import { paths } from '@/routes/paths';
import { validateOtp } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

export function VerifyOtpForm() {
  const navigate = useNavigate();
  const email = useAuthStore((state) => state.resetEmail);
  const presetOtp = useAuthStore((state) => state.resetOtp);
  const backToForgot = useAuthStore((state) => state.backToForgot);
  const continueReset = useAuthStore((state) => state.continueReset);
  const verifyOtp = useVerifyOtp();
  const resend = useForgotPassword();
  const [otp, setOtp] = useState(presetOtp);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      navigate(paths.forgotPassword, { replace: true });
    }
  }, [email, navigate]);

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
          navigate(paths.resetPassword);
        },
      },
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <AuthFormHeading
        icon={ShieldCheckIcon}
        title="Enter the code"
        description={`Enter the 6-digit code sent to ${email || 'your email'}.`}
      />
      <AuthFormError
        message={
          verifyOtp.error
            ? getApiErrorMessage(verifyOtp.error, 'Could not verify the code. Try again.')
            : ''
        }
      />
      <AuthField
        label="Reset code"
        name="otp"
        required
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={otp}
        error={error}
        icon={<ShieldCheckIcon className="size-4" />}
        onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
      />
      <Button type="submit" size="sm" className="w-full" disabled={verifyOtp.isPending || !email}>
        <ShieldCheckIcon className="size-4" />
        {verifyOtp.isPending ? 'Checking code…' : 'Verify code'}
      </Button>
      <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => {
            backToForgot();
            navigate(paths.forgotPassword);
          }}
        >
          <ArrowLeftIcon className="size-4" />
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
          <RefreshCcwIcon className="size-4" />
          {resend.isPending ? 'Sending…' : 'Resend code'}
        </Button>
      </div>
    </form>
  );
}
