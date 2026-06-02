import StatCard from '@/components/dashboard/StatCard';
import GlassCard from '@/components/dashboard/GlassCard';
import EmptyState from '@/components/dashboard/EmptyState';
import DonutChart, {
  DonutSegment,
} from '@/components/modules/AdminDashboard/charts/DonutChart';
import { getEventAnalytics } from '@/services/events/hostEvents';
import { IEventAnalytics } from '@/types/analytics.interface';
import { Eye, Gauge, TrendingUp, UserCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

const money = (n: number) => `৳ ${new Intl.NumberFormat('en-US').format(Math.round(n))}`;
const pct = (n: number) => `${Math.round((n ?? 0) * 100)}%`;

const Stat = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className='rounded-xl border border-border bg-muted/60 p-3'>
    <p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
      {label}
    </p>
    <p className='mt-0.5 font-display text-lg font-semibold text-foreground'>
      {value}
    </p>
  </div>
);

const AnalyticsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await getEventAnalytics(slug);
  const a = res?.data as IEventAnalytics | undefined;

  if (!a) {
    return (
      <EmptyState
        icon={Gauge}
        title='Analytics unavailable'
        description='Only the host or a co-host can view analytics, and the API must be reachable.'
      />
    );
  }

  const participantSegments: DonutSegment[] = [
    { label: 'Approved', value: a.participants.approved, tone: 'teal' },
    { label: 'Pending', value: a.participants.pending, tone: 'amber' },
    { label: 'Waitlisted', value: a.participants.waitlisted, tone: 'cyan' },
    { label: 'Rejected', value: a.participants.rejected, tone: 'fuchsia' },
    { label: 'Cancelled', value: a.participants.cancelled, tone: 'slate' },
  ];

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard label='Views' value={a.views} icon={Eye} accent='violet' />
        <StatCard
          label='Fill rate'
          value={pct(a.capacity.fillRate)}
          icon={Gauge}
          accent='cyan'
        />
        <StatCard
          label='Revenue collected'
          value={money(a.revenue.collected)}
          icon={TrendingUp}
          accent='teal'
        />
        <StatCard
          label='Attendance'
          value={pct(a.checkin.attendanceRate)}
          icon={UserCheck}
          accent='amber'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <GlassCard className='p-5'>
          <h3 className='mb-4 font-display text-base font-semibold text-foreground'>
            Participants ({a.participants.total})
          </h3>
          <DonutChart segments={participantSegments} centerLabel='Total' />
        </GlassCard>

        <div className='grid grid-cols-1 gap-4'>
          <GlassCard className='p-5'>
            <h3 className='mb-3 font-display text-base font-semibold text-foreground'>
              Capacity
            </h3>
            <div className='grid grid-cols-3 gap-3'>
              <Stat label='Filled' value={a.capacity.filled} />
              <Stat label='Max' value={a.capacity.max} />
              <Stat label='Fill rate' value={pct(a.capacity.fillRate)} />
            </div>
          </GlassCard>

          <GlassCard className='p-5'>
            <h3 className='mb-3 font-display text-base font-semibold text-foreground'>
              Revenue
            </h3>
            <div className='grid grid-cols-3 gap-3'>
              <Stat label='Collected' value={money(a.revenue.collected)} />
              <Stat label='Pending' value={money(a.revenue.pending)} />
              <Stat label='Refunded' value={money(a.revenue.refunded)} />
            </div>
          </GlassCard>

          <GlassCard className='p-5'>
            <h3 className='mb-3 font-display text-base font-semibold text-foreground'>
              Check-in
            </h3>
            <div className='grid grid-cols-3 gap-3'>
              <Stat label='Checked in' value={a.checkin.checkedIn} />
              <Stat label='Absent' value={a.checkin.absent} />
              <Stat label='Rate' value={pct(a.checkin.attendanceRate)} />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
