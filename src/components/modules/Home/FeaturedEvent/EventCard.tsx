import { Calendar, Clock, Heart, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface EventCardProps {
  index: number;
  event: {
    id: number;
    title: string;
    image: string;
    date: string;
    time: string;
    location: string;
    price: string;
    host: {
      name: string;
      avatar: string;
      rating: number;
    };
    category: string;
  };
}

const EventCard = ({ event, index }: EventCardProps) => {
  return (
    <div>
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className='bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 h-full flex flex-col'>
          <div className='relative h-48 overflow-hidden'>
            <Image
              src={event.image}
              alt={event.title}
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
              fill
            />
            <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-foreground uppercase tracking-wide'>
              {event.category}
            </div>
            <button className='absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all'>
              <Heart size={16} />
            </button>
          </div>

          <div className='p-6 flex flex-col grow'>
            <div className='flex items-center gap-4 text-sm text-muted-foreground mb-3'>
              <div className='flex items-center gap-1'>
                <Calendar size={14} className='text-primary' />
                <span>{event.date}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Clock size={14} className='text-primary' />
                <span>{event.time}</span>
              </div>
            </div>

            <h3 className='text-xl font-bold text-muted-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1'>
              {event.title}
            </h3>

            <div className='flex items-center gap-1 text-muted-foreground text-sm mb-4'>
              <MapPin size={14} />
              <span className='truncate'>{event.location}</span>
            </div>

            <div className='flex items-center justify-between pt-4 border-t border-gray-100 mt-auto'>
              <div className='flex items-center gap-2'>
                <Image
                  src={event.host.avatar}
                  alt={event.host.name}
                  className=' rounded-full object-cover border border-gray-200'
                  width={32}
                  height={32}
                />
                <div className='flex flex-col'>
                  <span className='text-xs font-medium text-text-dark'>
                    {event.host.name}
                  </span>
                  <div className='flex items-center gap-0.5'>
                    <Star
                      size={10}
                      className='fill-yellow-400 text-yellow-400'
                    />
                    <span className='text-[10px] text-muted-foreground'>
                      {event.host.rating}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`font-bold ${
                  event.price === 'Free' ? 'text-green-600' : 'text-primary'
                }`}
              >
                {event.price}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventCard;
