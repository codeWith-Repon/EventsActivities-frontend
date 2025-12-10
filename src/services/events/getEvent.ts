/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"

const getEvent = async (slug: string) => {
    try {
        const response = await serverFetch.get(`/events/${slug}`)
        const result = await response.json()
        return result
    } catch (error: any) {
        throwError(error)
    }
}

export default getEvent