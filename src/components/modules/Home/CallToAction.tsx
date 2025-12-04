import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className='py-24 relative overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/30 blur-[100px]' />
        <div className='absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%]  bg-accent/30 blur-[100px]' />
      </div>

      <div className='container-custom relative z-10'>
        <div className='max-w-4xl mx-auto bg-white rounded-[40px] p-12 md:p-16 shadow-xs border border-white/50 text-center relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-purple-400 to-accent' />

          <h2 className='text-4xl md:text-5xl font-bold mb-6 tracking-tight'>
            Ready to Join Something Amazing?
          </h2>
          <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
            Create your profile today and start finding your next adventure with
            people who share your passions.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link
              href='/events'
              className='btn-primary bg-gradient-coral text-lg px-8 py-4 shadow-sm hover:shadow-md cursor-pointer'
            >
              Get Started for Free
            </Link>
            <Link
              href='/events'
              className='px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer'
            >
              Browse Events <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
