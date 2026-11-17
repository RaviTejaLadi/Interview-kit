import { useEffect, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  CheckCircle2Icon,
  EllipsisVerticalIcon,
  EyeIcon,
  MessageSquareTextIcon,
  Trash2Icon,
} from 'lucide-react';

import DataTable from '@/components/data-table';
import { DTColumnHeader } from '@/components/data-table/DTColumnHeader';
import { DataTableSkeleton } from '@/components/data-table/DataTableSkeleton';
import DTPagination from '@/components/data-table/DTPagination';
import { DTSearchBox } from '@/components/data-table/toolbar/DTSearchBox';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminFeedback } from '@/features/admin/hooks/use-admin-feedback';
import { useAdminFeedbacks } from '@/features/admin/hooks/use-admin-feedbacks';
import { useDeleteAdminFeedback } from '@/features/admin/hooks/use-delete-admin-feedback';
import { useUpdateAdminFeedback } from '@/features/admin/hooks/use-update-admin-feedback';
import type { FeedbackStatus } from '@/features/admin/types/admin';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import {
  FEEDBACK_STATUS_LABELS,
  FEEDBACK_STATUSES,
} from '@/features/feedback/constants/feedback.constants';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { useDataTable } from '@/hooks/useDataTable';
import { cn } from '@/lib/utils';
import { showAlertDialog } from '@/stores/useAlertDialogStore';
import { getApiErrorMessage } from '@/utils/axios';

function feedbackStatusClassName(status: FeedbackStatus) {
  if (status === 'resolved') {
    return 'bg-success-soft text-success';
  }
  if (status === 'in_progress') {
    return 'bg-warning-soft text-warning';
  }
  return 'bg-muted text-muted-foreground';
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function FeedbackStatusBadge({ status }: { status: FeedbackStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px]',
        feedbackStatusClassName(status),
      )}
    >
      {FEEDBACK_STATUS_LABELS[status]}
    </span>
  );
}

function FeedbackDetails({ feedbackId }: { feedbackId: string }) {
  const selectedFeedback = useAdminFeedback(feedbackId);
  const updateFeedback = useUpdateAdminFeedback();
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>('open');

  useEffect(() => {
    if (!selectedFeedback.data) {
      return;
    }
    setFeedbackStatus(selectedFeedback.data.status ?? 'open');
  }, [selectedFeedback.data]);

  function handleUpdateFeedbackStatus(nextStatus: FeedbackStatus) {
    if (!selectedFeedback.data || nextStatus === (selectedFeedback.data.status ?? 'open')) {
      return;
    }

    updateFeedback.mutate({
      feedbackId: selectedFeedback.data.id,
      input: { status: nextStatus },
    });
  }

  if (selectedFeedback.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading feedback details…</p>;
  }

  if (selectedFeedback.error) {
    return (
      <AuthFormError
        message={getApiErrorMessage(
          selectedFeedback.error,
          'Could not load this feedback right now.',
        )}
      />
    );
  }

  if (!selectedFeedback.data) {
    return <p className="text-sm text-muted-foreground">Feedback details unavailable.</p>;
  }

  const feedback = selectedFeedback.data;

  return (
    <div className="space-y-3">
      <AuthFormError
        message={
          updateFeedback.error
            ? getApiErrorMessage(
                updateFeedback.error,
                'Could not update this feedback status right now.',
              )
            : ''
        }
      />
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-medium text-foreground">{feedback.title}</p>
        <FeedbackStatusBadge status={feedback.status ?? 'open'} />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feedback.description || 'No description'}
      </p>
      <div className="space-y-1 text-xs text-muted-foreground">
        <p>User id: {feedback.user}</p>
        <p>Created: {formatDateTime(feedback.createdAt)}</p>
        <p>Updated: {formatDateTime(feedback.updatedAt)}</p>
      </div>
      <AuthField label="Status" name="adminFeedbackStatus" required>
        <Select
          value={feedbackStatus}
          onValueChange={(value) => {
            if (value === 'open' || value === 'in_progress' || value === 'resolved') {
              setFeedbackStatus(value);
              handleUpdateFeedbackStatus(value);
            }
          }}
          disabled={updateFeedback.isPending}
        >
          <SelectTrigger id="adminFeedbackStatus">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FEEDBACK_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {FEEDBACK_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AuthField>
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          disabled={updateFeedback.isPending || (feedback.status ?? 'open') === 'resolved'}
          onClick={() => handleUpdateFeedbackStatus('resolved')}
        >
          <CheckCircle2Icon className="size-3.5" />
          {updateFeedback.isPending ? 'Updating…' : 'Mark resolved'}
        </Button>
      </div>
    </div>
  );
}

function FeedbackRowActions({
  feedback,
  onView,
}: {
  feedback: FeedbackItem;
  onView: (feedbackId: string) => void;
}) {
  const deleteFeedback = useDeleteAdminFeedback();

  function handleDelete() {
    showAlertDialog({
      variant: 'destructive',
      title: 'Delete feedback',
      description: `Are you sure you want to delete “${feedback.title}”?`,
      details: 'This permanently removes the feedback item and cannot be undone.',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Delete feedback',
      loadingBtnText: 'Deleting...',
      confirmActionFn: () => deleteFeedback.mutateAsync(feedback.id),
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Actions for ${feedback.title}`}
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}
      >
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!w-44 !min-w-44">
        <DropdownMenuItem onClick={() => onView(feedback.id)}>
          <EyeIcon />
          View
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash2Icon />
          Delete feedback
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
        cell: ({ row }) => <span className="font-medium text-foreground">{row.original.title}</span>,
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
