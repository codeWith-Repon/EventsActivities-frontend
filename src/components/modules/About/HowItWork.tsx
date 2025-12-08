import { Search, UserPlus, PartyPopper } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      title: 'Discover Events',
      description:
        'Browse through a variety of local events and activities tailored to your interests.',
      icon: Search,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Join or Host',
      description:
        'Sign up for an event that catches your eye, or create your own to share your passion.',
      icon: UserPlus,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'Meet & Enjoy',
      description:
        'Connect with like-minded people in real life and make unforgettable memories.',
      icon: PartyPopper,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <section className='py-16 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-extrabold text-slate-900 sm:text-4xl'>
            How It Works
          </h2>
          <p className='mt-4 text-lg text-slate-500'>
            Simple steps to start your journey.
          </p>
        </div>

        <div className='relative'>
          {/* Connecting line for desktop */}
          <div className='hidden md:block absolute top-14 left-40 w-[70%]   h-0.5 bg-slate-200 z-1 transform -translate-y-1/2'></div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {steps.map((step, index) => (
              <div
                key={index}
                className='relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center md:bg-transparent md:border-none md:shadow-none '
              >
                <div
                  className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${step.color} mb-6 shadow-sm z-10 relative bg-white`}
                >
                  <step.icon className='h-8 w-8' />
                </div>
                <h3 className='text-xl font-bold text-slate-900 mb-2'>
                  {step.title}
                </h3>
                <p className='text-slate-500'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
