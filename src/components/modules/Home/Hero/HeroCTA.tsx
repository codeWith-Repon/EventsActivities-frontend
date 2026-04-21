'use client';

import React from 'react';
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
}) => {
  return (
    <div className='flex flex-wrap gap-4'>
      <button
        onClick={onPrimaryClick}
        className='btn-primary bg-gradient-coral flex items-center gap-2 group'
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
    </div>
  );
};

export default HeroCTA;
