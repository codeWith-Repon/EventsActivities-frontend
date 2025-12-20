import EventsDashboard from '@/components/modules/my-events/EventsDashboard';
import { queryStringFormatter } from '@/lib/formatter';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getAllEvent } from '@/services/events/getAllEvent';
import getAllParticipant from '@/services/participant/getAllParticipant';

export const dynamic = 'force-dynamic';

const MyEventsPage = async () => {
  const user = await getUserInfo();

  const userId = user?.data?.id;
  const hostId = user?.data?.hosts?.id;

  const participantQuery = queryStringFormatter({ userId });
  const completedEventsQuery = queryStringFormatter({
    userId,
    'event.status': 'COMPLETED',
  });
  const eventQuery = queryStringFormatter({ hostId });

  const [participantData, completedEvents, myEvents] = await Promise.all([
    getAllParticipant(participantQuery),
    getAllParticipant(completedEventsQuery),
    getAllEvent(eventQuery),
  ]);

  return (
    <div>
      <EventsDashboard
        participants={participantData.data || []}
        completedEvents={completedEvents?.data || []}
        myEvents={myEvents.data || []}
        user={user!.data}
      />
    </div>
  );
};

export default MyEventsPage;
