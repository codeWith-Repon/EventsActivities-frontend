/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import z from 'zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicInfoForm } from '../CreateEvents/form/BasicInfoForm';
import { DateLocationForm } from '../CreateEvents/form/DateLocationForm';
import { PricingForm } from '../CreateEvents/form/PricingForm';
import { ParticipantsForm } from '../CreateEvents/form/ParticipantsForm';
import { ImagesForm } from '../CreateEvents/form/ImagesForm';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, X } from 'lucide-react';
import updateEvent from '@/services/events/updateEvent';
import { CreateEventFormData, IEvent } from '@/types/events.interface';
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
    .nonnegative('Minimum participants must be 0 or greater')
    .optional(),
  maxParticipants: z.coerce
    .number()
    .int()
    .positive('Maximum participants must be greater than 0'),
  isFree: z.boolean(),
  fee: z.coerce.number().optional(),
  images: z.array(z.any()).optional().default([]),
  status: z.enum(['open', 'cancelled', 'full', 'completed']).default('open'),
}).refine((data) => {
  const min = data.minParticipants || 0;
  const max = data.maxParticipants || 0;
  return min <= max;
}, {
  message: 'Minimum participants cannot be greater than maximum participants',
  path: ['minParticipants'],
});

interface Props {
  event: IEvent;
  onSuccess?: () => void;
}

const EditEventsFormContent = ({ event, onSuccess }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(event.images || []);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const router = useRouter();

  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toISOString().split('T')[0];

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      slug: event.slug,
      category: event.category,
      description: event.description,
      date: formattedDate,
      time: event.time,
      location: event.location,
      minParticipants: event.minParticipants || 1,
      maxParticipants: event.maxParticipants || 5,
      isFree: event.fee === 0,
      fee: event.fee || 0,
      images: [],
      status: event.status.toLowerCase(),
    },
  });

  const handleRemoveExistingImage = (url: string) => {
    setExistingImages(prev => prev.filter(img => img !== url));
    setDeleteImages(prev => [...prev, url]);
  };

  const handleRestoreImage = (url: string) => {
    setExistingImages(prev => [...prev, url]);
    setDeleteImages(prev => prev.filter(img => img !== url));
  };

  const onSubmit = async (data: CreateEventFormData) => {
    setIsSubmitting(true);

    try {
      console.log('Form data:', data);
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'images') {
          if (key === 'status') {
            formData.append(key, String(value).toUpperCase());
          } else {
            formData.append(key, String(value));
          }
        }
      });

      if (data.images && data.images.length > 0) {
        data.images.forEach((img) => {
          if (img.file) {
            formData.append('files', img.file);
          }
        });
      }

      if (deleteImages.length > 0) {
        deleteImages.forEach((url) => {
          formData.append('deleteImages', url);
        });
      }

      const result = await updateEvent(event.slug, formData);

      if (result.success) {
        toast.success('Event updated successfully 🎉', {
          description: `"${data.title}" has been updated`,
        });
        form.reset();
        setExistingImages([]);
        setDeleteImages([]);
        router.refresh();
        onSuccess?.();
      } else {
        toast.error('Failed to update event', {
          description: result.message || 'Something went wrong',
        });
      }
    } catch (error: any) {
      toast.error('Error updating event', {
        description:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Something went wrong',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error('Form validation errors:', errors);
          const errorMessages = Object.entries(errors)
            .map(([field, error]: any) => `${field}: ${error?.message}`)
            .join('\n');
          toast.error('Form validation failed', {
            description: errorMessages || 'Please check all fields',
          });
        })}
        className='space-y-6'
      >
        <BasicInfoForm form={form} />
        <DateLocationForm form={form} />
        <ParticipantsForm form={form} />
        <PricingForm form={form} />

        {/* Existing Images Section */}
        {existingImages.length > 0 && (
          <div className='space-y-3'>
            <label className='text-sm font-medium text-slate-700'>
              Current Images
            </label>
            <div className='grid grid-cols-3 gap-2'>
              {existingImages.map((url) => (
                <div
                  key={url}
                  className='relative group rounded-lg overflow-hidden border border-slate-200'
                >
                  <img
                    src={url}
                    alt='event'
                    className='w-full h-24 object-cover'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveExistingImage(url)}
                    className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200'
                  >
                    <X className='w-5 h-5 text-white' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images Section */}
        <ImagesForm form={form} />

        {/* Deleted Images Preview */}
        {deleteImages.length > 0 && (
          <div className='space-y-3 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <label className='text-sm font-medium text-slate-700'>
              Images to be deleted ({deleteImages.length})
            </label>
            <div className='grid grid-cols-3 gap-2'>
              {deleteImages.map((url) => (
                <div
                  key={url}
                  className='relative group rounded-lg overflow-hidden border border-red-300 opacity-50'
                >
                  <img
                    src={url}
                    alt='to delete'
                    className='w-full h-24 object-cover'
                  />
                  <button
                    type='button'
                    onClick={() => handleRestoreImage(url)}
                    className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200'
                  >
                    <X className='w-5 h-5 text-white' />
                  </button>
                </div>
              ))}
            </div>
            <p className='text-xs text-slate-600'>
              Hover and click X to restore an image
            </p>
          </div>
        )}

        <div className='flex gap-3 justify-end pt-4'>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='gap-2 shadow-lg shadow-primary/20'
          >
            {isSubmitting && <Loader2 className='w-4 h-4 animate-spin' />}
            {isSubmitting ? 'Updating...' : 'Update Event'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditEventsFormContent;
