'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const OPTIONS = [
  { label: '7 days', value: '7days' },
  { label: '15 days', value: '15days' },
  { label: 'This month', value: '1month' },
];

const DurationFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('duration') ?? '1month';

  const select = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('duration', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1'>
      {OPTIONS.map((opt) => {
        const isActive = current === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => select(opt.value)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
              isActive
                ? 'bg-gradient-aurora text-white shadow-[0_4px_14px_-4px_var(--aurora-violet)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default DurationFilter;
