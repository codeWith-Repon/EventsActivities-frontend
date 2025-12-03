import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar/PublicNavbar';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen bg-primary/5'>
      <Navbar />
      <div className='grow'>{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
