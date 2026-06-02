/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

// GET /co-hosts/events/:eventId  (public)
export async function getCoHosts(eventId: string) {
  try {
    const response = await serverFetch.get(`/co-hosts/events/${eventId}`);
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, data: [] };
  }
}

// POST /co-hosts/events/:eventId  { userId }  (primary host)
export async function addCoHost(eventId: string, userId: string) {
  try {
    const response = await serverFetch.post(`/co-hosts/events/${eventId}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}

// DELETE /co-hosts/events/:eventId/:hostId  (primary host) — hostId is Host.id
export async function removeCoHost(eventId: string, hostId: string) {
  try {
    const response = await serverFetch.delete(
      `/co-hosts/events/${eventId}/${hostId}`
    );
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}
