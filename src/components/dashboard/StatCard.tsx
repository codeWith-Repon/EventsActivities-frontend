import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';

type Accent = 'violet' | 'cyan' | 'fuchsia' | 'teal' | 'amber';

const accentMap: Record<Accent, string> = {
  violet: 'text-[var(--aurora-violet)] bg-[var(--aurora-violet)]/12',
  cyan: 'text-[var(--aurora-cyan)] bg-[var(--aurora-cyan)]/12',
  fuchsia: 'text-[var(--aurora-fuchsia)] bg-[var(--aurora-fuchsia)]/12',
  teal: 'text-[var(--aurora-teal)] bg-[var(--aurora-teal)]/12',
  amber: 'text-[var(--aurora-amber)] bg-[var(--aurora-amber)]/12',
};

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  accent?: Accent;
  /** percentage / delta vs previous period; positive renders green, negative red */
  delta?: number;
  hint?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  accent = 'violet',
  delta,
  hint,
  className,
  style,
}: StatCardProps) => {
  const hasDelta = typeof delta === 'number';
  const up = (delta ?? 0) >= 0;

  return (
    <GlassCard
      style={style}
      className={cn('aurora-rise group relative overflow-hidden p-5', className)}
    >
      {/* corner glow */}
      <div className='pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-gradient-aurora opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20' />

      <div className='flex items-start justify-between gap-3'>
        <span className='font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground'>
          {label}
        </span>
        {Icon && (
          <span className={cn('grid size-9 place-items-center rounded-xl', accentMap[accent])}>
            <Icon size={17} strokeWidth={1.75} />
          </span>
        )}
      </div>

      <div className='mt-3 flex items-end gap-2'>
        <span className='font-display text-3xl font-semibold tracking-tight text-foreground'>
          {value}
        </span>
        {hasDelta && (
          <span
            className={cn(
              'mb-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium',
              up
                ? 'bg-emerald-500/12 text-emerald-400'
                : 'bg-rose-500/12 text-rose-400'
            )}
          >
            {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(delta as number)}%
          </span>
        )}
      </div>

      {hint && <p className='mt-1 text-xs text-muted-foreground'>{hint}</p>}
    </GlassCard>
  );
};

export default StatCard;
