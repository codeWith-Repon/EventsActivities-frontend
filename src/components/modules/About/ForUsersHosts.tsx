'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ForUsersHosts() {
  const router = useRouter();
  return (
    <section className='py-16 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* For Users */}
          <Card className='relative bg-white border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group'>
            <div className='absolute top-0 left-0 h-2 bg-primary/20  w-full'></div>
            <CardHeader>
              <div className='w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 text-gray-600'>
                <User className='h-6 w-6' />
              </div>
              <CardTitle className='text-2xl'>For Attendees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-slate-600 mb-6'>
                Find events that match your vibe. Whether you&aps;re into
                hiking, coding, cooking, or gaming, there&aps;s a community
                waiting for you.
              </p>
              <ul className='space-y-2 mb-8 text-slate-600 text-sm'>
                <li className='flex items-center'>
                  • Personalized recommendations
                </li>
                <li className='flex items-center'>• Easy RSVP management</li>
                <li className='flex items-center'>
                  • Connect with attendees beforehand
                </li>
              </ul>
              <Button
                className='w-full bg-slate-900 text-white hover:bg-slate-800 cursor-pointer'
                onClick={() => router.push('/events')}
              >
                Find an Event
              </Button>
            </CardContent>
          </Card>

          {/* For Hosts */}
          <Card className=' relative bg-white border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group'>
            <div className='absolute top-0 left-0 h-2 bg-primary/20  w-full'></div>
            <CardHeader>
              <div className='w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 text-gray-600'>
                <Calendar className='h-6 w-6' />
              </div>
              <CardTitle className='text-2xl'>For Hosts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-slate-600 mb-6'>
                Turn your passion into a gathering. We provide the tools you
                need to organize, manage, and promote your events effortlessly.
              </p>
              <ul className='space-y-2 mb-8 text-slate-600 text-sm'>
                <li className='flex items-center'>
                  • Powerful event management tools
                </li>
                <li className='flex items-center'>
                  • Secure payment processing
                </li>
                <li className='flex items-center'>
                  • Audience analytics & insights
                </li>
              </ul>
              <Button
                variant='outline'
                className='w-full border-slate-300 hover:bg-slate-50 cursor-pointer'
                onClick={() => router.push('/my-events')}
              >
                Create an Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
