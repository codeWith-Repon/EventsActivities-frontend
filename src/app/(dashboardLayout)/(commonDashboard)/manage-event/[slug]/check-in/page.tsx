import EmptyState from '@/components/dashboard/EmptyState';
import CheckInManager from '@/components/modules/ManageEvent/CheckInManager';
import getEvent from '@/services/events/getEvent';
import { getAttendance } from '@/services/checkin/checkin.service';
import { IEvent } from '@/types/events.interface';
import { IAttendance } from '@/types/attendance.interface';
import { QrCode } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CheckInTab = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const eventRes = await getEvent(slug);
  const event = eventRes?.data as IEvent | undefined;

  if (!event) {
    return (
      <EmptyState
        icon={QrCode}
        title='Event not found'
        description='Couldn’t load this event. Make sure the backend is running and you host it.'
      />
    );
  }

  const attRes = await getAttendance(event.id);
  const attendance = (attRes?.data as IAttendance | null) ?? null;

  return <CheckInManager eventId={event.id} attendance={attendance} />;
};

export default CheckInTab;
