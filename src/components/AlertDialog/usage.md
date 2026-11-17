# Alert dialog

Already mounted in `App.tsx`. Call `showAlertDialog` from a component handler.

```jsx
import { Button } from '@/components/ui/button';
import { showAlertDialog } from '@/stores/useAlertDialogStore';

export function DeleteFlowButton({ flowId, onDelete }) {
  const handleDelete = () => {
    showAlertDialog({
      variant: 'destructive', // "destructive" | "warning" | "success" | "info" | "error"
      title: 'Delete Flow',
      description: 'Are you sure you want to delete this flow?',
      details: 'Deleting it will permanently remove access for all users and cannot be undone.',
      cancelBtnText: 'Cancel', // "" hides Cancel
      confirmBtnText: 'Delete',
      loadingBtnText: 'Deleting...',
      confirmActionFn: () => onDelete(flowId), // closes when this resolves; stays open if it throws
    });
  };

  return (
    <Button size="sm" variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
```
