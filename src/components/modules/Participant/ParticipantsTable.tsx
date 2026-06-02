'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { IParticipantResponse } from '@/types/participant.interface';
import { participantColumn } from './ParticipantsColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ParticipantViewDialog from './ParticipantViewDialog';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import { toast } from 'sonner';
import { deleteParticipant } from '@/services/participant/participant.service';

const ParticipantsTable = ({ rows }: { rows: IParticipantResponse[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewing, setViewing] = useState<IParticipantResponse | null>(null);
  const [deleting, setDeleting] = useState<IParticipantResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleting) return;
    setIsDeleting(true);
    const result = await deleteParticipant(deleting.id);
    setIsDeleting(false);
    if (result?.success) {
      toast.success('Participant record deleted');
      setDeleting(null);
      startTransition(() => router.refresh());
    } else {
      toast.error(result?.message || 'Failed to delete record');
    }
  };

  return (
    <>
      <ManagementTable
        data={rows}
        columns={participantColumn}
        getRowKey={(p) => p.id}
        emptyMessage='No participants found'
        onView={setViewing}
        onDelete={setDeleting}
      />

      <ParticipantViewDialog
        open={!!viewing}
        onClose={() => setViewing(null)}
        participant={viewing}
      />

      <DeleteConfirmationDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={confirmDelete}
        title='Delete participant record'
        description={`Delete ${deleting?.user?.name}'s record for "${deleting?.event?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ParticipantsTable;
