'use client';

import { ArrowRight } from 'lucide-react';
import { IEvent } from '@/types/events.interface';
import EventCard from './EventCard';
import { useRouter } from 'next/navigation';

const FeaturedEvents = ({ events }: { events: IEvent[] }) => {
  const router = useRouter();
  return (
    <section className='py-20 bg-linear-to-r from-gray-50 to-gray-100'>
      <div className='container-custom'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-4'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold mb-3'>
              Events Near You
            </h2>
            <p className='text-muted-foreground text-lg'>
              Join these upcoming activities in your area
            </p>
          </div>
          {/* <div className='flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto'>
            <button className='px-4 py-2 rounded-full bg-white border border-gray-200 text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors whitespace-nowrap'>
              Today
            </button>
            <button className='px-4 py-2 rounded-full bg-white border border-gray-200 text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors whitespace-nowrap'>
              This Week
            </button>
            <button className='px-4 py-2 rounded-full bg-primary text-white font-medium shadow-md whitespace-nowrap'>
              This Weekend
            </button>
          </div> */}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {events.slice(0, 4).map((event, index) => (
            <EventCard event={event} key={event.id} index={index} />
          ))}
        </div>

        <div className='mt-12 text-center'>
          <button
            className='btn-secondary inline-flex items-center gap-2 cursor-pointer'
            onClick={() => router.push('/events')}
          >
            See More Events <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
