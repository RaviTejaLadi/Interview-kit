import { EllipsisVerticalIcon, Trash2Icon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteFeedback } from '@/features/feedback/hooks/use-delete-feedback';
import type { FeedbackItem } from '@/features/feedback/types/feedback';
import { cn } from '@/lib/utils';
import { showAlertDialog } from '@/stores/useAlertDialogStore';

export function FeedbackRowActions({ feedback }: { feedback: FeedbackItem }) {
  const deleteFeedback = useDeleteFeedback();

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
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash2Icon />
          Delete feedback
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
