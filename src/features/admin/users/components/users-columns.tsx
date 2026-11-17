import type { ColumnDef, Table } from '@tanstack/react-table';

import { dataTableCheckboxStyles } from '@/components/data-table/styles';
import { DTColumnHeader } from '@/components/data-table/DTColumnHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProviderBadge } from '@/features/admin/users/components/UserProviderBadge';
import { UserRoleBadge } from '@/features/admin/users/components/UserRoleBadge';
import { UserRowActions } from '@/features/admin/users/components/UserRowActions';
import { getColumnNames } from '@/features/admin/users/constants/usersColumnDisplayNames';
import type { AdminUser } from '@/features/admin/users/types/users';
import { cn } from '@/lib/utils';

type UsersColumnsOptions = {
  getTable: () => Table<AdminUser>;
  onEdit: (userId: string) => void;
};

export function getUsersColumns({ getTable, onEdit }: UsersColumnsOptions): ColumnDef<AdminUser>[] {
  return [
    {
      id: 'select',
      header: () => {
        const table = getTable();
        if (!table) {
          return null;
        }
        return (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
            aria-label="Select all"
            className={cn(dataTableCheckboxStyles)}
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(value)}
          aria-label="Select row"
          className={cn(dataTableCheckboxStyles)}
        />
      ),
      enableSorting: false,
      meta: { skipSearchHighlight: true },
    },
    {
      id: 'name',
      accessorFn: (row) => `${row.firstName} ${row.lastName} ${row.userName}`,
      header: ({ column }) => <DTColumnHeader column={column} title={getColumnNames('name')} />,
      cell: ({ row }) => (
        <div className="w-48 font-medium">
          <p className="text-foreground">
            {row.original.firstName} {row.original.lastName}
          </p>
          <p className="text-xs text-muted-foreground">@{row.original.userName}</p>
        </div>
      ),
      meta: { skipSearchHighlight: true },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DTColumnHeader column={column} title={getColumnNames('email')} />,
      cell: ({ row }) => <div className="font-medium break-all">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => <DTColumnHeader column={column} title={getColumnNames('provider')} />,
      cell: ({ row }) => (
        <UserProviderBadge
          provider={row.original.provider}
          google={row.original.google}
          github={row.original.github}
        />
      ),
      meta: { skipSearchHighlight: true },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DTColumnHeader column={column} title={getColumnNames('role')} />,
      cell: ({ row }) => <UserRoleBadge role={row.original.role} />,
      meta: { skipSearchHighlight: true },
    },
    {
      id: 'action',
      enableSorting: false,
      header: () => <div className="font-bold text-foreground">{getColumnNames('action')}</div>,
      cell: ({ row }) => <UserRowActions user={row.original} onEdit={onEdit} />,
      meta: {
        skipSearchHighlight: true,
        headerClassName: 'w-[1%] text-right',
        cellClassName: 'w-[1%] text-right',
      },
    },
  ];
}
