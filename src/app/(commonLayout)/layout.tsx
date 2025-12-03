import Navbar from '@/components/shared/Navbar/PublicNavbar';
import PublicFooter from '@/components/shared/PublicFooter';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <PublicFooter />
    </>
  );
};

export default CommonLayout;
