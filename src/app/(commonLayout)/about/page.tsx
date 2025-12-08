import { CallToAction } from '@/components/modules/About/CallToAction';
import { CommunityImpact } from '@/components/modules/About/CommunityImpact';
import { ForUsersHosts } from '@/components/modules/About/ForUsersHosts';
import Hero from '@/components/modules/About/Hero';
import { HowItWorks } from '@/components/modules/About/HowItWork';
import { Mission } from '@/components/modules/About/Mission';
import { WhyChooseUs } from '@/components/modules/About/WhyChooseUs';

const AboutPage = () => {
  return (
    <>
      <Hero />
      <Mission />
      <HowItWorks />
      <WhyChooseUs />
      <ForUsersHosts />
      <CommunityImpact />
      <CallToAction />
    </>
  );
};

export default AboutPage;
