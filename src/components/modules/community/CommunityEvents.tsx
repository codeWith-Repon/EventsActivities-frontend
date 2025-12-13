import { IEvent } from '@/types/events.interface';
import EventCard from '../Home/FeaturedEvent/EventCard';
import { Calendar } from 'lucide-react';

interface HikingCommunityProps {
  events: IEvent[];
  category: string;
}
const CommunityEvents = ({ events, category }: HikingCommunityProps) => {
  return (
    <div
      className={`lg:col-span-2 space-y-8 ${
        events.length > 0 ? '' : 'lg:col-span-3'
      }`}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-slate-900'>
          Upcoming {category} Events
        </h2>
      </div>

      {events.length > 0 ? (
        <div className='grid gap-6 sm:grid-cols-2'>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className='rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center'>
          <Calendar className='mx-auto mb-4 h-12 w-12 text-slate-300' />
          <h3 className='text-lg font-medium text-slate-900'>
            No upcoming events
          </h3>
          <p className='text-slate-500'>
            Check back later for new upcoming events.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityEvents;
