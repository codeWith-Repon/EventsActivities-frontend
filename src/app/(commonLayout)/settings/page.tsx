'use client';

import { ChangePasswordForm } from '@/components/modules/Auth/change-password-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Bell, Shield } from 'lucide-react';
import { Metadata } from 'next';

const SettingsPage = () => {
  return (
    <div className='container-custom py-10'>
      <div className='max-w-3xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Account Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account preferences and security.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue='security' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-6'>
            <TabsTrigger value='security' className='flex items-center gap-2'>
              <Lock size={16} />
              <span className='hidden sm:inline'>Security</span>
            </TabsTrigger>
            <TabsTrigger value='notifications' className='flex items-center gap-2'>
              <Bell size={16} />
              <span className='hidden sm:inline'>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value='privacy' className='flex items-center gap-2'>
              <Shield size={16} />
              <span className='hidden sm:inline'>Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Security Tab */}
          <TabsContent value='security' className='space-y-6'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8'>
              <ChangePasswordForm />
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value='notifications' className='space-y-6'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8'>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold mb-2'>Notification Preferences</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Coming soon. Configure how you receive updates about events and messages.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value='privacy' className='space-y-6'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8'>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold mb-2'>Privacy Settings</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Coming soon. Control your profile visibility and data sharing preferences.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
