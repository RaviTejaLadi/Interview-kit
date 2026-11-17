import { Navigate, Outlet, useLocation } from 'react-router';

import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { hasStoredSession } from '@/features/auth/utils/session';
import { isAuthPath, paths } from '@/routes/paths';

export function SessionGate({ label = 'Checking your session…' }: { label?: string }) {
  return (
    <div className="theme grid min-h-svh place-items-center bg-background text-sm text-muted-foreground">
      {label}
    </div>
  );
}

function returnPathFromState(state: unknown) {
  if (!state || typeof state !== 'object' || !('from' in state)) {
    return paths.kits;
  }

  const from = (state as { from?: { pathname?: string; search?: string; hash?: string } }).from;
  if (!from?.pathname || !from.pathname.startsWith('/') || isAuthPath(from.pathname)) {
    return paths.kits;
  }

  return `${from.pathname}${from.search ?? ''}${from.hash ?? ''}`;
}

export function RequireAuth() {
  const location = useLocation();
  const currentUser = useCurrentUser();
  const hasSession = hasStoredSession();

  if (hasSession && currentUser.isLoading) {
    return <SessionGate />;
  }

  if (!hasSession || !currentUser.data) {
    return <Navigate to={paths.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function GuestOnly() {
  const location = useLocation();
  const currentUser = useCurrentUser();
  const hasSession = hasStoredSession();

  if (hasSession && currentUser.isLoading && !currentUser.data) {
    return <SessionGate />;
  }

  if (currentUser.data) {
    return <Navigate to={returnPathFromState(location.state)} replace />;
  }

  return <Outlet />;
}

export function RequireAdmin() {
  const location = useLocation();
  const currentUser = useCurrentUser();

  if (currentUser.isLoading) {
    return <SessionGate />;
  }

  if (currentUser.data?.role !== 'admin') {
    return <Navigate to={paths.settings.profile} replace state={location.state} />;
  }

  return <Outlet />;
}

export function HomeRedirect() {
  const currentUser = useCurrentUser();
  const hasSession = hasStoredSession();

  if (hasSession && currentUser.isLoading) {
    return <SessionGate />;
  }

  if (!hasSession || !currentUser.data) {
    return <Navigate to={paths.login} replace />;
  }

  return <Navigate to={paths.kits} replace />;
}
