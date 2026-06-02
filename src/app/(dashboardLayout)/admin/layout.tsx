import DashboardNavbar from '@/components/modules/Dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/modules/Dashboard/DashboardSidebar';
import AuroraThemeScript from '@/components/dashboard/AuroraThemeScript';
import { UserContextProvider } from '@/context/UserContext';
import { dashboardFontVars } from '@/lib/dashboard-fonts';
import React from 'react';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      <div
        id='aurora-root'
        className={`aurora aurora-light ${dashboardFontVars} aurora-canvas flex h-screen overflow-hidden bg-background font-sans text-foreground`}
      >
        <AuroraThemeScript />
        <DashboardSidebar />
        <div className='flex flex-1 flex-col overflow-hidden'>
          <DashboardNavbar />
          <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8'>
            <div className='mx-auto w-full max-w-7xl'>{children}</div>
          </main>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default AdminDashboardLayout;
