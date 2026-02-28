import { EventCreationChart } from '@/components/modules/AdminDashboard/EventCreationTreands';
import { EventDistributionChart } from '@/components/modules/AdminDashboard/EventDistributionChart';
import { RevenueChart } from '@/components/modules/AdminDashboard/RevenueChart';
import StatCards from '@/components/modules/AdminDashboard/StatCards';
import { UserGrowthChart } from '@/components/modules/AdminDashboard/UserGrowth';
import { DashboardFilter } from '@/components/modules/AdminDashboard/DashboardFilter'; // [NEW]
import { getDashboardMeta } from '@/services/meta/meta.service';

export const dynamic = 'force-dynamic';

// Added searchParams to the page props
const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;

  // Pass query to your service (startDate, endDate, duration)
  const metaData = await getDashboardMeta(query);

  const stateCardData = metaData?.data?.summary;
  const revenueData = metaData?.data?.charts?.revenue;
  const eventDistributionData = metaData?.data?.eventDistribution;
  const userGrowthData = metaData?.data?.charts?.users;
  const eventCreationData = metaData?.data?.charts?.events;

  return (
    <div className='p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <DashboardFilter />

      <StatCards stateCardData={stateCardData} />

      <div className='grid gap-6 grid-cols-1 lg:grid-cols-6 items-stretch'>
        <div className='lg:col-span-4'>
          <RevenueChart revenueData={revenueData} />
        </div>
        <div className='lg:col-span-2'>
          <EventDistributionChart
            eventDistributionData={eventDistributionData}
          />
        </div>
      </div>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
        <UserGrowthChart userGrowthData={userGrowthData} />
        <EventCreationChart eventCreationData={eventCreationData} />
      </div>
    </div>
  );
};

export default DashboardPage;
