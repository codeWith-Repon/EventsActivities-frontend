import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Globe } from 'lucide-react';

export function Mission() {
  const missionItems = [
    {
      title: 'Authentic Connections',
      description:
        'We help people form real connections beyond likes and comments — creating genuine relationships through shared experiences.',
      icon: Heart,
      iconBg: 'from-rose-100 to-pink-100',
      iconColor: 'text-rose-600',
    },
    {
      title: 'Community First',
      description:
        'Empowering local communities to thrive through shared interests, gatherings, and meaningful interactions.',
      icon: Users,
      iconBg: 'from-emerald-100 to-teal-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Accessible to All',
      description:
        'An inclusive, safe space where everyone feels welcome to host or join events without barriers.',
      icon: Globe,
      iconBg: 'from-blue-100 to-indigo-100',
      iconColor: 'text-blue-600',
    },
  ];
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-base text-primary font-semibold tracking-wide uppercase'>
            Our Mission
          </h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl'>
            Bringing the World Closer
          </p>
          <p className='mt-4 max-w-2xl text-xl text-slate-500 mx-auto'>
            We believe that the best connections happen in person. Our platform
            is designed to bridge the gap between digital discovery and
            real-world interaction.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {missionItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className='border-none shadow-lg bg-slate-50 hover:shadow-xl transition-shadow duration-300'
              >
                <CardContent className='pt-8 text-center'>
                  <div
                    className={`mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-linear-to-br ${item.iconBg} ${item.iconColor} mb-4`}
                  >
                    <Icon className='h-6 w-6' />
                  </div>
                  <h3 className='text-lg font-medium text-slate-900 mb-2'>
                    {item.title}
                  </h3>
                  <p className='text-slate-500'>{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
