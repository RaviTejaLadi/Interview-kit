import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const COLUMN_WIDTHS = ['w-28', 'w-40', 'w-24', 'w-32', 'w-14'];

type DataTableSkeletonProps = {
  columnCount?: number;
  rowCount?: number;
  className?: string;
};

export function DataTableSkeleton({
  columnCount = 5,
  rowCount = 6,
  className,
}: DataTableSkeletonProps) {
  const columns = Array.from({ length: columnCount }, (_, index) => index);

  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-(--radius-card) border border-border bg-card shadow-(--shadow-card)',
        className,
      )}
    >
      <Table className="w-full">
        <TableHeader className="bg-muted/60 [&_tr]:border-border">
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => (
              <TableHead key={column} className="text-xs font-medium text-muted-foreground">
                <Skeleton className={cn('h-3', COLUMN_WIDTHS[column % COLUMN_WIDTHS.length])} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }, (_, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                'transition-colors',
                rowIndex % 2 === 1 ? 'bg-muted/30 hover:bg-muted/30' : 'bg-card hover:bg-card',
              )}
            >
              {columns.map((column) => (
                <TableCell key={column} className="px-4 py-3 text-sm">
                  <Skeleton
                    className={cn('h-4', COLUMN_WIDTHS[(column + rowIndex) % COLUMN_WIDTHS.length])}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
