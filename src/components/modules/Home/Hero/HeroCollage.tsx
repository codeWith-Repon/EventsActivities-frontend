'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

const HeroCollage: React.FC<HeroCollageProps> = ({ cards, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
      className='relative h-[600px] hidden lg:block'
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + 0.2 + index * 0.1,
            ease: 'easeOut',
          }}
          className={`absolute ${card.position} ${card.size} rounded-3xl overflow-hidden shadow-xs border-4 border-white transform hover:-translate-y-2 transition-transform duration-500 group`}
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
        </motion.div>
      ))}

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.5 }}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-primary/20 rounded-full animate-[spin_60s_linear_infinite]'
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.7 }}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-primary/10 rounded-full'
      />
    </motion.div>
  );
};

export default HeroCollage;
