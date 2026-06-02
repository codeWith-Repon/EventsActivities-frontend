'use client';

import {
  acceptInvitation,
  declineInvitation,
} from '@/services/invitation/invitation.service';
import { CheckCircle2, Loader2, Mail, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Result = { ok: boolean; message: string } | null;

const InviteResponse = () => {
  const token = useSearchParams().get('token') ?? '';
  const [busy, setBusy] = useState<'accept' | 'decline' | null>(null);
  const [result, setResult] = useState<Result>(null);

  const respond = async (kind: 'accept' | 'decline') => {
    if (!token) return;
    setBusy(kind);
    const res =
      kind === 'accept'
        ? await acceptInvitation(token)
        : await declineInvitation(token);
    setBusy(null);
    setResult({
      ok: !!res?.success,
      message: res?.success
        ? kind === 'accept'
          ? 'You’re in! Your spot is confirmed.'
          : 'Invitation declined.'
        : res?.message || 'Something went wrong. The link may have expired.',
    });
  };

  return (
    <div className='mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-20 text-center'>
      <div className='mb-6 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary'>
        <Mail className='size-7' />
      </div>
      <h1 className='text-3xl font-bold tracking-tight'>Event invitation</h1>

      {!token ? (
        <p className='mt-3 text-muted-foreground'>
          This invite link is missing its token.
        </p>
      ) : result ? (
        <div className='mt-6 flex flex-col items-center gap-4'>
          {result.ok ? (
            <CheckCircle2 className='size-12 text-green-500' />
          ) : (
            <XCircle className='size-12 text-destructive' />
          )}
          <p className='text-lg'>{result.message}</p>
          <Link
            href='/my-events'
            className='mt-2 rounded-full bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90'
          >
            Go to my events
          </Link>
        </div>
      ) : (
        <>
          <p className='mt-3 max-w-sm text-muted-foreground'>
            You’ve been invited to an event. Accept to confirm your spot (sign in
            first if you haven’t).
          </p>
          <div className='mt-8 flex items-center gap-3'>
            <button
              onClick={() => respond('accept')}
              disabled={!!busy}
              className='inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50'
            >
              {busy === 'accept' && <Loader2 className='size-4 animate-spin' />}
              Accept
            </button>
            <button
              onClick={() => respond('decline')}
              disabled={!!busy}
              className='inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 font-medium transition-colors hover:bg-muted disabled:opacity-50'
            >
              {busy === 'decline' && <Loader2 className='size-4 animate-spin' />}
              Decline
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InviteResponse;
