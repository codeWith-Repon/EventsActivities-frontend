import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import GlassCard from '@/components/dashboard/GlassCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { getMyHostedEvents } from '@/services/events/hostEvents';
import { formatDate } from '@/lib/formatter';
import { dashboardFontVars } from '@/lib/dashboard-fonts';
import { userPlaceholderImage } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarRange, Settings2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ManageEventsHub = async () => {
  const user = await getUserInfo();
  const userId = user?.data?.id;
  const events = userId ? await getMyHostedEvents(userId) : [];

  return (
    <div
      className={`aurora aurora-light aurora-canvas ${dashboardFontVars} min-h-screen bg-background font-sans text-foreground p-4 md:p-6`}
    >
      <div className='mx-auto max-w-6xl space-y-6'>
        <PageHeader
          kicker='Host tools'
          title='Manage your events'
          description='Analytics, invitations, check-in, and co-hosts for events you host.'
        />

        {events.length === 0 ? (
          <EmptyState
            icon={CalendarRange}
            title='You’re not hosting any events yet'
            description='Create an event to unlock host tools like analytics, invitations, and check-in.'
          />
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {events.map((e) => (
              <GlassCard key={e.id} className='overflow-hidden p-0'>
                <div className='relative h-28 overflow-hidden border-b border-border'>
                  <Image
                    src={e.images?.[0] || userPlaceholderImage}
                    alt={e.title}
                    fill
                    sizes='400px'
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
                  <div className='absolute bottom-2 left-3 right-3 flex items-end justify-between'>
                    <span className='font-mono text-[10px] uppercase tracking-wider text-white/70'>
                      {e.category}
                    </span>
                    <StatusBadge status={e.status} />
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='truncate font-display text-lg font-semibold text-foreground'>
                    {e.title}
                  </h3>
                  <p className='mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                    {formatDate(e.date)}
                  </p>
                  <Link
                    href={`/manage-event/${e.slug}`}
                    className='mt-4 inline-flex w-full items-center justify-between rounded-lg bg-gradient-aurora px-4 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110'
                  >
                    <span className='inline-flex items-center gap-2'>
                      <Settings2 className='size-4' />
                      Manage
                    </span>
                    <ArrowUpRight className='size-4' />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEventsHub;
