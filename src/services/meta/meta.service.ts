/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

/**
 * GET /dashboard/meta-data  (ADMIN, SUPER_ADMIN)
 * query: { startDate?, endDate?, duration?: '7days' | '15days' | '1month' }
 */
export const getDashboardMeta = async (query?: Record<string, any>) => {
  try {
    const params = new URLSearchParams();
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null && value !== '') {
          params.set(key, String(value));
        }
      }
    }
    const qs = params.toString();
    const url = `/dashboard/meta-data${qs ? `?${qs}` : ''}`;

    const response = await serverFetch.get(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throwError(error);
    return null;
  }
};

/**
 * GET /dashboard/revenue-report  (ADMIN, SUPER_ADMIN)
 * → { topEvents: [{id,title,slug,revenue}], topHosts: [{hostId,name,revenue}],
 *     monthlyRevenue: [{month:'YYYY-MM', revenue}] }
 */
export const getRevenueReport = async () => {
  try {
    const response = await serverFetch.get('/dashboard/revenue-report');
    return await response.json();
  } catch (error) {
    throwError(error);
    return null;
  }
};
