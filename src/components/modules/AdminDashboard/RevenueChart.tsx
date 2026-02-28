'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
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

const generatePlaceholderData = () => {
  return Array.from({ length: 7 }).map((_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    total: Math.floor(Math.random() * 500) + 100,
  }));
};

export function RevenueChart({
  revenueData,
}: {
  revenueData: { date: string; total: number }[];
}) {
  const isEmpty =
    !revenueData ||
    revenueData.length === 0 ||
    revenueData.every((d) => d.total === 0);
  const displayData = isEmpty ? generatePlaceholderData() : revenueData;

  return (
    <Card className='h-full relative overflow-hidden'>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-lg md:text-2xl'>
              Revenue Over Time
            </CardTitle>
            <CardDescription className='text-sm'>
              {isEmpty ? 'Sample data preview' : 'Daily revenue performance'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={revenueConfig} className='min-h-[300px] w-full'>
          <LineChart
            accessibilityLayer
            data={displayData}
            margin={{ left: 12, right: 12, top: 10 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray='3 3'
              opacity={0.5}
            />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `৳${value}`}
              width={50}
            />

            <ChartTooltip
              cursor={{ stroke: 'var(--color-total)', strokeWidth: 1 }}
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
                fill: 'var(--color-total)',
                strokeWidth: 2,
                stroke: '#fff',
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
