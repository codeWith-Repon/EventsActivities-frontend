/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

// GET /notifications/  (any role) — newest first
export async function getNotifications() {
  try {
    const response = await serverFetch.get('/notifications/');
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, data: [] };
  }
}

// GET /notifications/unread-count
export async function getUnreadCount() {
  try {
    const response = await serverFetch.get('/notifications/unread-count');
    return await response.json();
  } catch {
    return { success: false, data: { unread: 0 } };
  }
}

// PATCH /notifications/read-all
export async function markAllNotificationsRead() {
  try {
    const response = await serverFetch.patch('/notifications/read-all');
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}

// PATCH /notifications/:id/read
export async function markNotificationRead(id: string) {
  try {
    const response = await serverFetch.patch(`/notifications/${id}/read`);
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}

// DELETE /notifications/:id
export async function deleteNotification(id: string) {
  try {
    const response = await serverFetch.delete(`/notifications/${id}`);
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}
