import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar/PublicNavbar';
import { UserContextProvider } from '@/context/UserContext';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen '>
      <UserContextProvider>
        <Navbar />
      </UserContextProvider>
      <div className='grow'>{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
