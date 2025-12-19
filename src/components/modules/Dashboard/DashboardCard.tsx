'use client';

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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate, formatTimeTo12Hour } from '@/lib/formatter';
import { IEvent } from '@/types/events.interface';
import {
  Calendar,
  Edit,
  MapPin,
  MoreHorizontal,
  Trash2,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface EventCardProps {
  event: IEvent;
  onEdit?: (event: IEvent) => void;
  onDelete?: (event: IEvent) => void;
}

const DashboardCard = ({ event, onDelete, onEdit }: EventCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const confirmDelete = () => {
    if (onDelete) onDelete(event);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className='overflow-hidden transition-all group hover:shadow-lg p-0 gap-2'>
      <div className='relative h-48 w-full overflow-hidden'>
        <Image
          src={event.images[0]}
          alt={event.title}
          fill
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-104'
        />
        <div className='absolute left-4 top-4'>
          <Badge variant='secondary' className='backdrop-blur-md bg-white/90'>
            {event.category}
          </Badge>
        </div>
      </div>

      <CardHeader className='p-4 pb-2'>
        <div className='flex justify-between items-start'>
          <h3 className='line-clamp-1 text-lg font-bold text-slate-900'>
            {event.title}
          </h3>
          <span className='text-lg font-bold text-emerald-600'>
            {event.fee === 0 ? 'Free' : `$${event.fee}`}
          </span>
        </div>
      </CardHeader>

      <CardContent className='p-4 pt-0 space-y-2'>
        <div className='flex items-center gap-2 text-sm text-slate-500'>
          <Calendar className='h-4 w-4' />
          <span>
            {formatDate(event.date)} • {formatTimeTo12Hour(event.time)}
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-500'>
          <MapPin className='h-4 w-4' />
          <span className='line-clamp-1'>{event.location}</span>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-500'>
          <Users className='h-4 w-4' />
          <span>
            {event.totalParticipants} / {event.maxParticipants} joined
          </span>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <Link href={`/events/${event.slug}`} className='w-full '>
          <Button className='w-full bg-slate-900 hover:bg-slate-800 cursor-pointer'>
            View Details
          </Button>
        </Link>
      </CardFooter>

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
      <DeleteDialog
        title={event.title}
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        handleDelete={confirmDelete}
      />
    </Card>
  );
};

export default DashboardCard;

interface EventDeleteDialogProps {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
}

export const DeleteDialog = ({
  title,
  open,
  setOpen,
  handleDelete,
}: EventDeleteDialogProps) => {
  return (
    <div>
      {/* Delete Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event &quot;{title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
