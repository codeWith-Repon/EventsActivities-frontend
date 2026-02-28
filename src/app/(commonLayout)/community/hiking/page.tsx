import { community } from '@/assets';
import CommunityEvents from '@/components/modules/community/CommunityEvents';
import CommunityHero from '@/components/modules/community/CommunityHero';
import CommunitySideBar from '@/components/modules/community/CommunitySideBar';
import { getAllEvent } from '@/services/events/getAllEvent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hiking Enthusiasts | EventHub',
  description:
    'Join our community of outdoor lovers. Participate in weekly hikes, camping trips, and nature walks with like-minded people.',

  robots: {
    index: true,
    follow: true,
  },
};

const CommunityHikingPage = async () => {
  const data = {
    title: 'Hiking Enthusiasts',
    description:
      'Join our community of outdoor lovers. We organize weekly hikes, camping trips, and nature walks.',
    image: community.HeroHiking,
    members: '2.4k',
  };
  const getEvents = await getAllEvent(`category=Hiking`);
  const events = getEvents?.data?.data || [];
  const firstTwoEvents = events.slice(0, 2);

  return (
    <div className='mt-18 lg:mt-20 space-y-7 mb-10'>
      <CommunityHero data={data} />
      <div className='max-w-7xl mx-auto px-3 md:px-6 lg:px-0'>
        <div className='grid gap-8 lg:grid-cols-3  p-4 md:p-5 lg:p-8'>
          <CommunityEvents events={firstTwoEvents} category='Hiking' />
          <CommunitySideBar />
        </div>
      </div>
    </div>
  );
};

export default CommunityHikingPage;
