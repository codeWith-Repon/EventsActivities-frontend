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
import InputFieldError from '@/components/shared/InputFieldError';
import { useActionState, useEffect, useRef } from 'react';
import { loginUser } from '@/services/auth/loginUser';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

export function LoginForm({ redirect }: { redirect?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, fromAction, isPending] = useActionState(loginUser, null);

  const handleQuickLogin = (email: string, password: string) => {
    if (formRef.current) {
      const emailInput = formRef.current.querySelector(
        'input[name="email"]'
      ) as HTMLInputElement;
      const passwordInput = formRef.current.querySelector(
        'input[name="password"]'
      ) as HTMLInputElement;

      if (emailInput && passwordInput) {
        emailInput.value = email;
        passwordInput.value = password;

        formRef.current.requestSubmit();
      }
    }
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state?.message);
    }
    if (state && state.success && state.message) {
      toast.success(state?.message);
    }
  }, [state]);

  return (
    <form action={fromAction} ref={formRef}>
      <FieldGroup className='gap-4'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p>
        </div>
        {redirect && <input type='hidden' name='redirect' value={redirect} />}
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
          <Button
            type='submit'
            className='cursor-pointer disabled:bg-primary/90'
            disabled={isPending}
          >
            <span
              className='animate-spin mr-2 flex items-center justify-center '
              style={{ display: isPending ? 'block' : 'none' }}
            >
              <Loader size={16} />
            </span>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant='outline' className='cursor-pointer' type='button'>
            Login with Google
          </Button>
          <FieldDescription className='text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='underline underline-offset-4'>
              Sign up
            </Link>
          </FieldDescription>
        </Field>
        <div className='grid grid-cols-2 gap-2 border p-2 rounded-sm'>
          <Button
            type='button'
            size='sm'
            variant='outline'
            className='hover:bg-gray-50 '
            onClick={() => handleQuickLogin('admin@gmail.com', '123456')}
            disabled={isPending}
          >
            Login As Admin
          </Button>

          <Button
            type='button'
            size='sm'
            variant='outline'
            className='hover:bg-gray-50'
            onClick={() => handleQuickLogin('evanbest@mailinator.com', '123456')}
            disabled={isPending}
          >
            Login As User
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
