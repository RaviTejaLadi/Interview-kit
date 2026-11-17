import { useEffect, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { MessageSquareTextIcon } from 'lucide-react';

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
import { FeedbackDetails } from '@/features/admin/feedback/components/feedback-details';
import { FeedbackRowActions } from '@/features/admin/feedback/components/feedback-row-actions';
import { FeedbackStatusBadge } from '@/features/admin/feedback/components/feedback-status-badge';
import { useAdminFeedbacks } from '@/features/admin/feedback/hooks/use-admin-feedbacks';
import { formatDateTime } from '@/features/admin/feedback/utils/format-date-time';
import { AuthFormError } from '@/features/auth/components/auth-field';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { useDataTable } from '@/hooks/useDataTable';
import { getApiErrorMessage } from '@/utils/axios';

export function AdminFeedbackTable() {
  const feedbacks = useAdminFeedbacks(true);
  const [viewingFeedbackId, setViewingFeedbackId] = useState<string | null>(null);

  useEffect(() => {
    if (!viewingFeedbackId || !feedbacks.data) {
      return;
    }

    const stillExists = feedbacks.data.some((feedback) => feedback.id === viewingFeedbackId);
    if (!stillExists) {
      setViewingFeedbackId(null);
    }
  }, [feedbacks.data, viewingFeedbackId]);

  const columns = useMemo<ColumnDef<FeedbackItem>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => <DTColumnHeader column={column} title="Title" />,
        cell: ({ row }) => (
          <span className="font-medium text-foreground">{row.original.title}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <DTColumnHeader column={column} title="Status" />,
        cell: ({ row }) => <FeedbackStatusBadge status={row.original.status ?? 'open'} />,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <DTColumnHeader column={column} title="Created" />,
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatDateTime(row.original.createdAt)}</span>
        ),
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
        cell: ({ row }) => (
          <FeedbackRowActions feedback={row.original} onView={setViewingFeedbackId} />
        ),
      },
    ],
    [],
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: feedbacks.data ?? [],
    columns,
    searchableColumns: ['title', 'status'],
    storageKey: 'admin_feedback_dt_column_visibility',
    pageSize: 10,
  });

  const feedbackLoadError = feedbacks.error
    ? getApiErrorMessage(feedbacks.error, 'Could not load feedback right now.')
    : '';

  return (
    <Card>
      <CardContent className="px-5 py-6 sm:px-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <MessageSquareTextIcon className="size-4 text-primary" />
          Feedback moderation
        </h2>
        <AuthFormError message={feedbackLoadError} />

        {feedbacks.isLoading ? <DataTableSkeleton /> : null}

        {!feedbacks.isLoading ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <DTSearchBox
                value={globalFilter ?? ''}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Search feedback…"
              />
              <p className="text-xs text-muted-foreground">
                {feedbacks.data?.length ?? 0} item{(feedbacks.data?.length ?? 0) === 1 ? '' : 's'}
              </p>
            </div>

            <DataTable table={table} />
            <DTPagination table={table} pageSizeOptions={[5, 10, 20, 50]} />
            <Dialog
              open={Boolean(viewingFeedbackId)}
              onOpenChange={(open) => {
                if (!open) {
                  setViewingFeedbackId(null);
                }
              }}
            >
              {viewingFeedbackId ? (
                <DialogContent className="max-h-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription>Review the message and update its status.</DialogDescription>
                  </DialogHeader>
                  <FeedbackDetails feedbackId={viewingFeedbackId} />
                </DialogContent>
              ) : null}
            </Dialog>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
