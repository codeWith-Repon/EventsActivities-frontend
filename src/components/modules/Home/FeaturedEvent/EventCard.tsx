'use client';

import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Star,
  MoreHorizontal,
  Edit,
  Trash2,
} from 'lucide-react';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { cn } from '@/lib/utils';
import { formatDate, formatTimeTo12Hour } from '@/lib/formatter';

import { IEvent } from '@/types/events.interface';
import Link from 'next/link';
import { userPlaceholderImage } from '@/assets';

interface EventCardProps {
  event: IEvent;
  index?: number;
  onEdit?: (event: IEvent) => void;
  onDelete?: (event: IEvent) => void;
}

const EventCard = ({ event, index = 0, onEdit, onDelete }: EventCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formattedPrice =
    typeof event.fee === 'number'
      ? event.fee === 0
        ? 'Free'
        : `$${event.fee}`
      : event.fee;

  const isFree = formattedPrice === 'Free' || formattedPrice === '$0';

  const handleConfirmDelete = () => {
    if (onDelete) onDelete(event);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        viewport={{ once: true }}
      >
        <Card className='group h-full overflow-hidden border-border/50 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl flex flex-col p-0 gap-2'>
          {/* Image Section */}
          <div className='relative h-48 overflow-hidden'>
            <Image
              src={event.images[0] ?? userPlaceholderImage}
              alt={event.title}
              // width={600}
              // height={400}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-110'
            />

            {/* Category badge */}
            <div className='absolute top-4 left-4'>
              <Badge
                variant='secondary'
                className='bg-white/90 backdrop-blur-sm text-foreground font-semibold uppercase shadow-sm'
              >
                {event.category}
              </Badge>
            </div>

            {/* Like Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                'absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all duration-300',
                isLiked
                  ? 'bg-white text-red-500 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white hover:text-red-500'
              )}
            >
              <Heart size={16} className={cn(isLiked && 'fill-current')} />
            </button>
          </div>

          {/* Content */}
          <CardContent className='p-4 flex flex-col grow'>
            {/* Date + Time */}
            <div className='flex items-center gap-4 text-sm text-muted-foreground mb-3'>
              <div className='flex items-center gap-1'>
                <Calendar size={14} className='text-primary' />
                <span>{formatDate(event.date)}</span>
              </div>

              <div className='flex items-center gap-1.5'>
                <Clock size={14} className='text-primary' />
                <span>{formatTimeTo12Hour(event.time)}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className='text-xl font-bold text-foreground mb-2 group-hover:text-primary line-clamp-1'>
              {event.title}
            </h3>

            {/* Location */}
            <div className='flex items-center gap-1 text-sm text-muted-foreground mb-4'>
              <MapPin size={14} />
              <span className='truncate'>{event.location}</span>
            </div>

            {/* Host + Price */}
            <div className='flex items-center justify-between pt-4 border-t border-border/50 mt-auto'>
              <div className='flex items-center gap-2'>
                <Image
                  src={event?.host?.user?.profileImage ?? userPlaceholderImage}
                  alt={event?.host?.user?.name}
                  width={32}
                  height={32}
                  className='rounded-full object-cover border border-border'
                />
                <div className='flex flex-col'>
                  <span className='text-xs font-medium text-foreground'>
                    {event?.host?.user?.name}
                  </span>
                  <div className='flex items-center gap-0.5'>
                    <Star
                      size={10}
                      className='fill-yellow-400 text-yellow-400'
                    />
                    <span className='text-[10px] text-muted-foreground'>
                      {event.host.rating}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={cn(
                  'font-bold text-lg',
                  isFree ? 'text-green-600' : 'text-primary'
                )}
              >
                {formattedPrice}
              </span>
            </div>

            <Link href={`/events/${event.slug}`}>
              <Button
                variant='secondary'
                className='w-full cursor-pointer mt-3'
                size='lg'
              >
                View Details
              </Button>
            </Link>
          </CardContent>

          {/* Action Footer */}
          {(onEdit || onDelete) && (
            <CardFooter className='p-2 px-4 bg-muted/30 border-t border-border/50 flex justify-end'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0 rounded-full hover:bg-background'
                  >
                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-40'>
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(event)}>
                      <Edit className='mr-2 h-4 w-4' /> Edit
                    </DropdownMenuItem>
                  )}

                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => setIsDeleteDialogOpen(true)}
                      className='text-destructive focus:text-destructive'
                    >
                      <Trash2 className='mr-2 h-4 w-4' /> Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          )}
        </Card>
      </motion.div>

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event &quot;{event.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventCard;
