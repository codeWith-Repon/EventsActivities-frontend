import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CreateEventFormData } from '@/types/events.interface';

const CATEGORIES = [
  'Concert',
  'Hiking',
  'Music',
  'Dining',
  'Sports',
  'Gaming',
  'Meetup',
  'Workshop',
  'Other',
];

interface BasicInfoFormProps {
  form: UseFormReturn<CreateEventFormData>;
}

export function BasicInfoForm({ form }: BasicInfoFormProps) {
  return (
    <div className='space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm'>
      <div>
        <h3 className='text-lg font-semibold text-neutral-900'>
          Basic Information
        </h3>
        <p className='text-sm text-neutral-500 mt-1'>
          Start with the essentials about your event
        </p>
      </div>

      <div className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Event Title <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Weekend Hiking Trip'
                  {...field}
                  className='border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Category <span className='text-red-500'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-neutral-700 font-medium'>
                Description <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Explain what participants can expect'
                  {...field}
                  className='border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] resize-none'
                />
              </FormControl>
              <FormDescription className='text-xs text-neutral-500'>
                Be descriptive to attract the right participants
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
