import Profile from '@/components/modules/Profile';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { IUserInfo } from '@/types/user.interface';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'My Profile ',
  description:
    'View and manage your EventHub profile, personal info, and settings.',
};

const ProfilePage = async () => {
  const userInfo = await getUserInfo();

  return (
    <div className='container-custom mt-21 mb-16'>
      <Profile userInfo={userInfo?.data as IUserInfo} />
    </div>
  );
};

export default ProfilePage;
