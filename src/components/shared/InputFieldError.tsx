/* eslint-disable @typescript-eslint/no-explicit-any */
import { getInputFieldError } from '@/lib/getInputFieldError';
import { FieldDescription } from '../ui/field';

interface FieldErrorProps {
  field: string;
  state: any
}

const InputFieldError = ({ field, state }: FieldErrorProps) => {

  if (getInputFieldError(field, state)) {
    return (
      <FieldDescription className='text-red-700'>
        {getInputFieldError(field, state)}
      </FieldDescription>
    );
  }
  return null;
};

export default InputFieldError;
