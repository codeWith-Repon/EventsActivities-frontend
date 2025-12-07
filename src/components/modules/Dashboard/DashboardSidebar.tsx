'use client';

import { useUser } from '@/hook/useUser';
import { UserRole } from '@/lib/auth-utils';
import { getNavItemByRole } from '@/lib/navItem.config';
import { NavSection } from '@/types/dashboard.interface';
import DashboardSidebarContent from './DashboardSidebarContent';
import { IUserInfo } from '@/types/user.interface';

const DashboardSidebar = () => {
  const { user, loading } = useUser();
  const navItems: NavSection[] = getNavItemByRole(user?.role as UserRole);

  return (
    <DashboardSidebarContent
      userInfo={user as IUserInfo}
      navItems={navItems}
      dashboardHome='/admin/dashboard'
      loading={loading}
    />
  );
};

export default DashboardSidebar;
