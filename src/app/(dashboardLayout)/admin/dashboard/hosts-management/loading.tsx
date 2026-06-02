const Block = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-white/5 ${className}`} />
);

const HostsLoading = () => (
  <div className='space-y-6'>
    <div className='space-y-2'>
      <Block className='h-3 w-28' />
      <Block className='h-8 w-40' />
    </div>
    <Block className='h-[420px] w-full rounded-[var(--radius)]' />
  </div>
);

export default HostsLoading;
