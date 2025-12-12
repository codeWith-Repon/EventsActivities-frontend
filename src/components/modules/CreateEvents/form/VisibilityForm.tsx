import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CreateEventFormData } from '@/types/events.interface';

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open (Visible to users)' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
];

interface VisibilityFormProps {
  form: UseFormReturn<CreateEventFormData>;
}

export function VisibilityForm({ form }: VisibilityFormProps) {
  const status = form.watch('status');

  return (
    <div className='space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm'>
      <div>
        <h3 className='text-lg font-semibold text-neutral-900'>
          Event Visibility
        </h3>
        <p className='text-sm text-neutral-500 mt-1'>
          Control who can see your event
        </p>
      </div>

      <FormField
        control={form.control}
        name='status'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-neutral-700 font-medium'>
              Event Status <span className='text-red-500'>*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <Alert className='border-blue-200 bg-blue-50 rounded-lg'>
        <Info className='h-4 w-4 text-blue-600' />
        <AlertDescription className='text-sm text-blue-800'>
          Only OPEN events are visible to users
        </AlertDescription>
      </Alert>
    </div>
  );
}
