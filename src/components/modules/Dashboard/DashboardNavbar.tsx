'use client';

import DashboardNavbarContent from './DashboardNavbarContent';
import { NavSection } from '@/types/dashboard.interface';
import { useUser } from '@/hook/useUser';
import { IUserInfo, UserRole } from '@/types/user.interface';
import { getNavItemByRole } from '@/lib/navItem.config';
import { logoutUser } from '@/services/auth/logoutUser';

const DashboardNavbar = () => {
  const { user, setUser, loading } = useUser();
  const navItems: NavSection[] = getNavItemByRole(user?.role as UserRole);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <DashboardNavbarContent
      userInfo={user as IUserInfo}
      navItems={navItems}
      dashboardHome='/admin/dashboard'
      onLogout={handleLogout}
      loading={loading}
    />
  );
};

export default DashboardNavbar;
