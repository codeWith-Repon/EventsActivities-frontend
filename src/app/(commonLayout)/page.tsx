import CallToAction from '@/components/modules/Home/CallToAction';
import EventCategory from '@/components/modules/Home/EventCategory';
import FeaturedEvents from '@/components/modules/Home/FeaturedEvent/FeaturedEvents';
import Hero from '@/components/modules/Home/Hero/Hero';
import HowItWork from '@/components/modules/Home/HowItWork';
import LatestArticles from '@/components/modules/Home/LatestArticles';
import Testimonials from '@/components/modules/Home/Testimonials';
import TopHosts from '@/components/modules/Home/TopHosts';

const Home = () => {
  return (
    <div className='bg-primary/5'>
      <Hero />
      <EventCategory />
      <FeaturedEvents />
      <HowItWork />
      <TopHosts />
      <LatestArticles />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
