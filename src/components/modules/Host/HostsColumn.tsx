'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import { Column } from '@/components/shared/ManagementTable';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IHostListItem } from '@/types/host.interface';
import { Star } from 'lucide-react';

export const hostColumn: Column<IHostListItem>[] = [
  {
    header: 'Host',
    accessor: (h) => (
      <UserInfoCell
        name={h.user?.name}
        email={h.user?.email}
        photo={h.user?.profileImage}
      />
    ),
  },
  {
    header: 'Verified',
    accessor: (h) => (
      <StatusBadge
        status={h.isVerified ? 'Verified' : 'Unverified'}
        tone={h.isVerified ? 'green' : 'slate'}
      />
    ),
  },
  {
    header: 'Events',
    accessor: (h) => (
      <span className='font-mono text-sm text-foreground'>
        {h._count?.events ?? h.totalEventsHosted ?? 0}
      </span>
    ),
  },
  {
    header: 'Rating',
    accessor: (h) => (
      <span className='inline-flex items-center gap-1 font-mono text-sm text-foreground'>
        <Star className='size-3.5 fill-[var(--aurora-amber)] text-[var(--aurora-amber)]' />
        {Number(h.rating ?? 0).toFixed(1)}
      </span>
    ),
    sortKey: 'rating',
  },
  {
    header: 'Joined',
    accessor: (h) => <DateCell date={h.createdAt} />,
    sortKey: 'createdAt',
  },
];
