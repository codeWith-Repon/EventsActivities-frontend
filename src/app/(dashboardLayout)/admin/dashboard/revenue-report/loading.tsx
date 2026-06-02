const Block = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-muted ${className}`} />
);

const RevenueLoading = () => (
  <div className='space-y-6'>
    <div className='space-y-2'>
      <Block className='h-3 w-24' />
      <Block className='h-8 w-52' />
    </div>
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Block key={i} className='h-28' />
      ))}
    </div>
    <Block className='h-72 w-full' />
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      <Block className='h-64' />
      <Block className='h-64' />
    </div>
  </div>
);

export default RevenueLoading;
