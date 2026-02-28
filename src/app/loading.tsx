import { EventPulseLoader } from '@/components/shared/loader';

const GlobalLoading = () => {
  return (
    <EventPulseLoader
      size='sm'
      text='Preparing your experience...'
      fullScreen={true}
    />
  );
};

export default GlobalLoading;
