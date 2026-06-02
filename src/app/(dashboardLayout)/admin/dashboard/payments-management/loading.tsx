const Block = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-white/5 ${className}`} />
);

const PaymentsLoading = () => (
  <div className='space-y-6'>
    <div className='space-y-2'>
      <Block className='h-3 w-24' />
      <Block className='h-8 w-44' />
    </div>
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Block key={i} className='h-28' />
      ))}
    </div>
    <Block className='h-[420px] w-full rounded-[var(--radius)]' />
  </div>
);

export default PaymentsLoading;
