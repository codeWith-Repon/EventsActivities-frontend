'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IEvent } from '@/types/events.interface';
import { formatDate, formatTimeTo12Hour } from '@/lib/formatter';
import { userPlaceholderImage } from '@/assets';
import Image from 'next/image';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Wallet,
  UserRound,
} from 'lucide-react';

const Row = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value?: string | number | null;
}) => (
  <div className='flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3'>
    <Icon className='mt-0.5 size-4 text-[var(--aurora-violet)]' />
    <div className='min-w-0'>
      <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
        {label}
      </p>
      <p className='truncate text-sm text-foreground'>{value ?? '—'}</p>
    </div>
  </div>
);

const EventViewDialog = ({
  open,
  onClose,
  event,
}: {
  open: boolean;
  onClose: () => void;
  event: IEvent | null;
}) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='glass-strong flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-2xl'>
        <DialogHeader className='border-b border-white/10 px-6 py-4'>
          <DialogTitle className='font-display'>Event details</DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto p-6'>
          <div className='relative mb-5 h-44 overflow-hidden rounded-2xl border border-white/10'>
            <Image
              src={event.images?.[0] || userPlaceholderImage}
              alt={event.title}
              fill
              sizes='600px'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
            <div className='absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2'>
              <div>
                <span className='font-mono text-[10px] uppercase tracking-wider text-white/70'>
                  {event.category}
                </span>
                <h2 className='font-display text-xl font-semibold text-white'>
                  {event.title}
                </h2>
              </div>
              <StatusBadge status={event.status} />
            </div>
          </div>

          {event.description && (
            <p className='mb-5 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-muted-foreground'>
              {event.description}
            </p>
          )}

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <Row icon={CalendarDays} label='Date' value={formatDate(event.date)} />
            <Row icon={Clock} label='Time' value={formatTimeTo12Hour(event.time)} />
            <Row icon={MapPin} label='Location' value={event.location} />
            <Row icon={UserRound} label='Host' value={event.host?.user?.name} />
            <Row
              icon={Users}
              label='Capacity'
              value={`${event.totalParticipants ?? 0} / ${event.maxParticipants} (min ${event.minParticipants})`}
            />
            <Row
              icon={Wallet}
              label='Fee'
              value={event.fee === 0 ? 'Free' : `৳ ${event.fee}`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventViewDialog;
