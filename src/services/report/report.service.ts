/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

// GET /reports?type&status&page&limit  (ADMIN, SUPER_ADMIN)
export async function getReports(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/reports${queryString ? `?${queryString}` : ''}`
    );
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, message: 'Failed to load reports' };
  }
}

// PATCH /reports/:reportId  { status, adminNote? }  (ADMIN, SUPER_ADMIN)
export async function updateReport(
  reportId: string,
  payload: { status: 'RESOLVED' | 'DISMISSED'; adminNote?: string }
) {
  try {
    const response = await serverFetch.patch(`/reports/${reportId}`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
}
