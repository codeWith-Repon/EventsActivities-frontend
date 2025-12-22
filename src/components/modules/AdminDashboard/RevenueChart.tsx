'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const revenueConfig = {
  total: {
    label: 'Revenue',
    color: '#6366f1',
  },
} satisfies ChartConfig;

export function RevenueChart({
  revenueData,
}: {
  revenueData: { date: string; total: number }[];
}) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className=' text-lg md:text-2xl'>
          Revenue Over Time
        </CardTitle>
        <CardDescription className='text-sm'>Daily revenue performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueConfig} className='min-h-[300px] w-full'>
          <LineChart
            accessibilityLayer
            data={revenueData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => String(value).slice(5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `৳${value}`}
              width={40}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Line
              dataKey='total'
              type='monotone'
              stroke='var(--color-total)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-total)',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
