import EmptyState from '@/components/dashboard/EmptyState';
import InvitationsManager from '@/components/modules/ManageEvent/InvitationsManager';
import getEvent from '@/services/events/getEvent';
import { getEventInvitations } from '@/services/invitation/invitation.service';
import { IEvent } from '@/types/events.interface';
import { IInvitation } from '@/types/invitation.interface';
import { MailX } from 'lucide-react';

export const dynamic = 'force-dynamic';

const InvitationsTab = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const eventRes = await getEvent(slug);
  const event = eventRes?.data as IEvent | undefined;

  if (!event) {
    return (
      <EmptyState
        icon={MailX}
        title='Event not found'
        description='Couldn’t load this event. Make sure the backend is running and you host it.'
      />
    );
  }

  const invRes = await getEventInvitations(event.id);
  const invitations: IInvitation[] = invRes?.data ?? [];

  return <InvitationsManager eventId={event.id} invitations={invitations} />;
};

export default InvitationsTab;
