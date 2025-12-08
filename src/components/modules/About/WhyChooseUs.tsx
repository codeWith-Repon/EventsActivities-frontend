import { aboutThumbnail, why_choose_us_image } from '@/assets';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function WhyChooseUs() {
  const features = [
    'Verified Hosts & Safe Environment',
    'Interest-Based Matching Algorithm',
    'No Hidden Fees for Free Events',
    'Active Community Support',
    'Easy-to-Use Mobile Interface',
    'Real-Time Event Updates',
  ];

  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-16 items-center'>
          <div className='mb-10 lg:mb-0'>
            <h2 className='text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6'>
              Why Choose eventshub?
            </h2>
            <p className='text-lg text-slate-500 mb-8'>
              We prioritize safety, quality, and genuine connections. Our
              platform is built with the user in mind, ensuring a seamless
              experience from discovery to meetup.
            </p>

            <ul className='space-y-4'>
              {features.map((feature, index) => (
                <li key={index} className='flex items-start'>
                  <div className='shrink-0'>
                    <CheckCircle2 className='h-6 w-6 text-teal-500' />
                  </div>
                  <p className='ml-3 text-base text-slate-700'>{feature}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className='relative'>
            <div className=' rounded-2xl overflow-hidden shadow-xl bg-slate-100'>
              <Image
                src={why_choose_us_image}
                alt='Group of friends laughing'
                className='object-cover w-full h-full'
              />
            </div>
            <div className='absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 hidden sm:block'>
              <div className='flex items-center gap-3'>
                <div className='flex -space-x-2'>
                  {[
                    aboutThumbnail.aboutThumbnail1,
                    aboutThumbnail.aboutThumbnail2,
                    aboutThumbnail.aboutThumbnail3,
                    aboutThumbnail.aboutThumbnail4,
                  ].map((i, idx) => (
                    <div
                      key={idx}
                      className='w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden'
                    >
                      <Image
                        src={i}
                        alt='User avatar'
                      />
                    </div>
                  ))}
                </div>
                <div className='text-sm font-medium text-slate-700'>
                  <span className='text-teal-600 font-bold'>500+</span> New
                  Users Today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
