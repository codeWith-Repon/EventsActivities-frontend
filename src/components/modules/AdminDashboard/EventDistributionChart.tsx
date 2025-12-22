/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const STATUS_COLORS = {
  OPEN: '#22c55e',
  FULL: '#3b82f6',
  CANCELLED: '#ef4444',
  COMPLETED: '#9ca3af',
};

const eventDistributionConfig = {
  OPEN: {
    label: 'Open',
    color: STATUS_COLORS.OPEN,
  },
  FULL: {
    label: 'Full',
    color: STATUS_COLORS.FULL,
  },
  CANCELLED: {
    label: 'Cancelled',
    color: STATUS_COLORS.CANCELLED,
  },
  COMPLETED: {
    label: 'Completed',
    color: STATUS_COLORS.COMPLETED,
  },
} satisfies ChartConfig;

export function EventDistributionChart({ eventDistributionData }: any) {
  const chartData = useMemo(() => {
    if (!eventDistributionData) return [];
    return eventDistributionData.map((item: any) => ({
      name: item.status,
      value: item._count._all,
      color: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS],
    }));
  }, [eventDistributionData]);

  return (
    <Card className=' flex flex-col h-full'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className=' text-lg md:text-2xl'>
          Event Distribution
        </CardTitle>
        <CardDescription className='text-sm'>
          Status of current events
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={eventDistributionConfig}
          className='mx-auto aspect-square max-h-[300px] w-full'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry: any, index: any) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey='name' />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
