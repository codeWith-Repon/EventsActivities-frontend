'use client';

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  Loader2,
  LucideIcon,
  MoreHorizontal,
  Trash,
} from 'lucide-react';
import React, { useTransition } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  sortKey?: string;
}

export interface RowAction<T> {
  label: string;
  icon?: LucideIcon;
  onClick: (row: T) => void;
  variant?: 'default' | 'destructive';
  /** hide this action for specific rows */
  show?: (row: T) => boolean;
}

interface ManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  /** extra row actions, rendered between edit and delete */
  actions?: RowAction<T>[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

function ManagementTable<T>({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  actions = [],
  getRowKey,
  emptyMessage = 'No records found.',
  isRefreshing = false,
}: ManagementTableProps<T>) {
  const hasActions = !!(onView || onEdit || onDelete || actions.length);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSortBy = searchParams.get('sortBy') || '';
  const currentSortOrder = searchParams.get('sortOrder') || 'desc';

  const handleSort = (sortKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentSortBy === sortKey) {
      params.set('sortOrder', currentSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sortBy', sortKey);
      params.set('sortOrder', 'desc');
    }
    params.set('page', '1');
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const getSortIcon = (sortKey?: string) => {
    if (!sortKey) return null;
    if (currentSortBy !== sortKey)
      return <ArrowUpDown className='ml-1.5 size-3.5 opacity-50' />;
    return currentSortOrder === 'asc' ? (
      <ArrowUp className='ml-1.5 size-3.5 text-[var(--aurora-violet)]' />
    ) : (
      <ArrowDown className='ml-1.5 size-3.5 text-[var(--aurora-violet)]' />
    );
  };

  return (
    <div className='glass relative overflow-hidden rounded-[var(--radius)]'>
      {isRefreshing && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[2px]'>
          <div className='flex flex-col items-center gap-2'>
            <Loader2 className='size-6 animate-spin text-[var(--aurora-violet)]' />
            <p className='text-sm text-muted-foreground'>Refreshing…</p>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className='border-white/10 hover:bg-transparent'>
            {columns.map((column, colIndex) => (
              <TableHead
                key={colIndex}
                className={cn(
                  'h-11 font-mono text-[11px] uppercase tracking-wider text-muted-foreground',
                  column.className
                )}
              >
                {column.sortKey ? (
                  <span
                    onClick={() => handleSort(column.sortKey!)}
                    className='flex cursor-pointer select-none items-center transition-colors hover:text-foreground'
                  >
                    {column.header}
                    {getSortIcon(column.sortKey)}
                  </span>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
            {hasActions && (
              <TableHead className='w-[60px] text-right font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow className='hover:bg-transparent'>
              <TableCell
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className='py-12 text-center text-sm text-muted-foreground'
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={getRowKey(item)}
                className='border-white/[0.06] transition-colors hover:bg-white/[0.03]'
              >
                {columns.map((col, idx) => (
                  <TableCell key={idx} className={cn('py-3', col.className)}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : String(item[col.accessor])}
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          aria-label='Row actions'
                          className='grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground'
                        >
                          <MoreHorizontal className='size-4' />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='glass-strong min-w-[10rem]'
                      >
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(item)}>
                            <Eye className='mr-2 size-4' />
                            View
                          </DropdownMenuItem>
                        )}
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(item)}>
                            <Edit className='mr-2 size-4' />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {actions
                          .filter((a) => !a.show || a.show(item))
                          .map((action) => {
                            const Icon = action.icon;
                            return (
                              <DropdownMenuItem
                                key={action.label}
                                onClick={() => action.onClick(item)}
                                className={cn(
                                  action.variant === 'destructive' &&
                                    'text-destructive focus:text-destructive'
                                )}
                              >
                                {Icon && <Icon className='mr-2 size-4' />}
                                {action.label}
                              </DropdownMenuItem>
                            );
                          })}
                        {onDelete && (
                          <>
                            {(onView || onEdit || actions.length > 0) && (
                              <DropdownMenuSeparator />
                            )}
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              className='text-destructive focus:text-destructive'
                            >
                              <Trash className='mr-2 size-4' />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ManagementTable;
