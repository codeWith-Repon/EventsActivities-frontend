/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

// GET /check-in/attendance/:eventId  (host)
export async function getAttendance(eventId: string) {
  try {
    const response = await serverFetch.get(`/check-in/attendance/${eventId}`);
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, data: null };
  }
}

// POST /check-in  { token }  (host) — marks a participant attended
export async function checkInByToken(token: string) {
  try {
    const response = await serverFetch.post('/check-in', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}

// GET /check-in/qr/:participantId  (participant or host) — raw token to render a QR
export async function getCheckInToken(participantId: string) {
  try {
    const response = await serverFetch.get(`/check-in/qr/${participantId}`);
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, data: null };
  }
}
