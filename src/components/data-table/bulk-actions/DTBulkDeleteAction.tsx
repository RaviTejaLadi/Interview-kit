import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type DTBulkDeleteActionProps = ComponentProps<typeof Button>;

export function DTBulkDeleteAction({ className, ...props }: DTBulkDeleteActionProps) {
  return (
    <Button variant="destructive" size="sm" className={cn(className)} {...props}>
      Delete
    </Button>
  );
}
