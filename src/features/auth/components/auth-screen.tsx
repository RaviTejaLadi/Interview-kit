import { useEffect } from 'react';

import { SiteHeader } from '@/components/newspaper-masthead';
import { Card, CardContent } from '@/components/ui/card';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';
import { LoginForm } from '@/features/auth/components/login-form';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';
import { SignUpForm } from '@/features/auth/components/signup-form';
import { VerifyOtpForm } from '@/features/auth/components/verify-otp-form';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { AppHeaderActions } from '@/features/interview-app/components/app-header-actions';
import { THEME_STORAGE_KEY } from '@/features/interview-app/lib/navigation';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';

export function AuthScreen() {
  const screen = useAuthStore((state) => state.screen);
  const theme = useInterviewAppStore((state) => state.theme);
  const setTheme = useInterviewAppStore((state) => state.setTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="theme flex min-h-svh flex-col bg-background">
      <SiteHeader
        showBrand
        actions={
          <AppHeaderActions
            theme={theme}
            onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          />
        }
      />
      <main className="flex flex-1 items-start justify-center px-4 py-8 sm:items-center sm:py-12">
        <Card className="w-full max-w-lg">
          <CardContent className="px-5 py-6 sm:px-6">
            {screen === 'signup' ? <SignUpForm /> : null}
            {screen === 'forgot' ? <ForgotPasswordForm /> : null}
            {screen === 'verify-otp' ? <VerifyOtpForm /> : null}
            {screen === 'reset-password' ? <ResetPasswordForm /> : null}
            {screen === 'login' ? <LoginForm /> : null}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
