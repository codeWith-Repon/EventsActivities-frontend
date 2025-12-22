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
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const eventCreationConfig = {
  count: {
    label: 'Events',
    color: '#8b5cf6',
  },
} satisfies ChartConfig;

export function EventCreationChart({
  eventCreationData,
}: {
  eventCreationData: { date: string; count: number }[];
}) {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Event Creation Trend</CardTitle>
        <CardDescription>New events created daily</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={eventCreationConfig}
          className='min-h-[300px] w-full'
        >
          <AreaChart
            accessibilityLayer
            data={eventCreationData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='count'
              type='natural'
              fill='var(--color-count)'
              fillOpacity={0.4}
              stroke='var(--color-count)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
