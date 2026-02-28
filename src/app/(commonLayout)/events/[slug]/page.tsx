import EventDetailsHero from '@/components/modules/EventDetails/EventDetailsHero';
import getEvent from '@/services/events/getEvent';
import getAllParticipant from '@/services/participant/getAllParticipant';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: event } = await getEvent(slug);

  if (!event) {
    return { title: 'Event Not Found' };
  }

  return {
    title: `${event.title}`,
    description: event.description,
  };
}

const EventDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const { data: event } = await getEvent(slug);

  if (!event || !event.id) {
    notFound();
  }
  
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
