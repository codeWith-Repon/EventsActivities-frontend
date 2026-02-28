import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const SidebarSkeleton = () => {
  return (
    <>
      <div className='flex-1 px-3 py-4 space-y-6'>
        {[...Array(2)].map((_, sectionIdx) => (
          <div key={sectionIdx} className='space-y-3'>
            {/* Section Title Skeleton */}
            <Skeleton className='h-3 w-20 mx-3 mb-4 bg-muted/60' />

            {/* Nav Items Skeletons */}
            <div className='space-y-1'>
              {[...Array(sectionIdx === 0 ? 4 : 3)].map((__, itemIdx) => (
                <div
                  key={itemIdx}
                  className='flex items-center gap-3 px-3 py-2'
                >
                  <Skeleton className='h-4 w-4 rounded-md bg-muted' />
                  <Skeleton className='h-4 flex-1 bg-muted' />
                </div>
              ))}
            </div>
            {sectionIdx === 0 && <Separator className='my-4' />}
          </div>
        ))}
      </div>
      <div className='border-t p-4'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-8 w-8 rounded-full bg-muted' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-3 w-24 bg-muted' />
            <Skeleton className='h-2 w-16 bg-muted/' />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarSkeleton;
