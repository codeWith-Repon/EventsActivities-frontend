/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Cell } from 'recharts';
import { Info } from 'lucide-react';

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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const STATUS_COLORS = {
  OPEN: '#22c55e',
  FULL: '#3b82f6',
  CANCELLED: '#ef4444',
  COMPLETED: '#9ca3af',
  EMPTY: '#e2e8f0', // Color for empty state
};

const eventDistributionConfig = {
  OPEN: { label: 'Open', color: STATUS_COLORS.OPEN },
  FULL: { label: 'Full', color: STATUS_COLORS.FULL },
  CANCELLED: { label: 'Cancelled', color: STATUS_COLORS.CANCELLED },
  COMPLETED: { label: 'Completed', color: STATUS_COLORS.COMPLETED },
} satisfies ChartConfig;

export function EventDistributionChart({ eventDistributionData }: any) {
  const isEmpty = !eventDistributionData || eventDistributionData.length === 0;

  const chartData = React.useMemo(() => {
    if (isEmpty) {
      return [{ name: 'No Data', value: 1, color: STATUS_COLORS.EMPTY }];
    }
    return eventDistributionData.map((item: any) => ({
      name: item.status,
      value: item._count._all,
      color:
        STATUS_COLORS[item.status as keyof typeof STATUS_COLORS] ||
        STATUS_COLORS.COMPLETED,
    }));
  }, [eventDistributionData, isEmpty]);

  const totalEvents = React.useMemo(() => {
    if (isEmpty) return 0;
    return chartData.reduce(
      (acc: any, curr: { value: any }) => acc + curr.value,
      0,
    );
  }, [chartData, isEmpty]);

  return (
    <Card className='flex flex-col h-full relative overflow-hidden shadow-sm border-border/60'>
      {/* Empty State Overlay */}
      {isEmpty && (
        <div className='absolute inset-0 bg-background/20 backdrop-blur-[1px] z-10 flex items-end justify-center pb-12'>
          <div className='bg-muted/80 border text-[10px] md:text-xs px-3 py-1 rounded-full flex items-center gap-2'>
            <Info className='w-3 h-3 text-muted-foreground' />
            No event data available for this range
          </div>
        </div>
      )}

      <CardHeader className='items-center pb-2'>
        <CardTitle className='text-lg md:text-xl font-bold'>
          Event Distribution
        </CardTitle>
        <CardDescription className='text-xs'>
          {isEmpty ? 'Live preview (inactive)' : 'Status of current events'}
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 pb-4'>
        <ChartContainer
          config={eventDistributionConfig}
          className='mx-auto aspect-square max-h-[250px] w-full'
        >
          <PieChart>
            {!isEmpty && (
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className='rounded-lg shadow-xl border-none'
                  />
                }
              />
            )}
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              innerRadius={70}
              outerRadius={90}
              paddingAngle={isEmpty ? 0 : 5}
              strokeWidth={0}
              cornerRadius={6}
            >
              {chartData.map((entry: any, index: any) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalEvents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-[10px] uppercase tracking-wider font-medium'
                        >
                          Total Events
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            {!isEmpty && (
              <ChartLegend
                content={<ChartLegendContent nameKey='name' />}
                className='-translate-y-2 flex-wrap text-xs'
              />
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
