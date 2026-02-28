'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, RefreshCcw, X } from 'lucide-react';
import Dropdown from './Dropdown';
import { usePathname } from 'next/navigation';
import MobileSidebar from './MobileSidebar';
import { navItems } from './NavbarItem';
import { useUser } from '@/hook/useUser';
import UserDropdown from '../userDropdown';
import { logoutUser } from '@/services/auth/logoutUser';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, setUser, loading } = useUser();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  py-5
      ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/20'
          : 'bg-transparent'
      }`}
      >
        <div className='container-custom flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold tracking-tight'>
            <span className='text-primary'>events</span>hub
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map((item) =>
              item.submenu ? (
                <Dropdown key={item.label} label={item.label}>
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={` block px-4 py-2 text-sm transition-all font-semibold hover:bg-gray-50 hover:text-primary hover:px-5 duration-300  relative after:content-[''] after:absolute after:left-1.5 after:top-1/2 after:-translate-y-1/2 after:w-0 hover:after:w-2.5 after:h-0.5 after:bg-primary  hover:pl-5 after:duration-200   ${
                        pathname === sub.href
                          ? "relative after:content-[''] after:absolute after:left-1.5 after:top-1/2 after:-translate-y-1/2 after:w-2.5 after:h-0.5 after:bg-primary text-primary pl-5 font-semibold"
                          : ''
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </Dropdown>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`hover:text-primary font-medium relative transition-colors ${
                    pathname === item.href
                      ? "relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full text-primary"
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            {((user && user.role === 'ADMIN') ||
              user?.role === 'SUPER_ADMIN') && (
              <Link
                href='/admin/dashboard'
                className={`hover:text-primary font-medium relative transition-colors ${
                  pathname === '/admin/dashboard'
                    ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full text-primary"
                    : ''
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth */}

          {loading ? (
            <div className='min-w-[150px] justify-end flex'>
              <span className='hidden md:block'>
                <RefreshCcw className='animate-spin text-primary' />
              </span>
            </div>
          ) : user ? (
            <div className='hidden md:block'>
              <UserDropdown user={user} icon onLogout={handleLogout} />
            </div>
          ) : (
            <div className='hidden md:flex items-center gap-4'>
              <Link
                href='/login'
                className='hover:text-primary font-medium transition-colors'
              >
                Login
              </Link>

              <Link
                href='/register'
                className='bg-gradient-coral text-white px-5 py-2.5 rounded-full font-medium shadow-md
            hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm'
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center justify-center gap-3'>
            {loading ? (
              <div className=''>
                <span className=''>
                  <RefreshCcw className='animate-spin text-primary' />
                </span>
              </div>
            ) : user ? (
              <div className=''>
                <UserDropdown user={user} icon onLogout={handleLogout} />
              </div>
            ) : null}

            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        handleLogout={handleLogout}
      />
    </>
  );
}
