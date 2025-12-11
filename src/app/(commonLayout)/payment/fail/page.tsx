import PaymentFailCard from '@/components/modules/payment/FailCard';
import { getAllEvent } from '@/services/events/getAllEvent';

const PaymentFailPage = async ({
  searchParams,
}: {
  searchParams: { transactionId: string; amount: string; event: string };
}) => {
  const { transactionId, event } = await searchParams;

  const result = await getAllEvent(`id=${event}`);

  const events = result?.data?.data[0];

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50 p-4'>
      <PaymentFailCard event={events} transactionId={transactionId} />
    </div>
  );
};

export default PaymentFailPage;
