import type { Table } from '@tanstack/react-table';

import { DTBulkActions } from '@/components/data-table/bulk-actions/DTBulkActions';
import { DTSelectionInfo } from '@/components/data-table/bulk-actions/DTSelectionInfo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDeleteFeedback } from '@/features/feedback/hooks/use-delete-feedback';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { showAlertDialog } from '@/stores/useAlertDialogStore';

type FeedbackBulkActionProps = {
  table: Table<FeedbackItem>;
};

export function FeedbackBulkAction({ table }: FeedbackBulkActionProps) {
  const deleteFeedback = useDeleteFeedback();
  const selectedItems = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original)
    .filter((item) => item.id);

  if (!selectedItems.length) {
    return null;
  }

  const handleDelete = () => {
    const count = selectedItems.length;
    showAlertDialog({
      variant: 'destructive',
      title: 'Delete feedback',
      description: `Are you sure you want to delete ${count} selected ${count > 1 ? 'items' : 'item'}?`,
      details: 'This action cannot be undone.',
      cancelBtnText: 'No',
      confirmBtnText: 'Yes',
      loadingBtnText: 'Deleting...',
      confirmActionFn: async () => {
        await Promise.all(selectedItems.map((item) => deleteFeedback.mutateAsync(item.id)));
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
