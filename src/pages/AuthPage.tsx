import { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import learningIllustration from '@/assets/Learning-bro.svg';
import resumeIllustration from '@/assets/Resume-bro.svg';
import workTimeIllustration from '@/assets/Work time-cuate.svg';
import { AppHeaderActions } from '@/features/interview-app/components/AppHeaderActions';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { paths } from '@/routes/paths';
import { cn } from '@/lib/utils';

const authIllustrations = [
  {
    src: resumeIllustration,
    alt: 'Person preparing for job interviews',
    title: 'Interview-ready learning',
    description: 'Practice daily, track progress, and stay consistent with focused interview kits.',
  },
  {
    src: learningIllustration,
    alt: 'Person learning from study material',
    title: 'Structured preparation',
    description:
      'Theory and coding are organized together so revision feels simple and repeatable.',
  },
  {
    src: workTimeIllustration,
    alt: 'Person planning study time',
    title: 'Build momentum',
    description:
      'Set a routine, complete more questions, and improve confidence one session at a time.',
  },
];

const ILLUSTRATION_ROTATION_MS = 4500;

export function AuthPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useInterviewAppStore((state) => state.theme);
  const setTheme = useInterviewAppStore((state) => state.setTheme);
  const [illustrationIndex, setIllustrationIndex] = useState(0);
  const illustration = authIllustrations[illustrationIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIllustrationIndex((current) => (current + 1) % authIllustrations.length);
    }, ILLUSTRATION_ROTATION_MS);

    return () => window.clearInterval(timer);
  }, []);

  const authSwitchAction =
    pathname === paths.login
      ? {
          text: "Don't have an account?",
          button: 'Sign up',
          onClick: () => navigate(paths.signup),
        }
      : {
          text: 'Already have an account?',
          button: 'Sign in',
          onClick: () => navigate(paths.login),
        };

  const showSwitchAction = pathname === paths.login || pathname === paths.signup;

  return (
    <div className="theme relative flex h-svh flex-col overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <p className="min-w-0 truncate text-base font-semibold tracking-wide text-foreground">
            Interview Kits
          </p>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {showSwitchAction ? (
              <p className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
                {authSwitchAction.text}
                <button
                  type="button"
                  onClick={authSwitchAction.onClick}
                  className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {authSwitchAction.button}
                  <ArrowRightIcon className="size-3.5" />
                </button>
              </p>
            ) : null}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="inline-flex text-xs md:hidden"
              onClick={authSwitchAction.onClick}
            >
              {authSwitchAction.button}
            </Button>

            <AppHeaderActions
              theme={theme}
              showGuestFullscreen={false}
              onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            />
          </div>
        </div>
      </div>
      <main className="relative flex flex-1 overflow-y-auto px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 py-6 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-12 lg:py-8 xl:gap-16">
          <section className="mx-auto w-full max-w-xl lg:mx-0">
            <Outlet />
          </section>

          <aside className="mx-auto hidden w-full max-w-lg lg:block">
            <div className="space-y-4">
              <div className="relative h-64 overflow-hidden xl:h-89">
                {authIllustrations.map((item, index) => (
                  <div
                    key={item.title}
                    className={cn(
                      'absolute inset-0 transition-opacity duration-700 ease-in-out',
                      index === illustrationIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
                    )}
                  >
                    <img src={item.src} alt={item.alt} className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>

              <div className="relative h-29.5">
                {authIllustrations.map((item, index) => (
                  <div
                    key={`${item.title}-caption`}
                    className={cn(
                      'absolute inset-0 space-y-1.5 transition-opacity duration-700 ease-in-out',
                      index === illustrationIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
                    )}
                  >
                    <p className="text-lg font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {authIllustrations.map((item, index) => (
                  <span
                    key={`${item.title}-dot`}
                    className={
                      index === illustrationIndex
                        ? 'h-1.5 w-6 rounded-full bg-primary transition-all duration-500'
                        : 'h-1.5 w-1.5 rounded-full bg-muted-foreground/40 transition-all duration-500'
                    }
                  />
                ))}
              </div>
              <div className="sr-only" aria-live="polite">
                {illustration.title}
                <span>{illustration.description}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
