import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CreateEventFormData } from '../CreateEventsFormContent';

interface DateLocationFormProps {
  form: UseFormReturn<CreateEventFormData>;
}

export function DateLocationForm({ form }: DateLocationFormProps) {
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <div className='space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm'>
      <div>
        <h3 className='text-lg font-semibold text-neutral-900'>
          Date & Location
        </h3>
        <p className='text-sm text-neutral-500 mt-1'>
          When and where will your event take place?
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0'>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Event Date <span className='text-red-500'>*</span>
              </FormLabel>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start text-left font-normal border-neutral-200 rounded-lg hover:bg-neutral-50'
                  >
                    <Calendar className='mr-2 h-4 w-4 text-neutral-400' />
                    {field.value
                      ? format(new Date(field.value), 'MMM dd, yyyy')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <CalendarComponent
                    mode='single'
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date.toISOString().split('T')[0]);
                        setDateOpen(false);
                      }
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='time'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Event Time <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='time'
                  {...field}
                  className='border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name='location'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-neutral-700 font-medium'>
              Location <span className='text-red-500'>*</span>
            </FormLabel>
            <FormControl>
              <div className='relative'>
                <MapPin className='absolute left-3 top-3 h-4 w-4 text-neutral-400' />
                <Input
                  placeholder='Banani, Dhaka'
                  {...field}
                  className='pl-10 border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <div className='mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200'>
        <p className='text-sm font-medium text-neutral-700 mb-3'>Map Preview</p>
        <div className='w-full h-48 bg-neutral-200 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <MapPin className='h-8 w-8 text-neutral-400 mx-auto mb-2' />
            <p className='text-sm text-neutral-500'>
              Map preview will appear here
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
