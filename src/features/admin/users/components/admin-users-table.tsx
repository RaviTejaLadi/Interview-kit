import { useEffect, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { UsersIcon } from 'lucide-react';

import DataTable from '@/components/data-table';
import { DTColumnHeader } from '@/components/data-table/DTColumnHeader';
import { DataTableSkeleton } from '@/components/data-table/DataTableSkeleton';
import DTPagination from '@/components/data-table/DTPagination';
import { DTSearchBox } from '@/components/data-table/toolbar/DTSearchBox';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AdminUserEditForm } from '@/features/admin/users/components/admin-user-edit-form';
import { UserProviderBadge } from '@/features/admin/users/components/user-provider-badge';
import { UserRoleBadge } from '@/features/admin/users/components/user-role-badge';
import { UserRowActions } from '@/features/admin/users/components/user-row-actions';
import { useAdminUsers } from '@/features/admin/users/hooks/use-admin-users';
import type { AdminUser } from '@/features/admin/users/types/users';
import { AuthFormError } from '@/features/auth/components/auth-field';
import { useDataTable } from '@/hooks/useDataTable';
import { getApiErrorMessage } from '@/utils/axios';

export function AdminUsersTable() {
  const users = useAdminUsers(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!editingUserId || !users.data) {
      return;
    }

    const stillExists = users.data.some((user) => user.id === editingUserId);
    if (!stillExists) {
      setEditingUserId(null);
    }
  }, [editingUserId, users.data]);

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        id: 'name',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: ({ column }) => <DTColumnHeader column={column} title="Name" />,
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-foreground">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-xs text-muted-foreground">@{row.original.userName}</p>
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <DTColumnHeader column={column} title="Email" />,
        cell: ({ row }) => (
          <span className="break-all text-muted-foreground">{row.original.email}</span>
        ),
      },
      {
        accessorKey: 'provider',
        header: ({ column }) => <DTColumnHeader column={column} title="Provider" />,
        cell: ({ row }) => (
          <UserProviderBadge
            provider={row.original.provider}
            google={row.original.google}
            github={row.original.github}
          />
        ),
      },
      {
        accessorKey: 'role',
        header: ({ column }) => <DTColumnHeader column={column} title="Role" />,
        cell: ({ row }) => <UserRoleBadge role={row.original.role} />,
      },
      {
        id: 'actions',
        enableSorting: false,
        enableHiding: false,
        meta: {
          skipSearchHighlight: true,
          headerClassName: 'w-[1%] text-right',
          cellClassName: 'w-[1%] text-right',
        },
        header: () => <span className="text-xs font-medium text-muted-foreground">Action</span>,
        cell: ({ row }) => <UserRowActions user={row.original} onEdit={setEditingUserId} />,
      },
    ],
    [],
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: users.data ?? [],
    columns,
    searchableColumns: ['name', 'email', 'role', 'provider'],
    storageKey: 'admin_users_dt_column_visibility',
    pageSize: 10,
  });

  const usersLoadError = users.error
    ? getApiErrorMessage(users.error, 'Could not load users right now.')
    : '';

  return (
    <Card>
      <CardContent className="px-5 py-6 sm:px-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <UsersIcon className="size-4 text-primary" />
          User management
        </h2>
        <AuthFormError message={usersLoadError} />

        {users.isLoading ? <DataTableSkeleton /> : null}

        {!users.isLoading ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <DTSearchBox
                value={globalFilter ?? ''}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Search users…"
              />
              <p className="text-xs text-muted-foreground">
                {users.data?.length ?? 0} user{(users.data?.length ?? 0) === 1 ? '' : 's'}
              </p>
            </div>

            <DataTable table={table} />
            <DTPagination table={table} pageSizeOptions={[5, 10, 20, 50]} />
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
                    <DialogDescription>
                      Update this account and save your changes.
                    </DialogDescription>
                  </DialogHeader>
                  <AdminUserEditForm userId={editingUserId} />
                </DialogContent>
              ) : null}
            </Dialog>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
