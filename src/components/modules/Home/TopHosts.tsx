'use client';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Star } from 'lucide-react';
import Image from 'next/image';

const TopHosts = () => {
  const hosts = [
    {
      id: 1,
      name: 'Jessica Chen',
      role: 'Hiking Enthusiast',
      events: 42,
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      badges: ['Super Host', 'Verified'],
    },
    {
      id: 2,
      name: 'David Miller',
      role: 'Board Game Master',
      events: 38,
      rating: 5.0,
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      badges: ['Community Leader'],
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Foodie & Chef',
      events: 56,
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      badges: ['Expert'],
    },
    {
      id: 4,
      name: 'Marcus Johnson',
      role: 'Music Producer',
      events: 29,
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
      badges: ['Rising Star'],
    },
  ];
  return (
    <section className='py-20 bg-white'>
      <div className='container-custom'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Top Rated Hosts
            </h2>
            <p className='text-muted-foreground text-lg'>
              Meet the community leaders creating amazing experiences
            </p>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {hosts.map((host, index) => (
            <motion.div
              key={host.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-500 border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-2 relative overflow-hidden'>
                {/* Background decoration */}
                <div className='absolute top-0 left-0 w-full h-24 opacity-50 bg-primary/10' />

                <div className='relative mb-4 mt-2'>
                  <div className='w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:border-primary/20 transition-colors duration-300 relative z-10'>
                    <Image
                      src={host.image}
                      alt={host.name}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className='absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-md border border-gray-100 z-20'>
                    <ShieldCheck
                      size={18}
                      className='text-primary fill-primary/10'
                    />
                  </div>
                </div>

                <h3 className='text-xl font-bold mb-1'>{host.name}</h3>
                <p className='text-sm text-primary font-medium mb-3'>
                  {host.role}
                </p>

                <div className='flex flex-wrap justify-center gap-2 mb-6'>
                  {host.badges.map((badge, i) => (
                    <span
                      key={i}
                      className='text-[10px] font-semibold px-2 py-1 rounded-full bg-background-soft text-text-muted border border-gray-100'
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className='grid grid-cols-2 w-full gap-4 border-t border-gray-100 pt-4 mt-auto'>
                  <div className='flex flex-col items-center p-2 rounded-xl'>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <Award size={16} className='text-accent' />
                      <span className='font-bold'>{host.events}</span>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      Events
                    </span>
                  </div>
                  <div className='flex flex-col items-center p-2 rounded-xl'>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <Star
                        size={16}
                        className='fill-yellow-400 text-yellow-400'
                      />
                      <span className='font-bold'>{host.rating}</span>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      Rating
                    </span>
                  </div>
                </div>

                <button className='w-full mt-4 py-2.5 rounded-xl border border-primary/20 text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300 text-sm'>
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopHosts;
