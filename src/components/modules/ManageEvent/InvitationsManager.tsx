'use client';

import GlassCard from '@/components/dashboard/GlassCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { Input } from '@/components/ui/input';
import {
  revokeInvitation,
  sendInvitation,
} from '@/services/invitation/invitation.service';
import { IInvitation } from '@/types/invitation.interface';
import { formatDate } from '@/lib/formatter';
import { Loader2, Mail, Send, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const InvitationsManager = ({
  eventId,
  invitations,
}: {
  eventId: string;
  invitations: IInvitation[];
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    const res = await sendInvitation(eventId, email.trim());
    setSending(false);
    if (res?.success) {
      toast.success('Invitation sent');
      if (res?.data?.inviteLink) {
        toast.message('Invite link', { description: res.data.inviteLink });
      }
      setEmail('');
      startTransition(() => router.refresh());
    } else {
      toast.error(res?.message || 'Failed to send invitation');
    }
  };

  const revoke = async (id: string) => {
    setRevokingId(id);
    const res = await revokeInvitation(id);
    setRevokingId(null);
    if (res?.success) {
      toast.success('Invitation revoked');
      startTransition(() => router.refresh());
    } else {
      toast.error(res?.message || 'Failed to revoke');
    }
  };

  return (
    <div className='space-y-5'>
      <GlassCard className='p-5'>
        <h3 className='mb-3 font-display text-base font-semibold text-foreground'>
          Invite someone
        </h3>
        <form onSubmit={send} className='flex flex-col gap-3 sm:flex-row'>
          <div className='relative flex-1'>
            <Mail className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='invitee@example.com'
              className='border-white/10 bg-white/5 pl-9'
            />
          </div>
          <button
            type='submit'
            disabled={sending}
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-aurora px-5 py-2 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50'
          >
            {sending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <Send className='size-4' />
            )}
            Send invite
          </button>
        </form>
      </GlassCard>

      <GlassCard className='p-0'>
        <div className='border-b border-white/10 px-5 py-3'>
          <h3 className='font-display text-base font-semibold text-foreground'>
            Invitations ({invitations.length})
          </h3>
        </div>
        {invitations.length === 0 ? (
          <p className='py-10 text-center text-sm text-muted-foreground'>
            No invitations yet.
          </p>
        ) : (
          <ul className='divide-y divide-white/5'>
            {invitations.map((inv) => (
              <li
                key={inv.id}
                className='flex items-center justify-between gap-3 px-5 py-3.5'
              >
                <div className='min-w-0'>
                  <p className='truncate text-sm text-foreground'>{inv.email}</p>
                  <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
                    Expires {formatDate(inv.expiresAt)}
                  </p>
                </div>
                <div className='flex shrink-0 items-center gap-3'>
                  <StatusBadge status={inv.status} />
                  {inv.status === 'PENDING' && (
                    <button
                      onClick={() => revoke(inv.id)}
                      disabled={revokingId === inv.id}
                      className='inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50'
                    >
                      {revokingId === inv.id ? (
                        <Loader2 className='size-3 animate-spin' />
                      ) : (
                        <X className='size-3' />
                      )}
                      Revoke
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
};

export default InvitationsManager;
