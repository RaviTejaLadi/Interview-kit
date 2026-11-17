import { useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';

export type UseDataTableOptions<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableColumnVisibility?: boolean;
  enablePagination?: boolean;
  manualSorting?: boolean;
  pageSize?: number;
  searchableColumns?: string[];
  columnVisibilityState?: VisibilityState;
  storageKey?: string;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
};

export function useDataTable<TData>({
  data,
  columns,
  enableSorting = true,
  enableFiltering = true,
  enableColumnVisibility = true,
  enablePagination = true,
  manualSorting = false,
  pageSize = 10,
  searchableColumns = [],
  columnVisibilityState = {},
  storageKey = 'dt_column_visibility',
  sorting: controlledSorting,
  onSortingChange,
  getRowId,
}: UseDataTableOptions<TData>) {
  const [uncontrolledSorting, setUncontrolledSorting] = useState<SortingState>([]);
  const isSortingControlled = controlledSorting !== undefined;
  const sorting = isSortingControlled ? controlledSorting : uncontrolledSorting;
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    if (!isSortingControlled) {
      setUncontrolledSorting(updater);
    }
    onSortingChange?.(updater);
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    try {
      const savedPrefs = localStorage.getItem(storageKey);
      if (savedPrefs) {
        return JSON.parse(savedPrefs) as VisibilityState;
      }
    } catch (error) {
      console.error('Error loading column visibility:', error);
    }
    return columnVisibilityState;
  });

  const handleColumnVisibilityChange: OnChangeFn<VisibilityState> = (updater) => {
    setColumnVisibility((prev) => {
      const newVisibility = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(storageKey, JSON.stringify(newVisibility));
      } catch (error) {
        console.error('Error saving column visibility:', error);
      }
      return newVisibility;
    });
  };

  const globalFilterFn = (row: Row<TData>, _columnId: string, filterValue: unknown) => {
    if (!searchableColumns.length) return true;
    if (!filterValue) return true;
    const safeValue = String(filterValue).toLowerCase();
    return searchableColumns.some((colId) => {
      const cellValue = row.getValue(colId);
      return cellValue?.toString().toLowerCase().includes(safeValue);
    });
  };

  const table = useReactTable({
    data,
    columns,
    getRowId,
    enableSorting,
    enableHiding: enableColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting && !manualSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    manualSorting,
    onSortingChange: handleSortingChange,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    globalFilterFn,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      pagination,
      rowSelection,
    } as {
      sorting: SortingState;
      globalFilter: string;
      columnVisibility: VisibilityState;
      pagination: PaginationState;
      rowSelection: RowSelectionState;
      columnFilters?: ColumnFiltersState;
    },
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
  };
}
