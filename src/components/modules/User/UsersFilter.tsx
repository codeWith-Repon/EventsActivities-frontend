'use client';

import ClearFiltersButton from '@/components/shared/ClearFiltersButtons';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/dashboard/SelectFilter';

const UserFilter = () => {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
      <div className='min-w-[220px] flex-1'>
        <SearchFilter placeholder='Search name, email, contact…' />
      </div>

      <SelectFilter
        paramName='status'
        placeholder='Status'
        allLabel='All statuses'
        options={[
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Inactive', value: 'INACTIVE' },
          { label: 'Blocked', value: 'BLOCKED' },
        ]}
      />

      <SelectFilter
        paramName='gender'
        placeholder='Gender'
        allLabel='All genders'
        options={[
          { label: 'Male', value: 'MALE' },
          { label: 'Female', value: 'FEMALE' },
        ]}
      />

      <div className='flex items-center gap-2'>
        <ClearFiltersButton preserveParams={['role']} />
        <RefreshButton />
      </div>
    </div>
  );
};

export default UserFilter;
