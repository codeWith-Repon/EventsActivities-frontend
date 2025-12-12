'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IEvent } from '@/types/events.interface';
import { formatDate } from '@/lib/formatter';
import { IUserInfo } from '@/types/user.interface';
import { IParticipantResponse } from '@/types/participant.interface';
import { toast } from 'sonner';
import { paymentInit } from '@/services/payment/payment.service';

interface IShowEventDetails {
  participant: IParticipantResponse;
}

const ShowEventDetails = ({ participant }: IShowEventDetails) => {
  const [isLoading, setIsLoading] = useState(false);

  const user = participant.user as IUserInfo;
  const event = participant.event as IEvent;

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await paymentInit(participant.id);
      if (response.success) {
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error(response.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50 p-4'>
      <Card className='w-full max-w-[480px] shadow-xl border-slate-200'>
        <CardHeader className='text-center pb-2'>
          <CardTitle className='text-2xl font-bold text-slate-900'>
            Complete Your Payment
          </CardTitle>
          <p className='text-slate-500'>Secure checkout</p>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Event Summary */}
          <div className='rounded-lg bg-slate-100 p-4'>
            <h3 className='font-semibold text-slate-900'>{event.title}</h3>
            <div className='mt-2 space-y-1 text-sm text-slate-600'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-3.5 w-3.5' />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='h-3.5 w-3.5' />
                <span>{event.time}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='h-3.5 w-3.5' />
                <span>{event.location}</span>
              </div>
            </div>
            <div className='mt-3 flex items-center justify-between border-t border-slate-200 pt-3'>
              <span className='text-sm font-medium text-slate-600'>Host</span>
              <span className='text-sm font-bold text-slate-900'>
                {event?.host?.user?.name}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className='space-y-3'>
            <h4 className='text-sm font-medium text-slate-900'>
              Participant Information
            </h4>
            <div className='grid gap-3'>
              <div className='rounded-md border bg-white px-3 py-2'>
                <p className='text-xs text-slate-500'>Name</p>
                <p className='text-sm font-medium'>{user.name}</p>
              </div>
              <div className='rounded-md border bg-white px-3 py-2'>
                <p className='text-xs text-slate-500'>Email</p>
                <p className='text-sm font-medium'>{user?.email}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Breakdown */}
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-slate-600'>Event Fee</span>
              <span className='font-medium'>${event.fee.toFixed(2)}</span>
            </div>

            <Separator className='my-2' />
            <div className='flex justify-between text-lg font-bold'>
              <span>Total Amount</span>
              <span className='text-emerald-600'>${event.fee.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex flex-col gap-4 bg-slate-50/50 p-6'>
          <Button
            className='w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg shadow-md cursor-pointer'
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Redirecting...
              </>
            ) : (
              <>Pay with SSLCommerz</>
            )}
          </Button>

          <div className='flex items-center justify-center gap-2 text-xs text-slate-500'>
            <ShieldCheck className='h-3.5 w-3.5 text-emerald-600' />
            <span>Secure payment powered by SSLCommerz</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShowEventDetails;
