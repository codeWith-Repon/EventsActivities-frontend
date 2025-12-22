import { EventCreationChart } from '@/components/modules/AdminDashboard/EventCreationTreands';
import { EventDistributionChart } from '@/components/modules/AdminDashboard/EventDistributionChart';
import { RevenueChart } from '@/components/modules/AdminDashboard/RevenueChart';
import StatCards from '@/components/modules/AdminDashboard/StatCards';
import { UserGrowthChart } from '@/components/modules/AdminDashboard/UserGrowth';
import { getDashboardMeta } from '@/services/meta/meta.service';

const DashboardPage = async () => {
  const metaData = await getDashboardMeta();
  const stateCardData = metaData?.data?.summary;
  const revenueData = metaData?.data?.charts?.revenue;
  const eventDistributionData = metaData?.data?.eventDistribution;
  const userGrowthData = metaData?.data?.charts?.users;
  const eventCreationData = metaData?.data?.charts?.events;

  return (
    <div className='space-y-5 animate-in fade-in duration-500'>
      <StatCards stateCardData={stateCardData} />

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 items-stretch'>
        <div className=' col-span-1 lg:col-span-3 h-full'>
          <RevenueChart revenueData={revenueData} />
        </div>
        <div className='col-span-1 lg:col-span-3 h-full'>
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
