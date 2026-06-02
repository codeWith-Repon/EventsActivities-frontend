/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

// GET /events/category — list of unique categories (for filters)
export async function getAllCategory() {
  try {
    const response = await serverFetch.get('/events/category');
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, data: [] };
  }
}

// PATCH /events/:eventId/force-cancel  (ADMIN, SUPER_ADMIN)
export async function forceCancelEvent(eventId: string) {
  try {
    const response = await serverFetch.patch(`/events/${eventId}/force-cancel`);
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
}

// DELETE /events/:slug  (event creator only — admins moderate via force-cancel)
export async function deleteEvent(slug: string) {
  try {
    const response = await serverFetch.delete(`/events/${slug}`);
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
}
