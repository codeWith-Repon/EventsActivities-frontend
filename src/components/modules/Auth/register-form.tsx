'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import PasswordInput from '@/components/ui/passwordInput';
import React, { useActionState, useEffect } from 'react';
import { registerUser } from '@/services/auth/registerUser';
import { toast } from 'sonner';
import InputFieldError from '@/components/shared/InputFieldError';

export function RegisterForm({}: React.ComponentProps<'form'>) {
  const [state, fromAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    console.log(state);
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    toast.success(
      state?.message === 'User created successfully'
        ? 'Registration successful! Welcome aboard...'
        : 'Registration failed.'
    );
  }, [state]);

  return (
    <form action={fromAction} method='POST'>
      <FieldGroup className='gap-4'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Register your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your details to create an account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor='name'>Full Name</FieldLabel>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='jhon doe'
            defaultValue={state?.formData?.name || ''}
          />
          <InputFieldError field='name' state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            name='email'
            placeholder='m@example.com'
            defaultValue={state?.formData?.email || ''}
          />
          <InputFieldError field='email' state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <PasswordInput
            id='password'
            name='password'
            defaultValue={state?.formData?.password || ''}
          />
          <InputFieldError field='password' state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
          <PasswordInput
            id='confirmPassword'
            name='confirmPassword'
            defaultValue={state?.formData?.confirmPassword || ''}
          />
          <InputFieldError field='confirmPassword' state={state} />
        </Field>

        <FieldGroup>
          <Field>
            <Button
              type='submit'
              disabled={isPending}
              className='disabled:bg-primary/80 cursor-pointer'
            >
              {isPending ? 'Registering...' : 'Create Account'}
            </Button>
          </Field>

          <FieldSeparator>Or continue with</FieldSeparator>
          <Field>
            <Button variant='outline' className='cursor-pointer' type='button'>
              Continue with Google
            </Button>
            <FieldDescription className='text-center'>
              Don&apos;t have an account?{' '}
              <Link
                href='/login'
                className='underline underline-offset-4 cursor-pointer'
              >
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
