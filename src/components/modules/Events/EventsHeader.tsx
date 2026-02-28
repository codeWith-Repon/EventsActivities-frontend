'use client';

import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import { FilterIcon } from 'lucide-react';

interface EventsHeaderProps {
  categories: string[];
}

const EventsHeader = ({ categories }: EventsHeaderProps) => {
  const modifiedCategories = categories.map((category) => ({
    label: category.charAt(0).toUpperCase() + category.slice(1),
    value: category,
  }));
  return (
    <div>
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 pb-4 md:pb-5 lg:py-10'>
          <div className='text-center space-y-3'>
            <h1 className='text-4xl font-bold tracking-tight'>
              Explore Events
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Find activities that match your interests
            </p>
          </div>
        </div>
      </div>
      <div className='sticky top-0 z-10 bg-white'>
        <div className='max-w-7xl mx-auto py-5'>
          <div className='flex items-start  gap-3 flex-row flex-wrap'>
            {/* Search Bar */}

            <SearchFilter />

            {/* Filters Row */}
            <div className='flex flex-wrap gap-3 items-center'>
              <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                <FilterIcon className='w-4 h-4' />
                <span>Filters:</span>
                <SelectFilter
                  paramsName='category'
                  options={modifiedCategories}
                  defaultValue='All Category'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsHeader;
