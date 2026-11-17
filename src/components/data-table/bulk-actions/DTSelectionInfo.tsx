import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type DTSelectionInfoProps<TData> = {
  table: Table<TData>;
};

export function DTSelectionInfo<TData>({ table }: DTSelectionInfoProps<TData>) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="default">{table.getSelectedRowModel().rows.length}</Badge>
      <span className="text-sm text-muted-foreground">selected</span>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Clear selection"
        onClick={() => table.toggleAllRowsSelected(false)}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
