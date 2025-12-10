import EventDetailsHero from '@/components/modules/EventDetails/EventDetailsHero';
import getEvent from '@/services/events/getEvent';
import getAllParticipant from '@/services/participant/getAllParticipant';

const EventDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { data: event } = await getEvent(slug);
  const { data: participant } = await getAllParticipant(
    `eventId=${event.id}&hostId=${event.hostId}&joinStatus=APPROVED`
  );

  return (
    <div className='min-h-screen bg-slate-50 pb-20 mt-23'>
      <EventDetailsHero event={event} participants={participant} />
    </div>
  );
};

export default EventDetailsPage;
