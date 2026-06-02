import * as React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  /** small mono eyebrow above the title */
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** right-aligned actions (buttons, filters) */
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader = ({
  kicker,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        'aurora-rise flex flex-col gap-4 pb-2 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className='min-w-0'>
        {kicker && (
          <span className='inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground'>
            <span className='inline-block h-1.5 w-1.5 rounded-full bg-gradient-aurora' />
            {kicker}
          </span>
        )}
        <h1 className='mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
          {title}
        </h1>
        {description && (
          <p className='mt-1.5 max-w-2xl text-sm text-muted-foreground'>
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className='flex flex-shrink-0 flex-wrap items-center gap-2'>
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
