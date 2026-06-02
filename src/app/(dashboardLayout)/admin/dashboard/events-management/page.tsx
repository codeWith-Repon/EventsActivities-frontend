import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import EventsFilter from '@/components/modules/AdminDashboard/Event/EventsFilter';
import EventsTable from '@/components/modules/AdminDashboard/Event/EventsTable';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatter';
import { getAllEvent } from '@/services/events/getAllEvent';
import { getAllCategory } from '@/services/events/eventAdmin';
import { IEvent } from '@/types/events.interface';
import { CalendarRange } from 'lucide-react';

export const dynamic = 'force-dynamic';

const EventsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const [res, categoryRes] = await Promise.all([
    getAllEvent(queryString),
    getAllCategory(),
  ]);

  const rows: IEvent[] = res?.data?.data ?? [];
  const meta = res?.data?.meta;
  const categories: string[] = categoryRes?.data ?? [];

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='Events management'
        title='Events'
        description='Browse, inspect, and moderate platform events.'
        actions={
          meta?.total != null ? (
            <span className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-muted-foreground'>
              <CalendarRange className='size-3.5 text-[var(--aurora-violet)]' />
              {meta.total} events
            </span>
          ) : undefined
        }
      />

      <EventsFilter categories={categories} />

      {!res?.success && rows.length === 0 ? (
        <EmptyState
          icon={CalendarRange}
          title='Couldn’t load events'
          description='The API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          <EventsTable events={rows} />
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

export default EventsManagementPage;
