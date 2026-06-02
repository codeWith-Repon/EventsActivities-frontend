const Block = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-[var(--radius)] bg-white/5 ${className}`} />
);

const DashboardLoading = () => {
  return (
    <div className='space-y-6'>
      <div className='flex items-end justify-between'>
        <div className='space-y-2'>
          <Block className='h-3 w-24' />
          <Block className='h-8 w-44' />
        </div>
        <Block className='h-9 w-56' />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Block key={i} className='h-28' />
        ))}
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-6'>
        <Block className='h-72 lg:col-span-4' />
        <Block className='h-72 lg:col-span-2' />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <Block className='h-64' />
        <Block className='h-64' />
      </div>
    </div>
  );
};

export default DashboardLoading;
