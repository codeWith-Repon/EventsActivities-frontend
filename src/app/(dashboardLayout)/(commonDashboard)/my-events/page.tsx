import EventsDashboard from '@/components/modules/my-events/EventsDashboard';
import { queryStringFormatter } from '@/lib/formatter';
import { getUserInfo } from '@/services/auth/getUserInfo';
import getAllParticipant from '@/services/participant/getAllParticipant';
import Link from 'next/link';
import { Settings2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

const MyEventsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getUserInfo();

  const searchParamsObj = await searchParams;
  searchParamsObj.userId = user?.data?.id;

  const queryString = queryStringFormatter(searchParamsObj);
  const { data } = await getAllParticipant(queryString);

  return (
    <div>
      <div className='container-custom pt-4'>
        <Link
          href='/manage-events'
          className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10'
        >
          <Settings2 className='h-4 w-4' />
          Host tools — manage your events
        </Link>
      </div>
      <EventsDashboard participants={data} user={user!.data} />
    </div>
  );
};

export default MyEventsPage;
