import EventCategory from '@/components/modules/Home/EventCategory';
import FeaturedEvents from '@/components/modules/Home/FeaturedEvent/FeaturedEvents';
import Hero from '@/components/modules/Home/Hero/Hero';
import HowItWork from '@/components/modules/Home/HowItWork';

const Home = () => {
  return (
    <>
      <Hero />
      <EventCategory />
      <FeaturedEvents />
      <HowItWork />
    </>
  );
};

export default Home;
