import { useMemo, useRef, useState } from 'react';
import type { Table } from '@tanstack/react-table';

import DataTable from '@/components/data-table';
import { pageSize, pageSizeOptions } from '@/components/data-table/constants/pageOptions';
import { DataTableSkeleton } from '@/components/data-table/DataTableSkeleton';
import DTPagination from '@/components/data-table/DTPagination';
import { DTHeading } from '@/components/data-table/toolbar/DTHeading';
import { DTSearchBox } from '@/components/data-table/toolbar/DTSearchBox';
import { DTViewOptions } from '@/components/data-table/toolbar/DTViewOptions';
import { AuthFormError } from '@/features/auth/components/AuthField';
import { FeedbackBulkAction } from '@/features/feedback/components/FeedbackBulkAction';
import { FeedbackFormDialog } from '@/features/feedback/components/FeedbackFormDialog';
import { FeedbackHeaderControls } from '@/features/feedback/components/FeedbackHeaderControls';
import { getFeedbackColumns } from '@/features/feedback/components/feedback-columns';
import {
  feedbackColumnDisplayNames,
  getColumnKeys,
} from '@/features/feedback/constants/feedbackColumnDisplayNames';
import { feedbackColumnVisibilityState } from '@/features/feedback/constants/feedbackColumnVisibilityState';
import { useFeedbackList } from '@/features/feedback/hooks/use-feedback-list';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { useDataTable } from '@/hooks/useDataTable';
import { getApiErrorMessage } from '@/utils/axios';

const storageKey = 'feedback_dt_column_visibility';

export function FeedbackPanel() {
  const feedbackList = useFeedbackList();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const tableRef = useRef<Table<FeedbackItem> | null>(null);

  const searchableColumns = getColumnKeys(feedbackColumnDisplayNames);
  const columns = useMemo(
    () =>
      getFeedbackColumns({
        getTable: () => tableRef.current as Table<FeedbackItem>,
      }),
    [],
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: feedbackList.data ?? [],
    columns,
    pageSize,
    searchableColumns,
    columnVisibilityState: feedbackColumnVisibilityState,
    storageKey,
    getRowId: (row) => row.id,
  });

  tableRef.current = table;

  const loadError = feedbackList.error
    ? getApiErrorMessage(feedbackList.error, 'Could not load your feedback right now.')
    : '';

  return (
    <>
      <div className="m-0 space-y-4 rounded-lg">
        <div className="mb-3 flex items-center justify-between">
          <DTHeading
            heading="Your feedback"
            description="Share feedback and manage what you have already sent."
          />
          <FeedbackHeaderControls onAdd={() => setIsFormOpen(true)} />
        </div>
        <AuthFormError message={loadError} />
        {feedbackList.data ? (
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
            <FeedbackBulkAction table={table} />
          </>
        ) : feedbackList.isError ? null : (
          <DataTableSkeleton />
        )}
      </div>
      <FeedbackFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  );
}
