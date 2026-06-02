'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { formatDateTime, getInitials } from '@/lib/formatter';
import { IUserInfo } from '@/types/user.interface';
import { Calendar, Mail, MapPin, Phone, User2, Users } from 'lucide-react';

interface UserViewDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUserInfo | null;
}

const Row = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value?: string | null;
}) => (
  <div className='flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3'>
    <Icon className='mt-0.5 size-4 text-[var(--aurora-violet)]' />
    <div className='min-w-0'>
      <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
        {label}
      </p>
      <p className='truncate text-sm text-foreground'>{value || '—'}</p>
    </div>
  </div>
);

const UserViewDialog = ({ open, onClose, user }: UserViewDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='glass-strong flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-2xl'>
        <DialogHeader className='border-b border-white/10 px-6 py-4'>
          <DialogTitle className='font-display'>User profile</DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto p-6'>
          {/* header */}
          <div className='relative mb-6 overflow-hidden rounded-2xl border border-white/10 p-6'>
            <div className='pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-aurora opacity-20 blur-3xl' />
            <div className='relative flex flex-col items-center gap-4 sm:flex-row sm:items-center'>
              <Avatar className='size-20 border-2 border-white/20'>
                <AvatarImage src={user.profileImage || ''} alt={user.name} />
                <AvatarFallback className='bg-gradient-aurora text-xl text-white'>
                  {getInitials(user.name || '')}
                </AvatarFallback>
              </Avatar>
              <div className='text-center sm:text-left'>
                <h2 className='font-display text-2xl font-semibold text-foreground'>
                  {user.name}
                </h2>
                <p className='mt-0.5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start'>
                  <Mail className='size-3.5' />
                  {user.email}
                </p>
                <div className='mt-3 flex flex-wrap justify-center gap-2 sm:justify-start'>
                  <StatusBadge status={user.role} />
                  <StatusBadge status={user.status ?? 'ACTIVE'} />
                </div>
              </div>
            </div>
          </div>

          {user.bio && (
            <p className='mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-muted-foreground'>
              {user.bio}
            </p>
          )}

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <Row icon={Phone} label='Contact' value={user.contactNumber} />
            <Row icon={Users} label='Gender' value={user.gender} />
            <Row icon={MapPin} label='Address' value={user.address} />
            <Row
              icon={Calendar}
              label='Date of birth'
              value={user.dob ? formatDateTime(user.dob as Date) : null}
            />
            <Row
              icon={User2}
              label='Joined'
              value={formatDateTime(user.createdAt || '')}
            />
            <Row
              icon={Calendar}
              label='Last updated'
              value={formatDateTime(user.updatedAt || '')}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDialog;
