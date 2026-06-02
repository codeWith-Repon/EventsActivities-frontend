'use client';

import ManagementTable, { RowAction } from '@/components/shared/ManagementTable';
import { IPaymentListItem } from '@/types/payment.interface';
import { paymentColumn } from './PaymentsColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ConfirmActionDialog from '@/components/dashboard/ConfirmActionDialog';
import { toast } from 'sonner';
import { refundPayment } from '@/services/payment/payment.service';
import { Undo2 } from 'lucide-react';

const PaymentsTable = ({ rows }: { rows: IPaymentListItem[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [refundTarget, setRefundTarget] = useState<IPaymentListItem | null>(null);
  const [isRefunding, setIsRefunding] = useState(false);

  const confirmRefund = async () => {
    if (!refundTarget) return;
    setIsRefunding(true);
    const result = await refundPayment(refundTarget.id);
    setIsRefunding(false);
    if (result?.success) {
      toast.success('Payment refunded');
      setRefundTarget(null);
      startTransition(() => router.refresh());
    } else {
      toast.error(result?.message || 'Failed to refund payment');
    }
  };

  const actions: RowAction<IPaymentListItem>[] = [
    {
      label: 'Refund',
      icon: Undo2,
      variant: 'destructive',
      show: (p) => p.paymentStatus === 'PAID',
      onClick: setRefundTarget,
    },
  ];

  return (
    <>
      <ManagementTable
        data={rows}
        columns={paymentColumn}
        getRowKey={(p) => p.id}
        emptyMessage='No payments found'
        actions={actions}
      />

      <ConfirmActionDialog
        open={!!refundTarget}
        onOpenChange={(open) => !open && setRefundTarget(null)}
        onConfirm={confirmRefund}
        title='Refund payment'
        description={`Refund ৳${refundTarget?.amount} to ${refundTarget?.user?.name}? The participant will be cancelled. Only PAID payments can be refunded.`}
        confirmLabel='Refund'
        variant='destructive'
        loading={isRefunding}
      />
    </>
  );
};

export default PaymentsTable;
