'use client';

import { INotification } from '@/types/notification.interface';
import {
  deleteNotification,
  markAllNotificationsRead,
  markNotificationRead,
} from '@/services/notification/notification.service';
import { formatDateTime } from '@/lib/formatter';
import GlassCard from '@/components/dashboard/GlassCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const NotificationsList = ({ initial }: { initial: INotification[] }) => {
  const [items, setItems] = useState<INotification[]>(initial);
  const unread = items.filter((i) => !i.isRead).length;

  const onRead = async (n: INotification) => {
    if (n.isRead) return;
    setItems((prev) =>
      prev.map((i) => (i.id === n.id ? { ...i, isRead: true } : i))
    );
    await markNotificationRead(n.id);
  };

  const onDelete = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    const res = await deleteNotification(id);
    if (!res?.success) toast.error('Failed to delete notification');
  };

  const onMarkAll = async () => {
    setItems((prev) => prev.map((i) => ({ ...i, isRead: true })));
    await markAllNotificationsRead();
    toast.success('All notifications marked as read');
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title='No notifications'
        description='You’re all caught up — new activity will show up here.'
      />
    );
  }

  return (
    <div className='space-y-4'>
      {unread > 0 && (
        <div className='flex justify-end'>
          <button
            onClick={onMarkAll}
            className='inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted'
          >
            <CheckCheck className='size-3.5 text-[var(--aurora-violet)]' />
            Mark all as read ({unread})
          </button>
        </div>
      )}

      <GlassCard className='divide-y divide-border p-0'>
        {items.map((n) => (
          <div
            key={n.id}
            className='group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/60'
          >
            <button
              onClick={() => onRead(n)}
              className='mt-1.5 size-2.5 shrink-0 rounded-full'
              style={{
                background: n.isRead ? 'transparent' : 'var(--aurora-violet)',
                border: n.isRead ? '1px solid var(--border)' : 'none',
              }}
              aria-label={n.isRead ? 'Read' : 'Mark as read'}
            />
            <div className='min-w-0 flex-1'>
              <div className='flex items-center gap-2'>
                <p className='truncate font-medium text-foreground'>{n.title}</p>
                <span className='shrink-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
                  {n.type?.replaceAll('_', ' ')}
                </span>
              </div>
              <p className='mt-0.5 text-sm text-muted-foreground'>{n.message}</p>
              <p className='mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
                {formatDateTime(n.createdAt)}
              </p>
            </div>
            <button
              onClick={() => onDelete(n.id)}
              aria-label='Delete'
              className='shrink-0 rounded-lg p-2 text-muted-foreground opacity-0 transition-all hover:bg-destructive/15 hover:text-destructive group-hover:opacity-100'
            >
              <Trash2 className='size-4' />
            </button>
          </div>
        ))}
      </GlassCard>
    </div>
  );
};

export default NotificationsList;
