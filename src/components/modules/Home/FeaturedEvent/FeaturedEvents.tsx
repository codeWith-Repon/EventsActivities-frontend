'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IEvent } from '@/types/events.interface';
import EventCard from './EventCard';

const FeaturedEvents: React.FC = () => {
  return (
    <section className='py-20 bg-linear-to-r from-gray-50 to-gray-100'>
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

export const events: IEvent[] = [
  {
    id: '1',
    title: 'Sunset Hiking Adventure',
    slug: 'sunset-hiking-adventure',
    category: 'Outdoors',
    description: 'Join us for a refreshing sunset hike at Echo Mountain Trail.',
    date: '2025-06-15',
    time: '17:00',
    location: 'Echo Mountain Trail',
    minParticipants: 1,
    maxParticipants: 20,
    totalParticipants: 12,
    fee: 0,
    images: [
      'https://pixabay.com/get/g1144017e70fde8cd9489f7fa65727b5a05184e339d612382a575bca86fb40d36ae1141372c8bba8ea7379062dcf0fa83ec26739b565c1b3ad3a78b17ba278202_1280.jpg',
    ],
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hostId: 'host-1',
    host: {
      id: 'host-1',
      userId: 'user-1',
      rating: 4.9,
      totalEventsHosted: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        name: 'Alex M.',
        email: 'alex@example.com',
        role: 'HOST',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        gender: 'male',
      },
    },
  },

  {
    id: '2',
    title: 'Indie Music Night',
    slug: 'indie-music-night',
    category: 'Music',
    description: 'A night of indie performances at The Velvet Lounge.',
    date: '2025-06-21',
    time: '20:00',
    location: 'The Velvet Lounge',
    minParticipants: 1,
    maxParticipants: 100,
    totalParticipants: 55,
    fee: 15,
    images: [
      'https://pixabay.com/get/g81da55586b83af75fdd74c2ea1675f646339ef969275bc41e27c5632f514838b7a64bb0dc8b9228426d7629b8efba72341d5bcadf672ba16fe50f84789fa8104_1280.jpg',
    ],
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hostId: 'host-2',
    host: {
      id: 'host-2',
      userId: 'user-2',
      rating: 4.8,
      totalEventsHosted: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        name: 'Sarah J.',
        email: 'sarah@example.com',
        role: 'HOST',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        gender: 'female',
      },
    },
  },

  {
    id: '3',
    title: 'Board Game Marathon',
    slug: 'board-game-marathon',
    category: 'Gaming',
    description: 'Spend your weekend with fun board games and friends.',
    date: '2025-06-23',
    time: '14:00',
    location: 'Dice & Brews Cafe',
    minParticipants: 2,
    maxParticipants: 30,
    totalParticipants: 18,
    fee: 5,
    images: [
      'https://pixabay.com/get/g6eb6f8a3a51d9acc117936e3d92dc5e146387bba3ba3d67b6fd1d37296f15eacc36e1c67ad0f160fe70629aa8b8d6745d5c64143d7c00b47228b551f38935cc2_1280.jpg',
    ],
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hostId: 'host-3',
    host: {
      id: 'host-3',
      userId: 'user-3',
      rating: 5.0,
      totalEventsHosted: 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        name: 'Mike T.',
        email: 'mike@example.com',
        role: 'HOST',
        profileImage: 'https://randomuser.me/api/portraits/men/85.jpg',
        gender: 'male',
      },
    },
  },

  {
    id: '4',
    title: 'Italian Cooking Class',
    slug: 'italian-cooking-class',
    category: 'Food',
    description: 'Learn to cook authentic Italian dishes from a pro chef.',
    date: '2025-06-26',
    time: '18:30',
    location: 'Culinary Arts Center',
    minParticipants: 1,
    maxParticipants: 15,
    totalParticipants: 10,
    fee: 45,
    images: [
      'https://pixabay.com/get/g390118fe85e9bb4ee6e4a453fbffdba32eade97a0cde83a8cdf55bf1a9bfc8104c335546c58f9f76b0003f9e68ccd68718c48e24fda992ddf8a8e288921f4be0_1280.jpg',
    ],
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hostId: 'host-4',
    host: {
      id: 'host-4',
      userId: 'user-4',
      rating: 4.9,
      totalEventsHosted: 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        name: 'Chef Elena',
        email: 'elena@example.com',
        role: 'HOST',
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
        gender: 'female',
      },
    },
  },
];
