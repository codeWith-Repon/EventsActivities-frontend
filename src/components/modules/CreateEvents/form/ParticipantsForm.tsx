import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CreateEventFormData } from '../CreateEventsFormContent';


interface ParticipantsFormProps {
  form: UseFormReturn<CreateEventFormData>;
}

export function ParticipantsForm({ form }: ParticipantsFormProps) {
  return (
    <div className='space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm'>
      <div>
        <h3 className='text-lg font-semibold text-neutral-900'>Participants</h3>
        <p className='text-sm text-neutral-500 mt-1'>
          Set limits for how many people can join
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0'>
        <FormField
          control={form.control}
          name='minParticipants'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Minimum Participants
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='1'
                  placeholder='1'
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : ''
                    )
                  }
                  className='border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='maxParticipants'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Maximum Participants <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='1'
                  placeholder='50'
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : ''
                    )
                  }
                  className='border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Alert className='border-amber-200 bg-amber-50 rounded-lg'>
        <Info className='h-4 w-4 text-amber-600' />
        <AlertDescription className='text-sm text-amber-800'>
          Event status will automatically change to FULL when max is reached
        </AlertDescription>
      </Alert>
    </div>
  );
}
