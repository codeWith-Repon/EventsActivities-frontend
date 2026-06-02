'use client';

import { Bell, Loader2, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavSection } from '@/types/dashboard.interface';
import { useEffect, useState } from 'react';
import { IUserInfo } from '@/types/user.interface';
import UserDropdown from '@/components/shared/userDropdown';
import DashboardMobileSidebar from './DashboardMobileSidebar';
import ThemeToggle from '@/components/dashboard/ThemeToggle';

interface DashboardNavbarContentProps {
  userInfo: IUserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
  loading?: boolean;
  onLogout?: () => void;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
  loading,
  onLogout,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <header className='glass sticky top-0 z-30 w-full border-x-0 border-t-0 border-b border-b-white/10'>
      <div className='flex h-16 items-center justify-between gap-3 px-4 md:px-6'>
        {/* mobile menu */}
        <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='md:hidden'>
            <button
              aria-label='Open menu'
              className='grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10'
            >
              <Menu className='size-5' />
            </button>
          </SheetTrigger>
          <SheetContent side='left' className='aurora w-72 border-r-white/10 p-0'>
            <DashboardMobileSidebar
              userInfo={userInfo}
              navItems={navItems || []}
              dashboardHome={dashboardHome || ''}
            />
          </SheetContent>
        </Sheet>

        {/* search */}
        <div className='hidden max-w-md flex-1 sm:block'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
            <input
              type='search'
              placeholder='Search…'
              className='h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[var(--aurora-violet)]/50 focus:bg-white/[0.07]'
            />
          </div>
        </div>

        <div className='flex flex-1 items-center justify-end gap-2'>
          <ThemeToggle />

          {/* notifications (wired in F10) */}
          <button
            aria-label='Notifications'
            className='relative grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10'
          >
            <Bell className='size-[18px]' />
            <span className='absolute right-2 top-2 size-2 rounded-full bg-gradient-aurora ring-2 ring-[var(--card)]' />
          </button>

          {loading ? (
            <Loader2 className='size-5 animate-spin text-muted-foreground' />
          ) : (
            <UserDropdown user={userInfo} onLogout={onLogout!} />
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
