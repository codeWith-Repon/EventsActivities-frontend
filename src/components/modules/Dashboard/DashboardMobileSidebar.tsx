'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetTitle } from '@/components/ui/sheet';
import { getIconComponent } from '@/lib/icon-mapper';
import { cn } from '@/lib/utils';
import { NavSection } from '@/types/dashboard.interface';
import { IUserInfo } from '@/types/user.interface';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardMobileSidebarProps {
  userInfo: IUserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarProps) => {
  const pathname = usePathname();
  return (
    <div className='flex h-full flex-col bg-background text-foreground'>
      {/* Brand */}
      <div className='flex h-16 items-center gap-2.5 px-6'>
        <Link href={dashboardHome} className='flex items-center gap-2.5'>
          <span className='grid size-8 place-items-center rounded-xl bg-gradient-aurora text-sm font-bold text-white'>
            E
          </span>
          <span className='font-display text-lg font-semibold tracking-tight'>
            Events<span className='text-gradient-aurora'>Hub</span>
          </span>
        </Link>
      </div>
      <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>

      <ScrollArea className='flex-1 px-3 py-2'>
        <nav className='space-y-6 pb-4'>
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h4 className='mb-2 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground'>
                  {section.title}
                </h4>
              )}
              <div className='space-y-1'>
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                        isActive
                          ? 'bg-white/[0.08] text-foreground'
                          : 'text-muted-foreground hover:bg-white/[0.05] hover:text-foreground'
                      )}
                    >
                      <span
                        className={cn(
                          'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gradient-aurora transition-opacity',
                          isActive ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <Icon
                        className={cn(
                          'size-4',
                          isActive && 'text-[var(--aurora-violet)]'
                        )}
                      />
                      <span className='flex-1'>{item.title}</span>
                      {item.badge && (
                        <Badge className='ml-auto h-5 rounded-full bg-gradient-aurora px-1.5 text-[10px] text-white'>
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className='p-3'>
        <div className='glass-strong flex items-center gap-3 rounded-2xl p-3'>
          <div className='grid size-9 place-items-center rounded-xl bg-gradient-aurora text-sm font-semibold text-white'>
            {userInfo?.name?.charAt(0).toUpperCase() ?? 'U'}
          </div>
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium'>{userInfo?.name}</p>
            <p className='truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
              {userInfo?.role?.toLowerCase().replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;
