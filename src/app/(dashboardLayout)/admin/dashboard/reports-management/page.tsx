import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import ReportsFilter from '@/components/modules/Report/ReportsFilter';
import ReportsTable from '@/components/modules/Report/ReportsTable';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatter';
import { getReports } from '@/services/report/report.service';
import { IReport } from '@/types/report.interface';
import { Flag } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ReportsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getReports(queryString);

  const rows: IReport[] = res?.data?.data ?? [];
  const meta = res?.data?.meta;
  const pending = rows.filter((r) => r.status === 'PENDING').length;

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='Moderation'
        title='Content reports'
        description='Review and resolve reports submitted against events and ratings.'
        actions={
          <span className='inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 font-mono text-xs text-muted-foreground'>
            <Flag className='size-3.5 text-amber-600' />
            {pending} pending on page
          </span>
        }
      />

      <ReportsFilter />

      {!res?.success && rows.length === 0 ? (
        <EmptyState
          icon={Flag}
          title='Couldn’t load reports'
          description='The API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          <ReportsTable rows={rows} />
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

export default ReportsManagementPage;
