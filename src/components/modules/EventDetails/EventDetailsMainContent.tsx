import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import { IEvent, IParticipant } from '@/types/events.interface';
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Share2,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import ActionCard from './ActionCard';

interface EventDetailsProps {
  event: IEvent;
  participants: IParticipant[];
}

const EventDetailsMainContent = ({
  event,
  participants,
}: EventDetailsProps) => {
  console.log(participants);

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='container mx-auto mt-8 max-w-6xl px-4 md:px-6'>
      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2 space-y-8'>
          {/* Description */}
          <section>
            <h2 className='mb-4 text-2xl font-bold text-slate-900'>
              About this Event
            </h2>
            <div className=' text-slate-600 whitespace-pre-line'>
              {event.description}
            </div>
          </section>

          {/* Event Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-6 sm:grid-cols-2'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Date
                </p>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-emerald-600' />
                  <span className='font-medium'>{formatDate(event.date)}</span>
                </div>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Time
                </p>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-emerald-600' />
                  <span className='font-medium'>{event.time}</span>
                </div>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Location
                </p>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-emerald-600' />
                  <span className='font-medium'>{event.location}</span>
                </div>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Participants
                </p>
                <div className='flex items-center gap-2'>
                  <Users className='h-4 w-4 text-emerald-600' />
                  <span className='font-medium'>
                    {event.totalParticipants} / {event.maxParticipants} (Min:{' '}
                    {event.minParticipants})
                  </span>
                </div>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Fee</p>
                <span className='text-lg font-bold text-emerald-600'>
                  {event.fee === 0 ? 'Free' : `$${event.fee.toFixed(2)}`}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Participants Section */}
          <section>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-slate-900'>
                Participants
              </h2>
              <Badge variant='outline' className='text-slate-600'>
                {event.totalParticipants} Joined
              </Badge>
            </div>

            {event.totalParticipants > 0 ? (
              <div className='grid gap-4 sm:grid-cols-2'>
                {participants.map((participant) => (
                  <Card
                    key={participant.id}
                    className='overflow-hidden transition-shadow hover:shadow-md py-0'
                  >
                    <div className='flex items-center gap-4 p-4'>
                      <Avatar>
                        <AvatarImage src={participant.user.profileImage} />
                        <AvatarFallback>
                          {participant?.user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1 overflow-hidden'>
                        <p className='truncate font-medium text-slate-900'>
                          {participant.user.name}
                        </p>
                        <div className='mt-1 flex gap-2'>
                          <Badge
                            variant='secondary'
                            className='text-[10px] h-5'
                          >
                            {participant.joinStatus}
                          </Badge>
                          <Badge
                            className={` text-[10px] h-5 ${
                              participant.paymentStatus === 'PAID'
                                ? 'bg-green-500/20 text-black border border-green-500'
                                : participant.paymentStatus === 'PENDING'
                                ? 'bg-red-500/20 text-red-900 border border-red-500'
                                : 'text-[10px] h-5'
                            }`}
                          >
                            {participant.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center'>
                <Users className='mb-4 h-12 w-12 text-slate-300' />
                <h3 className='text-lg font-medium text-slate-900'>
                  No participants yet
                </h3>
                <p className='text-slate-500'>
                  Be the first to join this event!
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Sidebar */}
        <div className='space-y-6'>
          {/* Host Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Hosted by</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14'>
                  <AvatarImage src={event?.host?.user?.profileImage} />
                  <AvatarFallback>
                    {event?.host?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-bold text-slate-900'>
                    {event?.host?.user?.name}
                  </p>
                  <div className='flex items-center gap-1 text-sm text-amber-500'>
                    <Star className='h-4 w-4 fill-current' />
                    <span className='font-medium'>{event.host.rating}</span>
                    <span className='text-slate-400'>
                      ({event.host.totalEventsHosted} events)
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-6 grid grid-cols-2 gap-4'>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={cn(
                      'mr-2 h-4 w-4',
                      isLiked && 'fill-red-500 text-red-500'
                    )}
                  />
                  {isLiked ? 'Saved' : 'Save'}
                </Button>
                <Button variant='outline' className='w-full'>
                  <Share2 className='mr-2 h-4 w-4' />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price & Action Card */}
          <ActionCard event={event} participants={participants} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsMainContent;
