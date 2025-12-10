import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/hook/useUser';
import { IEvent, IParticipant } from '@/types/events.interface';
import { Loader } from 'lucide-react';

interface ActionCardProps {
  event: IEvent;
  participants: IParticipant[];
}
const ActionCard = ({ event, participants }: ActionCardProps) => {
  const { user, loading } = useUser();
  const isFull = event.totalParticipants === event.maxParticipants;
  const isCompleted = event.status === 'COMPLETED';
  const isCancelled = event.status === 'CANCELLED';
  const canJoin = event.status === 'OPEN' && !isFull;

  const hasJoined = participants.some((p) => p.userId === user?.id);

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
              className='w-full bg-emerald-600 hover:bg-emerald-700 text-lg h-12'
              disabled={!canJoin}
              //   onClick={handleJoin}
            >
              {isFull
                ? 'Event Full'
                : isCompleted
                ? 'Event Completed'
                : isCancelled
                ? 'Event Cancelled'
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
