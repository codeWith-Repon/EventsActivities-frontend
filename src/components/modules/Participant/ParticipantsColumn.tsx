'use client';

import { Column } from '@/components/shared/ManagementTable';
import { DateCell } from '@/components/shared/cell/DateCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IParticipantResponse } from '@/types/participant.interface';

export const participantColumn: Column<IParticipantResponse>[] = [
  {
    header: 'Participant',
    accessor: (p) => (
      <UserInfoCell
        name={p.user?.name}
        email={p.user?.email}
        photo={p.user?.profileImage}
      />
    ),
  },
  {
    header: 'Event',
    accessor: (p) => (
      <div className='min-w-0'>
        <p className='truncate text-sm text-foreground'>{p.event?.title}</p>
        <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
          {p.event?.category}
        </p>
      </div>
    ),
  },
  {
    header: 'Join status',
    accessor: (p) => <StatusBadge status={p.joinStatus} />,
  },
  {
    header: 'Payment',
    accessor: (p) => <StatusBadge status={p.paymentStatus} />,
  },
  {
    header: 'Joined',
    accessor: (p) => <DateCell date={p.createdAt} />,
    sortKey: 'createdAt',
  },
];
