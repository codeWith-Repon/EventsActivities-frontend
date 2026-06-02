import PageHeader from '@/components/dashboard/PageHeader';
import StatusBadge from '@/components/dashboard/StatusBadge';
import ManageEventTabNav, {
  ManageTab,
} from '@/components/modules/ManageEvent/ManageEventTabNav';
import getEvent from '@/services/events/getEvent';
import { IEvent } from '@/types/events.interface';
import { dashboardFontVars } from '@/lib/dashboard-fonts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ManageEventLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await getEvent(slug);
  const event = res?.data as IEvent | undefined;

  const base = `/manage-event/${slug}`;
  const tabs: ManageTab[] = [
    { label: 'Analytics', href: base, icon: 'ChartColumn' },
    { label: 'Invitations', href: `${base}/invitations`, icon: 'Mail' },
    { label: 'Check-in', href: `${base}/check-in`, icon: 'QrCode' },
    { label: 'Co-hosts', href: `${base}/co-hosts`, icon: 'UsersRound' },
  ];

  return (
    <div
      className={`aurora aurora-light aurora-canvas ${dashboardFontVars} min-h-screen bg-background font-sans text-foreground p-4 md:p-6`}
    >
      <div className='mx-auto max-w-6xl space-y-6'>
        <Link
          href='/manage-events'
          className='inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='size-3.5' />
          All hosted events
        </Link>

        <PageHeader
          kicker='Manage event'
          title={event?.title ?? slug}
          description={event?.location}
          actions={event ? <StatusBadge status={event.status} /> : undefined}
        />

        <ManageEventTabNav tabs={tabs} />

        {children}
      </div>
    </div>
  );
};

export default ManageEventLayout;
