'use client';

import { getIconComponent } from '@/lib/icon-mapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface ManageTab {
  label: string;
  href: string;
  icon: string;
}

const ManageEventTabNav = ({ tabs }: { tabs: ManageTab[] }) => {
  const pathname = usePathname();

  return (
    <div className='flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/5 p-1'>
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        const Icon = getIconComponent(tab.icon);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all',
              active
                ? 'bg-gradient-aurora text-white shadow-[0_4px_14px_-4px_var(--aurora-violet)]'
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            )}
          >
            <Icon className='size-4' />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default ManageEventTabNav;
