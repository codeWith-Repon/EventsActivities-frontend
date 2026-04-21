import React from 'react';
import { HeroCollageImage } from '@/assets';
import HeroBadge from './HeroBadge';
import HeroText from './HeroText';
import HeroCTA from './HeroCTA';
import HeroCollage from './HeroCollage';

const Hero: React.FC = () => {
  const activityCards = [
    {
      id: 1,
      title: 'Hiking Group',
      image: HeroCollageImage.hiking.src,
      category: 'Outdoors',
      position: 'top-0 right-[10%] z-10',
      size: 'w-48 h-64',
    },
    {
      id: 2,
      title: 'Music Concert',
      image: HeroCollageImage.music.src,
      category: 'Music',
      position: 'top-[20%] right-[45%] z-20',
      size: 'w-56 h-40',
    },
    {
      id: 3,
      title: 'Board Games',
      image: HeroCollageImage.board_game.src,
      category: 'Gaming',
      position: 'bottom-[10%] right-[42%] z-30',
      size: 'w-44 h-44',
    },
    {
      id: 4,
      title: 'Food & Dining',
      image: HeroCollageImage.food_dining.src,
      category: 'Dining',
      position: 'bottom-[20%] right-[5%] z-0',
      size: 'w-52 h-52',
    },
  ];

  return (
    <section className='relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden bg-background-soft'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/20  blur-[80px] -z-10' />
        <div className='absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[60px] bg-red-600/10 -z-10' />
        <div className='absolute top-[40%] left-[30%] w-[20%] h-[20%] rounded-full bg-blue-400/8  blur-[50px] -z-10' />
      </div>

      <div className='container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        <div className='max-w-2xl '>
          <HeroBadge text='New Communities Added' />

          <div className='mb-6'>
            <HeroText>Find Your People.</HeroText>
            <HeroText gradient>Share Moments.</HeroText>
            <HeroText>Start Real Adventures.</HeroText>
          </div>

          <p className='text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg'>
            Discover local events and join people who enjoy the same
            activities—music, hikes, games, workshops and more.
          </p>

          <HeroCTA
            primaryText='Explore Events'
            secondaryText='How it Works'
          />
        </div>

        <HeroCollage cards={activityCards} />
      </div>
    </section>
  );
};

export default Hero;
