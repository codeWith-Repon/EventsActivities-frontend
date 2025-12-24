'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { X, ChevronDown, RefreshCcw } from 'lucide-react';
import { navItems } from './NavbarItem';
import { useUser } from '@/hook/useUser';
import Link from 'next/link';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  navItems: typeof navItems;
  handleLogout: () => void;
}

export default function MobileSidebar({
  open,
  onClose,
  navItems,
  handleLogout,
}: SidebarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, loading } = useUser();

  // close when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open
          ? 'bg-black/30 visible opacity-100'
          : 'bg-transparent invisible opacity-0'
      }`}
    >
      <div
        ref={ref}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between p-4 border-b mt-3'>
          <h2 className='text-xl font-bold'>Menu</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <nav className='flex flex-col p-4 gap-2'>
          {navItems.map((item) =>
            item.submenu ? (
              <div key={item.label}>
                <button
                  className='flex items-center justify-between w-full font-medium px-2 py-2 rounded hover:bg-gray-100 transition-colors'
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                >
                  {item.label}{' '}
                  <ChevronDown
                    className={`${
                      openDropdown === item.label ? 'rotate-180' : ''
                    } transition-all`}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className='flex flex-col ml-4 mt-1 gap-1'>
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.href}
                        className={`text-left px-2 py-2 rounded hover:bg-gray-100 transition-colors ${
                          pathname === sub.href
                            ? 'text-primary font-semibold'
                            : ''
                        }`}
                        onClick={() => handleNavigate(sub.href)}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.href}
                className={`text-left px-2 py-2 rounded hover:bg-gray-100 transition-colors font-medium ${
                  pathname === item.href ? 'text-primary font-semibold' : ''
                }`}
                onClick={() => handleNavigate(item.href)}
              >
                {item.label}
              </button>
            )
          )}
          {((user && user.role === 'ADMIN') ||
            user?.role === 'SUPER_ADMIN') && (
            <Link
              href='/admin/dashboard'
              className={`text-left px-2 py-2 rounded hover:bg-gray-100 hover:text-primary font-medium relative transition-colors ${
                pathname === '/admin/dashboard'
                  ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full text-primary"
                  : ''
              }`}
            >
              Dashboard
            </Link>
          )}
          {loading ? (
            <span className='animate-spin text-primary hidden md:block'>
              <RefreshCcw />
            </span>
          ) : user ? (
            <button
              className='border border-red-500 text-red-400 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors font-medium'
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div className='flex items-center gap-3'>
              <button
                className='btn-primary bg-gradient-coral text-left px-4 py-2 rounded-full hover:bg-gray-100 transition-colors font-medium'
                onClick={() => handleNavigate('/login')}
              >
                Login
              </button>

              <button
                className='border-primary border text-black/70 text-left px-4 py-2 rounded-full hover:bg-gray-100 transition-colors font-medium'
                onClick={() => handleNavigate('/register')}
              >
                Register
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
