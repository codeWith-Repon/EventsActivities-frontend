'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IParticipantResponse } from '@/types/participant.interface';
import { formatDateTime } from '@/lib/formatter';
import { CalendarDays, Mail, Ticket, UserRound } from 'lucide-react';

const Row = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value?: React.ReactNode;
}) => (
  <div className='flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3'>
    <Icon className='mt-0.5 size-4 text-[var(--aurora-violet)]' />
    <div className='min-w-0'>
      <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
        {label}
      </p>
      <div className='truncate text-sm text-foreground'>{value ?? '—'}</div>
    </div>
  </div>
);

const ParticipantViewDialog = ({
  open,
  onClose,
  participant,
}: {
  open: boolean;
  onClose: () => void;
  participant: IParticipantResponse | null;
}) => {
  if (!participant) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='glass-strong sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='font-display'>Participant</DialogTitle>
        </DialogHeader>

        <div className='mb-2 flex items-center gap-2'>
          <StatusBadge status={participant.joinStatus} />
          <StatusBadge status={participant.paymentStatus} />
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <Row icon={UserRound} label='Name' value={participant.user?.name} />
          <Row icon={Mail} label='Email' value={participant.user?.email} />
          <Row icon={Ticket} label='Event' value={participant.event?.title} />
          <Row
            icon={CalendarDays}
            label='Joined'
            value={formatDateTime(participant.createdAt)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantViewDialog;
