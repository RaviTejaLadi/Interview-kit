import type { ReactNode } from 'react';
import {
  KeyRoundIcon,
  MessageSquareTextIcon,
  UserCircle2Icon,
  UserPlusIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';

import { CreateAdminForm } from '@/features/admin/create-admin/components/CreateAdminForm';
import { AdminFeedbackTable } from '@/features/admin/feedback/components/AdminFeedbackTable';
import { AdminUsersTable } from '@/features/admin/users/components/AdminUsersTable';
import { SignInMethod } from '@/features/auth/components/SignInMethod';
import { ProfileSettingsPanel } from '@/features/auth/components/ProfileScreen';
import { FeedbackPanel } from '@/features/feedback/components/FeedbackPanel';

export type SettingsRoute = {
  path: string;
  label: string;
  icon: LucideIcon;
  element: ReactNode;
};

export const settingsMainRoutes: SettingsRoute[] = [
  {
    path: 'profile',
    label: 'Profile',
    icon: UserCircle2Icon,
    element: <ProfileSettingsPanel />,
  },
  {
    path: 'sign-in-methods',
    label: 'Sign in methods',
    icon: KeyRoundIcon,
    element: <SignInMethod />,
  },
  {
    path: 'feedback',
    label: 'Feedback',
    icon: MessageSquareTextIcon,
    element: <FeedbackPanel />,
  },
];

export const settingsAdminRoutes: SettingsRoute[] = [
  { path: 'users', label: 'Users', icon: UsersIcon, element: <AdminUsersTable /> },
  {
    path: 'feedback',
    label: 'Feedback',
    icon: MessageSquareTextIcon,
    element: <AdminFeedbackTable />,
  },
  { path: 'create', label: 'Create admin', icon: UserPlusIcon, element: <CreateAdminForm /> },
];
