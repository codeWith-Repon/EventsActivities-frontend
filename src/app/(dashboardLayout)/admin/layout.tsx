import DashboardNavbar from '@/components/modules/Dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/modules/Dashboard/DashboardSidebar';
import { UserContextProvider } from '@/context/UserContext';
import React from 'react';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      <div className='flex h-screen overflow-hidden'>
        <DashboardSidebar />
        <div className='flex flex-1 flex-col overflow-hidden bg-white '>
          <DashboardNavbar />
          <main className='flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6 '>
            <div className=''>{children}</div>
          </main>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default AdminDashboardLayout;
