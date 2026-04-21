'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ReactNode, useEffect, useState } from 'react';
import { Label } from '../ui/label';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (value: string) => void;
  title: string;
  description?: ReactNode;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  initialValue?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

const SelectActionDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  label,
  placeholder = 'Select an option',
  options,
  initialValue,
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  isLoading = false,
}: SelectActionDialogProps) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  useEffect(() => {
    if (open) setValue(initialValue ?? '');
  }, [open, initialValue]);

  const disabled = isLoading || !value || value === initialValue;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className='grid gap-2 py-2'>
          <Label>{label}</Label>
          <Select value={value} onValueChange={setValue} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type='button'
            onClick={() => onConfirm(value)}
            disabled={disabled}
          >
            {isLoading ? 'Saving...' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectActionDialog;
