import PageHeader from '@/components/dashboard/PageHeader';
import NotificationsList from '@/components/modules/Notification/NotificationsList';
import { getNotifications } from '@/services/notification/notification.service';
import { INotification } from '@/types/notification.interface';

export const dynamic = 'force-dynamic';

const NotificationsPage = async () => {
  const res = await getNotifications();
  const items: INotification[] = res?.data ?? [];

  return (
    <div className='space-y-6'>
      <PageHeader
        kicker='Account'
        title='Notifications'
        description='Your latest activity and alerts.'
      />
      <NotificationsList initial={items} />
    </div>
  );
};

export default NotificationsPage;
