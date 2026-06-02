const Block = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-white/5 ${className}`} />
);

const ParticipantsLoading = () => (
  <div className='space-y-6'>
    <div className='space-y-2'>
      <Block className='h-3 w-32' />
      <Block className='h-8 w-52' />
    </div>
    <div className='flex flex-wrap gap-3'>
      <Block className='h-10 flex-1 min-w-[220px]' />
      <Block className='h-10 w-40' />
      <Block className='h-10 w-40' />
    </div>
    <Block className='h-[420px] w-full rounded-[var(--radius)]' />
  </div>
);

export default ParticipantsLoading;
