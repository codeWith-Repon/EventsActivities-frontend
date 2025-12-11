'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/hook/useUser';
import { joinEvent } from '@/services/participant/participant.service';
import { IEvent, IParticipant } from '@/types/events.interface';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface ActionCardProps {
  event: IEvent;
  participants: IParticipant[];
}
const ActionCard = ({ event, participants }: ActionCardProps) => {
  const { user, loading } = useUser();
  const [joining, setJoining] = useState(false);
  const router = useRouter();

  const isFull = event.totalParticipants === event.maxParticipants;
  const isCompleted = event.status === 'COMPLETED';
  const isCancelled = event.status === 'CANCELLED';
  const canJoin = event.status === 'OPEN' && !isFull;
  const isFree = event.fee === 0;

  const hasJoined = participants.some((p) => p.userId === user?.id);
  const eventOwner = event.host.userId === user?.id;

  const handleJoin = async () => {
    try {
      setJoining(true);
      const result = await joinEvent(event.id!);
      if (!result.success) {
        toast.error(result.message || 'Failed to join event');
        return;
      }

      if (isFree && result.success) {
        toast.success("You've successfully joined the event");
        router.push(`/events`);
      }
      const eventParticipantId = result.data.eventParticipant.id;

      router.push(`/payment?slug=${event.slug}&id=${eventParticipantId}`);
    } catch (error) {
      console.log(error);
      toast.error('Failed to join event');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div>
      <Card className='border-emerald-100 shadow-lg'>
        <CardContent className='p-6'>
          <div className='mb-6 text-center'>
            <p className='text-sm font-medium text-slate-500'>Total Fee</p>
            <p className='text-4xl font-bold text-emerald-600'>
              {event.fee === 0 ? 'Free' : `$${event.fee.toFixed(2)}`}
            </p>
          </div>

          {loading ? (
            <div className=' flex items-center justify-center'>
              <Loader className='animate-spin w-4 h-4' />
            </div>
          ) : hasJoined ? (
            <div className='rounded-lg bg-emerald-50 p-4 text-center'>
              <p className='font-medium text-emerald-800'>
                You&apos;ve already joined this event
              </p>
              {/* <Button
                className='mt-2 w-full'
                variant='outline'
                onClick={() => navigate('/payment/result?status=PAID')}
              >
                View Ticket
              </Button> */}
            </div>
          ) : (
            <Button
              className='w-full bg-emerald-600 hover:bg-emerald-700 text-lg h-12 cursor-pointer'
              disabled={
                !canJoin ||
                isFull ||
                isCompleted ||
                isCancelled ||
                eventOwner ||
                joining
              }
              onClick={handleJoin}
            >
              {joining && <Loader className='animate-spin w-4 h-4 mr-2' />}
              {eventOwner
                ? 'You are hosting this event'
                : isFull
                ? 'Event Full'
                : isCompleted
                ? 'Event Completed'
                : isCancelled
                ? 'Event Cancelled'
                : isFree
                ? 'Join Free'
                : 'Join & Pay'}
            </Button>
          )}

          <p className='mt-4 text-center text-xs text-slate-400'>
            Secure payment powered by SSLCommerz
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionCard;
