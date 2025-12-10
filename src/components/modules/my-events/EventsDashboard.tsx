/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { Calendar, DollarSign, LayoutDashboard, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import StatCard from './StateCard';
import EventsDashboardHeader from './EventsDashboardHeader';
import ActiveEvents from './ActiveEvents';
import CompletedEvents from './CompletedEvents';
import { IEvent, IParticipant, Meta } from '@/types/events.interface';
import { IUserInfo } from '@/types/user.interface';
import JoinedEvents from './JoinedEvents';

export default function EventsDashboard({
  participants,
  user,
}: {
  participants: {
    data: IParticipant[];
    meta: Meta;
  };
  user?: IUserInfo | null;
}) {
  const [userRole, setUserRole] = useState<'HOST' | 'USER'>('HOST');
  const [activeEvents, setActiveEvents] = useState<IEvent[]>([]);
  const [activeLoading, setActiveLoading] = useState(true);
  const [JoinEvents, setJoinEvents] = useState<IEvent[]>([]);
  const [joinLoading, setJoinLoading] = useState(true);
  const [completedEvents, setCompletedEvents] = useState<IEvent[]>([]);
  const [completedLoading, setCompletedLoading] = useState(true);

  const events = participants?.data.map(
    (participant: IParticipant) => participant.event as IEvent
  );
  console.log(participants);
  useEffect(() => {
    setActiveLoading(true);
    const yourEvents = events.filter(
      (event) => event.hostId === user?.hosts?.id
    );
    setActiveEvents(yourEvents);
    setActiveLoading(false);
  }, [events, user]);

  useEffect(() => {
    setJoinLoading(true);
    const yourEvents = events.filter(
      (event) => event.hostId !== user?.hosts?.id
    );
    setJoinEvents(yourEvents);
    setJoinLoading(false);
  }, [events, user]);

  useEffect(() => {
    setCompletedLoading(true);
    const yourEvents = participants.data
      .filter((p) => {
        const participant = p.userId === user?.id;
        const isComplete = p.event.status === 'COMPLETED';
        if (participant && isComplete) return p.event;
      })
      .map((p) => p.event);

    setCompletedEvents(yourEvents);
    setCompletedLoading(false);
  }, [participants.data, user]);

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
          <ActiveEvents
            events={activeEvents}
            userRole={userRole}
            loading={activeLoading}
          />
        )}
        <JoinedEvents events={JoinEvents} loading={joinLoading} />
        <CompletedEvents events={completedEvents} loading={completedLoading} />
      </div>
    </div>
  );
}
