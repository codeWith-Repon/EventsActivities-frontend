import React from 'react';

interface HeroBadgeProps {
  text: string;
  delay?: number;
}

const HeroBadge: React.FC<HeroBadgeProps> = ({ text }) => {
  return (
    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary/10 shadow-sm mb-6'>
      <span className='w-2 h-2 rounded-full bg-red-400 animate-pulse' />
      <span className='text-xs font-medium text-muted-foreground tracking-wide uppercase'>
        {text}
      </span>
    </div>
  );
};

export default HeroBadge;
