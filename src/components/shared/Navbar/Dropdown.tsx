'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

export default function Dropdown({ label, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [lastInteraction, setLastInteraction] = useState<
    'hover' | 'click' | null
  >(null);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setLastInteraction(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setLastInteraction(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleMouseEnter = () => {
    if (lastInteraction !== 'click') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(true);
      setLastInteraction('hover');
    }
  };

  const handleMouseLeave = () => {
    if (lastInteraction !== 'click') {
      // small delay to prevent flicker
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
        setLastInteraction(null);
      }, 100); // 100ms delay
    }
  };

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen((prev) => !prev);
    setLastInteraction('click');
  };

  return (
    <div
      ref={ref}
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className='flex items-center gap-1 font-medium hover:text-primary transition-colors cursor-pointer'
        onClick={handleClick}
      >
        {label}{' '}
        <ChevronDown
          size={16}
          className={`${open ? 'rotate-180' : ''} transition-all`}
        />
      </button>

      <div
        className={`absolute left-0 w-56 mt-5 bg-white border border-gray-100 rounded-xl shadow-lg
          transition-all duration-200 overflow-hidden
          ${
            open
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
      >
        <div className='py-2'>{children}</div>
      </div>
    </div>
  );
}
