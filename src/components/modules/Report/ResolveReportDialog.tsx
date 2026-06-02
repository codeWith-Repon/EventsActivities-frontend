'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { IReport } from '@/types/report.interface';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type Resolution = 'RESOLVED' | 'DISMISSED';

interface ResolveReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: IReport | null;
  onConfirm: (status: Resolution, adminNote: string) => void;
  loading?: boolean;
}

const ResolveReportDialog = ({
  open,
  onOpenChange,
  report,
  onConfirm,
  loading,
}: ResolveReportDialogProps) => {
  const [status, setStatus] = useState<Resolution>('RESOLVED');
  const [note, setNote] = useState('');

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) {
          setStatus('RESOLVED');
          setNote('');
        }
        onOpenChange(o);
      }}
    >
      <DialogContent className='glass-strong sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-display'>Review report</DialogTitle>
          <DialogDescription>
            Resolve or dismiss this {report?.type?.toLowerCase()} report.
          </DialogDescription>
        </DialogHeader>

        {report && (
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <StatusBadge
                status={report.type}
                tone={report.type === 'EVENT' ? 'cyan' : 'violet'}
              />
              <StatusBadge status={report.status} />
            </div>
            <p className='rounded-xl border border-border bg-muted/60 p-3 text-sm text-muted-foreground'>
              {report.reason}
            </p>

            <div>
              <label className='mb-2 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                Resolution
              </label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as Resolution)}
              >
                <SelectTrigger className='border-border bg-muted'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='RESOLVED'>Resolved</SelectItem>
                  <SelectItem value='DISMISSED'>Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='mb-2 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
                Admin note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder='Add a note about the action taken…'
                className='w-full resize-none rounded-xl border border-border bg-muted p-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-[var(--aurora-violet)]/50'
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className='rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(status, note)}
            disabled={loading}
            className='inline-flex items-center justify-center rounded-lg bg-gradient-aurora px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50'
          >
            {loading && <Loader2 className='mr-2 size-4 animate-spin' />}
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResolveReportDialog;
