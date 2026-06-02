/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/server-fetch';
import { throwError } from '@/lib/throwError';

// POST /invitations/send  { eventId, email }  (host)
export async function sendInvitation(eventId: string, email: string) {
  try {
    const response = await serverFetch.post('/invitations/send', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, email }),
    });
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}

// GET /invitations/events/:eventId  (host)
export async function getEventInvitations(eventId: string) {
  try {
    const response = await serverFetch.get(`/invitations/events/${eventId}`);
    return await response.json();
  } catch (error) {
    throwError(error);
    return { success: false, data: [] };
  }
}

// PATCH /invitations/revoke/:invitationId  (host)
export async function revokeInvitation(invitationId: string) {
  try {
    const response = await serverFetch.patch(`/invitations/revoke/${invitationId}`);
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}

// POST /invitations/accept/:token  (any role)
export async function acceptInvitation(token: string) {
  try {
    const response = await serverFetch.post(`/invitations/accept/${token}`);
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}

// POST /invitations/decline/:token  (any role)
export async function declineInvitation(token: string) {
  try {
    const response = await serverFetch.post(`/invitations/decline/${token}`);
    return await response.json();
  } catch (error: any) {
    return { success: false, message: error?.message ?? 'Something went wrong' };
  }
}
