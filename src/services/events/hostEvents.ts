'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';
import { getAllEvent } from './getAllEvent';
import { IEvent } from '@/types/events.interface';

// GET /events/:slug/analytics  (host / co-host)
export async function getEventAnalytics(slug: string) {
  try {
    const response = await serverFetch.get(`/events/${slug}/analytics`);
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, message: 'Failed to load analytics' };
  }
}

/**
 * Events hosted by the current user. The list endpoint exposes `host.userId`,
 * so we fetch a page and keep the ones this user owns.
 */
export async function getMyHostedEvents(userId: string): Promise<IEvent[]> {
  try {
    const res = await getAllEvent('limit=100&sortBy=createdAt&sortOrder=desc');
    const all: IEvent[] = res?.data?.data ?? [];
    return all.filter((e) => e.host?.userId === userId);
  } catch {
    return [];
  }
}
