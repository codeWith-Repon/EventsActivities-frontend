'use client';

import { loginUser } from '@/services/auth/loginUser';
import { Loader, Shield, Sparkles, User } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const PASSWORD = 'Demo@1234';

const ACCOUNTS = [
  { label: 'User', email: 'user@eventshub.test', icon: User },
  { label: 'Host', email: 'host@eventshub.test', icon: Sparkles },
  { label: 'Admin', email: 'admin@eventshub.test', icon: Shield },
];

export default function DemoLoginButtons({ redirect }: { redirect?: string }) {
  const [pending, setPending] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const quickLogin = (email: string) => {
    setPending(email);
    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', PASSWORD);
    if (redirect) formData.set('redirect', redirect);

    startTransition(async () => {
      // on success loginUser redirects (navigates away); a returned value means it failed
      const res = await loginUser(null, formData);
      if (res && !res.success) {
        toast.error(res.message || 'Demo login failed. Is the backend running?');
      }
      setPending(null);
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-center text-xs font-medium uppercase tracking-wider text-muted-foreground'>
        Quick demo login
      </p>
      <div className='grid grid-cols-2 gap-2'>
        {ACCOUNTS.map(({ label, email, icon: Icon }) => {
          const isPending = pending === email;
          return (
            <button
              key={email}
              type='button'
              onClick={() => quickLogin(email)}
              disabled={!!pending}
              className='inline-flex items-center justify-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-60'
            >
              {isPending ? (
                <Loader size={14} className='animate-spin' />
              ) : (
                <Icon size={14} />
              )}
              {isPending ? 'Logging in…' : label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
