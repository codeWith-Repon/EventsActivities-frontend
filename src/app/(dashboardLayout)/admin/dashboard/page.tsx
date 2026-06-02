import { CalendarDays, ReceiptText, TrendingUp, Users } from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import GlassCard from '@/components/dashboard/GlassCard';
import EmptyState from '@/components/dashboard/EmptyState';
import DurationFilter from '@/components/modules/AdminDashboard/DurationFilter';
import AreaTrendChart from '@/components/modules/AdminDashboard/charts/AreaTrendChart';
import DonutChart, {
  DonutSegment,
} from '@/components/modules/AdminDashboard/charts/DonutChart';
import { getDashboardMeta } from '@/services/meta/meta.service';
import { ChartPoint, DashboardMeta } from '@/types/dashboard.interface';

export const dynamic = 'force-dynamic';

const num = (n: number) => new Intl.NumberFormat('en-US').format(n);
const money = (n: number) => `৳ ${num(Math.round(n))}`;
const shortDate = (s: string) => {
  const d = new Date(s);
  return Number.isNaN(d.getTime())
    ? s
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const STATUS_TONE: Record<string, DonutSegment['tone']> = {
  OPEN: 'cyan',
  FULL: 'amber',
  COMPLETED: 'violet',
  CANCELLED: 'fuchsia',
};

const toSeries = (points: ChartPoint[] = [], key: 'total' | 'count') =>
  points.map((p) => ({
    label: shortDate(p.date),
    value: Number(p[key] ?? 0),
  }));

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const res = await getDashboardMeta(query);
  const data = res?.data as DashboardMeta | undefined;

  const summary = data?.summary;
  const revenue = toSeries(data?.charts?.revenue, 'total');
  const users = toSeries(data?.charts?.users, 'count');
  const events = toSeries(data?.charts?.events, 'count');
  const distribution: DonutSegment[] = (data?.eventDistribution ?? []).map(
    (d) => ({
      label: d.status,
      value: d._count?._all ?? 0,
      tone: STATUS_TONE[d.status] ?? 'slate',
    })
  );

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='Overview'
        title='Dashboard'
        description='Platform performance at a glance.'
        actions={<DurationFilter />}
      />

      {!data ? (
        <EmptyState
          title='Couldn’t load dashboard data'
          description='The analytics API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          {/* KPI row */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <StatCard
              label='Total users'
              value={num(summary?.totalUsers ?? 0)}
              icon={Users}
              accent='violet'
              style={{ animationDelay: '0ms' }}
            />
            <StatCard
              label='Total events'
              value={num(summary?.totalEvents ?? 0)}
              icon={CalendarDays}
              accent='cyan'
              style={{ animationDelay: '60ms' }}
            />
            <StatCard
              label='Paid sales'
              value={num(summary?.totalSales ?? 0)}
              icon={ReceiptText}
              accent='teal'
              style={{ animationDelay: '120ms' }}
            />
            <StatCard
              label='Revenue'
              value={money(summary?.totalRevenue ?? 0)}
              icon={TrendingUp}
              accent='amber'
              style={{ animationDelay: '180ms' }}
            />
          </div>

          {/* Revenue + distribution */}
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-6'>
            <GlassCard className='aurora-rise p-5 lg:col-span-4'>
              <div className='mb-4 flex items-center justify-between'>
                <div>
                  <h3 className='font-display text-base font-semibold text-foreground'>
                    Revenue
                  </h3>
                  <p className='text-xs text-muted-foreground'>
                    Paid transactions over the period
                  </p>
                </div>
                <span className='font-display text-lg font-semibold text-gradient-aurora'>
                  {money(summary?.totalRevenue ?? 0)}
                </span>
              </div>
              <AreaTrendChart data={revenue} tone='amber' formatValue={money} />
            </GlassCard>

            <GlassCard className='aurora-rise p-5 lg:col-span-2'>
              <h3 className='mb-4 font-display text-base font-semibold text-foreground'>
                Event status
              </h3>
              <DonutChart segments={distribution} centerLabel='Events' />
            </GlassCard>
          </div>

          {/* Growth charts */}
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <GlassCard className='aurora-rise p-5'>
              <div className='mb-4'>
                <h3 className='font-display text-base font-semibold text-foreground'>
                  New users
                </h3>
                <p className='text-xs text-muted-foreground'>
                  Sign-ups over the period
                </p>
              </div>
              <AreaTrendChart data={users} tone='cyan' />
            </GlassCard>

            <GlassCard className='aurora-rise p-5'>
              <div className='mb-4'>
                <h3 className='font-display text-base font-semibold text-foreground'>
                  Events created
                </h3>
                <p className='text-xs text-muted-foreground'>
                  New events over the period
                </p>
              </div>
              <AreaTrendChart data={events} tone='violet' />
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
