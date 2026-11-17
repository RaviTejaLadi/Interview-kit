import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { consumeOAuthCallback } from '@/features/auth/utils/oauth';
import { router } from '@/routes/router';

import { queryClient } from './utils/query-client';
import './index.css';
import { TooltipProvider } from './components/ui/tooltip';

const oauthDestination = consumeOAuthCallback();
if (oauthDestination) {
  window.history.replaceState(null, '', oauthDestination);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
