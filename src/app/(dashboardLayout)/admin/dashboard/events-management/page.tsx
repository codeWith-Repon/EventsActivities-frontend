import EventFilter from '@/components/modules/AdminDashboard/Event/EventFilter';
import EventTableSection from '@/components/modules/AdminDashboard/Event/EventTable';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatter';
import { getAllEvent } from '@/services/events/getAllEvent';
import { Suspense } from 'react';

export default async function EventManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const response = await getAllEvent(queryString);

  return (
    <div className='space-y-6'>
      <ManagementPageHeader
        title='Event Management'
        description='Manage platform events, monitor fees, and update statuses.'
      />

      <EventFilter />

      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <EventTableSection events={response?.data?.data} />3
        <TablePagination
          currentPage={response?.data?.meta?.page || 1}
          totalPages={response?.data?.meta?.totalPage || 1}
        />
      </Suspense>
    </div>
  );
}
