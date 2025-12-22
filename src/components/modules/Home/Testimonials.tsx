import { testimonialImage } from '@/assets';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "I moved to a new city and didn't know anyone. Through Eventure, I found a hiking group that meets every weekend. Now I have a solid group of friends!",
      author: 'Sarah Jenkins',
      location: 'Portland, OR',
      image: testimonialImage.testimonial_1,
    },
    {
      id: 2,
      quote:
        "The quality of events here is unmatched. I've attended three cooking workshops and they were all professional, fun, and incredibly well-organized.",
      author: 'Michael Chang',
      location: 'San Francisco, CA',
      image: testimonialImage.testimonial_2,
    },
    {
      id: 3,
      quote:
        'As a host, this platform makes it so easy to manage attendees and payments. The community is respectful and engaged. Highly recommended!',
      author: 'Emma Wilson',
      location: 'Austin, TX',
      image: testimonialImage.testimonial_3,
    },
  ];

  return (
    <section className='py-24 bg-linear-to-b from-purple-50/50 to-white relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-[10%] left-[5%] text-primary/5 transform rotate-12'>
          <Quote size={120} />
        </div>
        <div className='absolute bottom-[10%] right-[5%] text-accent/5 transform -rotate-12'>
          <Quote size={120} />
        </div>
      </div>

      <div className='container-custom relative z-10'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold  mb-4'>
            Stories from our Community
          </h2>
          <p className='text-muted-foreground text-lg'>
            See how people are connecting and creating memories
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((item) => (
            <div
              key={item.id}
              className='bg-white p-8 rounded-3xl shadow-sm border border-white/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 flex flex-col h-full'
            >
              <div className='mb-6 text-primary'>
                <Quote size={32} className='fill-primary/10' />
              </div>
              <p className=' leading-relaxed mb-8 grow italic'>
                &quot;{item.quote}&quot;
              </p>
              <div className='flex items-center gap-4 mt-auto'>
                <Image
                  src={item.image}
                  alt={item.author}
                  className='w-12 h-12 rounded-full object-cover'
                  width={48}
                  height={48}
                />
                <div>
                  <h4 className='font-bold '>{item.author}</h4>
                  <p className='text-sm text-text-muted'>{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
