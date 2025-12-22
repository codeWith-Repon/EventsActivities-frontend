'use client';

import { EventPulseLoader } from '@/components/shared/loader';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PaymentLoading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh]'>
      <EventPulseLoader
        size='md'
        icon={ShieldCheck}
        text='Securing your transaction...'
        primaryColor='green-600'
        fullScreen={true}
      />

      {/* Trust Indicator below the loader */}
      <div className='mt-4 flex items-center gap-2 text-muted-foreground/70'>
        <Lock className='w-3 h-3' />
        <span className='text-xs font-medium uppercase tracking-tighter'>
          Bank-level 256-bit encryption
        </span>
      </div>
    </div>
  );
}
