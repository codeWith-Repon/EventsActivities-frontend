"use server"

import AIWidget from '@/components/modules/AIWidget';
import CallToAction from '@/components/modules/Home/CallToAction';
import EventCategory from '@/components/modules/Home/EventCategory';
import FeaturedEvents from '@/components/modules/Home/FeaturedEvent/FeaturedEvents';
import Hero from '@/components/modules/Home/Hero/Hero';
import HowItWork from '@/components/modules/Home/HowItWork';
// import LatestArticles from '@/components/modules/Home/LatestArticles';
import Testimonials from '@/components/modules/Home/Testimonials';
import TopHosts from '@/components/modules/Home/TopHosts';
import { queryStringFormatter } from '@/lib/formatter';
import { getAllEvent } from '@/services/events/getAllEvent';

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const events = await getAllEvent(queryString);
  return (
    <div className='bg-primary/5'>
      <Hero />
      <EventCategory />
      <FeaturedEvents events={events?.data?.data} />
      <HowItWork />
      <TopHosts />
      {/* <LatestArticles /> */}
      <Testimonials />
      <CallToAction />
      <AIWidget />
    </div>
  );
};

export default Home;
