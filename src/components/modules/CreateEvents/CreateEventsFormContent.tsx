/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import z from 'zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicInfoForm } from './form/BasicInfoForm';
import { DateLocationForm } from './form/DateLocationForm';
import { PricingForm } from './form/PricingForm';
import { ParticipantsForm } from './form/ParticipantsForm';
import { ImagesForm } from './form/ImagesForm';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import createEvent from '@/services/events/createEvent';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters'),
  slug: z.string(),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  location: z.string().min(3, 'Please enter a location'),
  minParticipants: z.coerce
    .number()
    .int()
    .positive('Minimum participants must be greater than 0')
    .optional(),
  maxParticipants: z.coerce
    .number()
    .int()
    .positive('Maximum participants must be greater than 0'),
  isFree: z.boolean(),
  fee: z.coerce.number().optional(),
  images: z.array(z.any()).optional().default([]),
  status: z.enum(['open', 'cancelled']).default('open'),
});

export interface CreateEventFormData {
  title: string;
  slug: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  minParticipants: number;
  maxParticipants: number;
  isFree: boolean;
  fee?: number;
  images: Array<{
    file?: File;
    preview?: string;
  }>;
  status: 'open' | 'cancelled';
}

const CreateEventsFormContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: '',
      description: '',
      date: '',
      time: '',
      location: '',
      minParticipants: 1,
      maxParticipants: 5,
      isFree: true,
      fee: 0,
      images: [],
      status: 'open',
    },
  });

  const onSubmit = async (data: CreateEventFormData) => {
    setIsSubmitting(true);

    try {
      // Create FormData
      const formData = new FormData();

      // Append all normal fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'images') {
          if (key === 'status') {
            formData.append(key, String(value).toUpperCase());
          } else {
            formData.append(key, String(value));
          }
        }
      });

      // Append images (files only)
      if (data.images && data.images.length > 0) {
        data.images.forEach((img) => {
          if (img.file) {
            formData.append('files', img.file);
          }
        });
      }

      // Send to server function
      const result = await createEvent(formData);

      if (result.success) {
        toast.success('Event created successfully 🎉', {
          description: `"${data.title}" has been published and is now visible to participants`,
        });
        router.push('/my-events');
        form.reset();
      } else {
        toast.error('Failed to create event', {
          description: 'Please try again or contact support',
        });
        return;
      }
    } catch (error: any) {
      console.log(error);
      toast.error('Failed to create event', {
        description: 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Basic Information */}
          <BasicInfoForm form={form} />

          {/* Date & Location */}
          <DateLocationForm form={form} />

          {/* Participants */}
          <ParticipantsForm form={form} />

          {/* Pricing */}
          <PricingForm form={form} />

          {/* Images */}
          <ImagesForm form={form} />

          {/* Visibility */}
          {/* <VisibilityForm form={form} /> */}
          <Button
            type='submit'
            disabled={isSubmitting}
            size='lg'
            className='rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
          >
            {isSubmitting ? (
              <div className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                Publishing...
              </div>
            ) : (
              'Publish Event'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateEventsFormContent;
