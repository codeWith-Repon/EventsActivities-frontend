import UserFilter from '@/components/modules/User/UsersFilter';
import UserTable from '@/components/modules/User/UsersTable';
import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatter';
import { getUsers } from '@/services/user/userManagements';
import { Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

const AdminsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  if (!searchParamsObj.role) {
    searchParamsObj.role = 'ADMIN';
  }

  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getUsers(queryString);
  const rows = res?.data?.data ?? [];
  const meta = res?.data?.meta;

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='User management'
        title='Admins'
        description='Manage administrator accounts and platform roles.'
        actions={
          meta?.total != null ? (
            <span className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-muted-foreground'>
              <Shield className='size-3.5 text-[var(--aurora-violet)]' />
              {meta.total} admins
            </span>
          ) : undefined
        }
      />

      <UserFilter />

      {!res?.success && rows.length === 0 ? (
        <EmptyState
          icon={Shield}
          title='Couldn’t load admins'
          description='The API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          <UserTable user={rows} />
          {meta && (
            <TablePagination
              currentPage={meta.page || 1}
              totalPages={meta.totalPage || 1}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminsManagementPage;
