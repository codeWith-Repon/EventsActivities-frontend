export function CommunityImpact() {
  const stats = [
    { label: 'Events Hosted', value: '10,000+' },
    { label: 'Active Users', value: '50,000+' },
    { label: 'Cities Covered', value: '120+' },
    { label: 'Successful Meetups', value: '98%' },
  ];

  return (
    <section className='py-16 bg-teal-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-extrabold sm:text-4xl'>
            Our Community Impact
          </h2>
          <p className='mt-4 text-teal-100 text-lg'>
            Growing stronger every day, one connection at a time.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='text-center p-6 bg-teal-800/50 rounded-2xl backdrop-blur-sm border border-teal-700'
            >
              <div className='text-4xl font-bold text-emerald-400 mb-2'>
                {stat.value}
              </div>
              <div className='text-teal-100 font-medium'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
