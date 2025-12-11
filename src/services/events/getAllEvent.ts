/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

export const getAllEvent = async (query?: string) => {
  try {
    const response = await serverFetch.get(
      `/events${query ? `?${query}` : ''}`
    );
    const result = await response.json();

    return result;
  } catch (error: any) {
    throwError(error)
  }
};

