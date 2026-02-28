export function CommunityImpact() {
  const stats = [
    { label: 'Events Hosted', value: '100K+' },
    { label: 'Active Users', value: '50K+' },
    { label: 'Cities Covered', value: '120+' },
    { label: 'Successful Meetups', value: '98%' },
  ];

  return (
    <section className='py-16 bg-gray-100 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-extrabold sm:text-4xl text-slate-900'>
            Our Community Impact
          </h2>
          <p className='mt-4 text-slate-600 text-lg'>
            Growing stronger every day, one connection at a time.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='text-center p-6 bg-white rounded-2xl backdrop-blur-sm border border-gray-700/20 shadow-md'
            >
              <div className='text-4xl font-bold text-slate-700 mb-2'>
                {stat.value}
              </div>
              <div className='text-slate-600 font-medium'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
