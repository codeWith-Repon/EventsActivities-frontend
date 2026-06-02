import * as React from 'react';
import { Inbox, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] border border-dashed border-border px-6 py-16 text-center',
        className
      )}
    >
      <span className='grid size-14 place-items-center rounded-2xl bg-[var(--aurora-violet)]/12 text-[var(--aurora-violet)]'>
        <Icon size={26} strokeWidth={1.5} />
      </span>
      <h3 className='font-display text-lg font-semibold text-foreground'>{title}</h3>
      {description && (
        <p className='max-w-sm text-sm text-muted-foreground'>{description}</p>
      )}
      {action && <div className='mt-2'>{action}</div>}
    </div>
  );
};

export default EmptyState;
