import ShowEventDetails from '@/components/modules/payment/ShowEventDetails';
import getAllParticipant from '@/services/participant/getAllParticipant';

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: { slug: string; id: string };
}) => {
  const { id } = await searchParams;

  const result = await getAllParticipant(`id=${id}`);
  const participant = result?.data?.data[0];

  return (
    <div className='mt-5'>
      <ShowEventDetails participant={participant} />
    </div>
  );
};

export default PaymentPage;
