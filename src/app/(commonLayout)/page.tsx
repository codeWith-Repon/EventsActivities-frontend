import EventCategory from '@/components/modules/Home/EventCategory';
import FeaturedEvents from '@/components/modules/Home/FeaturedEvent/FeaturedEvents';
import Hero from '@/components/modules/Home/Hero/Hero';

const Home = () => {
  return (
    <>
      <Hero />
      <EventCategory />
      <FeaturedEvents />
    </>
  );
};

export default Home;
