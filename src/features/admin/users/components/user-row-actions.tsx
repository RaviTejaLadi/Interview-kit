import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteAdminUser } from '@/features/admin/users/hooks/use-delete-admin-user';
import type { AdminUser } from '@/features/admin/users/types/users';
import { cn } from '@/lib/utils';
import { showAlertDialog } from '@/stores/useAlertDialogStore';

export function UserRowActions({
  user,
  onEdit,
}: {
  user: AdminUser;
  onEdit: (userId: string) => void;
}) {
  const deleteUser = useDeleteAdminUser();

  function handleDelete() {
    showAlertDialog({
      variant: 'destructive',
      title: 'Delete user',
      description: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      details: 'This permanently removes the account and cannot be undone.',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Delete user',
      loadingBtnText: 'Deleting...',
      confirmActionFn: () => deleteUser.mutateAsync(user.id),
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Actions for ${user.firstName} ${user.lastName}`}
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}
      >
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!w-40 !min-w-40">
        <DropdownMenuItem onClick={() => onEdit(user.id)}>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash2Icon />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
