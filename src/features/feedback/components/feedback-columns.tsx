import type { ColumnDef, Table } from '@tanstack/react-table';

import { dataTableCheckboxStyles } from '@/components/data-table/styles';
import { DTColumnHeader } from '@/components/data-table/DTColumnHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { FeedbackRowActions } from '@/features/feedback/components/FeedbackRowActions';
import { FeedbackStatusBadge } from '@/features/feedback/components/FeedbackStatusBadge';
import { getColumnNames } from '@/features/feedback/constants/feedbackColumnDisplayNames';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { formatDateTime } from '@/features/feedback/utils/format-date-time';
import { cn } from '@/lib/utils';

type FeedbackColumnsOptions = {
  getTable: () => Table<FeedbackItem>;
};

export function getFeedbackColumns({
  getTable,
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
      id: 'title',
      accessorFn: (row) => `${row.title} ${row.description ?? ''}`,
      header: ({ column }) => <DTColumnHeader column={column} title={getColumnNames('title')} />,
      cell: ({ row }) => (
        <div className="max-w-md font-medium">
          <p className="text-foreground">{row.original.title}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {row.original.description || 'No description'}
          </p>
        </div>
      ),
      meta: { skipSearchHighlight: true },
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
      cell: ({ row }) => <FeedbackRowActions feedback={row.original} />,
      meta: {
        skipSearchHighlight: true,
        headerClassName: 'w-[1%] text-right',
        cellClassName: 'w-[1%] text-right',
      },
    },
  ];
}
