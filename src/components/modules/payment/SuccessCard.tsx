'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { IEvent } from '@/types/events.interface';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PaymentSuccessCard = ({
  event,
  transactionId,
}: {
  event: IEvent;
  transactionId: string;
}) => {
  const content = {
    icon: <CheckCircle2 className='h-20 w-20 text-emerald-500' />,
    title: 'Payment Successful 🎉',
    message: 'You have successfully joined the event',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  };

  const router = useRouter();

  return (
    <Card
      className={`w-full max-w-md shadow-lg border-2 ${content.borderColor}`}
    >
      <CardContent className='pt-10 pb-6 flex flex-col items-center text-center space-y-4'>
        <div className='rounded-full bg-white p-2 shadow-sm'>
          {content.icon}
        </div>

        <div className='space-y-2'>
          <h1 className={`text-2xl font-bold ${content.color}`}>
            {content.title}
          </h1>
          <p className='text-slate-600'>{content.message}</p>
        </div>

        <div className='w-full mt-6 rounded-lg bg-slate-50 p-4 border border-slate-100 text-left space-y-3'>
          <div className='flex justify-between text-sm'>
            <span className='text-slate-500'>Event</span>
            <span className='font-medium text-slate-900 truncate max-w-[200px]'>
              {event.title}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-slate-500'>Transaction ID</span>
            <span className='font-mono text-xs font-medium text-slate-900'>
              {transactionId}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-slate-500'>Amount Paid</span>
            <span className='font-bold text-emerald-600'>
              ${event.fee.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex flex-col gap-3 pb-8 px-8'>
        <>
          <Button
            className='w-full bg-emerald-600 hover:bg-emerald-700'
            onClick={() => router.push(`/events/${event.slug}`)}
          >
            Go to Event Details
          </Button>
          <Button
            variant='outline'
            className='w-full'
            onClick={() => router.push('/my-events')}
          >
            View My Events
          </Button>
        </>
      </CardFooter>
    </Card>
  );
};

export default PaymentSuccessCard;
