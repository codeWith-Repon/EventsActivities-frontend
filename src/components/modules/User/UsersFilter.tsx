"use client';";
import ClearFiltersButton from '@/components/shared/ClearFiltersButtons';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';

const UserFilter = () => {
  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-3'>
        <SearchFilter placeholder='Search user...' />
        <RefreshButton />
      </div>

      <div className='flex items-center gap-3'>
        <SearchFilter paramName='email' placeholder='Search email...' />
        <ClearFiltersButton preserveParams={['role']} />
      </div>
    </div>
  );
};

export default UserFilter;
