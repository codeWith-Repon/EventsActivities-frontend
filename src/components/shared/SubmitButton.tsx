'use client';

import { Loader } from 'lucide-react';
import { Button } from '../ui/button';
import { ComponentProps } from 'react';

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  isPending: boolean;
  pendingLabel?: string;
}

const SubmitButton = ({
  isPending,
  pendingLabel,
  children,
  className,
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button
      type='submit'
      disabled={isPending}
      className={`cursor-pointer disabled:bg-primary/80 ${className ?? ''}`}
      {...rest}
    >
      {isPending && (
        <span className='animate-spin mr-2 flex items-center justify-center'>
          <Loader size={16} />
        </span>
      )}
      {isPending ? pendingLabel ?? 'Please wait...' : children}
    </Button>
  );
};

export default SubmitButton;
