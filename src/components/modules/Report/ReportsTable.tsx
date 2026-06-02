'use client';

import ManagementTable, { RowAction } from '@/components/shared/ManagementTable';
import { IReport } from '@/types/report.interface';
import { reportColumn } from './ReportsColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ResolveReportDialog from './ResolveReportDialog';
import { toast } from 'sonner';
import { updateReport } from '@/services/report/report.service';
import { Gavel } from 'lucide-react';

const ReportsTable = ({ rows }: { rows: IReport[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [target, setTarget] = useState<IReport | null>(null);
  const [loading, setLoading] = useState(false);

  const confirm = async (status: 'RESOLVED' | 'DISMISSED', adminNote: string) => {
    if (!target) return;
    setLoading(true);
    const result = await updateReport(target.id, {
      status,
      adminNote: adminNote || undefined,
    });
    setLoading(false);
    if (result?.success) {
      toast.success(`Report ${status.toLowerCase()}`);
      setTarget(null);
      startTransition(() => router.refresh());
    } else {
      toast.error(result?.message || 'Failed to update report');
    }
  };

  const actions: RowAction<IReport>[] = [
    {
      label: 'Review',
      icon: Gavel,
      show: (r) => r.status === 'PENDING',
      onClick: setTarget,
    },
  ];

  return (
    <>
      <ManagementTable
        data={rows}
        columns={reportColumn}
        getRowKey={(r) => r.id}
        emptyMessage='No reports found'
        actions={actions}
      />

      <ResolveReportDialog
        open={!!target}
        onOpenChange={(open) => !open && setTarget(null)}
        report={target}
        onConfirm={confirm}
        loading={loading}
      />
    </>
  );
};

export default ReportsTable;
