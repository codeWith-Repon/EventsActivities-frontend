"use server"

import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"

export const joinEvent = async (eventId: string) => {
    try {
        const response = await serverFetch.post(`/event-participants/join-event`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                eventId
            })
        })
        const joinResult = await response.json()

        if (!joinResult.success) {
            return {
                success: false,
                message: joinResult.message
            }
        }
        return joinResult
    } catch (error) {
        throwError(error)
    }
}
