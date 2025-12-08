'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  DollarSign,
  LayoutDashboard,
  Plus,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import StatCard from './StateCard';
import { useRouter } from 'next/navigation';

export default function EventsDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'HOST' | 'USER'>('HOST');

  return (
    <div className='min-h-[90vh] bg-gray-50/50  pb-20 mt-4'>
      {/* Header Section */}
      <div className='bg-white border-b sticky top-0 z-30'>
        <div className='max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>
                My Events
              </h1>
              <p className='text-muted-foreground mt-1 text-sm sm:text-base'>
                Manage, create, and track all your events in one place.
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <Select
                value={userRole}
                onValueChange={(v: any) => setUserRole(v)}
              >
                <SelectTrigger className='w-[140px] cursor-pointer'>
                  <SelectValue placeholder='Select Role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='HOST'>Host View</SelectItem>
                  <SelectItem value='USER'>Attendee View</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className='gap-2 shadow-lg shadow-primary/20 cursor-pointer'
                onClick={() => router.push('/create-event')}
              >
                <Plus className='w-4 h-4' />
                <span className='hidden sm:inline'>Create Event</span>
                <span className='sm:hidden'>Create</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
}
