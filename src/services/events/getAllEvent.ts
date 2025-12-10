/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';

export const getAllEvent = async (query?: string) => {
  try {
    const response = await serverFetch.get(
      `/events${query ? `?${query}` : ''}`
    );
    const result = await response.json();

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
        }`,
    };
  }
};

