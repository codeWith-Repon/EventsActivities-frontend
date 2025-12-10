import EventCard from '@/components/modules/Home/FeaturedEvent/EventCard';
import { queryStringFormatter } from '@/lib/formatter';
import { getAllEvent } from '@/services/events/getAllEvent';
import { IEvent } from '@/types/events.interface';

const EventsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const response = await getAllEvent(queryString);

  const { data: events } = response.data;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
        {events &&
          events.map((event: IEvent) => (
            <EventCard key={event.id} event={event} />
          ))}
      </div>
    </div>
  );
};

export default EventsPage;
