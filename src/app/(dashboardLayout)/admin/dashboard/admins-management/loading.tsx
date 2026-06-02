const Block = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-muted ${className}`} />
);

const AdminsLoading = () => (
  <div className='space-y-6'>
    <div className='space-y-2'>
      <Block className='h-3 w-28' />
      <Block className='h-8 w-40' />
    </div>
    <div className='flex flex-wrap gap-3'>
      <Block className='h-10 flex-1 min-w-[220px]' />
      <Block className='h-10 w-36' />
      <Block className='h-10 w-36' />
    </div>
    <Block className='h-[420px] w-full rounded-[var(--radius)]' />
  </div>
);

export default AdminsLoading;
