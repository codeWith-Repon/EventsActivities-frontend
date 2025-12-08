import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { CreateEventFormData } from '../CreateEventsFormContent';

interface PricingFormProps {
  form: UseFormReturn<CreateEventFormData>;
}

export function PricingForm({ form }: PricingFormProps) {
  // Live value with re-render — best way
  const isFree = useWatch({
    control: form.control,
    name: 'isFree',
  });

  return (
    <div className='space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm'>
      <div>
        <h3 className='text-lg font-semibold text-neutral-900'>Event Fee</h3>
        <p className='text-sm text-neutral-500 mt-1'>
          Decide if your event is free or paid
        </p>
      </div>

      {/* Free / Paid Toggle */}
      <FormField
        control={form.control}
        name='isFree'
        render={({ field }) => (
          <FormItem className='flex items-center justify-between rounded-lg border border-neutral-200 p-4'>
            <div>
              <FormLabel className='text-neutral-700 font-medium cursor-pointer'>
                {isFree ? 'Free Event' : 'Paid Event'}
              </FormLabel>
              <p className='text-xs text-neutral-500 mt-1'>
                {isFree
                  ? 'This event is free to join'
                  : 'Participants will pay a joining fee'}
              </p>
            </div>

            <FormControl>
              <Switch
                checked={!field.value}
                onCheckedChange={() => field.onChange(!field.value)}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Fee Input — Only visible when NOT free */}
      {!isFree && (
        <FormField
          control={form.control}
          name='fee'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Joining Fee <span className='text-red-500'>*</span>
              </FormLabel>

              <FormControl>
                <div className='relative'>
                  <span className='absolute text-xs left-3 top-3 text-neutral-600 font-semibold'>
                    ৳
                  </span>
                  <Input
                    type='number'
                    min='0'
                    step='100'
                    placeholder='500'
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : ''
                      )
                    }
                    className='pl-8 border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {!isFree && (
        <Alert className='border-amber-200 bg-amber-50 rounded-lg'>
          <Info className='h-4 w-4 text-amber-600' />
          <AlertDescription className='text-sm text-amber-800'>
            Payment will be collected securely before joining
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
