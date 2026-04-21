'use client';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import Link from 'next/link';
import PasswordInput from '@/components/ui/passwordInput';
import InputFieldError from '@/components/shared/InputFieldError';
import SubmitButton from '@/components/shared/SubmitButton';
import { useActionState, useEffect, useState } from 'react';
import { resetPasswordWithToken } from '@/services/auth/resetPassword';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    resetPasswordWithToken,
    null
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
      setDone(true);
      const timer = setTimeout(() => router.push('/login'), 1500);
      return () => clearTimeout(timer);
    }
    if (state && !state.success && state.message && state.message !== 'Validation failed.') {
      toast.error(state.message);
    }
  }, [state, router]);

  if (!token) {
    return (
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-2xl font-bold'>Invalid reset link</h1>
        <p className='text-muted-foreground text-sm'>
          The reset link is missing a token. Please request a new one.
        </p>
        <Link
          href='/forgot-password'
          className='underline underline-offset-4 text-sm'
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className='flex flex-col gap-3 text-center'>
        <h1 className='text-2xl font-bold'>Password reset</h1>
        <p className='text-muted-foreground text-sm'>
          Redirecting you to login...
        </p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <FieldGroup className='gap-4'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Set a new password</h1>
          <p className='text-muted-foreground text-sm'>
            Choose a new password for your account.
          </p>
        </div>

        <input type='hidden' name='token' value={token} />

        <Field>
          <FieldLabel htmlFor='newPassword'>New password</FieldLabel>
          <PasswordInput id='newPassword' name='newPassword' />
          <InputFieldError field='newPassword' state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor='confirmPassword'>Confirm password</FieldLabel>
          <PasswordInput id='confirmPassword' name='confirmPassword' />
          <InputFieldError field='confirmPassword' state={state} />
        </Field>

        <Field>
          <SubmitButton isPending={isPending} pendingLabel='Resetting...'>
            Reset password
          </SubmitButton>
          <FieldDescription className='text-center'>
            <Link href='/login' className='underline underline-offset-4'>
              Back to login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
