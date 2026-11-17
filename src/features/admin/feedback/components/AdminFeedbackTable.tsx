import { useEffect, useMemo, useRef, useState } from 'react';
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
import { AdminFeedbackBulkAction } from '@/features/admin/feedback/components/AdminFeedbackBulkAction';
import { FeedbackDetails } from '@/features/admin/feedback/components/FeedbackDetails';
import { getAdminFeedbackColumns } from '@/features/admin/feedback/components/feedback-columns';
import {
  feedbackColumnDisplayNames,
  getColumnKeys,
} from '@/features/admin/feedback/constants/feedbackColumnDisplayNames';
import { feedbackColumnVisibilityState } from '@/features/admin/feedback/constants/feedbackColumnVisibilityState';
import { useAdminFeedbacks } from '@/features/admin/feedback/hooks/use-admin-feedbacks';
import { AuthFormError } from '@/features/auth/components/AuthField';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { useDataTable } from '@/hooks/useDataTable';
import { getApiErrorMessage } from '@/utils/axios';

const storageKey = 'admin_feedback_dt_column_visibility';

export function AdminFeedbackTable() {
  const feedbacks = useAdminFeedbacks(true);
  const [viewingFeedbackId, setViewingFeedbackId] = useState<string | null>(null);
  const tableRef = useRef<Table<FeedbackItem> | null>(null);

  useEffect(() => {
    if (!viewingFeedbackId || !feedbacks.data) {
      return;
    }

    const stillExists = feedbacks.data.some((feedback) => feedback.id === viewingFeedbackId);
    if (!stillExists) {
      setViewingFeedbackId(null);
    }
  }, [feedbacks.data, viewingFeedbackId]);

  const searchableColumns = getColumnKeys(feedbackColumnDisplayNames);
  const columns = useMemo(
    () =>
      getAdminFeedbackColumns({
        getTable: () => tableRef.current as Table<FeedbackItem>,
        onView: setViewingFeedbackId,
      }),
    [],
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: feedbacks.data ?? [],
    columns,
    pageSize,
    searchableColumns,
    columnVisibilityState: feedbackColumnVisibilityState,
    storageKey,
    getRowId: (row) => row.id,
  });

  tableRef.current = table;

  const feedbackLoadError = feedbacks.error
    ? getApiErrorMessage(feedbacks.error, 'Could not load feedback right now.')
    : '';

  return (
    <>
      <div className="m-0 space-y-4 rounded-lg bg-card p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <DTHeading heading="Feedback" description="Review submissions and update their status." />
        </div>
        <AuthFormError message={feedbackLoadError} />
        {feedbacks.data ? (
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
                  columnDisplayNames={feedbackColumnDisplayNames}
                  storageKey={storageKey}
                />
              </div>
            </div>
            <DataTable table={table} />
            {table.getFilteredRowModel().rows.length > pageSize ? (
              <DTPagination table={table} pageSizeOptions={pageSizeOptions} />
            ) : null}
            <AdminFeedbackBulkAction table={table} />
          </>
        ) : feedbacks.isError ? null : (
          <DataTableSkeleton />
        )}
      </div>
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
    </>
  );
}
