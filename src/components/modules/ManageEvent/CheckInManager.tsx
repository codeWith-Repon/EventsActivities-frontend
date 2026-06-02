'use client';

import GlassCard from '@/components/dashboard/GlassCard';
import StatCard from '@/components/dashboard/StatCard';
import { Input } from '@/components/ui/input';
import { checkInByToken } from '@/services/checkin/checkin.service';
import { IAttendance } from '@/types/attendance.interface';
import { getInitials } from '@/lib/formatter';
import {
  CheckCircle2,
  Loader2,
  ScanLine,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const CheckInManager = ({
  eventId,
  attendance,
}: {
  eventId: string;
  attendance: IAttendance | null;
}) => {
  void eventId;
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    setBusy(true);
    const res = await checkInByToken(token.trim());
    setBusy(false);
    if (res?.success) {
      toast.success('Participant checked in');
      setToken('');
      startTransition(() => router.refresh());
    } else {
      toast.error(res?.message || 'Check-in failed (invalid token or not event day)');
    }
  };

  return (
    <div className='space-y-5'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard label='Approved' value={attendance?.total ?? 0} icon={Users} accent='violet' />
        <StatCard label='Checked in' value={attendance?.attended ?? 0} icon={UserCheck} accent='teal' />
        <StatCard label='Absent' value={attendance?.absent ?? 0} icon={UserX} accent='fuchsia' />
      </div>

      <GlassCard className='p-5'>
        <h3 className='mb-1 flex items-center gap-2 font-display text-base font-semibold text-foreground'>
          <ScanLine className='size-4 text-[var(--aurora-violet)]' />
          Check in a participant
        </h3>
        <p className='mb-3 text-xs text-muted-foreground'>
          Scan the participant’s QR and paste the token here, or type it in. Only
          works on event day.
        </p>
        <form onSubmit={submit} className='flex flex-col gap-3 sm:flex-row'>
          <Input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder='Check-in token…'
            className='flex-1 border-border bg-muted font-mono'
          />
          <button
            type='submit'
            disabled={busy}
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-aurora px-5 py-2 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50'
          >
            {busy ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <CheckCircle2 className='size-4' />
            )}
            Check in
          </button>
        </form>
      </GlassCard>

      <GlassCard className='p-0'>
        <div className='border-b border-border px-5 py-3'>
          <h3 className='font-display text-base font-semibold text-foreground'>
            Attendance
          </h3>
        </div>
        {!attendance || attendance.participants.length === 0 ? (
          <p className='py-10 text-center text-sm text-muted-foreground'>
            No approved participants yet.
          </p>
        ) : (
          <ul className='divide-y divide-border'>
            {attendance.participants.map((p) => (
              <li
                key={p.id}
                className='flex items-center justify-between gap-3 px-5 py-3'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  {p.user.profileImage ? (
                    <Image
                      src={p.user.profileImage}
                      alt={p.user.name}
                      width={36}
                      height={36}
                      className='size-9 rounded-full object-cover'
                    />
                  ) : (
                    <span className='grid size-9 place-items-center rounded-full bg-muted text-xs font-semibold text-foreground'>
                      {getInitials(p.user.name)}
                    </span>
                  )}
                  <div className='min-w-0'>
                    <p className='truncate text-sm text-foreground'>{p.user.name}</p>
                    <p className='truncate text-xs text-muted-foreground'>
                      {p.user.email}
                    </p>
                  </div>
                </div>
                {p.checkedIn ? (
                  <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600'>
                    <CheckCircle2 className='size-3.5' />
                    Checked in
                  </span>
                ) : (
                  <span className='inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground'>
                    Absent
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
};

export default CheckInManager;
