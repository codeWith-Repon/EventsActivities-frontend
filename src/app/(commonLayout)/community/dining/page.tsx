import CommunityEvents from '@/components/modules/community/CommunityEvents';
import CommunityHero from '@/components/modules/community/CommunityHero';
import CommunitySideBar from '@/components/modules/community/CommunitySideBar';
import { getAllEvent } from '@/services/events/getAllEvent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foodie Community | EventHub',
  description:
    "Explore the city's culinary scene, join tasting events, and share your favorite recipes with fellow food enthusiasts.",
  
  robots: {
    index: true,
    follow: true,
  },
};

const CommunityDiningPage = async () => {
  const data = {
    title: 'Foodie Community',
    description:
      "Explore the city's culinary scene, join tasting events, and share your favorite recipes.",
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&h=600&fit=crop',
    members: '3.8k',
  };
  const getEvents = await getAllEvent(`category=Dining`);
  const events = getEvents?.data?.data || [];
  const firstTwoEvents = events.slice(0, 2);

  return (
    <div className='mt-18 lg:mt-20 space-y-7 mb-10'>
      <CommunityHero data={data} />
      <div className='max-w-7xl mx-auto px-3 md:px-6 lg:px-0'>
        <div className='grid gap-8 lg:grid-cols-3  p-4 md:p-5 lg:p-8'>
          <CommunityEvents events={firstTwoEvents} category={'Dining'} />
          <CommunitySideBar
            className={`${events.length > 0 ? '' : 'hidden'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityDiningPage;
