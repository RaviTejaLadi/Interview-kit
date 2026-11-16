import { GithubIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useOAuthProviders } from '@/features/auth/hooks/use-oauth-providers';

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

function startProviderLogin(url: string) {
  window.location.assign(url);
}

export function OAuthButtons() {
  const providers = useOAuthProviders();
  const googleUrl = providers.data?.google ? providers.data.googleUrl : '';
  const githubUrl = providers.data?.github ? providers.data.githubUrl : '';

  if (!googleUrl && !githubUrl) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        {googleUrl ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => startProviderLogin(googleUrl)}
          >
            <GoogleMark />
            Continue with Google
          </Button>
        ) : null}
        {githubUrl ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => startProviderLogin(githubUrl)}
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
