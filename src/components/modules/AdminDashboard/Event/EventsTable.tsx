'use client';

import ManagementTable, { RowAction } from '@/components/shared/ManagementTable';
import { IEvent } from '@/types/events.interface';
import { eventColumn } from './EventsColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import EventViewDialog from './EventViewDialog';
import ConfirmActionDialog from '@/components/dashboard/ConfirmActionDialog';
import { toast } from 'sonner';
import { forceCancelEvent } from '@/services/events/eventAdmin';
import { Ban } from 'lucide-react';

const EventsTable = ({ events }: { events: IEvent[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewing, setViewing] = useState<IEvent | null>(null);
  const [cancelTarget, setCancelTarget] = useState<IEvent | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const confirmCancel = async () => {
    if (!cancelTarget) return;
    setIsCancelling(true);
    const result = await forceCancelEvent(cancelTarget.id);
    setIsCancelling(false);
    if (result?.success) {
      toast.success('Event force-cancelled');
      setCancelTarget(null);
      startTransition(() => router.refresh());
    } else {
      toast.error(result?.message || 'Failed to cancel event');
    }
  };

  const actions: RowAction<IEvent>[] = [
    {
      label: 'Force cancel',
      icon: Ban,
      variant: 'destructive',
      show: (e) => e.status !== 'CANCELLED' && e.status !== 'COMPLETED',
      onClick: setCancelTarget,
    },
  ];

  return (
    <>
      <ManagementTable
        data={events}
        columns={eventColumn}
        getRowKey={(e) => e.id}
        emptyMessage='No events found'
        onView={setViewing}
        actions={actions}
      />

      <EventViewDialog
        open={!!viewing}
        onClose={() => setViewing(null)}
        event={viewing}
      />

      <ConfirmActionDialog
        open={!!cancelTarget}
        onOpenChange={(open) => !open && setCancelTarget(null)}
        onConfirm={confirmCancel}
        title='Force-cancel event'
        description={`"${cancelTarget?.title}" will be cancelled and all approved participants notified. This can’t be undone.`}
        confirmLabel='Force cancel'
        variant='destructive'
        loading={isCancelling}
      />
    </>
  );
};

export default EventsTable;
