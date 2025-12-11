
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