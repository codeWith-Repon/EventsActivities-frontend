import PageHeader from '@/components/dashboard/PageHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import StatCard from '@/components/dashboard/StatCard';
import PaymentsFilter from '@/components/modules/payment/PaymentsFilter';
import PaymentsTable from '@/components/modules/payment/PaymentsTable';
import TablePagination from '@/components/shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatter';
import { getPayments } from '@/services/payment/payment.service';
import { IPaymentListItem } from '@/types/payment.interface';
import { CreditCard, Undo2, Wallet } from 'lucide-react';

export const dynamic = 'force-dynamic';

const num = (n: number) => new Intl.NumberFormat('en-US').format(n);

const PaymentsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getPayments(queryString);

  const rows: IPaymentListItem[] = res?.data?.data ?? [];
  const meta = res?.data?.meta;

  // page-level quick stats (current page)
  const paidOnPage = rows.filter((p) => p.paymentStatus === 'PAID');
  const collected = paidOnPage.reduce((s, p) => s + (p.amount ?? 0), 0);
  const refunded = rows.filter((p) => p.paymentStatus === 'REFUNDED').length;

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='Finance'
        title='Payments'
        description='Review transactions and issue refunds.'
      />

      {!res?.success && rows.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title='Couldn’t load payments'
          description='The API didn’t respond. Make sure the backend is running and you’re signed in as an admin.'
        />
      ) : (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <StatCard
              label='Transactions'
              value={num(meta?.total ?? rows.length)}
              icon={CreditCard}
              accent='violet'
            />
            <StatCard
              label='Collected (page)'
              value={`৳ ${num(collected)}`}
              icon={Wallet}
              accent='teal'
            />
            <StatCard
              label='Refunded (page)'
              value={num(refunded)}
              icon={Undo2}
              accent='fuchsia'
            />
          </div>

          <PaymentsFilter />
          <PaymentsTable rows={rows} />
          {meta && (
            <TablePagination
              currentPage={meta.page || 1}
              totalPages={meta.totalPage || 1}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PaymentsManagementPage;
