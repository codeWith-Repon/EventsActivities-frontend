import InviteResponse from '@/components/modules/ManageEvent/InviteResponse';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const InviteAcceptPage = () => {
  return (
    <Suspense fallback={null}>
      <InviteResponse />
    </Suspense>
  );
};

export default InviteAcceptPage;
