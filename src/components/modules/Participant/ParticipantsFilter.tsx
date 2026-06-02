'use client';

import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/dashboard/SelectFilter';
import ClearFiltersButton from '@/components/shared/ClearFiltersButtons';
import RefreshButton from '@/components/shared/RefreshButton';

const ParticipantsFilter = () => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
      <div className='min-w-[220px] flex-1'>
        <SearchFilter placeholder='Search user, email, event…' />
      </div>

      <SelectFilter
        paramName='joinStatus'
        placeholder='Join status'
        allLabel='All join statuses'
        options={[
          { label: 'Pending', value: 'PENDING' },
          { label: 'Approved', value: 'APPROVED' },
          { label: 'Rejected', value: 'REJECTED' },
          { label: 'Cancelled', value: 'CANCELLED' },
          { label: 'Waitlisted', value: 'WAITLISTED' },
        ]}
      />

      <SelectFilter
        paramName='paymentStatus'
        placeholder='Payment'
        allLabel='All payments'
        options={[
          { label: 'Pending', value: 'PENDING' },
          { label: 'Paid', value: 'PAID' },
          { label: 'Failed', value: 'FAILED' },
          { label: 'Refunded', value: 'REFUNDED' },
          { label: 'Cancelled', value: 'CANCELLED' },
        ]}
      />

      <div className='flex items-center gap-2'>
        <ClearFiltersButton />
        <RefreshButton />
      </div>
    </div>
  );
};

export default ParticipantsFilter;
