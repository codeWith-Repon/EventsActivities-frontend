'use client';

import { EventPulseLoader } from '@/components/shared/loader';
import { Utensils } from 'lucide-react';

const loading = () => {
  return (
    <EventPulseLoader
      size='md'
      icon={Utensils}
      text='Finding the best spots for your next meal...'
      primaryColor='orange-500'
      fullScreen={true}
    />
  );
};

export default loading;
