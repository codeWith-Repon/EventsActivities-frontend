/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  Filter,
  ArrowRight,
  X,
  Loader2,
} from 'lucide-react';
import { format, startOfDay, isValid, parse } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export const DashboardFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const today = startOfDay(new Date());

  const [date, setDate] = useState<DateRange | undefined>({
    from: searchParams.get('startDate')
      ? new Date(searchParams.get('startDate')!)
      : undefined,
    to: searchParams.get('endDate')
      ? new Date(searchParams.get('endDate')!)
      : undefined,
  });

  // Check if any filter is currently active
  const hasActiveFilters =
    searchParams.has('startDate') ||
    searchParams.has('endDate') ||
    searchParams.has('duration');

  useEffect(() => {
    const s = searchParams.get('startDate');
    const e = searchParams.get('endDate');
    if (s || e) {
      setDate({
        from: s ? new Date(s) : undefined,
        to: e ? new Date(e) : undefined,
      });
    } else if (!searchParams.has('duration')) {
      setDate(undefined);
    }
  }, [searchParams]);

  const updateURL = (range: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (range?.from && isValid(range.from)) {
      params.set('startDate', format(range.from, 'yyyy-MM-dd'));
    } else {
      params.delete('startDate');
    }

    if (range?.to && isValid(range.to)) {
      params.set('endDate', format(range.to, 'yyyy-MM-dd'));
    } else {
      params.delete('endDate');
    }

    params.delete('duration');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.from && !range.to) {
      const newRange: DateRange = { from: range.from, to: today };
      setDate(newRange);
      updateURL(newRange);
    } else {
      setDate(range);
      updateURL(range);
    }
  };

  const handleManualInputChange = (type: 'from' | 'to', value: string) => {
    const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
    if (isValid(parsedDate) && parsedDate <= today) {
      const newRange = { ...date, [type]: parsedDate } as DateRange;
      setDate(newRange);
      updateURL(newRange);
    }
  };

  const updatePreset = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('duration', value);
    params.delete('startDate');
    params.delete('endDate');
    setDate(undefined);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setDate(undefined);
    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <div className='flex flex-col md:flex-row items-start md:items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm mb-6 gap-4'>
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-primary/10 rounded-lg'>
          {isPending ? (
            <Loader2 className='w-5 h-5 text-primary animate-spin' />
          ) : (
            <Filter className='w-5 h-5 text-primary' />
          )}
        </div>
        <div>
          <h2 className='text-lg font-semibold text-foreground leading-none mb-1'>
            Analytics Overview
          </h2>
          <p className='text-xs text-muted-foreground'>
            {isPending
              ? 'Updating dashboard...'
              : 'Filter and type custom dates'}
          </p>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        {/* Clear Filter Button */}
        <Button
          variant='ghost'
          size='sm'
          onClick={clearFilters}
          disabled={!hasActiveFilters || isPending}
          className={cn(
            'text-xs font-medium transition-all',
            !hasActiveFilters
              ? 'opacity-0 translate-x-2 pointer-events-none'
              : 'opacity-100 translate-x-0',
          )}
        >
          <X className='w-3 h-3 mr-1' />
          Clear
        </Button>

        <Select
          value={searchParams.get('duration') || ''}
          onValueChange={updatePreset}
          disabled={isPending}
        >
          <SelectTrigger className='w-40 bg-background'>
            <SelectValue placeholder='Select Duration' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='7days'>Last 7 Days</SelectItem>
            <SelectItem value='15days'>Last 15 Days</SelectItem>
            <SelectItem value='month'>This Month</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              disabled={isPending}
              className={cn(
                'w-64 justify-start text-left font-normal bg-background',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4 text-primary' />
              {date?.from ? (
                date.to ? (
                  <span className='text-xs font-medium'>
                    {format(date.from, 'PP')} - {format(date.to, 'PP')}
                  </span>
                ) : (
                  format(date.from, 'PP')
                )
              ) : (
                <span>Pick/Type Date Range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-80 p-4 border border-border shadow-xl'
            align='end'
          >
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='flex-1'>
                  <label className='text-[10px] uppercase font-bold text-muted-foreground ml-1'>
                    Start
                  </label>
                  <Input
                    type='date'
                    max={format(today, 'yyyy-MM-dd')}
                    value={date?.from ? format(date.from, 'yyyy-MM-dd') : ''}
                    onChange={(e) =>
                      handleManualInputChange('from', e.target.value)
                    }
                    className='h-8 text-xs'
                  />
                </div>
                <ArrowRight className='w-3 h-3 mt-4 text-muted-foreground' />
                <div className='flex-1'>
                  <label className='text-[10px] uppercase font-bold text-muted-foreground ml-1'>
                    End
                  </label>
                  <Input
                    type='date'
                    max={format(today, 'yyyy-MM-dd')}
                    value={date?.to ? format(date.to, 'yyyy-MM-dd') : ''}
                    onChange={(e) =>
                      handleManualInputChange('to', e.target.value)
                    }
                    className='h-8 text-xs'
                  />
                </div>
              </div>

              <div className='border-t pt-2'>
                <Calendar
                  initialFocus
                  mode='range'
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                  toDate={today}
                  disabled={(day) => day > today}
                  classNames={{
                    day_today:
                      'bg-accent text-accent-foreground font-bold border-primary border-b-2',
                  }}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
