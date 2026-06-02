import UserFilter from '@/components/modules/User/UsersFilter';
import UserTable from '@/components/modules/User/UsersTable';
import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatter';
import { getUsers } from '@/services/user/userManagements';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  // this page lists end-users; admins/hosts have their own pages
  if (!searchParamsObj.role) {
    searchParamsObj.role = 'USER';
  }

  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getUsers(queryString);
  const rows = res?.data?.data ?? [];
  const meta = res?.data?.meta;

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='User management'
        title='Users'
        description='Manage member accounts, access, and status.'
        actions={
          meta?.total != null ? (
            <span className='inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 font-mono text-xs text-muted-foreground'>
              <Users className='size-3.5 text-[var(--aurora-violet)]' />
              {meta.total} total
            </span>
          ) : undefined
        }
      />

      <UserFilter />

      {!res?.success && rows.length === 0 ? (
        <EmptyState
          icon={Users}
          title='Couldn’t load users'
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

export default UserManagementPage;
