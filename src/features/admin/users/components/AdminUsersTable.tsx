import { useEffect, useRef, useState } from 'react';
import type { Table } from '@tanstack/react-table';

import DataTable from '@/components/data-table';
import { pageSize, pageSizeOptions } from '@/components/data-table/constants/pageOptions';
import { DataTableSkeleton } from '@/components/data-table/DataTableSkeleton';
import DTPagination from '@/components/data-table/DTPagination';
import { DTHeading } from '@/components/data-table/toolbar/DTHeading';
import { DTSearchBox } from '@/components/data-table/toolbar/DTSearchBox';
import { DTViewOptions } from '@/components/data-table/toolbar/DTViewOptions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AdminUserEditForm } from '@/features/admin/users/components/AdminUserEditForm';
import { getUsersColumns } from '@/features/admin/users/components/users-columns';
import { UsersBulkAction } from '@/features/admin/users/components/UsersBulkAction';
import {
  getColumnKeys,
  usersColumnDisplayNames,
} from '@/features/admin/users/constants/usersColumnDisplayNames';
import { usersColumnVisibilityState } from '@/features/admin/users/constants/usersColumnVisibilityState';
import { useAdminUsers } from '@/features/admin/users/hooks/use-admin-users';
import type { AdminUser } from '@/features/admin/users/types/users';
import { AuthFormError } from '@/features/auth/components/AuthField';
import { useDataTable } from '@/hooks/useDataTable';
import { getApiErrorMessage } from '@/utils/axios';

const storageKey = 'admin_users_dt_column_visibility';

export function AdminUsersTable() {
  const users = useAdminUsers(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const tableRef = useRef<Table<AdminUser> | null>(null);

  useEffect(() => {
    if (!editingUserId || !users.data) {
      return;
    }

    const stillExists = users.data.some((user) => user.id === editingUserId);
    if (!stillExists) {
      setEditingUserId(null);
    }
  }, [editingUserId, users.data]);

  const searchableColumns = getColumnKeys(usersColumnDisplayNames);
  const columns = getUsersColumns({
    getTable: () => tableRef.current as Table<AdminUser>,
    onEdit: setEditingUserId,
  });

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: users.data ?? [],
    columns,
    pageSize,
    searchableColumns,
    columnVisibilityState: usersColumnVisibilityState,
    storageKey,
    getRowId: (row) => row.id,
  });

  tableRef.current = table;

  const usersLoadError = users.error
    ? getApiErrorMessage(users.error, 'Could not load users right now.')
    : '';

  return (
    <>
      <div className="m-0 space-y-4 rounded-lg bg-card p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <DTHeading heading="Users" description="Manage users and their roles easily." />
        </div>
        <AuthFormError message={usersLoadError} />
        {users.data ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-2">
                {searchableColumns.length > 0 ? (
                  <DTSearchBox
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                  />
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <DTViewOptions
                  table={table}
                  columnDisplayNames={usersColumnDisplayNames}
                  storageKey={storageKey}
                />
              </div>
            </div>
            <DataTable table={table} />
            {table.getFilteredRowModel().rows.length > pageSize ? (
              <DTPagination table={table} pageSizeOptions={pageSizeOptions} />
            ) : null}
            <UsersBulkAction table={table} />
          </>
        ) : users.isError ? null : (
          <DataTableSkeleton />
        )}
      </div>
      <Dialog
        open={Boolean(editingUserId)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingUserId(null);
          }
        }}
      >
        {editingUserId ? (
          <DialogContent className="max-h-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit user</DialogTitle>
              <DialogDescription>Update this account and save your changes.</DialogDescription>
            </DialogHeader>
            <AdminUserEditForm userId={editingUserId} />
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
