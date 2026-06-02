'use client';

import ManagementTable, { RowAction } from '@/components/shared/ManagementTable';
import { IHostListItem } from '@/types/host.interface';
import { hostColumn } from './HostsColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import HostStatsDialog from './HostStatsDialog';
import { toast } from 'sonner';
import { verifyHost } from '@/services/host/host.service';
import { BadgeCheck, ShieldX } from 'lucide-react';

const HostsTable = ({ hosts }: { hosts: IHostListItem[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [statsHost, setStatsHost] = useState<IHostListItem | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const toggleVerify = async (host: IHostListItem) => {
    setPendingId(host.id);
    const result = await verifyHost(host.id, !host.isVerified);
    setPendingId(null);
    if (result?.success) {
      toast.success(host.isVerified ? 'Verification removed' : 'Host verified');
      startTransition(() => router.refresh());
    } else {
      toast.error(result?.message || 'Failed to update verification');
    }
  };

  const actions: RowAction<IHostListItem>[] = [
    {
      label: 'Verify host',
      icon: BadgeCheck,
      show: (h) => !h.isVerified,
      onClick: toggleVerify,
    },
    {
      label: 'Remove verification',
      icon: ShieldX,
      variant: 'destructive',
      show: (h) => h.isVerified,
      onClick: toggleVerify,
    },
  ];

  return (
    <>
      <ManagementTable
        data={hosts}
        columns={hostColumn}
        getRowKey={(h) => h.id}
        emptyMessage='No hosts found'
        onView={setStatsHost}
        actions={actions}
        isRefreshing={!!pendingId}
      />

      <HostStatsDialog
        open={!!statsHost}
        onOpenChange={(open) => !open && setStatsHost(null)}
        hostId={statsHost?.id}
        hostName={statsHost?.user?.name}
      />
    </>
  );
};

export default HostsTable;
