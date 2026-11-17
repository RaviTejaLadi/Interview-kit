import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

import { paths } from '@/routes/paths';

export function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'This page could not be loaded.';

  return (
    <div className="theme grid min-h-svh place-items-center bg-background px-6">
      <div className="max-w-md space-y-3 text-center">
        <p className="text-sm font-semibold text-foreground">{message}</p>
        <Link to={paths.kits} className="inline-block text-sm font-medium text-primary">
          Back to interview kits
        </Link>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="theme grid min-h-svh place-items-center bg-background px-6">
      <div className="max-w-md space-y-3 text-center">
        <p className="text-sm font-semibold text-foreground">That page does not exist.</p>
        <Link to={paths.kits} className="inline-block text-sm font-medium text-primary">
          Back to interview kits
        </Link>
      </div>
    </div>
  );
}
