'use client';

import React from 'react';
import EventCard from './EventCard';
import { ArrowRight } from 'lucide-react';

const FeaturedEvents: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Sunset Hiking Adventure',
      image:
        'https://pixabay.com/get/g1144017e70fde8cd9489f7fa65727b5a05184e339d612382a575bca86fb40d36ae1141372c8bba8ea7379062dcf0fa83ec26739b565c1b3ad3a78b17ba278202_1280.jpg',
      date: 'Sat, Jun 15',
      time: '05:00 PM',
      location: 'Echo Mountain Trail',
      price: 'Free',
      host: {
        name: 'Alex M.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.9,
      },
      category: 'Outdoors',
    },
    {
      id: 2,
      title: 'Indie Music Night',
      image:
        'https://pixabay.com/get/g81da55586b83af75fdd74c2ea1675f646339ef969275bc41e27c5632f514838b7a64bb0dc8b9228426d7629b8efba72341d5bcadf672ba16fe50f84789fa8104_1280.jpg',
      date: 'Fri, Jun 21',
      time: '08:00 PM',
      location: 'The Velvet Lounge',
      price: '$15',
      host: {
        name: 'Sarah J.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4.8,
      },
      category: 'Music',
    },
    {
      id: 3,
      title: 'Board Game Marathon',
      image:
        'https://pixabay.com/get/g6eb6f8a3a51d9acc117936e3d92dc5e146387bba3ba3d67b6fd1d37296f15eacc36e1c67ad0f160fe70629aa8b8d6745d5c64143d7c00b47228b551f38935cc2_1280.jpg',
      date: 'Sun, Jun 23',
      time: '02:00 PM',
      location: 'Dice & Brews Cafe',
      price: '$5',
      host: {
        name: 'Mike T.',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        rating: 5.0,
      },
      category: 'Gaming',
    },
    {
      id: 4,
      title: 'Italian Cooking Class',
      image:
        'https://pixabay.com/get/g390118fe85e9bb4ee6e4a453fbffdba32eade97a0cde83a8cdf55bf1a9bfc8104c335546c58f9f76b0003f9e68ccd68718c48e24fda992ddf8a8e288921f4be0_1280.jpg',
      date: 'Wed, Jun 26',
      time: '06:30 PM',
      location: 'Culinary Arts Center',
      price: '$45',
      host: {
        name: 'Chef Elena',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 4.9,
      },
      category: 'Food',
    },
  ];

  return (
    <section className='py-20 bg-background-soft'>
      <div className='container-custom'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-4'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold mb-3'>
              Events Near You
            </h2>
            <p className='text-muted-foreground text-lg'>
              Join these upcoming activities in your area
            </p>
          </div>
          <div className='flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto'>
            <button className='px-4 py-2 rounded-full bg-white border border-gray-200 text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors whitespace-nowrap'>
              Today
            </button>
            <button className='px-4 py-2 rounded-full bg-white border border-gray-200 text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors whitespace-nowrap'>
              This Week
            </button>
            <button className='px-4 py-2 rounded-full bg-primary text-white font-medium shadow-md whitespace-nowrap'>
              This Weekend
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {events.map((event, index) => (
            <EventCard event={event} key={event.id} index={index} />
          ))}
        </div>

        <div className='mt-12 text-center'>
          <button className='btn-secondary inline-flex items-center gap-2'>
            See More Events <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
