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
import { TPaymentStatus } from '@/types/payment.type';
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
  paymentStatus?: TPaymentStatus;
  onEdit?: (event: IEvent) => void;
  onDelete?: (event: IEvent) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PAID: {
    label: 'Paid',
    className:
      'bg-green-100 text-green-700 hover:bg-green-100 border-green-200',
  },
  PENDING: {
    label: 'Pending',
    className:
      'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-red-100 text-red-700 hover:bg-red-100 border-red-200',
  },
  REFUNDED: {
    label: 'Refunded',
    className: 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200',
  },
};

const DashboardCard = ({
  event,
  paymentStatus,
  onDelete,
  onEdit,
}: EventCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const status = paymentStatus ? statusConfig[paymentStatus] : null;

  const confirmDelete = () => {
    if (onDelete) onDelete(event);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className='overflow-hidden transition-all group hover:shadow-lg p-0 gap-2'>
      <div className='relative h-48 w-full overflow-hidden'>
        <Image
          src={
            event.images[0] ??
            'https://cdn.dribbble.com/userupload/20836764/file/original-aefd475381a7c5a575af32151c686180.png?format=webp&resize=450x338&vertical=center'
          }
          alt={event.title}
          fill
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-104'
        />
        <div className='absolute left-4 top-4'>
          <Badge variant='secondary' className='backdrop-blur-md bg-white/90'>
            {event.category}
          </Badge>
        </div>

        {status && (
          <div className='absolute top-3 right-3'>
            <Badge className={`font-medium shadow-sm ${status.className}`}>
              {status.label}
            </Badge>
          </div>
        )}

        <div className='absolute top-0 right-0 z-20'>
          {(onEdit || onDelete) && (
            <div className='p-2 px-4 flex justify-end'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0 rounded-full hover:bg-background border cursor-pointer'
                  >
                    <MoreHorizontal className='h-4 w-4 ' />
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
            </div>
          )}
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
