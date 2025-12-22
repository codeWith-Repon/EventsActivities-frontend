import { Calendar } from 'lucide-react';

const CreateEventsPageHeaders = () => {
  return (
    <div className='bg-white border-b border-neutral-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6'>
        <div className='flex items-start gap-4'>
          <div className='p-3 bg-slate-50 rounded-xl'>
            <Calendar className='h-8 w-8 text-slate-600' />
          </div>
          <div className='flex-1'>
            <h2 className=' text-xl md:text-2xl lg:text-3xl  font-bold text-neutral-900'>
              Create a New Event
            </h2>
            <p className=' text-sm lg:text-lg text-neutral-600 mt-2'>
              Bring people together around activities you love
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventsPageHeaders;
