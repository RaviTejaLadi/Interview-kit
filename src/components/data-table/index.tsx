import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { flexRender, type Cell, type Row, type Table } from '@tanstack/react-table';

import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { DTHighlightChildren } from './DTHighlightText';

const EXPAND_ANIMATION_MS = 300;

type ColumnMeta = {
  skipSearchHighlight?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  accessorKey?: string;
};

type AnimatedExpandedRowProps = {
  isOpen: boolean;
  colSpan: number;
  children: ReactNode;
};

function AnimatedExpandedRow({ isOpen, colSpan, children }: AnimatedExpandedRowProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const frame = requestAnimationFrame(() => {
        setIsAnimatingOpen(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    setIsAnimatingOpen(false);
    const timeout = setTimeout(() => setShouldRender(false), EXPAND_ANIMATION_MS);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <TableRow className="border-t border-border bg-muted/30">
      <TableCell colSpan={colSpan} className="p-0">
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-in-out',
            isAnimatingOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mt-1 mb-3 w-full overflow-hidden rounded-[var(--radius-card)]">
              <div className="relative max-h-[60rem] overflow-y-auto p-2">{children}</div>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export type DataTableProps<TData> = {
  table: Table<TData>;
  onRowClick?: (row: TData) => void;
  className?: string;
  headerBgColor?: string;
  rowActiveBgColor?: string;
  rowUnActiveBgColor?: string;
  expandedRowId?: string | null;
  renderExpandedRow?: (row: Row<TData>) => ReactNode;
};

function DataTable<TData>({
  table,
  onRowClick,
  className = '',
  headerBgColor = 'bg-muted/60',
  rowActiveBgColor = 'bg-muted/30 hover:bg-muted/50',
  rowUnActiveBgColor = 'bg-card hover:bg-muted/40',
  expandedRowId = null,
  renderExpandedRow,
}: DataTableProps<TData>) {
  const searchTerm = String(table.getState().globalFilter ?? '');

  const shouldHighlightCell = (cell: Cell<TData, unknown>) => {
    const columnDef = cell.column.columnDef as {
      meta?: ColumnMeta;
      accessorKey?: string;
    };
    if (columnDef.meta?.skipSearchHighlight) {
      return false;
    }
    if (!columnDef.accessorKey) {
      return false;
    }
    return true;
  };

  const renderCellContent = (cell: Cell<TData, unknown>) => {
    const cellDef = cell.column.columnDef.cell;
    const context = cell.getContext();

    if (!cellDef) {
      return null;
    }

    const content =
      typeof cellDef === 'function' ? cellDef(context) : flexRender(cellDef, context);

    if (!searchTerm.trim() || !shouldHighlightCell(cell)) {
      return content;
    }

    return <DTHighlightChildren searchTerm={searchTerm}>{content}</DTHighlightChildren>;
  };

  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-[var(--radius-card)] border border-border bg-card shadow-[var(--shadow-card)]',
        className,
      )}
    >
      <UiTable className="w-full">
        <TableHeader className={cn('[&_tr]:border-border', headerBgColor)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as ColumnMeta | undefined;
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'text-xs font-medium text-muted-foreground',
                      meta?.headerClassName,
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, rowIndex) => {
              const tableRow = (
                <TableRow
                  key={renderExpandedRow ? undefined : row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    'transition-colors',
                    rowIndex % 2 === 1 ? rowActiveBgColor : rowUnActiveBgColor,
                    onRowClick ? 'cursor-pointer' : '',
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as ColumnMeta | undefined;
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn('px-4 py-3 text-sm', meta?.cellClassName)}
                      >
                        {renderCellContent(cell)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );

              if (!renderExpandedRow) {
                return tableRow;
              }

              return (
                <Fragment key={row.id}>
                  {tableRow}
                  <AnimatedExpandedRow
                    isOpen={expandedRowId === row.id}
                    colSpan={row.getVisibleCells().length}
                  >
                    {renderExpandedRow(row)}
                  </AnimatedExpandedRow>
                </Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center text-muted-foreground"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UiTable>
    </div>
  );
}

export default DataTable;
