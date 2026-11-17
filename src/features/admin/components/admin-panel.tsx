import { CreateAdminForm } from '@/features/admin/create-admin/components/create-admin-form';
import { AdminFeedbackTable } from '@/features/admin/feedback/components/admin-feedback-table';
import { AdminUsersTable } from '@/features/admin/users/components/admin-users-table';

type AdminPanelSection = 'admin-users' | 'admin-feedback' | 'admin-create';

export function AdminPanel({ section }: { section: AdminPanelSection }) {
  return (
    <div className="flex flex-col gap-6">
      {section === 'admin-create' ? <CreateAdminForm /> : null}
      {section === 'admin-users' ? <AdminUsersTable /> : null}
      {section === 'admin-feedback' ? <AdminFeedbackTable /> : null}
    </div>
  );
}
