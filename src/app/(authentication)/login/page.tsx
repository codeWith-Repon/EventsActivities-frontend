import { AuthImages } from '@/assets';
import { LoginForm } from '@/components/modules/Auth/login-from';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2 '>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex items-start'>
          <Link href='/' className='text-2xl font-bold tracking-tight'>
            <span className='text-primary'>events</span>hub
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <Image
          src={AuthImages.events_login}
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
          fill
          sizes='100vw'
        />
      </div>
    </div>
  );
}
