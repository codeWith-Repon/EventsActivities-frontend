import EditEventsFormContent from './EditEventsFormContent';
import { IEvent } from '@/types/events.interface';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  event: IEvent;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditEventFormDialog = ({ event, open, setOpen }: Props) => {
  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-[95vw] md:max-w-[600px] h-[90vh] p-0 flex flex-col gap-0 overflow-hidden bg-white border-none shadow-2xl'>
        <DialogHeader className='p-3 md:p-6 border-b bg-slate-50/50'>
          <DialogTitle className='text-xl md:text-2xl font-bold text-slate-900'>
            Edit Event
          </DialogTitle>
          <DialogDescription className='text-slate-500 max-w-sm mx-auto md:max-w-none md:mx-0 md:text-base'>
            Update the details of your event to keep participants informed.
          </DialogDescription>
        </DialogHeader>

        <div className='overflow-y-auto px-1 sm:px-6 py-4 bg-white'>
          <EditEventsFormContent event={event} onSuccess={closeDialog} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventFormDialog;
