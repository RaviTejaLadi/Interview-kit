import type { Table } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type ColumnDisplayName = {
  key: string;
  value: string;
};

type DTViewOptionsProps<TData> = {
  table: Table<TData>;
  columnDisplayNames?: ColumnDisplayName[];
  storageKey?: string;
  enableColumnOrder?: boolean;
};

export function DTViewOptions<TData>({
  table,
  columnDisplayNames = [],
  storageKey = 'dt_column_visibility',
  enableColumnOrder = false,
}: DTViewOptionsProps<TData>) {
  const allowedColumnIds = new Set(columnDisplayNames.map((c) => c.key));
  const allowedColumns =
    table.getAllColumns().filter((column) => allowedColumnIds.has(column.id)) ?? [];

  const getOrderedColumnIds = () => {
    const allowedIds = allowedColumns.map((column) => column.id);
    const currentOrder = table.getState().columnOrder ?? [];
    if (!currentOrder.length) {
      return allowedIds;
    }

    const allowedIdSet = new Set(allowedIds);
    const ordered = currentOrder.filter((id) => allowedIdSet.has(id));
    allowedIds.forEach((id) => {
      if (!ordered.includes(id)) {
        ordered.push(id);
      }
    });
    return ordered;
  };

  const orderedColumns = enableColumnOrder
    ? getOrderedColumnIds()
        .map((id) => allowedColumns.find((column) => column.id === id))
        .filter((column): column is NonNullable<typeof column> => Boolean(column))
    : allowedColumns;

  const handleToggle = (columnId: string, value: boolean | 'indeterminate') => {
    const allColumns = table.getAllColumns();
    const currentPrefs: Record<string, boolean> = {};

    allColumns.forEach((col) => {
      currentPrefs[col.id] = col.id === columnId ? !!value : col.getIsVisible();
    });

    localStorage.setItem(storageKey, JSON.stringify(currentPrefs));

    const column = allColumns.find((col) => col.id === columnId);
    column?.toggleVisibility(!!value);
  };

  const moveColumn = (columnId: string, direction: number) => {
    const ids = getOrderedColumnIds();
    const index = ids.indexOf(columnId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= ids.length) {
      return;
    }

    const nextOrder = [...ids];
    const [moved] = nextOrder.splice(index, 1);
    nextOrder.splice(nextIndex, 0, moved);
    table.setColumnOrder(nextOrder);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline' }))}>
        <Eye className="mr-2 h-4 w-4" />
        View
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-55 border border-border bg-background">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{enableColumnOrder ? 'Columns' : 'Toggle columns'}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {orderedColumns.map((column, index) => {
            const display = columnDisplayNames.find((item) => item.key === column.id)?.value;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => handleToggle(column.id, value)}
              >
                {enableColumnOrder ? (
                  <span className="mr-2 flex flex-col">
                    <button
                      type="button"
                      className="flex h-4 w-4 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={index === 0}
                      aria-label={`Move ${display} left`}
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        moveColumn(column.id, -1);
                      }}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      className="flex h-4 w-4 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={index === orderedColumns.length - 1}
                      aria-label={`Move ${display} right`}
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        moveColumn(column.id, 1);
                      }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </span>
                ) : null}
                {display}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
