'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StatCard from '@/components/dashboard/StatCard';
import { getHostStats } from '@/services/host/host.service';
import { IHostStats } from '@/types/host.interface';
import { CalendarDays, Loader2, Star, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HostStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hostId?: string | null;
  hostName?: string;
}

const num = (n: number) => new Intl.NumberFormat('en-US').format(n);

const HostStatsDialog = ({
  open,
  onOpenChange,
  hostId,
  hostName,
}: HostStatsDialogProps) => {
  // keyed by hostId so loading/stats are derived (no synchronous setState in effect)
  const [result, setResult] = useState<{
    forId: string;
    data: IHostStats | null;
  } | null>(null);

  useEffect(() => {
    if (!open || !hostId) return;
    let cancelled = false;
    getHostStats(hostId).then((res) => {
      if (!cancelled) setResult({ forId: hostId, data: res?.data ?? null });
    });
    return () => {
      cancelled = true;
    };
  }, [open, hostId]);

  const loaded = !!hostId && result?.forId === hostId;
  const loading = open && !!hostId && !loaded;
  const stats = loaded ? result?.data ?? null : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='glass-strong sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='font-display'>
            {hostName ? `${hostName} · stats` : 'Host stats'}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className='flex h-40 items-center justify-center'>
            <Loader2 className='size-6 animate-spin text-[var(--aurora-violet)]' />
          </div>
        ) : stats ? (
          <div className='grid grid-cols-2 gap-3'>
            <StatCard
              label='Events hosted'
              value={num(stats.stats.totalEvents)}
              icon={CalendarDays}
              accent='violet'
            />
            <StatCard
              label='Participants'
              value={num(stats.stats.totalParticipants)}
              icon={Users}
              accent='cyan'
            />
            <StatCard
              label='Revenue'
              value={`৳ ${num(Math.round(stats.stats.totalRevenue))}`}
              icon={TrendingUp}
              accent='teal'
            />
            <StatCard
              label='Avg rating'
              value={Number(stats.stats.averageRating ?? 0).toFixed(1)}
              icon={Star}
              accent='amber'
            />
          </div>
        ) : (
          <p className='py-8 text-center text-sm text-muted-foreground'>
            Couldn’t load stats for this host.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HostStatsDialog;
