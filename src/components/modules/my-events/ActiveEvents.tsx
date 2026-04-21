'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { IEvent } from '@/types/events.interface';
import DashboardCard from '../Dashboard/DashboardCard';
import deleteEvent from '@/services/events/deleteEvents';
import EditEventFormDialog from '../EditEvent/EditEventFormDialog';
import { toast } from 'sonner';

interface IActiveEventsProps {
  userRole: 'HOST' | 'USER';
  events: IEvent[] | [];
  loading?: boolean;
}

const ActiveEvents = ({ userRole, events, loading }: IActiveEventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const router = useRouter();

  const handleEditEvent = (event: IEvent) => {
    setSelectedEvent(event);
    setEditDialogOpen(true);
  };

  const handleDeleteEvent = async (event: IEvent) => {
    try {
      const result = await deleteEvent(event.slug);
      if (result!.success) {
        toast.success('Event deleted successfully');
        router.refresh();
      } else {
        toast.error(result!.message || 'Failed to delete event');
      }
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };
  return (
    <section className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold flex items-center gap-2'>
          <Calendar className='w-5 h-5 text-primary' />
          Your Events
        </h2>
        <Button
          variant='ghost'
          className='text-sm text-muted-foreground hover:text-primary hover:bg-transparent cursor-pointer'
          disabled={events.length === 0}
        >
          View All <ArrowRight className='w-4 h-4 ml-1' />
        </Button>
      </div>

      {loading ? (
        <p className='text-muted-foreground text-center'>
          <span className='animate-pulse '>Loading...</span>
        </p>
      ) : events.length === 0 ? (
        <p className='text-muted-foreground text-center'>You have no events</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {events.slice(0, 4).map((event) => (
            <DashboardCard
              key={event.id}
              event={event}
              onEdit={userRole === 'HOST' ? handleEditEvent : undefined}
              onDelete={userRole === 'HOST' ? handleDeleteEvent : undefined}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EditEventFormDialog
          event={selectedEvent}
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
        />
      )}
    </section>
  );
};

export default ActiveEvents;
