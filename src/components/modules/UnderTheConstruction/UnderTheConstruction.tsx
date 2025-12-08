'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';
import Link from 'next/link';

const UnderTheConstruction = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-linear-to-r from-purple-200 via-pink-100 to-yellow-100 p-4'>
      <Card className='w-full max-w-md shadow-2xl border-2 border-dashed border-gray-300 animate-pulse'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold flex items-center justify-center gap-2'>
            <Construction className='w-6 h-6 text-orange-500 animate-bounce' />
            Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent className='text-center space-y-4'>
          <p className='text-gray-700'>
            🚧 Sorry! This page is currently under construction. We are working
            hard to bring it to life.
          </p>
          <p className='text-sm text-gray-500'>
            Check back soon for updates or go back to the homepage.
          </p>
          <Link href='/'>
            <Button className='bg-linear-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform'>
              Go to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderTheConstruction;
