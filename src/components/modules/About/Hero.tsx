'use client';
import { HeroCollageImage } from '@/assets';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  return (
    <div className='relative overflow-hidden pt-20 pb-20 lg:pt-24 lg:pb-28 bg-primary/3'>

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-primary/2 blur-[80px] -z-10' />
        <div className='absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[60px] bg-red-600/3 -z-10' />
        <div className='absolute top-[40%] left-[30%] w-[20%] h-[20%] rounded-full bg-blue-400/8  blur-[50px] -z-10' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='lg:grid lg:grid-cols-12 lg:gap-8 items-center'>
          <div className='sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left'>
            <h1 className='text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
              <span className='block'>Connecting People</span>
              <span className='block text-primary'>
                Through Shared Experiences
              </span>
            </h1>
            <p className='mt-3 text-base text-slate-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
              Discover local events, find companions for your hobbies, and build
              meaningful connections in the real world. Whether you&apos;re a
              host or a guest, your next adventure starts here.
            </p>
            <div className='mt-8  sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0'>
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <Button
                  size='lg'
                  className='btn-primary bg-gradient-coral text-white rounded-full px-8 cursor-pointer'
                  onClick={() => router.push('/events')}
                >
                  Explore Events
                </Button>
              </div>
            </div>
          </div>
          <div className=' lg:col-span-6 sm:max-w-lg sm:mx-auto lg:max-w-none mt-12  lg:mt-0 lg:mx-0  lg:flex lg:items-center'>
            <div className=' w-full bg-white rounded-2xl overflow-hidden relative aspect-4/3'>
              <Image
                className='absolute inset-0 w-full h-full object-cover'
                src={HeroCollageImage.about_img}
                alt='about_image'
                width={800}
                height={600}
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent'></div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default Hero;
