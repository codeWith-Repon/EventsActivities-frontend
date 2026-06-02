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
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export type AssignableRole = 'USER' | 'HOST' | 'ADMIN';

interface ChangeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  currentRole?: string;
  onConfirm: (role: AssignableRole) => void;
  loading?: boolean;
}

const ROLES: { label: string; value: AssignableRole }[] = [
  { label: 'User', value: 'USER' },
  { label: 'Host', value: 'HOST' },
  { label: 'Admin', value: 'ADMIN' },
];

const ChangeRoleDialog = ({
  open,
  onOpenChange,
  userName,
  currentRole,
  onConfirm,
  loading,
}: ChangeRoleDialogProps) => {
  const [role, setRole] = useState<AssignableRole>('USER');

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o && currentRole) {
          const normalized = currentRole.toUpperCase();
          setRole(
            normalized === 'ADMIN' || normalized === 'HOST'
              ? (normalized as AssignableRole)
              : 'USER'
          );
        }
        onOpenChange(o);
      }}
    >
      <DialogContent className='glass-strong sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-display'>Change role</DialogTitle>
          <DialogDescription>
            Update the role for{' '}
            <span className='font-medium text-foreground'>{userName}</span>.
            Promoting to Host creates a host profile automatically.
          </DialogDescription>
        </DialogHeader>

        <div className='py-2'>
          <label className='mb-2 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground'>
            New role
          </label>
          <Select value={role} onValueChange={(v) => setRole(v as AssignableRole)}>
            <SelectTrigger className='border-white/10 bg-white/5'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className='rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(role)}
            disabled={loading}
            className='inline-flex items-center justify-center rounded-lg bg-gradient-aurora px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50'
          >
            {loading && <Loader2 className='mr-2 size-4 animate-spin' />}
            Update role
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoleDialog;
