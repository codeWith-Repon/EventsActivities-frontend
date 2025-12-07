'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { IUserInfo } from '@/types/user.interface';
import { userColumn } from './UsersColumn';

interface UserTableProps {
  user: IUserInfo[];
}

const UserTable = ({ user }: UserTableProps) => {
  return (
    <>
      <ManagementTable
        data={user}
        columns={userColumn}
        getRowKey={(user) => user.id}
        emptyMessage='No user found'
      />
    </>
  );
};

export default UserTable;
