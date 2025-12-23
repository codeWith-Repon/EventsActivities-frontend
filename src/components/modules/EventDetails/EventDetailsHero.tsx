'use client';

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/formatter';
import { IEvent, IParticipant } from '@/types/events.interface';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import EventDetailsMainContent from './EventDetailsMainContent';

interface EventDetailsProps {
  event: IEvent;
  participants: {
    data: IParticipant[];
  };
}
const EventDetailsHero = ({ event, participants }: EventDetailsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + event.images.length) % event.images.length
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className='relative h-[400px] w-full overflow-hidden bg-slate-900'>
        <div className='absolute inset-0'>
          <Image
            src={event.images[currentImageIndex]}
            alt={event.title}
            fill
            className='object-cover opacity-80 transition-opacity duration-500'
          />
          <div className='absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent' />
        </div>

        {/* Image Navigation */}
        {event.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 cursor-pointer disabled:bg-gray-200/20 disabled:text-gray-200'
              disabled={event.images.length === 1}
            >
              <ChevronLeft className='h-6 w-6' />
            </button>
            <button
              onClick={nextImage}
              className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm  hover:bg-black/50 cursor-pointer disabled:bg-gray-200/20 disabled:text-gray-200'
              disabled={event.images.length === 1}
            >
              <ChevronRight className='h-6 w-6' />
            </button>
          </>
        )}

        {/* Hero Content */}
        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-12'>
          <div className='container mx-auto max-w-6xl'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-3'>
                <Badge
                  variant='secondary'
                  className='bg-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                >
                  {event.category}
                </Badge>
                <Badge
                  className={
                    event.status === 'OPEN'
                      ? 'bg-green-500/20 text-green-100 border border-green-500'
                      : event.status === 'CANCELLED'
                      ? 'bg-red-500/20 text-red-100 border border-red-500'
                      : event.status === 'OPEN'
                      ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500'
                      : ''
                  }
                >
                  {event.status}
                </Badge>
              </div>

              <h1 className='text-3xl font-bold text-white md:text-5xl'>
                {event.title}
              </h1>

              <div className='flex flex-wrap items-center gap-4 text-slate-300'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5 text-emerald-400' />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5 text-emerald-400' />
                  <span>{event.time}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-5 w-5 text-emerald-400' />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <EventDetailsMainContent
        event={event}
        participants={participants?.data || []}
      />
    </div>
  );
};

export default EventDetailsHero;
