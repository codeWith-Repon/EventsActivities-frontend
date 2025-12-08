'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CallToAction() {
  const router = useRouter();
  return (
    <section className='py-20 bg-linear-to-br from-emerald-50 to-teal-100'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6'>
          Ready to Start Your Journey?
        </h2>
        <p className='text-xl text-slate-600 mb-10'>
          Join thousands of others who are finding their community and making
          real memories.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            size='lg'
            className='bg-teal-600 hover:bg-teal-700 text-white rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all'
            onClick={() => router.push('/events')}
          >
            Explore Events
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='bg-white border-white text-teal-700 hover:bg-slate-50 rounded-full px-10 py-6 text-lg shadow-md hover:shadow-lg transition-all'
            onClick={() => router.push('/my-events')}
          >
            Become a Host
          </Button>
        </div>
      </div>
    </section>
  );
}
