'use client';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import InputFieldError from '@/components/shared/InputFieldError';
import SubmitButton from '@/components/shared/SubmitButton';
import { useActionState, useEffect, useState } from 'react';
import { forgotPassword } from '@/services/auth/forgotPassword';
import { toast } from 'sonner';

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
      setSubmitted(true);
    }
    if (state && !state.success && state.message && state.message !== 'Validation failed.') {
      toast.error(state.message);
    }
  }, [state]);

  if (submitted) {
    return (
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-2xl font-bold'>Check your email</h1>
        <p className='text-muted-foreground text-sm'>
          If that email is registered, you&apos;ll receive a password reset link
          shortly. The link expires in 60 minutes.
        </p>
        <Link
          href='/login'
          className='underline underline-offset-4 text-sm'
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <FieldGroup className='gap-4'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Forgot your password?</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            name='email'
            placeholder='m@example.com'
            defaultValue={(state?.formData?.email as string) || ''}
          />
          <InputFieldError field='email' state={state} />
        </Field>

        <Field>
          <SubmitButton isPending={isPending} pendingLabel='Sending...'>
            Send reset link
          </SubmitButton>
          <FieldDescription className='text-center'>
            Remember your password?{' '}
            <Link href='/login' className='underline underline-offset-4'>
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
