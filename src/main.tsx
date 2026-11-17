import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { consumeOAuthCallback } from '@/features/auth/utils/oauth';

import App from './App';

import { queryClient } from './utils/query-client';
import './index.css';
import { TooltipProvider } from './components/ui/tooltip';

consumeOAuthCallback();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
