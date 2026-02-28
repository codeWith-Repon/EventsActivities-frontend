'use client';

import { Column } from '@/components/shared/ManagementTable';
import { DateCell } from '@/components/shared/cell/DateCell';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IEvent } from '@/types/events.interface';

const STATUS_VARIANTS: Record<string, string> = {
  OPEN: 'bg-green-500/10 text-green-600 border-green-500/20',
  FULL: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  CANCELLED: 'bg-red-500/10 text-red-600 border-red-500/20',
  COMPLETED: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
};

export const eventColumns: Column<IEvent>[] = [
  {
    header: 'Event Details',
    accessor: (event) => (
      <div className='flex flex-col'>
        <span className='font-medium text-sm line-clamp-1'>{event.title}</span>
        <span className='text-[10px] text-muted-foreground uppercase tracking-wider'>
          {event.location}
        </span>
      </div>
    ),
    sortKey: 'title',
  },
  {
    header: 'Category',
    accessor: (event) => (
      <Badge
        variant='secondary'
        className='font-normal px-2 py-0 h-5 text-[11px]'
      >
        {event.category}
      </Badge>
    ),
    sortKey: 'category',
  },
  {
    header: 'Fee',
    accessor: (event) => (
      <span
        className={cn(
          'text-sm font-semibold',
          event.fee === 0 ? 'text-green-600' : 'text-foreground',
        )}
      >
        {event.fee === 0 ? 'Free' : `৳${event.fee.toLocaleString()}`}
      </span>
    ),
    sortKey: 'fee',
  },
  {
    header: 'Status',
    accessor: (event) => (
      <Badge
        className={cn(
          'font-medium shadow-none border',
          STATUS_VARIANTS[event.status],
        )}
      >
        {event.status}
      </Badge>
    ),
    sortKey: 'status',
  },
  {
    header: 'Created At',
    accessor: (event) => <DateCell date={event.createdAt} />,
    sortKey: 'createdAt',
  },
];
