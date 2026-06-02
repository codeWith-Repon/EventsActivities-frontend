'use client';

import SelectFilter from '@/components/dashboard/SelectFilter';
import ClearFiltersButton from '@/components/shared/ClearFiltersButtons';
import RefreshButton from '@/components/shared/RefreshButton';

const ReportsFilter = () => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
      <SelectFilter
        paramName='type'
        placeholder='Type'
        allLabel='All types'
        options={[
          { label: 'Event', value: 'EVENT' },
          { label: 'Rating', value: 'RATING' },
        ]}
      />
      <SelectFilter
        paramName='status'
        placeholder='Status'
        allLabel='All statuses'
        options={[
          { label: 'Pending', value: 'PENDING' },
          { label: 'Resolved', value: 'RESOLVED' },
          { label: 'Dismissed', value: 'DISMISSED' },
        ]}
      />
      <div className='flex items-center gap-2'>
        <ClearFiltersButton />
        <RefreshButton />
      </div>
    </div>
  );
};

export default ReportsFilter;
