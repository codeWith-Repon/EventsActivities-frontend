import { CalendarCheck, MessageSquare, Search, UserPlus } from 'lucide-react';

const HowItWork = () => {
  const steps = [
    {
      id: 1,
      title: 'Create an Account',
      description:
        'Sign up in seconds and customize your profile with your interests and hobbies.',
      icon: <UserPlus size={24} className='text-white' />,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Discover Events',
      description:
        'Browse through hundreds of local activities or search for specific interests near you.',
      icon: <Search size={24} className='text-white' />,
      color: 'bg-primary',
    },
    {
      id: 3,
      title: 'Join & Connect',
      description:
        'RSVP to events, chat with hosts, and meet like-minded people in your community.',
      icon: <CalendarCheck size={24} className='text-white' />,
      color: 'bg-accent',
    },
    {
      id: 4,
      title: 'Share Experiences',
      description:
        'Rate hosts, share photos, and build your reputation within the community.',
      icon: <MessageSquare size={24} className='text-white' />,
      color: 'bg-green-500',
    },
  ];
  return (
    <section className='py-20 relative overflow-hidden'>
      <div className='container-custom relative z-10'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <span className='text-primary font-semibold tracking-wider uppercase text-sm mb-2 block'>
            Simple Process
          </span>
          <h2 className='text-3xl md:text-4xl font-bold  mb-4'>
            How Eventure Works
          </h2>
          <p className='text-muted-foreground text-lg'>
            Start your journey to meaningful connections in four simple steps
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'>
          <div className='hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200 -z-10' />

          {steps.map((step) => (
            <div key={step.id}>
              <div className='flex flex-col items-center text-center group'>
                <div
                  className={`w-24 h-24 rounded-2xl ${step.color} shadow-lg flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10`}
                >
                  <div className='absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ' />
                  <span className='z-1'> {step.icon}</span>
                  <div className='absolute -bottom-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 font-bold '>
                    {step.id}
                  </div>
                </div>

                <h3 className='text-xl font-bold  mb-3'>{step.title}</h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
