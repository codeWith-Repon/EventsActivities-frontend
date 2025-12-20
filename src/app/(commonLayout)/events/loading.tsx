'use client';

import { EventPulseLoader } from '@/components/shared/loader';
import { Search } from 'lucide-react';

const loading = () => {
  return (
    <EventPulseLoader
      size='sm'
      icon={Search}
      text='Discovering events near you...'
      fullScreen={true}
    />
  );
};

export default loading;
