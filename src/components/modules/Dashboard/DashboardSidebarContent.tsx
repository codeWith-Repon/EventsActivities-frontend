'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getIconComponent } from '@/lib/icon-mapper';
import { cn } from '@/lib/utils';
import { NavSection } from '@/types/dashboard.interface';
import { IUserInfo } from '@/types/user.interface';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardSidebarContentProps {
  userInfo: IUserInfo;
  navItems: NavSection[];
  dashboardHome?: string;
  loading?: boolean;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
  dashboardHome,
  loading,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <aside className='glass relative z-20 hidden h-full w-72 flex-col border-y-0 border-l-0 border-r border-r-white/10 md:flex'>
      {/* Brand */}
      <div className='flex h-16 items-center gap-2.5 px-6'>
        <Link href={dashboardHome ?? '/'} className='flex items-center gap-2.5'>
          <span className='grid size-8 place-items-center rounded-xl bg-gradient-aurora text-sm font-bold text-white shadow-[0_4px_20px_-4px_var(--aurora-violet)]'>
            E
          </span>
          <span className='font-display text-lg font-semibold tracking-tight text-foreground'>
            Events<span className='text-gradient-aurora'>Hub</span>
          </span>
        </Link>
      </div>

      {loading ? (
        <div className='flex flex-1 items-center justify-center'>
          <Loader className='size-5 animate-spin text-muted-foreground' />
        </div>
      ) : (
        <>
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
                            'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-white/[0.08] text-foreground'
                              : 'text-muted-foreground hover:bg-white/[0.05] hover:text-foreground'
                          )}
                        >
                          {/* active accent bar */}
                          <span
                            className={cn(
                              'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gradient-aurora transition-opacity duration-200',
                              isActive ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          <Icon
                            className={cn(
                              'size-4 transition-colors',
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

          {/* User card */}
          <div className='p-3'>
            <div className='glass-strong flex items-center gap-3 rounded-2xl p-3'>
              <div className='grid size-9 place-items-center rounded-xl bg-gradient-aurora text-sm font-semibold text-white'>
                {userInfo?.name?.charAt(0).toUpperCase() ?? 'U'}
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-foreground'>
                  {userInfo?.name}
                </p>
                <p className='truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
                  {userInfo?.role?.toLowerCase().replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default DashboardSidebarContent;
