import EmptyState from '@/components/dashboard/EmptyState';
import CoHostsManager from '@/components/modules/ManageEvent/CoHostsManager';
import getEvent from '@/services/events/getEvent';
import { getCoHosts } from '@/services/cohost/cohost.service';
import { IEvent } from '@/types/events.interface';
import { ICoHost } from '@/types/cohost.interface';
import { UsersRound } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CoHostsTab = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const eventRes = await getEvent(slug);
  const event = eventRes?.data as IEvent | undefined;

  if (!event) {
    return (
      <EmptyState
        icon={UsersRound}
        title='Event not found'
        description='Couldn’t load this event. Make sure the backend is running and you host it.'
      />
    );
  }

  const res = await getCoHosts(event.id);
  const coHosts: ICoHost[] = res?.data ?? [];

  return <CoHostsManager eventId={event.id} coHosts={coHosts} />;
};

export default CoHostsTab;
