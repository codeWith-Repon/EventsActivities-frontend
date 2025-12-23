import CommunityEvents from '@/components/modules/community/CommunityEvents';
import CommunityHero from '@/components/modules/community/CommunityHero';
import CommunitySideBar from '@/components/modules/community/CommunitySideBar';
import { getAllEvent } from '@/services/events/getAllEvent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Lovers | EventHub',
  description:
    'Connect with fellow audiophiles, discover local bands, and attend concerts together.',
};

const CommunityMusicPage = async () => {
  const data = {
    title: 'Music Lovers',
    description:
      'Connect with fellow audiophiles, discover local bands, and attend concerts together.',
    image:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&h=600&fit=crop',
    members: '5.1k',
  };
  const getEvents = await getAllEvent(`category=Music`);
  const events = getEvents?.data?.data || [];
  const firstTwoEvents = events.slice(0, 2);

  return (
    <div className='mt-18 lg:mt-20 space-y-7 mb-10'>
      <CommunityHero data={data} />
      <div className='max-w-7xl mx-auto px-3 md:px-6 lg:px-0'>
        <div className='grid gap-8 lg:grid-cols-3  p-4 md:p-5 lg:p-8'>
          <CommunityEvents events={firstTwoEvents} category={'Music'} />
          <CommunitySideBar
            className={`${events.length > 0 ? '' : 'hidden'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityMusicPage;
