import CreateEventsFormContent from './CreateEventsFormContent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateEventFormDialog = ({ open, setOpen }: Props) => {
  const closeDialog = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2 shadow-lg shadow-primary/20 cursor-pointer'>
          <Plus className='w-4 h-4' />
          <span>Create Event</span>
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-[95vw] md:max-w-[600px] h-[90vh] p-0 flex flex-col gap-0 overflow-hidden bg-white border-none shadow-2xl'>
        <DialogHeader className='p-3 md:p-6 border-b bg-slate-50/50'>
          <DialogTitle className='text-xl md:text-2xl font-bold text-slate-900'>
            Create a New Event
          </DialogTitle>
          <DialogDescription className='text-slate-500 max-w-sm mx-auto md:max-w-none md:mx-0 md:text-base'>
            Fill in the details below to bring people together for your
            activity.
          </DialogDescription>
        </DialogHeader>

        <div className=' overflow-y-auto px-1 sm:px-6 py-4 bg-white'>
          <CreateEventsFormContent onSuccess={closeDialog} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventFormDialog;
