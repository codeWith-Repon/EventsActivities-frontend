"use client"
import ClearFiltersButton from '@/components/shared/ClearFiltersButtons';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';

const EventFilter = () => {
  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-3'>
        <SearchFilter placeholder='Search Event...' />
        <RefreshButton />
      </div>

      <div className='flex items-center gap-3'>
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default EventFilter;
