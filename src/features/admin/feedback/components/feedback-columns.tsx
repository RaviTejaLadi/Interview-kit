import type { ColumnDef, Table } from '@tanstack/react-table';

import { dataTableCheckboxStyles } from '@/components/data-table/styles';
import { DTColumnHeader } from '@/components/data-table/DTColumnHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { FeedbackRowActions } from '@/features/admin/feedback/components/FeedbackRowActions';
import { FeedbackStatusBadge } from '@/features/admin/feedback/components/FeedbackStatusBadge';
import { getColumnNames } from '@/features/admin/feedback/constants/feedbackColumnDisplayNames';
import { formatDateTime } from '@/features/admin/feedback/utils/format-date-time';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { cn } from '@/lib/utils';

type FeedbackColumnsOptions = {
  getTable: () => Table<FeedbackItem>;
  onView: (feedbackId: string) => void;
};

export function getAdminFeedbackColumns({
  getTable,
  onView,
}: FeedbackColumnsOptions): ColumnDef<FeedbackItem>[] {
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
      accessorKey: 'title',
      header: ({ column }) => <DTColumnHeader column={column} title={getColumnNames('title')} />,
      cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DTColumnHeader column={column} title={getColumnNames('status')} />,
      cell: ({ row }) => <FeedbackStatusBadge status={row.original.status ?? 'open'} />,
      meta: { skipSearchHighlight: true },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DTColumnHeader column={column} title={getColumnNames('createdAt')} />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{formatDateTime(row.original.createdAt)}</div>
      ),
      meta: { skipSearchHighlight: true },
    },
    {
      id: 'action',
      enableSorting: false,
      header: () => <div className="font-bold text-foreground">{getColumnNames('action')}</div>,
      cell: ({ row }) => <FeedbackRowActions feedback={row.original} onView={onView} />,
      meta: {
        skipSearchHighlight: true,
        headerClassName: 'w-[1%] text-right',
        cellClassName: 'w-[1%] text-right',
      },
    },
  ];
}
