import EventsHeader from '@/components/modules/Events/EventsHeader';
import EventCard from '@/components/modules/Home/FeaturedEvent/EventCard';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatter';
import getAllCategory from '@/services/events/getAllCategory';
import { getAllEvent } from '@/services/events/getAllEvent';
import { IEvent } from '@/types/events.interface';
import { CalendarX2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Events',
  description:
    'Browse all upcoming events, activities, and community gatherings. Find events by category, location, and date to join with like-minded people.',
};

const EventsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const [eventsRes, categoriesRes] = await Promise.all([
    getAllEvent(queryString),
    getAllCategory(),
  ]);

  const events = eventsRes?.data?.data || [];
  const categories = categoriesRes?.data || [];
  const meta = eventsRes?.data?.meta || {};

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10'>
      <EventsHeader categories={categories} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {events &&
          events.map((event: IEvent) => (
            <EventCard key={event.id} event={event} />
          ))}

        {!events.length && (
          <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center py-10 md:py-25 space-y-2'>
            <div className='flex items-center justify-center'>
              <CalendarX2 className='w-25 h-25 text-muted-foreground' />
            </div>
            <h3 className='text-lg text-muted-foreground'> No events found</h3>

            <div className='flex flex-col gap-1'>
              <p className='text-muted-foreground text-sm'>
                No events match your selected filters.
              </p>
              <p className='text-muted-foreground text-sm'>
                Try adjusting your search criteria.
              </p>
            </div>
          </div>
        )}
      </div>
      {meta.total > 0 && (
        <div className='mt-8'>
          <TablePagination
            currentPage={meta.page}
            totalPages={meta.totalPage}
          />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
