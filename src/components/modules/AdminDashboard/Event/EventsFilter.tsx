'use client';

import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/dashboard/SelectFilter';
import ClearFiltersButton from '@/components/shared/ClearFiltersButtons';
import RefreshButton from '@/components/shared/RefreshButton';

const EventsFilter = ({ categories }: { categories: string[] }) => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
      <div className='min-w-[220px] flex-1'>
        <SearchFilter placeholder='Search title, location, category…' />
      </div>

      <SelectFilter
        paramName='status'
        placeholder='Status'
        allLabel='All statuses'
        options={[
          { label: 'Open', value: 'OPEN' },
          { label: 'Full', value: 'FULL' },
          { label: 'Completed', value: 'COMPLETED' },
          { label: 'Cancelled', value: 'CANCELLED' },
        ]}
      />

      {categories.length > 0 && (
        <SelectFilter
          paramName='category'
          placeholder='Category'
          allLabel='All categories'
          options={categories.map((c) => ({ label: c, value: c }))}
        />
      )}

      <div className='flex items-center gap-2'>
        <ClearFiltersButton />
        <RefreshButton />
      </div>
    </div>
  );
};

export default EventsFilter;
