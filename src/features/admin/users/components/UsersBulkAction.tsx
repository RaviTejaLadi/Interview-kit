import type { Table } from '@tanstack/react-table';

import { DTBulkActions } from '@/components/data-table/bulk-actions/DTBulkActions';
import { DTSelectionInfo } from '@/components/data-table/bulk-actions/DTSelectionInfo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDeleteAdminUser } from '@/features/admin/users/hooks/use-delete-admin-user';
import type { AdminUser } from '@/features/admin/users/types/users';
import { showAlertDialog } from '@/stores/useAlertDialogStore';

type UsersBulkActionProps = {
  table: Table<AdminUser>;
};

export function UsersBulkAction({ table }: UsersBulkActionProps) {
  const deleteUser = useDeleteAdminUser();
  const selectedUsers = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original)
    .filter((user) => user.id);

  if (!selectedUsers.length) {
    return null;
  }

  const handleDelete = () => {
    const count = selectedUsers.length;
    showAlertDialog({
      variant: 'destructive',
      title: count > 1 ? 'Delete users' : 'Delete user',
      description: `Are you sure you want to delete ${count} selected ${count > 1 ? 'users' : 'user'}?`,
      details: 'This action cannot be undone.',
      cancelBtnText: 'No',
      confirmBtnText: 'Yes',
      loadingBtnText: 'Deleting...',
      confirmActionFn: async () => {
        await Promise.all(selectedUsers.map((user) => deleteUser.mutateAsync(user.id)));
        table.toggleAllRowsSelected(false);
      },
    });
  };

  return (
    <div className="mt-3">
      <DTBulkActions>
        <DTSelectionInfo table={table} />
        <Separator orientation="vertical" className="h-6 w-px" />
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </DTBulkActions>
    </div>
  );
}
