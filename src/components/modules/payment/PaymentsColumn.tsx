'use client';

import { Column } from '@/components/shared/ManagementTable';
import { DateCell } from '@/components/shared/cell/DateCell';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IPaymentListItem } from '@/types/payment.interface';

export const paymentColumn: Column<IPaymentListItem>[] = [
  {
    header: 'Transaction',
    accessor: (p) => (
      <span className='font-mono text-xs text-muted-foreground'>
        {p.transactionId || p.id}
      </span>
    ),
  },
  {
    header: 'Payer',
    accessor: (p) => (
      <div className='min-w-0'>
        <p className='truncate text-sm text-foreground'>{p.user?.name || '—'}</p>
        <p className='truncate text-xs text-muted-foreground'>{p.user?.email}</p>
      </div>
    ),
  },
  {
    header: 'Event',
    accessor: (p) => (
      <span className='truncate text-sm text-muted-foreground'>
        {p.event?.title || '—'}
      </span>
    ),
  },
  {
    header: 'Amount',
    accessor: (p) => (
      <span className='font-mono text-sm font-medium text-foreground'>
        ৳ {new Intl.NumberFormat('en-US').format(p.amount ?? 0)}
      </span>
    ),
    sortKey: 'amount',
  },
  {
    header: 'Status',
    accessor: (p) => <StatusBadge status={p.paymentStatus} />,
  },
  {
    header: 'Date',
    accessor: (p) => <DateCell date={p.createdAt} />,
    sortKey: 'createdAt',
  },
];
