'use client';

import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import PasswordInput from '@/components/ui/passwordInput';
import InputFieldError from '@/components/shared/InputFieldError';
import SubmitButton from '@/components/shared/SubmitButton';
import { useActionState, useEffect, useRef } from 'react';
import { changePassword } from '@/services/auth/changePassword';
import { toast } from 'sonner';

export function ChangePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(changePassword, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      if (state.message !== 'Validation failed.') {
        toast.error(state.message);
      }
    }
    if (state && state.success && state.message) {
      toast.success(state.message);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <FieldGroup className='gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold'>Change password</h1>
          <p className='text-muted-foreground text-sm'>
            Enter your current password and choose a new one.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor='oldPassword'>Current password</FieldLabel>
          <PasswordInput id='oldPassword' name='oldPassword' />
          <InputFieldError field='oldPassword' state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor='newPassword'>New password</FieldLabel>
          <PasswordInput id='newPassword' name='newPassword' />
          <InputFieldError field='newPassword' state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor='confirmPassword'>Confirm new password</FieldLabel>
          <PasswordInput id='confirmPassword' name='confirmPassword' />
          <InputFieldError field='confirmPassword' state={state} />
        </Field>

        <Field>
          <SubmitButton isPending={isPending} pendingLabel='Updating...'>
            Update password
          </SubmitButton>
        </Field>
      </FieldGroup>
    </form>
  );
}
