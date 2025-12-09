'use client';

import { Calendar, DollarSign, LayoutDashboard, Users } from 'lucide-react';
import { useState } from 'react';
import StatCard from './StateCard';
import EventsDashboardHeader from './EventsDashboardHeader';
import ActiveEvents from './ActiveEvents';
import { events } from '../Home/FeaturedEvent/FeaturedEvents';
import CompletedEvents from './CompletedEvents';
import JoinedEvents from './JoinedEvents';
import { useUser } from '@/hook/useUser';

export default function EventsDashboard() {
  const [userRole, setUserRole] = useState<'HOST' | 'USER'>('HOST');
  const { user } = useUser();

  return (
    <div className='min-h-[90vh] bg-gray-50/50  pb-20 mt-4'>
      {/* Header Section */}
      <div className='max-w-7xl mx-auto space-y-9'>
        <EventsDashboardHeader userRole={userRole} setUserRole={setUserRole} />

        {userRole === 'HOST' && (
          <div className='max-w-7xl mx-auto px-4 pb-6 sm:px-6 lg:px-8 mt-6 border-b'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              <StatCard
                title='Total Events'
                value='12'
                icon={LayoutDashboard}
                trend='8'
                trendUp={true}
              />
              <StatCard
                title='Active Events'
                value='4'
                icon={Calendar}
                trend='2'
                trendUp={true}
              />
              <StatCard
                title='Total Participants'
                value='1,248'
                icon={Users}
                trend='12'
                trendUp={true}
              />
              <StatCard
                title='Total Earnings'
                value='$12.4k'
                icon={DollarSign}
                trend='5'
                trendUp={true}
              />
            </div>
          </div>
        )}
        
        {(user?.role === 'HOST' ||
          user?.role === 'ADMIN' ||
          user?.role === 'SUPER_ADMIN') && (
          <ActiveEvents events={events} userRole={userRole} />
        )}
        <JoinedEvents events={events} />
        <CompletedEvents events={events} />
      </div>
    </div>
  );
}
