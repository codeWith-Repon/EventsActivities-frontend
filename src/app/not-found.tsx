'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

const Custom404 = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-yellow-50 p-6 relative overflow-hidden'>
      {/* Floating circles as confetti */}
      <span className='absolute w-4 h-4 bg-pink-400 rounded-full animate-bounce-slow top-10 left-20 opacity-70'></span>
      <span className='absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce-slow top-32 left-1/2 opacity-60'></span>
      <span className='absolute w-5 h-5 bg-purple-400 rounded-full animate-bounce-slow top-1/2 left-3/4 opacity-50'></span>

      <div className='text-center space-y-6 z-10'>
        {/* Animated Icon */}
        <div className='flex justify-center animate-bounce'>
          <AlertCircle className='w-16 h-16 text-red-500' />
        </div>

        {/* Main Text */}
        <h1 className='text-6xl md:text-7xl font-extrabold text-gray-800 tracking-wide'>
          404
        </h1>
        <p className='text-2xl md:text-3xl font-semibold text-gray-700'>
          Oops! Event Not Found
        </p>
        <p className='text-gray-600 max-w-xl mx-auto'>
          The activity or event you’re looking for doesn’t exist… yet! Explore
          other exciting events happening right now.
        </p>

        {/* Call-to-action */}
        <div>
          <Link href='/'>
            <Button className='bg-linear-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform'>
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
