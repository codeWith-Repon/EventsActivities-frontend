import { Calendar, Sparkles } from 'lucide-react';

const CreateEventsPageHeaders = () => {
  return (
    <div className='bg-white border-b border-neutral-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6'>
        <div className='flex items-start gap-4'>
          <div className='p-3 bg-emerald-50 rounded-xl'>
            <Calendar className='h-8 w-8 text-emerald-600' />
          </div>
          <div className='flex-1'>
            <h2 className='text-3xl font-bold text-neutral-900'>
              Create a New Event
            </h2>
            <p className='text-lg text-neutral-600 mt-2'>
              Bring people together around activities you love
            </p>
            <div className='mt-4 inline-flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200'>
              <Sparkles className='h-4 w-4 text-amber-500' />
              Step 1 of 1 – Basic Setup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventsPageHeaders;
