import React from 'react';
import Image from 'next/image';

interface ActivityCard {
  id: number;
  title: string;
  image: string;
  category: string;
  position: string;
  size: string;
}

interface HeroCollageProps {
  cards: ActivityCard[];
  delay?: number;
}

const HeroCollage: React.FC<HeroCollageProps> = ({ cards }) => {
  return (
    <div className='relative h-[600px] hidden lg:block'>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`absolute z-20 ${card.position} ${card.size} rounded-3xl overflow-hidden shadow-xs border-4 border-white transform hover:-translate-y-2 transition-transform duration-500 group`}
        >
          <Image
            src={card.image}
            alt={card.title}
            width={600}
            height={400}
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80' />
          <div className='absolute bottom-4 left-4 text-white'>
            <span className='text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-md mb-1 inline-block border border-white/10'>
              {card.category}
            </span>
            <p className='font-semibold text-lg'>{card.title}</p>
          </div>
        </div>
      ))}

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-primary/20 rounded-full animate-[spin_60s_linear_infinite]' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-primary/10 rounded-full' />
    </div>
  );
};

export default HeroCollage;
