import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { OAuthButtons } from '@/features/auth/components/oauth-buttons';
import { useLogin } from '@/features/auth/hooks/use-login';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { clearOAuthError, readOAuthError } from '@/features/auth/utils/oauth';
import { validateLogin } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

export function LoginForm() {
  const login = useLogin();
  const setScreen = useAuthStore((state) => state.setScreen);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({});
  const [oauthError] = useState(readOAuthError);

  useEffect(() => {
    if (oauthError) {
      clearOAuthError();
    }
  }, [oauthError]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      login.reset();
      return;
    }

    login.mutate({ email: email.trim(), password });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className="text-2xl text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Use your email and password, or continue with Google or GitHub.
        </p>
      </div>
      <AuthFormError
        message={
          login.error ? getApiErrorMessage(login.error, 'Could not sign in. Try again.') : oauthError
        }
      />
      <OAuthButtons />
      <AuthField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        error={errors.email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        error={errors.password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className="flex justify-end">
        <Button type="button" variant="link" size="sm" onClick={() => setScreen('forgot')}>
          Forgot password?
        </Button>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={login.isPending}>
        {login.isPending ? 'Signing in…' : 'Sign in'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New here?{' '}
        <Button type="button" variant="link" size="sm" onClick={() => setScreen('signup')}>
          Create an account
        </Button>
      </p>
    </form>
  );
}
