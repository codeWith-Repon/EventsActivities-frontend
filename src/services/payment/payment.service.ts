
'use server'

import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"

export const paymentInit = async (participantId: string) => {
    try {
        const response = await serverFetch.post(`/payment/init-payment/${participantId}`)
        const result = await response.json()
        return result
    } catch (error) {
        throwError(error)
    }
}

// GET /payment?paymentStatus&eventId&userId&page&limit  (ADMIN, SUPER_ADMIN)
export const getPayments = async (queryString?: string) => {
    try {
        const response = await serverFetch.get(`/payment${queryString ? `?${queryString}` : ''}`)
        return await response.json()
    } catch (error) {
        throwError(error)
        return { success: false, message: 'Failed to load payments' }
    }
}

// PATCH /payment/:paymentId/refund  (ADMIN, SUPER_ADMIN) — only PAID payments
export const refundPayment = async (paymentId: string) => {
    try {
        const response = await serverFetch.patch(`/payment/${paymentId}/refund`)
        return await response.json()
    } catch (error) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? (error as Error).message : 'Something went wrong'}`,
        }
    }
}