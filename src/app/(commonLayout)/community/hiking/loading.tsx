'use client';

import { EventPulseLoader } from '@/components/shared/loader';
import { Mountain } from 'lucide-react';

const loading = () => {
  return (
    <EventPulseLoader
      size='md'
      icon={Mountain}
      text='Exploring the best trails and summits...'
      // primaryColor='green-600'
      fullScreen={true}
    />
  );
};

export default loading;
