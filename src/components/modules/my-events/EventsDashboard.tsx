'use client';

import { Calendar, DollarSign, LayoutDashboard, Users } from 'lucide-react';
import { useState } from 'react';
import StatCard from './StateCard';
import EventsDashboardHeader from './EventsDashboardHeader';
import ActiveEvents from './ActiveEvents';
import CompletedEvents from './CompletedEvents';
import { IEvent, IParticipant, Meta } from '@/types/events.interface';
import { IUserInfo } from '@/types/user.interface';
import JoinedEvents from './JoinedEvents';

interface EventsDashboardProps {
  participants: {
    data: IParticipant[];
    meta: Meta;
  };
  completedEvents?: {
    data: IParticipant[];
    meta: Meta;
  };
  myEvents?: {
    data: IEvent[];
    meta: Meta;
  };
  user?: IUserInfo | null;
}

export default function EventsDashboard({
  participants,
  completedEvents,
  myEvents,
  user,
}: EventsDashboardProps) {
  const [userRole, setUserRole] = useState<'HOST' | 'USER'>('HOST');

  return (
    <div className='min-h-[90vh] bg-gray-50/50  pb-20 mt-4'>
      {/* Header Section */}
      <div className='max-w-7xl mx-auto space-y-9'>
        <EventsDashboardHeader
          userRole={userRole}
          user={user!}
          setUserRole={setUserRole}
        />

        {user?.role !== 'USER' && userRole === 'HOST' && (
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

        {user?.role !== 'USER' && userRole === 'HOST' && (
          <ActiveEvents events={myEvents?.data || []} userRole={userRole} />
        )}

        <JoinedEvents participants={participants.data} />

        {completedEvents && completedEvents.data.length > 0 && (
          <CompletedEvents events={completedEvents.data.map((p) => p.event)} />
        )}
      </div>
    </div>
  );
}
