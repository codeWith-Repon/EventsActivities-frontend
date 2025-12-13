/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Users } from 'lucide-react';
import Image from 'next/image';

interface CommunityHeroProps {
  data: {
    title: string;
    description: string;
    image: any;
    members: string;
  };
}
const CommunityHero = ({ data }: CommunityHeroProps) => {
  return (
    <div className='relative h-[300px] w-full overflow-hidden bg-slate-900'>
      <div className='absolute inset-0'>
        <Image
          src={data.image}
          alt={data.title}
          className='h-full w-full object-cover opacity-60'
          fill
        />
        <div className='absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent' />
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-8 max-w-7xl mx-auto'>
        <div>
          <h1 className='text-4xl font-bold text-white md:text-5xl'>
            {data.title}
          </h1>
          <p className='mt-2 max-w-xl md:max-w-2xl text-lg text-slate-200'>
            {data.description}
          </p>
          <div className='mt-4 flex items-center gap-6 text-sm font-medium text-white'>
            <div className='flex items-center gap-2'>
              <Users className='h-5 w-5 text-emerald-400' />
              <span>{data.members} Members</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-5 w-5 text-emerald-400' />
              <span>{2} Upcoming Events</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHero;
