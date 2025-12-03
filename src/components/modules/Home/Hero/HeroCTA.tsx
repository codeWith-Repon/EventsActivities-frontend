'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroCTAProps {
  primaryText: string;
  secondaryText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  delay?: number;
}

const HeroCTA: React.FC<HeroCTAProps> = ({
  primaryText,
  secondaryText,
  onPrimaryClick,
  onSecondaryClick,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className='flex flex-wrap gap-4'
    >
      <button
        onClick={onPrimaryClick}
        className='btn-primary bg-primary flex items-center gap-2 group'
      >
        {primaryText}
        <ArrowRight
          size={18}
          className='transition-transform group-hover:translate-x-1 cursor-pointer'
        />
      </button>
      <button
        onClick={onSecondaryClick}
        className='btn-secondary cursor-pointer'
      >
        {secondaryText}
      </button>
    </motion.div>
  );
};

export default HeroCTA;
