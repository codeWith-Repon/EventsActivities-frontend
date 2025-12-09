/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EventsDashboardHeaderProps {
  userRole: string;
  setUserRole: (role: 'HOST' | 'USER') => void;
}

const EventsDashboardHeader = ({
  userRole,
  setUserRole,
}: EventsDashboardHeaderProps) => {
  const router = useRouter();

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
            <Select value={userRole} onValueChange={(v: any) => setUserRole(v)}>
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
