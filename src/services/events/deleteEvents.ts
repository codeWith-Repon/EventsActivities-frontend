"use server"

import { serverFetch } from "@/lib/server-fetch"
import { throwError } from "@/lib/throwError"
import { revalidatePath } from "next/cache"

const deleteEvent = async (slug: string) => {
    try {
        const response = await serverFetch.delete(`/events/${slug}`)
        const result = await response.json()

        if (response.ok) {
            revalidatePath('/my-events')
            return { success: true, data: result }
        }

        return { success: false, message: result.message }
    } catch (error) {
        throwError(error)
    }
}

export default deleteEvent