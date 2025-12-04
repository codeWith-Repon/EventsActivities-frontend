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
import React from 'react';

export function RegisterForm({}: React.ComponentProps<'form'>) {
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });
  };

  return (
    <form onSubmit={handleRegister}>
      <FieldGroup className='gap-4'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Register your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your details to create an account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor='name'>Full Name</FieldLabel>
          <Input id='name' name='name' type='text' placeholder='jhon doe' />
          {/* {getFieldError('name') && (
              <FieldDescription className='text-red-600 text-left'>
                {getFieldError('name')}
              </FieldDescription>
            )} */}
          {/* <InputFieldError field='name' state={state} /> */}
        </Field>

        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='m@example.com'
          />
          {/* <InputFieldError field='email' state={state} /> */}
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <PasswordInput id='password' name='password' />
          {/* <InputFieldError field='password' state={state} /> */}
        </Field>
        
        <Field>
          <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
          <PasswordInput id='confirmPassword' name='confirmPassword' />
          {/* <InputFieldError field='confirmPassword' state={state} /> */}
        </Field>

        <Field>
          <Button type='submit'>Register</Button>
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
    </form>
  );
}
