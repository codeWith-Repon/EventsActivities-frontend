'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const userGrowthConfig = {
  count: {
    label: 'Users',
    color: '#3b82f6',
  },
} satisfies ChartConfig;

export function UserGrowthChart({
  userGrowthData,
}: {
  userGrowthData: {
    date: string;
    count: number;
  }[];
}) {
  
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle className=' text-lg md:text-2xl'>User Growth</CardTitle>
        <CardDescription className='text-sm'>
          New user registrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={userGrowthConfig}
          className='min-h-[300px] w-full'
        >
          <BarChart accessibilityLayer data={userGrowthData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='count' fill='var(--color-count)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
