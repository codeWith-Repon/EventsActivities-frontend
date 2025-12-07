import UserFilter from '@/components/modules/User/UsersFilter';
import UserTable from '@/components/modules/User/UsersTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatter';
import { getUsers } from '@/services/user/userManagements';
import { Suspense } from 'react';

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  if (!searchParamsObj.role) {
    searchParamsObj.role = 'USER';
  }

  const queryString = queryStringFormatter(searchParamsObj);
  const user = await getUsers(queryString);

  return (
    <div className='space-y-6'>
      <ManagementPageHeader
        title='User Management'
        description='Manage user accounts and permission'
      />
      <UserFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <UserTable user={user.data.data} />
        <TablePagination
          currentPage={user.data.meta.page || 1}
          totalPages={user.data.meta.totalPage}
        />
      </Suspense>
    </div>
  );
};

export default UserManagementPage;
