import { GithubIcon, LoaderCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useOAuthProviders } from '@/features/auth/hooks/use-oauth-providers';
import { BASE_URL } from '@/utils/urls';

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.44a5.51 5.51 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.65Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.86-3c-1.07.72-2.45 1.16-4.09 1.16-3.14 0-5.8-2.12-6.75-4.97H1.26v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.28A7.21 7.21 0 0 1 4.87 12c0-.79.14-1.56.38-2.28V6.63H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.37l3.99-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.14 15.24 0 12 0A12 12 0 0 0 1.26 6.63l3.99 3.09C6.2 6.87 8.86 4.75 12 4.75Z"
      />
    </svg>
  );
}

function startProviderLogin(provider: 'google' | 'github') {
  const target = new URL(`${BASE_URL}/auth/${provider}`);
  target.searchParams.set('returnTo', window.location.origin);
  window.location.assign(target.toString());
}

export function OAuthButtons() {
  const providers = useOAuthProviders();
  const googleReady = Boolean(providers.data?.google);
  const githubReady = Boolean(providers.data?.github);
  const hasBothProviders = googleReady && githubReady;

  if (!googleReady && !githubReady && !providers.isPending) {
    return null;
  }

  return (
    <div className="space-y-3.5">
      <div className={hasBothProviders ? 'grid grid-cols-1 gap-2 sm:grid-cols-2' : 'grid gap-2'}>
        {providers.isPending ? (
          <Button type="button" variant="outline" size="lg" className="w-full" disabled>
            <LoaderCircleIcon className="size-4 animate-spin" />
            Loading providers…
          </Button>
        ) : null}
        {googleReady ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-auto min-h-9 w-full min-w-0 justify-center px-3 whitespace-normal"
            onClick={() => startProviderLogin('google')}
          >
            <GoogleMark />
            Continue with Google
          </Button>
        ) : null}
        {githubReady ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-auto min-h-9 w-full min-w-0 justify-center px-3 whitespace-normal"
            onClick={() => startProviderLogin('github')}
          >
            <GithubIcon />
            Continue with GitHub
          </Button>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or use email</span>
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
