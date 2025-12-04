'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar } from 'lucide-react';

interface HeroSearchProps {
  delay?: number;
}

const HeroSearch: React.FC<HeroSearchProps> = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className='bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border  mb-10 max-w-xl'
    >
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='flex-1 relative group md:border-none border rounded-xl'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
          </div>
          <input
            type='text'
            className='block w-full pl-10 pr-3 py-3 bg-transparent border border-transparent rounded-xl focus:bg-white focus:border-primary/20 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-muted-foreground placeholder-gray-400'
            placeholder='Activity type...'
          />
        </div>

        <div className='w-px bg-gray-200 my-2 hidden md:block' />

        <div className='flex-1 relative group md:border-none border rounded-xl'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <MapPin className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
          </div>
          <input
            type='text'
            className='block w-full pl-10 pr-3 py-3 bg-transparent border border-transparent rounded-xl focus:bg-white focus:border-primary/20 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-muted-foreground placeholder-gray-400'
            placeholder='Location...'
          />
        </div>

        <div className='w-px bg-gray-200 my-2 hidden md:block' />

        <div className='flex-1 relative group md:border-none border rounded-xl'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Calendar className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
          </div>
          <input
            type='text'
            className='block w-full pl-10 pr-3 py-3 bg-transparent border border-transparent rounded-xl focus:bg-white focus:border-primary/20 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-muted-foreground placeholder-gray-400'
            placeholder='Date...'
          />
        </div>

        <button className='bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center cursor-pointer'>
          <Search className='h-5 w-5' />
        </button>
      </div>
    </motion.div>
  );
};

export default HeroSearch;
