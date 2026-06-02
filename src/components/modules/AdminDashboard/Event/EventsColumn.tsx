'use client';

import { Column } from '@/components/shared/ManagementTable';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IEvent } from '@/types/events.interface';
import { formatDate, formatTimeTo12Hour } from '@/lib/formatter';
import { userPlaceholderImage } from '@/assets';
import Image from 'next/image';

const fee = (n: number) => (n === 0 ? 'Free' : `৳ ${n}`);

export const eventColumn: Column<IEvent>[] = [
  {
    header: 'Event',
    accessor: (e) => (
      <div className='flex items-center gap-3'>
        <div className='relative size-10 shrink-0 overflow-hidden rounded-lg border border-border'>
          <Image
            src={e.images?.[0] || userPlaceholderImage}
            alt={e.title}
            fill
            sizes='40px'
            className='object-cover'
          />
        </div>
        <div className='min-w-0'>
          <p className='truncate font-medium text-foreground'>{e.title}</p>
          <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
            {e.category}
          </p>
        </div>
      </div>
    ),
    sortKey: 'title',
  },
  {
    header: 'Host',
    accessor: (e) => (
      <span className='text-sm text-muted-foreground'>
        {e.host?.user?.name || '—'}
      </span>
    ),
  },
  {
    header: 'Date',
    accessor: (e) => (
      <div className='text-sm'>
        <p className='text-foreground'>{formatDate(e.date)}</p>
        <p className='font-mono text-[11px] text-muted-foreground'>
          {formatTimeTo12Hour(e.time)}
        </p>
      </div>
    ),
    sortKey: 'date',
  },
  {
    header: 'Fee',
    accessor: (e) => (
      <span className='font-mono text-sm text-foreground'>{fee(e.fee)}</span>
    ),
    sortKey: 'fee',
  },
  {
    header: 'Capacity',
    accessor: (e) => (
      <span className='font-mono text-sm text-muted-foreground'>
        {e.totalParticipants ?? 0}/{e.maxParticipants}
      </span>
    ),
  },
  {
    header: 'Status',
    accessor: (e) => <StatusBadge status={e.status} />,
    sortKey: 'status',
  },
];
