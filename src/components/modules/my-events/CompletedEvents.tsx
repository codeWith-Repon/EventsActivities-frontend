import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import EventCard from '../Home/FeaturedEvent/EventCard';
import { IEvent } from '@/types/events.interface';

interface IActiveEventsProps {
  events: IEvent[];
  loading?: boolean;
}
const CompletedEvents = ({ events, loading }: IActiveEventsProps) => {
  return (
    <section className='space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold flex items-center gap-2'>
          <CheckCircle2 className='w-5 h-5 text-green-600' />
          Recently Completed
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
          You have no completed events
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

export default CompletedEvents;
