import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const DashboardSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* 1. Stat Cards Skeleton */}
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className='overflow-hidden'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-4 w-4 rounded-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-[60px] mb-1' />
              <Skeleton className='h-3 w-[120px]' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Main Analytics Row (Matches Revenue & Distribution) */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-6'>
        <Card className='lg:col-span-4'>
          <CardHeader>
            <Skeleton className='h-6 w-[150px] mb-2' />
            <Skeleton className='h-4 w-[250px]' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-[300px] w-full rounded-lg' />
          </CardContent>
        </Card>

        <Card className='lg:col-span-2'>
          <CardHeader className='items-center'>
            <Skeleton className='h-6 w-[130px] mb-2' />
            <Skeleton className='h-4 w-[180px]' />
          </CardHeader>
          <CardContent className='flex justify-center'>
            <Skeleton className='h-[250px] w-[250px] rounded-full' />
          </CardContent>
        </Card>
      </div>

      {/* 3. Bottom Trends Row */}
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-[140px] mb-2' />
              <Skeleton className='h-4 w-[200px]' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-[250px] w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
