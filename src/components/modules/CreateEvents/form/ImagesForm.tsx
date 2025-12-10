/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CreateEventFormData } from '@/types/events.interface';

interface ImagesFormProps {
  form: UseFormReturn<CreateEventFormData>;
}

export function ImagesForm({ form }: ImagesFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = form.watch('images') || [];

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((img: any) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files).slice(0, 5 - images.length);
    const newImages = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    form.setValue('images', [...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const removed = images[index];
    if (removed.preview) URL.revokeObjectURL(removed.preview);
    const newImages = images.filter((_: any, i: number) => i !== index);
    form.setValue('images', newImages);
  };

  return (
    <div className='space-y-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm'>
      <div>
        <h3 className='text-lg font-semibold text-neutral-900'>Event Images</h3>
        <p className='text-sm text-neutral-500 mt-1'>
          Add images to make your event more appealing
        </p>
      </div>

      <FormField
        control={form.control}
        name='images'
        render={() => (
          <FormItem>
            <FormLabel className='text-neutral-700 font-medium'>
              Upload Images
            </FormLabel>
            <FormControl>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-lg border-2 border-dashed transition-colors ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-neutral-300 bg-neutral-50 hover:border-neutral-400'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={(e) =>
                    e.target.files && handleFiles(e.target.files)
                  }
                  className='hidden'
                />
                <div className='p-8 text-center'>
                  <Upload className='h-8 w-8 text-neutral-400 mx-auto mb-3' />
                  <p className='text-sm font-medium text-neutral-700'>
                    Drag and drop images here
                  </p>
                  <p className='text-xs text-neutral-500 mt-1'>
                    or{' '}
                    <button
                      type='button'
                      onClick={() => fileInputRef.current?.click()}
                      className='font-semibold text-emerald-600 hover:text-emerald-700 underline'
                    >
                      browse
                    </button>
                  </p>
                  <p className='text-xs text-neutral-500 mt-3'>
                    PNG, JPG, GIF up to 10MB each. Max 5 images.
                  </p>
                </div>
              </div>
            </FormControl>
            <FormDescription className='text-xs text-neutral-500'>
              {images.length}/5 images uploaded
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {images.length > 0 && (
        <div>
          <p className='text-sm font-medium text-neutral-700 mb-3'>
            Uploaded Images
          </p>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {images.map((image: any, index: number) => (
              <div key={index} className='relative group'>
                <div className='relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200'>
                  {image.preview ? (
                    <Image
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      width={300}
                      height={300}
                      unoptimized
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <ImageIcon className='h-6 w-6 text-neutral-400' />
                    </div>
                  )}
                </div>
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='absolute top-1 right-1 p-1 bg-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <X className='h-4 w-4 text-white' />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
