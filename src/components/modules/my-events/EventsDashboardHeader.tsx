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
import { IUserInfo } from '@/types/user.interface';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreateEventFormDialog from '../CreateEvents/CreateEventFormDialog';
import { useState } from 'react';

interface EventsDashboardHeaderProps {
  user: IUserInfo;
  userRole: 'HOST' | 'USER';
  setUserRole: (role: 'HOST' | 'USER') => void;
}

const EventsDashboardHeader = ({
  user,
  userRole,
  setUserRole,
}: EventsDashboardHeaderProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
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
            {(user.role === 'HOST' || user.isHost) && (
              <Select
                value={userRole}
                onValueChange={(v: any) => setUserRole(v)}
              >
                <SelectTrigger className='w-[140px] cursor-pointer'>
                  <SelectValue placeholder='Select Role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectContent>
                    <SelectItem
                      value='HOST'
                      className='focus:bg-slate-300/20 focus:text-slate-800 cursor-pointer'
                    >
                      Host View
                    </SelectItem>
                    <SelectItem
                      value='USER'
                      className='focus:bg-slate-300/20 focus:text-slate-800 cursor-pointer'
                    >
                      Attendee View
                    </SelectItem>
                  </SelectContent>
                </SelectContent>
              </Select>
            )}
            <CreateEventFormDialog
              open={isDialogOpen}
              setOpen={setIsDialogOpen}
            />
          </div>
        </div>

        <Button
          variant='outline'
          className='mt-4 cursor-pointer hover:bg-slate-100 hover:text-primary'
          onClick={() => router.back()}
        >
          <span>
            <ArrowLeft className='w-4 h-4 ' />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default EventsDashboardHeader;
