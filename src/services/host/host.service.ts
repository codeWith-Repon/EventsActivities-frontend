/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

// GET /hosts?page&limit&sortBy&sortOrder  (ADMIN, SUPER_ADMIN)
export async function getHosts(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/hosts${queryString ? `?${queryString}` : ''}`
    );
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, message: 'Failed to load hosts' };
  }
}

// GET /hosts/:hostId/stats
export async function getHostStats(hostId: string) {
  try {
    const response = await serverFetch.get(`/hosts/${hostId}/stats`);
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, message: 'Failed to load host stats' };
  }
}

// PATCH /hosts/:hostId/verify  { isVerified }
export async function verifyHost(hostId: string, isVerified: boolean) {
  try {
    const response = await serverFetch.patch(`/hosts/${hostId}/verify`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVerified }),
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
}
