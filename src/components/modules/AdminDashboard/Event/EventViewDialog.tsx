'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Wallet, Clock, Tag, AlignLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { IEvent } from '@/types/events.interface';

interface EventViewDialogProps {
  event: IEvent | null;
  isOpen: boolean;
  onOpenChange: () => void;
}

const STATUS_VARIANTS: Record<string, string> = {
  OPEN: 'bg-green-500/10 text-green-600 border-green-500/20',
  FULL: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  CANCELLED: 'bg-red-500/10 text-red-600 border-red-500/20',
  COMPLETED: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
};

export function EventViewDialog({
  event,
  isOpen,
  onOpenChange,
}: EventViewDialogProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl p-0 overflow-hidden border-none shadow-2xl'>
        {/* Banner Section */}
        <div className='h-32 bg-primary/10 w-full relative'>
          <div className='absolute -bottom-6 left-6'>
            <Badge
              className={cn(
                'px-4 py-1 text-sm shadow-md border-2 border-background',
                STATUS_VARIANTS[event.status],
              )}
            >
              {event.status}
            </Badge>
          </div>
        </div>

        <div className='p-6 pt-10 space-y-6'>
          <DialogHeader>
            <div className='flex items-center gap-2 text-primary mb-1'>
              <Tag className='w-4 h-4' />
              <span className='text-xs font-bold uppercase tracking-widest'>
                {event.category}
              </span>
            </div>
            <DialogTitle className='text-2xl font-bold leading-tight'>
              {event.title}
            </DialogTitle>
          </DialogHeader>

          {/* Info Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50'>
              <Calendar className='w-5 h-5 text-primary mt-0.5' />
              <div>
                <p className='text-[10px] uppercase font-bold text-muted-foreground'>
                  Date & Time
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50'>
              <MapPin className='w-5 h-5 text-primary mt-0.5' />
              <div>
                <p className='text-[10px] uppercase font-bold text-muted-foreground'>
                  Location
                </p>
                <p className='text-sm font-medium'>{event.location}</p>
              </div>
            </div>

            <div className='flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50'>
              <Wallet className='w-5 h-5 text-primary mt-0.5' />
              <div>
                <p className='text-[10px] uppercase font-bold text-muted-foreground'>
                  Entry Fee
                </p>
                <p
                  className={cn(
                    'text-sm font-bold',
                    event.fee === 0 ? 'text-green-600' : 'text-foreground',
                  )}
                >
                  {event.fee === 0 ? 'Free' : `৳${event.fee.toLocaleString()}`}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50'>
              <Clock className='w-5 h-5 text-primary mt-0.5' />
              <div>
                <p className='text-[10px] uppercase font-bold text-muted-foreground'>
                  Created On
                </p>
                <p className='text-sm font-medium'>
                  {format(new Date(event.createdAt), 'PPp')}
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-muted-foreground'>
              <AlignLeft className='w-4 h-4' />
              <h4 className='text-sm font-bold uppercase tracking-wider'>
                Description
              </h4>
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-xl italic'>
              &quot;This event is part of our monthly active lifestyle series.
              All participants are required to arrive 15 minutes early for the
              briefing.&ldquo;
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
