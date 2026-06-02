'use client';

import GlassCard from '@/components/dashboard/GlassCard';
import { Input } from '@/components/ui/input';
import { addCoHost, removeCoHost } from '@/services/cohost/cohost.service';
import { ICoHost } from '@/types/cohost.interface';
import { getInitials } from '@/lib/formatter';
import { Loader2, Trash2, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const CoHostsManager = ({
  eventId,
  coHosts,
}: {
  eventId: string;
  coHosts: ICoHost[];
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [userId, setUserId] = useState('');
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setAdding(true);
    const res = await addCoHost(eventId, userId.trim());
    setAdding(false);
    if (res?.success) {
      toast.success('Co-host added');
      setUserId('');
      startTransition(() => router.refresh());
    } else {
      toast.error(res?.message || 'Failed to add co-host (target must be a host)');
    }
  };

  const remove = async (hostId: string) => {
    setRemovingId(hostId);
    const res = await removeCoHost(eventId, hostId);
    setRemovingId(null);
    if (res?.success) {
      toast.success('Co-host removed');
      startTransition(() => router.refresh());
    } else {
      toast.error(res?.message || 'Failed to remove co-host');
    }
  };

  return (
    <div className='space-y-5'>
      <GlassCard className='p-5'>
        <h3 className='mb-1 flex items-center gap-2 font-display text-base font-semibold text-foreground'>
          <UserPlus className='size-4 text-[var(--aurora-violet)]' />
          Add a co-host
        </h3>
        <p className='mb-3 text-xs text-muted-foreground'>
          Enter the user ID of an existing host. Co-hosts can manage the event but
          can’t delete it or manage other co-hosts.
        </p>
        <form onSubmit={add} className='flex flex-col gap-3 sm:flex-row'>
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder='Target user ID (UUID)…'
            className='flex-1 border-border bg-muted font-mono'
          />
          <button
            type='submit'
            disabled={adding}
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-aurora px-5 py-2 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50'
          >
            {adding ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <UserPlus className='size-4' />
            )}
            Add co-host
          </button>
        </form>
      </GlassCard>

      <GlassCard className='p-0'>
        <div className='border-b border-border px-5 py-3'>
          <h3 className='font-display text-base font-semibold text-foreground'>
            Co-hosts ({coHosts.length})
          </h3>
        </div>
        {coHosts.length === 0 ? (
          <p className='py-10 text-center text-sm text-muted-foreground'>
            No co-hosts assigned.
          </p>
        ) : (
          <ul className='divide-y divide-border'>
            {coHosts.map((c) => (
              <li
                key={c.id}
                className='flex items-center justify-between gap-3 px-5 py-3'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  {c.host?.user?.profileImage ? (
                    <Image
                      src={c.host.user.profileImage}
                      alt={c.host.user.name}
                      width={36}
                      height={36}
                      className='size-9 rounded-full object-cover'
                    />
                  ) : (
                    <span className='grid size-9 place-items-center rounded-full bg-muted text-xs font-semibold text-foreground'>
                      {getInitials(c.host?.user?.name ?? '?')}
                    </span>
                  )}
                  <div className='min-w-0'>
                    <p className='truncate text-sm text-foreground'>
                      {c.host?.user?.name ?? '—'}
                    </p>
                    <p className='truncate text-xs text-muted-foreground'>
                      {c.host?.user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => remove(c.hostId)}
                  disabled={removingId === c.hostId}
                  className='inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50'
                >
                  {removingId === c.hostId ? (
                    <Loader2 className='size-3 animate-spin' />
                  ) : (
                    <Trash2 className='size-3' />
                  )}
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
};

export default CoHostsManager;
