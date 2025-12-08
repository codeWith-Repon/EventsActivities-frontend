/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendUp }: any) => (
  <Card className='border-none shadow-sm bg-card/50 backdrop-blur-sm'>
    <CardContent>
      <div className='flex items-center justify-between space-y-0 pb-2'>
        <p className='text-sm font-medium text-muted-foreground'>{title}</p>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </div>
      <div className='flex items-baseline justify-between'>
        <div className='text-2xl font-bold'>{value}</div>
        {trend && (
          <div
            className={cn(
              'text-xs font-medium flex items-center',
              trendUp ? 'text-green-600' : 'text-red-600'
            )}
          >
            {trendUp ? '+' : '-'}
            {trend}%
            <TrendingUp
              className={cn('w-3 h-3 ml-1', !trendUp && 'rotate-180')}
            />
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
export default StatCard;
