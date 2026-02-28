'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { IEvent } from '@/types/events.interface';
import { eventColumns } from './EventsColumn';
import { EventViewDialog } from './EventViewDialog';
import { useState } from 'react';

interface IEventTableSectionProps {
  events: IEvent[];
}
export default function EventTableSection({ events }: IEventTableSectionProps) {
  const [viewEvent, setViewEvent] = useState<IEvent | null>(null);

  const handleView = (event: IEvent) => {
    setViewEvent(event);
  };
  return (
    <>
      <ManagementTable
        data={events || []}
        columns={eventColumns}
        getRowKey={(event) => event.id}
        emptyMessage='No user found'
        onView={handleView}
      />
      <EventViewDialog
        event={viewEvent}
        onOpenChange={() => setViewEvent(null)}
        isOpen={!!viewEvent}
      />
    </>
  );
}
