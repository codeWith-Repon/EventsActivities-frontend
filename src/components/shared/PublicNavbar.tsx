'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Dropdown from './Dropdown';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore Events', href: '/events' },
  {
    label: 'Communities',
    submenu: [
      { label: 'Hiking & Outdoors', href: '/community/hiking-outdoors' },
      { label: 'Music & Concerts', href: '/community/music-concerts' },
      { label: 'Food & Dining', href: '/community/food-dining' },
    ],
  },
  { label: 'About', href: '/about' },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
      ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl py-3 border-b border-white/20'
          : 'bg-transparent py-5'
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
                    key={item.href}
                    href={sub.href}
                    className={`block px-4 py-2.5 text-sm transition-colors font-medium hover:bg-gray-50 hover:text-primary  ${
                      pathname === sub.href
                        ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full text-primary"
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
                    ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full text-primary"
                    : ''
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop Auth */}
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

        {/* Mobile Menu Button */}
        <button
          className='md:hidden'
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
