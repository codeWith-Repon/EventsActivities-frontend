'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroBadgeProps {
  text: string;
  delay?: number;
}

const HeroBadge: React.FC<HeroBadgeProps> = ({ text, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary/10 shadow-sm mb-6'
    >
      <span className='w-2 h-2 rounded-full bg-red-400 animate-pulse' />
      <span className='text-xs font-medium text-muted-foreground tracking-wide uppercase'>
        {text}
      </span>
    </motion.div>
  );
};

export default HeroBadge;
