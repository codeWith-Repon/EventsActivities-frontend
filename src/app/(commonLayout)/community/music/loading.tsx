'use client';

import { EventPulseLoader } from '@/components/shared/loader';
import { Music } from 'lucide-react';

const loading = () => {
  return (
    <EventPulseLoader
      size='md'
      icon={Music}
      text='Tuning into upcoming live performances...'
      primaryColor='purple-600'
      fullScreen={true}
    />
  );
};

export default loading;
