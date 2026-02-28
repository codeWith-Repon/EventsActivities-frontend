import { Skeleton } from '@/components/ui/skeleton';
import { TableSkeleton } from '@/components/shared/TableSkeleton';

export default function Loading() {
  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      {/* Header Skeleton */}
      <div className='space-y-2'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-4 w-96' />
      </div>

      {/* Filter Skeleton */}
      <div className='flex items-center justify-between bg-card p-4 rounded-xl border shadow-sm'>
        <div className='flex gap-3'>
          <Skeleton className='h-10 w-40' />
          <Skeleton className='h-10 w-32' />
        </div>
        <Skeleton className='h-10 w-24' />
      </div>

      {/* Table Skeleton */}
      <TableSkeleton columns={6} rows={10} />

      {/* Pagination Skeleton */}
      <div className='flex items-center justify-between border-t pt-4'>
        <Skeleton className='h-4 w-48' />
        <div className='flex gap-2'>
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
        </div>
      </div>
    </div>
  );
}
