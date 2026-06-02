'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  getNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from '@/services/notification/notification.service';
import { INotification } from '@/types/notification.interface';
import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<INotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // never sets state synchronously before the first await (lint-safe in effects)
  const load = async () => {
    const [listRes, countRes] = await Promise.all([
      getNotifications(),
      getUnreadCount(),
    ]);
    setItems(listRes?.data ?? []);
    setUnread(countRes?.data?.unread ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    Promise.all([getNotifications(), getUnreadCount()]).then(
      ([listRes, countRes]) => {
        if (!active) return;
        setItems(listRes?.data ?? []);
        setUnread(countRes?.data?.unread ?? 0);
        setLoading(false);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  const onItem = async (n: INotification) => {
    if (n.isRead) return;
    setItems((prev) =>
      prev.map((i) => (i.id === n.id ? { ...i, isRead: true } : i))
    );
    setUnread((u) => Math.max(0, u - 1));
    await markNotificationRead(n.id);
  };

  const onMarkAll = async () => {
    setBusy(true);
    await markAllNotificationsRead();
    setItems((prev) => prev.map((i) => ({ ...i, isRead: true })));
    setUnread(0);
    setBusy(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) load();
      }}
    >
      <PopoverTrigger asChild>
        <button
          aria-label='Notifications'
          className='relative grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10'
        >
          <Bell className='size-4.5' />
          {unread > 0 && (
            <span className='absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-gradient-aurora px-1 text-[10px] font-semibold text-white'>
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align='end'
        className='glass-strong w-80 p-0'
        sideOffset={10}
      >
        <div className='flex items-center justify-between border-b border-white/10 px-4 py-3'>
          <h4 className='font-display text-sm font-semibold text-foreground'>
            Notifications
          </h4>
          {unread > 0 && (
            <button
              onClick={onMarkAll}
              disabled={busy}
              className='inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--aurora-violet)] hover:brightness-125 disabled:opacity-50'
            >
              <CheckCheck className='size-3' />
              Mark all
            </button>
          )}
        </div>

        <ScrollArea className='max-h-80'>
          {loading ? (
            <div className='flex h-24 items-center justify-center'>
              <Loader2 className='size-5 animate-spin text-muted-foreground' />
            </div>
          ) : items.length === 0 ? (
            <p className='py-10 text-center text-sm text-muted-foreground'>
              You’re all caught up.
            </p>
          ) : (
            <ul className='divide-y divide-white/5'>
              {items.slice(0, 8).map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => onItem(n)}
                    className='flex w-full items-start gap-2.5 px-4 py-3 text-left transition-colors hover:bg-white/5'
                  >
                    <span
                      className={`mt-1.5 size-2 shrink-0 rounded-full ${
                        n.isRead ? 'bg-transparent' : 'bg-gradient-aurora'
                      }`}
                    />
                    <span className='min-w-0 flex-1'>
                      <span className='block truncate text-sm font-medium text-foreground'>
                        {n.title}
                      </span>
                      <span className='block text-xs text-muted-foreground line-clamp-2'>
                        {n.message}
                      </span>
                      <span className='mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
                        {timeAgo(n.createdAt)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>

        <div className='border-t border-white/10 p-2'>
          <Link
            href='/admin/dashboard/notifications'
            onClick={() => setOpen(false)}
            className='block rounded-lg px-3 py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground'
          >
            View all notifications
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
