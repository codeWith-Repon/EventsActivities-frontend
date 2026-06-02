import { cn } from '@/lib/utils';

type Tone = 'green' | 'amber' | 'red' | 'violet' | 'cyan' | 'slate' | 'blue';

const toneClass: Record<Tone, string> = {
  green: 'bg-emerald-500/12 text-emerald-400 ring-emerald-500/25',
  amber: 'bg-amber-500/12 text-amber-400 ring-amber-500/25',
  red: 'bg-rose-500/12 text-rose-400 ring-rose-500/25',
  violet: 'bg-[var(--aurora-violet)]/12 text-[var(--aurora-violet)] ring-[var(--aurora-violet)]/25',
  cyan: 'bg-[var(--aurora-cyan)]/12 text-[var(--aurora-cyan)] ring-[var(--aurora-cyan)]/25',
  blue: 'bg-sky-500/12 text-sky-400 ring-sky-500/25',
  slate: 'bg-slate-500/12 text-slate-400 ring-slate-500/25',
};

// Maps every backend status enum value to a tone.
const STATUS_TONES: Record<string, Tone> = {
  // generic / user
  ACTIVE: 'green',
  INACTIVE: 'slate',
  BLOCKED: 'red',
  // event
  OPEN: 'green',
  FULL: 'amber',
  CANCELLED: 'red',
  COMPLETED: 'violet',
  // join status
  PENDING: 'amber',
  APPROVED: 'green',
  REJECTED: 'red',
  WAITLISTED: 'cyan',
  // payment
  PAID: 'green',
  FAILED: 'red',
  REFUNDED: 'violet',
  // invitation
  ACCEPTED: 'green',
  DECLINED: 'slate',
  REVOKED: 'red',
  // report
  RESOLVED: 'green',
  DISMISSED: 'slate',
  // roles
  USER: 'slate',
  HOST: 'cyan',
  ADMIN: 'violet',
  SUPER_ADMIN: 'violet',
};

interface StatusBadgeProps {
  status?: string | null;
  /** override the auto-detected tone */
  tone?: Tone;
  className?: string;
}

const StatusBadge = ({ status, tone, className }: StatusBadgeProps) => {
  if (!status) return <span className='text-muted-foreground'>—</span>;
  const key = status.toUpperCase();
  const safeTone: Tone = tone ?? STATUS_TONES[key] ?? 'slate';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        toneClass[safeTone],
        className
      )}
    >
      <span className='size-1.5 rounded-full bg-current' />
      {status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
    </span>
  );
};

export default StatusBadge;
