import PaymentSuccessCard from '@/components/modules/payment/SuccessCard';
import { getAllEvent } from '@/services/events/getAllEvent';

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: { transactionId: string; amount: string; event: string };
}) => {
  const { transactionId, event } = await searchParams;

  const result = await getAllEvent(`id=${event}`);

  const eventInfo = result?.data?.data[0] || {};

  console.log('===================', result);

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50 p-4'>
      <PaymentSuccessCard
        event={eventInfo}
        transactionId={transactionId || ''}
      />
    </div>
  );
};

export default PaymentSuccessPage;
