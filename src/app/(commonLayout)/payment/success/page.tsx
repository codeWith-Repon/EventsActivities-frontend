import PaymentSuccessCard from '@/components/modules/payment/SuccessCard';
import { getAllEvent } from '@/services/events/getAllEvent';

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: { transactionId: string; amount: string; eventId: string };
}) => {
  const { transactionId, eventId } = await searchParams;

  const result = await getAllEvent(`id=${eventId}`);

  const event = result?.data?.data[0] || {};

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50 p-4'>
      <PaymentSuccessCard event={event} transactionId={transactionId || ''} />
    </div>
  );
};

export default PaymentSuccessPage;
