import { useEffect } from 'react';
import { createBrowserRouter, Navigate, useLocation, useNavigate } from 'react-router';

import { OAUTH_CALLBACK_PATH } from '@/features/auth/constants/auth.constants';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import { SignUpForm } from '@/features/auth/components/SignupForm';
import { VerifyOtpForm } from '@/features/auth/components/VerifyOtpForm';
import { consumeOAuthCallback } from '@/features/auth/utils/oauth';
import { AdminPanel } from '@/features/admin/components/AdminPanel';
import { ProfileSettingsPanel } from '@/features/auth/components/ProfileScreen';
import { FeedbackPanel } from '@/features/feedback/components/FeedbackPanel';
import { interviewCatalog } from '@/features/interview-app/catalog';
import { AuthPage } from '@/pages/AuthPage';
import { GuidePage } from '@/pages/GuidePage';
import { HomePage } from '@/pages/HomePage';
import { KitReaderPage } from '@/pages/KitReaderPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { GuestOnly, HomeRedirect, RequireAdmin, RequireAuth, SessionGate } from '@/routes/guards';
import { guideLoader, kitLoader, settingsFallbackLoader } from '@/routes/loaders';
import { kitPath, paths } from '@/routes/paths';
import { NotFoundPage, RouteErrorPage } from '@/routes/route-error-page';
import { RootLayout } from '@/routes/root-layout';
import { SignInMethod } from '@/features/auth/components/SignInMethod';

function KitsPage() {
  const location = useLocation();
  const kitId = decodeURIComponent(location.hash.replace(/^#/, '')).trim();
  const kitExists = interviewCatalog.groups.some((group) => group.id === kitId);

  if (kitId && kitExists) {
    return <Navigate to={kitPath(kitId)} replace />;
  }

  return <HomePage />;
}

function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const destination = consumeOAuthCallback() ?? paths.login;
    navigate(destination, { replace: true });
  }, [navigate]);

  return <SessionGate label="Signing you in…" />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomeRedirect /> },
      { path: OAUTH_CALLBACK_PATH, element: <OAuthCallbackPage /> },
      {
        element: <GuestOnly />,
        children: [
          {
            element: <AuthPage />,
            children: [
              { path: 'login', element: <LoginForm /> },
              { path: 'signup', element: <SignUpForm /> },
              { path: 'forgot-password', element: <ForgotPasswordForm /> },
              { path: 'verify-otp', element: <VerifyOtpForm /> },
              { path: 'reset-password', element: <ResetPasswordForm /> },
            ],
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          { path: 'kits', element: <KitsPage /> },
          { path: 'kits/:kitId', element: <KitReaderPage />, loader: kitLoader },
          { path: 'guides', element: <HomePage /> },
          { path: 'guides/:guideId', element: <GuidePage />, loader: guideLoader },
          {
            path: 'settings',
            element: <SettingsPage />,
            children: [
              { index: true, element: <Navigate to="profile" replace /> },
              { path: 'profile', element: <ProfileSettingsPanel /> },
              { path: 'sign-in-methods', element: <SignInMethod /> },
              { path: 'feedback', element: <FeedbackPanel /> },
              {
                path: 'admin',
                element: <RequireAdmin />,
                children: [
                  { index: true, element: <Navigate to="users" replace /> },
                  { path: 'users', element: <AdminPanel section="admin-users" /> },
                  { path: 'feedback', element: <AdminPanel section="admin-feedback" /> },
                  { path: 'create', element: <AdminPanel section="admin-create" /> },
                  {
                    path: 'create-admin',
                    element: <Navigate to="/settings/admin/create" replace />,
                  },
                ],
              },
              { path: '*', loader: settingsFallbackLoader },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
