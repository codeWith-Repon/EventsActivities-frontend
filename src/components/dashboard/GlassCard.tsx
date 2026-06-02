import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.ComponentProps<'div'> {
  /** stronger blur + opacity for foreground panels */
  strong?: boolean;
  /** subtle violet glow ring */
  glow?: boolean;
}

const GlassCard = ({ className, strong, glow, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'rounded-[var(--radius)] text-card-foreground',
        glow && 'glow-violet',
        className
      )}
      {...props}
    />
  );
};

export default GlassCard;
