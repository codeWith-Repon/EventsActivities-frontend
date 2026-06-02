import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import HostsTable from '@/components/modules/Host/HostsTable';
import TablePagination from '@/components/shared/TablePagination';
import RefreshButton from '@/components/shared/RefreshButton';
import { queryStringFormatter } from '@/lib/formatter';
import { getHosts } from '@/services/host/host.service';
import { IHostListItem } from '@/types/host.interface';
import { BadgeCheck, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

const HostsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getHosts(queryString);

  const rows: IHostListItem[] = res?.data?.data ?? [];
  const meta = res?.data?.meta;
  const verifiedCount = rows.filter((h) => h.isVerified).length;

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='User management'
        title='Hosts'
        description='Verify hosts and review their performance.'
        actions={
          <div className='flex items-center gap-2'>
            {meta?.total != null && (
              <span className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-muted-foreground'>
                <Sparkles className='size-3.5 text-[var(--aurora-violet)]' />
                {meta.total} hosts
              </span>
            )}
            <span className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-muted-foreground'>
              <BadgeCheck className='size-3.5 text-emerald-400' />
              {verifiedCount} verified
            </span>
            <RefreshButton />
          </div>
        }
      />

      {!res?.success && rows.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title='Couldn’t load hosts'
          description='The API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          <HostsTable hosts={rows} />
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

export default HostsManagementPage;
