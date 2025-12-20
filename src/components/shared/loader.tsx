'use client';

import { Calendar, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EventPulseLoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  className?: string;
  primaryColor?: string;
  fullScreen?: boolean;
}

const SIZE_CONFIG = {
  sm: { container: 'w-20 h-20', icon: 20, text: 'text-xs' },
  md: { container: 'w-32 h-32', icon: 32, text: 'text-sm' },
  lg: { container: 'w-48 h-48', icon: 48, text: 'text-base' },
  xl: { container: 'w-64 h-64', icon: 64, text: 'text-lg' },
} as const;

export function EventPulseLoader({
  text = 'Loading events...',
  size = 'md',
  icon: Icon = Calendar,
  className = '',
  primaryColor = 'primary', 
  fullScreen = true,
}: EventPulseLoaderProps) {
  const { container, icon: iconSize, text: textSize } = SIZE_CONFIG[size];

  // Logic to handle color mapping for border and background
  const borderClass = `border-${primaryColor}`;
  const bgClass = `bg-${primaryColor}`;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6',
        fullScreen
          ? 'fixed inset-0 min-h-screen bg-background/80 backdrop-blur-sm z-50'
          : 'w-full py-10',
        className
      )}
    >
      <div
        className={cn('relative flex items-center justify-center', container)}
      >
        {/* Animated Ripple Waves (Prop-driven Design) */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn(
              'absolute inset-0 rounded-full border-2 opacity-0',
              borderClass
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.8,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Static Inner Ring */}
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2 opacity-20',
            borderClass
          )}
        />

        {/* Center Pulse Glow */}
        <motion.div
          className={cn('absolute inset-4 rounded-full opacity-10', bgClass)}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* The Icon Heartbeat */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={cn(
            'relative z-10 flex items-center justify-center rounded-full shadow-2xl',
            bgClass,
            'p-4 ring-8 ring-background'
          )}
        >
          <Icon
            size={iconSize}
            className='text-primary-foreground'
            strokeWidth={1.5}
          />
        </motion.div>
      </div>

      {/* Loading Text with Fade-in Effect */}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'font-medium text-muted-foreground animate-pulse',
            textSize
          )}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
