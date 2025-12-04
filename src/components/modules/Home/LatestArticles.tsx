'use client';

import { ArrowRight, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LatestArticles = () => {
  const articles = [
    {
      id: 1,
      title: '10 Tips for First-Time Hikers',
      excerpt:
        'Everything you need to know before hitting the trails, from gear essentials to safety tips. ',
      image:
        'https://pixabay.com/get/g1144017e70fde8cd9489f7fa65727b5a05184e339d612382a575bca86fb40d36ae1141372c8bba8ea7379062dcf0fa83ec26739b565c1b3ad3a78b17ba278202_1280.jpg',
      author: 'Jessica Chen',
      date: 'May 28, 2025',
      category: 'Outdoors',
    },
    {
      id: 2,
      title: 'The Rise of Board Game Cafes',
      excerpt:
        'Why analog gaming is making a huge comeback in the digital age and where to find the best spots.',
      image:
        'https://pixabay.com/get/g6eb6f8a3a51d9acc117936e3d92dc5e146387bba3ba3d67b6fd1d37296f15eacc36e1c67ad0f160fe70629aa8b8d6745d5c64143d7c00b47228b551f38935cc2_1280.jpg',
      author: 'David Miller',
      date: 'May 25, 2025',
      category: 'Community',
    },
    {
      id: 3,
      title: 'Hosting Your First Meetup',
      excerpt:
        'A comprehensive guide to planning, organizing, and hosting a successful community event.',
      image:
        'https://pixabay.com/get/g390118fe85e9bb4ee6e4a453fbffdba32eade97a0cde83a8cdf55bf1a9bfc8104c335546c58f9f76b0003f9e68ccd68718c48e24fda992ddf8a8e288921f4be0_1280.jpg',
      author: 'Elena Rodriguez',
      date: 'May 20, 2025',
      category: 'Guides',
    },
  ];
  return (
    <section className='py-20 bg-white'>
      <div className='container-custom'>
        <div className='flex justify-between items-end mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold text-text-dark mb-3'>
              Latest from the Blog
            </h2>
            <p className='text-text-muted text-lg'>
              Insights, tips, and stories from our community
            </p>
          </motion.div>
          <div className='hidden md:block'>
            <button className='btn-secondary flex items-center gap-2'>
              View All Articles <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <article className='group cursor-pointer flex flex-col h-full'>
                <div className='relative h-60 rounded-2xl overflow-hidden mb-6'>
                  <Image
                    src={article.image}
                    alt={article.title}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    fill
                  />
                  <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
                    {article.category}
                  </div>
                </div>

                <div className='flex items-center gap-4 text-sm text-text-muted mb-3'>
                  <div className='flex items-center gap-1'>
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <User size={14} />
                    <span>{article.author}</span>
                  </div>
                </div>

                <h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors'>
                  {article.title}
                </h3>

                <p className='text-text-muted mb-4 line-clamp-2 grow'>
                  {article.excerpt}
                </p>

                <div className='flex items-center text-primary font-medium text-sm group-hover:underline mt-auto'>
                  Read Article{' '}
                  <ArrowRight
                    size={14}
                    className='ml-1 transition-transform group-hover:translate-x-1'
                  />
                </div>
              </article>
            </motion.div>
          ))}
        </div>

        <div className='mt-10 text-center md:hidden'>
          <button className='btn-secondary inline-flex items-center gap-2'>
            View All Articles <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
export default LatestArticles;
