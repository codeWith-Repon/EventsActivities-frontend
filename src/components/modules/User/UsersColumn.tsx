'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import { Column } from '@/components/shared/ManagementTable';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IUserInfo } from '@/types/user.interface';

export const userColumn: Column<IUserInfo>[] = [
  {
    header: 'User',
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.profileImage}
      />
    ),
    sortKey: 'name',
  },
  {
    header: 'Role',
    accessor: (user) => <StatusBadge status={user.role} />,
  },
  {
    header: 'Status',
    accessor: (user) => <StatusBadge status={user.status ?? 'ACTIVE'} />,
  },
  {
    header: 'Contact',
    accessor: (user) => (
      <span className='text-sm text-muted-foreground'>
        {user.contactNumber || '—'}
      </span>
    ),
  },
  {
    header: 'Gender',
    accessor: (user) => (
      <span className='text-sm capitalize text-muted-foreground'>
        {user.gender ? user.gender.toLowerCase() : '—'}
      </span>
    ),
    sortKey: 'gender',
  },
  {
    header: 'Joined',
    accessor: (user) => <DateCell date={user.createdAt} />,
    sortKey: 'createdAt',
  },
];
