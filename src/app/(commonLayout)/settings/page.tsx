'use client';

import { ChangePasswordForm } from '@/components/modules/Auth/change-password-form';
import { Card } from '@/components/ui/card';
import { Lock, Bell, Shield } from 'lucide-react';
import { useState } from 'react';

type SettingsTab = 'security' | 'notifications' | 'privacy';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('security');

  const tabs = [
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

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

        {/* Tab Navigation */}
        <div className='flex gap-2 mb-6 border-b border-gray-200'>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === (tab.id as SettingsTab);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={18} />
                <span className='hidden sm:inline'>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className='p-6 md:p-8 rounded-2xl'>
              <ChangePasswordForm />
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card className='p-6 md:p-8 rounded-2xl'>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold mb-2'>Notification Preferences</h3>
                  <p className='text-sm text-muted-foreground'>
                    Coming soon. Configure how you receive updates about events and messages.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <Card className='p-6 md:p-8 rounded-2xl'>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-semibold mb-2'>Privacy Settings</h3>
                  <p className='text-sm text-muted-foreground'>
                    Coming soon. Control your profile visibility and data sharing preferences.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
