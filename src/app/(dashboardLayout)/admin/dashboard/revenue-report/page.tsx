import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import StatCard from '@/components/dashboard/StatCard';
import GlassCard from '@/components/dashboard/GlassCard';
import AreaTrendChart from '@/components/modules/AdminDashboard/charts/AreaTrendChart';
import RankedBarList from '@/components/modules/AdminDashboard/RankedBarList';
import { getRevenueReport } from '@/services/meta/meta.service';
import { RevenueReport } from '@/types/dashboard.interface';
import { CalendarRange, TrendingUp, Trophy, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

const money = (n: number) => `৳ ${new Intl.NumberFormat('en-US').format(Math.round(n))}`;
const monthLabel = (m: string) => {
  const d = new Date(`${m}-01`);
  return Number.isNaN(d.getTime())
    ? m
    : d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
};

const RevenueReportPage = async () => {
  const res = await getRevenueReport();
  const data = res?.data as RevenueReport | undefined;

  const monthly = data?.monthlyRevenue ?? [];
  const totalRevenue = monthly.reduce((s, m) => s + Number(m.revenue ?? 0), 0);
  const series = monthly.map((m) => ({
    label: monthLabel(m.month),
    value: Number(m.revenue ?? 0),
  }));
  const bestMonth = monthly.reduce(
    (best, m) => (Number(m.revenue) > Number(best?.revenue ?? -1) ? m : best),
    monthly[0]
  );

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='Finance'
        title='Revenue report'
        description='Platform-wide earnings, top performers, and monthly trend.'
      />

      {!data ? (
        <EmptyState
          icon={TrendingUp}
          title='Couldn’t load revenue report'
          description='The API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <StatCard
              label='Total revenue (all time)'
              value={money(totalRevenue)}
              icon={TrendingUp}
              accent='violet'
            />
            <StatCard
              label='Best month'
              value={bestMonth ? monthLabel(bestMonth.month) : '—'}
              icon={CalendarRange}
              accent='cyan'
            />
            <StatCard
              label='Top host'
              value={data.topHosts?.[0]?.name ?? '—'}
              icon={Trophy}
              accent='amber'
            />
          </div>

          <GlassCard className='aurora-rise p-5'>
            <div className='mb-4 flex items-center justify-between'>
              <div>
                <h3 className='font-display text-base font-semibold text-foreground'>
                  Monthly revenue
                </h3>
                <p className='text-xs text-muted-foreground'>
                  Paid transactions, all time
                </p>
              </div>
              <span className='font-display text-lg font-semibold text-gradient-aurora'>
                {money(totalRevenue)}
              </span>
            </div>
            <AreaTrendChart data={series} tone='violet' formatValue={money} />
          </GlassCard>

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <GlassCard className='aurora-rise p-5'>
              <h3 className='mb-4 flex items-center gap-2 font-display text-base font-semibold text-foreground'>
                <Trophy className='size-4 text-[var(--aurora-amber)]' />
                Top events
              </h3>
              <RankedBarList
                items={(data.topEvents ?? []).map((e) => ({
                  id: e.id,
                  label: e.title,
                  value: Number(e.revenue ?? 0),
                }))}
              />
            </GlassCard>

            <GlassCard className='aurora-rise p-5'>
              <h3 className='mb-4 flex items-center gap-2 font-display text-base font-semibold text-foreground'>
                <Users className='size-4 text-[var(--aurora-cyan)]' />
                Top hosts
              </h3>
              <RankedBarList
                items={(data.topHosts ?? []).map((h) => ({
                  id: h.hostId,
                  label: h.name,
                  value: Number(h.revenue ?? 0),
                }))}
              />
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueReportPage;
