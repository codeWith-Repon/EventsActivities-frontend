import { useState, useRef, useEffect } from 'react';
import { LogOut, User, Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IUserInfo } from '@/types/user.interface';
import Image from 'next/image';
import { getInitials } from '@/lib/formatter';

interface IUserDropdownProps {
  user: IUserInfo | null;
  icon?: boolean;
  onLogout: () => void;
}
const UserDropdown = ({ user, icon, onLogout }: IUserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors'
      >
        {!user.profileImage ? (
          <div className='w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-sm font-bold text-white'>
            {getInitials(user.name)}
          </div>
        ) : (
          <Image
            src={user.profileImage}
            alt={user.name}
            width={40}
            height={40}
            className=' rounded-full object-cover border-2 border-white shadow-sm'
          />
        )}

        {icon && (
          <ChevronDown
            size={16}
            className={`text-muted-foreground transition-transform duration-200 absolute -right-1 bottom-1 font-semibold ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden z-50'
          >
            <div className='p-4 border-b border-gray-100'>
              <p className='font-bold'>{user.name}</p>
              <p className='text-sm text-muted-foreground truncate'>
                {user.email}
              </p>
            </div>

            <div className='py-2'>
              <Link
                href='/profile'
                className='flex items-center gap-3 px-4 py-2.5 text-sm  hover:bg-primary/5 hover:text-primary transition-colors'
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                My Profile
              </Link>
              <Link
                href='/my-events'
                className='flex items-center gap-3 px-4 py-2.5 text-sm  hover:bg-primary/5 hover:text-primary transition-colors'
                onClick={() => setIsOpen(false)}
              >
                <Calendar size={18} />
                My Events
              </Link>
              {/* <Link
                href='/settings'
                className='flex items-center gap-3 px-4 py-2.5 text-sm  hover:bg-primary/5 hover:text-primary transition-colors'
                onClick={() => setIsOpen(false)}
              >
                <Settings size={18} />
                Settings
              </Link> */}
            </div>

            <div className='py-2 border-t border-gray-50'>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left'
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
