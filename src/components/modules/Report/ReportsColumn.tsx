'use client';

import { Column } from '@/components/shared/ManagementTable';
import { DateCell } from '@/components/shared/cell/DateCell';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IReport } from '@/types/report.interface';

export const reportColumn: Column<IReport>[] = [
  {
    header: 'Type',
    accessor: (r) => (
      <StatusBadge status={r.type} tone={r.type === 'EVENT' ? 'cyan' : 'violet'} />
    ),
  },
  {
    header: 'Reason',
    accessor: (r) => (
      <p className='max-w-xs truncate text-sm text-foreground' title={r.reason}>
        {r.reason}
      </p>
    ),
  },
  {
    header: 'Reporter',
    accessor: (r) => (
      <div className='min-w-0'>
        <p className='truncate text-sm text-foreground'>
          {r.reporter?.name || '—'}
        </p>
        <p className='truncate text-xs text-muted-foreground'>
          {r.reporter?.email}
        </p>
      </div>
    ),
  },
  {
    header: 'Status',
    accessor: (r) => <StatusBadge status={r.status} />,
  },
  {
    header: 'Reported',
    accessor: (r) => <DateCell date={r.createdAt} />,
    sortKey: 'createdAt',
  },
];
