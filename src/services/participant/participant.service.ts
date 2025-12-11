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
        const result = await response.json()
        return result
    } catch (error) {
        throwError(error)
    }
}
