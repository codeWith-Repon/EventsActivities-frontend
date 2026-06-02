'use client';

import SelectFilter from '@/components/dashboard/SelectFilter';
import ClearFiltersButton from '@/components/shared/ClearFiltersButtons';
import RefreshButton from '@/components/shared/RefreshButton';

const PaymentsFilter = () => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
      <SelectFilter
        paramName='paymentStatus'
        placeholder='Payment status'
        allLabel='All statuses'
        options={[
          { label: 'Paid', value: 'PAID' },
          { label: 'Pending', value: 'PENDING' },
          { label: 'Failed', value: 'FAILED' },
          { label: 'Refunded', value: 'REFUNDED' },
          { label: 'Cancelled', value: 'CANCELLED' },
          { label: 'Rejected', value: 'REJECTED' },
        ]}
      />
      <div className='flex items-center gap-2'>
        <ClearFiltersButton />
        <RefreshButton />
      </div>
    </div>
  );
};

export default PaymentsFilter;
