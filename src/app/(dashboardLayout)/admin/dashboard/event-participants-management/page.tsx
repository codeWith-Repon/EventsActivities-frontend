import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import ParticipantsFilter from '@/components/modules/Participant/ParticipantsFilter';
import ParticipantsTable from '@/components/modules/Participant/ParticipantsTable';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatter';
import getAllParticipant from '@/services/participant/getAllParticipant';
import { IParticipantResponse } from '@/types/participant.interface';
import { Users2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ParticipantsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAllParticipant(queryString);

  const rows: IParticipantResponse[] = res?.data?.data ?? [];
  const meta = res?.data?.meta;

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='Participation'
        title='Event participants'
        description='Every join request across the platform — filter, inspect, moderate.'
        actions={
          meta?.total != null ? (
            <span className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-muted-foreground'>
              <Users2 className='size-3.5 text-[var(--aurora-violet)]' />
              {meta.total} records
            </span>
          ) : undefined
        }
      />

      <ParticipantsFilter />

      {!res?.success && rows.length === 0 ? (
        <EmptyState
          icon={Users2}
          title='Couldn’t load participants'
          description='The API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          <ParticipantsTable rows={rows} />
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

export default ParticipantsManagementPage;
