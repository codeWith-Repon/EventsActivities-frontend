'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { StatusBadgeCell } from '@/components/shared/cell/StatusBadgeCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import { Column } from '@/components/shared/ManagementTable';
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
    header: 'Contact',
    accessor: (user) => (
      <div className='flex flex-col'>
        <span className='text-sm'>
          {user.contactNumber ? user.contactNumber : '-'}
        </span>
      </div>
    ),
  },
  {
    header: 'Status',
    accessor: (user) => <StatusBadgeCell isDeleted={user.isDeleted} />,
  },
  {
    header: 'Address',
    accessor: (user) => (
      <span className='text-sm'>{user.address ? user.address : '-'}</span>
    ),
  },
  {
    header: 'DOB',
    accessor: (user) => {
      return user.dob ? (
        <DateCell date={user.dob} />
      ) : (
        <span className='text-sm'>N/A</span>
      );
    },
    sortKey: 'dob',
  },
  {
    header: 'Gender',
    accessor: (user) => <span className='text-sm'>{user.gender}</span>,
    sortKey: 'gender',
  },
  {
    header: 'Joined',
    accessor: (user) => <DateCell date={user.createdAt} />,
    sortKey: 'createdAt',
  },
];
