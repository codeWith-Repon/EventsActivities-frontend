'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { currentTheme, setTheme, subscribe } from '@/lib/aurora-theme';

const getServerSnapshot = (): 'dark' | 'light' => 'light';

const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const theme = useSyncExternalStore(subscribe, currentTheme, getServerSnapshot);
  const dark = theme === 'dark';

  return (
    <button
      type='button'
      aria-label='Toggle dashboard theme'
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className={`relative grid size-9 place-items-center rounded-xl border border-border bg-muted text-foreground transition-colors hover:bg-muted cursor-pointer ${className}`}
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          dark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
