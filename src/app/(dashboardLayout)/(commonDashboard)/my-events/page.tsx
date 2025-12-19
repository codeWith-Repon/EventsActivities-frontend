import EventsDashboard from '@/components/modules/my-events/EventsDashboard';
import { queryStringFormatter } from '@/lib/formatter';
import { getUserInfo } from '@/services/auth/getUserInfo';
import getAllParticipant from '@/services/participant/getAllParticipant';

export const dynamic = 'force-dynamic';

const MyEventsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getUserInfo();

  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter({
    ...searchParamsObj,
    userId: user?.data?.id,
  });
  const { data } = await getAllParticipant(queryString);
 

  return (
    <div>
      <EventsDashboard participants={data} user={user!.data} />
    </div>
  );
};

export default MyEventsPage;
