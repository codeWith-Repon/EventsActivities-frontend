import { ChangePasswordForm } from '@/components/modules/Auth/change-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your EventsHub account settings.',
  robots: { index: false, follow: false },
};

const SettingsPage = () => {
  return (
    <div className='container-custom py-10'>
      <div className='max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8'>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default SettingsPage;
