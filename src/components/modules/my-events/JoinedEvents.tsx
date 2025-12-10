import { Button } from '@/components/ui/button';
import { ArrowRight, Award } from 'lucide-react';
import EventCard from '../Home/FeaturedEvent/EventCard';
import { IEvent } from '@/types/events.interface';

const JoinedEvents = ({
  events,
  loading,
}: {
  events: IEvent[];
  loading?: boolean;
}) => {
  return (
    <section className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold flex items-center gap-2'>
          <Award className='w-5 h-5 text-red-400' />
          Joined Events
        </h2>
        <Button
          variant='ghost'
          className='text-sm text-muted-foreground hover:text-primary hover:bg-transparent cursor-pointer'
          disabled={events.length === 0}
        >
          View All <ArrowRight className='w-4 h-4 ml-1' />
        </Button>
      </div>

      {loading ? (
        <p className='text-muted-foreground text-center'>
          <span className='animate-pulse '>Loading...</span>
        </p>
      ) : events.length === 0 ? (
        <p className='text-muted-foreground text-center'>
          You are not joined to any events
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {events.slice(0, 4).map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default JoinedEvents;
